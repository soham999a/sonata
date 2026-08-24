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
  varchar,
} from "drizzle-orm/mysql-core";
import {
  editorialStatuses,
  entityTypes,
  nameTypes,
  relationshipTypes,
  taxonomyNodeTypes,
} from "../shared/sonata";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const concepts = mysqlTable(
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
    sourceQuality: mysqlEnum("sourceQuality", ["unassessed", "mixed", "strong", "primary"])
      .notNull()
      .default("unassessed"),
    reviewNotes: longtext("reviewNotes"),
    editorialStatus: mysqlEnum("editorialStatus", editorialStatuses)
      .notNull()
      .default("draft"),
    createdByUserId: int("createdByUserId").references(() => users.id),
    publishedAt: timestamp("publishedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("concepts_public_id_unique").on(table.publicId),
    uniqueIndex("concepts_slug_unique").on(table.slug),
    index("concepts_status_type_idx").on(table.editorialStatus, table.entityType),
    index("concepts_name_idx").on(table.canonicalName),
  ],
);

export const conceptNames = mysqlTable(
  "concept_names",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId")
      .notNull()
      .references(() => concepts.id),
    name: varchar("name", { length: 512 }).notNull(),
    normalizedName: varchar("normalizedName", { length: 512 }).notNull(),
    nameType: mysqlEnum("nameType", nameTypes).notNull(),
    language: varchar("language", { length: 128 }),
    script: varchar("script", { length: 64 }),
    isPreferred: int("isPreferred").notNull().default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("concept_names_public_id_unique").on(table.publicId),
    index("concept_names_concept_idx").on(table.conceptId),
    index("concept_names_normalized_idx").on(table.normalizedName),
  ],
);

export const taxonomyNodes = mysqlTable(
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
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("taxonomy_nodes_public_id_unique").on(table.publicId),
    uniqueIndex("taxonomy_nodes_slug_unique").on(table.slug),
    index("taxonomy_parent_idx").on(table.parentNodeId),
    index("taxonomy_path_idx").on(table.pathKey),
  ],
);

