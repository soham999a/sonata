import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { BOOKS } from "./src/manifest";
import { fetchBookText } from "./src/fetch";
import { extractTerms } from "./src/extract";
import { enrichBatchWithAI, summarizeValidation } from "./src/enrich";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(HERE, "..", "out");

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const regionFilter = process.argv.slice(2);
  const books = regionFilter.length
    ? BOOKS.filter(b => regionFilter.includes(b.region))
    : BOOKS;

  type ReportRow = Record<string, unknown>;
  const report: Record<string, unknown> & { results: ReportRow[] } = {
    scannedBooks: books.length,
    results: [],
  };

  for (const book of books) {
    const fetchResult = await fetchBookText(book);
    if (fetchResult.status !== "downloaded" && fetchResult.status !== "cached") {
      report.results.push({
        region: book.region,
        slug: book.slug,
        title: book.title,
        status: fetchResult.status,
        error: fetchResult.error,
      });
      continue;
    }

    const text = (await import("node:fs/promises").then(m => m.readFile(fetchResult.textFile!, "utf8")));
    const terms = extractTerms(book, text);
    // Uses AI-assisted authoring when SONATA_AI_* is configured, else the
    // deterministic template (enrichBatchWithAI falls back automatically).
    const rows = await enrichBatchWithAI(book, terms, text);
    const summary = summarizeValidation(rows);

    const regionOut = join(OUT_DIR, book.region);
    await mkdir(regionOut, { recursive: true });

    // Public-safe JSONL batch (candidates only, ready for stageKnowledgeBatch input).
    const batchPath = join(regionOut, `${book.slug}.jsonl`);
    await writeFile(
      batchPath,
      rows.map(r => JSON.stringify(r.candidate)).join("\n") + (rows.length ? "\n" : ""),
      "utf8",
    );

    // Full review report (term + source sentence + validation).
    const reviewPath = join(regionOut, `${book.slug}.review.json`);
    await writeFile(
      reviewPath,
      JSON.stringify(
        {
          book: { title: book.title, author: book.author, citation: book.citation },
          summary,
          rows: rows.map(r => ({
            term: r.term.term,
            entityType: r.candidate.entityType,
            sentence: r.term.contextSentence,
            errors: r.validation.errors,
            warnings: r.validation.warnings,
            blockers: r.validation.blockers,
            duplicateRisk: r.validation.duplicateRisk,
          })),
        },
        null,
        2,
      ),
      "utf8",
    );

    report.results.push({
      region: book.region,
      slug: book.slug,
      status: fetchResult.status,
      termsExtracted: terms.length,
      validCount: summary.validCount,
      blockedCount: summary.blockedCount,
      batchFile: batchPath,
      reviewFile: reviewPath,
    });
    console.log(JSON.stringify(report.results[report.results.length - 1]));
  }

  const reportPath = join(OUT_DIR, "_run-report.json");
  await writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");
  console.log(`\nWrote report to ${reportPath}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
