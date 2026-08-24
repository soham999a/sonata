import { randomUUID } from "crypto";
import { and, desc, eq, inArray, like, or } from "drizzle-orm";
import {
  assistantAudits,
  conceptNames,
  conceptRelationships,
  concepts,
  contributionSubmissions,
  learningProgress,
  qualityIssues,
  searchDocuments,
  sources,
} from "../drizzle/schema";
import {
  buildLearningPath,
  createConceptQuiz,
  expandResearchQuery,
  paginateResearchResults,
  rankResearchRecords,
  type ResearchSearchRecord,
  type SearchFilters,
} from "../shared/sonata-research";
import { decideAssistantEvidence, normalizeContributionForModeration, summarizeKnowledgeHealth } from "../shared/sonata-guardrails";
import { invokeLLM, listLLMModels } from "./_core/llm";
import { getDb, getPublicEntries, getPublicEntry } from "./db";
import { DEMONSTRATION_ENTRIES } from "./sonata.demo";

const confidenceFromSourceQuality = (value: "unassessed" | "mixed" | "strong" | "primary"): ResearchSearchRecord["confidence"] => (
  value === "primary" ? "primary" : value === "strong" ? "high" : value === "mixed" ? "medium" : "low"
);

function mapPublishedRecord(row: typeof concepts.$inferSelect, alternateNames: string[] = [], relationshipCount = 0, relationshipContext = ""): ResearchSearchRecord {
  return {
    publicId: row.publicId,
    slug: row.slug,
    name: row.canonicalName,
    originalName: alternateNames.find(name => /[^\u0000-\u007f]/.test(name)) ?? row.transliteration ?? undefined,
    shortDefinition: row.shortDefinition ?? row.definition?.slice(0, 280) ?? "A published concept awaiting a complete public summary.",
    entityType: row.entityType.replace(/_/g, " "),
    region: row.originRegion ?? "Not yet classified",
    tradition: row.tradition ?? "Context pending",
    genre: row.genre ?? undefined,
    era: row.era ?? row.period ?? undefined,
    category: row.category ?? undefined,
    language: row.languageOfOrigin ?? undefined,
    confidence: confidenceFromSourceQuality(row.sourceQuality),
    tags: [row.category, row.genre, row.era, row.entityType].filter((value): value is string => Boolean(value)),
    relationshipCount,
    relationshipContext,
    demonstration: false,
  };
}

function mapDemonstrationRecord(record: typeof DEMONSTRATION_ENTRIES[number]): ResearchSearchRecord {
  return {
    ...record,
    genre: record.tags.find(tag => ["Form", "Mode", "Rhythm"].includes(tag)),
    category: record.tags[0],
    confidence: "high",
    demonstration: true,
  };
}

