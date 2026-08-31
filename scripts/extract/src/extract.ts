import type { BookSource, ExtractedTerm, RegionSlug } from "./types";

/**
 * Deterministic term extraction from a book's fulltext.
 *
 * Strategy layers (each contribution is a candidate hit):
 *  1. Definition markers: sentences that introduce a term ("X is a",
 *     "called X", "the instrument X", "the X, a ...", "known as X ...").
 *  2. Glossary/bold-word capture: lines that look like dictionary entries.
 *  3. Domain lexicon: known instrument/form/genre/rhythm/mode words are
 *     re-detected only when accompanied by a defining sentence so we do not
 *     flood the batch with every mention.
 *
 * Hits carry the surrounding sentence so the authoring stage can build a
 * context-grounded emic description.
 */

const REGION_TAXONOMY: Record<RegionSlug, string> = {
  europe: "europe",
  "south-asia": "south-asia",
  "east-asia": "east-asia",
  "southeast-asia": "southeast-asia",
  "central-asia": "central-asia",
  "middle-east": "middle-east",
  "north-africa": "north-africa",
  "sub-saharan-africa": "sub-saharan-africa",
  "north-america": "north-america",
  "latin-america": "latin-america",
  caribbean: "caribbean",
  oceania: "oceania",
  "indigenous-traditions-globally": "indigenous-traditions-globally",
};

const DOMAIN_TAXONOMY: Record<string, string> = {
  instrument: "instruments-performance",
  form: "forms-genres",
  genre: "forms-genres",
  term: "melody-modes",
};

const DOMAIN_MARKERS: Array<{ pattern: RegExp; entityType: ExtractedTerm["entityType"] }> = [
  { pattern: /(the\s+)?(?:instrument|drum|flute|lute|zither|harp|fiddle|horn|oboe|bells|strings?|bow|pipe|gong|cymbals?)\s([a-zA-Z-]+)/i, entityType: "instrument" },
  { pattern: /(?:called|known as|termed|named)\s+(?:a|an|the)?\s*([a-zA-Z-]{3,})/, entityType: "term" },
  { pattern: /([a-zA-Z-]{3,})\s+(?:is|are)\s+(?:a|an|the)\s+(?:form|genre|type|kind|mode|scale|system|cycle)/i, entityType: "form" },
  { pattern: /^([a-zA-Z-]{3,})\s+(?:is|are)\s+(?:a|an|the)\s+(?:raga|rāga|mode|scale|melodic|rhythmic|dance)/i, entityType: "term" },
];

const SEED_TERMS = new Set([
  "raga", "raag", "rāga", "rāga", "maqam", "maqām", "fugue", "polyrhythm", "tala", "tāla",
]);

const STOP_SENTENCE = /\b(?:copyright|prologue|preface|contents|index|references|bibliography|notes?|printed|press|university|copyright|introduction|chapter|published|edition|translated|calcutta|london|madras|madras|new\s+york|bombay|sometimes)\b/i;

/** Common English words and OCR noise that are never valid music terms. */
const STOP_TERMS = new Set(`
  a an and are as at be been but by for from had has have he her his i in is it its
  of on or our she so that the their them they this to was we were which with you your
  all also any each every made most other over part some such than then there these
  those under up very way ways when where who whose would not no into with without
  about above after before because between both during through within around
  april may june july august september october november december january february march
  day days night time world life king queen lord saint mrs mr dr
`.trim().split(/\s+/));

const STOP_TERM_RE = /^(?:[a-z]{1,2}|[a-z]{4,}s|ing|ed|the|and)$/i;

function tokenKey(word: string) {
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function extractTerms(book: BookSource, text: string): ExtractedTerm[] {
  const sentences = text
    .replace(/\r/g, "")
    .split(/\n+/)
    .map(s => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const hits: ExtractedTerm[] = [];
  const seen = new Set<string>();

  const addHit = (term: string, entityType: ExtractedTerm["entityType"], sentence: string, locator?: string) => {
    const clean = term.trim().replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "");
    if (clean.length < 2 || clean.length > 60) return;
    if (/\d/.test(clean)) return;
    const key = tokenKey(clean);
    if (key.length < 3) return;
    if (SEED_TERMS.has(key)) return;
    if (STOP_TERMS.has(key)) return;
    if (STOP_TERM_RE.test(key)) return;
    if (seen.has(key)) return;
    const lower = sentence;
    if (STOP_SENTENCE.test(lower)) return;
    seen.add(key);
    const alternateNames = sentence.length > 0 ? [] : undefined;
    hits.push({
      term: clean,
      key,
      entityType,
      sourceBook: book.slug,
      contextSentence: sentence,
      locator,
      region: book.region,
      alternateNames,
    });
  };

  for (const sentence of sentences) {
    for (const marker of DOMAIN_MARKERS) {
      const match = marker.pattern.exec(sentence);
      if (match) {
        addHit(match[1] ?? match[2], marker.entityType, sentence);
      }
    }
    // Glossary-line heuristic: a short line where a term is immediately followed
    // by an em-dash / colon explanation, e.g. "Gamelan — an orchestra of ..."
    const glossary = /^([a-zA-Z-]{3,30})(?:[,;:—]|\s+[-–]\s+)/.exec(sentence);
    if (glossary && sentence.length < 200) {
      addHit(glossary[1], "term", sentence);
    }
  }

  return hits;
}

export { REGION_TAXONOMY, DOMAIN_TAXONOMY, tokenKey };
