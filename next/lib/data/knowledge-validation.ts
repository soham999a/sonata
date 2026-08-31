import type { KnowledgeCandidate } from "../domain/sonata-coverage";

export type DuplicateRisk = "none" | "possible" | "probable";

export type KnowledgeValidationResult = {
  errors: string[];
  warnings: string[];
  blockers: string[];
  duplicateRisk: DuplicateRisk;
  normalizedKey: string;
};

export function normalizeCandidateKey(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim().replace(/\s+/g, " ");
}

export function assessDuplicateRisk(candidateName: string, existingNames: string[]): DuplicateRisk {
  const key = normalizeCandidateKey(candidateName);
  if (existingNames.some(name => normalizeCandidateKey(name) === key)) return "probable";
  if (existingNames.some(name => normalizeCandidateKey(name).includes(key) || key.includes(normalizeCandidateKey(name)))) return "possible";
  return "none";
}

export function validateKnowledgeCandidate(candidate: KnowledgeCandidate, existingNames: string[] = []): KnowledgeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const blockers: string[] = [];
  const normalizedKey = normalizeCandidateKey(candidate.canonicalName);

  if (!candidate.canonicalName?.trim()) blockers.push("A canonical display name is required.");
  if (!candidate.taxonomySlugs?.length) blockers.push("Assign at least one taxonomy node before staging this candidate.");
  if (!candidate.emicDescription || candidate.emicDescription.replace(/\s+/g, "").length < 80) blockers.push("A sourced emic description of at least 80 characters is required.");
  if (!candidate.sources?.length || candidate.sources.some((source: { citation: string }) => !source.citation || source.citation.trim().length < 12)) blockers.push("Provide at least one source citation of 12 or more characters.");
  if (candidate.sourceConfidence === "low") blockers.push("Low source confidence requires editorial review before staging.");
  if (candidate.requiresSpecialistReview) blockers.push("This candidate is flagged for specialist editorial review.");

  const duplicateRisk = assessDuplicateRisk(candidate.canonicalName, existingNames);
  if (duplicateRisk === "probable") blockers.push("A probable duplicate was detected and publication is blocked for review.");
  else if (duplicateRisk === "possible") warnings.push("A possible duplicate was detected; please confirm the intended concept before publishing.");

  if (candidate.eticComparison && !candidate.emicDescription) errors.push("An etic comparison requires a sourced emic description first.");

  return { errors, warnings, blockers, duplicateRisk, normalizedKey };
}

export function canPublishCandidate(result: KnowledgeValidationResult) {
  return result.errors.length === 0 && result.blockers.length === 0;
}
