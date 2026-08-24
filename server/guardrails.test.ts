import { describe, expect, it } from "vitest";
import { decideAssistantEvidence, normalizeContributionForModeration, summarizeKnowledgeHealth } from "../shared/sonata-guardrails";

describe("Part 3 source and moderation guardrails", () => {
  it("blocks an AI synthesis when a retrieved record has no linked source trail", () => {
    expect(decideAssistantEvidence(1, 0)).toBe("insufficient_evidence");
    expect(decideAssistantEvidence(0, 2)).toBe("insufficient_evidence");
    expect(decideAssistantEvidence(1, 2)).toBe("grounded");
  });

  it("keeps contributor submissions in the moderation queue with meaningful detail", () => {
    expect(normalizeContributionForModeration({ kind: "source", summary: "  Add source  ", detail: "  This source provides a documented context for review.  " })).toMatchObject({ summary: "Add source", status: "submitted" });
    expect(() => normalizeContributionForModeration({ kind: "edit", summary: "No", detail: "too brief" })).toThrow(/summary/i);
  });

  it("calculates knowledge health without exposing individual unpublished records publicly", () => {
    const health = summarizeKnowledgeHealth([
      { editorialStatus: "published", sourceConfidence: "high", sourceCount: 2, originRegion: "South Asia", category: "Melody" },
      { editorialStatus: "draft", sourceConfidence: "low", sourceCount: 0, originRegion: "South Asia", category: "Rhythm" },
    ], ["published", "draft"]);
    expect(health.counts).toEqual({ published: 1, draft: 1 });
    expect(health.coverage).toEqual({ regions: 1, categories: 2 });
    expect(health.lowConfidence).toHaveLength(1);
    expect(health.relationshipHealth).toEqual({ reviewed: 1, needsReview: 1 });
  });
});
