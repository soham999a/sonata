import { getAdminFirestore } from "../firebase/admin";
import { DEMONSTRATION_DETAILS, DEMONSTRATION_ENTRIES, type SonataEntryCard, type SonataEntryDetail } from "./sonata-demo";
import { normalizeSearchTerm } from "./sonata-validation";
import { rankResearchRecords, type ResearchSearchRecord, type SearchFilters } from "../domain/sonata-research";
import { hasStagedCorpus, listStagedCards, getStagedDetail } from "./staging-file";
import { isFirestoreConfigured as isFirestoreReadConfigured, getPublishedCards, getPublishedCard, getAllDraftCards } from "./firestore-reader";
import { GENERATED_CARDS, GENERATED_DETAILS } from "./generated-catalogue";

const COLLECTIONS = {
  concepts: "concepts",
  coverage: "coverageTargets",
  contributions: "contributionSubmissions",
  learning: "learningProgress",
  assistantAudits: "assistantAudits",
} as const;

export function isFirestoreConfigured() {
  return Boolean(process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY);
}

function mapConceptDoc(doc: FirebaseFirestore.DocumentData): ResearchSearchRecord {
  const data = doc;
  return {
    publicId: data.publicId ?? doc?.id ?? "",
    slug: data.slug ?? "",
    name: data.canonicalName ?? data.name ?? "",
    originalName: data.transliteration ?? data.nativeScript,
    shortDefinition: data.shortDefinition ?? data.definition ?? "",
    entityType: data.entityType ?? "term",
    region: data.originRegion ?? "Not yet classified",
    tradition: data.tradition ?? "Context pending",
    genre: data.genre,
    era: data.era,
    category: data.category,
    language: data.languageOfOrigin,
    confidence: data.sourceConfidence ?? "medium",
    tags: data.tags ?? [],
    relationshipCount: data.relationshipCount ?? 0,
    demonstration: Boolean(data.demonstration),
  };
}

function toEntryCard(record: ResearchSearchRecord): SonataEntryCard {
  return {
    publicId: record.publicId,
    slug: record.slug,
    name: record.name,
    originalName: record.originalName,
    shortDefinition: record.shortDefinition,
    entityType: record.entityType,
    region: record.region,
    tradition: record.tradition,
    tags: record.tags,
    relationshipCount: record.relationshipCount,
    demonstration: true as const,
  };
}

export async function getPublicEntries(limit = 500): Promise<SonataEntryCard[]> {
  if (isFirestoreReadConfigured()) {
    try {
      const published = await getPublishedCards(limit);
      if (published.length > 0) return published;
    } catch {
      // fall through to admin/staged/demo sources
    }
  }
  const db = getAdminFirestore();
  if (db) {
    try {
      const snapshot = await db
        .collection(COLLECTIONS.concepts)
        .where("editorialStatus", "==", "published")
        .orderBy("updatedAt", "desc")
        .limit(limit)
        .get();
      const published = snapshot.docs.map(doc => toEntryCard(mapConceptDoc(doc.data())));
      if (published.length > 0) return published;
    } catch {
      // fall through to staged/demo sources
    }
  }
  return loadPublicFallback(limit);
}

function loadPublicFallback(limit: number): SonataEntryCard[] {
  if (hasStagedCorpus()) {
    const staged = listStagedCards();
    return limit > 0 && staged.length > limit ? staged.slice(0, limit) : staged;
  }
  if (GENERATED_CARDS.length > 0) {
    return limit > 0 && GENERATED_CARDS.length > limit ? GENERATED_CARDS.slice(0, limit) : GENERATED_CARDS;
  }
  return DEMONSTRATION_ENTRIES;
}

