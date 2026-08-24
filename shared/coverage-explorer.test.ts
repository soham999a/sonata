import { describe, expect, it } from "vitest";
import { createEditorialStatusDataset, editorialStatusFromSearchParam, filterEditorialStatusDataset } from "./coverage-explorer";

describe("public editorial-status coverage dataset", () => {
  it("keeps every safe editorial status visible in the all-status dataset", () => {
    const dataset = createEditorialStatusDataset({ draft: 3, published: 2 });
    expect(dataset).toHaveLength(6);
    expect(dataset.find(row => row.status === "draft")?.count).toBe(3);
    expect(dataset.find(row => row.status === "machine_reviewed")?.count).toBe(0);
  });

  it("filters the visible dataset to the selected status without exposing individual unpublished records", () => {
    const dataset = createEditorialStatusDataset({ expert_reviewed: 4, published: 2 });
    expect(filterEditorialStatusDataset(dataset, "expert_reviewed")).toEqual([{ status: "expert_reviewed", count: 4 }]);
  });

  it("accepts only known editorial statuses from a linkable public query parameter", () => {
    expect(editorialStatusFromSearchParam("published")).toBe("published");
    expect(editorialStatusFromSearchParam("unexpected-status")).toBe("all");
  });
});
