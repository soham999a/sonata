import { normalizeSearchTerm } from "./sonata.validation";
import type { KnowledgeCandidate } from "../shared/sonata-coverage";

export type DuplicateRisk = "none" | "possible" | "probable";

export type KnowledgeValidationResult = {
  errors: string[];
  warnings: string[];
  blockers: string[];
  duplicateRisk: DuplicateRisk;
  normalizedKey: string;
};

export function assessDuplicateRisk(candidate: KnowledgeCandidate, existingNames: string[]): DuplicateRisk {
  const candidateNames = [candidate.canonicalName, ...(candidate.alternateNames ?? [])]
    .map(normalizeSearchTerm)
    .filter(Boolean);
  const known = existingNames.map(normalizeSearchTerm).filter(Boolean);
  if (candidateNames.some(name => known.includes(name))) return "probable";
  if (candidateNames.some(name => known.some(other => name.includes(other) || other.includes(name)))) return "possible";
  return "none";
}

export function validateKnowledgeCandidate(candidate: KnowledgeCandidate, existingNames: string[] = []): KnowledgeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const blockers: string[] = [];
  const normalizedKey = normalizeSearchTerm(candidate.canonicalName);
  const duplicateRisk = assessDuplicateRisk(candidate, existingNames);

  if (normalizedKey.length < 2) errors.push("A canonical concept name is required.");
  if (!candidate.taxonomySlugs.length) errors.push("At least one taxonomy pathway is required.");
  if (!candidate.emicDescription || candidate.emicDescription.trim().length < 80) {
    blockers.push("An emic description of at least 80 characters is required before publication.");
  }
  if (candidate.sources.length === 0 || candidate.sources.some(source => source.citation.trim().length < 12)) {
    blockers.push("At least one usable source citation is required before publication.");
  }
  if (candidate.sourceConfidence === "low") {
    blockers.push("Low-confidence candidates remain unpublished until evidence is strengthened.");
  }
  if (candidate.requiresSpecialistReview) {
    blockers.push("This candidate is awaiting specialist review and cannot be published yet.");
  }
  if (duplicateRisk === "probable") blockers.push("A probable duplicate must be resolved before publication.");
  if (duplicateRisk === "possible") warnings.push("A possible duplicate should be reviewed with cultural and historical context.");
  if (candidate.eticComparison && !candidate.emicDescription) {
    errors.push("A cross-cultural comparison cannot substitute for an emic description.");
  }
  if (candidate.eticComparison) warnings.push("Cross-cultural comparison is stored separately from the primary definition.");

  return { errors, warnings, blockers, duplicateRisk, normalizedKey };
}

export function canPublishCandidate(result: KnowledgeValidationResult): boolean {
  return result.errors.length === 0 && result.blockers.length === 0;
}
