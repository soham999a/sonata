import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ENDPOINT = process.env.SONATA_ENDPOINT ?? "http://localhost:3001/api/trpc";
const COOKIE = process.env.SONATA_COOKIE ?? "";
const BEARER = process.env.SONATA_TOKEN ?? "";

const OUT_DIR = join(HERE, "..", "out");
const ROUTE = "editorial.stageKnowledgeBatch";

type Candidate = {
  canonicalName: string;
  entityType: string;
  emicDescription?: string;
  taxonomySlugs: string[];
  sourceConfidence: string;
  sources: Array<{ citation: string; uri?: string }>;
  alternateNames?: string[];
  requiresSpecialistReview?: boolean;
};

/**
 * Build a correct tRPC HTTP POST batch-mutation envelope.
 *
 * tRPC's express adapter (with the superjson transformer configured on the
 * server, as in server/_core/trpc.ts) expects, for a POST call identified as a
 * batch (the `?batch=1` query flag):
 *   - URL:  `<base>/<path>?batch=1`
 *   - Body: `JSON.stringify({ 0: transformer.serialize(input) })`
 *
 * Each call slot is keyed by its index (here `0`) and wrapped in the superjson
 * serialization of the single input. superjson.serialize(input) => `{json:
 * input}` with no `meta` when all data is plain JSON (strings/numbers/booleans/
 * arrays/nested objects) — which is exactly what our candidates are. So the
 * wire body is `{ "0": { "json": <input> } }`, which we build by hand to avoid
 * a runtime dependency on superjson. Verified against a real
 * createExpressMiddleware(superjson) server: HTTP 200 with
 * `[{result:{data:{json:{...}}}}]`.
 */
function envelope(input: {
  fileName: string;
  fileFormat: "json";
  sourceProvider: string;
  candidates: Candidate[];
}) {
  return { 0: { json: input } };
}

async function stageBatch(fileName: string, sourceProvider: string, candidates: Candidate[]) {
  const input = { fileName, fileFormat: "json" as const, sourceProvider, candidates };
  const url = `${ENDPOINT}/${ROUTE}?batch=1`;

  const headers: Record<string, string> = {
    "content-type": "application/json",
    ...(COOKIE ? { cookie: COOKIE } : {}),
    ...(BEARER ? { authorization: `Bearer ${BEARER}` } : {}),
  };

  const resp = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(envelope(input)),
  });
  const text = await resp.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }
  return { status: resp.status, ok: resp.ok, parsed };
}

async function main() {
  const target = process.argv[2];
  if (!target) {
    console.error("Usage: tsx ingest.ts <file.jsonl | BookSlug | region> [sourceProvider]");
    process.exit(1);
  }
  const sourceProvider = process.argv[3] ?? "internet-archive-extraction";

  const files: { path: string; name: string }[] = [];
  if (target.endsWith(".jsonl")) {
    files.push({ path: target, name: basename(target, ".jsonl") });
  } else {
    // Treat as region or book slug: scan OUT_DIR.
    const regionDir = join(OUT_DIR, target);
    const matched = await readdir(regionDir).catch(() => []);
    for (const f of matched.filter(f => f.endsWith(".jsonl"))) {
      files.push({ path: join(regionDir, f), name: basename(f, ".jsonl") });
    }
    if (files.length === 0) {
      // Search all regions for a matching book slug.
      const regions = await readdir(OUT_DIR).catch(() => []);
      for (const region of regions) {
        const regionDir2 = join(OUT_DIR, region);
        const matches = await readdir(regionDir2).catch(() => []);
        for (const f of matches.filter(f => f.endsWith(`${target}.jsonl`))) {
          files.push({ path: join(regionDir2, f), name: basename(f, ".jsonl") });
        }
      }
    }
  }

  if (files.length === 0) {
    console.error(`No .jsonl batches found for target '${target}'.`);
    process.exit(1);
  }

  const report: Array<Record<string, unknown>> = [];
  for (const { path, name } of files) {
    const candidates = (await readFile(path, "utf8"))
      .split("\n")
      .filter(Boolean)
      .map(line => JSON.parse(line) as Candidate);

    console.log(`\n${name}: ${candidates.length} candidates`);
    for (let i = 0; i < candidates.length; i += 500) {
      const chunk = candidates.slice(i, i + 500);
      const fileName = `${name}__part${i / 500}`;
      const result = await stageBatch(fileName, sourceProvider, chunk);
      report.push({ file: fileName, chunk: i / 500, count: chunk.length, ...result });
      console.log(JSON.stringify(result.parsed, null, 2));
      if (!result.ok) {
        console.error(`  -> staging failed for part ${i / 500} (HTTP ${result.status}). Aborting this file.`);
        break;
      }
    }
  }

  console.log("\n=== INGEST REPORT ===");
  console.log(JSON.stringify(report, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
