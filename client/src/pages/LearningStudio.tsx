import { ArrowRight, BookOpenCheck, BrainCircuit, ChevronRight, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { trpc } from "@/lib/trpc";

export default function LearningStudio() {
  const [focus, setFocus] = useState("Indian classical music");
  const [flashcardsVisible, setFlashcardsVisible] = useState<Record<string, boolean>>({});
  const [answersVisible, setAnswersVisible] = useState<Record<string, boolean>>({});
  const learning = trpc.research.learning.useQuery({ focus });
  return <div className="research-page"><SiteHeader /><main className="learning-shell">
    <header className="learning-hero"><p className="eyebrow">Learning studio</p><h1>Learn by following context.</h1><p>Sonata turns published, source-linked concepts into a progressive path. It does not generate a syllabus from unsupported generalizations.</p><form onSubmit={event => { event.preventDefault(); learning.refetch(); }}><input value={focus} onChange={event => setFocus(event.target.value)} placeholder="Teach me Indian classical music" /><button type="submit">Build a path <ArrowRight size={16} /></button></form></header>
    <section className="learning-path"><div className="learning-section-heading"><div><p className="eyebrow">Progressive path</p><h2>{learning.data?.focus ?? focus}</h2></div><BookOpenCheck size={23} /></div>{learning.data?.path.map(item => <Link href={`/entries/${item.concept.slug}`} key={item.concept.publicId} className="learning-step"><span>0{item.step}</span><div><p className="eyebrow">{item.level}</p><h3>{item.concept.name}</h3><p>{item.prompt}</p></div><ChevronRight size={18} /></Link>)}</section>
    <div className="learning-grid"><section><div className="learning-section-heading"><div><p className="eyebrow">Flashcards</p><h2>Recall from context</h2></div><RefreshCw size={19} /></div><div className="flashcard-grid">{learning.data?.flashcards.map(card => <button type="button" key={card.sourceSlug} className="flashcard" onClick={() => setFlashcardsVisible(current => ({ ...current, [card.sourceSlug]: !current[card.sourceSlug] }))}><span>{card.concept}</span><strong>{flashcardsVisible[card.sourceSlug] ? card.answer : card.prompt}</strong><small>{flashcardsVisible[card.sourceSlug] ? "Hide answer" : "Reveal answer"}</small></button>)}</div></section><section><div className="learning-section-heading"><div><p className="eyebrow">Quiz</p><h2>Check your reading</h2></div><BrainCircuit size={20} /></div><div className="quiz-list">{learning.data?.quiz.map(item => <article key={item.conceptSlug}><p>{item.prompt}</p><button type="button" onClick={() => setAnswersVisible(current => ({ ...current, [item.conceptSlug]: !current[item.conceptSlug] }))}>{answersVisible[item.conceptSlug] ? item.answer : "Reveal source-grounded answer"}</button><small>{item.rubric}</small></article>)}</div></section></div>
  </main></div>;
}
