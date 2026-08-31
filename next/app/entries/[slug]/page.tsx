import { ArrowLeft, BookMarked, CircleAlert, ExternalLink, GitCompareArrows, Languages, Network, Quote, Waves } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { RelationshipConstellation } from "@/components/RelationshipConstellation";
import { SiteHeader } from "@/components/SiteHeader";
import { TaxonomyRibbon } from "@/components/TaxonomyRibbon";
import { getPublicEntry } from "@/lib/data/repository";
import { EntryTools } from "@/components/EntryTools";

export default async function EntryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getPublicEntry(slug);

  if (!entry) {
    return (
      <div className="not-found-shell">
        <p className="eyebrow">No published record found</p>
        <h1>That concept is not in the foundation preview.</h1>
        <Link href="/" className="text-link">
          <ArrowLeft size={16} aria-hidden="true" /> Return to the catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="entry-page">
      <SiteHeader />
      <main className="entry-layout">
        <aside className="entry-spine">
          <Link href="/" className="back-link">
            <ArrowLeft size={15} strokeWidth={1.5} aria-hidden="true" /> Catalogue
          </Link>
          <div className="entry-spine__rule" />
          <span className="eyebrow">Record path</span>
          <TaxonomyRibbon path={entry.taxonomyPath} />
        </aside>

        <article className="entry-reading">
          <div className="entry-reading__heading">
            <div>
              <p className="eyebrow">{entry.demonstration ? "Foundation record" : "Published concept"} · {entry.entityType}</p>
              <h1>{entry.name}</h1>
              <div className="entry-reading__names">
                {entry.nativeScript ? <span>{entry.nativeScript}</span> : null}
                {entry.transliteration ? <span>{entry.transliteration}</span> : null}
                {entry.pronunciation ? <span>/{entry.pronunciation}/</span> : null}
              </div>
            </div>
            <EntryTools name={entry.name} slug={entry.slug} />
          </div>

          <div className="entry-reading__definition">
            <p>{entry.definition}</p>
          </div>

          <section className="entry-section">
            <div className="entry-section__label">
              <BookMarked size={17} strokeWidth={1.5} aria-hidden="true" />
              <span>Context</span>
            </div>
            <div className="entry-section__body">
              <h2>History & framing</h2>
              <p>{entry.historicalContext}</p>
              <h2>How this concept is approached</h2>
              <p>{entry.practicalUsage}</p>
            </div>
          </section>

          <section className="entry-section">
            <div className="entry-section__label">
              <Waves size={17} strokeWidth={1.5} aria-hidden="true" />
              <span>Research lenses</span>
            </div>
            <div className="entry-section__body">
              {entry.emicDescription ? (
                <>
                  <h2>Concept in its own terms</h2>
                  <p>{entry.emicDescription}</p>
                </>
              ) : null}
              {entry.eticComparison ? (
                <>
                  <h2>Optional comparison</h2>
                  <p>{entry.eticComparison}</p>
                </>
              ) : null}
              {entry.regionalVariation ? (
                <>
                  <h2>Regional context</h2>
                  <p>{entry.regionalVariation}</p>
                </>
              ) : null}
              {!entry.emicDescription && !entry.eticComparison && !entry.regionalVariation ? (
                <p>This foundation record can hold emic description, carefully scoped comparison, and regional variation as source-linked research is added.</p>
              ) : null}
            </div>
          </section>

          <section className="entry-section">
            <div className="entry-section__label">
              <Waves size={17} strokeWidth={1.5} aria-hidden="true" />
              <span>{entry.theoryVisual ? "Source-scoped theory aid" : "Concept framework"}</span>
            </div>
            <div className="entry-section__body">
              {entry.theoryVisual ? (
                <>
                  <div className="theory-aid" role="img" aria-label={`${entry.theoryVisual.title} diagram for ${entry.name}, based on the source-scoped entry framing`}>
                    <div className="theory-aid__head">
                      <span>{entry.theoryVisual.sourceScope}</span>
                      <strong>{entry.theoryVisual.title}</strong>
                    </div>
                    <div className="theory-aid__axes">
                      {entry.theoryVisual.axes.map((axis, index) => (
                        <article key={axis.label}>
                          <i style={{ transform: `rotate(${index * 120}deg)` }} />
                          <span>{axis.label}</span>
                          <strong>{axis.value}</strong>
                        </article>
                      ))}
                    </div>
                    <div className="theory-aid__center">
                      <span>{entry.name}</span>
                    </div>
                  </div>
                  <p className="theory-aid__note">{entry.theoryVisual.caution}</p>
                </>
              ) : (
                <>
                  <div className="concept-context-aid" role="img" aria-label={`Source-scoped concept framework for ${entry.name}, showing its function, context, and evidence trail`}>
                    <div className="concept-context-aid__rings">
                      <span />
                      <span />
                      <span />
                      <i />
                    </div>
                    <div className="concept-context-aid__center">
                      <strong>{entry.name}</strong>
                      <small>{entry.entityType}</small>
                    </div>
                    <div className="concept-context-aid__nodes">
                      <span>
                        <b>Function</b>
                        {entry.taxonomyPath.at(-2) ?? entry.entityType}
                      </span>
                      <span>
                        <b>Context</b>
                        {entry.tradition ?? entry.region}
                      </span>
                      <span>
                        <b>Evidence</b>
                        {entry.sources.length} linked source records
                      </span>
                    </div>
                  </div>
                  <p className="concept-context-aid__note">
                    This framework diagram visualizes only the record’s published function, cultural context, and evidence trail. It never substitutes a generic scale, notation, tuning, or analytical model for a tradition-specific concept.
                  </p>
                </>
              )}
            </div>
          </section>

          <section className="entry-section">
            <div className="entry-section__label">
              <Languages size={17} strokeWidth={1.5} aria-hidden="true" />
              <span>Language</span>
            </div>
            <div className="entry-section__body entry-language-grid">
              <div>
                <span>Language of origin</span>
                <strong>{entry.languageOfOrigin ?? "Context pending"}</strong>
              </div>
              <div>
                <span>Native script</span>
                <strong>{entry.nativeScript ?? "Not yet recorded"}</strong>
              </div>
              <div>
                <span>Transliteration</span>
                <strong>{entry.transliteration ?? "Not yet recorded"}</strong>
              </div>
            </div>
          </section>

          <section className="entry-section entry-section--sources">
            <div className="entry-section__label">
              <Quote size={17} strokeWidth={1.5} aria-hidden="true" />
              <span>Sources</span>
            </div>
            <div className="entry-section__body">
              <h2>Reference records</h2>
              <div className="citation-list">
                {entry.sources.length > 0 ? (
                  entry.sources.map(source => (
                    <a href={source.url} target="_blank" rel="noreferrer" className="citation-item" key={source.url}>
                      <div className="citation-item__topline">
                        <span>{source.label}</span>
                        <span>{source.scope}</span>
                      </div>
                      <strong>{source.citation}</strong>
                      <p>{source.note}</p>
                      <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  ))
                ) : (
                  <p>Published source records have not yet been attached to this concept.</p>
                )}
              </div>
            </div>
          </section>

          <aside className="editorial-caution">
            <CircleAlert size={18} strokeWidth={1.5} aria-hidden="true" />
            <p>
              {entry.uncertaintyNote
                ? `Scholarly perspectives differ: ${entry.uncertaintyNote}`
                : entry.demonstration
                  ? "This deliberately limited foundation record makes its scope visible rather than implying an authoritative final definition."
                  : `Publication status: ${entry.editorialStatus?.replace(/_/g, " ") ?? "published"}. Source quality: ${entry.sourceQuality ?? "unassessed"}.`}
            </p>
          </aside>
        </article>

        <aside className="entry-context-rail">
          <div className="entry-context-rail__card entry-context-rail__card--graph">
            <div className="entry-context-rail__heading">
              <div>
                <p className="eyebrow">Knowledge graph</p>
                <h2>Concept constellation</h2>
              </div>
              <Network size={18} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <RelationshipConstellation nodes={entry.graphNodes} />
            <p className="tiny-note">Each line represents a typed relationship with its own context and source record.</p>
          </div>

          <div className="entry-context-rail__card">
            <div className="entry-context-rail__heading">
              <div>
                <p className="eyebrow">Connections</p>
                <h2>Related concepts</h2>
              </div>
            </div>
            <div className="related-list">
              {entry.related.map(item => (
                <Link href={`/entries/${item.slug}`} key={`${item.slug}-${item.relationshipType}`} className="related-list__item">
                  <div>
                    <span className="related-list__type">{item.relationshipType.replace(/_/g, " ")}</span>
                    <strong>{item.name}</strong>
                  </div>
                  <p>{item.note}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="source-card">
            <Quote size={17} strokeWidth={1.5} aria-hidden="true" />
            <p>Sources attach to the concept without erasing disagreements between accounts.</p>
            <span>Foundation capability</span>
          </div>
          <Link href="/compare" className="source-card source-card--compare">
            <GitCompareArrows size={17} strokeWidth={1.5} aria-hidden="true" />
            <p>Compare this record through similarity, difference, history, and function.</p>
            <span>Open contextual comparison</span>
          </Link>
        </aside>
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getPublicEntry(slug);
  return {
    title: entry ? `${entry.name} — Sonata Global Music Knowledge` : "Concept not found — Sonata",
    description: entry?.shortDefinition,
  };
}
