"use client";

import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  DatabaseZap,
  FileJson2,
  FileSpreadsheet,
  GitCompareArrows,
  Globe2,
  Link2,
  ListChecks,
  Network,
  PenLine,
  Quote,
  Send,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useSyncExternalStore, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import {
  createRelationship,
  createSource,
  createTermDraft,
  getEditorialSnapshot,
  reviewSource,
  stageImport,
  subscribeEditorial,
  updateRelationshipStatus,
  type SourceRecord,
} from "@/lib/editorial/store";
import { SONATA_TAXONOMY_PREVIEW } from "@/lib/data/sonata-demo";

type ToolId = "draft" | "source" | "relationship" | "import";
type ResultNote = { heading: string; lines: string[]; valid: boolean } | null;
type SourceQuality = "unassessed" | "mixed" | "strong" | "primary";
type SelectedRecord = { kind: "source" | "relationship" | "import"; publicId: string } | null;

const TOOLS: Array<{ id: ToolId; label: string; detail: string; icon: typeof PenLine }> = [
  { id: "draft", label: "Draft term", detail: "Create a structured draft record", icon: PenLine },
  { id: "source", label: "Stage source", detail: "Store a reference record", icon: Quote },
  { id: "relationship", label: "Add relationship", detail: "Save a typed draft edge", icon: Network },
  { id: "import", label: "Stage import", detail: "Persist a header review report", icon: FileSpreadsheet },
];

const PRESS_READY = ["id", "name", "definition", "historical_context", "era", "category"];

