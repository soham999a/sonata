import { describe, expect, it } from "vitest";
import {
  normalizeSearchTerm,
  validateLegacyImportHeaders,
  validateRelationshipDraft,
  wouldCreateHierarchyCycle,
} from "./sonata.validation";

describe("Sonata knowledge validation", () => {
  it("normalizes transliterated search variants without removing native script", () => {
    expect(normalizeSearchTerm("  Maqām  ")).toBe("maqam");
    expect(normalizeSearchTerm("مقام")).toBe("مقام");
  });

  it("blocks a circular hierarchy before it enters the graph", () => {
    const createsCycle = wouldCreateHierarchyCycle(
      [
        {
          sourcePublicId: "raga",
          targetPublicId: "hindustani",
          relationshipType: "part_of",
        },
        {
          sourcePublicId: "hindustani",
          targetPublicId: "south-asia",
          relationshipType: "part_of",
        },
      ],
      {
        sourcePublicId: "south-asia",
        targetPublicId: "raga",
        relationshipType: "part_of",
      },
    );

    expect(createsCycle).toBe(true);
  });

  it("requires controlled relationship types and two endpoints", () => {
    const errors = validateRelationshipDraft({
      sourcePublicId: "",
      targetPublicId: "fugue",
      relationshipType: "not_a_real_type" as "related_to",
    });

    expect(errors).toHaveLength(2);
  });

  it("preserves compatibility with the legacy import minimum", () => {
    expect(validateLegacyImportHeaders(["id", "name", "definition", "era"]))
      .toEqual([]);
    expect(validateLegacyImportHeaders(["name", "definition"]))
      .toEqual(["Missing required legacy-compatible field: id."]);
  });
});
