import { ArrowLeftRight, ArrowRight, CircleAlert, GitCompareArrows } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { trpc } from "@/lib/trpc";

const options = [
  { slug: "raga", label: "Rāga" },
  { slug: "maqam", label: "Maqām" },
  { slug: "fugue", label: "Fugue" },
  { slug: "polyrhythm", label: "Polyrhythm" },
];

export default function CompareConcepts() {
  const [leftSlug, setLeftSlug] = useState("raga");
  const [rightSlug, setRightSlug] = useState("maqam");
  const comparison = trpc.research.compare.useQuery({ leftSlug, rightSlug });
  const left = comparison.data?.left;
  const right = comparison.data?.right;
  return <div className="research-page">
    <SiteHeader />
    <main className="compare-shell">
      <header className="compare-hero"><p className="eyebrow">Contextual comparison</p><h1>Compare without collapsing difference.</h1><p>Sonata places two source-linked records beside one another and keeps similarity, difference, history, and function distinct.</p></header>
      <div className="compare-selectors"><label><span>First concept</span><select value={leftSlug} onChange={event => setLeftSlug(event.target.value)}>{options.map(option => <option key={option.slug} value={option.slug}>{option.label}</option>)}</select></label><button type="button" onClick={() => { setLeftSlug(rightSlug); setRightSlug(leftSlug); }} aria-label="Swap concepts"><ArrowLeftRight size={20} /></button><label><span>Second concept</span><select value={rightSlug} onChange={event => setRightSlug(event.target.value)}>{options.map(option => <option key={option.slug} value={option.slug}>{option.label}</option>)}</select></label></div>
      {comparison.isLoading ? <p className="research-empty">Loading the two source trails…</p> : null}
      {left && right ? <><section className="compare-records"><article><p className="eyebrow">{left.tradition} · {left.region}</p><h2>{left.name}</h2><p>{left.definition}</p><Link href={`/entries/${left.slug}`}>Open concept record <ArrowRight size={15} /></Link></article><div className="compare-records__axis"><GitCompareArrows size={24} strokeWidth={1.3} /><span>context, not equivalence</span></div><article><p className="eyebrow">{right.tradition} · {right.region}</p><h2>{right.name}</h2><p>{right.definition}</p><Link href={`/entries/${right.slug}`}>Open concept record <ArrowRight size={15} /></Link></article></section><section className="comparison-framework"><p className="eyebrow">Reading framework</p>{comparison.data?.framework.map((item, index) => <article key={item}><span>0{index + 1}</span><div><h3>{item}</h3><p>{item === "similarity" ? "Identify only shared features supported by the displayed records." : item === "difference" ? "Preserve distinct terminology, practice, and historical setting." : item === "historical relationship" ? "Treat historical links as claims requiring sources, not inference." : "Describe use and role without assuming the same musical function."}</p></div></article>)}</section><aside className="comparison-caution"><CircleAlert size={18} /><p>{comparison.data?.notice}</p></aside></> : null}
    </main>
  </div>;
}
