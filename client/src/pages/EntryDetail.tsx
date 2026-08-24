/**
 * STYLE: Editorial Cartography. A reading-first concept page with a taxonomy
 * spine, measured serif typography, and a quiet contextual relationship rail.
 */
import { ArrowLeft, BookMarked, CircleAlert, Copy, ExternalLink, Languages, Network, Quote, Share2 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { RelationshipConstellation } from "@/components/RelationshipConstellation";
import { SiteHeader } from "@/components/SiteHeader";
import { TaxonomyRibbon } from "@/components/TaxonomyRibbon";
import { trpc } from "@/lib/trpc";

function EntryDetail() {
  const [, params] = useRoute("/entries/:slug");
  const slug = params?.slug ?? "raga";
  const entryQuery = trpc.sonata.entry.useQuery({ slug });
  const entry = entryQuery.data;

  if (entryQuery.isLoading) {
    return <div className="sonata-loading">Opening concept record…</div>;
  }

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
              <p className="eyebrow">Demonstration record · {entry.entityType}</p>
              <h1>{entry.name}</h1>
              <div className="entry-reading__names">
                {entry.nativeScript ? <span>{entry.nativeScript}</span> : null}
                {entry.transliteration ? <span>{entry.transliteration}</span> : null}
                {entry.pronunciation ? <span>/{entry.pronunciation}/</span> : null}
              </div>
            </div>
            <div className="entry-reading__tools" aria-label="Record tools">
              <button type="button" className="icon-button" aria-label="Copy record link" title="Copy record link">
                <Copy size={16} strokeWidth={1.6} />
              </button>
              <button type="button" className="icon-button" aria-label="Share record" title="Share record">
                <Share2 size={16} strokeWidth={1.6} />
              </button>
            </div>
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
                {entry.sources.length > 0 ? entry.sources.map(source => (
                  <a href={source.url} target="_blank" rel="noreferrer" className="citation-item" key={source.url}>
                    <div className="citation-item__topline">
                      <span>{source.label}</span>
                      <span>{source.scope}</span>
                    </div>
                    <strong>{source.citation}</strong>
                    <p>{source.note}</p>
                    <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                )) : <p>Published source records have not yet been attached to this concept.</p>}
              </div>
            </div>
          </section>

          <aside className="editorial-caution">
            <CircleAlert size={18} strokeWidth={1.5} aria-hidden="true" />
            <p>
              This is a deliberately limited foundation record. A production entry will surface scholarly sources,
              claim-level provenance, and the full editorial status rather than imply an authoritative final definition.
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
        </aside>
      </main>
    </div>
  );
}

export default EntryDetail;