async function getPersistedSearchCandidates(query: string, filters: SearchFilters) {
  const db = await getDb();
  if (!db) return [];
  const terms = expandResearchQuery(query);
  const filterConditions = [eq(concepts.editorialStatus, "published")];
  if (filters.region) filterConditions.push(like(concepts.originRegion, `%${filters.region}%`));
  if (filters.tradition) filterConditions.push(like(concepts.tradition, `%${filters.tradition}%`));
  if (filters.genre) filterConditions.push(like(concepts.genre, `%${filters.genre}%`));
  if (filters.era) filterConditions.push(like(concepts.era, `%${filters.era}%`));
  if (filters.category) filterConditions.push(like(concepts.category, `%${filters.category}%`));
  if (filters.language) filterConditions.push(like(concepts.languageOfOrigin, `%${filters.language}%`));
  if (filters.instrument) filterConditions.push(or(eq(concepts.entityType, "instrument"), like(concepts.category, `%${filters.instrument}%`))!);
  const directConditions = terms.flatMap(term => [like(concepts.canonicalName, `%${term}%`), like(concepts.transliteration, `%${term}%`), like(concepts.shortDefinition, `%${term}%`), like(concepts.definition, `%${term}%`)]);
  const directRows = await db.select().from(concepts).where(and(...filterConditions, ...(directConditions.length ? [or(...directConditions)!] : []))).orderBy(desc(concepts.updatedAt)).limit(120);

  const matchedNameRows = terms.length
    ? await db.select({ conceptId: conceptNames.conceptId }).from(conceptNames).where(or(...terms.map(term => like(conceptNames.normalizedName, `%${term}%`)))!).limit(120)
    : [];
  const matchedDocumentRows = terms.length
    ? await db.select({ conceptId: searchDocuments.conceptId }).from(searchDocuments).where(or(...terms.map(term => or(like(searchDocuments.normalizedName, `%${term}%`), like(searchDocuments.searchableText, `%${term}%`))!))!).limit(120)
    : [];
  const supplementalIds = Array.from(new Set([...matchedNameRows, ...matchedDocumentRows].map(row => row.conceptId)));
  const supplementalRows = supplementalIds.length
    ? await db.select().from(concepts).where(and(...filterConditions, inArray(concepts.id, supplementalIds))).limit(120)
    : [];
  const rows = Array.from(new Map([...directRows, ...supplementalRows].map(row => [row.id, row])).values());
  if (!rows.length) return [];
  const ids = rows.map(row => row.id);
  const [nameRows, relationshipRows] = await Promise.all([
    db.select({ conceptId: conceptNames.conceptId, name: conceptNames.name }).from(conceptNames).where(inArray(conceptNames.conceptId, ids)),
    db.select({ sourceConceptId: conceptRelationships.sourceConceptId, targetConceptId: conceptRelationships.targetConceptId, relationshipType: conceptRelationships.relationshipType, contextNote: conceptRelationships.contextNote }).from(conceptRelationships).where(and(eq(conceptRelationships.editorialStatus, "published"), or(inArray(conceptRelationships.sourceConceptId, ids), inArray(conceptRelationships.targetConceptId, ids))!)),
  ]);
  const namesByConcept = new Map<number, string[]>();
  for (const name of nameRows) namesByConcept.set(name.conceptId, [...(namesByConcept.get(name.conceptId) ?? []), name.name]);
  const relationshipCounts = new Map<number, number>();
  const relatedIds = Array.from(new Set(relationshipRows.flatMap(relationship => [relationship.sourceConceptId, relationship.targetConceptId]).filter(id => !ids.includes(id))));
  const relatedRows = relatedIds.length ? await db.select({ id: concepts.id, canonicalName: concepts.canonicalName, transliteration: concepts.transliteration }).from(concepts).where(and(eq(concepts.editorialStatus, "published"), inArray(concepts.id, relatedIds))) : [];
  const relatedById = new Map(relatedRows.map(related => [related.id, related]));
  const relationshipContextById = new Map<number, string[]>();
  for (const relationship of relationshipRows) {
    relationshipCounts.set(relationship.sourceConceptId, (relationshipCounts.get(relationship.sourceConceptId) ?? 0) + 1);
    relationshipCounts.set(relationship.targetConceptId, (relationshipCounts.get(relationship.targetConceptId) ?? 0) + 1);
    for (const conceptId of [relationship.sourceConceptId, relationship.targetConceptId].filter(id => ids.includes(id))) {
      const related = relatedById.get(conceptId === relationship.sourceConceptId ? relationship.targetConceptId : relationship.sourceConceptId);
      const context = [relationship.relationshipType.replace(/_/g, " "), relationship.contextNote, related?.canonicalName, related?.transliteration].filter((value): value is string => Boolean(value)).join(" ");
      relationshipContextById.set(conceptId, [...(relationshipContextById.get(conceptId) ?? []), context]);
    }
  }
  return rows.map(row => mapPublishedRecord(row, namesByConcept.get(row.id), relationshipCounts.get(row.id) ?? 0, (relationshipContextById.get(row.id) ?? []).join(" ")));
}

export async function searchSonataKnowledge(input: { query: string; filters?: SearchFilters; page?: number; pageSize?: number }) {
  const filters = input.filters ?? {};
  const persisted = await getPersistedSearchCandidates(input.query, filters);
  const fallback = persisted.length ? [] : (await getPublicEntries(80)).map(mapDemonstrationRecord);
  const ranked = rankResearchRecords([...persisted, ...fallback], input.query, filters);
  const paginated = paginateResearchResults(ranked, input.page ?? 1, input.pageSize ?? 18);
  return {
    ...paginated,
    query: input.query,
    modes: ["exact", "fuzzy", "synonym", "transliteration", "native-script", "definition", "relationship-context"] as const,
    researchNotice: "Results are drawn from published Sonata records and their indexed names or context. A contextual match is not a claim of equivalence.",
    facets: {
      regions: Array.from(new Set(ranked.map(record => record.region).filter(Boolean))).slice(0, 24),
      traditions: Array.from(new Set(ranked.map(record => record.tradition).filter(Boolean))).slice(0, 24),
      eras: Array.from(new Set(ranked.map(record => record.era).filter((value): value is string => Boolean(value)))).slice(0, 24),
      categories: Array.from(new Set(ranked.flatMap(record => record.tags))).slice(0, 24),
    },
  };
}

