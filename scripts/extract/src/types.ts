export type RegionSlug =
  | "europe"
  | "south-asia"
  | "east-asia"
  | "southeast-asia"
  | "central-asia"
  | "middle-east"
  | "north-africa"
  | "sub-saharan-africa"
  | "north-america"
  | "latin-america"
  | "caribbean"
  | "oceania"
  | "indigenous-traditions-globally";

export type SourceKind = "internet-archive" | "google-books";

export type BookSource = {
  region: RegionSlug;
  slug: string;
  title: string;
  author: string;
  year: string;
  kind: SourceKind;
  /** Internet Archive identifier (for internet-archive kind). */
  identifier?: string;
  /** Google Books volume id (for google-books kind). */
  volumeId?: string;
  publisher?: string;
  citation: string;
  /** True when the fulltext is freely downloadable without a lending seat. */
  freeTextKnown?: boolean;
  note?: string;
};

export type ExtractedTerm = {
  term: string;
  /** Whole candidate normalised form (lowercase) used for dedupe. */
  key: string;
  entityType: "term" | "instrument" | "form" | "genre" | "person" | "place" | "work" | "organization" | "conceptual_collection";
  sourceBook: string;
  contextSentence: string;
  /** Approximate page/section reference when detectable. */
  locator?: string;
  region: RegionSlug;
  alternateNames?: string[];
};

export type KnowledgeCandidate = {
  canonicalName: string;
  entityType: "term" | "instrument" | "form" | "genre" | "person" | "place" | "work" | "organization" | "conceptual_collection";
  emicDescription?: string;
  eticComparison?: string;
  taxonomySlugs: string[];
  sourceConfidence: "low" | "medium" | "high" | "primary";
  sources: Array<{ citation: string; uri?: string }>;
  alternateNames?: string[];
  requiresSpecialistReview?: boolean;
};
