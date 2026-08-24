import { randomUUID } from "crypto";
import { and, eq, inArray, or } from "drizzle-orm";
import { conceptNames, conceptRelationships, conceptSources, concepts, editorialReviews, searchDocuments, sources } from "../drizzle/schema";
import { getDb } from "./db";

async function requirePublicationDb() {
  const db = await getDb();
  if (!db) throw new Error("The Sonata knowledge database is not available. Try again after the connection is restored.");
  return db;
}

export async function refreshPublishedSearchDocument(conceptId: number) {
  const db = await requirePublicationDb();
  const [concept] = await db.select().from(concepts).where(eq(concepts.id, conceptId)).limit(1);
  if (!concept || concept.editorialStatus !== "published") return;
  const names = await db.select({ name: conceptNames.name }).from(conceptNames).where(eq(conceptNames.conceptId, concept.id));
  const alternateNames = names.map(name => name.name);
  const normalizedName = concept.canonicalName.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
  const relationships = await db.select({ sourceConceptId: conceptRelationships.sourceConceptId, targetConceptId: conceptRelationships.targetConceptId, relationshipType: conceptRelationships.relationshipType, contextNote: conceptRelationships.contextNote }).from(conceptRelationships).where(and(eq(conceptRelationships.editorialStatus, "published"), or(eq(conceptRelationships.sourceConceptId, concept.id), eq(conceptRelationships.targetConceptId, concept.id))!));
  const relatedIds = relationships.map(relationship => relationship.sourceConceptId === concept.id ? relationship.targetConceptId : relationship.sourceConceptId);
  const relatedConcepts = relatedIds.length ? await db.select({ id: concepts.id, canonicalName: concepts.canonicalName, transliteration: concepts.transliteration }).from(concepts).where(and(eq(concepts.editorialStatus, "published"), inArray(concepts.id, relatedIds))) : [];
  const relatedById = new Map(relatedConcepts.map(related => [related.id, related]));
  const relationshipContext = relationships.flatMap(relationship => {
    const relatedId = relationship.sourceConceptId === concept.id ? relationship.targetConceptId : relationship.sourceConceptId;
    const related = relatedById.get(relatedId);
    return [relationship.relationshipType.replace(/_/g, " "), relationship.contextNote, related?.canonicalName, related?.transliteration].filter((value): value is string => Boolean(value));
  });
  const searchableText = [concept.canonicalName, concept.transliteration, ...alternateNames, concept.shortDefinition, concept.definition, concept.emicDescription, concept.historicalContext, concept.practicalUsage, concept.originRegion, concept.tradition, concept.culture, concept.genre, concept.category, concept.era, concept.languageOfOrigin, ...relationshipContext].filter(Boolean).join(" ");
  const filterPayload = { region: concept.originRegion, tradition: concept.tradition, genre: concept.genre, era: concept.era, category: concept.category, language: concept.languageOfOrigin, sourceConfidence: concept.sourceConfidence, relationshipTerms: relationshipContext };
  await db.insert(searchDocuments).values({ publicId: randomUUID(), conceptId: concept.id, normalizedName, alternateNames: alternateNames.join(" | ") || null, searchableText, filterPayload }).onDuplicateKeyUpdate({ set: { normalizedName, alternateNames: alternateNames.join(" | ") || null, searchableText, filterPayload, indexedAt: new Date() } });
}

export async function backfillPublishedSearchDocuments() {
  const db = await requirePublicationDb();
  const published = await db.select({ id: concepts.id }).from(concepts).where(eq(concepts.editorialStatus, "published"));
  for (let offset = 0; offset < published.length; offset += 12) {
    await Promise.all(published.slice(offset, offset + 12).map(record => refreshPublishedSearchDocument(record.id)));
  }
  return { indexed: published.length };
}

export async function linkSourceToConcept(input: {
  conceptPublicId: string;
  sourcePublicId: string;
  claimScope: "definition" | "history" | "practice" | "classification" | "relationship" | "other";
  confidenceScore: number;
  editorialNote?: string;
}) {
  const db = await requirePublicationDb();
  const [concept] = await db.select({ id: concepts.id, sourceCount: concepts.sourceCount }).from(concepts).where(eq(concepts.publicId, input.conceptPublicId)).limit(1);
  const [source] = await db.select({ id: sources.id, sourceQuality: sources.sourceQuality }).from(sources).where(eq(sources.publicId, input.sourcePublicId)).limit(1);
  if (!concept || !source) throw new Error("Both a persisted concept draft and a persisted source record are required before linking evidence.");
  await db.insert(conceptSources).values({ publicId: randomUUID(), conceptId: concept.id, sourceId: source.id, claimScope: input.claimScope, confidenceScore: input.confidenceScore, editorialNote: input.editorialNote ?? null });
  const sourceConfidence = source.sourceQuality === "primary" ? "primary" : source.sourceQuality === "strong" ? "high" : source.sourceQuality === "mixed" ? "medium" : "low";
  await db.update(concepts).set({ sourceCount: concept.sourceCount + 1, sourceConfidence }).where(eq(concepts.id, concept.id));
  return { conceptPublicId: input.conceptPublicId, sourcePublicId: input.sourcePublicId, sourceConfidence };
}

