import { argv } from "node:process";
import { SEED_TERMS, seedTermsForRegion } from "./seed.ts";
import { mapSeedToConcept, type ConceptDoc } from "./schema.ts";
import { REGION_CATALOG, regionById } from "./regions.ts";
import { importConcepts, stageStatus, clearStaging } from "./firestore.ts";

const BATCH = `seed-${new Date().toISOString().slice(0, 10)}`;

function help() {
  console.log(`
Sonata corpus importer CLI

Usage:
  pnpm scrape:run [regionId]    Build concept records from the seed corpus and import them.
                                Provide a region id to import only that region.

  pnpm scrape:dry [regionId]    Build records and show a summary WITHOUT writing anywhere.

  pnpm scrape:status            Show whether Firestore is configured and where staging will go.

  pnpm scrape:clear             Clear the local staging file (no effect on Firestore).

Regions:
${REGION_CATALOG.map(region => `  ${region.id.padEnd(24)} ${region.label} (${seedTermsForRegion(region.id).length} seeded terms)`).join("\n")}
  total seeded terms: ${SEED_TERMS.length}
`);
}

function buildRecords(regionId?: string, previewLines = 0): { records: ConceptDoc[]; skipped: number } {
  const terms = regionId ? seedTermsForRegion(regionId) : SEED_TERMS;
  const records: ConceptDoc[] = [];
  const seen = new Set<string>();
  let skipped = 0;
  for (const term of terms) {
    const region = regionById(term.regionId);
    const record = mapSeedToConcept(term, region, BATCH);
    if (seen.has(record.slug)) {
      skipped += 1;
      continue;
    }
    seen.add(record.slug);
    records.push(record);
  }
  if (previewLines > 0 && records.length) {
    console.log("\nSample mapped records:\n");
    for (const record of records.slice(0, previewLines)) {
      console.log(`  • ${record.canonicalName}  [${record.editorialStatus} | ${record.originRegion} | ${record.entityType}]`);
      console.log(`      ${record.shortDefinition}`);
    }
    console.log("");
  }
  return { records, skipped };
}

async function runImport(regionId?: string) {
  const { records, skipped } = buildRecords(regionId);
  if (!records.length) {
    console.log(`No records to import${regionId ? ` for region "${regionId}"` : ""}.`);
    return;
  }
  console.log(`Importing ${records.length} concept records${regionId ? ` for region "${regionId}"` : ""} (${skipped} duplicate slugs skipped in this build)…`);
  const result = await importConcepts(records, BATCH);
  console.log(`\nDone → ${result.target}:`);
  console.log(`  imported (built):   ${result.imported}`);
  console.log(`  written:            ${result.written}`);
  console.log(`  duplicate skips:    ${result.duplicateSkips}`);
  if (result.file) {
    console.log(`  staged file:        ${result.file}`);
    console.log(`\nNOTE: Firestore import is not configured (missing NEXT_PUBLIC_FIREBASE_API_KEY).`);
    console.log(`Records were staged to the local file instead. Add the Web client API key to .env.local to enable Firestore import.`);
  } else {
    console.log(`\nRecords written to Firestore as "machine_generated" drafts (not published).`);
  }
}

function runDry(regionId?: string) {
  const { records, skipped } = buildRecords(regionId, 4);
  const byRegion = records.reduce<Record<string, number>>((map, record) => {
    map[record.originRegion] = (map[record.originRegion] ?? 0) + 1;
    return map;
  }, {});
  console.log(`Dry-run summary${regionId ? ` for "${regionId}"` : ""}:`);
  console.log(`  records to import:  ${records.length}`);
  console.log(`  duplicate slugs:    ${skipped}`);
  console.log(`  by region:          ${Object.entries(byRegion).map(([region, count]) => `${region}=${count}`).join(", ")}`);
  console.log(`  editorial status:   machine_generated (awaits editorial review — not published)`);
}

const command = argv[2];
const regionArg = argv[3];

if (command === "run" || command === "import") {
  runImport(regionArg);
} else if (command === "dry") {
  runDry(regionArg);
} else if (command === "status") {
  const status = stageStatus();
  console.log("Sonata importer status:");
  console.log(`  Firestore ready:    ${status.firestoreReady}`);
  console.log(`  import auth:        ${status.signInMethod}`);
  console.log(`  project id:         ${status.projectId}`);
  console.log(`  stage file:         ${status.stageFile}`);
  console.log(`  stage file exists:  ${status.stageExists}`);
  console.log(`  seeded terms:       ${SEED_TERMS.length}`);
  if (!status.firestoreReady) {
    console.log(`\nNot ready. Add NEXT_PUBLIC_FIREBASE_API_KEY (Web client config) to .env.local.`);
  } else {
    console.log(`\nReady. 'pnpm scrape:run' will prompt for your Firebase Auth email + password once (nothing stored).`);
  }
} else if (command === "clear") {
  clearStaging();
  console.log("Local staging file cleared.");
} else {
  help();
}
