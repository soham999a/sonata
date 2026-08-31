import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "scripts", "out");

type ReportRow = {
  region?: string;
  slug?: string;
  title?: string;
  status?: string;
  termsExtracted?: number;
  validCount?: number;
  blockedCount?: number;
  error?: string;
};

async function main() {
  let report: { results: ReportRow[] } = { results: [] };
  try {
    report = JSON.parse(await readFile(join(OUT, "_run-report.json"), "utf8"));
  } catch {
    report = { results: [] };
  }

  const byRegion = new Map<string, ReportRow[]>();
  for (const row of report.results) {
    const region = row.region ?? "?";
    if (!byRegion.has(region)) byRegion.set(region, []);
    byRegion.get(region)!.push(row);
  }

  const regions = await readdir(OUT, { withFileTypes: true });
  const orders = new Map<string, number>();
  let i = 0;
  for (const e of regions) if (e.isDirectory()) orders.set(e.name, i++);

  const sortedRegions = [...byRegion.keys()].sort((a, b) => (orders.get(a) ?? 99) - (orders.get(b) ?? 99));

  let grandTotal = 0;
  for (const region of sortedRegions) {
    const rows = byRegion.get(region)!;
    let regionTotal = 0;
    const lines: string[] = [];
    for (const row of rows) {
      const slug = row.slug ?? "?";
      const status = row.status ?? "?";
      if (row.status === "downloaded" || row.status === "cached") {
        const terms = row.termsExtracted ?? 0;
        const valid = row.validCount ?? 0;
        const blocked = row.blockedCount ?? 0;
        const chunks = Math.max(1, Math.ceil(terms / 500));
        regionTotal += valid;
        lines.push(`    ${slug.padEnd(46)} ${String(valid).padStart(4)} valid  ${String(terms).padStart(4)} terms  ${chunks} chunk(s)`);
      } else if (row.status === "not-free") {
        lines.push(`    ${slug.padEnd(46)} NOT-FREE (lending-only)`);
      } else if (row.status === "downloaded-empty" || (row.status === "downloaded" && (row.termsExtracted ?? 0) === 0)) {
        lines.push(`    ${slug.padEnd(46)} DOWNLOADED but 0 Latin-script terms (likely non-Latin OCR)`);
      } else {
        lines.push(`    ${slug.padEnd(46)} ${row.status ?? "?"}${row.error ? ` (${String(row.error).slice(0, 40)})` : ""}`);
      }
    }
    grandTotal += regionTotal;
    console.log(`\n== ${region.toUpperCase()} ==`);
    console.log(lines.join("\n"));
  }
  console.log(`\nTOTAL valid candidates: ${grandTotal}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
