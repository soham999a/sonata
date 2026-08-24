import { CircleAlert, FileText, Send, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { SiteHeader } from "@/components/SiteHeader";
import { trpc } from "@/lib/trpc";

export default function Contribute() {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({ kind: "source" as const, summary: "", detail: "", sourceUrl: "", targetSlug: "" });
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const submit = trpc.research.submitContribution.useMutation({
    onSuccess: result => { setConfirmation(`${result.moderationNotice} Submission reference: ${result.publicId}.`); setForm({ kind: "source", summary: "", detail: "", sourceUrl: "", targetSlug: "" }); },
  });
  const handleSubmit = (event: FormEvent) => { event.preventDefault(); submit.mutate({ ...form, sourceUrl: form.sourceUrl || undefined, targetSlug: form.targetSlug || undefined }); };
  return <div className="research-page"><SiteHeader /><main className="contribute-shell">
    <header className="contribute-hero"><p className="eyebrow">Contribute to Sonata</p><h1>Offer evidence. Keep the editorial gate.</h1><p>Sonata welcomes corrections, source leads, new terms, relationships, and contextual suggestions. Every submission stays in moderation until a curator verifies it; nothing here changes a public concept automatically.</p></header>
    {!isAuthenticated ? <section className="contribute-gate"><CircleAlert size={20} /><div><strong>Sign in to submit a research contribution.</strong><p>Searching and reading remain public. Sign-in establishes an accountable submission record for editorial review.</p></div><button type="button" onClick={startLogin}>Sign in to contribute</button></section> : <form className="contribute-form" onSubmit={handleSubmit}>
      <div className="contribute-form__heading"><div><FileText size={19} /><p className="eyebrow">Moderated contribution</p><h2>Prepare a reviewable note.</h2></div><ShieldCheck size={21} /></div>
      <label>Contribution type<select value={form.kind} onChange={event => setForm(current => ({ ...current, kind: event.target.value as typeof form.kind }))}><option value="source">Source lead</option><option value="edit">Correction or expansion</option><option value="new_term">New term proposal</option><option value="relationship">Relationship note</option><option value="error">Report an error</option></select></label>
      <label>Concise summary<input value={form.summary} onChange={event => setForm(current => ({ ...current, summary: event.target.value }))} placeholder="e.g., Add a source for this definition" minLength={5} maxLength={512} required /></label>
      <label>Related foundation record (optional)<select value={form.targetSlug} onChange={event => setForm(current => ({ ...current, targetSlug: event.target.value }))}><option value="">No existing record selected</option><option value="raga">Rāga</option><option value="maqam">Maqām</option><option value="fugue">Fugue</option><option value="polyrhythm">Polyrhythm</option></select></label>
      <label className="contribute-form__wide">Evidence or editorial context<textarea value={form.detail} onChange={event => setForm(current => ({ ...current, detail: event.target.value }))} placeholder="Describe the claim, context, provenance, or requested correction. Please distinguish a source-supported observation from a possible comparison." minLength={20} maxLength={12000} required /></label>
      <label className="contribute-form__wide">Source URL (optional, but encouraged)<input type="url" value={form.sourceUrl} onChange={event => setForm(current => ({ ...current, sourceUrl: event.target.value }))} placeholder="https://…" /></label>
      <div className="contribute-form__footer"><p><CircleAlert size={15} /> All submissions enter a private moderation queue. Editors may request more context; a contribution never publishes itself.</p><button type="submit" disabled={submit.isPending}>{submit.isPending ? "Sending…" : "Submit for review"} <Send size={15} /></button></div>
      {confirmation ? <p className="contribute-confirmation">{confirmation}</p> : null}{submit.error ? <p className="contribute-error">{submit.error.message}</p> : null}
    </form>}
    <Link href="/search" className="contribute-return">Return to research search</Link>
  </main></div>;
}
