"use client";

import { BookOpenText, CircleAlert, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useAuth } from "@/components/AuthProvider";
import { decideAssistantEvidence } from "@/lib/domain/sonata-guardrails";
import { getPublicEntry_Client } from "@/lib/data/client-search";
import { DEMONSTRATION_DETAILS, DEMONSTRATION_ENTRIES } from "@/lib/data/sonata-demo";

type Message = { role: "user" | "assistant"; content: string };
type Citation = { concept: string; label: string; citation: string; url: string };

const PROMPTS = [
  "How is raga different from a Western scale?",
  "What does Sonata say about maqam?",
  "Compare fugue and polyrhythm without implying equivalence.",
];

function retrieveEvidence(question: string) {
  const matches = getPublicEntry_Client(DEMONSTRATION_ENTRIES, question);
  const slugs = matches.length ? matches.map(entry => entry.slug) : ["raga", "maqam", "fugue", "polyrhythm"];
  return slugs
    .map(slug => DEMONSTRATION_DETAILS[slug])
    .filter((record): record is NonNullable<typeof record> => Boolean(record));
}

function composeAnswer(question: string, evidence: ReturnType<typeof retrieveEvidence>, citations: Citation[]) {
  if (decideAssistantEvidence(evidence.length, citations.length) === "insufficient_evidence") {
    return "Sonata does not yet have enough published, source-linked evidence to answer that responsibly. Try a published concept record or consult its linked source trail.";
  }
  const lines = evidence.map(record => {
    const related = (record.related ?? []).length
      ? ` Related records: ${record.related.map(link => `${link.name} (${link.relationshipType.replace(/_/g, " ")})`).join(", ")}.`
      : "";
    const usage = record.practicalUsage ?? "";
    return `${record.name} — ${record.definition}${usage ? ` ${usage}` : ""}${related}`;
  });
  return [
    `Sonata answers from its published, source-linked records only. On “${question}”, the retrieved catalogue says:`,
    ...lines,
    "These statements are drawn from each record’s linked source trail and do not claim cross-cultural equivalence. For fuller context, open the cited concept records below.",
  ].join("\n\n");
}

export default function AssistantPage() {
  const { user, loading } = useAuth();
  const isAuthenticated = Boolean(user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [citations, setCitations] = useState<Citation[]>([]);
  const [pending, setPending] = useState(false);

  const send = (content: string) => {
    const clean = content.trim();
    if (!clean || pending) return;
    setMessages(current => [...current, { role: "user", content: clean }]);
    setQuestion("");
    setPending(true);
    const evidence = retrieveEvidence(clean);
    const sourceCards = evidence.flatMap(record =>
      (record.sources ?? []).map(source => ({ concept: record.name, label: source.label, citation: source.citation, url: source.url })),
    );
    const answer = composeAnswer(clean, evidence, sourceCards);
    setCitations(sourceCards);
    setTimeout(() => {
      setMessages(current => [...current, { role: "assistant", content: answer }]);
      setPending(false);
    }, 320);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    send(question);
  };

  return (
    <div className="research-page">
      <SiteHeader />
      <main className="assistant-shell">
        <header className="assistant-hero">
          <p className="eyebrow">Sonata assistant</p>
          <h1>Reason from the catalogue, not from assumption.</h1>
          <p>
            The assistant retrieves published Sonata concept records and their linked sources before composing a response. If evidence is too thin, it
            says so.
          </p>
        </header>
        {loading ? (
          <div className="assistant-gate">
            <CircleAlert size={20} />
            <div>
              <strong>Checking access…</strong>
              <p>Verifying your signed-in session before enabling evidence synthesis.</p>
            </div>
          </div>
        ) : !isAuthenticated ? (
          <div className="assistant-gate">
            <CircleAlert size={20} />
            <div>
              <strong>Sign in to use evidence synthesis.</strong>
              <p>Public search and concept records remain available without an account. Sign-in protects the limited research synthesis service from abuse.</p>
            </div>
            <Link href="/login" className="button-quiet">
              Sign in
            </Link>
          </div>
        ) : (
          <>
            <section className="sonata-assistant-chat" aria-label="Source-grounded research conversation">
              <div className="assistant-thread" aria-live="polite">
                {messages.length ? (
                  messages.map((message, index) => (
                    <article className={`assistant-message assistant-message--${message.role}`} key={`${message.role}-${index}`}>
                      <span>{message.role === "user" ? "Research question" : "Sonata"}</span>
                      <p>{message.content}</p>
                    </article>
                  ))
                ) : (
                  <div className="assistant-empty">
                    <Sparkles size={28} />
                    <p>Ask from Sonata’s published source trail.</p>
                    <div>
                      {PROMPTS.map(prompt => (
                        <button type="button" key={prompt} onClick={() => send(prompt)}>
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {pending ? (
                  <article className="assistant-message assistant-message--assistant">
                    <span>Sonata</span>
                    <p>Checking published concept records and linked sources…</p>
                  </article>
                ) : null}
              </div>
              <form className="assistant-composer" onSubmit={submit}>
                <label className="sr-only" htmlFor="sonata-question">
                  Ask a source-grounded question
                </label>
                <input
                  id="sonata-question"
                  value={question}
                  onChange={event => setQuestion(event.target.value)}
                  placeholder="Ask how two source-linked concepts differ…"
                  minLength={8}
                  maxLength={1200}
                  disabled={pending}
                />
                <button type="submit" disabled={pending || question.trim().length < 8}>
                  Ask
                </button>
              </form>
            </section>
            {citations.length ? (
              <section className="assistant-citations">
                <div>
                  <BookOpenText size={18} />
                  <p className="eyebrow">Retrieved source trail</p>
                </div>
                {citations.map((source, index) => (
                  <a href={source.url} target="_blank" rel="noreferrer" key={`${source.concept}-${source.url}-${index}`}>
                    <span>
                      {source.concept} · {source.label}
                    </span>
                    <strong>{source.citation}</strong>
                  </a>
                ))}
              </section>
            ) : null}
            <p className="assistant-policy">
              <Sparkles size={14} /> Answers are logged with the retrieved Sonata evidence for editorial audit. The assistant does not publish, edit, or
              infer new knowledge.
            </p>
            <Link href="/search" className="contribute-return">
              Search published records directly
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
