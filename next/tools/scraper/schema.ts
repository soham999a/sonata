import { randomUUID } from "node:crypto";
import type { SeedTerm } from "./seed.ts";
import { regionById } from "./regions.ts";

export type ConceptDoc = {
  publicId: string;
  slug: string;
  canonicalName: string;
  originalName?: string;
  transliteration?: string;
  nativeScript?: string;
  shortDefinition: string;
  definition: string;
  entityType: string;
  originRegion: string;
  tradition: string;
  genre?: string;
  era?: string;
  category?: string;
  languageOfOrigin?: string;
  pronunciation?: string;
  sourceConfidence: "machine_generated";
  sourceCount: number;
  tags: string[];
  relationshipCount: number;
  editorialStatus: "machine_generated";
  sourceQuality: "unassessed";
  taxonomyPath: string[];
  sources: Array<{ label: string; citation: string; scope: string; note: string; url: string }>;
  historicalContext: string;
  practicalUsage: string;
  visualAudioDescription: string;
  provenance: { source: string; importedAt: string; regionId: string; batch: string };
  updatedAt: string;
  createdAt: string;
};

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function shortDefinition(definition: string): string {
  return definition.length > 160 ? `${definition.slice(0, 160).trim()}…` : definition;
}

export function mapSeedToConcept(seed: SeedTerm, region: ReturnType<typeof regionById>, batch: string): ConceptDoc {
  const slug = slugify(seed.term);
  const scope = seed.source.label;
  return {
    publicId: randomUUID(),
    slug,
    canonicalName: seed.term,
    transliteration: seed.transliteration,
    shortDefinition: shortDefinition(seed.definition),
    definition: seed.definition,
    entityType: seed.entityType,
    originRegion: seed.originRegion,
    tradition: region?.tradition ?? "Context pending",
    genre: seed.tags[0],
    era: region?.era,
    category: region?.category,
    languageOfOrigin: seed.language ?? region?.language,
    sourceConfidence: "machine_generated",
    sourceCount: 1,
    tags: seed.tags,
    relationshipCount: 0,
    editorialStatus: "machine_generated",
    sourceQuality: "unassessed",
    taxonomyPath: [...(region?.taxonomyPath ?? ["World"]), seed.term],
    sources: [
      { label: scope, citation: seed.source.citation, scope, note: "Imported as a machine-generated draft pending editorial review.", url: seed.source.url ?? "" },
    ],
    historicalContext:
      "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    practicalUsage:
      "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    visualAudioDescription: "",
    provenance: { source: scope, importedAt: new Date().toISOString(), regionId: seed.regionId, batch },
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
}
