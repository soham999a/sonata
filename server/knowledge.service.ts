import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { concepts, coverageTargets, importBatchMetrics, importRows, imports, taxonomyNodes } from "../drizzle/schema";
import {
  ALL_COVERAGE_TARGETS,
  PRIMARY_COVERAGE_TARGET,
  REGION_COVERAGE_TARGETS,
  SONATA_GLOBAL_TAXONOMY,
  type KnowledgeCandidate,
} from "../shared/sonata-coverage";
import { getDb } from "./db";
import { validateKnowledgeCandidate } from "./knowledge.validation";

async function requireKnowledgeDb() {
  const db = await getDb();
  if (!db) throw new Error("The Sonata knowledge database is not available. Try again after the connection is restored.");
  return db;
}

function tally(slugs: string[], candidates: KnowledgeCandidate[]) {
  return slugs.reduce<Record<string, number>>((result, slug) => {
    result[slug] = candidates.filter(candidate => candidate.taxonomySlugs.includes(slug)).length;
    return result;
  }, {});
}

export async function bootstrapGlobalKnowledgeFramework() {
  const db = await requireKnowledgeDb();
  const existingNodes = await db.select({ id: taxonomyNodes.id, slug: taxonomyNodes.slug }).from(taxonomyNodes);
  const nodeIdBySlug = new Map(existingNodes.map(node => [node.slug, node.id]));

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
        editorialNote: seed.editorialNote ?? null,
      }).where(eq(taxonomyNodes.id, existingId));
    } else {
      const result = await db.insert(taxonomyNodes).values({
        publicId: randomUUID(),
        slug: seed.slug,
        label: seed.label,
        nodeType: seed.nodeType,
        parentNodeId,
        pathKey: seed.pathKey,
        culturalScope: seed.culturalScope ?? null,
        editorialNote: seed.editorialNote ?? null,
      });
      nodeIdBySlug.set(seed.slug, Number(result[0].insertId));
    }
  }

  const existingTargets = await db.select({ id: coverageTargets.id, dimension: coverageTargets.dimension, slug: coverageTargets.slug }).from(coverageTargets);
  const targetIdByKey = new Map(existingTargets.map(target => [`${target.dimension}:${target.slug}`, target.id]));
  for (const target of ALL_COVERAGE_TARGETS) {
    const existingId = targetIdByKey.get(`${target.dimension}:${target.slug}`);
    if (existingId) {
      await db.update(coverageTargets).set({ label: target.label, targetCount: target.targetCount, detail: target.detail }).where(eq(coverageTargets.id, existingId));
    } else {
      await db.insert(coverageTargets).values({
        publicId: randomUUID(),
        dimension: target.dimension,
        slug: target.slug,
        label: target.label,
        targetCount: target.targetCount,
        detail: target.detail,
      });
    }
  }
  return getKnowledgeCoverage();
}

export async function getKnowledgeCoverage() {
  const db = await getDb();
  const [targets, conceptRows] = db
    ? await Promise.all([
        db.select().from(coverageTargets),
        db.select({ status: concepts.editorialStatus }).from(concepts),
      ])
    : [ALL_COVERAGE_TARGETS.map((target, index) => ({
        id: index + 1,
        publicId: target.slug,
        dimension: target.dimension,
        slug: target.slug,
        label: target.label,
        targetCount: target.targetCount,
        publishedCount: 0,
        draftCount: 0,
        detail: target.detail,
      })), [] as Array<{ status: string }>];
  const activeTargets = targets.length > 0 ? targets : ALL_COVERAGE_TARGETS;
  const editorialStatusCounts = conceptRows.reduce<Record<string, number>>((result, concept) => {
    result[concept.status] = (result[concept.status] ?? 0) + 1;
    return result;
  }, {});
  return {
    primaryTarget: PRIMARY_COVERAGE_TARGET,
    publishedConcepts: conceptRows.filter(concept => concept.status === "published").length,
    draftConcepts: conceptRows.filter(concept => concept.status !== "published").length,
    editorialStatusCounts,
    targets: activeTargets.map(target => ({
      dimension: target.dimension,
      slug: target.slug,
      label: target.label,
      targetCount: target.targetCount,
      publishedCount: "publishedCount" in target ? target.publishedCount : 0,
      draftCount: "draftCount" in target ? target.draftCount : 0,
      detail: target.detail ?? "",
    })),
    regions: REGION_COVERAGE_TARGETS,
  };
}

