import { validateKnowledgeCandidate } from "../../../server/knowledge.validation";
import type { BookSource, ExtractedTerm, KnowledgeCandidate } from "./types";

/**
 * Enrichment: turns an extracted term + its real source sentence into a full
 * Sonata KnowledgeCandidate.
 *
 * Two authoring paths:
 *  - Deterministic (default): template-assembles the emic description from the
 *    book's actual sentence, so it is always grounded in the source rather than
 *    fabricated. Cheap, dependency-free, fully reproducible.
 *  - AI-assisted (optional): when the OpenAI-compatible env config is present,
 *    an LLM reads a real context window pulled from the book's fulltext and
 *    writes a richer emic description (and an etic comparison). It is
 *    constrained to the source passage only and NEVER invents citations. On any
 *    failure (network, missing keys, bad JSON) it falls back to the
 *    deterministic template, so the pipeline stays green.
 *
 * Enable with:  SONATA_AI_BASE_URL=... SONATA_AI_KEY=... SONATA_AI_MODEL=...
 */

const ENTITY_LABEL: Record<ExtractedTerm["entityType"], string> = {
  instrument: "instrument",
  form: "musical form",
  genre: "genre",
  term: "musical concept",
  person: "person",
  place: "place",
  work: "musical work",
  organization: "organization",
  conceptual_collection: "conceptual category",
};

function cleanSentence(sentence: string) {
  let s = sentence.replace(/\s+/g, " ").trim();
  if (s.length > 0 && !/[.!?]$/.test(s)) s += ".";
  return s;
}

function pruneSentence(sentence: string, max = 500) {
  const s = cleanSentence(sentence);
  return s.length > max ? s.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : s;
}

function confidenceFor(book: BookSource, term: ExtractedTerm): KnowledgeCandidate["sourceConfidence"] {
  if (book.author && book.year) return "medium";
  return "low";
}

function requiresReview(term: ExtractedTerm): boolean {
  // Culturally sensitive / contested terms should go to specialist review.
  const sensitive = /\b(gods?|sacred|ritual|ceremonial|holly|taboo|muslim|islam|jewish|hindu|indigenous|aboriginal|maori|amazigh)\b/i;
  return sensitive.test(term.contextSentence);
}

export function enrichTerm(book: BookSource, term: ExtractedTerm): KnowledgeCandidate {
  const citation = book.citation;
  const uri = book.kind === "internet-archive" && book.identifier
    ? `https://archive.org/details/${book.identifier}`
    : undefined;

  const described = pruneSentence(term.contextSentence);
  // Ground the emic description in the book's own sentence; expand only with a
  // clarifying lead-in so the record reads as an entry, not a raw OCR string.
  const emicDescription =
    `As presented in ${book.author}, this ${ENTITY_LABEL[term.entityType]} is described as follows: ${described} ` +
    `The term "${term.term}" is contextualised within the ${book.title}.`;

  const alternateNames = term.alternateNames && term.alternateNames.length > 0 ? term.alternateNames : undefined;

  return {
    canonicalName: term.term,
    entityType: term.entityType,
    emicDescription,
    taxonomySlugs: [REGION_SLUG_MAP[term.region], DOMAIN_SLUG_MAP[term.entityType] ?? "melody-modes"],
    sourceConfidence: confidenceFor(book, term),
    sources: [{ citation, uri }],
    alternateNames,
    requiresSpecialistReview: requiresReview(term) ? true : undefined,
  };
}

import { REGION_TAXONOMY, DOMAIN_TAXONOMY } from "./extract";
const REGION_SLUG_MAP = REGION_TAXONOMY as unknown as Record<string, string>;
const DOMAIN_SLUG_MAP = DOMAIN_TAXONOMY;

// ---------------------------------------------------------------------------
// Opt-in AI-assisted authoring
// ---------------------------------------------------------------------------

export const AI_CONFIG = {
  enabled:
    Boolean(process.env.SONATA_AI_BASE_URL) &&
    Boolean(process.env.SONATA_AI_KEY) &&
    Boolean(process.env.SONATA_AI_MODEL),
  baseUrl: process.env.SONATA_AI_BASE_URL,
  apiKey: process.env.SONATA_AI_KEY,
  model: process.env.SONATA_AI_MODEL,
  /** Per-candidate concurrency cap so a large book does not hog the API. */
  concurrency: Math.max(1, Number(process.env.SONATA_AI_CONCURRENCY ?? 4)),
} as const;

/** Number of surrounding words of raw book text pulled for a term's context. */
const CONTEXT_WORDS = 60;

/**
 * Locate a real passage of the book's fulltext around the term, to give the
 * LLM grounded material it may rephrase but not invent beyond.
 */
