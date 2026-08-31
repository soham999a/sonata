"use client";

export type DraftRecord = { publicId: string; canonicalName: string; status: string };
export type SourceRecord = { publicId: string; citation: string; locator?: string; sourceQuality: string };
export type RelationshipRecord = {
  publicId: string;
  sourceName: string;
  targetName: string;
  sourcePublicId: string;
  targetPublicId: string;
  relationshipType: string;
  editorialStatus: string;
};
export type ImportRecord = {
  publicId: string;
  fileName: string;
  status: string;
  report: { headers?: string[]; errors?: string[]; stages?: string[] };
};

type EditorialState = {
  drafts: DraftRecord[];
  sources: SourceRecord[];
  relationships: RelationshipRecord[];
  imports: ImportRecord[];
};

let listeners: Array<() => void> = [];
let state: EditorialState = {
  drafts: [],
  sources: [],
  relationships: [],
  imports: [],
};

function emit() {
  const snapshot = state;
  listeners.forEach(listener => listener());
  return snapshot;
}

export function subscribeEditorial(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(candidate => candidate !== listener);
  };
}

export function getEditorialSnapshot(): EditorialState {
  return state;
}

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `rec-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

export function createTermDraft(input: { canonicalName: string; entityType: string; definition: string }) {
  const publicId = uid();
  state = { ...state, drafts: [{ publicId, canonicalName: input.canonicalName, status: "draft" }, ...state.drafts] };
  emit();
  return { publicId, canonicalName: input.canonicalName, status: "draft" as const };
}

export function createSource(input: { citation: string; locator?: string }) {
  const publicId = uid();
  state = {
    ...state,
    sources: [{ publicId, citation: input.citation, locator: input.locator, sourceQuality: "unassessed" }, ...state.sources],
  };
  emit();
  return { publicId };
}

export function createRelationship(input: { sourcePublicId: string; targetPublicId: string; relationshipType: string }) {
  const publicId = uid();
  const findName = (candidate: string) => state.drafts.find(draft => draft.publicId === candidate)?.canonicalName ?? candidate;
  const relationship: RelationshipRecord = {
    publicId,
    sourceName: findName(input.sourcePublicId),
    targetName: findName(input.targetPublicId),
    sourcePublicId: input.sourcePublicId,
    targetPublicId: input.targetPublicId,
    relationshipType: input.relationshipType,
    editorialStatus: "draft",
  };
  state = { ...state, relationships: [relationship, ...state.relationships] };
  emit();
  return { publicId, source: relationship.sourceName, target: relationship.targetName };
}

export function stageImport(input: { headers: string[] }) {
  const publicId = uid();
  const required = ["id", "name", "definition"];
  const errors = required.filter(header => !input.headers.includes(header));
  const report = { headers: input.headers, errors, stages: ["schema", "headers"] };
  state = {
    ...state,
    imports: [{ publicId, fileName: input.headers.length ? "header-report" : "unnamed", status: errors.length ? "held_for_review" : "approved", report }, ...state.imports],
  };
  emit();
  return { publicId, errors, report };
}

export function reviewSource(publicId: string, sourceQuality: string) {
  state = {
    ...state,
    sources: state.sources.map(source => (source.publicId === publicId ? { ...source, sourceQuality } : source)),
  };
  emit();
  return { sourceQuality };
}

export function updateRelationshipStatus(publicId: string, editorialStatus: string) {
  state = {
    ...state,
    relationships: state.relationships.map(relationship =>
      relationship.publicId === publicId ? { ...relationship, editorialStatus } : relationship,
    ),
  };
  emit();
  return { editorialStatus };
}

export function resetEditorial() {
  state = { drafts: [], sources: [], relationships: [], imports: [] };
  emit();
}
