/**
 * STYLE: Editorial Cartography. A protected provenance desk for structured,
 * persisted editorial work—more reference ledger than generic SaaS workflow.
 */
import { AlertTriangle, ArrowLeft, BookOpenCheck, CheckCircle2, ChevronRight, FileSpreadsheet, GitCompareArrows, ListChecks, Network, PenLine, Quote, ShieldCheck } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Link } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import "../editorial-inspector.css";

type ToolId = "draft" | "source" | "relationship" | "import";
type ResultNote = { heading: string; lines: string[]; valid: boolean } | null;
type SourceQuality = "unassessed" | "mixed" | "strong" | "primary";
type SelectedRecord = { kind: "source" | "relationship" | "import"; publicId: string } | null;

const tools: Array<{ id: ToolId; label: string; detail: string; icon: typeof PenLine }> = [
  { id: "draft", label: "Draft term", detail: "Create a structured draft record", icon: PenLine },
  { id: "source", label: "Stage source", detail: "Store a reference record", icon: Quote },
  { id: "relationship", label: "Add relationship", detail: "Save a typed draft edge", icon: Network },
  { id: "import", label: "Stage import", detail: "Persist a header review report", icon: FileSpreadsheet },
];

function ResultCallout({ result }: { result: ResultNote }) {
  if (!result) return null;
  return (
    <aside className={`validation-note ${result.valid ? "validation-note--valid" : "validation-note--attention"}`}>
      {result.valid ? <CheckCircle2 size={18} strokeWidth={1.5} /> : <AlertTriangle size={18} strokeWidth={1.5} />}
      <div><strong>{result.heading}</strong>{result.lines.map(line => <p key={line}>{line}</p>)}</div>
    </aside>
  );
}

function ActivityPanel({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <article className="activity-panel">
      <div className="activity-panel__heading"><p className="eyebrow">{title}</p><span>{count.toString().padStart(2, "0")}</span></div>
      {children}
    </article>
  );
}

