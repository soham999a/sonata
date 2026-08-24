import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { createEditorialDraft, createEditorialRelationship, createEditorialSource, getEditorialSummary, getPublicEntries, getPublicEntry, reviewEditorialSource, searchPublicEntries, stageEditorialImport, updateEditorialRelationshipStatus } from "./db";
import { bootstrapGlobalKnowledgeFramework, getKnowledgeCoverage, stageKnowledgeBatch } from "./knowledge.service";
import { approveConceptForExpertReview, linkSourceToConcept, publishExpertReviewedConcept, recordConceptUncertainty, resolveConceptUncertainty } from "./publication.service";
import { SONATA_TAXONOMY_PREVIEW } from "./sonata.demo";
import { validateLegacyImportHeaders, validateRelationshipDraft } from "./sonata.validation";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

const relationshipDraftSchema = z.object({
  sourcePublicId: z.string().uuid(),
  targetPublicId: z.string().uuid(),
  relationshipType: z.enum([
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
    "successor_of",
  ]),
});

const sourceConfidenceSchema = z.enum(["low", "medium", "high", "primary"]);
const knowledgeCandidateSchema = z.object({
  canonicalName: z.string().trim().min(2).max(512),
  entityType: z.enum(["term", "instrument", "form", "genre", "person", "place", "work", "organization", "conceptual_collection"]),
  emicDescription: z.string().trim().max(12000).optional(),
  eticComparison: z.string().trim().max(6000).optional(),
  taxonomySlugs: z.array(z.string().trim().min(1).max(160)).min(1).max(20),
  sourceConfidence: sourceConfidenceSchema,
  sources: z.array(z.object({ citation: z.string().trim().min(1).max(5000), uri: z.string().url().max(2048).optional() })).max(20),
  alternateNames: z.array(z.string().trim().min(1).max(512)).max(50).optional(),
  requiresSpecialistReview: z.boolean().optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  sonata: router({
    browse: publicProcedure.query(async () => ({
      mode: "foundation" as const,
      entries: await getPublicEntries(),
      taxonomy: SONATA_TAXONOMY_PREVIEW,
      note: "These are deliberately limited foundation records used to demonstrate the Sonata model. They are not a scholarly launch corpus.",
    })),
    entry: publicProcedure
      .input(z.object({ slug: z.string().trim().min(1).max(160) }))
      .query(async ({ input }) => getPublicEntry(input.slug)),
    search: publicProcedure
      .input(z.object({ query: z.string().trim().max(120) }))
      .query(async ({ input }) => ({ entries: await searchPublicEntries(input.query) })),
    coverage: publicProcedure.query(() => getKnowledgeCoverage()),
  }),
  editorial: router({
    summary: adminProcedure.query(() => getEditorialSummary()),
    createTermDraft: adminProcedure
      .input(
        z.object({
          canonicalName: z.string().trim().min(2).max(512),
          definition: z.string().trim().min(80).max(12000),
          entityType: z.enum(["term", "instrument", "form", "genre", "person", "place", "work", "organization", "conceptual_collection"]),
        }),
      )
      .mutation(({ input, ctx }) => createEditorialDraft({ ...input, createdByUserId: ctx.user.id })),
    createSource: adminProcedure
      .input(
        z.object({
          citation: z.string().trim().min(20).max(5000),
          locator: z.string().trim().max(1024).optional(),
        }),
      )
      .mutation(({ input }) => createEditorialSource(input)),
    reviewSource: adminProcedure
      .input(z.object({ publicId: z.string().uuid(), sourceQuality: z.enum(["unassessed", "mixed", "strong", "primary"]) }))
      .mutation(({ input }) => reviewEditorialSource(input)),
    createRelationship: adminProcedure
      .input(relationshipDraftSchema)
      .mutation(({ input, ctx }) => createEditorialRelationship({ ...input, createdByUserId: ctx.user.id })),
    updateRelationshipStatus: adminProcedure
      .input(z.object({ publicId: z.string().uuid(), editorialStatus: z.enum(["draft", "deprecated"]) }))
      .mutation(({ input }) => updateEditorialRelationshipStatus(input)),
    stageImport: adminProcedure
      .input(z.object({ headers: z.array(z.string().min(1)).max(250) }))
      .mutation(({ input, ctx }) => stageEditorialImport({ ...input, createdByUserId: ctx.user.id })),
    linkSource: adminProcedure
      .input(z.object({ conceptPublicId: z.string().uuid(), sourcePublicId: z.string().uuid(), claimScope: z.enum(["definition", "history", "practice", "classification", "relationship", "other"]), confidenceScore: z.number().int().min(0).max(100), editorialNote: z.string().trim().max(6000).optional() }))
      .mutation(({ input }) => linkSourceToConcept(input)),
    recordUncertainty: adminProcedure
      .input(z.object({ conceptPublicId: z.string().uuid(), uncertaintyNote: z.string().trim().min(20).max(6000) }))
      .mutation(({ input, ctx }) => recordConceptUncertainty({ ...input, reviewerUserId: ctx.user.id })),
    resolveUncertainty: adminProcedure
      .input(z.object({ conceptPublicId: z.string().uuid(), resolutionNote: z.string().trim().min(20).max(6000) }))
      .mutation(({ input, ctx }) => resolveConceptUncertainty({ ...input, reviewerUserId: ctx.user.id })),
    approveForExpertReview: adminProcedure
      .input(z.object({ conceptPublicId: z.string().uuid(), confidenceScore: z.number().int().min(0).max(100), reviewNotes: z.string().trim().min(20).max(6000) }))
      .mutation(({ input, ctx }) => approveConceptForExpertReview({ ...input, reviewerUserId: ctx.user.id })),
    publishExpertReviewed: adminProcedure
      .input(z.object({ conceptPublicId: z.string().uuid() }))
      .mutation(({ input, ctx }) => publishExpertReviewedConcept({ ...input, reviewerUserId: ctx.user.id })),
    bootstrapKnowledgeFramework: adminProcedure.mutation(() => bootstrapGlobalKnowledgeFramework()),
    stageKnowledgeBatch: adminProcedure
      .input(z.object({
        fileName: z.string().trim().min(3).max(1024),
        fileFormat: z.enum(["csv", "json", "jsonl", "xlsx"]),
        sourceProvider: z.string().trim().max(512).optional(),
        candidates: z.array(knowledgeCandidateSchema).min(1).max(500),
      }))
      .mutation(({ input, ctx }) => stageKnowledgeBatch({ ...input, createdByUserId: ctx.user.id })),
  }),
});

export type AppRouter = typeof appRouter;
