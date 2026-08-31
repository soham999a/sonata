// server/_core/app.ts
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";
var OAUTH_STATE_COOKIE = "__Host-oauth_state";
var decodeOAuthState = (state) => {
  let decoded;
  try {
    decoded = atob(state);
  } catch {
    return { redirectUri: "" };
  }
  try {
    const parsed = JSON.parse(decoded);
    if (parsed && typeof parsed.redirectUri === "string") return parsed;
  } catch {
  }
  return { redirectUri: decoded };
};

// server/routers.ts
import { z as z2 } from "zod";

// server/db.ts
import { randomUUID } from "crypto";
import { and, desc, eq, inArray, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import {
  index,
  int,
  json,
  longtext,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core";

// shared/sonata.ts
var entityTypes = [
  "term",
  "instrument",
  "form",
  "genre",
  "person",
  "place",
  "work",
  "organization",
  "conceptual_collection"
];
var editorialStatuses = [
  "draft",
  "machine_generated",
  "machine_reviewed",
  "expert_reviewed",
  "published",
  "deprecated"
];
var nameTypes = [
  "canonical",
  "original_language",
  "native_script",
  "transliteration",
  "alternate",
  "historical"
];
var taxonomyNodeTypes = [
  "world_region",
  "region",
  "culture",
  "tradition",
  "genre",
  "era",
  "category",
  "instrument",
  "technique",
  "theory",
  "form",
  "rhythm",
  "melody",
  "harmony",
  "tuning",
  "notation",
  "performance",
  "technology"
];
var relationshipTypes = [
  "related_to",
  "part_of",
  "type_of",
  "subtype_of",
  "originated_in",
  "used_in",
  "influenced",
  "influenced_by",
  "contrasts_with",
  "synonym_of",
  "variant_of",
  "performed_with",
  "associated_with",
  "developed_from",
  "predecessor_of",
  "successor_of"
];

// drizzle/schema.ts
var users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var concepts = mysqlTable(
  "concepts",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    slug: varchar("slug", { length: 160 }).notNull(),
    entityType: mysqlEnum("entityType", entityTypes).notNull(),
    canonicalName: varchar("canonicalName", { length: 512 }).notNull(),
    shortDefinition: text("shortDefinition"),
    definition: longtext("definition"),
    emicDescription: longtext("emicDescription"),
    eticComparison: longtext("eticComparison"),
    historicalContext: longtext("historicalContext"),
    regionalVariation: longtext("regionalVariation"),
    diasporaContext: longtext("diasporaContext"),
    uncertaintyNote: longtext("uncertaintyNote"),
    practicalUsage: longtext("practicalUsage"),
    visualAudioDescription: longtext("visualAudioDescription"),
    originRegion: varchar("originRegion", { length: 255 }),
    tradition: varchar("tradition", { length: 255 }),
    culture: varchar("culture", { length: 255 }),
    genre: varchar("genre", { length: 255 }),
    category: varchar("category", { length: 255 }),
    subCategory: varchar("subCategory", { length: 255 }),
    era: varchar("era", { length: 255 }),
    period: varchar("period", { length: 255 }),
    languageOfOrigin: varchar("languageOfOrigin", { length: 128 }),
    transliteration: varchar("transliteration", { length: 512 }),
    pronunciation: varchar("pronunciation", { length: 255 }),
    partOfSpeech: varchar("partOfSpeech", { length: 128 }),
    confidenceScore: int("confidenceScore").notNull().default(0),
    sourceConfidence: varchar("sourceConfidence", { length: 16 }).notNull().default("low"),
    sourceCount: int("sourceCount").notNull().default(0),
    sourceQuality: mysqlEnum("sourceQuality", ["unassessed", "mixed", "strong", "primary"]).notNull().default("unassessed"),
    reviewNotes: longtext("reviewNotes"),
    editorialStatus: mysqlEnum("editorialStatus", editorialStatuses).notNull().default("draft"),
    createdByUserId: int("createdByUserId").references(() => users.id),
    publishedAt: timestamp("publishedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
  },
  (table) => [
    uniqueIndex("concepts_public_id_unique").on(table.publicId),
    uniqueIndex("concepts_slug_unique").on(table.slug),
    index("concepts_status_type_idx").on(table.editorialStatus, table.entityType),
    index("concepts_name_idx").on(table.canonicalName),
    index("concepts_public_filter_idx").on(table.editorialStatus, table.originRegion, table.tradition, table.era)
  ]
);
var conceptNames = mysqlTable(
  "concept_names",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId").notNull().references(() => concepts.id),
    name: varchar("name", { length: 512 }).notNull(),
    normalizedName: varchar("normalizedName", { length: 512 }).notNull(),
    nameType: mysqlEnum("nameType", nameTypes).notNull(),
    language: varchar("language", { length: 128 }),
    script: varchar("script", { length: 64 }),
    isPreferred: int("isPreferred").notNull().default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
  },
  (table) => [
    uniqueIndex("concept_names_public_id_unique").on(table.publicId),
    index("concept_names_concept_idx").on(table.conceptId),
    index("concept_names_normalized_idx").on(table.normalizedName)
  ]
);
var taxonomyNodes = mysqlTable(
  "taxonomy_nodes",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    slug: varchar("slug", { length: 160 }).notNull(),
    label: varchar("label", { length: 255 }).notNull(),
    nodeType: mysqlEnum("nodeType", taxonomyNodeTypes).notNull(),
    parentNodeId: int("parentNodeId"),
    pathKey: varchar("pathKey", { length: 1024 }).notNull(),
    culturalScope: longtext("culturalScope"),
    editorialNote: longtext("editorialNote"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
  },
  (table) => [
    uniqueIndex("taxonomy_nodes_public_id_unique").on(table.publicId),
    uniqueIndex("taxonomy_nodes_slug_unique").on(table.slug),
    index("taxonomy_parent_idx").on(table.parentNodeId),
    index("taxonomy_path_idx").on(table.pathKey)
  ]
);
var conceptTaxonomy = mysqlTable(
  "concept_taxonomy",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId").notNull().references(() => concepts.id),
    taxonomyNodeId: int("taxonomyNodeId").notNull().references(() => taxonomyNodes.id),
    relevanceWeight: int("relevanceWeight").notNull().default(100),
    contextNote: longtext("contextNote"),
    createdAt: timestamp("createdAt").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("concept_taxonomy_public_id_unique").on(table.publicId),
    uniqueIndex("concept_taxonomy_unique").on(table.conceptId, table.taxonomyNodeId),
    index("concept_taxonomy_node_idx").on(table.taxonomyNodeId)
  ]
);
var conceptRelationships = mysqlTable(
  "concept_relationships",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    sourceConceptId: int("sourceConceptId").notNull().references(() => concepts.id),
    targetConceptId: int("targetConceptId").notNull().references(() => concepts.id),
    relationshipType: mysqlEnum("relationshipType", relationshipTypes).notNull(),
    contextNote: longtext("contextNote"),
    confidenceScore: int("confidenceScore").notNull().default(0),
    sourceCount: int("sourceCount").notNull().default(0),
    editorialStatus: mysqlEnum("editorialStatus", editorialStatuses).notNull().default("draft"),
    createdByUserId: int("createdByUserId").references(() => users.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
  },
  (table) => [
    uniqueIndex("relationships_public_id_unique").on(table.publicId),
    uniqueIndex("relationships_source_target_type_unique").on(
      table.sourceConceptId,
      table.targetConceptId,
      table.relationshipType
    ),
    index("relationships_source_idx").on(table.sourceConceptId),
    index("relationships_target_idx").on(table.targetConceptId)
  ]
);
var sources = mysqlTable(
  "sources",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    sourceType: mysqlEnum("sourceType", ["book", "article", "archive", "recording", "institution", "oral_history", "other"]).notNull(),
    citation: longtext("citation").notNull(),
    locator: varchar("locator", { length: 1024 }),
    uri: varchar("uri", { length: 2048 }),
    publisher: varchar("publisher", { length: 512 }),
    publicationYear: int("publicationYear"),
    language: varchar("language", { length: 128 }),
    sourceQuality: mysqlEnum("sourceQuality", ["unassessed", "mixed", "strong", "primary"]).notNull().default("unassessed"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
  },
  (table) => [uniqueIndex("sources_public_id_unique").on(table.publicId)]
);
var conceptSources = mysqlTable(
  "concept_sources",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId").notNull().references(() => concepts.id),
    sourceId: int("sourceId").notNull().references(() => sources.id),
    claimScope: mysqlEnum("claimScope", ["definition", "history", "practice", "classification", "relationship", "other"]).notNull(),
    sourceLocator: varchar("sourceLocator", { length: 1024 }),
    confidenceScore: int("confidenceScore").notNull().default(0),
    editorialNote: longtext("editorialNote"),
    createdAt: timestamp("createdAt").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("concept_sources_public_id_unique").on(table.publicId),
    index("concept_sources_concept_idx").on(table.conceptId)
  ]
);
var conceptRevisions = mysqlTable(
  "concept_revisions",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId").notNull().references(() => concepts.id),
    version: int("version").notNull(),
    changedByUserId: int("changedByUserId").references(() => users.id),
    changeReason: longtext("changeReason").notNull(),
    previousValue: json("previousValue"),
    newValue: json("newValue").notNull(),
    changedAt: timestamp("changedAt").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("concept_revisions_public_id_unique").on(table.publicId),
    uniqueIndex("concept_revisions_version_unique").on(table.conceptId, table.version)
  ]
);
var editorialReviews = mysqlTable(
  "editorial_reviews",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId").notNull().references(() => concepts.id),
    reviewerUserId: int("reviewerUserId").references(() => users.id),
    fromStatus: mysqlEnum("fromStatus", editorialStatuses),
    toStatus: mysqlEnum("toStatus", editorialStatuses).notNull(),
    confidenceScore: int("confidenceScore").notNull().default(0),
    reviewNotes: longtext("reviewNotes"),
    createdAt: timestamp("createdAt").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("editorial_reviews_public_id_unique").on(table.publicId),
    index("editorial_reviews_concept_idx").on(table.conceptId)
  ]
);
var imports = mysqlTable(
  "imports",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    fileName: varchar("fileName", { length: 1024 }).notNull(),
    fileKey: varchar("fileKey", { length: 2048 }),
    sourceProvider: varchar("sourceProvider", { length: 512 }),
    fileFormat: mysqlEnum("fileFormat", ["csv", "json", "jsonl", "xlsx"]).notNull(),
    status: mysqlEnum("status", ["staged", "validating", "needs_review", "approved", "rejected", "published"]).notNull().default("staged"),
    submittedByUserId: int("submittedByUserId").references(() => users.id),
    report: json("report"),
    candidateCount: int("candidateCount").notNull().default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
  },
  (table) => [uniqueIndex("imports_public_id_unique").on(table.publicId)]
);
var importRows = mysqlTable(
  "import_rows",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    importId: int("importId").notNull().references(() => imports.id),
    rowNumber: int("rowNumber").notNull(),
    payload: json("payload").notNull(),
    normalizedPayload: json("normalizedPayload"),
    normalizedName: varchar("normalizedName", { length: 512 }),
    duplicateRisk: varchar("duplicateRisk", { length: 16 }).notNull().default("none"),
    sourceConfidence: varchar("sourceConfidence", { length: 16 }).notNull().default("low"),
    requiresSpecialistReview: int("requiresSpecialistReview").notNull().default(0),
    publicationAllowed: int("publicationAllowed").notNull().default(0),
    validationState: mysqlEnum("validationState", ["valid", "warning", "error"]).notNull().default("valid"),
    validationMessages: json("validationMessages"),
    proposedConceptId: int("proposedConceptId").references(() => concepts.id),
    createdAt: timestamp("createdAt").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("import_rows_public_id_unique").on(table.publicId),
    uniqueIndex("import_rows_number_unique").on(table.importId, table.rowNumber)
  ]
);
var qualityIssues = mysqlTable(
  "quality_issues",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId").references(() => concepts.id),
    importRowId: int("importRowId").references(() => importRows.id),
    issueType: mysqlEnum("issueType", ["duplicate", "orphan", "broken_reference", "circular_relationship", "missing_definition", "transliteration", "unsupported_claim", "taxonomy_review"]).notNull(),
    severity: mysqlEnum("severity", ["low", "medium", "high", "blocking"]).notNull(),
    status: mysqlEnum("status", ["open", "in_review", "resolved", "dismissed"]).notNull().default("open"),
    detail: longtext("detail").notNull(),
    metadata: json("metadata"),
    resolvedByUserId: int("resolvedByUserId").references(() => users.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
  },
  (table) => [
    uniqueIndex("quality_issues_public_id_unique").on(table.publicId),
    index("quality_issues_status_idx").on(table.status, table.severity)
  ]
);
var searchDocuments = mysqlTable(
  "search_documents",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId").notNull().references(() => concepts.id),
    normalizedName: varchar("normalizedName", { length: 512 }).notNull(),
    alternateNames: longtext("alternateNames"),
    searchableText: longtext("searchableText").notNull(),
    filterPayload: json("filterPayload"),
    indexedAt: timestamp("indexedAt").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("search_documents_public_id_unique").on(table.publicId),
    uniqueIndex("search_documents_concept_unique").on(table.conceptId),
    index("search_documents_name_idx").on(table.normalizedName)
  ]
);
var coverageTargets = mysqlTable(
  "coverage_targets",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    dimension: varchar("dimension", { length: 32 }).notNull(),
    slug: varchar("slug", { length: 160 }).notNull(),
    label: varchar("label", { length: 255 }).notNull(),
    targetCount: int("targetCount").notNull(),
    publishedCount: int("publishedCount").notNull().default(0),
    draftCount: int("draftCount").notNull().default(0),
    detail: longtext("detail"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
  },
  (table) => [
    uniqueIndex("coverage_targets_public_id_unique").on(table.publicId),
    uniqueIndex("coverage_targets_dimension_slug_unique").on(table.dimension, table.slug),
    index("coverage_targets_dimension_idx").on(table.dimension)
  ]
);
var importBatchMetrics = mysqlTable(
  "import_batch_metrics",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    importId: int("importId").notNull().references(() => imports.id),
    acceptedConcepts: int("acceptedConcepts").notNull().default(0),
    duplicatesRemoved: int("duplicatesRemoved").notNull().default(0),
    relationshipsCreated: int("relationshipsCreated").notNull().default(0),
    lowConfidenceConcepts: int("lowConfidenceConcepts").notNull().default(0),
    sourceConflicts: int("sourceConflicts").notNull().default(0),
    regionalDistribution: json("regionalDistribution"),
    categoryDistribution: json("categoryDistribution"),
    eraDistribution: json("eraDistribution"),
    qualitySummary: json("qualitySummary"),
    createdAt: timestamp("createdAt").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("import_batch_metrics_public_id_unique").on(table.publicId),
    uniqueIndex("import_batch_metrics_import_unique").on(table.importId)
  ]
);
var definitionVariants = mysqlTable(
  "definition_variants",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId").notNull().references(() => concepts.id),
    sourceId: int("sourceId").references(() => sources.id),
    definition: longtext("definition").notNull(),
    regionalContext: longtext("regionalContext"),
    historicalContext: longtext("historicalContext"),
    editorialNote: longtext("editorialNote"),
    createdAt: timestamp("createdAt").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("definition_variants_public_id_unique").on(table.publicId),
    index("definition_variants_concept_idx").on(table.conceptId)
  ]
);
var learningProgress = mysqlTable(
  "learning_progress",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    userId: int("userId").notNull().references(() => users.id),
    conceptId: int("conceptId").notNull().references(() => concepts.id),
    activityType: mysqlEnum("activityType", ["learning_path", "flashcard", "quiz"]).notNull(),
    status: mysqlEnum("status", ["not_started", "in_progress", "completed"]).notNull().default("not_started"),
    masteryScore: int("masteryScore").notNull().default(0),
    attempts: int("attempts").notNull().default(0),
    lastActivityAt: timestamp("lastActivityAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
  },
  (table) => [
    uniqueIndex("learning_progress_public_id_unique").on(table.publicId),
    uniqueIndex("learning_progress_user_concept_activity_unique").on(table.userId, table.conceptId, table.activityType),
    index("learning_progress_user_idx").on(table.userId, table.updatedAt)
  ]
);
var contributionSubmissions = mysqlTable(
  "contribution_submissions",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    submitterUserId: int("submitterUserId").notNull().references(() => users.id),
    targetConceptId: int("targetConceptId").references(() => concepts.id),
    kind: mysqlEnum("kind", ["edit", "new_term", "error", "source", "relationship"]).notNull(),
    summary: varchar("summary", { length: 512 }).notNull(),
    detail: longtext("detail").notNull(),
    sourceUrl: varchar("sourceUrl", { length: 2048 }),
    status: mysqlEnum("status", ["submitted", "in_review", "accepted", "declined"]).notNull().default("submitted"),
    reviewerUserId: int("reviewerUserId").references(() => users.id),
    reviewerNote: longtext("reviewerNote"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
  },
  (table) => [
    uniqueIndex("contribution_submissions_public_id_unique").on(table.publicId),
    index("contribution_submissions_status_idx").on(table.status, table.createdAt),
    index("contribution_submissions_target_idx").on(table.targetConceptId)
  ]
);
var assistantAudits = mysqlTable(
  "assistant_audits",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    userId: int("userId").references(() => users.id),
    question: longtext("question").notNull(),
    answer: longtext("answer").notNull(),
    retrievedConceptIds: json("retrievedConceptIds").notNull(),
    citedSourceIds: json("citedSourceIds").notNull(),
    answerStatus: mysqlEnum("answerStatus", ["grounded", "insufficient_evidence", "blocked"]).notNull(),
    model: varchar("model", { length: 160 }),
    createdAt: timestamp("createdAt").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("assistant_audits_public_id_unique").on(table.publicId),
    index("assistant_audits_status_created_idx").on(table.answerStatus, table.createdAt),
    index("assistant_audits_user_idx").on(table.userId, table.createdAt)
  ]
);

