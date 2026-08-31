export const entityTypes = [
  "term",
  "instrument",
  "form",
  "genre",
  "person",
  "place",
  "work",
  "organization",
  "conceptual_collection",
] as const;

export const editorialStatuses = [
  "draft",
  "machine_generated",
  "machine_reviewed",
  "expert_reviewed",
  "published",
  "deprecated",
] as const;

export const nameTypes = [
  "canonical",
  "original_language",
  "native_script",
  "transliteration",
  "alternate",
  "historical",
] as const;

export const taxonomyNodeTypes = [
  "world_region",
  "region",
  "culture",
  "tradition",
  "genre",
  "era",
  "category",
  "instrument",
  "technique",
  "theory",
  "form",
  "rhythm",
  "melody",
  "harmony",
  "tuning",
  "notation",
  "performance",
  "technology",
] as const;

export const relationshipTypes = [
  "related_to",
  "part_of",
  "type_of",
  "subtype_of",
  "originated_in",
  "used_in",
  "influenced",
  "influenced_by",
  "contrasts_with",
  "synonym_of",
  "variant_of",
  "performed_with",
  "associated_with",
  "developed_from",
  "predecessor_of",
  "successor_of",
] as const;

export type EntityType = (typeof entityTypes)[number];
export type EditorialStatus = (typeof editorialStatuses)[number];
export type RelationshipType = (typeof relationshipTypes)[number];
