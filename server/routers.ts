import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { createEditorialDraft, createEditorialRelationship, createEditorialSource, getEditorialSummary, getPublicEntries, getPublicEntry, reviewEditorialSource, searchPublicEntries, stageEditorialImport, updateEditorialRelationshipStatus } from "./db";
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
  }),
});

export type AppRouter = typeof appRouter;