function EditorialWorkbenchContent() {
  const [activeTool, setActiveTool] = useState<ToolId>("draft");
  const [result, setResult] = useState<ResultNote>(null);
  const [draft, setDraft] = useState({ canonicalName: "", definition: "", entityType: "term" as const });
  const [source, setSource] = useState({ citation: "", locator: "" });
  const [relationship, setRelationship] = useState({ sourcePublicId: "", targetPublicId: "", relationshipType: "related_to" as const });
  const [headers, setHeaders] = useState("id, name, definition, historical_context, era, category");
  const [selectedRecord, setSelectedRecord] = useState<SelectedRecord>(null);
  const [sourceQuality, setSourceQuality] = useState<SourceQuality>("unassessed");
  const utils = trpc.useUtils();
  const summary = trpc.editorial.summary.useQuery();
  const activeToolMeta = useMemo(() => tools.find(tool => tool.id === activeTool) ?? tools[0], [activeTool]);
  const refreshLedger = () => utils.editorial.summary.invalidate();

  const draftMutation = trpc.editorial.createTermDraft.useMutation({
    onSuccess: data => {
      setDraft({ canonicalName: "", definition: "", entityType: "term" });
      setRelationship(current => ({ ...current, sourcePublicId: current.sourcePublicId || data.publicId }));
      setResult({ heading: "Draft saved to the knowledge database", lines: [`${data.canonicalName} is now a ${data.status} record.`, `Public UUID: ${data.publicId}`, "The public catalogue remains limited to published records."], valid: true });
      refreshLedger();
    },
    onError: error => setResult({ heading: "Draft was not saved", lines: [error.message], valid: false }),
  });
  const sourceMutation = trpc.editorial.createSource.useMutation({
    onSuccess: data => {
      setSource({ citation: "", locator: "" });
      setResult({ heading: "Source record staged", lines: ["The citation has been stored independently from a concept claim.", `Reference UUID: ${data.publicId}`], valid: true });
      refreshLedger();
    },
    onError: error => setResult({ heading: "Source was not saved", lines: [error.message], valid: false }),
  });
  const relationshipMutation = trpc.editorial.createRelationship.useMutation({
    onSuccess: data => {
      setResult({ heading: "Relationship draft saved", lines: [`${data.source} → ${data.target}`, `Relationship UUID: ${data.publicId}`, "The relationship is stored as a draft and remains outside public navigation."], valid: true });
      refreshLedger();
    },
    onError: error => setResult({ heading: "Relationship was not saved", lines: [error.message], valid: false }),
  });
  const importMutation = trpc.editorial.stageImport.useMutation({
    onSuccess: data => {
      setResult({ heading: data.errors.length ? "Import report staged for review" : "Import report staged", lines: data.errors.length ? data.errors : ["Legacy-required headers are present. A source file can now proceed to row-level checks.", `Import UUID: ${data.publicId}`], valid: data.errors.length === 0 });
      refreshLedger();
    },
    onError: error => setResult({ heading: "Import report was not saved", lines: [error.message], valid: false }),
  });
  const sourceReviewMutation = trpc.editorial.reviewSource.useMutation({
    onSuccess: data => {
      setResult({ heading: "Source review recorded", lines: [`Source quality is now marked ${data.sourceQuality}.`, "This assessment remains separate from editorial review of any linked concept claim."], valid: true });
      refreshLedger();
    },
    onError: error => setResult({ heading: "Source review was not saved", lines: [error.message], valid: false }),
  });
  const relationshipStatusMutation = trpc.editorial.updateRelationshipStatus.useMutation({
    onSuccess: data => {
      setResult({ heading: "Relationship status updated", lines: [`The stored edge is now ${data.editorialStatus}.`, "Only reviewed relationships should ever advance into public navigation."], valid: true });
      refreshLedger();
    },
    onError: error => setResult({ heading: "Relationship status was not updated", lines: [error.message], valid: false }),
  });

  const busy = draftMutation.isPending || sourceMutation.isPending || relationshipMutation.isPending || importMutation.isPending || sourceReviewMutation.isPending || relationshipStatusMutation.isPending;
  const submitDraft = (event: FormEvent) => { event.preventDefault(); draftMutation.mutate(draft); };
  const submitSource = (event: FormEvent) => { event.preventDefault(); sourceMutation.mutate({ citation: source.citation, locator: source.locator || undefined }); };
  const submitRelationship = (event: FormEvent) => { event.preventDefault(); relationshipMutation.mutate(relationship); };
  const submitImport = (event: FormEvent) => { event.preventDefault(); importMutation.mutate({ headers: headers.split(",").map(header => header.trim()).filter(Boolean) }); };
  const selectedSource = selectedRecord?.kind === "source" ? summary.data?.recentSources.find(record => record.publicId === selectedRecord.publicId) : undefined;
  const selectedRelationship = selectedRecord?.kind === "relationship" ? summary.data?.recentRelationships.find(record => record.publicId === selectedRecord.publicId) : undefined;
  const selectedImport = selectedRecord?.kind === "import" ? summary.data?.recentImports.find(record => record.publicId === selectedRecord.publicId) : undefined;
  const selectedImportReport = selectedImport?.report as { headers?: string[]; errors?: string[]; stages?: string[] } | null | undefined;

  return (
    <div className="editorial-shell">
      <div className="editorial-shell__topbar"><Link href="/" className="back-link"><ArrowLeft size={15} strokeWidth={1.5} aria-hidden="true" /> Public catalogue</Link><span className="eyebrow">Internal foundation · v0.1</span></div>
      <section className="editorial-hero"><div><p className="eyebrow">Knowledge operations</p><h1>Editorial desk</h1><p>Create persistently stored drafts, reference records, typed concept edges, and import reports. The foundation never promotes a draft or unchecked import into public knowledge.</p></div><div className="editorial-hero__status"><span className="status-dot" /> Database-backed editorial layer active</div></section>
      <section className="provenance-route" aria-label="Editorial sequence"><span>Source</span><ChevronRight size={13} /><span>Draft</span><ChevronRight size={13} /><span>Relationship</span><ChevronRight size={13} /><span>Review</span><ChevronRight size={13} /><span>Publish</span></section>

      <section className="editorial-desk">
        <aside className="editorial-desk__tools" aria-label="Editorial tools">
          <div className="desk-mark"><span /><span /><span /></div><p className="eyebrow">Reference checks</p>
          {tools.map(tool => <button type="button" key={tool.id} className={`desk-tool ${activeTool === tool.id ? "is-active" : ""}`} onClick={() => { setActiveTool(tool.id); setResult(null); }}><tool.icon size={18} strokeWidth={1.5} aria-hidden="true" /><span><strong>{tool.label}</strong><small>{tool.detail}</small></span><ChevronRight size={15} strokeWidth={1.5} aria-hidden="true" /></button>)}
          <div className="desk-tool__note"><ShieldCheck size={16} strokeWidth={1.5} /><span>Each action writes a controlled record. Review and publication remain explicit later stages.</span></div>
        </aside>

        <section className="editorial-desk__workspace">
          <div className="workspace-heading"><div><p className="eyebrow">{activeToolMeta.label}</p><h2>{activeTool === "draft" ? "Create a concept draft" : activeTool === "source" ? "Store a reference record" : activeTool === "relationship" ? "Save a typed connection" : "Stage an import report"}</h2></div><span className="workspace-heading__step">0{tools.findIndex(tool => tool.id === activeTool) + 1}</span></div>
          {activeTool === "draft" ? <form className="editorial-form" onSubmit={submitDraft}><label>Canonical name<input value={draft.canonicalName} onChange={event => setDraft(current => ({ ...current, canonicalName: event.target.value }))} placeholder="e.g., Rāga" required /></label><label>Entity type<select value={draft.entityType} onChange={event => setDraft(current => ({ ...current, entityType: event.target.value as typeof draft.entityType }))}><option value="term">Term</option><option value="instrument">Instrument</option><option value="form">Form</option><option value="genre">Genre</option><option value="person">Person</option><option value="place">Place</option><option value="work">Work</option><option value="organization">Organization</option><option value="conceptual_collection">Conceptual collection</option></select></label><label className="editorial-form__wide">Working definition<textarea value={draft.definition} onChange={event => setDraft(current => ({ ...current, definition: event.target.value }))} placeholder="Write a culture-aware working definition of at least 80 characters…" required /></label><div className="form-footer"><span>Saving creates a UUID-identified draft that is excluded from public results.</span><button type="submit" className="button-primary" disabled={busy}>Save draft <ChevronRight size={16} /></button></div></form> : null}
          {activeTool === "source" ? <form className="editorial-form" onSubmit={submitSource}><label className="editorial-form__wide">Full citation<textarea value={source.citation} onChange={event => setSource(current => ({ ...current, citation: event.target.value }))} placeholder="Author, title, publisher, year…" required /></label><label className="editorial-form__wide">Locator or stable URL<input value={source.locator} onChange={event => setSource(current => ({ ...current, locator: event.target.value }))} placeholder="DOI, archive ID, page range, or stable URL" /></label><div className="form-footer"><span>Citations are stored separately so they can support individual definitions, facts, or relationships.</span><button type="submit" className="button-primary" disabled={busy}>Stage source <ChevronRight size={16} /></button></div></form> : null}
          {activeTool === "relationship" ? <form className="editorial-form" onSubmit={submitRelationship}><label>Source concept UUID<input value={relationship.sourcePublicId} onChange={event => setRelationship(current => ({ ...current, sourcePublicId: event.target.value }))} placeholder="Create a draft or use an import UUID" required /></label><label>Target concept UUID<input value={relationship.targetPublicId} onChange={event => setRelationship(current => ({ ...current, targetPublicId: event.target.value }))} placeholder="Create a second concept draft" required /></label><label className="editorial-form__wide">Relationship type<select value={relationship.relationshipType} onChange={event => setRelationship(current => ({ ...current, relationshipType: event.target.value as typeof relationship.relationshipType }))}><option value="related_to">Related to</option><option value="part_of">Part of</option><option value="type_of">Type of</option><option value="subtype_of">Subtype of</option><option value="contrasts_with">Contrasts with</option><option value="used_in">Used in</option><option value="associated_with">Associated with</option><option value="influenced">Influenced</option></select></label><div className="form-footer"><span>Both concept UUIDs must already exist. Hierarchical edges are cycle-checked before save.</span><button type="submit" className="button-primary" disabled={busy}>Save relationship <ChevronRight size={16} /></button></div></form> : null}
          {activeTool === "import" ? <form className="editorial-form" onSubmit={submitImport}><label className="editorial-form__wide">Delimited header row<textarea value={headers} onChange={event => setHeaders(event.target.value)} placeholder="id, name, definition, historical_context…" required /></label><div className="import-report-preview"><ListChecks size={19} strokeWidth={1.5} /><div><strong>Import report records</strong><span>Schema, normalization, UUIDs, duplicates, relationships, taxonomy, uncertainty, and the resulting gate status.</span></div></div><div className="form-footer"><span>Required legacy fields: `id`, `name`, and `definition`.</span><button type="submit" className="button-primary" disabled={busy}>Stage report <ChevronRight size={16} /></button></div></form> : null}
          <ResultCallout result={result} />
        </section>
      </section>

      <section className="activity-ledger" aria-label="Recent editorial records">
        <ActivityPanel title="Draft records" count={summary.data?.recentDrafts.length ?? 0}>{summary.isLoading ? <p className="activity-empty">Loading ledger…</p> : summary.data?.recentDrafts.length ? <ul>{summary.data.recentDrafts.map(record => <li key={record.publicId}><strong>{record.canonicalName}</strong><span>{record.status} · {record.publicId.slice(0, 8)}…</span></li>)}</ul> : <p className="activity-empty">No saved drafts yet.</p>}</ActivityPanel>
        <ActivityPanel title="Relationship drafts" count={summary.data?.recentRelationships.length ?? 0}>{summary.data?.recentRelationships.length ? <ul>{summary.data.recentRelationships.map(record => <li key={record.publicId}><button type="button" className="activity-record" onClick={() => setSelectedRecord({ kind: "relationship", publicId: record.publicId })}><strong>{record.sourceName} → {record.targetName}</strong><span>{record.relationshipType.replace(/_/g, " ")} · {record.publicId.slice(0, 8)}…</span></button></li>)}</ul> : <p className="activity-empty">No saved relationships yet.</p>}</ActivityPanel>
        <ActivityPanel title="Source records" count={summary.data?.recentSources.length ?? 0}>{summary.data?.recentSources.length ? <ul>{summary.data.recentSources.map(record => <li key={record.publicId}><button type="button" className="activity-record" onClick={() => { setSelectedRecord({ kind: "source", publicId: record.publicId }); setSourceQuality(record.sourceQuality); }}><strong>{record.citation}</strong><span>{record.sourceQuality} · {record.publicId.slice(0, 8)}…</span></button></li>)}</ul> : <p className="activity-empty">No staged sources yet.</p>}</ActivityPanel>
        <ActivityPanel title="Import reports" count={summary.data?.recentImports.length ?? 0}>{summary.data?.recentImports.length ? <ul>{summary.data.recentImports.map(record => <li key={record.publicId}><button type="button" className="activity-record" onClick={() => setSelectedRecord({ kind: "import", publicId: record.publicId })}><strong>{record.fileName}</strong><span>{record.status.replace(/_/g, " ")} · {record.publicId.slice(0, 8)}…</span></button></li>)}</ul> : <p className="activity-empty">No staged import reports yet.</p>}</ActivityPanel>
      </section>

      {selectedSource ? <section className="review-inspector"><div className="review-inspector__heading"><div><p className="eyebrow">Selected source record</p><h2>Review bibliographic confidence</h2></div><button type="button" onClick={() => setSelectedRecord(null)}>Close</button></div><div className="review-inspector__content"><div><span>Full citation</span><p>{selectedSource.citation}</p></div><div><span>Locator</span><p>{selectedSource.locator || "No locator recorded"}</p></div><div><span>Reference UUID</span><p>{selectedSource.publicId}</p></div><label>Source quality<select value={sourceQuality} onChange={event => setSourceQuality(event.target.value as SourceQuality)}><option value="unassessed">Unassessed</option><option value="mixed">Mixed</option><option value="strong">Strong</option><option value="primary">Primary</option></select></label></div><div className="review-inspector__footer"><p>Reviewing a source records its quality assessment while preserving the original citation.</p><button type="button" className="button-primary" disabled={busy} onClick={() => sourceReviewMutation.mutate({ publicId: selectedSource.publicId, sourceQuality })}>Record review <ChevronRight size={16} /></button></div></section> : null}
      {selectedRelationship ? <section className="review-inspector"><div className="review-inspector__heading"><div><p className="eyebrow">Selected relationship draft</p><h2>{selectedRelationship.sourceName} → {selectedRelationship.targetName}</h2></div><button type="button" onClick={() => setSelectedRecord(null)}>Close</button></div><div className="review-inspector__content"><div><span>Relationship type</span><p>{selectedRelationship.relationshipType.replace(/_/g, " ")}</p></div><div><span>Current status</span><p>{selectedRelationship.editorialStatus}</p></div><div><span>Relationship UUID</span><p>{selectedRelationship.publicId}</p></div></div><div className="review-inspector__footer"><p>Deprecation preserves the record instead of deleting a relationship that may have appeared in earlier editorial work.</p><button type="button" className="button-primary" disabled={busy} onClick={() => relationshipStatusMutation.mutate({ publicId: selectedRelationship.publicId, editorialStatus: selectedRelationship.editorialStatus === "deprecated" ? "draft" : "deprecated" })}>{selectedRelationship.editorialStatus === "deprecated" ? "Restore draft" : "Deprecate draft"} <ChevronRight size={16} /></button></div></section> : null}
      {selectedImport ? <section className="review-inspector"><div className="review-inspector__heading"><div><p className="eyebrow">Selected import report</p><h2>{selectedImport.fileName}</h2></div><button type="button" onClick={() => setSelectedRecord(null)}>Close</button></div><div className="review-inspector__content"><div><span>Gate status</span><p>{selectedImport.status.replace(/_/g, " ")}</p></div><div><span>Header fields</span><p>{selectedImportReport?.headers?.join(" · ") || "No headers stored"}</p></div><div><span>Validation stages</span><p>{selectedImportReport?.stages?.join(" · ") || "No stages stored"}</p></div><div><span>Validation errors</span><p>{selectedImportReport?.errors?.length ? selectedImportReport.errors.join(" ") : "No header-level errors recorded"}</p></div></div><div className="review-inspector__footer"><p>The report is stored with the import record so an editor can inspect prior gates without re-running a header review.</p><span className="inspector-uuid">{selectedImport.publicId}</span></div></section> : null}

      <section className="editorial-ledger"><article><BookOpenCheck size={20} strokeWidth={1.5} /><div><p className="eyebrow">Record policy</p><h2>Context is a first-class field.</h2><p>Original language, transliteration, cultural scope, and source confidence are never hidden in an unstructured note.</p></div></article><article><GitCompareArrows size={20} strokeWidth={1.5} /><div><p className="eyebrow">Revision policy</p><h2>Published knowledge is not silently overwritten.</h2><p>Revision records capture who changed a value, the reason for the change, and the relevant prior state.</p></div></article></section>
    </div>
  );
}

export default function EditorialWorkbench() {
  const { user, loading } = useAuth();
  if (loading) return <div className="editorial-access-loading">Checking editorial access…</div>;
  if (user && user.role !== "admin") return <EditorialAccessDenied />;
  return <DashboardLayout><EditorialWorkbenchContent /></DashboardLayout>;
}

function EditorialAccessDenied() {
  return (
    <main className="editorial-access-denied">
      <p className="eyebrow eyebrow--brass">Editorial access restricted</p>
      <h1>This workbench is reserved for Sonata editors.</h1>
      <p>The public catalogue remains available to every reader. Creating, reviewing, importing, and revising knowledge records require an administrator role.</p>
      <Link href="/" className="button-primary button-primary--light">Return to the catalogue <ArrowLeft size={16} /></Link>
    </main>
  );
}
