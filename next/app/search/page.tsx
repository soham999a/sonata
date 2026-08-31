import { SearchContent } from "@/components/SearchContent";
import { type ResearchSearchRecord } from "@/lib/domain/sonata-research";
import { listStagedCards, hasStagedCorpus } from "@/lib/data/staging-file";
import { DEMONSTRATION_ENTRIES } from "@/lib/data/sonata-demo";

export const revalidate = 60;

function toBaseRecords(): ResearchSearchRecord[] {
  if (hasStagedCorpus()) {
    return listStagedCards().map(card => ({
      ...card,
      entityType: card.entityType,
      genre: undefined,
      era: undefined,
      category: card.tags[0],
      language: undefined,
      confidence: "medium" as const,
      relationshipContext: undefined,
      relationshipCount: card.relationshipCount,
    }));
  }
  return DEMONSTRATION_ENTRIES.map(card => ({
    ...card,
    entityType: card.entityType,
    genre: undefined,
    era: undefined,
    category: card.tags[0],
    language: undefined,
    confidence: "high" as const,
    relationshipContext: undefined,
    relationshipCount: card.relationshipCount,
  }));
}

const BASE_RECORDS = toBaseRecords();

export default function SearchPage() {
  return <SearchContent initialRecords={BASE_RECORDS} />;
}
