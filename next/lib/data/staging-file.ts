import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type { SonataEntryCard, SonataEntryDetail } from "./sonata-demo";
import type { ConceptDoc } from "../../tools/scraper/schema";

/**
 * Local staging fallback source.
 *
 * The corpus importer (`pnpm scrape:run`) writes machine_generated records to a local
 * NDJSON file at <repo>/.scrape-stage/staged.jsonl when Firestore is not configured.
 * This reader lets the app surface those records immediately, without needing a
 * cloud database. Nothing is written at request time; reads are best-effort and
 * fall back to demo data when the file is absent (e.g. in production builds).
 *
 * The staging file lives OUTSIDE the Next.js source tree so it is never bundled or
 * served; we probe several candidate paths so it works from a dev checkout.
 */

const CANDIDATE_PATHS = [
  process.env.SONATA_STAGE_FILE,
  resolve(process.cwd(), "../../.scrape-stage/staged.jsonl"),
  resolve(process.cwd(), ".scrape-stage/staged.jsonl"),
  resolve(process.cwd(), "../.scrape-stage/staged.jsonl"),
].filter((p): p is string => Boolean(p));

let cachedRecords: ConceptDoc[] | null = null;

export function loadStagedConceptDocs(): ConceptDoc[] {
  if (cachedRecords) return cachedRecords;

  let read: string[] = [];
  for (const filePath of CANDIDATE_PATHS) {
    if (!existsSync(filePath)) continue;
    try {
      read = readFileSync(filePath, "utf8").split("\n");
      break;
    } catch {
      // try next candidate
    }
  }

  const records: ConceptDoc[] = [];
  for (const line of read) {
    if (!line.trim()) continue;
    try {
      const doc = JSON.parse(line) as ConceptDoc;
      if (doc && doc.slug) records.push(doc);
    } catch {
      // skip malformed lines
    }
  }
  cachedRecords = records;
  return records;
}

export function hasStagedCorpus(): boolean {
  return loadStagedConceptDocs().length > 0;
}

function toEntryCard(doc: ConceptDoc): SonataEntryCard {
  return {
    publicId: doc.publicId,
    slug: doc.slug,
    name: doc.canonicalName,
    originalName: doc.transliteration ?? doc.nativeScript,
    shortDefinition: doc.shortDefinition ?? doc.definition ?? "",
    entityType: doc.entityType,
    region: doc.originRegion ?? "Not yet classified",
    tradition: doc.tradition ?? "Context pending",
    tags: doc.tags ?? [],
    relationshipCount: doc.relationshipCount ?? 0,
    // Marked as demonstration because these are staged drafts, not published entries.
    demonstration: true as const,
  };
}

export function listStagedCards(): SonataEntryCard[] {
  return loadStagedConceptDocs().map(toEntryCard);
}

export function getStagedDetail(slug: string): SonataEntryDetail | undefined {
  const doc = loadStagedConceptDocs().find(record => record.slug === slug);
  if (!doc) return undefined;
  const card = toEntryCard(doc);
  return {
    ...card,
    definition: doc.definition ?? card.shortDefinition,
    historicalContext:
      doc.historicalContext ||
      "This record was staged by the corpus importer from a reference glossary and awaits editorial review.",
    practicalUsage:
      doc.practicalUsage ||
      "Editorial review should verify the definition against the cited source before this record may be considered for publication.",
    visualAudioDescription:
      doc.visualAudioDescription || "No licensed audio or visual example is attached to this staged record yet.",
    editorialStatus: doc.editorialStatus,
    sourceQuality: doc.sourceQuality,
    pronunciation: doc.pronunciation,
    languageOfOrigin: doc.languageOfOrigin,
    nativeScript: doc.nativeScript,
    transliteration: doc.transliteration,
    taxonomyPath: doc.taxonomyPath ?? ["World", card.region, card.tradition, ...card.tags, card.name],
    related: [],
    sources: (doc.sources ?? []) as SonataEntryDetail["sources"],
    graphNodes: [
      { id: card.slug, label: card.name, x: 50, y: 50, emphasis: "main" as const, linkable: true },
    ],
  };
}

export function clearStagedCache() {
  cachedRecords = null;
}
