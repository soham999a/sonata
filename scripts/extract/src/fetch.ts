import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { BookSource } from "./types";

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(HERE, "..", "data");

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export type FetchResult = {
  source: BookSource;
  status: "downloaded" | "cached" | "not-free" | "unavailable" | "skipped-google";
  textFile?: string;
  bytes?: number;
  error?: string;
};

function djvuTxtUrl(identifier: string) {
  return `https://archive.org/download/${identifier}/${identifier}_djvu.txt`;
}

export async function fetchBookText(source: BookSource): Promise<FetchResult> {
  if (source.kind === "google-books") {
    return { source, status: "skipped-google", error: "Google Books text requires a validated volumeId; add volumeId to the manifest." };
  }
  if (!source.identifier) {
    return { source, status: "unavailable", error: "No identifier in manifest." };
  }

  const regionDir = join(DATA_DIR, source.region);
  await mkdir(regionDir, { recursive: true });
  const outPath = join(regionDir, `${source.slug}.txt`);

  if (await exists(outPath)) {
    const stat = await import("node:fs/promises").then(m => m.stat(outPath));
    return { source, status: "cached", textFile: outPath, bytes: stat.size };
  }

  const url = djvuTxtUrl(source.identifier);
  try {
    let resp: Response | undefined;
    for (let attempt = 0; attempt < 3; attempt++) {
      resp = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(120_000) });
      if (resp.status < 500 || attempt === 2) break;
      await new Promise(resolve => setTimeout(resolve, 1500 * (attempt + 1)));
    }
    if (!resp!.ok) {
      // 401/403/404 on the open text file all mean the volume is not freely
      // downloadable (lending-library / access-restricted).
      if (resp!.status === 404 || resp!.status === 401 || resp!.status === 403) {
        return { source, status: "not-free", error: `No openly accessible _djvu.txt at ${url} (HTTP ${resp!.status}). Likely an access-restricted / lending-only volume.` };
      }
      return { source, status: "unavailable", error: `HTTP ${resp!.status} for ${url}` };
    }
    const text = await resp!.text();
    // Guard against tiny placeholder files that indicate no accessible text.
    if (text.trim().length < 500) {
      return { source, status: "not-free", error: "Fulltext placeholder returned; text is not openly available." };
    }
    await writeFile(outPath, text, "utf8");
    return { source, status: "downloaded", textFile: outPath, bytes: text.length };
  } catch (error) {
    return { source, status: "unavailable", error: String(error) };
  }
}

export interface FetchedBook {
  source: BookSource;
  result: FetchResult;
  text?: string;
}

export async function loadFetchedBooks(regions?: string[]): Promise<FetchedBook[]> {
  const dirs = (await import("node:fs/promises")).readdir(DATA_DIR, { withFileTypes: true }).catch(() => []);
  const out: FetchedBook[] = [];
  for (const entry of await dirs) {
    if (!entry.isDirectory()) continue;
    if (regions && !regions.includes(entry.name)) continue;
    const regionDir = join(DATA_DIR, entry.name);
    const files = (await import("node:fs/promises")).readdir(regionDir).catch(() => []);
    for (const f of files.filter(f => f.endsWith(".txt"))) {
      const text = await readFile(join(regionDir, f), "utf8");
      out.push({
        source: { region: entry.name as never, slug: f.replace(/\.txt$/, ""), title: f, author: "", year: "", kind: "internet-archive", citation: f } as BookSource,
        result: { source: {} as BookSource, status: "cached" },
        text,
      });
    }
  }
  return out;
}
