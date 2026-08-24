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
import { and, desc, eq, like, or } from "drizzle-orm";
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
    historicalContext: longtext("historicalContext"),
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
    index("concepts_name_idx").on(table.canonicalName)
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
    fileFormat: mysqlEnum("fileFormat", ["csv", "json", "jsonl", "xlsx"]).notNull(),
    status: mysqlEnum("status", ["staged", "validating", "needs_review", "approved", "rejected", "published"]).notNull().default("staged"),
    submittedByUserId: int("submittedByUserId").references(() => users.id),
    report: json("report"),
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
      { id: "raga", label: "R\u0101ga", x: 50, y: 49, emphasis: "main" },
      { id: "south-asia", label: "South Asia", x: 21, y: 26 },
      { id: "melody", label: "Melody", x: 77, y: 25, emphasis: "accent" },
      { id: "performance", label: "Performance", x: 79, y: 72 },
      { id: "tradition", label: "Tradition", x: 24, y: 73 },
      { id: "maqam", label: "Maq\u0101m", x: 15, y: 49 },
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
      const card = mapPublishedConcept(row);
      return {
        ...card,
        definition: row.definition ?? card.shortDefinition,
        historicalContext: row.historicalContext ?? "Historical context has not yet been added to this record.",
        practicalUsage: row.practicalUsage ?? "Practical usage has not yet been added to this record.",
        visualAudioDescription: row.visualAudioDescription ?? "Visual and audio description has not yet been added to this record.",
        pronunciation: row.pronunciation ?? void 0,
        languageOfOrigin: row.languageOfOrigin ?? void 0,
        transliteration: row.transliteration ?? void 0,
        taxonomyPath: ["World", row.originRegion ?? "Context pending", row.tradition ?? "Context pending"],
        related: [],
        sources: [],
        graphNodes: [{ id: row.slug, label: row.canonicalName, x: 50, y: 50, emphasis: "main" }]
      };
    }
  }
  return DEMONSTRATION_DETAILS[slug];
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
    search: publicProcedure.input(z2.object({ query: z2.string().trim().max(120) })).query(async ({ input }) => ({ entries: await searchPublicEntries(input.query) }))
  }),
  editorial: router({
    summary: adminProcedure.query(() => getEditorialSummary()),
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
    stageImport: adminProcedure.input(z2.object({ headers: z2.array(z2.string().min(1)).max(250) })).mutation(({ input, ctx }) => stageEditorialImport({ ...input, createdByUserId: ctx.user.id }))
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