// server/sonata.demo.ts
var DEMONSTRATION_ENTRIES = [
  {
    publicId: "7f1f462a-b870-4f31-beb7-99bd96a82f1d",
    slug: "raga",
    name: "R\u0101ga",
    originalName: "\u0930\u093E\u0917",
    shortDefinition: "A melodic framework whose meaning and use vary across South Asian classical traditions.",
    entityType: "Musical concept",
    region: "South Asia",
    tradition: "Indian classical music",
    tags: ["Melody", "Performance", "Tradition"],
    relationshipCount: 7,
    demonstration: true
  },
  {
    publicId: "1fc32cd8-02e8-4dc6-a835-20cf10e9d60b",
    slug: "maqam",
    name: "Maq\u0101m",
    originalName: "\u0645\u0642\u0627\u0645",
    shortDefinition: "A family of modal concepts used in several musical cultures of West Asia and North Africa.",
    entityType: "Musical concept",
    region: "West Asia & North Africa",
    tradition: "Maq\u0101m traditions",
    tags: ["Mode", "Melody", "Tradition"],
    relationshipCount: 6,
    demonstration: true
  },
  {
    publicId: "b9a34532-17b6-43a5-b00f-0dd146e7d862",
    slug: "fugue",
    name: "Fugue",
    shortDefinition: "A contrapuntal form organized around the recurring and transformative treatment of a subject.",
    entityType: "Musical form",
    region: "Europe",
    tradition: "Western art music",
    tags: ["Form", "Counterpoint", "Baroque"],
    relationshipCount: 5,
    demonstration: true
  },
  {
    publicId: "7cdd6bf5-90cf-4711-b880-2c0df1d2e555",
    slug: "polyrhythm",
    name: "Polyrhythm",
    shortDefinition: "The concurrent organization of contrasting rhythmic patterns within a shared performance context.",
    entityType: "Rhythmic concept",
    region: "Global",
    tradition: "Multiple traditions",
    tags: ["Rhythm", "Performance", "Analysis"],
    relationshipCount: 4,
    demonstration: true
  }
];
var DEMONSTRATION_DETAILS = {
  raga: {
    ...DEMONSTRATION_ENTRIES[0],
    pronunciation: "RAA-guh",
    languageOfOrigin: "Sanskrit",
    nativeScript: "\u0930\u093E\u0917",
    transliteration: "R\u0101ga",
    definition: "This foundation record presents R\u0101ga as a culture-specific melodic concept rather than treating it as a direct synonym for a Western scale. A future curated entry will distinguish the terminology, repertoire, and performance practice of the traditions in which it is used.",
    historicalContext: "The production knowledge model can preserve multiple historical accounts and sources without silently collapsing scholarly disagreement into a single statement.",
    practicalUsage: "In Sonata, related concepts can be connected with explicitly typed relationships such as `used_in`, `part_of`, and `associated_with`, each carrying its own context and source record.",
    visualAudioDescription: "The future entry format can hold descriptive listening and performance cues alongside written explanation, without privileging notation over sound or practice.",
    theoryVisual: {
      title: "Melodic framework, not a scale substitute",
      sourceScope: "Entry framing \xB7 Jairazbhoy, 1971",
      axes: [
        { label: "Identity", value: "Culture-specific melodic framework" },
        { label: "Use", value: "Repertoire and performance practice" },
        { label: "Boundary", value: "Not a direct Western-scale synonym" }
      ],
      caution: "The diagram organizes only the source-framed dimensions of this foundation record. It does not encode pitch material, a fixed scale, or a universal analytical equivalence."
    },
    taxonomyPath: [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Melodic concepts",
      "R\u0101ga"
    ],
    related: [
      {
        slug: "maqam",
        name: "Maq\u0101m",
        relationshipType: "contrasts_with",
        note: "A separate modal concept; relation requires contextual explanation rather than equivalence."
      },
      {
        slug: "polyrhythm",
        name: "Polyrhythm",
        relationshipType: "related_to",
        note: "Representative cross-category navigation in the foundation interface."
      },
      {
        slug: "fugue",
        name: "Fugue",
        relationshipType: "contrasts_with",
        note: "A navigation bridge, not a claim of shared theoretical structure."
      }
    ],
    sources: [
      {
        label: "Scholarly monograph",
        citation: "Jairazbhoy, Nazir Ali. The R\u0101gs of North Indian Music: Their Structure and Evolution. Wesleyan University Press, 1971.",
        scope: "Entry framing",
        note: "Bibliographic details verified through the public Google Books record.",
        url: "https://books.google.com/books/about/The_R%C4%81gs_of_North_Indian_Music.html?id=xsO5AAAAIAAJ"
      },
      {
        label: "Digital item record",
        citation: "The rags of North Indian music: their structure and evolution. Internet Archive item dli.ministry.26725.",
        scope: "Access record",
        note: "A digitized item record that preserves publication metadata and access context.",
        url: "https://archive.org/details/dli.ministry.26725"
      }
    ],
    graphNodes: [
      { id: "raga", label: "R\u0101ga", x: 50, y: 49, emphasis: "main", linkable: true },
      { id: "south-asia", label: "South Asia", x: 21, y: 26 },
      { id: "melody", label: "Melody", x: 77, y: 25, emphasis: "accent" },
      { id: "performance", label: "Performance", x: 79, y: 72 },
      { id: "tradition", label: "Tradition", x: 24, y: 73 },
      { id: "maqam", label: "Maq\u0101m", x: 15, y: 49, linkable: true },
      { id: "tala", label: "T\u0101la", x: 52, y: 87 }
    ]
  }
};
var SONATA_TAXONOMY_PREVIEW = [
  { label: "World", detail: "Global starting point", count: "Open" },
  { label: "Asia", detail: "Regional pathways", count: "03" },
  { label: "Africa", detail: "Regional pathways", count: "01" },
  { label: "Europe", detail: "Regional pathways", count: "01" },
  { label: "Americas", detail: "Regional pathways", count: "01" }
];

// server/sonata.validation.ts
var HIERARCHICAL_RELATIONSHIPS = /* @__PURE__ */ new Set([
  "part_of",
  "type_of",
  "subtype_of"
]);
function normalizeSearchTerm(value) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s+/g, " ").toLocaleLowerCase();
}
function isSupportedRelationshipType(value) {
  return relationshipTypes.includes(value);
}
function wouldCreateHierarchyCycle(existingEdges, draft) {
  if (!HIERARCHICAL_RELATIONSHIPS.has(draft.relationshipType)) return false;
  if (draft.sourcePublicId === draft.targetPublicId) return true;
  const adjacency = /* @__PURE__ */ new Map();
  existingEdges.filter((edge) => HIERARCHICAL_RELATIONSHIPS.has(edge.relationshipType)).forEach((edge) => {
    const connected = adjacency.get(edge.sourcePublicId) ?? [];
    connected.push(edge.targetPublicId);
    adjacency.set(edge.sourcePublicId, connected);
  });
  const toVisit = [draft.targetPublicId];
  const visited = /* @__PURE__ */ new Set();
  while (toVisit.length > 0) {
    const current = toVisit.pop();
    if (!current || visited.has(current)) continue;
    if (current === draft.sourcePublicId) return true;
    visited.add(current);
    toVisit.push(...adjacency.get(current) ?? []);
  }
  return false;
}
function validateRelationshipDraft(draft, existingEdges = []) {
  const errors = [];
  if (!draft.sourcePublicId || !draft.targetPublicId) {
    errors.push("Both source and target concept identifiers are required.");
  }
  if (!isSupportedRelationshipType(draft.relationshipType)) {
    errors.push("The relationship type is not in Sonata\u2019s controlled vocabulary.");
  }
  if (draft.sourcePublicId === draft.targetPublicId) {
    errors.push("A concept cannot be related to itself through this relationship draft.");
  }
  if (wouldCreateHierarchyCycle(existingEdges, draft)) {
    errors.push("This hierarchical relationship would create a circular path.");
  }
  return errors;
}
function validateLegacyImportHeaders(headers) {
  const normalized = new Set(headers.map(normalizeSearchTerm));
  const required = ["id", "name", "definition"];
  return required.filter((field) => !normalized.has(field)).map((field) => `Missing required legacy-compatible field: ${field}.`);
}

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
};