export async function getLearningExperience(focus?: string) {
  const result = await searchSonataKnowledge({ query: focus ?? "", pageSize: 24 });
  const records = result.items;
  return {
    focus: focus ?? "Explore the language of music",
    path: buildLearningPath(records, focus),
    flashcards: records.slice(0, 8).map(record => ({ concept: record.name, prompt: "Name the concept from its context.", answer: record.shortDefinition, sourceSlug: record.slug })),
    quiz: createConceptQuiz(records),
    note: "Learning prompts are generated from published Sonata records. They are not a substitute for the source trail attached to each concept.",
  };
}

export async function recordLearningActivity(input: { userId: number; conceptSlug: string; activityType: "learning_path" | "flashcard" | "quiz"; masteryScore: number; completed: boolean }) {
  const db = await getDb();
  if (!db) throw new Error("The Sonata knowledge database is not available.");
  const [concept] = await db.select({ id: concepts.id }).from(concepts).where(and(eq(concepts.slug, input.conceptSlug), eq(concepts.editorialStatus, "published"))).limit(1);
  if (!concept) throw new Error("Learning progress can only be recorded for published Sonata concepts.");
  const existing = await db.select({ id: learningProgress.id, attempts: learningProgress.attempts }).from(learningProgress).where(and(eq(learningProgress.userId, input.userId), eq(learningProgress.conceptId, concept.id), eq(learningProgress.activityType, input.activityType))).limit(1);
  const values = { masteryScore: Math.max(0, Math.min(100, input.masteryScore)), status: input.completed ? "completed" as const : "in_progress" as const, lastActivityAt: new Date() };
  if (existing[0]) {
    await db.update(learningProgress).set({ ...values, attempts: existing[0].attempts + 1 }).where(eq(learningProgress.id, existing[0].id));
  } else {
    await db.insert(learningProgress).values({ publicId: randomUUID(), userId: input.userId, conceptId: concept.id, activityType: input.activityType, attempts: 1, ...values });
  }
  return { conceptSlug: input.conceptSlug, ...values };
}

export async function submitContribution(input: { userId: number; kind: "edit" | "new_term" | "error" | "source" | "relationship"; summary: string; detail: string; sourceUrl?: string; targetSlug?: string }) {
  const db = await getDb();
  if (!db) throw new Error("The Sonata knowledge database is not available.");
  const contribution = normalizeContributionForModeration(input);
  const target = input.targetSlug ? await db.select({ id: concepts.id }).from(concepts).where(eq(concepts.slug, input.targetSlug)).limit(1) : [];
  if (input.targetSlug && !target[0]) throw new Error("The selected Sonata concept could not be found.");
  const publicId = randomUUID();
  await db.insert(contributionSubmissions).values({ publicId, submitterUserId: input.userId, targetConceptId: target[0]?.id ?? null, kind: contribution.kind, summary: contribution.summary, detail: contribution.detail, sourceUrl: contribution.sourceUrl ?? null });
  return { publicId, status: "submitted" as const, moderationNotice: "Contributions enter editorial moderation and do not change public knowledge automatically." };
}

