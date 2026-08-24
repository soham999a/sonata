import { AlertTriangle, BarChart3, CheckCircle2, DatabaseZap, FileJson2, Globe2, Link2, Send, ShieldAlert, ShieldCheck, Stethoscope } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";

type Notice = { tone: "success" | "attention"; heading: string; detail: string } | null;

export function KnowledgeEngineBoard() {
  const coverage = trpc.sonata.coverage.useQuery();
  const health = trpc.editorial.knowledgeHealth.useQuery();
  const utils = trpc.useUtils();
  const [notice, setNotice] = useState<Notice>(null);
  const [batch, setBatch] = useState({ fileName: "", sourceProvider: "", candidatesJson: "" });
  const [gates, setGates] = useState({ conceptPublicId: "", sourcePublicId: "", uncertaintyNote: "", resolutionNote: "", reviewNotes: "", confidenceScore: "80" });
  const coveragePercent = useMemo(() => {
    const published = coverage.data?.publishedConcepts ?? 0;
    const target = coverage.data?.primaryTarget ?? 15350;
    return Math.min(100, Math.round((published / target) * 1000) / 10);
  }, [coverage.data]);

  const bootstrap = trpc.editorial.bootstrapKnowledgeFramework.useMutation({
    onSuccess: data => {
      setNotice({ tone: "success", heading: "Global taxonomy initialized", detail: `${data.targets.length} coverage targets and source-aware taxonomy pathways are now persisted. This action adds frameworks only; it does not create fabricated concept records.` });
      utils.sonata.coverage.invalidate();
    },
    onError: error => setNotice({ tone: "attention", heading: "Taxonomy initialization did not complete", detail: error.message }),
  });

  const stageBatch = trpc.editorial.stageKnowledgeBatch.useMutation({
    onSuccess: data => {
      setBatch({ fileName: "", sourceProvider: "", candidatesJson: "" });
      setNotice({ tone: data.status === "approved" ? "success" : "attention", heading: data.status === "approved" ? "Batch passed staging checks" : "Batch is held for review", detail: `${data.candidateCount} candidates staged · ${data.eligibleForExpertReview} ready for expert review · ${data.duplicatesHeldForReview} duplicate risks · ${data.lowConfidence} low-confidence candidates.` });
      utils.editorial.summary.invalidate();
      utils.sonata.coverage.invalidate();
    },
    onError: error => setNotice({ tone: "attention", heading: "Batch could not be staged", detail: error.message }),
  });

  const linkSource = trpc.editorial.linkSource.useMutation({
    onSuccess: data => setNotice({ tone: "success", heading: "Evidence linked to concept", detail: `The concept is now linked to a source record and carries ${data.sourceConfidence} source confidence. It remains unpublished until the full editorial gate is satisfied.` }),
    onError: error => setNotice({ tone: "attention", heading: "Evidence link was not saved", detail: error.message }),
  });
  const recordUncertainty = trpc.editorial.recordUncertainty.useMutation({
    onSuccess: data => setNotice({ tone: "attention", heading: "Uncertainty flag recorded", detail: `${data.canonicalName} is now held in machine review until an editor records a resolution.` }),
    onError: error => setNotice({ tone: "attention", heading: "Uncertainty flag was not saved", detail: error.message }),
  });
  const resolveUncertainty = trpc.editorial.resolveUncertainty.useMutation({
    onSuccess: data => setNotice({ tone: "success", heading: "Uncertainty resolution recorded", detail: `${data.canonicalName} returned to draft status and can now be evaluated for expert review.` }),
    onError: error => setNotice({ tone: "attention", heading: "Uncertainty could not be resolved", detail: error.message }),
  });
  const approveReview = trpc.editorial.approveForExpertReview.useMutation({
    onSuccess: data => setNotice({ tone: "success", heading: "Expert review recorded", detail: `${data.canonicalName} is expert reviewed. Publication remains a separate, explicit action.` }),
    onError: error => setNotice({ tone: "attention", heading: "Expert review is blocked", detail: error.message }),
  });
  const publish = trpc.editorial.publishExpertReviewed.useMutation({
    onSuccess: data => { setNotice({ tone: "success", heading: "Concept published", detail: `${data.canonicalName} is now a public record with an explicit editorial publication event.` }); utils.sonata.browse.invalidate(); utils.sonata.coverage.invalidate(); },
    onError: error => setNotice({ tone: "attention", heading: "Publication is blocked", detail: error.message }),
  });
  const rebuildPublishedSearchIndex = trpc.editorial.rebuildPublishedSearchIndex.useMutation({
    onSuccess: data => setNotice({ tone: "success", heading: "Published search index refreshed", detail: `${data.indexed} published records were indexed with names, context, and reviewed relationship terms.` }),
    onError: error => setNotice({ tone: "attention", heading: "Search index refresh did not complete", detail: error.message }),
  });

  const submitBatch = (event: FormEvent) => {
    event.preventDefault();
    try {
      const candidates = JSON.parse(batch.candidatesJson);
      if (!Array.isArray(candidates)) throw new Error("The candidate payload must be a JSON array.");
      stageBatch.mutate({
        fileName: batch.fileName,
        fileFormat: "json",
        sourceProvider: batch.sourceProvider || undefined,
        candidates,
      });
    } catch (error) {
      setNotice({ tone: "attention", heading: "Check the JSON batch", detail: error instanceof Error ? error.message : "The candidate payload could not be parsed." });
    }
  };

  return (
    <section className="knowledge-engine" aria-labelledby="knowledge-engine-title">
      <div className="knowledge-engine__heading">
        <div>
          <p className="eyebrow">Part 2 · global knowledge engine</p>
          <h2 id="knowledge-engine-title">Coverage has a map. Publication has gates.</h2>
          <p>The coverage plan is a culturally balanced editorial target, not a claim that unreviewed terms are already in the public catalogue.</p>
        </div>
        <div className="knowledge-engine__total"><span>Primary target</span><strong>{coverage.data?.primaryTarget.toLocaleString() ?? "15,350"}</strong><small>{coveragePercent}% published coverage</small></div>
      </div>

      <div className="coverage-meter" aria-label={`${coveragePercent}% of planned primary coverage is published`}><span style={{ width: `${coveragePercent}%` }} /></div>

      <div className="coverage-grid">
        {(coverage.data?.regions ?? []).map(region => (
          <article key={region.slug} className="coverage-card">
            <p>{region.label}</p>
            <strong>{region.targetCount.toLocaleString()}</strong>
            <small>primary target</small>
          </article>
        ))}
      </div>

      <section className="knowledge-health" aria-label="Knowledge health dashboard">
        <div className="knowledge-health__heading"><div><p className="eyebrow">Part 3 · knowledge health</p><h3>See what needs research, not just what is published.</h3></div><Stethoscope size={21} strokeWidth={1.5} /></div>
        <div className="knowledge-health__metrics">
          <article><span>Regional coverage</span><strong>{health.data?.coverage?.regions ?? 0}</strong><small>represented regions</small></article>
          <article><span>Category coverage</span><strong>{health.data?.coverage?.categories ?? 0}</strong><small>represented categories</small></article>
          <article><span>Relationship health</span><strong>{health.data?.relationshipHealth.reviewed ?? 0}</strong><small>published · {health.data?.relationshipHealth.needsReview ?? 0} awaiting review</small></article>
          <article><span>Moderation queue</span><strong>{health.data?.moderation.length ?? 0}</strong><small>contributions awaiting editorial review</small></article>
        </div>
        <div className="knowledge-health__queues">
          <article><p className="eyebrow">Low confidence / unreviewed</p>{health.data?.lowConfidence.length ? <ul>{health.data.lowConfidence.slice(0, 4).map(record => <li key={record.publicId}><strong>{record.canonicalName}</strong><span>{record.sourceCount} sources · {record.sourceConfidence}</span></li>)}</ul> : <p>There are no low-confidence records in the current persisted queue.</p>}</article>
          <article><p className="eyebrow">Duplicate and relationship signals</p>{health.data?.openIssues.length ? <ul>{health.data.openIssues.slice(0, 4).map(issue => <li key={issue.publicId}><strong>{issue.issueType.replace(/_/g, " ")}</strong><span>{issue.severity} · {issue.status}</span></li>)}</ul> : <p>No unresolved duplicate, orphan, or broken-reference signals are recorded.</p>}</article>
          <article><p className="eyebrow">Community moderation</p>{health.data?.moderation.length ? <ul>{health.data.moderation.slice(0, 4).map(item => <li key={item.publicId}><strong>{item.kind.replace(/_/g, " ")}</strong><span>{item.summary}</span></li>)}</ul> : <p>No contributor submissions are awaiting moderation.</p>}</article>
        </div>
        <button type="button" className="button-quiet knowledge-health__reindex" onClick={() => rebuildPublishedSearchIndex.mutate()} disabled={rebuildPublishedSearchIndex.isPending}>{rebuildPublishedSearchIndex.isPending ? "Refreshing published index…" : "Refresh published search index"} <DatabaseZap size={15} /></button>
      </section>

      <div className="knowledge-engine__controls">
        <article className="engine-control engine-control--seed">
          <div className="engine-control__icon"><Globe2 size={20} strokeWidth={1.5} /></div>
          <div><p className="eyebrow">01 · framework</p><h3>Initialize the global taxonomy</h3><p>Persists region, tradition, domain, and era pathways plus coverage targets. It does not import or generate a term corpus.</p></div>
          <button type="button" className="button-primary" onClick={() => bootstrap.mutate()} disabled={bootstrap.isPending}>{bootstrap.isPending ? "Initializing…" : "Initialize taxonomy"} <DatabaseZap size={16} /></button>
        </article>

        <form className="engine-control engine-control--batch" onSubmit={submitBatch}>
          <div className="engine-control__icon"><FileJson2 size={20} strokeWidth={1.5} /></div>
          <div><p className="eyebrow">02 · source batch</p><h3>Stage a curated JSON batch</h3><p>Paste a small, source-backed batch of 1–500 candidates. Native descriptions, taxonomy paths, citations, and source confidence are inspected before any editorial review.</p></div>
          <div className="engine-batch-fields">
            <label>Batch file name<input value={batch.fileName} onChange={event => setBatch(current => ({ ...current, fileName: event.target.value }))} placeholder="e.g., south-asia-rhythm-b01.json" required /></label>
            <label>Source provider<input value={batch.sourceProvider} onChange={event => setBatch(current => ({ ...current, sourceProvider: event.target.value }))} placeholder="Institution, archive, or editor" /></label>
            <label className="engine-batch-fields__wide">Candidate JSON array<textarea value={batch.candidatesJson} onChange={event => setBatch(current => ({ ...current, candidatesJson: event.target.value }))} placeholder={'[{"canonicalName":"…","entityType":"term","emicDescription":"Source-backed contextual description…","taxonomySlugs":["south-asia","rhythm-cycle"],"sourceConfidence":"high","sources":[{"citation":"…"}]}]'} required /></label>
          </div>
          <div className="engine-control__footer"><span>Publication blocks: no citation, low confidence, unresolved duplicate risk, or specialist-review flag.</span><button type="submit" className="button-primary" disabled={stageBatch.isPending}>{stageBatch.isPending ? "Checking batch…" : "Stage source batch"} <ShieldCheck size={16} /></button></div>
        </form>
      </div>

      <section className="gate-console" aria-label="Evidence and publication gates">
        <div className="gate-console__heading"><div><p className="eyebrow">03 · review controls</p><h3>Make every gate visible.</h3></div><p>These actions require an administrator role and preserve a review record. No action silently publishes a concept.</p></div>
        <div className="gate-console__grid">
          <form className="gate-card" onSubmit={event => { event.preventDefault(); linkSource.mutate({ conceptPublicId: gates.conceptPublicId, sourcePublicId: gates.sourcePublicId, claimScope: "definition", confidenceScore: Number(gates.confidenceScore), editorialNote: "Linked through the Part 2 evidence gate." }); }}>
            <Link2 size={18} strokeWidth={1.5} /><div><p className="eyebrow">Evidence</p><h4>Link a source</h4><p>Attach a staged citation to a draft concept before it can advance.</p></div>
            <input value={gates.conceptPublicId} onChange={event => setGates(current => ({ ...current, conceptPublicId: event.target.value }))} placeholder="Concept UUID" required />
            <input value={gates.sourcePublicId} onChange={event => setGates(current => ({ ...current, sourcePublicId: event.target.value }))} placeholder="Source UUID" required />
            <label>Confidence<select value={gates.confidenceScore} onChange={event => setGates(current => ({ ...current, confidenceScore: event.target.value }))}><option value="60">60 · developing</option><option value="80">80 · strong</option><option value="100">100 · primary</option></select></label>
            <button type="submit" className="button-primary" disabled={linkSource.isPending}>Link evidence <Link2 size={15} /></button>
          </form>
          <form className="gate-card" onSubmit={event => { event.preventDefault(); recordUncertainty.mutate({ conceptPublicId: gates.conceptPublicId, uncertaintyNote: gates.uncertaintyNote }); }}>
            <ShieldAlert size={18} strokeWidth={1.5} /><div><p className="eyebrow">Uncertainty</p><h4>Hold and resolve</h4><p>A documented uncertainty blocks expert review until an editorial resolution is recorded.</p></div>
            <input value={gates.uncertaintyNote} onChange={event => setGates(current => ({ ...current, uncertaintyNote: event.target.value }))} placeholder="Uncertainty requiring review" required />
            <button type="submit" className="button-primary" disabled={recordUncertainty.isPending}>Record flag <ShieldAlert size={15} /></button>
            <input value={gates.resolutionNote} onChange={event => setGates(current => ({ ...current, resolutionNote: event.target.value }))} placeholder="Resolution note" required />
            <button type="button" className="button-quiet" disabled={resolveUncertainty.isPending} onClick={() => resolveUncertainty.mutate({ conceptPublicId: gates.conceptPublicId, resolutionNote: gates.resolutionNote })}>Resolve flag <CheckCircle2 size={15} /></button>
          </form>
          <form className="gate-card gate-card--publish" onSubmit={event => { event.preventDefault(); approveReview.mutate({ conceptPublicId: gates.conceptPublicId, confidenceScore: Number(gates.confidenceScore), reviewNotes: gates.reviewNotes }); }}>
            <ShieldCheck size={18} strokeWidth={1.5} /><div><p className="eyebrow">Publication</p><h4>Review, then publish</h4><p>Expert review verifies sources, description, uncertainty, and confidence before a separate publishing decision.</p></div>
            <textarea value={gates.reviewNotes} onChange={event => setGates(current => ({ ...current, reviewNotes: event.target.value }))} placeholder="Expert review notes" required />
            <button type="submit" className="button-primary" disabled={approveReview.isPending}>Record expert review <ShieldCheck size={15} /></button>
            <button type="button" className="button-quiet" disabled={publish.isPending} onClick={() => publish.mutate({ conceptPublicId: gates.conceptPublicId })}>Publish reviewed record <Send size={15} /></button>
          </form>
        </div>
      </section>

      {notice ? <div className={`engine-notice engine-notice--${notice.tone}`}>{notice.tone === "success" ? <CheckCircle2 size={18} strokeWidth={1.5} /> : <AlertTriangle size={18} strokeWidth={1.5} />}<div><strong>{notice.heading}</strong><p>{notice.detail}</p></div></div> : null}

      <div className="quality-route">
        <span><BarChart3 size={16} strokeWidth={1.5} /> Batch report records: concepts, duplicate risks, low confidence, relationships, source conflicts, regional, category, and era distribution.</span>
        <span><ShieldCheck size={16} strokeWidth={1.5} /> Specialist-review and source-confidence blockers prevent accidental publication.</span>
      </div>
    </section>
  );
}
