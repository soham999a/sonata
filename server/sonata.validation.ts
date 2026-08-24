import { relationshipTypes, type RelationshipType } from "../shared/sonata";

export const HIERARCHICAL_RELATIONSHIPS = new Set<RelationshipType>([
  "part_of",
  "type_of",
  "subtype_of",
]);

export type RelationshipDraft = {
  sourcePublicId: string;
  targetPublicId: string;
  relationshipType: RelationshipType;
};

export type RelationshipEdge = Pick<
  RelationshipDraft,
  "sourcePublicId" | "targetPublicId" | "relationshipType"
>;

export function normalizeSearchTerm(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase();
}

export function isSupportedRelationshipType(value: string): value is RelationshipType {
  return (relationshipTypes as readonly string[]).includes(value);
}

export function wouldCreateHierarchyCycle(
  existingEdges: RelationshipEdge[],
  draft: RelationshipDraft,
): boolean {
  if (!HIERARCHICAL_RELATIONSHIPS.has(draft.relationshipType)) return false;
  if (draft.sourcePublicId === draft.targetPublicId) return true;

  const adjacency = new Map<string, string[]>();
  existingEdges
    .filter(edge => HIERARCHICAL_RELATIONSHIPS.has(edge.relationshipType))
    .forEach(edge => {
      const connected = adjacency.get(edge.sourcePublicId) ?? [];
      connected.push(edge.targetPublicId);
      adjacency.set(edge.sourcePublicId, connected);
    });

  const toVisit = [draft.targetPublicId];
  const visited = new Set<string>();
  while (toVisit.length > 0) {
    const current = toVisit.pop();
    if (!current || visited.has(current)) continue;
    if (current === draft.sourcePublicId) return true;
    visited.add(current);
    toVisit.push(...(adjacency.get(current) ?? []));
  }

  return false;
}

export function validateRelationshipDraft(
  draft: RelationshipDraft,
  existingEdges: RelationshipEdge[] = [],
): string[] {
  const errors: string[] = [];
  if (!draft.sourcePublicId || !draft.targetPublicId) {
    errors.push("Both source and target concept identifiers are required.");
  }
  if (!isSupportedRelationshipType(draft.relationshipType)) {
    errors.push("The relationship type is not in Sonata’s controlled vocabulary.");
  }
  if (draft.sourcePublicId === draft.targetPublicId) {
    errors.push("A concept cannot be related to itself through this relationship draft.");
  }
  if (wouldCreateHierarchyCycle(existingEdges, draft)) {
    errors.push("This hierarchical relationship would create a circular path.");
  }
  return errors;
}

export function validateLegacyImportHeaders(headers: string[]): string[] {
  const normalized = new Set(headers.map(normalizeSearchTerm));
  const required = ["id", "name", "definition"];
  return required
    .filter(field => !normalized.has(field))
    .map(field => `Missing required legacy-compatible field: ${field}.`);
}
