import type { SonataEntryCard, SonataEntryDetail } from "./sonata-demo";

/**
 * Firestore reads via the Firestore REST API.
 *
 * Uses the public read rules (see firestore.rules: `allow read: if true`), so the
 * catalogue is readable with only the Web project config — no service account, no
 * admin SDK, no signed-in user. Mirrors the importer's REST writer.
 */

export function isFirestoreConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
}

function projectId(): string {
  return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sonata-b87e3";
}

export type FirestoreConceptRow = {
  publicId?: string;
  slug: string;
  canonicalName?: string;
  transliteration?: string;
  nativeScript?: string;
  shortDefinition?: string;
  definition?: string;
  entityType?: string;
  originRegion?: string;
  tradition?: string;
  genre?: string;
  era?: string;
  category?: string;
  languageOfOrigin?: string;
  sourceConfidence?: string;
  sourceCount?: number;
  tags?: string[];
  relationshipCount?: number;
  editorialStatus?: string;
  sourceQuality?: string;
  pronunciation?: string;
  taxonomyPath?: string[];
  related?: Array<Record<string, unknown>>;
  sources?: Array<Record<string, unknown>>;
  graphNodes?: Array<Record<string, unknown>>;
  historicalContext?: string;
  practicalUsage?: string;
  visualAudioDescription?: string;
  emicDescription?: string;
  eticComparison?: string;
  regionalVariation?: string;
  uncertaintyNote?: string;
  updatedAt?: string;
};

/* Decode a Firestore REST `fields` map into a plain JS object. */
function decodeFields(fields: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [key, value] of Object.entries(fields ?? {})) {
    if (value == null) continue;
    if ("stringValue" in value) out[key] = value.stringValue;
    else if ("booleanValue" in value) out[key] = value.booleanValue;
    else if ("integerValue" in value) out[key] = Number(value.integerValue);
    else if ("doubleValue" in value) out[key] = Number(value.doubleValue);
    else if ("timestampValue" in value) out[key] = value.timestampValue;
    else if ("referenceValue" in value) out[key] = value.referenceValue;
    else if ("arrayValue" in value) out[key] = (value.arrayValue.values ?? []).map((item: any) => decodeValue(item));
    else if ("mapValue" in value) out[key] = decodeFields(value.mapValue.fields ?? {});
  }
  return out;
}

function decodeValue(value: any): any {
  if (value == null) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("timestampValue" in value) return value.timestampValue;
  if ("referenceValue" in value) return value.referenceValue;
  if ("arrayValue" in value) return (value.arrayValue.values ?? []).map(decodeValue);
  if ("mapValue" in value) return decodeFields(value.mapValue.fields ?? {});
  return null;
}

async function listConceptDocs(editorialStatus: string): Promise<FirestoreConceptRow[]> {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId()}/databases/(default)/documents/concepts?pageSize=1000`;
  const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
  if (!res.ok) throw new Error(`Firestore read failed (${res.status})`);
  const body = await res.json().catch(() => ({}));
  const rows: FirestoreConceptRow[] = [];
  for (const doc of body?.documents ?? []) {
    const row = decodeFields(doc.fields ?? {}) as FirestoreConceptRow;
    row.publicId = row.publicId ?? doc.name?.split("/").pop();
    if (row.editorialStatus === editorialStatus) rows.push(row);
  }
  return rows;
}

async function listAllConceptDocs(): Promise<FirestoreConceptRow[]> {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId()}/databases/(default)/documents/concepts?pageSize=1000`;
  const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
  if (!res.ok) throw new Error(`Firestore read failed (${res.status})`);
  const body = await res.json().catch(() => ({}));
  const rows: FirestoreConceptRow[] = [];
  for (const doc of body?.documents ?? []) {
    const row = decodeFields(doc.fields ?? {}) as FirestoreConceptRow;
    row.publicId = row.publicId ?? doc.name?.split("/").pop();
    rows.push(row);
  }
  return rows;
}

function toEntryCard(row: FirestoreConceptRow): SonataEntryCard {
  return {
    publicId: row.publicId ?? row.slug,
    slug: row.slug,
    name: row.canonicalName ?? row.slug,
    originalName: row.transliteration ?? row.nativeScript,
    shortDefinition: row.shortDefinition ?? row.definition ?? "",
    entityType: row.entityType ?? "term",
    region: row.originRegion ?? "Not yet classified",
    tradition: row.tradition ?? "Context pending",
    tags: row.tags ?? [],
    relationshipCount: row.relationshipCount ?? 0,
    demonstration: true,
  };
}

export async function getPublishedCards(limit: number): Promise<SonataEntryCard[]> {
  if (!isFirestoreConfigured()) return [];
  const rows = await listConceptDocs("published");
  return rows.slice(0, limit).map(toEntryCard);
}

export async function getPublishedCard(slug: string): Promise<SonataEntryDetail | undefined> {
  if (!isFirestoreConfigured()) return undefined;
  const rows = await listConceptDocs("published");
  const row = rows.find(r => r.slug === slug);
  if (!row) return undefined;
  const card = toEntryCard(row);
  return {
    ...card,
    definition: row.definition ?? card.shortDefinition,
    historicalContext: row.historicalContext ?? "Historical context has not yet been added to this record.",
    practicalUsage: row.practicalUsage ?? "Practical usage has not yet been added to this record.",
    visualAudioDescription: row.visualAudioDescription ?? "Visual and audio description has not yet been added to this record.",
    emicDescription: row.emicDescription,
    eticComparison: row.eticComparison,
    regionalVariation: row.regionalVariation,
    uncertaintyNote: row.uncertaintyNote,
    editorialStatus: row.editorialStatus,
    sourceQuality: row.sourceQuality,
    pronunciation: row.pronunciation,
    languageOfOrigin: row.languageOfOrigin,
    nativeScript: row.nativeScript,
    transliteration: row.transliteration,
    taxonomyPath: row.taxonomyPath ?? ["World", card.region, card.tradition, ...card.tags, card.name],
    related: (row.related ?? []) as SonataEntryDetail["related"],
    sources: (row.sources ?? []) as SonataEntryDetail["sources"],
    graphNodes:
      (row.graphNodes as SonataEntryDetail["graphNodes"]) ??
      [{ id: card.slug, label: card.name, x: 50, y: 50, emphasis: "main", linkable: true }],
  };
}

export async function getAllDraftCards(): Promise<SonataEntryCard[]> {
  if (!isFirestoreConfigured()) return [];
  const rows = await listAllConceptDocs();
  return rows.map(toEntryCard);
}
