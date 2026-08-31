import { writeFileSync, mkdirSync, existsSync, readFileSync, appendFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { ConceptDoc } from "./schema.ts";
import { getIdToken, promptForCredentials, type Credentials } from "./auth.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STAGE_DIR = resolve(__dirname, "../../../.scrape-stage");
const STAGE_FILE = resolve(STAGE_DIR, "staged.jsonl");

export type ImportResult = {
  target: "firestore" | "local-staging";
  imported: number;
  duplicateSkips: number;
  written: number;
  file?: string;
};

export function isFirestoreReady(): boolean {
  // The client Web config API key is the only requirement; interactive sign-in supplies the user.
  return Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
}

function projectId(): string {
  return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sonata-b87e3";
}

function apiKey(): string {
  return process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;
}

/* ------------------------------------------------------------------ *
 * Firestore REST — minimal JS value -> Firestore Value field mapper.
 * ------------------------------------------------------------------ */
function toFirestoreValue(value: unknown): Record<string, unknown> | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") return { doubleValue: value };
  if (value instanceof Date) return { timestampValue: value.toISOString() };
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(v => toFirestoreValue(v)!).filter(Boolean) } };
  }
  if (typeof value === "object") {
    const fields: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const fv = toFirestoreValue(v);
      if (fv !== null) fields[k] = fv;
    }
    return { mapValue: { fields } };
  }
  return null;
}

function fieldsFromDoc(doc: Partial<ConceptDoc>): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(doc)) {
    const fv = toFirestoreValue(v);
    if (fv !== null) fields[k] = fv;
  }
  return fields;
}

async function firestoreFetch(path: string, init?: RequestInit, token?: string): Promise<any> {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId()}/databases/(default)/documents/${path}`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (init?.headers) Object.assign(headers, init.headers);
  const res = await fetch(url, { ...init, headers });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = body?.error?.message ?? body?.message ?? res.statusText;
    if (res.status === 409) return { status: res.status, body, conflict: true };
    throw new Error(`Firestore API error (${res.status}): ${msg}`);
  }
  return { status: res.status, body };
}

async function loadExistingSlugs(token: string): Promise<Set<string>> {
  const slugs = new Set<string>();
  let next: string | undefined;
  do {
    const path = `concepts?pageSize=500${next ? `&pageToken=${encodeURIComponent(next)}` : ""}`;
    const { body } = await firestoreFetch(path, undefined, token);
    for (const doc of body?.documents ?? []) {
      const slug = doc?.fields?.slug?.stringValue;
      if (slug) slugs.add(slug);
    }
    next = body?.nextPageToken;
  } while (next);
  return slugs;
}

async function writeToFirestore(records: ConceptDoc[], token: string): Promise<{ written: number; skips: number }> {
  const existing = await loadExistingSlugs(token);
  let written = 0;
  let skips = 0;
  for (const record of records) {
    if (existing.has(record.slug)) {
      skips += 1;
      continue;
    }
    const fields = fieldsFromDoc(record);
    const path = `concepts/${record.publicId}?updateMask.fieldPaths=${Object.keys(fields).map(encodeURIComponent).join(",")}`;
    const { conflict } = await firestoreFetch(
      path,
      {
        method: "PATCH",
        body: JSON.stringify({ fields }),
      },
      token
    );
    if (conflict) {
      skips += 1;
      continue;
    }
    existing.add(record.slug);
    written += 1;
  }
  return { written, skips };
}

function writeLocalStaging(records: ConceptDoc[]): { written: number; skips: number } {
  mkdirSync(STAGE_DIR, { recursive: true });
  const slugs = loadStagedSlugs();
  let written = 0;
  let skips = 0;
  const lines = records
    .filter(record => {
      if (slugs.has(record.slug)) {
        skips += 1;
        return false;
      }
      slugs.add(record.slug);
      return true;
    })
    .map(record => JSON.stringify(record));
  if (lines.length) {
    appendFileSync(STAGE_FILE, `${lines.join("\n")}\n`, "utf8");
    written = lines.length;
  }
  return { written, skips };
}

function loadStagedSlugs(): Set<string> {
  if (!existsSync(STAGE_FILE)) return new Set();
  const slugs = new Set<string>();
  for (const line of readFileSync(STAGE_FILE, "utf8").split("\n")) {
    if (!line.trim()) continue;
    try {
      const doc = JSON.parse(line) as ConceptDoc;
      slugs.add(doc.slug);
    } catch {
      // ignore malformed lines
    }
  }
  return slugs;
}

export async function importConcepts(records: ConceptDoc[], batch: string): Promise<ImportResult> {
  if (isFirestoreReady()) {
    const creds: Credentials = await promptForCredentials();
    try {
      const token = await getIdToken(creds, apiKey());
      const { written, skips } = await writeToFirestore(records, token);
      return { target: "firestore", imported: records.length, duplicateSkips: skips, written };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`\nFirestore import failed (${message}). Falling back to local staging.`);
      const { written, skips } = writeLocalStaging(records);
      return {
        target: "local-staging",
        imported: records.length,
        duplicateSkips: skips,
        written,
        file: STAGE_FILE,
      };
    }
  }
  const { written, skips } = writeLocalStaging(records);
  return {
    target: "local-staging",
    imported: records.length,
    duplicateSkips: skips,
    written,
    file: STAGE_FILE,
  };
}

export function stageStatus() {
  return {
    firestoreReady: isFirestoreReady(),
    projectId: projectId(),
    signInMethod: "interactive-client-auth" as const,
    user: null,
    stageFile: STAGE_FILE,
    stageExists: existsSync(STAGE_FILE),
  };
}

export function clearStaging() {
  if (existsSync(STAGE_FILE)) {
    writeFileSync(STAGE_FILE, "", "utf8");
  }
}
