import type { SonataEntryCard } from "./sonata-demo";
import { normalizeSearchTerm } from "./sonata-validation";

export function getPublicEntry_Client(entries: SonataEntryCard[], query: string): SonataEntryCard[] {
  const normalizedQuery = normalizeSearchTerm(query);
  if (!normalizedQuery) return entries;
  return entries.filter(entry =>
    [entry.name, entry.originalName, entry.shortDefinition, entry.region, entry.tradition, ...entry.tags]
      .filter(Boolean)
      .some(value => normalizeSearchTerm(value ?? "").includes(normalizedQuery)),
  );
}
