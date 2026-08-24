import { describe, expect, it } from "vitest";
import { buildLearningPath, createConceptQuiz, expandResearchQuery, rankResearchRecords, type ResearchSearchRecord } from "../shared/sonata-research";

const records: ResearchSearchRecord[] = [
  {
    publicId: "11111111-1111-4111-8111-111111111111",
    slug: "raga",
    name: "Rāga",
    originalName: "राग",
    shortDefinition: "A melodic framework whose meaning and use vary across South Asian classical traditions.",
    entityType: "musical concept",
    region: "South Asia",
    tradition: "Indian classical music",
    category: "Melody",
    confidence: "high",
    tags: ["Melody", "Performance"],
    relationshipCount: 7,
    demonstration: true,
  },
  {
    publicId: "22222222-2222-4222-8222-222222222222",
    slug: "maqam",
    name: "Maqām",
    originalName: "مقام",
    shortDefinition: "A family of modal concepts used in several musical cultures of West Asia and North Africa.",
    entityType: "musical concept",
    region: "West Asia & North Africa",
    tradition: "Maqām traditions",
    category: "Mode",
    confidence: "high",
    tags: ["Mode", "Melody"],
    relationshipCount: 6,
    demonstration: true,
  },
];

describe("Part 3 research utilities", () => {
  it("expands approved multilingual and contextual aliases without inventing new records", () => {
    expect(expandResearchQuery("राग")).toContain("raga");
    expect(expandResearchQuery("Arabic mode")).toContain("maqam");
  });

  it("ranks native-script, fuzzy, and definition-context matches", () => {
    expect(rankResearchRecords(records, "राग")[0]?.slug).toBe("raga");
    expect(rankResearchRecords(records, "rag")[0]?.slug).toBe("raga");
    expect(rankResearchRecords(records, "Arabic mode")[0]?.slug).toBe("maqam");
  });

  it("ranks explicitly indexed relationship context without creating a new factual claim", () => {
    const withRelationshipContext = records.map(record => record.slug === "raga" ? { ...record, relationshipContext: "contrasts with maqam; separate modal concepts require contextual explanation" } : record);
    const match = rankResearchRecords(withRelationshipContext, "separate modal concepts")[0];
    expect(match?.slug).toBe("raga");
    expect(match?.matchReasons).toContain("relationship context match");
  });

  it("applies public-safe region and confidence filters to ranked records", () => {
    expect(rankResearchRecords(records, "", { region: "South Asia" }).map(record => record.slug)).toEqual(["raga"]);
    expect(rankResearchRecords(records, "", { confidence: "primary" })).toHaveLength(0);
  });

  it("builds learning and quiz prompts from existing published records only", () => {
    const path = buildLearningPath(records, "raga");
    const quiz = createConceptQuiz(records);
    expect(path[0]?.concept.slug).toBe("raga");
    expect(quiz[0]?.answer).toContain("melodic framework");
    expect(quiz.map(item => item.conceptSlug)).toEqual(["raga", "maqam"]);
  });
});