export const conceptTaxonomy = mysqlTable(
  "concept_taxonomy",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId")
      .notNull()
      .references(() => concepts.id),
    taxonomyNodeId: int("taxonomyNodeId")
      .notNull()
      .references(() => taxonomyNodes.id),
    relevanceWeight: int("relevanceWeight").notNull().default(100),
    contextNote: longtext("contextNote"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [
    uniqueIndex("concept_taxonomy_public_id_unique").on(table.publicId),
    uniqueIndex("concept_taxonomy_unique").on(table.conceptId, table.taxonomyNodeId),
    index("concept_taxonomy_node_idx").on(table.taxonomyNodeId),
  ],
);

export const conceptRelationships = mysqlTable(
  "concept_relationships",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    sourceConceptId: int("sourceConceptId")
      .notNull()
      .references(() => concepts.id),
    targetConceptId: int("targetConceptId")
      .notNull()
      .references(() => concepts.id),
    relationshipType: mysqlEnum("relationshipType", relationshipTypes).notNull(),
    contextNote: longtext("contextNote"),
    confidenceScore: int("confidenceScore").notNull().default(0),
    sourceCount: int("sourceCount").notNull().default(0),
    editorialStatus: mysqlEnum("editorialStatus", editorialStatuses)
      .notNull()
      .default("draft"),
    createdByUserId: int("createdByUserId").references(() => users.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("relationships_public_id_unique").on(table.publicId),
    uniqueIndex("relationships_source_target_type_unique").on(
      table.sourceConceptId,
      table.targetConceptId,
      table.relationshipType,
    ),
    index("relationships_source_idx").on(table.sourceConceptId),
    index("relationships_target_idx").on(table.targetConceptId),
  ],
);

export const sources = mysqlTable(
  "sources",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    sourceType: mysqlEnum("sourceType", ["book", "article", "archive", "recording", "institution", "oral_history", "other"])
      .notNull(),
    citation: longtext("citation").notNull(),
    locator: varchar("locator", { length: 1024 }),
    uri: varchar("uri", { length: 2048 }),
    publisher: varchar("publisher", { length: 512 }),
    publicationYear: int("publicationYear"),
    language: varchar("language", { length: 128 }),
    sourceQuality: mysqlEnum("sourceQuality", ["unassessed", "mixed", "strong", "primary"])
      .notNull()
      .default("unassessed"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [uniqueIndex("sources_public_id_unique").on(table.publicId)],
);

export const conceptSources = mysqlTable(
  "concept_sources",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId")
      .notNull()
      .references(() => concepts.id),
    sourceId: int("sourceId")
      .notNull()
      .references(() => sources.id),
    claimScope: mysqlEnum("claimScope", ["definition", "history", "practice", "classification", "relationship", "other"])
      .notNull(),
    sourceLocator: varchar("sourceLocator", { length: 1024 }),
    confidenceScore: int("confidenceScore").notNull().default(0),
    editorialNote: longtext("editorialNote"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [
    uniqueIndex("concept_sources_public_id_unique").on(table.publicId),
    index("concept_sources_concept_idx").on(table.conceptId),
  ],
);

export const conceptRevisions = mysqlTable(
  "concept_revisions",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId")
      .notNull()
      .references(() => concepts.id),
    version: int("version").notNull(),
    changedByUserId: int("changedByUserId").references(() => users.id),
    changeReason: longtext("changeReason").notNull(),
    previousValue: json("previousValue"),
    newValue: json("newValue").notNull(),
    changedAt: timestamp("changedAt").defaultNow().notNull(),
  },
  table => [
    uniqueIndex("concept_revisions_public_id_unique").on(table.publicId),
    uniqueIndex("concept_revisions_version_unique").on(table.conceptId, table.version),
  ],
);

export const editorialReviews = mysqlTable(
  "editorial_reviews",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId")
      .notNull()
      .references(() => concepts.id),
    reviewerUserId: int("reviewerUserId").references(() => users.id),
    fromStatus: mysqlEnum("fromStatus", editorialStatuses),
    toStatus: mysqlEnum("toStatus", editorialStatuses).notNull(),
    confidenceScore: int("confidenceScore").notNull().default(0),
    reviewNotes: longtext("reviewNotes"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [
    uniqueIndex("editorial_reviews_public_id_unique").on(table.publicId),
    index("editorial_reviews_concept_idx").on(table.conceptId),
  ],
);

export const imports = mysqlTable(
  "imports",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    fileName: varchar("fileName", { length: 1024 }).notNull(),
    fileKey: varchar("fileKey", { length: 2048 }),
    sourceProvider: varchar("sourceProvider", { length: 512 }),
    fileFormat: mysqlEnum("fileFormat", ["csv", "json", "jsonl", "xlsx"]).notNull(),
    status: mysqlEnum("status", ["staged", "validating", "needs_review", "approved", "rejected", "published"])
      .notNull()
      .default("staged"),
    submittedByUserId: int("submittedByUserId").references(() => users.id),
    report: json("report"),
    candidateCount: int("candidateCount").notNull().default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [uniqueIndex("imports_public_id_unique").on(table.publicId)],
);

export const importRows = mysqlTable(
  "import_rows",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    importId: int("importId")
      .notNull()
      .references(() => imports.id),
    rowNumber: int("rowNumber").notNull(),
    payload: json("payload").notNull(),
    normalizedPayload: json("normalizedPayload"),
    normalizedName: varchar("normalizedName", { length: 512 }),
    duplicateRisk: varchar("duplicateRisk", { length: 16 }).notNull().default("none"),
    sourceConfidence: varchar("sourceConfidence", { length: 16 }).notNull().default("low"),
    requiresSpecialistReview: int("requiresSpecialistReview").notNull().default(0),
    publicationAllowed: int("publicationAllowed").notNull().default(0),
    validationState: mysqlEnum("validationState", ["valid", "warning", "error"])
      .notNull()
      .default("valid"),
    validationMessages: json("validationMessages"),
    proposedConceptId: int("proposedConceptId").references(() => concepts.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [
    uniqueIndex("import_rows_public_id_unique").on(table.publicId),
    uniqueIndex("import_rows_number_unique").on(table.importId, table.rowNumber),
  ],
);

export const qualityIssues = mysqlTable(
  "quality_issues",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId").references(() => concepts.id),
    importRowId: int("importRowId").references(() => importRows.id),
    issueType: mysqlEnum("issueType", ["duplicate", "orphan", "broken_reference", "circular_relationship", "missing_definition", "transliteration", "unsupported_claim", "taxonomy_review"])
      .notNull(),
    severity: mysqlEnum("severity", ["low", "medium", "high", "blocking"]).notNull(),
    status: mysqlEnum("status", ["open", "in_review", "resolved", "dismissed"])
      .notNull()
      .default("open"),
    detail: longtext("detail").notNull(),
    metadata: json("metadata"),
    resolvedByUserId: int("resolvedByUserId").references(() => users.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("quality_issues_public_id_unique").on(table.publicId),
    index("quality_issues_status_idx").on(table.status, table.severity),
  ],
);

export const searchDocuments = mysqlTable(
  "search_documents",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId")
      .notNull()
      .references(() => concepts.id),
    normalizedName: varchar("normalizedName", { length: 512 }).notNull(),
    alternateNames: longtext("alternateNames"),
    searchableText: longtext("searchableText").notNull(),
    filterPayload: json("filterPayload"),
    indexedAt: timestamp("indexedAt").defaultNow().notNull(),
  },
  table => [
    uniqueIndex("search_documents_public_id_unique").on(table.publicId),
    uniqueIndex("search_documents_concept_unique").on(table.conceptId),
    index("search_documents_name_idx").on(table.normalizedName),
  ],
);

export const coverageTargets = mysqlTable(
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
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("coverage_targets_public_id_unique").on(table.publicId),
    uniqueIndex("coverage_targets_dimension_slug_unique").on(table.dimension, table.slug),
    index("coverage_targets_dimension_idx").on(table.dimension),
  ],
);

export const importBatchMetrics = mysqlTable(
  "import_batch_metrics",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    importId: int("importId")
      .notNull()
      .references(() => imports.id),
    acceptedConcepts: int("acceptedConcepts").notNull().default(0),
    duplicatesRemoved: int("duplicatesRemoved").notNull().default(0),
    relationshipsCreated: int("relationshipsCreated").notNull().default(0),
    lowConfidenceConcepts: int("lowConfidenceConcepts").notNull().default(0),
    sourceConflicts: int("sourceConflicts").notNull().default(0),
    regionalDistribution: json("regionalDistribution"),
    categoryDistribution: json("categoryDistribution"),
    eraDistribution: json("eraDistribution"),
    qualitySummary: json("qualitySummary"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [
    uniqueIndex("import_batch_metrics_public_id_unique").on(table.publicId),
    uniqueIndex("import_batch_metrics_import_unique").on(table.importId),
  ],
);

export const definitionVariants = mysqlTable(
  "definition_variants",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    conceptId: int("conceptId")
      .notNull()
      .references(() => concepts.id),
    sourceId: int("sourceId").references(() => sources.id),
    definition: longtext("definition").notNull(),
    regionalContext: longtext("regionalContext"),
    historicalContext: longtext("historicalContext"),
    editorialNote: longtext("editorialNote"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [
    uniqueIndex("definition_variants_public_id_unique").on(table.publicId),
    index("definition_variants_concept_idx").on(table.conceptId),
  ],
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Concept = typeof concepts.$inferSelect;
export type InsertConcept = typeof concepts.$inferInsert;
