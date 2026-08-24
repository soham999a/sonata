export type SearchFilters = {
  region?: string;
  tradition?: string;
  genre?: string;
  era?: string;
  instrument?: string;
  category?: string;
  language?: string;
  confidence?: "high" | "medium" | "low" | "primary";
};

export type ResearchSearchRecord = {
  publicId: string;
  slug: string;
  name: string;
  originalName?: string;
  shortDefinition: string;
  entityType: string;
  region: string;
  tradition: string;
  genre?: string;
  era?: string;
  category?: string;
  language?: string;
  confidence: "high" | "medium" | "low" | "primary";
  tags: string[];
  relationshipCount: number;
  relationshipContext?: string;
  demonstration: boolean;
};

export type RankedResearchRecord = ResearchSearchRecord & {
  score: number;
  matchReasons: string[];
};

const QUERY_ALIASES: Array<{ terms: string[]; canonical: string }> = [
  { canonical: "raga", terms: ["raga", "rag", "rāga", "राग", "indian melodic system", "indian melodic framework"] },
  { canonical: "maqam", terms: ["maqam", "maqām", "مقام", "arabic mode", "arabic modal system"] },
  { canonical: "fugue", terms: ["fugue", "baroque counterpoint", "baroque accompaniment"] },
  { canonical: "polyrhythm", terms: ["polyrhythm", "polyrhythmic", "three against two rhythm", "three against two", "cross rhythm"] },
];

export function normalizeResearchText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export function expandResearchQuery(query: string) {
  const normalized = normalizeResearchText(query);
  if (!normalized) return [];
  const alias = QUERY_ALIASES.find(group => group.terms.some(term => normalizeResearchText(term) === normalized));
  return Array.from(new Set([normalized, alias?.canonical].filter((value): value is string => Boolean(value))));
}

function editDistance(left: string, right: string) {
  const a = left.slice(0, 96);
  const b = right.slice(0, 96);
  const current = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let row = 1; row <= a.length; row += 1) {
    let previous = current[0];
    current[0] = row;
    for (let column = 1; column <= b.length; column += 1) {
      const saved = current[column];
      current[column] = Math.min(current[column] + 1, current[column - 1] + 1, previous + (a[row - 1] === b[column - 1] ? 0 : 1));
      previous = saved;
    }
  }
  return current[b.length];
}

function matchesFilters(record: ResearchSearchRecord, filters: SearchFilters) {
  const same = (candidate: string | undefined, filter: string | undefined) => !filter || normalizeResearchText(candidate ?? "").includes(normalizeResearchText(filter));
  const instrumentMatches = !filters.instrument || record.entityType.toLocaleLowerCase() === "instrument" || record.tags.some(tag => normalizeResearchText(tag).includes(normalizeResearchText(filters.instrument!)));
  const confidenceMatches = !filters.confidence || record.confidence === filters.confidence || (filters.confidence === "high" && record.confidence === "primary");
  return same(record.region, filters.region)
    && same(record.tradition, filters.tradition)
    && same(record.genre, filters.genre)
    && same(record.era, filters.era)
    && same(record.category, filters.category)
    && same(record.language, filters.language)
    && instrumentMatches
    && confidenceMatches;
}

export function rankResearchRecords(records: ResearchSearchRecord[], query: string, filters: SearchFilters = {}) {
  const terms = expandResearchQuery(query);
  return records
    .filter(record => matchesFilters(record, filters))
    .map(record => {
      const name = normalizeResearchText(record.name);
      const originalName = normalizeResearchText(record.originalName ?? "");
      const haystack = normalizeResearchText([record.shortDefinition, record.region, record.tradition, record.genre, record.era, record.category, record.language, ...record.tags].filter(Boolean).join(" "));
      const relationshipContext = normalizeResearchText(record.relationshipContext ?? "");
      const reasons = new Set<string>();
      let score = terms.length === 0 ? 20 : 0;
      for (const term of terms) {
        if (name === term) {
          score += 100;
          reasons.add("exact term");
        } else if (name.startsWith(term) || originalName.startsWith(term)) {
          score += 82;
          reasons.add(originalName.startsWith(term) ? "native-script or alternate name" : "prefix match");
        } else if (name.includes(term) || originalName.includes(term)) {
          score += 70;
          reasons.add(originalName.includes(term) ? "native-script or alternate name" : "term match");
        } else if (relationshipContext.includes(term)) {
          score += 46;
          reasons.add("relationship context match");
        } else if (haystack.includes(term)) {
          score += 48;
          reasons.add("definition or context match");
        } else if (term.length >= 3 && editDistance(name, term) <= Math.max(1, Math.floor(term.length / 4))) {
          score += 42;
          reasons.add("fuzzy term match");
        }
      }
      return { ...record, score, matchReasons: Array.from(reasons) };
    })
    .filter(record => terms.length === 0 || record.score > 0)
    .sort((left, right) => right.score - left.score || left.name.localeCompare(right.name));
}

export function paginateResearchResults<T>(items: T[], page: number, pageSize: number) {
  const safePage = Math.max(1, page);
  const safePageSize = Math.min(50, Math.max(1, pageSize));
  const totalPages = Math.max(1, Math.ceil(items.length / safePageSize));
  return {
    items: items.slice((safePage - 1) * safePageSize, safePage * safePageSize),
    page: Math.min(safePage, totalPages),
    pageSize: safePageSize,
    total: items.length,
    totalPages,
  };
}

export function buildLearningPath(records: ResearchSearchRecord[], focus?: string) {
  const ranked = rankResearchRecords(records, focus ?? "");
  const startingPoints = (ranked.length ? ranked : records.map(record => ({ ...record, score: 0, matchReasons: [] }))).slice(0, 8);
  return startingPoints.map((record, index) => ({
    step: index + 1,
    level: index < 2 ? "orient" : index < 5 ? "connect" : "extend",
    concept: record,
    prompt: index === 0 ? "Begin with the concept in its own context." : "Follow the relationship and source trail before making comparisons.",
  }));
}

export function createConceptQuiz(records: ResearchSearchRecord[]) {
  return records.slice(0, 6).map(record => ({
    conceptSlug: record.slug,
    prompt: `Which description best identifies ${record.name}?`,
    answer: record.shortDefinition,
    rubric: "Answer using the displayed Sonata record; do not infer equivalence from another musical system.",
  }));
}
