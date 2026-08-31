# Sonata Term-Extraction Toolkit

A deterministic, staged pipeline that turns freely-downloadable public-domain
music books into Sonata `KnowledgeCandidate` batches ready for
`editorial.stageKnowledgeBatch`. Nothing here fabricates content: every term is
grounded in a real source sentence from a real book, and every candidate is
run through Sonata's own publication-gate validation before it is emitted.

## Directories

```
scripts/extract/
  src/
    types.ts        shared types (BookSource, ExtractedTerm, KnowledgeCandidate)
    manifest.ts     curated, region-tagged book list (Internet Archive identifiers)
    fetch.ts        probe IA, download open fulltext, cache; retry + not-free detection
    extract.ts      extract terms from raw text (markers + lexicon + noise filter + seed cross-ref)
    enrich.ts       deterministic template authoring -> KnowledgeCandidate, then real validation
  run-extraction.ts CLI: fetch -> extract -> enrich -> validate -> write JSONL + review report
  ingest.ts         CLI: post JSONL batches to editorial.stageKnowledgeBatch
  summary.ts        CLI: print per-region book/candidate/chunk report (reads out/_run-report.json)
  data/<region>/    downloaded fulltext (cached, gitignored)
  out/<region>/     *.jsonl (candidates) + *.review.json (term/sentence/validation)
```

## Commands (run from the repo root)

```
# Extract everything (or pass region slugs to scope: south-asia middle-east …)
pnpm tsx scripts/extract/run-extraction.ts [region...]

# Show the whole manifest status + valid-candidate totals
pnpm tsx scripts/extract/summary.ts

# Stage a region's (or one book's) candidates into Sonata (admin session required)
pnpm tsx scripts/extract/ingest.ts <region | BookSlug> [sourceProvider]
```

`ingest.ts` posts plain-JSON tRPC envelopes to `editorial.stageKnowledgeBatch`,
chunking to ≤500 candidates per call (the server's input cap). Authenticate as
an admin via env:

- `SONATA_ENDPOINT` (default `http://localhost:3001/api/trpc`)
- `SONATA_COOKIE` — a raw cookie string from a signed-in admin browser session, or
- `SONATA_TOKEN` — forwarded as a `Bearer` token.

### Optional AI-assisted authoring

By default enrichment uses the **deterministic template** (cheap, offline,
fully reproducible). To have an LLM write richer, source-grounded encyclopedia
entries instead, point the toolkit at any OpenAI-compatible `/chat/completions`
endpoint:

- `SONATA_AI_BASE_URL` — e.g. `https://api.openai.com/v1`
- `SONATA_AI_KEY` — an API key
- `SONATA_AI_MODEL` — e.g. `gpt-4o-mini`
- `SONATA_AI_CONCURRENCY` — optional per-candidate concurrency (default 4)
- `SONATA_AI_DEBUG` — set `1` to log every per-term fallback

The AI only sees a real context window pulled from the book's cached fulltext,
is told to ground everything in it and never invent citations, and its output
still passes through Sonata's real validation gate. On any failure (missing
config, network, under-length output, bad JSON) the candidate silently falls
back to the deterministic template, so the pipeline never breaks.

## How the pipeline works

1. **Fetch** — each manifest book's `_djvu.txt` is fetched from the Internet
   Archive and cached under `data/<region>/`. Lending-only / access-restricted
   volumes return HTTP 401/403/404 on the open file and are marked `NOT-FREE`,
   with transient 5xx retried. Successful downloads are cached, so re-runs are
   cheap and only new books are hit.
2. **Extract** — term candidates are pulled from the fulltext using layered
   heuristics (definition markers, glossary lines, instrument/form/rhythm
   lexicon) filtered against a stopword/noise list and Sonata's own seed terms.
   Each hit keeps its surrounding source sentence + book.
3. **Enrich** — each term becomes a full `KnowledgeCandidate`: entity type,
   taxonomy slugs (region + domain), an emic description assembled from the
   book's real sentence (deterministic mode) or written by the LLM from a
   sourced context window (AI mode), source confidence, and a real citation
   (title/author/year + IA URI). Culturally sensitive terms are auto-flagged
   `requiresSpecialistReview`.
4. **Validate** — every candidate passes through Sonata's real
   `validateKnowledgeCandidate` (server/knowledge.validation.ts). The
   `.review.json` report shows each row's errors/warnings/blockers and its
   duplicate risk.

## Verified output (as of this run)

16,250 valid candidates across all 13 Sonata regions from freely-downloadable
public-domain books (approximate per region): Oceania 3,090 · Europe 1,902 ·
Latin America 2,180 · Central Asia 1,606 · Middle East 1,080 · North Africa
1,192 · South Asia 1,188 · Indigenous/traditions globally 1,049 · Sub-Saharan
Africa 858 · Southeast Asia 751 · Caribbean 474 · East Asia 441 · North America
439. Every manifest book beyond these freely-downloadable volumes is a real
scholarly book flagged `NOT-FREE` (lending-only) so the operator can decide on a
legal access path.

## Honest caveats

- **OCR quality is rough.** These are 1890s–1960s scans. The extractor surfaces
  many genuine terms alongside mangled spellings and some noise. That is exactly
  what Sonata's human **review gate** is for — staging never auto-publishes.
- **Non-Latin OCR yields ~0 Latin terms.** Books scanned in Arabic/Chinese script
  (e.g. `farmad-al-adwar`, `sancai-tuhui`) produce no Latin-script hits with the
  current extractor. These need script-aware handling later.
- **Most classic scholarly books on IA are lending-only** (HTTP 401 on open
  fulltext). The `NOT-FREE` flag tells you which volumes need a legal path
  (IA lending terms or another source) before authoring.
- **Two authoring modes, selectable per run.** The deterministic template is
  always the safe default and remains fully available; AI-assisted authoring
  (any OpenAI-compatible endpoint) layers on top and falls back automatically.
  Both feed the same validation and ingest contract, so switching modes never
  changes downstream behavior.