export async function recordConceptUncertainty(input: { conceptPublicId: string; uncertaintyNote: string; reviewerUserId: number }) {
  const db = await requirePublicationDb();
  const [concept] = await db.select({ id: concepts.id, canonicalName: concepts.canonicalName, editorialStatus: concepts.editorialStatus }).from(concepts).where(eq(concepts.publicId, input.conceptPublicId)).limit(1);
  if (!concept) throw new Error("The selected concept record could not be found.");
  await db.update(concepts).set({ uncertaintyNote: input.uncertaintyNote, editorialStatus: "machine_reviewed" }).where(eq(concepts.id, concept.id));
  await db.insert(editorialReviews).values({ publicId: randomUUID(), conceptId: concept.id, reviewerUserId: input.reviewerUserId, fromStatus: concept.editorialStatus, toStatus: "machine_reviewed", confidenceScore: 0, reviewNotes: `Uncertainty recorded: ${input.uncertaintyNote}` });
  return { publicId: input.conceptPublicId, canonicalName: concept.canonicalName, status: "machine_reviewed" as const };
}

export async function resolveConceptUncertainty(input: { conceptPublicId: string; resolutionNote: string; reviewerUserId: number }) {
  const db = await requirePublicationDb();
  const [concept] = await db.select({ id: concepts.id, canonicalName: concepts.canonicalName, editorialStatus: concepts.editorialStatus, uncertaintyNote: concepts.uncertaintyNote }).from(concepts).where(eq(concepts.publicId, input.conceptPublicId)).limit(1);
  if (!concept) throw new Error("The selected concept record could not be found.");
  if (!concept.uncertaintyNote) throw new Error("This concept has no recorded uncertainty flag to resolve.");
  await db.update(concepts).set({ uncertaintyNote: null, editorialStatus: "draft" }).where(eq(concepts.id, concept.id));
  await db.insert(editorialReviews).values({ publicId: randomUUID(), conceptId: concept.id, reviewerUserId: input.reviewerUserId, fromStatus: concept.editorialStatus, toStatus: "draft", confidenceScore: 0, reviewNotes: `Uncertainty resolved: ${input.resolutionNote}` });
  return { publicId: input.conceptPublicId, canonicalName: concept.canonicalName, status: "draft" as const };
}

export async function approveConceptForExpertReview(input: { conceptPublicId: string; reviewerUserId: number; confidenceScore: number; reviewNotes: string }) {
  const db = await requirePublicationDb();
  const [concept] = await db.select({ id: concepts.id, canonicalName: concepts.canonicalName, editorialStatus: concepts.editorialStatus, sourceCount: concepts.sourceCount, sourceConfidence: concepts.sourceConfidence, emicDescription: concepts.emicDescription, uncertaintyNote: concepts.uncertaintyNote }).from(concepts).where(eq(concepts.publicId, input.conceptPublicId)).limit(1);
  if (!concept) throw new Error("The selected concept record could not be found.");
  const blockers = [concept.sourceCount < 1 ? "at least one linked source" : null, concept.sourceConfidence === "low" ? "source confidence above low" : null, !concept.emicDescription || concept.emicDescription.trim().length < 80 ? "an emic description of at least 80 characters" : null, concept.uncertaintyNote ? "resolution of the recorded uncertainty flag" : null].filter(Boolean);
  if (blockers.length) throw new Error(`This record cannot reach expert review until it has ${blockers.join(", ")}.`);
  await db.update(concepts).set({ editorialStatus: "expert_reviewed", confidenceScore: input.confidenceScore, reviewNotes: input.reviewNotes }).where(eq(concepts.id, concept.id));
  await db.insert(editorialReviews).values({ publicId: randomUUID(), conceptId: concept.id, reviewerUserId: input.reviewerUserId, fromStatus: concept.editorialStatus, toStatus: "expert_reviewed", confidenceScore: input.confidenceScore, reviewNotes: input.reviewNotes });
  return { publicId: input.conceptPublicId, canonicalName: concept.canonicalName, status: "expert_reviewed" as const };
}

export async function publishExpertReviewedConcept(input: { conceptPublicId: string; reviewerUserId: number }) {
  const db = await requirePublicationDb();
  const [concept] = await db.select({ id: concepts.id, canonicalName: concepts.canonicalName, editorialStatus: concepts.editorialStatus }).from(concepts).where(eq(concepts.publicId, input.conceptPublicId)).limit(1);
  if (!concept) throw new Error("The selected concept record could not be found.");
  if (concept.editorialStatus !== "expert_reviewed") throw new Error("Only an explicitly expert-reviewed concept can be published.");
  const publishedAt = new Date();
  await db.update(concepts).set({ editorialStatus: "published", publishedAt }).where(eq(concepts.id, concept.id));
  await refreshPublishedSearchDocument(concept.id);
  await db.insert(editorialReviews).values({ publicId: randomUUID(), conceptId: concept.id, reviewerUserId: input.reviewerUserId, fromStatus: "expert_reviewed", toStatus: "published", confidenceScore: 100, reviewNotes: "Explicit editorial publication approval." });
  return { publicId: input.conceptPublicId, canonicalName: concept.canonicalName, status: "published" as const, publishedAt };
}
