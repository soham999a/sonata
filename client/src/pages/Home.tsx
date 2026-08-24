/**
 * STYLE: Editorial Cartography. The public landing experience is a navigable
 * research atlas: calm editorial hierarchy, a taxonomy spine, and crafted data views.
 */
import { ArrowDownRight, ArrowRight, BookOpenText, ChevronRight, Compass, GitCompareArrows, GraduationCap, Layers3, Search, ShieldCheck, Sparkles, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { EntryCard } from "@/components/EntryCard";
import { SiteHeader } from "@/components/SiteHeader";
import { TaxonomyRibbon } from "@/components/TaxonomyRibbon";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { createEditorialStatusDataset, editorialStatusFromSearchParam, filterEditorialStatusDataset, PUBLIC_EDITORIAL_STATUSES, type PublicEditorialStatus } from "../../../shared/coverage-explorer";

export default function Home() {
  const [, setLocation] = useLocation();
  const browseQuery = trpc.sonata.browse.useQuery();
  const coverageQuery = trpc.sonata.coverage.useQuery();
  const { user } = useAuth();
  const canAccessEditorial = user?.role === "admin";
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All pathways");
  const [coverageDimension, setCoverageDimension] = useState<"region" | "tradition" | "domain" | "era">("region");
  const [coverageStatus, setCoverageStatus] = useState<"all" | "published" | "planned">("all");
  const [editorialStatus, setEditorialStatus] = useState<PublicEditorialStatus | "all">(() => editorialStatusFromSearchParam(typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("status")));
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const searchQuery = trpc.sonata.search.useQuery(
    { query },
    { enabled: query.trim().length > 0 },
  );

  const sourceEntries = query.trim().length > 0 ? searchQuery.data?.entries ?? [] : browseQuery.data?.entries ?? [];
  const collectionFilters = ["All pathways", ...(coverageQuery.data?.regions ?? []).map(region => region.label)];
  const visibleEntries = useMemo(() => {
    if (activeFilter === "All pathways") return sourceEntries;
    return sourceEntries.filter(entry => entry.region === activeFilter || entry.region.includes(activeFilter));
  }, [activeFilter, sourceEntries]);
  const visibleCoverageTargets = useMemo(() => (coverageQuery.data?.targets ?? [])
    .filter(target => target.dimension === coverageDimension)
    .filter(target => coverageStatus === "all" ? true : coverageStatus === "published" ? target.publishedCount > 0 : target.publishedCount < target.targetCount), [coverageDimension, coverageQuery.data?.targets, coverageStatus]);
  const editorialStatusDataset = useMemo(() => createEditorialStatusDataset(coverageQuery.data?.editorialStatusCounts), [coverageQuery.data?.editorialStatusCounts]);
  const visibleStatusDataset = filterEditorialStatusDataset(editorialStatusDataset, editorialStatus);
  const selectedStatusCount = editorialStatus === "all" ? (coverageQuery.data?.draftConcepts ?? 0) + (coverageQuery.data?.publishedConcepts ?? 0) : coverageQuery.data?.editorialStatusCounts?.[editorialStatus] ?? 0;
  const featuredEntries = browseQuery.data?.entries ?? [];
  const featuredEntry = featuredEntries.length ? featuredEntries[featuredIndex % featuredEntries.length] : undefined;

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
              <Link href="/search" className="button-primary button-primary--light">Begin a search <ArrowDownRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link>
              <Link href="/entries/raga" className="text-link text-link--light">
                Open a concept record <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
            <div className="coverage-signal" aria-label="Knowledge coverage target">
              <span>Part 2</span>
              <strong>{coverageQuery.data?.primaryTarget.toLocaleString() ?? "15,350"} source-aware coverage target</strong>
              <small>{coverageQuery.data?.publishedConcepts ?? 0} published · {coverageQuery.data?.draftConcepts ?? 0} editorial records</small>
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
              Search across canonical names, alternate spellings, transliterations, and cultural context. Targets communicate planned global coverage; only reviewed, source-linked concepts become public records.
            </p>
          </div>

          <div className="search-deck">
            <label className="search-field" htmlFor="sonata-search">
              <Search size={20} strokeWidth={1.5} aria-hidden="true" />
              <input
                id="sonata-search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                onKeyDown={event => { if (event.key === "Enter") setLocation(`/search?q=${encodeURIComponent(query)}`); }}
                placeholder="Search a term, a tradition, or a transliteration"
                autoComplete="off"
              />
              <span className="search-field__hint">⌘ K</span>
            </label>
            <div className="filter-row" aria-label="Filter pathways by primary coverage region">
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

            <div className="discovery-modes" aria-label="Sonata discovery pathways">
              <Link href="/search?q=Region"><Compass size={18} /><span><strong>Explore by region</strong><small>Place, lineage, and local context</small></span><ArrowRight size={15} /></Link>
              <Link href="/search?q=Tradition"><Layers3 size={18} /><span><strong>Follow a tradition</strong><small>Systems, repertoires, and practices</small></span><ArrowRight size={15} /></Link>
              <Link href="/compare"><GitCompareArrows size={18} /><span><strong>Compare concepts</strong><small>Difference before equivalence</small></span><ArrowRight size={15} /></Link>
              <Link href="/learn"><GraduationCap size={18} /><span><strong>Build a learning path</strong><small>Published knowledge, progressively read</small></span><ArrowRight size={15} /></Link>
              <Link href="/assistant"><WandSparkles size={18} /><span><strong>Ask with evidence</strong><small>Source-grounded synthesis</small></span><ArrowRight size={15} /></Link>
            </div>

            {featuredEntry ? <section className="explore-concept" aria-label="Explore a concept"><div><p className="eyebrow">Explore a concept</p><p>Let one researched record open the next pathway.</p><button type="button" onClick={() => setFeaturedIndex(index => index + 1)}>Another record <Sparkles size={14} /></button></div><Link href={`/entries/${featuredEntry.slug}`}><span>{String(featuredIndex + 1).padStart(2, "0")}</span><div><p className="eyebrow">{featuredEntry.tradition} · {featuredEntry.region}</p><h3>{featuredEntry.name}</h3><p>{featuredEntry.shortDefinition}</p></div><ArrowRight size={20} /></Link></section> : null}

            <section className="coverage-explorer" aria-labelledby="coverage-explorer-heading">
            <div className="coverage-explorer__heading"><div><p className="eyebrow">Coverage explorer</p><h3 id="coverage-explorer-heading">Read the editorial map by more than region.</h3></div><p>These filters explore coverage targets and published counts. They do not inflate the public catalogue with unreviewed candidates.</p></div>
            <div className="coverage-explorer__filters" aria-label="Filter coverage targets">
              <div><span>Lens</span>{(["region", "tradition", "domain", "era"] as const).map(dimension => <button type="button" key={dimension} className={`filter-button ${coverageDimension === dimension ? "is-active" : ""}`} onClick={() => setCoverageDimension(dimension)}>{dimension}</button>)}</div>
              <div><span>Record state</span>{(["all", "published", "planned"] as const).map(status => <button type="button" key={status} className={`filter-button ${coverageStatus === status ? "is-active" : ""}`} onClick={() => setCoverageStatus(status)}>{status === "planned" ? "planned gap" : status}</button>)}</div>
            </div>
            <div className="editorial-status-lens"><div><span>Editorial status lens</span><div>{(["all", ...PUBLIC_EDITORIAL_STATUSES] as const).map(status => <button type="button" key={status} className={`filter-button ${editorialStatus === status ? "is-active" : ""}`} onClick={() => { setEditorialStatus(status); const url = new URL(window.location.href); if (status === "all") url.searchParams.delete("status"); else url.searchParams.set("status", status); window.history.replaceState({}, "", url); }}>{status.replace(/_/g, " ")}</button>)}</div></div><p><strong>{selectedStatusCount}</strong> aggregate {editorialStatus === "all" ? "tracked records" : `${editorialStatus.replace(/_/g, " ")} records`}. Only published records are available as public entries; other statuses remain aggregate-only to protect the editorial workflow.</p></div>
            <div className="editorial-status-dataset" aria-live="polite">{visibleStatusDataset.map(row => <article key={row.status}><span>{row.status.replace(/_/g, " ")}</span><strong>{row.count}</strong><small>{row.status === "published" ? "public entries" : "aggregate only"}</small></article>)}</div>
            <div className="coverage-explorer__cards">
              {visibleCoverageTargets.length ? visibleCoverageTargets.map(target => <article key={`${target.dimension}-${target.slug}`}><p>{target.label}</p><strong>{target.targetCount.toLocaleString()}</strong><span>{target.publishedCount} published · {Math.max(0, target.targetCount - target.publishedCount).toLocaleString()} planned gap</span></article>) : <p className="coverage-explorer__empty">No targets have reached the selected public-record state yet. This is an honest coverage signal, not an empty-data error.</p>}
            </div>
          </section>

          <div className="discover-grid">
            <aside className="taxonomy-spine" id="atlas">
              <div className="taxonomy-spine__heading">
                <Layers3 size={17} strokeWidth={1.5} aria-hidden="true" />
                <span>Browse the atlas</span>
              </div>
              <div className="taxonomy-spine__list">
                {(coverageQuery.data?.regions ?? []).slice(0, 7).map((node, index) => (
                  <button
                    type="button"
                    key={node.slug}
                    className="taxonomy-node"
                    onClick={() => setActiveFilter(node.label)}
                  >
                    <span className="taxonomy-node__index">0{index + 1}</span>
                    <span>
                      <strong>{node.label}</strong>
                      <small>{node.targetCount.toLocaleString()} planned primary concepts</small>
                    </span>
                    <ChevronRight size={15} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                ))}
              </div>
              <Link href="/editorial" className="taxonomy-spine__link">
                View source and coverage controls <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </aside>

            <div className="entry-index">
              <div className="entry-index__heading">
                <span className="eyebrow">{query ? "Search result" : "Selected starting points"}</span>
                <span className="entry-index__count">{visibleEntries.length.toString().padStart(2, "0")} records</span>
              </div>
              <div className="coverage-ledger">
                <ShieldCheck size={17} strokeWidth={1.5} aria-hidden="true" />
                <p><strong>Coverage is planned, not claimed.</strong> Sonata’s {coverageQuery.data?.primaryTarget.toLocaleString() ?? "15,350"}-concept target is staged in reviewed batches of 100–500. Low-confidence or unresolved candidates remain outside public discovery.</p>
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