// server/db.ts
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function requireDb() {
  const db = await getDb();
  if (!db) throw new Error("The Sonata knowledge database is not available. Try again after the connection is restored.");
  return db;
}
async function upsertUser(user) {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values = { openId: user.openId };
  const updateSet = {};
  ["name", "email", "loginMethod"].forEach((field) => {
    if (user[field] !== void 0) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  });
  values.role = user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user");
  updateSet.role = values.role;
  values.lastSignedIn = user.lastSignedIn ?? /* @__PURE__ */ new Date();
  updateSet.lastSignedIn = values.lastSignedIn;
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}
function makeDraftSlug(canonicalName, publicId) {
  const normalized = normalizeSearchTerm(canonicalName).replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 96);
  return `${normalized || "concept"}-draft-${publicId.slice(0, 8)}`;
}
async function createEditorialDraft(input) {
  const db = await requireDb();
  const publicId = randomUUID();
  await db.insert(concepts).values({
    publicId,
    slug: makeDraftSlug(input.canonicalName, publicId),
    canonicalName: input.canonicalName,
    definition: input.definition,
    shortDefinition: input.definition.slice(0, 280),
    entityType: input.entityType,
    editorialStatus: "draft",
    createdByUserId: input.createdByUserId,
    confidenceScore: 0,
    sourceCount: 0,
    sourceQuality: "unassessed"
  });
  return { publicId, canonicalName: input.canonicalName, status: "draft" };
}
async function createEditorialSource(input) {
  const db = await requireDb();
  const publicId = randomUUID();
  await db.insert(sources).values({
    publicId,
    sourceType: "other",
    citation: input.citation,
    locator: input.locator || null,
    sourceQuality: "unassessed"
  });
  return { publicId, citation: input.citation, status: "staged" };
}
async function reviewEditorialSource(input) {
  const db = await requireDb();
  const result = await db.update(sources).set({ sourceQuality: input.sourceQuality }).where(eq(sources.publicId, input.publicId));
  if (result[0].affectedRows === 0) throw new Error("The selected source record could not be found.");
  return { publicId: input.publicId, sourceQuality: input.sourceQuality };
}
async function createEditorialRelationship(input) {
  const db = await requireDb();
  const conceptRows = await db.select({ id: concepts.id, publicId: concepts.publicId, canonicalName: concepts.canonicalName }).from(concepts);
  const source = conceptRows.find((concept) => concept.publicId === input.sourcePublicId);
  const target = conceptRows.find((concept) => concept.publicId === input.targetPublicId);
  if (!source || !target) throw new Error("Create or import both concept records before saving a relationship between them.");
  const existing = await db.select({ sourceConceptId: conceptRelationships.sourceConceptId, targetConceptId: conceptRelationships.targetConceptId, relationshipType: conceptRelationships.relationshipType }).from(conceptRelationships);
  const idToPublicId = new Map(conceptRows.map((concept) => [concept.id, concept.publicId]));
  const existingEdges = existing.map((edge) => ({
    sourcePublicId: idToPublicId.get(edge.sourceConceptId) ?? "",
    targetPublicId: idToPublicId.get(edge.targetConceptId) ?? "",
    relationshipType: edge.relationshipType
  })).filter((edge) => Boolean(edge.sourcePublicId && edge.targetPublicId));
  const errors = validateRelationshipDraft(input, existingEdges);
  if (errors.length > 0) throw new Error(errors.join(" "));
  const publicId = randomUUID();
  await db.insert(conceptRelationships).values({
    publicId,
    sourceConceptId: source.id,
    targetConceptId: target.id,
    relationshipType: input.relationshipType,
    editorialStatus: "draft",
    createdByUserId: input.createdByUserId,
    confidenceScore: 0,
    sourceCount: 0
  });
  return { publicId, source: source.canonicalName, target: target.canonicalName, status: "draft" };
}
async function updateEditorialRelationshipStatus(input) {
  const db = await requireDb();
  const result = await db.update(conceptRelationships).set({ editorialStatus: input.editorialStatus }).where(eq(conceptRelationships.publicId, input.publicId));
  if (result[0].affectedRows === 0) throw new Error("The selected relationship draft could not be found.");
  return input;
}
async function stageEditorialImport(input) {
  const db = await requireDb();
  const errors = validateLegacyImportHeaders(input.headers);
  const publicId = randomUUID();
  const status = errors.length > 0 ? "needs_review" : "approved";
  await db.insert(imports).values({
    publicId,
    fileName: "manual-header-review.csv",
    fileFormat: "csv",
    status,
    submittedByUserId: input.createdByUserId,
    report: {
      reportVersion: 1,
      headers: input.headers,
      errors,
      stages: ["schema", "normalize", "uuid", "duplicates", "relationships", "taxonomy", "uncertainty"]
    }
  });
  return { publicId, status, errors, headers: input.headers };
}
async function getEditorialSummary() {
  const db = await requireDb();
  const [recentDrafts, recentSources, relationshipRows, conceptLabels, recentImports] = await Promise.all([
    db.select({ publicId: concepts.publicId, canonicalName: concepts.canonicalName, status: concepts.editorialStatus, updatedAt: concepts.updatedAt }).from(concepts).where(eq(concepts.editorialStatus, "draft")).orderBy(desc(concepts.updatedAt)).limit(5),
    db.select({ publicId: sources.publicId, citation: sources.citation, sourceType: sources.sourceType, sourceQuality: sources.sourceQuality, locator: sources.locator, updatedAt: sources.updatedAt }).from(sources).orderBy(desc(sources.updatedAt)).limit(5),
    db.select({ publicId: conceptRelationships.publicId, sourceConceptId: conceptRelationships.sourceConceptId, targetConceptId: conceptRelationships.targetConceptId, relationshipType: conceptRelationships.relationshipType, editorialStatus: conceptRelationships.editorialStatus, updatedAt: conceptRelationships.updatedAt }).from(conceptRelationships).orderBy(desc(conceptRelationships.updatedAt)).limit(5),
    db.select({ id: concepts.id, canonicalName: concepts.canonicalName }).from(concepts),
    db.select({ publicId: imports.publicId, fileName: imports.fileName, status: imports.status, report: imports.report, updatedAt: imports.updatedAt }).from(imports).orderBy(desc(imports.updatedAt)).limit(5)
  ]);
  const conceptNameById = new Map(conceptLabels.map((concept) => [concept.id, concept.canonicalName]));
  const recentRelationships = relationshipRows.map((record) => ({
    ...record,
    sourceName: conceptNameById.get(record.sourceConceptId) ?? "Unavailable concept",
    targetName: conceptNameById.get(record.targetConceptId) ?? "Unavailable concept"
  }));
  return { recentDrafts, recentSources, recentRelationships, recentImports };
}
function mapPublishedConcept(row) {
  return {
    publicId: row.publicId,
    slug: row.slug,
    name: row.canonicalName,
    originalName: row.transliteration ?? void 0,
    shortDefinition: row.shortDefinition ?? "A published concept awaiting a complete public summary.",
    entityType: row.entityType.replace(/_/g, " "),
    region: row.originRegion ?? "Not yet classified",
    tradition: row.tradition ?? "Context pending",
    tags: [row.category, row.era].filter((value) => Boolean(value)),
    relationshipCount: 0,
    demonstration: true
  };
}
async function getPublicEntries(limit = 18) {
  const db = await getDb();
  if (!db) return DEMONSTRATION_ENTRIES;
  const published = await db.select().from(concepts).where(eq(concepts.editorialStatus, "published")).orderBy(desc(concepts.updatedAt)).limit(limit);
  return published.length > 0 ? published.map(mapPublishedConcept) : DEMONSTRATION_ENTRIES;
}
async function getPublicEntry(slug) {
  const db = await getDb();
  if (db) {
    const published = await db.select().from(concepts).where(and(eq(concepts.slug, slug), eq(concepts.editorialStatus, "published"))).limit(1);
    const row = published[0];
    if (row) {
      const card2 = mapPublishedConcept(row);
      const [nameRows, sourceLinks, relationshipRows] = await Promise.all([
        db.select({ name: conceptNames.name, nameType: conceptNames.nameType, script: conceptNames.script }).from(conceptNames).where(eq(conceptNames.conceptId, row.id)),
        db.select({ sourceId: conceptSources.sourceId, claimScope: conceptSources.claimScope, confidenceScore: conceptSources.confidenceScore, editorialNote: conceptSources.editorialNote }).from(conceptSources).where(eq(conceptSources.conceptId, row.id)),
        db.select({ sourceConceptId: conceptRelationships.sourceConceptId, targetConceptId: conceptRelationships.targetConceptId, relationshipType: conceptRelationships.relationshipType, contextNote: conceptRelationships.contextNote }).from(conceptRelationships).where(and(eq(conceptRelationships.editorialStatus, "published"), or(eq(conceptRelationships.sourceConceptId, row.id), eq(conceptRelationships.targetConceptId, row.id))))
      ]);
      const sourceIds = sourceLinks.map((link) => link.sourceId);
      const sourceRows = sourceIds.length ? await db.select().from(sources).where(inArray(sources.id, sourceIds)) : [];
      const sourceById = new Map(sourceRows.map((source) => [source.id, source]));
      const relatedIds = relationshipRows.map((link) => link.sourceConceptId === row.id ? link.targetConceptId : link.sourceConceptId);
      const relatedRows = relatedIds.length ? await db.select({ id: concepts.id, slug: concepts.slug, canonicalName: concepts.canonicalName }).from(concepts).where(and(eq(concepts.editorialStatus, "published"), inArray(concepts.id, relatedIds))) : [];
      const relatedById = new Map(relatedRows.map((related2) => [related2.id, related2]));
      const related = relationshipRows.map((link) => {
        const relatedId = link.sourceConceptId === row.id ? link.targetConceptId : link.sourceConceptId;
        const relatedConcept = relatedById.get(relatedId);
        return relatedConcept ? { slug: relatedConcept.slug, name: relatedConcept.canonicalName, relationshipType: link.relationshipType, note: link.contextNote ?? "Source-linked relationship context is available in the editorial record." } : null;
      }).filter((related2) => Boolean(related2));
      return {
        ...card2,
        definition: row.definition ?? card2.shortDefinition,
        historicalContext: row.historicalContext ?? "Historical context has not yet been added to this record.",
        practicalUsage: row.practicalUsage ?? "Practical usage has not yet been added to this record.",
        visualAudioDescription: row.visualAudioDescription ?? "Visual and audio description has not yet been added to this record.",
        emicDescription: row.emicDescription ?? void 0,
        eticComparison: row.eticComparison ?? void 0,
        regionalVariation: row.regionalVariation ?? void 0,
        uncertaintyNote: row.uncertaintyNote ?? void 0,
        editorialStatus: row.editorialStatus,
        sourceQuality: row.sourceQuality,
        pronunciation: row.pronunciation ?? void 0,
        languageOfOrigin: row.languageOfOrigin ?? void 0,
        transliteration: row.transliteration ?? void 0,
        nativeScript: nameRows.find((name) => name.script || /[^\u0000-\u007f]/.test(name.name))?.name ?? void 0,
        taxonomyPath: ["World", row.originRegion ?? "Context pending", row.tradition ?? "Context pending", row.category ?? "Concept", row.canonicalName],
        related,
        sources: sourceLinks.flatMap((link) => {
          const source = sourceById.get(link.sourceId);
          return source ? [{ label: source.sourceType.replace(/_/g, " "), citation: source.citation, scope: link.claimScope, note: link.editorialNote ?? `${source.sourceQuality} source \xB7 confidence ${link.confidenceScore}/100`, url: source.uri ?? "#" }] : [];
        }),
        graphNodes: [{ id: row.slug, label: row.canonicalName, x: 50, y: 50, emphasis: "main", linkable: true }, ...related.slice(0, 6).map((item, index2) => ({ id: item.slug, label: item.name, x: 15 + index2 % 3 * 33, y: index2 < 3 ? 25 : 76, emphasis: index2 === 0 ? "accent" : void 0, linkable: true }))]
      };
    }
  }
  const detailedDemo = DEMONSTRATION_DETAILS[slug];
  if (detailedDemo) return detailedDemo;
  const card = DEMONSTRATION_ENTRIES.find((entry) => entry.slug === slug);
  return card ? {
    ...card,
    definition: card.shortDefinition,
    historicalContext: "This published foundation record is ready for further source-linked historical context as the curated corpus grows.",
    practicalUsage: "Use the record\u2019s taxonomy, relationships, and source trail to continue research without assuming a cross-cultural equivalent.",
    visualAudioDescription: "No licensed audio or visual example is attached to this foundation record yet. Sonata preserves descriptive context until rights-cleared media is available.",
    taxonomyPath: ["World", card.region, card.tradition, ...card.tags, card.name],
    related: [],
    sources: [],
    graphNodes: [{ id: card.slug, label: card.name, x: 50, y: 50, emphasis: "main", linkable: true }]
  } : void 0;
}
async function searchPublicEntries(query) {
  const normalizedQuery = normalizeSearchTerm(query);
  if (!normalizedQuery) return getPublicEntries();
  const db = await getDb();
  if (db) {
    const value = `%${normalizedQuery}%`;
    const published = await db.select().from(concepts).where(and(eq(concepts.editorialStatus, "published"), or(like(concepts.canonicalName, value), like(concepts.transliteration, value), like(concepts.shortDefinition, value)))).limit(18);
    if (published.length > 0) return published.map(mapPublishedConcept);
  }
  return DEMONSTRATION_ENTRIES.filter(
    (entry) => [entry.name, entry.originalName, entry.shortDefinition, entry.region, entry.tradition, ...entry.tags].filter(Boolean).some((value) => normalizeSearchTerm(value ?? "").includes(normalizedQuery))
  );
}

// server/knowledge.service.ts
import { randomUUID as randomUUID2 } from "crypto";
import { eq as eq2 } from "drizzle-orm";

