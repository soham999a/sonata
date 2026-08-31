"use client";

import { ArrowLeftRight, ArrowRight, CircleAlert, GitCompareArrows } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { DEMONSTRATION_DETAILS, type SonataEntryDetail } from "@/lib/data/sonata-demo";

const options = [
  { slug: "raga", label: "Rāga" },
  { slug: "maqam", label: "Maqām" },
  { slug: "fugue", label: "Fugue" },
  { slug: "polyrhythm", label: "Polyrhythm" },
];

const FRAMEWORK = [
  "similarity",
  "difference",
  "historical relationship",
  "function",
] as const;

type Comparison = {
  left: SonataEntryDetail;
  right: SonataEntryDetail;
  framework: string[];
  notice: string;
};

function buildComparison(leftSlug: string, rightSlug: string): Comparison {
  const toDetail = (slug: string): SonataEntryDetail => {
    const demo = DEMONSTRATION_DETAILS[slug];
    if (demo) return demo;
    const card = options.find(o => o.slug === slug);
    const displayName = card?.label ?? slug;
    return {
      publicId: slug,
      slug,
      name: displayName,
      originalName: displayName,
      shortDefinition: "A foundation record awaiting a full public summary.",
      entityType: "Concept",
      region: "Not yet classified",
      tradition: "Context pending",
      relationshipCount: 0,
      definition: "This foundation comparator can present each record in its own terms before comparison.",
      historicalContext: "Historical context is preserved per record and is not inferred from similarity.",
      practicalUsage: "Use the two records’ source trails before drawing any parallel.",
      visualAudioDescription: "No media is attached to this foundation comparison.",
      tags: [],
      demonstration: true,
      taxonomyPath: ["World", "Research", displayName],
      related: [],
      sources: [],
      graphNodes: [],
    };
  };
  return {
    left: toDetail(leftSlug),
    right: toDetail(rightSlug),
    framework: [...FRAMEWORK],
    notice:
      "This comparison keeps each record in its own context. It does not assert that the two concepts share a scale, mode, form, or function; any such claim would require its own sources.",
  };
}

export default function ComparePage() {
  const [leftSlug, setLeftSlug] = useState("raga");
  const [rightSlug, setRightSlug] = useState("maqam");
  const comparison = buildComparison(leftSlug, rightSlug);
  const { left, right } = comparison;

  return (
    <div className="research-page">
      <SiteHeader />
      <main className="compare-shell">
        <header className="compare-hero">
          <p className="eyebrow">Contextual comparison</p>
          <h1>Compare without collapsing difference.</h1>
          <p>Sonata places two source-linked records beside one another and keeps similarity, difference, history, and function distinct.</p>
        </header>

        <div className="compare-selectors">
          <label>
            <span>First concept</span>
            <select value={leftSlug} onChange={event => setLeftSlug(event.target.value)}>
              {options.map(option => (
                <option key={option.slug} value={option.slug}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={() => { setLeftSlug(rightSlug); setRightSlug(leftSlug); }} aria-label="Swap concepts">
            <ArrowLeftRight size={20} />
          </button>
          <label>
            <span>Second concept</span>
            <select value={rightSlug} onChange={event => setRightSlug(event.target.value)}>
              {options.map(option => (
                <option key={option.slug} value={option.slug}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {left && right ? (
          <>
            <section className="compare-records">
              <article>
                <p className="eyebrow">
                  {left.tradition} · {left.region}
                </p>
                <h2>{left.name}</h2>
                <p>{left.definition}</p>
                <Link href={`/entries/${left.slug}`}>
                  Open concept record <ArrowRight size={15} />
                </Link>
              </article>
              <div className="compare-records__axis">
                <GitCompareArrows size={24} strokeWidth={1.3} />
                <span>context, not equivalence</span>
              </div>
              <article>
                <p className="eyebrow">
                  {right.tradition} · {right.region}
                </p>
                <h2>{right.name}</h2>
                <p>{right.definition}</p>
                <Link href={`/entries/${right.slug}`}>
                  Open concept record <ArrowRight size={15} />
                </Link>
              </article>
            </section>

            <section className="comparison-framework">
              <p className="eyebrow">Reading framework</p>
              <div>
                {comparison.framework.map((item, index) => (
                  <article key={item}>
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{item}</h3>
                      <p>
                        {item === "similarity"
                          ? "Identify only shared features supported by the displayed records."
                          : item === "difference"
                            ? "Preserve distinct terminology, practice, and historical setting."
                            : item === "historical relationship"
                              ? "Treat historical links as claims requiring sources, not inference."
                              : "Describe use and role without assuming the same musical function."}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="comparison-caution">
              <CircleAlert size={18} />
              <p>{comparison.notice}</p>
            </aside>
          </>
        ) : null}
      </main>
    </div>
  );
}
