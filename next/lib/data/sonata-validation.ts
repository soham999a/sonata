import { relationshipTypes, type RelationshipType } from "../domain/sonata";

export function normalizeSearchTerm(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export const HIERARCHICAL_RELATIONSHIPS = new Set<RelationshipType>(["part_of", "type_of", "subtype_of"]);

export function isSupportedRelationshipType(value: string): value is RelationshipType {
  return (relationshipTypes as readonly string[]).includes(value);
}

export type RelationshipDraft = {
  sourcePublicId: string;
  targetPublicId: string;
  relationshipType: string;
};

export type ExistingEdge = {
  sourcePublicId: string;
  targetPublicId: string;
  relationshipType: RelationshipType;
};

export function wouldCreateHierarchyCycle(existingEdges: ExistingEdge[], draft: RelationshipDraft) {
  if (draft.sourcePublicId === draft.targetPublicId) return true;
  if (!isSupportedRelationshipType(draft.relationshipType)) return false;
  if (!HIERARCHICAL_RELATIONSHIPS.has(draft.relationshipType)) return false;

  const adjacency = new Map<string, string[]>();
  for (const edge of existingEdges) {
    if (!HIERARCHICAL_RELATIONSHIPS.has(edge.relationshipType)) continue;
    const list = adjacency.get(edge.sourcePublicId) ?? [];
    list.push(edge.targetPublicId);
    adjacency.set(edge.sourcePublicId, list);
  }

  const direct = adjacency.get(draft.sourcePublicId) ?? [];
  direct.push(draft.targetPublicId);
  adjacency.set(draft.sourcePublicId, direct);

  const stack: string[] = [draft.sourcePublicId];
  const visited = new Set<string>();
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current === draft.sourcePublicId && visited.size > 0) return true;
    if (visited.has(current)) continue;
    visited.add(current);
    for (const next of adjacency.get(current) ?? []) stack.push(next);
  }
  return false;
}

export function validateRelationshipDraft(draft: RelationshipDraft, existingEdges: ExistingEdge[] = []) {
  const errors: string[] = [];
  if (!isSupportedRelationshipType(draft.relationshipType)) {
    errors.push(`Unsupported relationship type "${draft.relationshipType}".`);
  }
  if (!draft.sourcePublicId || !draft.targetPublicId) {
    errors.push("Both source and target concept identifiers are required.");
  } else if (draft.sourcePublicId === draft.targetPublicId) {
    errors.push("A concept cannot be related to itself.");
  } else if (wouldCreateHierarchyCycle(existingEdges, draft)) {
    errors.push("This relationship would create a cycle in a hierarchical path.");
  }
  return errors;
}

const LEGACY_IMPORT_HEADERS = ["id", "name", "definition"];

export function validateLegacyImportHeaders(headers: string[]) {
  const normalized = headers.map(header => normalizeSearchTerm(header));
  const missing = LEGACY_IMPORT_HEADERS.filter(required => !normalized.includes(required));
  if (missing.length === 0) return [];
  return [`Import requires the "${missing.join(", ")}" column${missing.length > 1 ? "s" : ""}.`];
}