export async function stageKnowledgeBatch(input: {
  fileName: string;
  fileFormat: "csv" | "json" | "jsonl" | "xlsx";
  sourceProvider?: string;
  candidates: KnowledgeCandidate[];
  createdByUserId: number;
}) {
  const db = await requireKnowledgeDb();
  const existing = await db.select({ canonicalName: concepts.canonicalName }).from(concepts);
  const assessed = input.candidates.map(candidate => ({ candidate, result: validateKnowledgeCandidate(candidate, existing.map(concept => concept.canonicalName)) }));
  const eligible = assessed.filter(item => item.result.errors.length === 0 && item.result.blockers.length === 0);
  const duplicateRisks = assessed.filter(item => item.result.duplicateRisk === "probable").length;
  const lowConfidence = assessed.filter(item => item.candidate.sourceConfidence === "low").length;
  const requiresReview = assessed.some(item => item.result.errors.length > 0 || item.result.blockers.length > 0 || item.result.warnings.length > 0);
  const regionalDistribution = tally(REGION_COVERAGE_TARGETS.map(target => target.slug), input.candidates);
  const categoryDistribution = tally(["melody-modes", "rhythm-cycle", "forms-genres", "instruments-performance", "notation-tuning", "technology-production"], input.candidates);
  const eraDistribution = tally(["ancient", "medieval", "renaissance", "baroque", "classical", "romantic", "modern", "contemporary", "pre-modern", "traditional", "indigenous", "ongoing"], input.candidates);
  const publicId = randomUUID();
  const inserted = await db.insert(imports).values({
    publicId,
    fileName: input.fileName,
    fileFormat: input.fileFormat,
    sourceProvider: input.sourceProvider ?? null,
    status: requiresReview ? "needs_review" : "approved",
    submittedByUserId: input.createdByUserId,
    candidateCount: input.candidates.length,
    report: { reportVersion: 2, importMode: "source-aware-staged-batch", candidateCount: input.candidates.length, eligibleForExpertReview: eligible.length, duplicatesHeldForReview: duplicateRisks, lowConfidence, publicationRule: "Staging never publishes a candidate; source and expert-review gates remain in force." },
  });
  const importId = Number(inserted[0].insertId);
  await db.insert(importRows).values(assessed.map(({ candidate, result }, index) => ({
    publicId: randomUUID(),
    importId,
    rowNumber: index + 1,
    payload: candidate,
    normalizedPayload: { normalizedKey: result.normalizedKey, candidate },
    normalizedName: result.normalizedKey,
    duplicateRisk: result.duplicateRisk,
    sourceConfidence: candidate.sourceConfidence,
    requiresSpecialistReview: candidate.requiresSpecialistReview ? 1 : 0,
    publicationAllowed: result.errors.length === 0 && result.blockers.length === 0 ? 1 : 0,
    validationState: (result.errors.length > 0 ? "error" : result.blockers.length > 0 || result.warnings.length > 0 ? "warning" : "valid") as "error" | "warning" | "valid",
    validationMessages: { errors: result.errors, warnings: result.warnings, blockers: result.blockers },
  })));
  await db.insert(importBatchMetrics).values({
    publicId: randomUUID(),
    importId,
    acceptedConcepts: eligible.length,
    duplicatesRemoved: duplicateRisks,
    relationshipsCreated: 0,
    lowConfidenceConcepts: lowConfidence,
    sourceConflicts: 0,
    regionalDistribution,
    categoryDistribution,
    eraDistribution,
    qualitySummary: { validationErrors: assessed.filter(item => item.result.errors.length > 0).length, publicationBlockers: assessed.filter(item => item.result.blockers.length > 0).length, specialistReviews: assessed.filter(item => item.candidate.requiresSpecialistReview).length },
  });
  return { publicId, status: requiresReview ? "needs_review" as const : "approved" as const, candidateCount: input.candidates.length, eligibleForExpertReview: eligible.length, duplicatesHeldForReview: duplicateRisks, lowConfidence, regionalDistribution, categoryDistribution, eraDistribution };
}