// shared/sonata-coverage.ts
var REGION_COVERAGE_TARGETS = [
  { dimension: "region", slug: "europe", label: "Europe", targetCount: 1700, detail: "Art, folk, sacred, diasporic, and contemporary practices without treating Europe as the default model." },
  { dimension: "region", slug: "south-asia", label: "South Asia", targetCount: 1600, detail: "Hindustani, Carnatic, regional, folk, devotional, instrument, rhythmic, and performance clusters." },
  { dimension: "region", slug: "east-asia", label: "East Asia", targetCount: 1500, detail: "Chinese, Japanese, Korean, Indigenous/local, notation, ensemble, and instrument contexts." },
  { dimension: "region", slug: "southeast-asia", label: "Southeast Asia", targetCount: 1100, detail: "Gamelan and other regional systems, dance-music, tuning, ensemble, and performance contexts." },
  { dimension: "region", slug: "central-asia", label: "Central Asia", targetCount: 650, detail: "Modal systems, instruments, epic performance, and transregional histories." },
  { dimension: "region", slug: "middle-east", label: "Middle East", targetCount: 1300, detail: "Differentiated Arabic, Persian, Turkish, Kurdish, and related music-system vocabularies." },
  { dimension: "region", slug: "north-africa", label: "North Africa", targetCount: 650, detail: "Amazigh, Arabic, Jewish, Andalusi, Gnawa, diaspora, and locally situated practice clusters." },
  { dimension: "region", slug: "sub-saharan-africa", label: "Sub-Saharan Africa", targetCount: 1600, detail: "Regionally specific traditions, instruments, ensembles, performance contexts, and theory where documented." },
  { dimension: "region", slug: "north-america", label: "North America", targetCount: 1400, detail: "Indigenous traditions, art music, popular forms, community practice, technology, and diaspora context." },
  { dimension: "region", slug: "latin-america", label: "Latin America", targetCount: 1450, detail: "Indigenous, Afro-descendant, local, transnational, dance-music, instrument, and production contexts." },
  { dimension: "region", slug: "caribbean", label: "Caribbean", targetCount: 650, detail: "Island-specific genres, ritual, carnival, diaspora, instruments, sound-system, and recording practices." },
  { dimension: "region", slug: "oceania", label: "Oceania", targetCount: 500, detail: "Aboriginal and Torres Strait Islander, M\u0101ori, Pacific, ceremonial, local, and contemporary contexts." },
  { dimension: "region", slug: "indigenous-traditions-globally", label: "Indigenous traditions globally", targetCount: 1250, detail: "Capacity for self-identified and community-led terminology that cannot be absorbed into geographic defaults." }
];
var MATRIX_COVERAGE_TARGETS = [
  { dimension: "tradition", slug: "indian-classical", label: "Indian classical traditions", targetCount: 900, detail: "Hindustani and Carnatic systems, practice, repertoire, theory, and instruments." },
  { dimension: "tradition", slug: "arabic-music", label: "Arabic musical traditions", targetCount: 650, detail: "Maq\u0101m, ajn\u0101s, \u012Bq\u0101\u02BF\u0101t, forms, performance, and instrument contexts." },
  { dimension: "tradition", slug: "persian-music", label: "Persian musical traditions", targetCount: 400, detail: "Dastg\u0101h, radif, gusheh, \u0101v\u0101z, repertoire, and performance contexts." },
  { dimension: "tradition", slug: "east-asian-traditions", label: "East Asian traditions", targetCount: 900, detail: "Chinese, Japanese, Korean, and locally governed contexts." },
  { dimension: "tradition", slug: "southeast-asian-traditions", label: "Southeast Asian traditions", targetCount: 650, detail: "Gamelan and other systems across the region, contextualized by locality and practice." },
  { dimension: "tradition", slug: "african-traditions", label: "African traditional and diasporic traditions", targetCount: 1200, detail: "Named local traditions alongside African diasporic developments and their own histories." },
  { dimension: "tradition", slug: "latin-caribbean-traditions", label: "Latin American and Caribbean traditions", targetCount: 900, detail: "Local, Indigenous, Afro-descendant, and transnational musical lineages." },
  { dimension: "tradition", slug: "western-classical", label: "Western classical traditions", targetCount: 900, detail: "A substantial but deliberately non-dominant portion of the coverage plan." },
  { dimension: "domain", slug: "melodic-modal-systems", label: "Melodic and modal systems", targetCount: 1800, detail: "Modes, r\u0101gas, maq\u0101m-related systems, scales, melodic frameworks, and regional theory." },
  { dimension: "domain", slug: "rhythm-meter-cycle", label: "Rhythm, meter, and cycle", targetCount: 1500, detail: "T\u0101las, \u012Bq\u0101\u02BF\u0101t, timeline patterns, meters, rhythmic cycles, and performance timing." },
  { dimension: "domain", slug: "instruments-performance", label: "Instruments and performance", targetCount: 2200, detail: "Instruments, families, techniques, vocal practice, ensembles, and performance contexts." },
  { dimension: "domain", slug: "forms-genres-repertoires", label: "Forms, genres, and repertoires", targetCount: 2400, detail: "Genres, subgenres, forms, repertoire types, ceremonial and social contexts." },
  { dimension: "domain", slug: "notation-tuning-theory", label: "Notation, tuning, and theory", targetCount: 1400, detail: "Notation systems, tuning, temperament, harmonic and analytic concepts." },
  { dimension: "domain", slug: "sound-technology-production", label: "Sound, technology, and production", targetCount: 1650, detail: "Acoustics, psychoacoustics, recording, synthesis, sampling, mixing, mastering, and tools." },
  { dimension: "era", slug: "ancient", label: "Ancient", targetCount: 500, detail: "Use only when the source justifies the period label." },
  { dimension: "era", slug: "medieval", label: "Medieval", targetCount: 650, detail: "One available period lens, not a global default." },
  { dimension: "era", slug: "renaissance", label: "Renaissance", targetCount: 500, detail: "One available period lens, not a global default." },
  { dimension: "era", slug: "baroque", label: "Baroque", targetCount: 550, detail: "One available period lens, not a global default." },
  { dimension: "era", slug: "classical", label: "Classical", targetCount: 600, detail: "One available period lens, not a global default." },
  { dimension: "era", slug: "romantic", label: "Romantic", targetCount: 600, detail: "One available period lens, not a global default." },
  { dimension: "era", slug: "modern-contemporary", label: "Modern and contemporary", targetCount: 2e3, detail: "Modern, contemporary, diasporic, and evolving contexts." },
  { dimension: "era", slug: "ongoing-and-traditional", label: "Ongoing, traditional, and Indigenous", targetCount: 3500, detail: "For continuing practices where imported periodization would obscure the record." }
];
var ALL_COVERAGE_TARGETS = [...REGION_COVERAGE_TARGETS, ...MATRIX_COVERAGE_TARGETS];
var PRIMARY_COVERAGE_TARGET = REGION_COVERAGE_TARGETS.reduce(
  (total, target) => total + target.targetCount,
  0
);
var regionNodes = REGION_COVERAGE_TARGETS.map((target) => ({
  slug: target.slug,
  label: target.label,
  nodeType: "region",
  parentSlug: "world-regions",
  pathKey: `music.regions.${target.slug}`,
  culturalScope: target.detail
}));
var SONATA_GLOBAL_TAXONOMY = [
  { slug: "music", label: "Music", nodeType: "category", pathKey: "music", editorialNote: "Root of Sonata\u2019s non-exclusive, multi-path taxonomy." },
  { slug: "world-regions", label: "World regions", nodeType: "category", parentSlug: "music", pathKey: "music.regions", editorialNote: "Regional pathways are browsing aids, not cultural containers." },
  { slug: "traditions", label: "Traditions and lineages", nodeType: "category", parentSlug: "music", pathKey: "music.traditions", editorialNote: "Terms may belong to multiple traditions and historical contexts." },
  { slug: "domains", label: "Concept and practice domains", nodeType: "category", parentSlug: "music", pathKey: "music.domains" },
  { slug: "global-era-model", label: "Global era model", nodeType: "category", parentSlug: "music", pathKey: "music.eras", editorialNote: "Use local, ongoing, traditional, and Indigenous descriptors when a Western period term is not appropriate." },
  ...regionNodes,
  { slug: "hindustani", label: "Hindustani", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.hindustani" },
  { slug: "carnatic", label: "Carnatic", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.carnatic" },
  { slug: "arabic-classical", label: "Arabic classical traditions", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.arabic-classical" },
  { slug: "persian", label: "Persian traditions", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.persian" },
  { slug: "turkish", label: "Turkish traditions", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.turkish" },
  { slug: "chinese", label: "Chinese music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.chinese" },
  { slug: "japanese", label: "Japanese music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.japanese" },
  { slug: "korean", label: "Korean music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.korean" },
  { slug: "gamelan", label: "Southeast Asian gamelan traditions", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.gamelan" },
  { slug: "african-traditions", label: "African traditional music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.african-traditions" },
  { slug: "african-diasporic", label: "African diasporic traditions", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.african-diasporic" },
  { slug: "latin-american", label: "Latin American music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.latin-american" },
  { slug: "caribbean-music", label: "Caribbean music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.caribbean-music" },
  { slug: "western-classical", label: "Western classical", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.western-classical" },
  { slug: "jazz", label: "Jazz", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.jazz" },
  { slug: "blues", label: "Blues", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.blues" },
  { slug: "hip-hop", label: "Hip-hop", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.hip-hop" },
  { slug: "electronic", label: "Electronic music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.electronic" },
  { slug: "melody-modes", label: "Melody, modes, and r\u0101ga/maq\u0101m systems", nodeType: "category", parentSlug: "domains", pathKey: "music.domains.melody-modes" },
  { slug: "rhythm-cycle", label: "Rhythm, meter, and cycles", nodeType: "category", parentSlug: "domains", pathKey: "music.domains.rhythm-cycle" },
  { slug: "forms-genres", label: "Forms, genres, and repertoires", nodeType: "category", parentSlug: "domains", pathKey: "music.domains.forms-genres" },
  { slug: "instruments-performance", label: "Instruments and performance", nodeType: "category", parentSlug: "domains", pathKey: "music.domains.instruments-performance" },
  { slug: "notation-tuning", label: "Notation, tuning, and theory", nodeType: "category", parentSlug: "domains", pathKey: "music.domains.notation-tuning" },
  { slug: "technology-production", label: "Sound, technology, and production", nodeType: "category", parentSlug: "domains", pathKey: "music.domains.technology-production" },
  ...["ancient", "medieval", "renaissance", "baroque", "classical", "romantic", "modern", "contemporary", "pre-modern", "traditional", "indigenous", "ongoing"].map((slug) => ({
    slug,
    label: slug.replace(/(^|-)\w/g, (character) => character.toUpperCase()),
    nodeType: "era",
    parentSlug: "global-era-model",
    pathKey: `music.eras.${slug}`
  }))
];

// server/knowledge.validation.ts
function assessDuplicateRisk(candidate, existingNames) {
  const candidateNames = [candidate.canonicalName, ...candidate.alternateNames ?? []].map(normalizeSearchTerm).filter(Boolean);
  const known = existingNames.map(normalizeSearchTerm).filter(Boolean);
  if (candidateNames.some((name) => known.includes(name))) return "probable";
  if (candidateNames.some((name) => known.some((other) => name.includes(other) || other.includes(name)))) return "possible";
  return "none";
}
function validateKnowledgeCandidate(candidate, existingNames = []) {
  const errors = [];
  const warnings = [];
  const blockers = [];
  const normalizedKey = normalizeSearchTerm(candidate.canonicalName);
  const duplicateRisk = assessDuplicateRisk(candidate, existingNames);
  if (normalizedKey.length < 2) errors.push("A canonical concept name is required.");
  if (!candidate.taxonomySlugs.length) errors.push("At least one taxonomy pathway is required.");
  if (!candidate.emicDescription || candidate.emicDescription.trim().length < 80) {
    blockers.push("An emic description of at least 80 characters is required before publication.");
  }
  if (candidate.sources.length === 0 || candidate.sources.some((source) => source.citation.trim().length < 12)) {
    blockers.push("At least one usable source citation is required before publication.");
  }
  if (candidate.sourceConfidence === "low") {
    blockers.push("Low-confidence candidates remain unpublished until evidence is strengthened.");
  }
  if (candidate.requiresSpecialistReview) {
    blockers.push("This candidate is awaiting specialist review and cannot be published yet.");
  }
  if (duplicateRisk === "probable") blockers.push("A probable duplicate must be resolved before publication.");
  if (duplicateRisk === "possible") warnings.push("A possible duplicate should be reviewed with cultural and historical context.");
  if (candidate.eticComparison && !candidate.emicDescription) {
    errors.push("A cross-cultural comparison cannot substitute for an emic description.");
  }
  if (candidate.eticComparison) warnings.push("Cross-cultural comparison is stored separately from the primary definition.");
  return { errors, warnings, blockers, duplicateRisk, normalizedKey };
}

// server/knowledge.service.ts
async function requireKnowledgeDb() {
  const db = await getDb();
  if (!db) throw new Error("The Sonata knowledge database is not available. Try again after the connection is restored.");
  return db;
}
function tally(slugs, candidates) {
  return slugs.reduce((result, slug) => {
    result[slug] = candidates.filter((candidate) => candidate.taxonomySlugs.includes(slug)).length;
    return result;
  }, {});
}
async function bootstrapGlobalKnowledgeFramework() {
  const db = await requireKnowledgeDb();
  const existingNodes = await db.select({ id: taxonomyNodes.id, slug: taxonomyNodes.slug }).from(taxonomyNodes);
  const nodeIdBySlug = new Map(existingNodes.map((node) => [node.slug, node.id]));
  for (const seed of SONATA_GLOBAL_TAXONOMY) {
    const existingId = nodeIdBySlug.get(seed.slug);
    const parentNodeId = seed.parentSlug ? nodeIdBySlug.get(seed.parentSlug) ?? null : null;
    if (existingId) {
      await db.update(taxonomyNodes).set({
        label: seed.label,
        nodeType: seed.nodeType,
        parentNodeId,
        pathKey: seed.pathKey,
        culturalScope: seed.culturalScope ?? null,
        editorialNote: seed.editorialNote ?? null
      }).where(eq2(taxonomyNodes.id, existingId));
    } else {
      const result = await db.insert(taxonomyNodes).values({
        publicId: randomUUID2(),
        slug: seed.slug,
        label: seed.label,
        nodeType: seed.nodeType,
        parentNodeId,
        pathKey: seed.pathKey,
        culturalScope: seed.culturalScope ?? null,
        editorialNote: seed.editorialNote ?? null
      });
      nodeIdBySlug.set(seed.slug, Number(result[0].insertId));
    }
  }
  const existingTargets = await db.select({ id: coverageTargets.id, dimension: coverageTargets.dimension, slug: coverageTargets.slug }).from(coverageTargets);
  const targetIdByKey = new Map(existingTargets.map((target) => [`${target.dimension}:${target.slug}`, target.id]));
  for (const target of ALL_COVERAGE_TARGETS) {
    const existingId = targetIdByKey.get(`${target.dimension}:${target.slug}`);
    if (existingId) {
      await db.update(coverageTargets).set({ label: target.label, targetCount: target.targetCount, detail: target.detail }).where(eq2(coverageTargets.id, existingId));
    } else {
      await db.insert(coverageTargets).values({
        publicId: randomUUID2(),
        dimension: target.dimension,
        slug: target.slug,
        label: target.label,
        targetCount: target.targetCount,
        detail: target.detail
      });
    }
  }
  return getKnowledgeCoverage();
}
async function getKnowledgeCoverage() {
  const db = await getDb();
  const [targets, conceptRows] = db ? await Promise.all([
    db.select().from(coverageTargets),
    db.select({ status: concepts.editorialStatus }).from(concepts)
  ]) : [ALL_COVERAGE_TARGETS.map((target, index2) => ({
    id: index2 + 1,
    publicId: target.slug,
    dimension: target.dimension,
    slug: target.slug,
    label: target.label,
    targetCount: target.targetCount,
    publishedCount: 0,
    draftCount: 0,
    detail: target.detail
  })), []];
  const activeTargets = targets.length > 0 ? targets : ALL_COVERAGE_TARGETS;
  const editorialStatusCounts = conceptRows.reduce((result, concept) => {
    result[concept.status] = (result[concept.status] ?? 0) + 1;
    return result;
  }, {});
  return {
    primaryTarget: PRIMARY_COVERAGE_TARGET,
    publishedConcepts: conceptRows.filter((concept) => concept.status === "published").length,
    draftConcepts: conceptRows.filter((concept) => concept.status !== "published").length,
    editorialStatusCounts,
    targets: activeTargets.map((target) => ({
      dimension: target.dimension,
      slug: target.slug,
      label: target.label,
      targetCount: target.targetCount,
      publishedCount: "publishedCount" in target ? target.publishedCount : 0,
      draftCount: "draftCount" in target ? target.draftCount : 0,
      detail: target.detail ?? ""
    })),
    regions: REGION_COVERAGE_TARGETS
  };
}
async function stageKnowledgeBatch(input) {
  const db = await requireKnowledgeDb();
  const existing = await db.select({ canonicalName: concepts.canonicalName }).from(concepts);
  const assessed = input.candidates.map((candidate) => ({ candidate, result: validateKnowledgeCandidate(candidate, existing.map((concept) => concept.canonicalName)) }));
  const eligible = assessed.filter((item) => item.result.errors.length === 0 && item.result.blockers.length === 0);
  const duplicateRisks = assessed.filter((item) => item.result.duplicateRisk === "probable").length;
  const lowConfidence = assessed.filter((item) => item.candidate.sourceConfidence === "low").length;
  const requiresReview = assessed.some((item) => item.result.errors.length > 0 || item.result.blockers.length > 0 || item.result.warnings.length > 0);
  const regionalDistribution = tally(REGION_COVERAGE_TARGETS.map((target) => target.slug), input.candidates);
  const categoryDistribution = tally(["melody-modes", "rhythm-cycle", "forms-genres", "instruments-performance", "notation-tuning", "technology-production"], input.candidates);
  const eraDistribution = tally(["ancient", "medieval", "renaissance", "baroque", "classical", "romantic", "modern", "contemporary", "pre-modern", "traditional", "indigenous", "ongoing"], input.candidates);
  const publicId = randomUUID2();
  const inserted = await db.insert(imports).values({
    publicId,
    fileName: input.fileName,
    fileFormat: input.fileFormat,
    sourceProvider: input.sourceProvider ?? null,
    status: requiresReview ? "needs_review" : "approved",
    submittedByUserId: input.createdByUserId,
    candidateCount: input.candidates.length,
    report: { reportVersion: 2, importMode: "source-aware-staged-batch", candidateCount: input.candidates.length, eligibleForExpertReview: eligible.length, duplicatesHeldForReview: duplicateRisks, lowConfidence, publicationRule: "Staging never publishes a candidate; source and expert-review gates remain in force." }
  });
  const importId = Number(inserted[0].insertId);
  await db.insert(importRows).values(assessed.map(({ candidate, result }, index2) => ({
    publicId: randomUUID2(),
    importId,
    rowNumber: index2 + 1,
    payload: candidate,
    normalizedPayload: { normalizedKey: result.normalizedKey, candidate },
    normalizedName: result.normalizedKey,
    duplicateRisk: result.duplicateRisk,
    sourceConfidence: candidate.sourceConfidence,
    requiresSpecialistReview: candidate.requiresSpecialistReview ? 1 : 0,
    publicationAllowed: result.errors.length === 0 && result.blockers.length === 0 ? 1 : 0,
    validationState: result.errors.length > 0 ? "error" : result.blockers.length > 0 || result.warnings.length > 0 ? "warning" : "valid",
    validationMessages: { errors: result.errors, warnings: result.warnings, blockers: result.blockers }
  })));
  await db.insert(importBatchMetrics).values({
    publicId: randomUUID2(),
    importId,
    acceptedConcepts: eligible.length,
    duplicatesRemoved: duplicateRisks,
    relationshipsCreated: 0,
    lowConfidenceConcepts: lowConfidence,
    sourceConflicts: 0,
    regionalDistribution,
    categoryDistribution,
    eraDistribution,
    qualitySummary: { validationErrors: assessed.filter((item) => item.result.errors.length > 0).length, publicationBlockers: assessed.filter((item) => item.result.blockers.length > 0).length, specialistReviews: assessed.filter((item) => item.candidate.requiresSpecialistReview).length }
  });
  return { publicId, status: requiresReview ? "needs_review" : "approved", candidateCount: input.candidates.length, eligibleForExpertReview: eligible.length, duplicatesHeldForReview: duplicateRisks, lowConfidence, regionalDistribution, categoryDistribution, eraDistribution };
}

// server/publication.service.ts
import { randomUUID as randomUUID3 } from "crypto";
import { and as and2, eq as eq3, inArray as inArray2, or as or2 } from "drizzle-orm";
async function requirePublicationDb() {
  const db = await getDb();
  if (!db) throw new Error("The Sonata knowledge database is not available. Try again after the connection is restored.");
  return db;
}
async function refreshPublishedSearchDocument(conceptId) {
  const db = await requirePublicationDb();
  const [concept] = await db.select().from(concepts).where(eq3(concepts.id, conceptId)).limit(1);
  if (!concept || concept.editorialStatus !== "published") return;
  const names = await db.select({ name: conceptNames.name }).from(conceptNames).where(eq3(conceptNames.conceptId, concept.id));
  const alternateNames = names.map((name) => name.name);
  const normalizedName = concept.canonicalName.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
  const relationships = await db.select({ sourceConceptId: conceptRelationships.sourceConceptId, targetConceptId: conceptRelationships.targetConceptId, relationshipType: conceptRelationships.relationshipType, contextNote: conceptRelationships.contextNote }).from(conceptRelationships).where(and2(eq3(conceptRelationships.editorialStatus, "published"), or2(eq3(conceptRelationships.sourceConceptId, concept.id), eq3(conceptRelationships.targetConceptId, concept.id))));
  const relatedIds = relationships.map((relationship) => relationship.sourceConceptId === concept.id ? relationship.targetConceptId : relationship.sourceConceptId);
  const relatedConcepts = relatedIds.length ? await db.select({ id: concepts.id, canonicalName: concepts.canonicalName, transliteration: concepts.transliteration }).from(concepts).where(and2(eq3(concepts.editorialStatus, "published"), inArray2(concepts.id, relatedIds))) : [];
  const relatedById = new Map(relatedConcepts.map((related) => [related.id, related]));
  const relationshipContext = relationships.flatMap((relationship) => {
    const relatedId = relationship.sourceConceptId === concept.id ? relationship.targetConceptId : relationship.sourceConceptId;
    const related = relatedById.get(relatedId);
    return [relationship.relationshipType.replace(/_/g, " "), relationship.contextNote, related?.canonicalName, related?.transliteration].filter((value) => Boolean(value));
  });
  const searchableText = [concept.canonicalName, concept.transliteration, ...alternateNames, concept.shortDefinition, concept.definition, concept.emicDescription, concept.historicalContext, concept.practicalUsage, concept.originRegion, concept.tradition, concept.culture, concept.genre, concept.category, concept.era, concept.languageOfOrigin, ...relationshipContext].filter(Boolean).join(" ");
  const filterPayload = { region: concept.originRegion, tradition: concept.tradition, genre: concept.genre, era: concept.era, category: concept.category, language: concept.languageOfOrigin, sourceConfidence: concept.sourceConfidence, relationshipTerms: relationshipContext };
  await db.insert(searchDocuments).values({ publicId: randomUUID3(), conceptId: concept.id, normalizedName, alternateNames: alternateNames.join(" | ") || null, searchableText, filterPayload }).onDuplicateKeyUpdate({ set: { normalizedName, alternateNames: alternateNames.join(" | ") || null, searchableText, filterPayload, indexedAt: /* @__PURE__ */ new Date() } });
}
async function backfillPublishedSearchDocuments() {
  const db = await requirePublicationDb();
  const published = await db.select({ id: concepts.id }).from(concepts).where(eq3(concepts.editorialStatus, "published"));
  for (let offset = 0; offset < published.length; offset += 12) {
    await Promise.all(published.slice(offset, offset + 12).map((record) => refreshPublishedSearchDocument(record.id)));
  }
  return { indexed: published.length };
}
async function linkSourceToConcept(input) {
  const db = await requirePublicationDb();
  const [concept] = await db.select({ id: concepts.id, sourceCount: concepts.sourceCount }).from(concepts).where(eq3(concepts.publicId, input.conceptPublicId)).limit(1);
  const [source] = await db.select({ id: sources.id, sourceQuality: sources.sourceQuality }).from(sources).where(eq3(sources.publicId, input.sourcePublicId)).limit(1);
  if (!concept || !source) throw new Error("Both a persisted concept draft and a persisted source record are required before linking evidence.");
  await db.insert(conceptSources).values({ publicId: randomUUID3(), conceptId: concept.id, sourceId: source.id, claimScope: input.claimScope, confidenceScore: input.confidenceScore, editorialNote: input.editorialNote ?? null });
  const sourceConfidence = source.sourceQuality === "primary" ? "primary" : source.sourceQuality === "strong" ? "high" : source.sourceQuality === "mixed" ? "medium" : "low";
  await db.update(concepts).set({ sourceCount: concept.sourceCount + 1, sourceConfidence }).where(eq3(concepts.id, concept.id));
  return { conceptPublicId: input.conceptPublicId, sourcePublicId: input.sourcePublicId, sourceConfidence };
}
async function recordConceptUncertainty(input) {
  const db = await requirePublicationDb();
  const [concept] = await db.select({ id: concepts.id, canonicalName: concepts.canonicalName, editorialStatus: concepts.editorialStatus }).from(concepts).where(eq3(concepts.publicId, input.conceptPublicId)).limit(1);
  if (!concept) throw new Error("The selected concept record could not be found.");
  await db.update(concepts).set({ uncertaintyNote: input.uncertaintyNote, editorialStatus: "machine_reviewed" }).where(eq3(concepts.id, concept.id));
  await db.insert(editorialReviews).values({ publicId: randomUUID3(), conceptId: concept.id, reviewerUserId: input.reviewerUserId, fromStatus: concept.editorialStatus, toStatus: "machine_reviewed", confidenceScore: 0, reviewNotes: `Uncertainty recorded: ${input.uncertaintyNote}` });
  return { publicId: input.conceptPublicId, canonicalName: concept.canonicalName, status: "machine_reviewed" };
}
async function resolveConceptUncertainty(input) {
  const db = await requirePublicationDb();
  const [concept] = await db.select({ id: concepts.id, canonicalName: concepts.canonicalName, editorialStatus: concepts.editorialStatus, uncertaintyNote: concepts.uncertaintyNote }).from(concepts).where(eq3(concepts.publicId, input.conceptPublicId)).limit(1);
  if (!concept) throw new Error("The selected concept record could not be found.");
  if (!concept.uncertaintyNote) throw new Error("This concept has no recorded uncertainty flag to resolve.");
  await db.update(concepts).set({ uncertaintyNote: null, editorialStatus: "draft" }).where(eq3(concepts.id, concept.id));
  await db.insert(editorialReviews).values({ publicId: randomUUID3(), conceptId: concept.id, reviewerUserId: input.reviewerUserId, fromStatus: concept.editorialStatus, toStatus: "draft", confidenceScore: 0, reviewNotes: `Uncertainty resolved: ${input.resolutionNote}` });
  return { publicId: input.conceptPublicId, canonicalName: concept.canonicalName, status: "draft" };
}
async function approveConceptForExpertReview(input) {
  const db = await requirePublicationDb();
  const [concept] = await db.select({ id: concepts.id, canonicalName: concepts.canonicalName, editorialStatus: concepts.editorialStatus, sourceCount: concepts.sourceCount, sourceConfidence: concepts.sourceConfidence, emicDescription: concepts.emicDescription, uncertaintyNote: concepts.uncertaintyNote }).from(concepts).where(eq3(concepts.publicId, input.conceptPublicId)).limit(1);
  if (!concept) throw new Error("The selected concept record could not be found.");
  const blockers = [concept.sourceCount < 1 ? "at least one linked source" : null, concept.sourceConfidence === "low" ? "source confidence above low" : null, !concept.emicDescription || concept.emicDescription.trim().length < 80 ? "an emic description of at least 80 characters" : null, concept.uncertaintyNote ? "resolution of the recorded uncertainty flag" : null].filter(Boolean);
  if (blockers.length) throw new Error(`This record cannot reach expert review until it has ${blockers.join(", ")}.`);
  await db.update(concepts).set({ editorialStatus: "expert_reviewed", confidenceScore: input.confidenceScore, reviewNotes: input.reviewNotes }).where(eq3(concepts.id, concept.id));
  await db.insert(editorialReviews).values({ publicId: randomUUID3(), conceptId: concept.id, reviewerUserId: input.reviewerUserId, fromStatus: concept.editorialStatus, toStatus: "expert_reviewed", confidenceScore: input.confidenceScore, reviewNotes: input.reviewNotes });
  return { publicId: input.conceptPublicId, canonicalName: concept.canonicalName, status: "expert_reviewed" };
}
async function publishExpertReviewedConcept(input) {
  const db = await requirePublicationDb();
  const [concept] = await db.select({ id: concepts.id, canonicalName: concepts.canonicalName, editorialStatus: concepts.editorialStatus }).from(concepts).where(eq3(concepts.publicId, input.conceptPublicId)).limit(1);
  if (!concept) throw new Error("The selected concept record could not be found.");
  if (concept.editorialStatus !== "expert_reviewed") throw new Error("Only an explicitly expert-reviewed concept can be published.");
  const publishedAt = /* @__PURE__ */ new Date();
  await db.update(concepts).set({ editorialStatus: "published", publishedAt }).where(eq3(concepts.id, concept.id));
  await refreshPublishedSearchDocument(concept.id);
  await db.insert(editorialReviews).values({ publicId: randomUUID3(), conceptId: concept.id, reviewerUserId: input.reviewerUserId, fromStatus: "expert_reviewed", toStatus: "published", confidenceScore: 100, reviewNotes: "Explicit editorial publication approval." });
  return { publicId: input.conceptPublicId, canonicalName: concept.canonicalName, status: "published", publishedAt };
}

// server/research.service.ts
import { randomUUID as randomUUID4 } from "crypto";
import { and as and3, desc as desc2, eq as eq4, inArray as inArray3, like as like2, or as or3 } from "drizzle-orm";

// shared/sonata-research.ts
var QUERY_ALIASES = [
  { canonical: "raga", terms: ["raga", "rag", "r\u0101ga", "\u0930\u093E\u0917", "indian melodic system", "indian melodic framework"] },
  { canonical: "maqam", terms: ["maqam", "maq\u0101m", "\u0645\u0642\u0627\u0645", "arabic mode", "arabic modal system"] },
  { canonical: "fugue", terms: ["fugue", "baroque counterpoint", "baroque accompaniment"] },
  { canonical: "polyrhythm", terms: ["polyrhythm", "polyrhythmic", "three against two rhythm", "three against two", "cross rhythm"] }
];
function normalizeResearchText(value) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim().replace(/\s+/g, " ");
}
function expandResearchQuery(query) {
  const normalized = normalizeResearchText(query);
  if (!normalized) return [];
  const alias = QUERY_ALIASES.find((group) => group.terms.some((term) => normalizeResearchText(term) === normalized));
  return Array.from(new Set([normalized, alias?.canonical].filter((value) => Boolean(value))));
}
function editDistance(left, right) {
  const a = left.slice(0, 96);
  const b = right.slice(0, 96);
  const current = Array.from({ length: b.length + 1 }, (_, index2) => index2);
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
function matchesFilters(record, filters) {
  const same = (candidate, filter) => !filter || normalizeResearchText(candidate ?? "").includes(normalizeResearchText(filter));
  const instrumentMatches = !filters.instrument || record.entityType.toLocaleLowerCase() === "instrument" || record.tags.some((tag) => normalizeResearchText(tag).includes(normalizeResearchText(filters.instrument)));
  const confidenceMatches = !filters.confidence || record.confidence === filters.confidence || filters.confidence === "high" && record.confidence === "primary";
  return same(record.region, filters.region) && same(record.tradition, filters.tradition) && same(record.genre, filters.genre) && same(record.era, filters.era) && same(record.category, filters.category) && same(record.language, filters.language) && instrumentMatches && confidenceMatches;
}
function rankResearchRecords(records, query, filters = {}) {
  const terms = expandResearchQuery(query);
  return records.filter((record) => matchesFilters(record, filters)).map((record) => {
    const name = normalizeResearchText(record.name);
    const originalName = normalizeResearchText(record.originalName ?? "");
    const haystack = normalizeResearchText([record.shortDefinition, record.region, record.tradition, record.genre, record.era, record.category, record.language, ...record.tags].filter(Boolean).join(" "));
    const relationshipContext = normalizeResearchText(record.relationshipContext ?? "");
    const reasons = /* @__PURE__ */ new Set();
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
  }).filter((record) => terms.length === 0 || record.score > 0).sort((left, right) => right.score - left.score || left.name.localeCompare(right.name));
}
function paginateResearchResults(items, page, pageSize) {
  const safePage = Math.max(1, page);
  const safePageSize = Math.min(50, Math.max(1, pageSize));
  const totalPages = Math.max(1, Math.ceil(items.length / safePageSize));
  return {
    items: items.slice((safePage - 1) * safePageSize, safePage * safePageSize),
    page: Math.min(safePage, totalPages),
    pageSize: safePageSize,
    total: items.length,
    totalPages
  };
}
function buildLearningPath(records, focus) {
  const ranked = rankResearchRecords(records, focus ?? "");
  const startingPoints = (ranked.length ? ranked : records.map((record) => ({ ...record, score: 0, matchReasons: [] }))).slice(0, 8);
  return startingPoints.map((record, index2) => ({
    step: index2 + 1,
    level: index2 < 2 ? "orient" : index2 < 5 ? "connect" : "extend",
    concept: record,
    prompt: index2 === 0 ? "Begin with the concept in its own context." : "Follow the relationship and source trail before making comparisons."
  }));
}
function createConceptQuiz(records) {
  return records.slice(0, 6).map((record) => ({
    conceptSlug: record.slug,
    prompt: `Which description best identifies ${record.name}?`,
    answer: record.shortDefinition,
    rubric: "Answer using the displayed Sonata record; do not infer equivalence from another musical system."
  }));
}

// shared/sonata-guardrails.ts
function decideAssistantEvidence(recordCount, linkedSourceCount) {
  return recordCount > 0 && linkedSourceCount > 0 ? "grounded" : "insufficient_evidence";
}
function normalizeContributionForModeration(input) {
  const summary = input.summary.trim();
  const detail = input.detail.trim();
  if (summary.length < 5 || detail.length < 20) throw new Error("A contribution needs a concise summary and enough editorial detail to review.");
  return { ...input, summary, detail, sourceUrl: input.sourceUrl?.trim() || void 0, status: "submitted" };
}
function summarizeKnowledgeHealth(conceptRows, relationshipStatuses) {
  const counts = conceptRows.reduce((result, record) => {
    result[record.editorialStatus] = (result[record.editorialStatus] ?? 0) + 1;
    return result;
  }, {});
  return {
    counts,
    coverage: {
      regions: Array.from(new Set(conceptRows.map((row) => row.originRegion).filter(Boolean))).length,
      categories: Array.from(new Set(conceptRows.map((row) => row.category).filter(Boolean))).length
    },
    lowConfidence: conceptRows.filter((record) => record.sourceConfidence === "low" || record.sourceCount === 0),
    relationshipHealth: { reviewed: relationshipStatuses.filter((status) => status === "published").length, needsReview: relationshipStatuses.filter((status) => status !== "published").length }
  };
}

// server/_core/llm.ts
var ensureArray = (value) => Array.isArray(value) ? value : [value];
var normalizeContentPart = (part) => {
  if (typeof part === "string") {
    return { type: "text", text: part };
  }
  if (part.type === "text") {
    return part;
  }
  if (part.type === "image_url") {
    return part;
  }
  if (part.type === "file_url") {
    return part;
  }
  throw new Error("Unsupported message content part");
};
var normalizeMessage = (message) => {
  const { role, name, tool_call_id } = message;
  if (role === "tool" || role === "function") {
    const content = ensureArray(message.content).map((part) => typeof part === "string" ? part : JSON.stringify(part)).join("\n");
    return {
      role,
      name,
      tool_call_id,
      content
    };
  }
  const contentParts = ensureArray(message.content).map(normalizeContentPart);
  if (contentParts.length === 1 && contentParts[0].type === "text") {
    return {
      role,
      name,
      content: contentParts[0].text
    };
  }
  return {
    role,
    name,
    content: contentParts
  };
};
var normalizeToolChoice = (toolChoice, tools) => {
  if (!toolChoice) return void 0;
  if (toolChoice === "none" || toolChoice === "auto") {
    return toolChoice;
  }
  if (toolChoice === "required") {
    if (!tools || tools.length === 0) {
      throw new Error(
        "tool_choice 'required' was provided but no tools were configured"
      );
    }
    if (tools.length > 1) {
      throw new Error(
        "tool_choice 'required' needs a single tool or specify the tool name explicitly"
      );
    }
    return {
      type: "function",
      function: { name: tools[0].function.name }
    };
  }
  if ("name" in toolChoice) {
    return {
      type: "function",
      function: { name: toolChoice.name }
    };
  }
  return toolChoice;
};
var resolveApiUrl = () => ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0 ? `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions` : "https://forge.manus.im/v1/chat/completions";
var assertApiKey = () => {
  if (!ENV.forgeApiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
};
var normalizeResponseFormat = ({
  responseFormat,
  response_format,
  outputSchema,
  output_schema
}) => {
  const explicitFormat = responseFormat || response_format;
  if (explicitFormat) {
    if (explicitFormat.type === "json_schema" && !explicitFormat.json_schema?.schema) {
      throw new Error(
        "responseFormat json_schema requires a defined schema object"
      );
    }
    return explicitFormat;
  }
  const schema = outputSchema || output_schema;
  if (!schema) return void 0;
  if (!schema.name || !schema.schema) {
    throw new Error("outputSchema requires both name and schema");
  }
  return {
    type: "json_schema",
    json_schema: {
      name: schema.name,
      schema: schema.schema,
      ...typeof schema.strict === "boolean" ? { strict: schema.strict } : {}
    }
  };
};
var RETRY_MAX_RETRIES = 4;
var RETRY_BASE_DELAY_MS = 500;
var RETRY_MAX_DELAY_MS = 3e4;
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var parseRetryAfter = (value) => {
  if (!value) return void 0;
  const seconds = Number(value);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1e3);
  const at = Date.parse(value);
  return Number.isNaN(at) ? void 0 : Math.max(0, at - Date.now());
};
var computeBackoffDelay = (attempt, retryAfterMs) => {
  const cap = Math.min(RETRY_BASE_DELAY_MS * 2 ** attempt, RETRY_MAX_DELAY_MS);
  const jittered = cap / 2 + Math.random() * (cap / 2);
  return Math.min(Math.max(jittered, retryAfterMs ?? 0), RETRY_MAX_DELAY_MS);
};
var fetchWithBackoff = async (url, init) => {
  let lastError;
  for (let attempt = 0; attempt <= RETRY_MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, init);
      if (response.ok || attempt === RETRY_MAX_RETRIES) {
        return response;
      }
      const retryAfterMs = parseRetryAfter(
        response.headers.get("retry-after")
      );
      try {
        await response.body?.cancel();
      } catch {
      }
      console.warn(
        `LLM request retry ${attempt + 1}/${RETRY_MAX_RETRIES} after status ${response.status}`
      );
      await sleep(computeBackoffDelay(attempt, retryAfterMs));
    } catch (error) {
      lastError = error;
      if (attempt === RETRY_MAX_RETRIES) throw error;
      console.warn(
        `LLM request retry ${attempt + 1}/${RETRY_MAX_RETRIES} after network error`
      );
      await sleep(computeBackoffDelay(attempt));
    }
  }
  throw lastError instanceof Error ? lastError : new Error("LLM request failed after exhausting retries");
};
async function invokeLLM(params) {
  assertApiKey();
  const {
    messages,
    tools,
    toolChoice,
    tool_choice,
    outputSchema,
    output_schema,
    responseFormat,
    response_format,
    model,
    thinking,
    reasoning,
    maxTokens,
    max_tokens
  } = params;
  const payload = {
    messages: messages.map(normalizeMessage)
  };
  if (model) {
    payload.model = model;
  }
  if (tools && tools.length > 0) {
    payload.tools = tools;
  }
  const normalizedToolChoice = normalizeToolChoice(
    toolChoice || tool_choice,
    tools
  );
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }
  const resolvedMaxTokens = max_tokens ?? maxTokens;
  if (typeof resolvedMaxTokens === "number") {
    payload.max_tokens = resolvedMaxTokens;
  }
  if (thinking) {
    payload.thinking = thinking;
  }
  if (reasoning) {
    payload.reasoning = reasoning;
  }
  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema
  });
  if (normalizedResponseFormat) {
    payload.response_format = normalizedResponseFormat;
  }
  const response = await fetchWithBackoff(resolveApiUrl(), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${ENV.forgeApiKey}`
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM invoke failed: ${response.status} ${response.statusText} \u2013 ${errorText}`
    );
  }
  return await response.json();
}
async function listLLMModels() {
  assertApiKey();
  const url = ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0 ? `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/models` : "https://forge.manus.im/v1/models";
  const response = await fetchWithBackoff(url, {
    headers: { authorization: `Bearer ${ENV.forgeApiKey}` }
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `List LLM models failed: ${response.status} ${response.statusText} \u2013 ${errorText}`
    );
  }
  return await response.json();
}

// server/research.service.ts
var confidenceFromSourceQuality = (value) => value === "primary" ? "primary" : value === "strong" ? "high" : value === "mixed" ? "medium" : "low";
function mapPublishedRecord(row, alternateNames = [], relationshipCount = 0, relationshipContext = "") {
  return {
    publicId: row.publicId,
    slug: row.slug,
    name: row.canonicalName,
    originalName: alternateNames.find((name) => /[^\u0000-\u007f]/.test(name)) ?? row.transliteration ?? void 0,
    shortDefinition: row.shortDefinition ?? row.definition?.slice(0, 280) ?? "A published concept awaiting a complete public summary.",
    entityType: row.entityType.replace(/_/g, " "),
    region: row.originRegion ?? "Not yet classified",
    tradition: row.tradition ?? "Context pending",
    genre: row.genre ?? void 0,
    era: row.era ?? row.period ?? void 0,
    category: row.category ?? void 0,
    language: row.languageOfOrigin ?? void 0,
    confidence: confidenceFromSourceQuality(row.sourceQuality),
    tags: [row.category, row.genre, row.era, row.entityType].filter((value) => Boolean(value)),
    relationshipCount,
    relationshipContext,
    demonstration: false
  };
}
function mapDemonstrationRecord(record) {
  return {
    ...record,
    genre: record.tags.find((tag) => ["Form", "Mode", "Rhythm"].includes(tag)),
    category: record.tags[0],
    confidence: "high",
    demonstration: true
  };
}
async function getPersistedSearchCandidates(query, filters) {
  const db = await getDb();
  if (!db) return [];
  const terms = expandResearchQuery(query);
  const filterConditions = [eq4(concepts.editorialStatus, "published")];
  if (filters.region) filterConditions.push(like2(concepts.originRegion, `%${filters.region}%`));
  if (filters.tradition) filterConditions.push(like2(concepts.tradition, `%${filters.tradition}%`));
  if (filters.genre) filterConditions.push(like2(concepts.genre, `%${filters.genre}%`));
  if (filters.era) filterConditions.push(like2(concepts.era, `%${filters.era}%`));
  if (filters.category) filterConditions.push(like2(concepts.category, `%${filters.category}%`));
  if (filters.language) filterConditions.push(like2(concepts.languageOfOrigin, `%${filters.language}%`));
  if (filters.instrument) filterConditions.push(or3(eq4(concepts.entityType, "instrument"), like2(concepts.category, `%${filters.instrument}%`)));
  const directConditions = terms.flatMap((term) => [like2(concepts.canonicalName, `%${term}%`), like2(concepts.transliteration, `%${term}%`), like2(concepts.shortDefinition, `%${term}%`), like2(concepts.definition, `%${term}%`)]);
  const directRows = await db.select().from(concepts).where(and3(...filterConditions, ...directConditions.length ? [or3(...directConditions)] : [])).orderBy(desc2(concepts.updatedAt)).limit(120);
  const matchedNameRows = terms.length ? await db.select({ conceptId: conceptNames.conceptId }).from(conceptNames).where(or3(...terms.map((term) => like2(conceptNames.normalizedName, `%${term}%`)))).limit(120) : [];
  const matchedDocumentRows = terms.length ? await db.select({ conceptId: searchDocuments.conceptId }).from(searchDocuments).where(or3(...terms.map((term) => or3(like2(searchDocuments.normalizedName, `%${term}%`), like2(searchDocuments.searchableText, `%${term}%`))))).limit(120) : [];
  const supplementalIds = Array.from(new Set([...matchedNameRows, ...matchedDocumentRows].map((row) => row.conceptId)));
  const supplementalRows = supplementalIds.length ? await db.select().from(concepts).where(and3(...filterConditions, inArray3(concepts.id, supplementalIds))).limit(120) : [];
  const rows = Array.from(new Map([...directRows, ...supplementalRows].map((row) => [row.id, row])).values());
  if (!rows.length) return [];
  const ids = rows.map((row) => row.id);
  const [nameRows, relationshipRows] = await Promise.all([
    db.select({ conceptId: conceptNames.conceptId, name: conceptNames.name }).from(conceptNames).where(inArray3(conceptNames.conceptId, ids)),
    db.select({ sourceConceptId: conceptRelationships.sourceConceptId, targetConceptId: conceptRelationships.targetConceptId, relationshipType: conceptRelationships.relationshipType, contextNote: conceptRelationships.contextNote }).from(conceptRelationships).where(and3(eq4(conceptRelationships.editorialStatus, "published"), or3(inArray3(conceptRelationships.sourceConceptId, ids), inArray3(conceptRelationships.targetConceptId, ids))))
  ]);
  const namesByConcept = /* @__PURE__ */ new Map();
  for (const name of nameRows) namesByConcept.set(name.conceptId, [...namesByConcept.get(name.conceptId) ?? [], name.name]);
  const relationshipCounts = /* @__PURE__ */ new Map();
  const relatedIds = Array.from(new Set(relationshipRows.flatMap((relationship) => [relationship.sourceConceptId, relationship.targetConceptId]).filter((id) => !ids.includes(id))));
  const relatedRows = relatedIds.length ? await db.select({ id: concepts.id, canonicalName: concepts.canonicalName, transliteration: concepts.transliteration }).from(concepts).where(and3(eq4(concepts.editorialStatus, "published"), inArray3(concepts.id, relatedIds))) : [];
  const relatedById = new Map(relatedRows.map((related) => [related.id, related]));
  const relationshipContextById = /* @__PURE__ */ new Map();
  for (const relationship of relationshipRows) {
    relationshipCounts.set(relationship.sourceConceptId, (relationshipCounts.get(relationship.sourceConceptId) ?? 0) + 1);
    relationshipCounts.set(relationship.targetConceptId, (relationshipCounts.get(relationship.targetConceptId) ?? 0) + 1);
    for (const conceptId of [relationship.sourceConceptId, relationship.targetConceptId].filter((id) => ids.includes(id))) {
      const related = relatedById.get(conceptId === relationship.sourceConceptId ? relationship.targetConceptId : relationship.sourceConceptId);
      const context = [relationship.relationshipType.replace(/_/g, " "), relationship.contextNote, related?.canonicalName, related?.transliteration].filter((value) => Boolean(value)).join(" ");
      relationshipContextById.set(conceptId, [...relationshipContextById.get(conceptId) ?? [], context]);
    }
  }
  return rows.map((row) => mapPublishedRecord(row, namesByConcept.get(row.id), relationshipCounts.get(row.id) ?? 0, (relationshipContextById.get(row.id) ?? []).join(" ")));
}
async function searchSonataKnowledge(input) {
  const filters = input.filters ?? {};
  const persisted = await getPersistedSearchCandidates(input.query, filters);
  const fallback = persisted.length ? [] : (await getPublicEntries(80)).map(mapDemonstrationRecord);
  const ranked = rankResearchRecords([...persisted, ...fallback], input.query, filters);
  const paginated = paginateResearchResults(ranked, input.page ?? 1, input.pageSize ?? 18);
  return {
    ...paginated,
    query: input.query,
    modes: ["exact", "fuzzy", "synonym", "transliteration", "native-script", "definition", "relationship-context"],
    researchNotice: "Results are drawn from published Sonata records and their indexed names or context. A contextual match is not a claim of equivalence.",
    facets: {
      regions: Array.from(new Set(ranked.map((record) => record.region).filter(Boolean))).slice(0, 24),
      traditions: Array.from(new Set(ranked.map((record) => record.tradition).filter(Boolean))).slice(0, 24),
      eras: Array.from(new Set(ranked.map((record) => record.era).filter((value) => Boolean(value)))).slice(0, 24),
      categories: Array.from(new Set(ranked.flatMap((record) => record.tags))).slice(0, 24)
    }
  };
}
async function getLearningExperience(focus) {
  const result = await searchSonataKnowledge({ query: focus ?? "", pageSize: 24 });
  const records = result.items;
  return {
    focus: focus ?? "Explore the language of music",
    path: buildLearningPath(records, focus),
    flashcards: records.slice(0, 8).map((record) => ({ concept: record.name, prompt: "Name the concept from its context.", answer: record.shortDefinition, sourceSlug: record.slug })),
    quiz: createConceptQuiz(records),
    note: "Learning prompts are generated from published Sonata records. They are not a substitute for the source trail attached to each concept."
  };
}
async function recordLearningActivity(input) {
  const db = await getDb();
  if (!db) throw new Error("The Sonata knowledge database is not available.");
  const [concept] = await db.select({ id: concepts.id }).from(concepts).where(and3(eq4(concepts.slug, input.conceptSlug), eq4(concepts.editorialStatus, "published"))).limit(1);
  if (!concept) throw new Error("Learning progress can only be recorded for published Sonata concepts.");
  const existing = await db.select({ id: learningProgress.id, attempts: learningProgress.attempts }).from(learningProgress).where(and3(eq4(learningProgress.userId, input.userId), eq4(learningProgress.conceptId, concept.id), eq4(learningProgress.activityType, input.activityType))).limit(1);
  const values = { masteryScore: Math.max(0, Math.min(100, input.masteryScore)), status: input.completed ? "completed" : "in_progress", lastActivityAt: /* @__PURE__ */ new Date() };
  if (existing[0]) {
    await db.update(learningProgress).set({ ...values, attempts: existing[0].attempts + 1 }).where(eq4(learningProgress.id, existing[0].id));
  } else {
    await db.insert(learningProgress).values({ publicId: randomUUID4(), userId: input.userId, conceptId: concept.id, activityType: input.activityType, attempts: 1, ...values });
  }
  return { conceptSlug: input.conceptSlug, ...values };
}
async function submitContribution(input) {
  const db = await getDb();
  if (!db) throw new Error("The Sonata knowledge database is not available.");
  const contribution = normalizeContributionForModeration(input);
  const target = input.targetSlug ? await db.select({ id: concepts.id }).from(concepts).where(eq4(concepts.slug, input.targetSlug)).limit(1) : [];
  if (input.targetSlug && !target[0]) throw new Error("The selected Sonata concept could not be found.");
  const publicId = randomUUID4();
  await db.insert(contributionSubmissions).values({ publicId, submitterUserId: input.userId, targetConceptId: target[0]?.id ?? null, kind: contribution.kind, summary: contribution.summary, detail: contribution.detail, sourceUrl: contribution.sourceUrl ?? null });
  return { publicId, status: "submitted", moderationNotice: "Contributions enter editorial moderation and do not change public knowledge automatically." };
}
async function getKnowledgeHealth() {
  const db = await getDb();
  if (!db) return { available: false, counts: {}, lowConfidence: [], openIssues: [], moderation: [], relationshipHealth: { reviewed: 0, needsReview: 0 } };
  const [conceptRows, issueRows, moderationRows, relationshipRows] = await Promise.all([
    db.select({ publicId: concepts.publicId, canonicalName: concepts.canonicalName, editorialStatus: concepts.editorialStatus, sourceConfidence: concepts.sourceConfidence, sourceCount: concepts.sourceCount, originRegion: concepts.originRegion, category: concepts.category }).from(concepts),
    db.select({ publicId: qualityIssues.publicId, issueType: qualityIssues.issueType, severity: qualityIssues.severity, detail: qualityIssues.detail, status: qualityIssues.status }).from(qualityIssues).where(or3(eq4(qualityIssues.status, "open"), eq4(qualityIssues.status, "in_review"))).orderBy(desc2(qualityIssues.updatedAt)).limit(20),
    db.select({ publicId: contributionSubmissions.publicId, kind: contributionSubmissions.kind, summary: contributionSubmissions.summary, status: contributionSubmissions.status, createdAt: contributionSubmissions.createdAt }).from(contributionSubmissions).where(or3(eq4(contributionSubmissions.status, "submitted"), eq4(contributionSubmissions.status, "in_review"))).orderBy(desc2(contributionSubmissions.createdAt)).limit(20),
    db.select({ editorialStatus: conceptRelationships.editorialStatus }).from(conceptRelationships)
  ]);
  const summary = summarizeKnowledgeHealth(conceptRows, relationshipRows.map((row) => row.editorialStatus));
  return {
    available: true,
    counts: summary.counts,
    coverage: summary.coverage,
    lowConfidence: summary.lowConfidence.slice(0, 20),
    openIssues: issueRows,
    moderation: moderationRows,
    relationshipHealth: summary.relationshipHealth
  };
}
async function answerWithSonataEvidence(input) {
  const retrieval = await searchSonataKnowledge({ query: input.question, pageSize: 4 });
  const evidence = (await Promise.all(retrieval.items.slice(0, 4).map((record) => getPublicEntry(record.slug)))).filter((record) => Boolean(record));
  const sourceCards = evidence.flatMap((record) => record.sources.map((source) => ({ concept: record.name, ...source })));
  const db = await getDb();
  const saveAudit = async (answer, answerStatus, model) => {
    const citedSourceIds = sourceCards.map((source) => source.url);
    const audit = { publicId: randomUUID4(), userId: input.userId ?? null, question: input.question, answer, retrievedConceptIds: retrieval.items.map((item) => item.publicId), citedSourceIds, answerStatus, model: model ?? null };
    if (db) await db.insert(assistantAudits).values(audit);
    return { answer, answerStatus, citations: sourceCards, concepts: retrieval.items.map((item) => ({ slug: item.slug, name: item.name })), model: model ?? null };
  };
  if (decideAssistantEvidence(evidence.length, sourceCards.length) === "insufficient_evidence") {
    return saveAudit("Sonata does not yet have enough published, source-linked evidence to answer that responsibly. Try a published concept record or consult its linked source trail.", "insufficient_evidence");
  }
  try {
    const { data: models } = await listLLMModels();
    const model = models.find((candidate) => candidate.id === "gpt-5-mini")?.id ?? models.find((candidate) => candidate.id.startsWith("gpt-5"))?.id ?? models[0]?.id;
    if (!model) return saveAudit("Sonata retrieved relevant evidence, but the synthesis service is currently unavailable. Review the cited concept records directly.", "insufficient_evidence");
    const evidenceBlock = evidence.map((record, index2) => `CONCEPT ${index2 + 1}: ${record.name}
Definition: ${record.definition}
Context: ${record.historicalContext}
Usage: ${record.practicalUsage}
Sources: ${record.sources.map((source) => `${source.label} \u2014 ${source.citation}`).join(" | ")}`).join("\n\n");
    const response = await invokeLLM({
      model,
      messages: [
        { role: "system", content: "You are Sonata\u2019s research assistant. Answer only from the supplied Sonata evidence. Do not add facts from general knowledge, do not claim cross-cultural equivalence, and state when the evidence is limited. Cite every factual paragraph using [Sonata: Concept Name]. Keep the response under 350 words." },
        { role: "user", content: `Question: ${input.question}

Sonata evidence:
${evidenceBlock}` }
      ],
      maxTokens: 700
    });
    const rawAnswer = response.choices[0]?.message?.content;
    const answer = typeof rawAnswer === "string" ? rawAnswer.trim() : "";
    return saveAudit(answer || "Sonata retrieved evidence but could not produce a reliable synthesis. Review the cited concept records directly.", answer ? "grounded" : "insufficient_evidence", model);
  } catch {
    return saveAudit("Sonata retrieved relevant evidence, but the synthesis service is unavailable. Review the cited concept records directly.", "insufficient_evidence");
  }
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
var relationshipDraftSchema = z2.object({
  sourcePublicId: z2.string().uuid(),
  targetPublicId: z2.string().uuid(),
  relationshipType: z2.enum([
    "related_to",
    "part_of",
    "type_of",
    "subtype_of",
    "originated_in",
    "used_in",
    "influenced",
    "influenced_by",
    "contrasts_with",
    "synonym_of",
    "variant_of",
    "performed_with",
    "associated_with",
    "developed_from",
    "predecessor_of",
    "successor_of"
  ])
});
var sourceConfidenceSchema = z2.enum(["low", "medium", "high", "primary"]);
var researchFiltersSchema = z2.object({
  region: z2.string().trim().max(255).optional(),
  tradition: z2.string().trim().max(255).optional(),
  genre: z2.string().trim().max(255).optional(),
  era: z2.string().trim().max(255).optional(),
  instrument: z2.string().trim().max(255).optional(),
  category: z2.string().trim().max(255).optional(),
  language: z2.string().trim().max(128).optional(),
  confidence: sourceConfidenceSchema.optional()
}).optional();
var knowledgeCandidateSchema = z2.object({
  canonicalName: z2.string().trim().min(2).max(512),
  entityType: z2.enum(["term", "instrument", "form", "genre", "person", "place", "work", "organization", "conceptual_collection"]),
  emicDescription: z2.string().trim().max(12e3).optional(),
  eticComparison: z2.string().trim().max(6e3).optional(),
  taxonomySlugs: z2.array(z2.string().trim().min(1).max(160)).min(1).max(20),
  sourceConfidence: sourceConfidenceSchema,
  sources: z2.array(z2.object({ citation: z2.string().trim().min(1).max(5e3), uri: z2.string().url().max(2048).optional() })).max(20),
  alternateNames: z2.array(z2.string().trim().min(1).max(512)).max(50).optional(),
  requiresSpecialistReview: z2.boolean().optional()
});
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    })
  }),
  sonata: router({
    browse: publicProcedure.query(async () => ({
      mode: "foundation",
      entries: await getPublicEntries(),
      taxonomy: SONATA_TAXONOMY_PREVIEW,
      note: "These are deliberately limited foundation records used to demonstrate the Sonata model. They are not a scholarly launch corpus."
    })),
    entry: publicProcedure.input(z2.object({ slug: z2.string().trim().min(1).max(160) })).query(async ({ input }) => getPublicEntry(input.slug)),
    search: publicProcedure.input(z2.object({ query: z2.string().trim().max(120) })).query(async ({ input }) => ({ entries: await searchPublicEntries(input.query) })),
    coverage: publicProcedure.query(() => getKnowledgeCoverage())
  }),
  research: router({
    search: publicProcedure.input(z2.object({ query: z2.string().trim().max(180), filters: researchFiltersSchema, page: z2.number().int().min(1).max(1e3).optional(), pageSize: z2.number().int().min(1).max(50).optional() })).query(({ input }) => searchSonataKnowledge(input)),
    learning: publicProcedure.input(z2.object({ focus: z2.string().trim().max(180).optional() })).query(({ input }) => getLearningExperience(input.focus)),
    compare: publicProcedure.input(z2.object({ leftSlug: z2.string().trim().min(1).max(160), rightSlug: z2.string().trim().min(1).max(160) })).query(async ({ input }) => {
      const [left, right] = await Promise.all([getPublicEntry(input.leftSlug), getPublicEntry(input.rightSlug)]);
      if (!left || !right) throw new Error("Both comparison records must be published Sonata concepts.");
      return {
        left,
        right,
        framework: ["similarity", "difference", "historical relationship", "functional relationship"],
        notice: "Sonata presents source-linked context for comparison. Shared labels or broad categories never establish equivalence."
      };
    }),
    ask: protectedProcedure.input(z2.object({ question: z2.string().trim().min(8).max(1200) })).mutation(({ input, ctx }) => answerWithSonataEvidence({ ...input, userId: ctx.user.id })),
    recordLearning: protectedProcedure.input(z2.object({ conceptSlug: z2.string().trim().min(1).max(160), activityType: z2.enum(["learning_path", "flashcard", "quiz"]), masteryScore: z2.number().int().min(0).max(100), completed: z2.boolean() })).mutation(({ input, ctx }) => recordLearningActivity({ ...input, userId: ctx.user.id })),
    submitContribution: protectedProcedure.input(z2.object({ kind: z2.enum(["edit", "new_term", "error", "source", "relationship"]), summary: z2.string().trim().min(5).max(512), detail: z2.string().trim().min(20).max(12e3), sourceUrl: z2.string().url().max(2048).optional(), targetSlug: z2.string().trim().max(160).optional() })).mutation(({ input, ctx }) => submitContribution({ ...input, userId: ctx.user.id }))
  }),
  editorial: router({
    summary: adminProcedure.query(() => getEditorialSummary()),
    knowledgeHealth: adminProcedure.query(() => getKnowledgeHealth()),
    rebuildPublishedSearchIndex: adminProcedure.mutation(() => backfillPublishedSearchDocuments()),
    createTermDraft: adminProcedure.input(
      z2.object({
        canonicalName: z2.string().trim().min(2).max(512),
        definition: z2.string().trim().min(80).max(12e3),
        entityType: z2.enum(["term", "instrument", "form", "genre", "person", "place", "work", "organization", "conceptual_collection"])
      })
    ).mutation(({ input, ctx }) => createEditorialDraft({ ...input, createdByUserId: ctx.user.id })),
    createSource: adminProcedure.input(
      z2.object({
        citation: z2.string().trim().min(20).max(5e3),
        locator: z2.string().trim().max(1024).optional()
      })
    ).mutation(({ input }) => createEditorialSource(input)),
    reviewSource: adminProcedure.input(z2.object({ publicId: z2.string().uuid(), sourceQuality: z2.enum(["unassessed", "mixed", "strong", "primary"]) })).mutation(({ input }) => reviewEditorialSource(input)),
    createRelationship: adminProcedure.input(relationshipDraftSchema).mutation(({ input, ctx }) => createEditorialRelationship({ ...input, createdByUserId: ctx.user.id })),
    updateRelationshipStatus: adminProcedure.input(z2.object({ publicId: z2.string().uuid(), editorialStatus: z2.enum(["draft", "deprecated"]) })).mutation(({ input }) => updateEditorialRelationshipStatus(input)),
    stageImport: adminProcedure.input(z2.object({ headers: z2.array(z2.string().min(1)).max(250) })).mutation(({ input, ctx }) => stageEditorialImport({ ...input, createdByUserId: ctx.user.id })),
    linkSource: adminProcedure.input(z2.object({ conceptPublicId: z2.string().uuid(), sourcePublicId: z2.string().uuid(), claimScope: z2.enum(["definition", "history", "practice", "classification", "relationship", "other"]), confidenceScore: z2.number().int().min(0).max(100), editorialNote: z2.string().trim().max(6e3).optional() })).mutation(({ input }) => linkSourceToConcept(input)),
    recordUncertainty: adminProcedure.input(z2.object({ conceptPublicId: z2.string().uuid(), uncertaintyNote: z2.string().trim().min(20).max(6e3) })).mutation(({ input, ctx }) => recordConceptUncertainty({ ...input, reviewerUserId: ctx.user.id })),
    resolveUncertainty: adminProcedure.input(z2.object({ conceptPublicId: z2.string().uuid(), resolutionNote: z2.string().trim().min(20).max(6e3) })).mutation(({ input, ctx }) => resolveConceptUncertainty({ ...input, reviewerUserId: ctx.user.id })),
    approveForExpertReview: adminProcedure.input(z2.object({ conceptPublicId: z2.string().uuid(), confidenceScore: z2.number().int().min(0).max(100), reviewNotes: z2.string().trim().min(20).max(6e3) })).mutation(({ input, ctx }) => approveConceptForExpertReview({ ...input, reviewerUserId: ctx.user.id })),
    publishExpertReviewed: adminProcedure.input(z2.object({ conceptPublicId: z2.string().uuid() })).mutation(({ input, ctx }) => publishExpertReviewedConcept({ ...input, reviewerUserId: ctx.user.id })),
    bootstrapKnowledgeFramework: adminProcedure.mutation(() => bootstrapGlobalKnowledgeFramework()),
    stageKnowledgeBatch: adminProcedure.input(z2.object({
      fileName: z2.string().trim().min(3).max(1024),
      fileFormat: z2.enum(["csv", "json", "jsonl", "xlsx"]),
      sourceProvider: z2.string().trim().max(512).optional(),
      candidates: z2.array(knowledgeCandidateSchema).min(1).max(500)
    })).mutation(({ input, ctx }) => stageKnowledgeBatch({ ...input, createdByUserId: ctx.user.id }))
  })
});

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString2 = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    return decodeOAuthState(state).redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString2(openId) || !isNonEmptyString2(appId) || !isNonEmptyString2(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    let sessionToken = cookies.get(COOKIE_NAME);
    if (!sessionToken) {
      const authHeader = req.headers.authorization;
      if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        sessionToken = authHeader.slice(7);
      }
    }
    const session = await this.verifySession(sessionToken);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    if (session.openId.startsWith(CRON_OPEN_ID_PREFIX)) {
      const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
      const taskUid = userInfo.taskUid ?? null;
      if (!taskUid) {
        throw ForbiddenError("Cron session missing task_uid");
      }
      return buildCronUser(userInfo);
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var CRON_OPEN_ID_PREFIX = "cron_";
function buildCronUser(userInfo) {
  const now = /* @__PURE__ */ new Date();
  return {
    id: -1,
    openId: userInfo.openId,
    name: userInfo.name || "Manus Scheduled Task",
    email: null,
    loginMethod: null,
    role: "user",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
    taskUid: userInfo.taskUid ?? void 0,
    isCron: true
  };
}
var sdk = new SDKServer();

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/oauth.ts
import { parse as parseCookieHeader2 } from "cookie";
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app2) {
  const handleCallback = async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    const { nonce } = decodeOAuthState(state);
    const expectedNonce = parseCookieHeader2(req.headers.cookie ?? "")[OAUTH_STATE_COOKIE];
    if (!nonce || nonce !== expectedNonce) {
      res.status(403).json({ error: "invalid oauth state" });
      return;
    }
    res.clearCookie(OAUTH_STATE_COOKIE, { path: "/", secure: true, sameSite: "none" });
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  };
  app2.get(["/api/oauth/callback", "/oauth/callback"], handleCallback);
}

// server/_core/storageProxy.ts
function registerStorageProxy(app2) {
  app2.get("/manus-storage/*", async (req, res) => {
    const key = req.params[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }
    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/"
      );
      forgeUrl.searchParams.set("path", key);
      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` }
      });
      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }
      const { url } = await forgeResp.json();
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }
      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

// server/_core/app.ts
function createApp() {
  const app2 = express();
  app2.use(express.json({ limit: "50mb" }));
  app2.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app2);
  registerOAuthRoutes(app2);
  const trpcMiddleware = createExpressMiddleware({
    router: appRouter,
    createContext
  });
  app2.use("/api/trpc", trpcMiddleware);
  app2.use("/trpc", trpcMiddleware);
  return app2;
}

// api/route-entry.ts
var app = createApp();
var route_entry_default = app;
export {
  route_entry_default as default
};
