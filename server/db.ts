import { randomUUID } from "crypto";
import { and, desc, eq, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { conceptRelationships, concepts, imports, sources, type InsertUser, users } from "../drizzle/schema";
import type { EntityType, RelationshipType } from "../shared/sonata";
import { DEMONSTRATION_DETAILS, DEMONSTRATION_ENTRIES, type SonataEntryCard, type SonataEntryDetail } from "./sonata.demo";
import { normalizeSearchTerm, validateLegacyImportHeaders, validateRelationshipDraft } from "./sonata.validation";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
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

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  (["name", "email", "loginMethod"] as const).forEach(field => {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  });
  values.role = user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user");
  updateSet.role = values.role;
  values.lastSignedIn = user.lastSignedIn ?? new Date();
  updateSet.lastSignedIn = values.lastSignedIn;
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

function makeDraftSlug(canonicalName: string, publicId: string) {
  const normalized = normalizeSearchTerm(canonicalName)
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
  return `${normalized || "concept"}-draft-${publicId.slice(0, 8)}`;
}

export async function createEditorialDraft(input: {
  canonicalName: string;
  definition: string;
  entityType: EntityType;
  createdByUserId: number;
}) {
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
    sourceQuality: "unassessed",
  });
  return { publicId, canonicalName: input.canonicalName, status: "draft" as const };
}

export async function createEditorialSource(input: { citation: string; locator?: string }) {
  const db = await requireDb();
  const publicId = randomUUID();
  await db.insert(sources).values({
    publicId,
    sourceType: "other",
    citation: input.citation,
    locator: input.locator || null,
    sourceQuality: "unassessed",
  });
  return { publicId, citation: input.citation, status: "staged" as const };
}

export async function reviewEditorialSource(input: {
  publicId: string;
  sourceQuality: "unassessed" | "mixed" | "strong" | "primary";
}) {
  const db = await requireDb();
  const result = await db
    .update(sources)
    .set({ sourceQuality: input.sourceQuality })
    .where(eq(sources.publicId, input.publicId));
  if (result[0].affectedRows === 0) throw new Error("The selected source record could not be found.");
  return { publicId: input.publicId, sourceQuality: input.sourceQuality };
}

export async function createEditorialRelationship(input: {
  sourcePublicId: string;
  targetPublicId: string;
  relationshipType: RelationshipType;
  createdByUserId: number;
}) {
  const db = await requireDb();
  const conceptRows = await db.select({ id: concepts.id, publicId: concepts.publicId, canonicalName: concepts.canonicalName }).from(concepts);
  const source = conceptRows.find(concept => concept.publicId === input.sourcePublicId);
  const target = conceptRows.find(concept => concept.publicId === input.targetPublicId);
  if (!source || !target) throw new Error("Create or import both concept records before saving a relationship between them.");

  const existing = await db
    .select({ sourceConceptId: conceptRelationships.sourceConceptId, targetConceptId: conceptRelationships.targetConceptId, relationshipType: conceptRelationships.relationshipType })
    .from(conceptRelationships);
  const idToPublicId = new Map(conceptRows.map(concept => [concept.id, concept.publicId]));
  const existingEdges = existing
    .map(edge => ({
      sourcePublicId: idToPublicId.get(edge.sourceConceptId) ?? "",
      targetPublicId: idToPublicId.get(edge.targetConceptId) ?? "",
      relationshipType: edge.relationshipType,
    }))
    .filter(edge => Boolean(edge.sourcePublicId && edge.targetPublicId));
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
    sourceCount: 0,
  });
  return { publicId, source: source.canonicalName, target: target.canonicalName, status: "draft" as const };
}

export async function updateEditorialRelationshipStatus(input: {
  publicId: string;
  editorialStatus: "draft" | "deprecated";
}) {
  const db = await requireDb();
  const result = await db
    .update(conceptRelationships)
    .set({ editorialStatus: input.editorialStatus })
    .where(eq(conceptRelationships.publicId, input.publicId));
  if (result[0].affectedRows === 0) throw new Error("The selected relationship draft could not be found.");
  return input;
}

export async function stageEditorialImport(input: { headers: string[]; createdByUserId: number }) {
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
      stages: ["schema", "normalize", "uuid", "duplicates", "relationships", "taxonomy", "uncertainty"],
    },
  });
  return { publicId, status, errors, headers: input.headers };
}

