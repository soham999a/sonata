import { describe, expect, it } from "vitest";
import { PRIMARY_COVERAGE_TARGET } from "../shared/sonata-coverage";
import { canPublishCandidate, validateKnowledgeCandidate } from "./knowledge.validation";

const source = { citation: "National cultural institution collection record, accession 101." };

describe("Part 2 knowledge validation", () => {
  it("keeps the primary regional coverage plan above fifteen thousand", () => {
    expect(PRIMARY_COVERAGE_TARGET).toBe(15350);
  });

  it("blocks unsourced or low-confidence records from publication", () => {
    const result = validateKnowledgeCandidate({
      canonicalName: "Example concept",
      entityType: "term",
      emicDescription: "A contextual description long enough to meet the editorial standard without replacing the concept with an imported comparison.",
      taxonomySlugs: ["south-asia"],
      sourceConfidence: "low",
      sources: [],
    });
    expect(canPublishCandidate(result)).toBe(false);
    expect(result.blockers).toContain("Low-confidence candidates remain unpublished until evidence is strengthened.");
  });

  it("flags likely duplicates and protects primary description from a comparison-only record", () => {
    const result = validateKnowledgeCandidate({
      canonicalName: "Maqām",
      entityType: "term",
      emicDescription: "A contextual description long enough to keep a tradition’s own musical logic ahead of any comparison made for navigation or teaching.",
      eticComparison: "A comparison for readers familiar with other modal systems.",
      taxonomySlugs: ["middle-east"],
      sourceConfidence: "high",
      sources: [source],
      alternateNames: ["maqam"],
    }, ["Maqam"]);
    expect(result.duplicateRisk).toBe("probable");
    expect(canPublishCandidate(result)).toBe(false);
  });

  it("allows a source-backed, reviewed candidate through the pure publication gate", () => {
    const result = validateKnowledgeCandidate({
      canonicalName: "Contextual practice",
      entityType: "term",
      emicDescription: "A source-backed contextual description that is intentionally longer than the editorial minimum and explains the term within its own practice rather than translating it into a Western equivalent.",
      taxonomySlugs: ["sub-saharan-africa", "instruments-performance"],
      sourceConfidence: "high",
      sources: [source],
    });
    expect(canPublishCandidate(result)).toBe(true);
  });
});
