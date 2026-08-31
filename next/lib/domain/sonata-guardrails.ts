export type AssistantEvidenceDecision = "grounded" | "insufficient_evidence";

export function decideAssistantEvidence(recordCount: number, linkedSourceCount: number): AssistantEvidenceDecision {
  return recordCount > 0 && linkedSourceCount > 0 ? "grounded" : "insufficient_evidence";
}

export function normalizeContributionForModeration(input: { kind: "edit" | "new_term" | "error" | "source" | "relationship"; summary: string; detail: string; sourceUrl?: string }) {
  const summary = input.summary.trim();
  const detail = input.detail.trim();
  if (summary.length < 5 || detail.length < 20) throw new Error("A contribution needs a concise summary and enough editorial detail to review.");
  return { ...input, summary, detail, sourceUrl: input.sourceUrl?.trim() || undefined, status: "submitted" as const };
}

export function summarizeKnowledgeHealth<T extends { editorialStatus: string; sourceConfidence: string; sourceCount: number; originRegion: string | null; category: string | null }>(conceptRows: T[], relationshipStatuses: string[]) {
  const counts = conceptRows.reduce<Record<string, number>>((result, record) => { result[record.editorialStatus] = (result[record.editorialStatus] ?? 0) + 1; return result; }, {});
  return {
    counts,
    coverage: {
      regions: Array.from(new Set(conceptRows.map(row => row.originRegion).filter(Boolean))).length,
      categories: Array.from(new Set(conceptRows.map(row => row.category).filter(Boolean))).length,
    },
    lowConfidence: conceptRows.filter(record => record.sourceConfidence === "low" || record.sourceCount === 0),
    relationshipHealth: { reviewed: relationshipStatuses.filter(status => status === "published").length, needsReview: relationshipStatuses.filter(status => status !== "published").length },
  };
}