export async function getEditorialSummary() {
  const db = await requireDb();
  const [recentDrafts, recentSources, relationshipRows, conceptLabels, recentImports] = await Promise.all([
    db
      .select({ publicId: concepts.publicId, canonicalName: concepts.canonicalName, status: concepts.editorialStatus, updatedAt: concepts.updatedAt })
      .from(concepts)
      .where(eq(concepts.editorialStatus, "draft"))
      .orderBy(desc(concepts.updatedAt))
      .limit(5),
    db
      .select({ publicId: sources.publicId, citation: sources.citation, sourceType: sources.sourceType, sourceQuality: sources.sourceQuality, locator: sources.locator, updatedAt: sources.updatedAt })
      .from(sources)
      .orderBy(desc(sources.updatedAt))
      .limit(5),
    db
      .select({ publicId: conceptRelationships.publicId, sourceConceptId: conceptRelationships.sourceConceptId, targetConceptId: conceptRelationships.targetConceptId, relationshipType: conceptRelationships.relationshipType, editorialStatus: conceptRelationships.editorialStatus, updatedAt: conceptRelationships.updatedAt })
      .from(conceptRelationships)
      .orderBy(desc(conceptRelationships.updatedAt))
      .limit(5),
    db.select({ id: concepts.id, canonicalName: concepts.canonicalName }).from(concepts),
    db
      .select({ publicId: imports.publicId, fileName: imports.fileName, status: imports.status, report: imports.report, updatedAt: imports.updatedAt })
      .from(imports)
      .orderBy(desc(imports.updatedAt))
      .limit(5),
  ]);
  const conceptNameById = new Map(conceptLabels.map(concept => [concept.id, concept.canonicalName]));
  const recentRelationships = relationshipRows.map(record => ({
    ...record,
    sourceName: conceptNameById.get(record.sourceConceptId) ?? "Unavailable concept",
    targetName: conceptNameById.get(record.targetConceptId) ?? "Unavailable concept",
  }));
  return { recentDrafts, recentSources, recentRelationships, recentImports };
}

function mapPublishedConcept(row: typeof concepts.$inferSelect): SonataEntryCard {
  return {
    publicId: row.publicId,
    slug: row.slug,
    name: row.canonicalName,
    originalName: row.transliteration ?? undefined,
    shortDefinition: row.shortDefinition ?? "A published concept awaiting a complete public summary.",
    entityType: row.entityType.replace(/_/g, " "),
    region: row.originRegion ?? "Not yet classified",
    tradition: row.tradition ?? "Context pending",
    tags: [row.category, row.era].filter((value): value is string => Boolean(value)),
    relationshipCount: 0,
    demonstration: true,
  };
}

export async function getPublicEntries(limit = 18): Promise<SonataEntryCard[]> {
  const db = await getDb();
  if (!db) return DEMONSTRATION_ENTRIES;
  const published = await db
    .select()
    .from(concepts)
    .where(eq(concepts.editorialStatus, "published"))
    .orderBy(desc(concepts.updatedAt))
    .limit(limit);
  return published.length > 0 ? published.map(mapPublishedConcept) : DEMONSTRATION_ENTRIES;
}

export async function getPublicEntry(slug: string): Promise<SonataEntryDetail | undefined> {
  const db = await getDb();
  if (db) {
    const published = await db
      .select()
      .from(concepts)
      .where(and(eq(concepts.slug, slug), eq(concepts.editorialStatus, "published")))
      .limit(1);
    const row = published[0];
    if (row) {
      const card = mapPublishedConcept(row);
      return {
        ...card,
        definition: row.definition ?? card.shortDefinition,
        historicalContext: row.historicalContext ?? "Historical context has not yet been added to this record.",
        practicalUsage: row.practicalUsage ?? "Practical usage has not yet been added to this record.",
        visualAudioDescription: row.visualAudioDescription ?? "Visual and audio description has not yet been added to this record.",
        pronunciation: row.pronunciation ?? undefined,
        languageOfOrigin: row.languageOfOrigin ?? undefined,
        transliteration: row.transliteration ?? undefined,
        taxonomyPath: ["World", row.originRegion ?? "Context pending", row.tradition ?? "Context pending"],
        related: [],
        sources: [],
        graphNodes: [{ id: row.slug, label: row.canonicalName, x: 50, y: 50, emphasis: "main" }],
      };
    }
  }
  return DEMONSTRATION_DETAILS[slug];
}

export async function searchPublicEntries(query: string): Promise<SonataEntryCard[]> {
  const normalizedQuery = normalizeSearchTerm(query);
  if (!normalizedQuery) return getPublicEntries();
  const db = await getDb();
  if (db) {
    const value = `%${normalizedQuery}%`;
    const published = await db
      .select()
      .from(concepts)
      .where(and(eq(concepts.editorialStatus, "published"), or(like(concepts.canonicalName, value), like(concepts.transliteration, value), like(concepts.shortDefinition, value))))
      .limit(18);
    if (published.length > 0) return published.map(mapPublishedConcept);
  }
  return DEMONSTRATION_ENTRIES.filter(entry =>
    [entry.name, entry.originalName, entry.shortDefinition, entry.region, entry.tradition, ...entry.tags]
      .filter(Boolean)
      .some(value => normalizeSearchTerm(value ?? "").includes(normalizedQuery)),
  );
}