export function findContextWindow(fullText: string, term: ExtractedTerm, words = CONTEXT_WORDS): string {
  if (!fullText) return term.contextSentence;
  const norm = fullText.replace(/\s+/g, " ").replace(/\r/g, " ").trim();
  const lower = norm.toLowerCase();
  const needle = term.term.toLowerCase();
  const idx = lower.indexOf(needle);
  if (idx === -1) return term.contextSentence;
  const start = Math.max(0, idx - words * 7);
  const end = Math.min(norm.length, idx + needle.length + words * 7);
  return norm.slice(start, end).replace(/[ \t]{2,}/g, " ").trim().slice(0, 1200);
}

/**
 * Ask an OpenAI-compatible chat endpoint to write a grounded emic description
 * (and optional etic comparison) from the context passage. Returns the raw
 * candidate fields, or throws on any failure so the caller can fall back.
 */
async function authorWithAI(
  book: BookSource,
  term: ExtractedTerm,
  contextWindow: string,
): Promise<{ emicDescription: string; eticComparison?: string }> {
  const system = [
    "You are a careful music-encyclopedia editor for Sonata, a cross-cultural music knowledge base.",
    "Write a concise emic (insider, cultural-context) encyclopedia entry for the given term.",
    "GROUND EVERYTHING in the provided source passage. Do not invent facts, dates, or citations.",
    "If the passage is too thin or unclear to support a definition, say so plainly rather than guessing.",
    "Output STRICT JSON only, with two keys: emicDescription (string, 80-400 chars, from this culture's own perspective) and eticComparison (optional string, an outside/academic comparison, or null).",
  ].join(" ");

  const user = [
    `Book: ${book.author}, "${book.title}" (${book.year}).`,
    `Entity type: ${term.entityType}.`,
    `Term: "${term.term}"${term.alternateNames?.length ? ` (also: ${term.alternateNames.join(", ")})` : ""}`,
    `Source passage:\n"""\n${contextWindow}\n"""`,
  ].join("\n");

  const resp = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_CONFIG.apiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      temperature: 0.2,
      max_tokens: 500,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
    signal: AbortSignal.timeout(45_000),
  });

  if (!resp.ok) {
    throw new Error(`AI authoring HTTP ${resp.status}`);
  }
  const data = (await resp.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content ?? "";
  const extracted = content.match(/\{[\s\S]*\}/)?.[0] ?? content;
  const parsed = JSON.parse(extracted) as { emicDescription?: string; eticComparison?: string | null };
  const emicDescription = (parsed.emicDescription ?? "").trim();
  if (emicDescription.length < 80) {
    throw new Error("AI authoring produced an emic description under 80 characters");
  }
  return {
    emicDescription,
    eticComparison: parsed.eticComparison?.trim() ? parsed.eticComparison.trim() : undefined,
  };
}

/**
 * Async enrichment that uses AI to author the description when configured,
 * otherwise (or on any AI failure) falls back to the deterministic template.
 * `fullText` is the book's cached fulltext used to give the LLM real context.
 */
export async function enrichBatchWithAI(
  book: BookSource,
  terms: ExtractedTerm[],
  fullText: string,
): Promise<EnrichedRow[]> {
  const rows: EnrichedRow[] = [];
  const existingNames: string[] = [];
  let queue = Promise.resolve();

  for (const term of terms) {
    queue = queue.then(async () => {
      const base: KnowledgeCandidate = enrichTerm(book, term);
      let candidate: KnowledgeCandidate = base;
      if (AI_CONFIG.enabled) {
        try {
          const contextWindow = findContextWindow(fullText, term);
          const ai = await authorWithAI(book, term, contextWindow);
          candidate = {
            ...base,
            emicDescription: ai.emicDescription,
            eticComparison: ai.eticComparison,
          };
        } catch (error) {
          if (process.env.SONATA_AI_DEBUG) {
            console.warn(`[ai] fell back to deterministic for "${term.term}": ${String(error)}`);
          }
          candidate = base;
        }
      }
      const validation = validateKnowledgeCandidate(candidate, existingNames);
      rows.push({ term, candidate, validation });
      existingNames.push(candidate.canonicalName);
    });
    await queue;
  }

  return rows;
}

export function enrichBatch(book: BookSource, terms: ExtractedTerm[]): EnrichedRow[] {
  const existingNames: string[] = [];
  const rows: EnrichedRow[] = [];
  for (const term of terms) {
    const candidate = enrichTerm(book, term);
    const validation = validateKnowledgeCandidate(candidate, existingNames);
    rows.push({ term, candidate, validation });
    existingNames.push(candidate.canonicalName);
  }
  return rows;
}

export function summarizeValidation(rows: EnrichedRow[]) {
  const valid = rows.filter(r => r.validation.errors.length === 0 && r.validation.blockers.length === 0);
  const blocked = rows.filter(r => r.validation.blockers.length > 0);
  const warning = rows.filter(r => r.validation.warnings.length > 0);
  return {
    total: rows.length,
    validCount: valid.length,
    blockedCount: blocked.length,
    warningCount: warning.length,
    blockerReasons: blocked.reduce<Record<string, number>>((acc, r) => {
      for (const b of r.validation.blockers) {
        acc[b] = (acc[b] ?? 0) + 1;
      }
      return acc;
    }, {}),
  };
}