export async function getKnowledgeHealth() {
  const db = await getDb();
  if (!db) return { available: false, counts: {}, lowConfidence: [], openIssues: [], moderation: [], relationshipHealth: { reviewed: 0, needsReview: 0 } };
  const [conceptRows, issueRows, moderationRows, relationshipRows] = await Promise.all([
    db.select({ publicId: concepts.publicId, canonicalName: concepts.canonicalName, editorialStatus: concepts.editorialStatus, sourceConfidence: concepts.sourceConfidence, sourceCount: concepts.sourceCount, originRegion: concepts.originRegion, category: concepts.category }).from(concepts),
    db.select({ publicId: qualityIssues.publicId, issueType: qualityIssues.issueType, severity: qualityIssues.severity, detail: qualityIssues.detail, status: qualityIssues.status }).from(qualityIssues).where(or(eq(qualityIssues.status, "open"), eq(qualityIssues.status, "in_review"))!).orderBy(desc(qualityIssues.updatedAt)).limit(20),
    db.select({ publicId: contributionSubmissions.publicId, kind: contributionSubmissions.kind, summary: contributionSubmissions.summary, status: contributionSubmissions.status, createdAt: contributionSubmissions.createdAt }).from(contributionSubmissions).where(or(eq(contributionSubmissions.status, "submitted"), eq(contributionSubmissions.status, "in_review"))!).orderBy(desc(contributionSubmissions.createdAt)).limit(20),
    db.select({ editorialStatus: conceptRelationships.editorialStatus }).from(conceptRelationships),
  ]);
  const summary = summarizeKnowledgeHealth(conceptRows, relationshipRows.map(row => row.editorialStatus));
  return {
    available: true,
    counts: summary.counts,
    coverage: summary.coverage,
    lowConfidence: summary.lowConfidence.slice(0, 20),
    openIssues: issueRows,
    moderation: moderationRows,
    relationshipHealth: summary.relationshipHealth,
  };
}

export async function answerWithSonataEvidence(input: { question: string; userId?: number }) {
  const retrieval = await searchSonataKnowledge({ query: input.question, pageSize: 4 });
  const evidence = (await Promise.all(retrieval.items.slice(0, 4).map(record => getPublicEntry(record.slug)))).filter((record): record is NonNullable<typeof record> => Boolean(record));
  const sourceCards = evidence.flatMap(record => record.sources.map(source => ({ concept: record.name, ...source })));
  const db = await getDb();
  const saveAudit = async (answer: string, answerStatus: "grounded" | "insufficient_evidence" | "blocked", model?: string) => {
    const citedSourceIds = sourceCards.map(source => source.url);
    const audit = { publicId: randomUUID(), userId: input.userId ?? null, question: input.question, answer, retrievedConceptIds: retrieval.items.map(item => item.publicId), citedSourceIds, answerStatus, model: model ?? null };
    if (db) await db.insert(assistantAudits).values(audit);
    return { answer, answerStatus, citations: sourceCards, concepts: retrieval.items.map(item => ({ slug: item.slug, name: item.name })), model: model ?? null };
  };
  if (decideAssistantEvidence(evidence.length, sourceCards.length) === "insufficient_evidence") {
    return saveAudit("Sonata does not yet have enough published, source-linked evidence to answer that responsibly. Try a published concept record or consult its linked source trail.", "insufficient_evidence");
  }
  try {
    const { data: models } = await listLLMModels();
    const model = models.find(candidate => candidate.id === "gpt-5-mini")?.id ?? models.find(candidate => candidate.id.startsWith("gpt-5"))?.id ?? models[0]?.id;
    if (!model) return saveAudit("Sonata retrieved relevant evidence, but the synthesis service is currently unavailable. Review the cited concept records directly.", "insufficient_evidence");
    const evidenceBlock = evidence.map((record, index) => `CONCEPT ${index + 1}: ${record.name}\nDefinition: ${record.definition}\nContext: ${record.historicalContext}\nUsage: ${record.practicalUsage}\nSources: ${record.sources.map(source => `${source.label} — ${source.citation}`).join(" | ")}`).join("\n\n");
    const response = await invokeLLM({
      model,
      messages: [
        { role: "system", content: "You are Sonata’s research assistant. Answer only from the supplied Sonata evidence. Do not add facts from general knowledge, do not claim cross-cultural equivalence, and state when the evidence is limited. Cite every factual paragraph using [Sonata: Concept Name]. Keep the response under 350 words." },
        { role: "user", content: `Question: ${input.question}\n\nSonata evidence:\n${evidenceBlock}` },
      ],
      maxTokens: 700,
    });
    const rawAnswer = response.choices[0]?.message?.content;
    const answer = typeof rawAnswer === "string" ? rawAnswer.trim() : "";
    return saveAudit(answer || "Sonata retrieved evidence but could not produce a reliable synthesis. Review the cited concept records directly.", answer ? "grounded" : "insufficient_evidence", model);
  } catch {
    return saveAudit("Sonata retrieved relevant evidence, but the synthesis service is unavailable. Review the cited concept records directly.", "insufficient_evidence");
  }
}