export async function getPublicEntry(slug: string): Promise<SonataEntryDetail | undefined> {
  if (isFirestoreReadConfigured()) {
    try {
      const published = await getPublishedCard(slug);
      if (published) return published;
    } catch {
      // fall through to admin/staged/demo sources
    }
  }
  const db = getAdminFirestore();
  if (db) {
    try {
      const snapshot = await db
        .collection(COLLECTIONS.concepts)
        .where("slug", "==", slug)
        .where("editorialStatus", "==", "published")
        .limit(1)
        .get();
      if (!snapshot.empty) {
        const row = snapshot.docs[0].data();
        const card = toEntryCard(mapConceptDoc(row));
        return {
          ...card,
          definition: row.definition ?? card.shortDefinition,
          historicalContext: row.historicalContext ?? "Historical context has not yet been added to this record.",
          practicalUsage: row.practicalUsage ?? "Practical usage has not yet been added to this record.",
          visualAudioDescription: row.visualAudioDescription ?? "Visual and audio description has not yet been added to this record.",
          emicDescription: row.emicDescription,
          eticComparison: row.eticComparison,
          regionalVariation: row.regionalVariation,
          uncertaintyNote: row.uncertaintyNote,
          editorialStatus: row.editorialStatus,
          sourceQuality: row.sourceQuality,
          pronunciation: row.pronunciation,
          languageOfOrigin: row.languageOfOrigin,
          nativeScript: row.nativeScript,
          transliteration: row.transliteration,
          taxonomyPath: row.taxonomyPath ?? ["World", card.region, card.tradition, ...card.tags, card.name],
          related: row.related ?? [],
          sources: row.sources ?? [],
          graphNodes: row.graphNodes ?? [{ id: card.slug, label: card.name, x: 50, y: 50, emphasis: "main", linkable: true }],
        };
      }
    } catch {
      return undefined;
    }
  }
  const stagedDetail = getStagedDetail(slug);
  if (stagedDetail) return stagedDetail;
  if (GENERATED_DETAILS[slug]) return GENERATED_DETAILS[slug];
  const detailedDemo = DEMONSTRATION_DETAILS[slug];
  if (detailedDemo) return detailedDemo;
  const card = DEMONSTRATION_ENTRIES.find(entry => entry.slug === slug);
  return card
    ? {
        ...card,
        definition: card.shortDefinition,
        historicalContext: "This published foundation record is ready for further source-linked historical context as the curated corpus grows.",
        practicalUsage: "Use the record’s taxonomy, relationships, and source trail to continue research without assuming a cross-cultural equivalent.",
        visualAudioDescription: "No licensed audio or visual example is attached to this foundation record yet. Sonata preserves descriptive context until rights-cleared media is available.",
        taxonomyPath: ["World", card.region, card.tradition, ...card.tags, card.name],
        related: [],
        sources: [],
        graphNodes: [{ id: card.slug, label: card.name, x: 50, y: 50, emphasis: "main", linkable: true }],
      }
    : undefined;
}

export async function searchPublicEntries(query: string): Promise<SonataEntryCard[]> {
  const normalizedQuery = normalizeSearchTerm(query);
  if (!normalizedQuery) return getPublicEntries();
  return getPublicEntries().then(entries =>
    entries.filter(entry =>
      [entry.name, entry.originalName, entry.shortDefinition, entry.region, entry.tradition, ...entry.tags]
        .filter(Boolean)
        .some(value => normalizeSearchTerm(value ?? "").includes(normalizedQuery)),
    ),
  );
}

export async function searchSonataKnowledge(input: { query: string; filters?: SearchFilters }): Promise<ResearchSearchRecord[]> {
  const db = getAdminFirestore();
  let records: ResearchSearchRecord[] = [];
  if (db) {
    try {
      const snapshot = await db.collection(COLLECTIONS.concepts).where("editorialStatus", "==", "published").limit(500).get();
      records = snapshot.docs.map(doc => mapConceptDoc(doc.data()));
    } catch {
      records = [];
    }
  }
  if (records.length === 0) {
    if (hasStagedCorpus()) {
      records = listStagedCards().map(card => ({
        ...card,
        entityType: card.entityType,
        genre: undefined,
        era: undefined,
        category: card.tags[0],
        language: undefined,
        confidence: "medium" as const,
        relationshipContext: undefined,
        tags: card.tags,
      }));
    } else if (GENERATED_CARDS.length > 0) {
      records = GENERATED_CARDS.map(card => ({
        ...card,
        entityType: card.entityType,
        genre: undefined,
        era: undefined,
        category: card.tags[0],
        language: undefined,
        confidence: "medium" as const,
        relationshipContext: undefined,
        tags: card.tags,
      }));
    } else {
      records = DEMONSTRATION_ENTRIES.map(card => ({
        ...card,
        entityType: card.entityType,
        genre: undefined,
        era: undefined,
        category: card.tags[0],
        language: undefined,
        confidence: "high" as const,
        relationshipContext: undefined,
        tags: card.tags,
      }));
    }
  }
  return rankResearchRecords(records, input.query, input.filters);
}

export { COLLECTIONS };
