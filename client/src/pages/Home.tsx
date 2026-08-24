/**
 * STYLE: Editorial Cartography. The public landing experience is a navigable
 * research atlas: calm editorial hierarchy, a taxonomy spine, and crafted data views.
 */
import { ArrowDownRight, ArrowRight, BookOpenText, ChevronRight, Compass, Layers3, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { EntryCard } from "@/components/EntryCard";
import { SiteHeader } from "@/components/SiteHeader";
import { TaxonomyRibbon } from "@/components/TaxonomyRibbon";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const collectionFilters = ["All pathways", "South Asia", "West Asia & North Africa", "Europe", "Global"];

export default function Home() {
  const browseQuery = trpc.sonata.browse.useQuery();
  const { user } = useAuth();
  const canAccessEditorial = user?.role === "admin";
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All pathways");
  const searchQuery = trpc.sonata.search.useQuery(
    { query },
    { enabled: query.trim().length > 0 },
  );

  const sourceEntries = query.trim().length > 0 ? searchQuery.data?.entries ?? [] : browseQuery.data?.entries ?? [];
  const visibleEntries = useMemo(() => {
    if (activeFilter === "All pathways") return sourceEntries;
    return sourceEntries.filter(entry => entry.region === activeFilter || entry.region.includes(activeFilter));
  }, [activeFilter, sourceEntries]);

  return (
    <div className="sonata-app">
      <div className="hero-shell">
        <div className="hero-shell__image" aria-hidden="true" />
        <div className="hero-shell__noise" aria-hidden="true" />
        <SiteHeader inverse />
        <main className="hero">
          <div className="hero__index">
            <span>01</span>
            <span>Global music knowledge</span>
          </div>
          <div className="hero__copy">
            <p className="eyebrow eyebrow--brass">A global music reference platform</p>
            <h1>Music is not one system.<br />Neither is its knowledge.</h1>
            <p className="hero__lede">
              Sonata connects musical terms to the cultures, practices, histories, and relationships that give them meaning.
            </p>
            <div className="hero__actions">
              <a href="#discover" className="button-primary button-primary--light">
                Begin a search <ArrowDownRight size={17} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <Link href="/entries/raga" className="text-link text-link--light">
                Open a concept record <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="hero__fact">
            <span className="eyebrow eyebrow--brass">Foundation principle</span>
            <p>Do not flatten a culture-specific concept into a convenient equivalent.</p>
          </div>
        </main>
      </div>

      <section className="discovery-section" id="discover">
        <div className="section-rail">
          <span className="section-rail__number">02</span>
          <span>Find a pathway</span>
        </div>
        <div className="discovery-section__content">
          <div className="discovery-intro">
            <div>
              <p className="eyebrow">Discovery index</p>
              <h2>Follow a term through the musical worlds that give it meaning.</h2>
            </div>
            <p>
              Search across canonical names, alternate spellings, transliterations, and cultural context. This foundation shows a small set of demonstration records—not a substitute for the future curated corpus.
            </p>
          </div>

          <div className="search-deck">
            <label className="search-field" htmlFor="sonata-search">
              <Search size={20} strokeWidth={1.5} aria-hidden="true" />
              <input
                id="sonata-search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search a term, a tradition, or a transliteration"
                autoComplete="off"
              />
              <span className="search-field__hint">⌘ K</span>
            </label>
            <div className="filter-row" aria-label="Filter pathways by region">
              {collectionFilters.map(filter => (
                <button
                  key={filter}
                  type="button"
                  className={`filter-button ${activeFilter === filter ? "is-active" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="discover-grid">
            <aside className="taxonomy-spine" id="atlas">
              <div className="taxonomy-spine__heading">
                <Layers3 size={17} strokeWidth={1.5} aria-hidden="true" />
                <span>Browse the atlas</span>
              </div>
              <div className="taxonomy-spine__list">
                {(browseQuery.data?.taxonomy ?? []).map((node, index) => (
                  <button
                    type="button"
                    key={node.label}
                    className="taxonomy-node"
                    onClick={() => setActiveFilter(node.label === "World" ? "All pathways" : node.label)}
                  >
                    <span className="taxonomy-node__index">0{index + 1}</span>
                    <span>
                      <strong>{node.label}</strong>
                      <small>{node.detail}</small>
                    </span>
                    <ChevronRight size={15} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                ))}
              </div>
              <Link href="/editorial" className="taxonomy-spine__link">
                View taxonomy foundation <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </aside>

            <div className="entry-index">
              <div className="entry-index__heading">
                <span className="eyebrow">{query ? "Search result" : "Selected starting points"}</span>
                <span className="entry-index__count">{visibleEntries.length.toString().padStart(2, "0")} records</span>
              </div>
              {browseQuery.isLoading ? <div className="records-loading">Building the discovery index…</div> : null}
              {!browseQuery.isLoading && visibleEntries.length === 0 ? (
                <div className="records-empty">
                  <Sparkles size={20} strokeWidth={1.5} aria-hidden="true" />
                  <p>No matching foundation record. Try a broader term or switch pathways.</p>
                </div>
              ) : null}
              <div className="entry-grid">
                {visibleEntries.map((entry, index) => <EntryCard key={entry.publicId} entry={entry} index={index} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="section-rail section-rail--light">
          <span className="section-rail__number">03</span>
          <span>Designing for fidelity</span>
        </div>
        <div className="method-section__content">
          <div className="method-section__image-wrap">
            <img
              src="/manus-storage/sonata-world-instruments-study_444d7f6d.jpg"
              alt="A refined study of musical instrument materials from a range of traditions"
              className="method-section__image"
            />
            <span className="image-caption">Sound begins in place, material, practice, and memory.</span>
          </div>
          <div className="method-section__copy">
            <p className="eyebrow eyebrow--brass">A knowledge system, not a flat glossary</p>
            <h2>Every record can carry its own context.</h2>
            <div className="method-principles">
              <div>
                <Compass size={19} strokeWidth={1.5} aria-hidden="true" />
                <h3>Multiple paths</h3>
                <p>A concept can be browsed by region, tradition, category, era, or performance practice.</p>
              </div>
              <div>
                <BookOpenText size={19} strokeWidth={1.5} aria-hidden="true" />
                <h3>Visible provenance</h3>
                <p>Sources, review status, and disagreement belong beside the definition—not behind it.</p>
              </div>
            </div>
            <Link href="/entries/raga" className="button-primary">
              Read the Rāga foundation record <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="sonata-footer">
        <div className="sonata-footer__brand">
          <span className="sonata-footer__word">Sonata</span>
          <p>Global music knowledge, held with context.</p>
        </div>
        <div className="sonata-footer__links">
          {canAccessEditorial ? <Link href="/editorial">Editorial workbench</Link> : null}
          <a href="#discover">Discovery index</a>
          <a href="#method">Method</a>
        </div>
      </footer>
    </div>
  );
}