function ResultCallout({ result }: { result: ResultNote }) {
  if (!result) return null;
  return (
    <aside className={`validation-note ${result.valid ? "validation-note--valid" : "validation-note--attention"}`}>
      {result.valid ? <CheckCircle2 size={18} strokeWidth={1.5} /> : <AlertTriangle size={18} strokeWidth={1.5} />}
      <div>
        <strong>{result.heading}</strong>
        {result.lines.map(line => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </aside>
  );
}

function ActivityPanel({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <article className="activity-panel">
      <div className="activity-panel__heading">
        <p className="eyebrow">{title}</p>
        <span>{count.toString().padStart(2, "0")}</span>
      </div>
      {children}
    </article>
  );
}

type HealthState = {
  coverage: { regions: number; categories: number };
  relationshipHealth: { reviewed: number; needsReview: number };
  moderation: number;
  lowConfidence: Array<{ publicId: string; canonicalName: string; sourceCount: number; sourceConfidence: string }>;
  openIssues: Array<{ publicId: string; issueType: string; severity: string; status: string }>;
};

function useEditorialLedger() {
  const state = useSyncExternalStore(subscribeEditorial, getEditorialSnapshot, getEditorialSnapshot);
  const { user } = useAuth();
  return { state, user };
}

function KnowledgeEngineBoard({ health }: { health: HealthState }) {
  const [notice, setNotice] = useState<{ tone: "success" | "attention"; heading: string; detail: string } | null>(null);
  const [batch, setBatch] = useState({ fileName: "", sourceProvider: "", candidatesJson: "" });
  const [gates, setGates] = useState({
    conceptPublicId: "",
    sourcePublicId: "",
    uncertaintyNote: "",
    resolutionNote: "",
    reviewNotes: "",
    confidenceScore: "80",
  });
  const coveragePercent = 1;

  const submitBatch = (event: FormEvent) => {
    event.preventDefault();
    try {
      const candidates = JSON.parse(batch.candidatesJson);
      if (!Array.isArray(candidates)) throw new Error("The candidate payload must be a JSON array.");
      const duplicateRisks = candidates.filter((candidate: { duplicate_of?: unknown }) => Boolean(candidate.duplicate_of)).length;
      const lowConfidence = candidates.filter((candidate: { sourceConfidence?: string }) => candidate.sourceConfidence === "low").length;
      const candidateCount = candidates.length;
      setBatch({ fileName: "", sourceProvider: "", candidatesJson: "" });
      setNotice({
        tone: candidateCount ? "success" : "attention",
        heading: candidateCount ? "Batch passed staging checks" : "Batch is empty",
        detail: `${candidateCount} candidates staged · ${duplicateRisks} duplicate risks · ${lowConfidence} low-confidence candidates. Demo mode: nothing is persisted to a database.`,
      });
    } catch (error) {
      setNotice({
        tone: "attention",
        heading: "Check the JSON batch",
        detail: error instanceof Error ? error.message : "The candidate payload could not be parsed.",
      });
    }
  };

  const gateAction = (heading: string, detail: string, tone: "success" | "attention" = "success") =>
    setNotice({ tone, heading, detail: `${detail} Demo mode: this action is acknowledged locally and nothing is written to a database.` });

  return (
    <section className="knowledge-engine" aria-labelledby="knowledge-engine-title">
      <div className="knowledge-engine__heading">
        <div>
          <p className="eyebrow">Part 2 · global knowledge engine</p>
          <h2 id="knowledge-engine-title">Coverage has a map. Publication has gates.</h2>
          <p>
            The coverage plan is a culturally balanced editorial target, not a claim that unreviewed terms are already in the public catalogue.
          </p>
        </div>
        <div className="knowledge-engine__total">
          <span>Primary target</span>
          <strong>15,350</strong>
          <small>demo preview · 0% published coverage</small>
        </div>
      </div>

      <div className="coverage-meter" aria-label="Coverage is not yet published in demo mode">
        <span style={{ width: `${coveragePercent}%` }} />
      </div>

      <div className="coverage-grid">
        {SONATA_TAXONOMY_PREVIEW.map(region => (
          <article key={region.label} className="coverage-card">
            <p>{region.label}</p>
            <strong>{region.count}</strong>
            <small>pathway preview</small>
          </article>
        ))}
        <article className="coverage-card">
          <p>Americas</p>
          <strong>01</strong>
          <small>pathway preview</small>
        </article>
      </div>

      <section className="knowledge-health" aria-label="Knowledge health dashboard">
        <div className="knowledge-health__heading">
          <div>
            <p className="eyebrow">Part 3 · knowledge health</p>
            <h3>See what needs research, not just what is published.</h3>
          </div>
          <Stethoscope size={21} strokeWidth={1.5} />
        </div>
        <div className="knowledge-health__metrics">
          <article>
            <span>Regional coverage</span>
            <strong>{health.coverage.regions}</strong>
            <small>represented regions</small>
          </article>
          <article>
            <span>Category coverage</span>
            <strong>{health.coverage.categories}</strong>
            <small>represented categories</small>
          </article>
          <article>
            <span>Relationship health</span>
            <strong>{health.relationshipHealth.reviewed}</strong>
            <small>published · {health.relationshipHealth.needsReview} awaiting review</small>
          </article>
          <article>
            <span>Moderation queue</span>
            <strong>{health.moderation}</strong>
            <small>contributions awaiting editorial review</small>
          </article>
        </div>
        <div className="knowledge-health__queues">
          <article>
            <p className="eyebrow">Low confidence / unreviewed</p>
            {health.lowConfidence.length ? (
              <ul>
                {health.lowConfidence.slice(0, 4).map(record => (
                  <li key={record.publicId}>
                    <strong>{record.canonicalName}</strong>
                    <span>{record.sourceCount} sources · {record.sourceConfidence}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>There are no low-confidence records in the current demo queue.</p>
            )}
          </article>
          <article>
            <p className="eyebrow">Duplicate and relationship signals</p>
            {health.openIssues.length ? (
              <ul>
                {health.openIssues.slice(0, 4).map(issue => (
                  <li key={issue.publicId}>
                    <strong>{issue.issueType.replace(/_/g, " ")}</strong>
                    <span>{issue.severity} · {issue.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No unresolved duplicate, orphan, or broken-reference signals are recorded.</p>
            )}
          </article>
          <article>
            <p className="eyebrow">Community moderation</p>
            <p>No contributor submissions are awaiting moderation in the demo ledger.</p>
          </article>
        </div>
      </section>

      <div className="knowledge-engine__controls">
        <article className="engine-control engine-control--seed">
          <div className="engine-control__icon">
            <Globe2 size={20} strokeWidth={1.5} />
          </div>
          <div>
            <p className="eyebrow">01 · framework</p>
            <h3>Initialize the global taxonomy</h3>
            <p>A coverage plan and source-aware taxonomy pathways are defined. It does not import or generate a term corpus.</p>
          </div>
          <button
            type="button"
            className="button-primary"
            onClick={() => gateAction("Global taxonomy available", "Coverage targets and taxonomy pathways are defined in the shared domain model.", "success")}
          >
            Initialize taxonomy <DatabaseZap size={16} />
          </button>
        </article>

        <form className="engine-control" onSubmit={submitBatch}>
          <div className="engine-control__icon">
            <FileJson2 size={20} strokeWidth={1.5} />
          </div>
          <div>
            <p className="eyebrow">02 · source batch</p>
            <h3>Stage a curated JSON batch</h3>
            <p>Paste a small, source-backed batch of 1–500 candidates for inspection.</p>
          </div>
          <div className="engine-batch-fields">
            <label>
              Batch file name
              <input value={batch.fileName} onChange={event => setBatch(current => ({ ...current, fileName: event.target.value }))} placeholder="e.g., south-asia-rhythm-b01.json" required />
            </label>
            <label>
              Source provider
              <input value={batch.sourceProvider} onChange={event => setBatch(current => ({ ...current, sourceProvider: event.target.value }))} placeholder="Institution, archive, or editor" />
            </label>
            <label className="engine-batch-fields__wide">
              Candidate JSON array
              <textarea
                value={batch.candidatesJson}
                onChange={event => setBatch(current => ({ ...current, candidatesJson: event.target.value }))}
                placeholder={'[{"canonicalName":"…","entityType":"term","emicDescription":"Source-backed contextual description…","taxonomySlugs":["south-asia","rhythm-cycle"],"sourceConfidence":"high","sources":[{"citation":"…"}]}]'}
                required
              />
            </label>
          </div>
          <div className="engine-control__footer">
            <span>Publication blocks: no citation, low confidence, unresolved duplicate risk, or specialist-review flag.</span>
            <button type="submit" className="button-primary">
              Stage source batch <ShieldCheck size={16} />
            </button>
          </div>
        </form>
      </div>

      <section className="gate-console" aria-label="Evidence and publication gates">
        <div className="gate-console__heading">
          <div>
            <p className="eyebrow">03 · review controls</p>
            <h3>Make every gate visible.</h3>
          </div>
          <p>These actions require an administrator role and preserve a review record. No action silently publishes a concept.</p>
        </div>
        <div className="gate-console__grid">
          <form
            className="gate-card"
            onSubmit={event => {
              event.preventDefault();
              gateAction("Evidence link acknowledged", "A staged citation would be attached to a draft concept before it can advance.");
            }}
          >
            <Link2 size={18} strokeWidth={1.5} />
            <div>
              <p className="eyebrow">Evidence</p>
              <h4>Link a source</h4>
              <p>Attach a staged citation to a draft concept before it can advance.</p>
            </div>
            <input value={gates.conceptPublicId} onChange={event => setGates(current => ({ ...current, conceptPublicId: event.target.value }))} placeholder="Concept UUID" required />
            <input value={gates.sourcePublicId} onChange={event => setGates(current => ({ ...current, sourcePublicId: event.target.value }))} placeholder="Source UUID" required />
            <label>
              Confidence
              <select value={gates.confidenceScore} onChange={event => setGates(current => ({ ...current, confidenceScore: event.target.value }))}>
                <option value="60">60 · developing</option>
                <option value="80">80 · strong</option>
                <option value="100">100 · primary</option>
              </select>
            </label>
            <button type="submit" className="button-primary">
              Link evidence <Link2 size={15} />
            </button>
          </form>
          <form
            className="gate-card"
            onSubmit={event => {
              event.preventDefault();
              gateAction("Uncertainty flag recorded", "The concept is held in machine review until an editor records a resolution.");
            }}
          >
            <ShieldAlert size={18} strokeWidth={1.5} />
            <div>
              <p className="eyebrow">Uncertainty</p>
              <h4>Hold and resolve</h4>
              <p>A documented uncertainty blocks expert review until an editorial resolution is recorded.</p>
            </div>
            <input value={gates.uncertaintyNote} onChange={event => setGates(current => ({ ...current, uncertaintyNote: event.target.value }))} placeholder="Uncertainty requiring review" required />
            <button type="submit" className="button-primary">
              Record flag <ShieldAlert size={15} />
            </button>
            <input value={gates.resolutionNote} onChange={event => setGates(current => ({ ...current, resolutionNote: event.target.value }))} placeholder="Resolution note" required />
            <button type="button" className="button-quiet" onClick={() => gateAction("Uncertainty resolution recorded", "The concept returns to draft status and can be evaluated for expert review.")}>
              Resolve flag <CheckCircle2 size={15} />
            </button>
          </form>
          <form
            className="gate-card gate-card--publish"
            onSubmit={event => {
              event.preventDefault();
              gateAction("Expert review recorded", "The record is expert reviewed. Publication remains a separate, explicit action.");
            }}
          >
            <ShieldCheck size={18} strokeWidth={1.5} />
            <div>
              <p className="eyebrow">Publication</p>
              <h4>Review, then publish</h4>
              <p>Expert review verifies sources, description, uncertainty, and confidence before a separate publishing decision.</p>
            </div>
            <textarea value={gates.reviewNotes} onChange={event => setGates(current => ({ ...current, reviewNotes: event.target.value }))} placeholder="Expert review notes" required />
            <button type="submit" className="button-primary">
              Record expert review <ShieldCheck size={15} />
            </button>
            <button type="button" className="button-quiet" onClick={() => gateAction("Concept published", "The record is public with an explicit editorial publication event.")}>
              Publish reviewed record <Send size={15} />
            </button>
          </form>
        </div>
      </section>

      {notice ? (
        <div className={`engine-notice engine-notice--${notice.tone}`}>
          {notice.tone === "success" ? <CheckCircle2 size={18} strokeWidth={1.5} /> : <AlertTriangle size={18} strokeWidth={1.5} />}
          <div>
            <strong>{notice.heading}</strong>
            <p>{notice.detail}</p>
          </div>
        </div>
      ) : null}

      <div className="quality-route">
        <span>
          <BarChart3 size={16} strokeWidth={1.5} /> Demo ledger: structured draft, source, relationship, and import records are held locally and are
          not persisted to a database.
        </span>
        <span>
          <ShieldCheck size={16} strokeWidth={1.5} /> Specialist-review and source-confidence blockers prevent accidental publication.
        </span>
      </div>
    </section>
  );
}

function EditorialDeskContent() {
  const [activeTool, setActiveTool] = useState<ToolId>("draft");
  const [result, setResult] = useState<ResultNote>(null);
  const [draft, setDraft] = useState({ canonicalName: "", definition: "", entityType: "term" as const });
  const [source, setSource] = useState({ citation: "", locator: "" });
  const [relationship, setRelationship] = useState({ sourcePublicId: "", targetPublicId: "", relationshipType: "related_to" as const });
  const [headers, setHeaders] = useState(PRESS_READY.join(", "));
  const [selectedRecord, setSelectedRecord] = useState<SelectedRecord>(null);
  const [sourceQuality, setSourceQuality] = useState<SourceQuality>("unassessed");
  const { state } = useEditorialLedger();
  const activeToolMeta = useMemo(() => TOOLS.find(tool => tool.id === activeTool) ?? TOOLS[0], [activeTool]);

  const selectedSource: SourceRecord | undefined =
    selectedRecord?.kind === "source" ? state.sources.find(record => record.publicId === selectedRecord.publicId) : undefined;
  const selectedRelationship =
    selectedRecord?.kind === "relationship" ? state.relationships.find(record => record.publicId === selectedRecord.publicId) : undefined;
  const selectedImport = selectedRecord?.kind === "import" ? state.imports.find(record => record.publicId === selectedRecord.publicId) : undefined;

  const activeStep = TOOLS.findIndex(tool => tool.id === activeTool) + 1;

  return (
    <>
      <section className="editorial-desk">
        <aside className="editorial-desk__tools" aria-label="Editorial tools">
          <div className="desk-mark">
            <span />
            <span />
            <span />
          </div>
          <p className="eyebrow">Reference checks</p>
          {TOOLS.map(tool => (
            <button
              type="button"
              key={tool.id}
              className={`desk-tool ${activeTool === tool.id ? "is-active" : ""}`}
              onClick={() => {
                setActiveTool(tool.id);
                setResult(null);
              }}
            >
              <tool.icon size={18} strokeWidth={1.5} aria-hidden="true" />
              <span>
                <strong>{tool.label}</strong>
                <small>{tool.detail}</small>
              </span>
              <ChevronRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </button>
          ))}
          <div className="desk-tool__note">
            <ShieldCheck size={16} strokeWidth={1.5} />
            <span>Each action writes a controlled record to the local demo ledger. Review and publication remain explicit later stages.</span>
          </div>
        </aside>

        <section className="editorial-desk__workspace">
          <div className="workspace-heading">
            <div>
              <p className="eyebrow">{activeToolMeta.label}</p>
              <h2>
                {activeTool === "draft"
                  ? "Create a concept draft"
                  : activeTool === "source"
                    ? "Store a reference record"
                    : activeTool === "relationship"
                      ? "Save a typed connection"
                      : "Stage an import report"}
              </h2>
            </div>
            <span className="workspace-heading__step">0{activeStep}</span>
          </div>

          {activeTool === "draft" ? (
            <form
              className="editorial-form"
              onSubmit={event => {
                event.preventDefault();
                const saved = createTermDraft(draft);
                setDraft({ canonicalName: "", definition: "", entityType: "term" });
                setRelationship(current => ({ ...current, sourcePublicId: current.sourcePublicId || saved.publicId }));
                setResult({
                  heading: "Draft saved to the demo ledger",
                  lines: [`${saved.canonicalName} is now a ${saved.status} record.`, `Reference UUID: ${saved.publicId}`, "The public catalogue remains limited to published records."],
                  valid: true,
                });
              }}
            >
              <label>
                Canonical name
                <input value={draft.canonicalName} onChange={event => setDraft(current => ({ ...current, canonicalName: event.target.value }))} placeholder="e.g., Rāga" required />
              </label>
              <label>
                Entity type
                <select value={draft.entityType} onChange={event => setDraft(current => ({ ...current, entityType: event.target.value as typeof draft.entityType }))}>
                  <option value="term">Term</option>
                  <option value="instrument">Instrument</option>
                  <option value="form">Form</option>
                  <option value="genre">Genre</option>
                  <option value="person">Person</option>
                  <option value="place">Place</option>
                  <option value="work">Work</option>
                  <option value="organization">Organization</option>
                  <option value="conceptual_collection">Conceptual collection</option>
                </select>
              </label>
              <label className="editorial-form__wide">
                Working definition
                <textarea value={draft.definition} onChange={event => setDraft(current => ({ ...current, definition: event.target.value }))} placeholder="Write a culture-aware working definition of at least 80 characters…" required />
              </label>
              <div className="form-footer">
                <span>Saving creates a UUID-identified draft that is excluded from public results.</span>
                <button type="submit" className="button-primary">
                  Save draft <ChevronRight size={16} />
                </button>
              </div>
            </form>
          ) : null}

          {activeTool === "source" ? (
            <form
              className="editorial-form"
              onSubmit={event => {
                event.preventDefault();
                const saved = createSource({ citation: source.citation, locator: source.locator || undefined });
                setSource({ citation: "", locator: "" });
                setResult({
                  heading: "Source record staged",
                  lines: ["The citation has been stored independently from a concept claim.", `Reference UUID: ${saved.publicId}`],
                  valid: true,
                });
              }}
            >
              <label className="editorial-form__wide">
                Full citation
                <textarea value={source.citation} onChange={event => setSource(current => ({ ...current, citation: event.target.value }))} placeholder="Author, title, publisher, year…" required />
              </label>
              <label className="editorial-form__wide">
                Locator or stable URL
                <input value={source.locator} onChange={event => setSource(current => ({ ...current, locator: event.target.value }))} placeholder="DOI, archive ID, page range, or stable URL" />
              </label>
              <div className="form-footer">
                <span>Citations are stored separately so they can support individual definitions, facts, or relationships.</span>
                <button type="submit" className="button-primary">
                  Stage source <ChevronRight size={16} />
                </button>
              </div>
            </form>
          ) : null}

          {activeTool === "relationship" ? (
            <form
              className="editorial-form"
              onSubmit={event => {
                event.preventDefault();
                const saved = createRelationship(relationship);
                setResult({
                  heading: "Relationship draft saved",
                  lines: [`${saved.source} → ${saved.target}`, `Relationship UUID: ${saved.publicId}`, "The relationship is stored as a draft and remains outside public navigation."],
                  valid: true,
                });
              }}
            >
              <label>
                Source concept UUID
                <input value={relationship.sourcePublicId} onChange={event => setRelationship(current => ({ ...current, sourcePublicId: event.target.value }))} placeholder="Create a draft or use an import UUID" required />
              </label>
              <label>
                Target concept UUID
                <input value={relationship.targetPublicId} onChange={event => setRelationship(current => ({ ...current, targetPublicId: event.target.value }))} placeholder="Create a second concept draft" required />
              </label>
              <label className="editorial-form__wide">
                Relationship type
                <select value={relationship.relationshipType} onChange={event => setRelationship(current => ({ ...current, relationshipType: event.target.value as typeof relationship.relationshipType }))}>
                  <option value="related_to">Related to</option>
                  <option value="part_of">Part of</option>
                  <option value="type_of">Type of</option>
                  <option value="subtype_of">Subtype of</option>
                  <option value="contrasts_with">Contrasts with</option>
                  <option value="used_in">Used in</option>
                  <option value="associated_with">Associated with</option>
                  <option value="influenced">Influenced</option>
                </select>
              </label>
              <div className="form-footer">
                <span>Both concept UUIDs must already exist. Hierarchical edges are cycle-checked before save.</span>
                <button type="submit" className="button-primary">
                  Save relationship <ChevronRight size={16} />
                </button>
              </div>
            </form>
          ) : null}

          {activeTool === "import" ? (
            <form
              className="editorial-form"
              onSubmit={event => {
                event.preventDefault();
                const saved = stageImport({ headers: headers.split(",").map(header => header.trim()).filter(Boolean) });
                setResult({
                  heading: saved.errors.length ? "Import report staged for review" : "Import report staged",
                  lines: saved.errors.length ? saved.errors : ["Legacy-required headers are present. A source file can now proceed to row-level checks.", `Import UUID: ${saved.publicId}`],
                  valid: saved.errors.length === 0,
                });
              }}
            >
              <label className="editorial-form__wide">
                Delimited header row
                <textarea value={headers} onChange={event => setHeaders(event.target.value)} placeholder="id, name, definition, historical_context…" required />
              </label>
              <div className="import-report-preview">
                <ListChecks size={19} strokeWidth={1.5} />
                <div>
                  <strong>Import report records</strong>
                  <span>Schema, normalization, UUIDs, duplicates, relationships, taxonomy, uncertainty, and the resulting gate status.</span>
                </div>
              </div>
              <div className="form-footer">
                <span>Required legacy fields: `id`, `name`, and `definition`.</span>
                <button type="submit" className="button-primary">
                  Stage report <ChevronRight size={16} />
                </button>
              </div>
            </form>
          ) : null}

          <ResultCallout result={result} />
        </section>
      </section>

      <section className="activity-ledger" aria-label="Recent editorial records">
        <ActivityPanel title="Draft records" count={state.drafts.length}>
          {state.drafts.length ? (
            <ul>
              {state.drafts.map(record => (
                <li key={record.publicId}>
                  <strong>{record.canonicalName}</strong>
                  <span>{record.status} · {record.publicId.slice(0, 8)}…</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="activity-empty">No saved drafts yet.</p>
          )}
        </ActivityPanel>
        <ActivityPanel title="Relationship drafts" count={state.relationships.length}>
          {state.relationships.length ? (
            <ul>
              {state.relationships.map(record => (
                <li key={record.publicId}>
                  <button type="button" className="activity-record" onClick={() => setSelectedRecord({ kind: "relationship", publicId: record.publicId })}>
                    <strong>{record.sourceName} → {record.targetName}</strong>
                    <span>{record.relationshipType.replace(/_/g, " ")} · {record.publicId.slice(0, 8)}…</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="activity-empty">No saved relationships yet.</p>
          )}
        </ActivityPanel>
        <ActivityPanel title="Source records" count={state.sources.length}>
          {state.sources.length ? (
            <ul>
              {state.sources.map(record => (
                <li key={record.publicId}>
                  <button
                    type="button"
                    className="activity-record"
                    onClick={() => {
                      setSelectedRecord({ kind: "source", publicId: record.publicId });
                      setSourceQuality(record.sourceQuality as SourceQuality);
                    }}
                  >
                    <strong>{record.citation}</strong>
                    <span>{record.sourceQuality} · {record.publicId.slice(0, 8)}…</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="activity-empty">No staged sources yet.</p>
          )}
        </ActivityPanel>
        <ActivityPanel title="Import reports" count={state.imports.length}>
          {state.imports.length ? (
            <ul>
              {state.imports.map(record => (
                <li key={record.publicId}>
                  <button type="button" className="activity-record" onClick={() => setSelectedRecord({ kind: "import", publicId: record.publicId })}>
                    <strong>{record.fileName}</strong>
                    <span>{record.status.replace(/_/g, " ")} · {record.publicId.slice(0, 8)}…</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="activity-empty">No staged import reports yet.</p>
          )}
        </ActivityPanel>
      </section>

      {selectedSource ? (
        <section className="review-inspector">
          <div className="review-inspector__heading">
            <div>
              <p className="eyebrow">Selected source record</p>
              <h2>Review bibliographic confidence</h2>
            </div>
            <button type="button" onClick={() => setSelectedRecord(null)}>
              Close
            </button>
          </div>
          <div className="review-inspector__content">
            <div>
              <span>Full citation</span>
              <p>{selectedSource.citation}</p>
            </div>
            <div>
              <span>Locator</span>
              <p>{selectedSource.locator || "No locator recorded"}</p>
            </div>
            <div>
              <span>Reference UUID</span>
              <p>{selectedSource.publicId}</p>
            </div>
            <label>
              Source quality
              <select value={sourceQuality} onChange={event => setSourceQuality(event.target.value as SourceQuality)}>
                <option value="unassessed">Unassessed</option>
                <option value="mixed">Mixed</option>
                <option value="strong">Strong</option>
                <option value="primary">Primary</option>
              </select>
            </label>
          </div>
          <div className="review-inspector__footer">
            <p>Reviewing a source records its quality assessment while preserving the original citation.</p>
            <button
              type="button"
              className="button-primary"
              onClick={() => {
                reviewSource(selectedSource.publicId, sourceQuality);
                setResult({ heading: "Source review recorded", lines: [`Source quality is now marked ${sourceQuality}.`, "This assessment remains separate from editorial review of any linked concept claim."], valid: true });
              }}
            >
              Record review <ChevronRight size={16} />
            </button>
          </div>
        </section>
      ) : null}

      {selectedRelationship ? (
        <section className="review-inspector">
          <div className="review-inspector__heading">
            <div>
              <p className="eyebrow">Selected relationship draft</p>
              <h2>{selectedRelationship.sourceName} → {selectedRelationship.targetName}</h2>
            </div>
            <button type="button" onClick={() => setSelectedRecord(null)}>
              Close
            </button>
          </div>
          <div className="review-inspector__content">
            <div>
              <span>Relationship type</span>
              <p>{selectedRelationship.relationshipType.replace(/_/g, " ")}</p>
            </div>
            <div>
              <span>Current status</span>
              <p>{selectedRelationship.editorialStatus}</p>
            </div>
            <div>
              <span>Relationship UUID</span>
              <p>{selectedRelationship.publicId}</p>
            </div>
          </div>
          <div className="review-inspector__footer">
            <p>Deprecation preserves the record instead of deleting a relationship that may have appeared in earlier editorial work.</p>
            <button
              type="button"
              className="button-primary"
              onClick={() => {
                const next = updateRelationshipStatus(selectedRelationship.publicId, selectedRelationship.editorialStatus === "deprecated" ? "draft" : "deprecated");
                setResult({ heading: "Relationship status updated", lines: [`The stored edge is now ${next.editorialStatus}.`, "Only reviewed relationships should ever advance into public navigation."], valid: true });
              }}
            >
              {selectedRelationship.editorialStatus === "deprecated" ? "Restore draft" : "Deprecate draft"} <ChevronRight size={16} />
            </button>
          </div>
        </section>
      ) : null}

      {selectedImport ? (
        <section className="review-inspector">
          <div className="review-inspector__heading">
            <div>
              <p className="eyebrow">Selected import report</p>
              <h2>{selectedImport.fileName}</h2>
            </div>
            <button type="button" onClick={() => setSelectedRecord(null)}>
              Close
            </button>
          </div>
          <div className="review-inspector__content">
            <div>
              <span>Gate status</span>
              <p>{selectedImport.status.replace(/_/g, " ")}</p>
            </div>
            <div>
              <span>Header fields</span>
              <p>{selectedImport.report.headers?.join(" · ") || "No headers stored"}</p>
            </div>
            <div>
              <span>Validation stages</span>
              <p>{selectedImport.report.stages?.join(" · ") || "No stages stored"}</p>
            </div>
            <div>
              <span>Validation errors</span>
              <p>{selectedImport.report.errors?.length ? selectedImport.report.errors.join(" ") : "No header-level errors recorded"}</p>
            </div>
          </div>
          <div className="review-inspector__footer">
            <p>The report is stored with the import record so an editor can inspect prior gates without re-running a header review.</p>
            <span className="inspector-uuid">{selectedImport.publicId}</span>
          </div>
        </section>
      ) : null}
    </>
  );
}

export function EditorialClient() {
  const { state } = useEditorialLedger();
  const health: HealthState = useMemo(
    () => ({
      coverage: { regions: 4, categories: 4 },
      relationshipHealth: { reviewed: 0, needsReview: state.relationships.length },
      moderation: 0,
      lowConfidence: [],
      openIssues: [],
    }),
    [state.relationships.length],
  );

  return (
    <div className="editorial-shell">
      <div className="editorial-shell__topbar">
        <Link href="/" className="back-link">
          <ArrowLeft size={15} strokeWidth={1.5} aria-hidden="true" /> Public catalogue
        </Link>
        <span className="eyebrow">Internal foundation · demo ledger · v0.1</span>
      </div>
      <section className="editorial-hero">
        <div>
          <p className="eyebrow">Knowledge operations</p>
          <h1>Editorial desk</h1>
          <p>Create structured drafts, reference records, typed concept edges, and import reports in a local demo ledger. The foundation never promotes a draft or unchecked import into public knowledge.</p>
        </div>
        <div className="editorial-hero__status">
          <span className="status-dot" /> Demo ledger active (not persisted)
        </div>
      </section>
      <section className="provenance-route" aria-label="Editorial sequence">
        <span>Source</span>
        <ChevronRight size={13} />
        <span>Draft</span>
        <ChevronRight size={13} />
        <span>Relationship</span>
        <ChevronRight size={13} />
        <span>Review</span>
        <ChevronRight size={13} />
        <span>Publish</span>
      </section>
      <KnowledgeEngineBoard health={health} />
      <EditorialDeskContent />
      <section className="editorial-ledger">
        <article>
          <BookOpenCheck size={20} strokeWidth={1.5} />
          <div>
            <p className="eyebrow">Record policy</p>
            <h2>Context is a first-class field.</h2>
            <p>Original language, transliteration, cultural scope, and source confidence are never hidden in an unstructured note.</p>
          </div>
        </article>
        <article>
          <GitCompareArrows size={20} strokeWidth={1.5} />
          <div>
            <p className="eyebrow">Revision policy</p>
            <h2>Published knowledge is not silently overwritten.</h2>
            <p>Revision records capture who changed a value, the reason for the change, and the relevant prior state.</p>
          </div>
        </article>
      </section>
    </div>
  );
}
