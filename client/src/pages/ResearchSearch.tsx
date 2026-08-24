import { ArrowRight, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { trpc } from "@/lib/trpc";

const filterLabels = ["region", "tradition", "genre", "era", "instrument", "category", "language", "confidence"] as const;
type FilterKey = typeof filterLabels[number];
type ResearchFilterState = Partial<Record<Exclude<FilterKey, "confidence">, string>> & { confidence?: "primary" | "high" | "medium" | "low" };

function SearchResult({ record }: { record: { slug: string; name: string; originalName?: string; shortDefinition: string; tradition: string; region: string; era?: string; category?: string; confidence: string; matchReasons: string[]; tags: string[] } }) {
  return (
    <Link href={`/entries/${record.slug}`} className="research-result">
      <div className="research-result__index"><span>{record.matchReasons[0] ?? "catalogue match"}</span><ArrowRight size={17} strokeWidth={1.5} /></div>
      <div>
        <p className="eyebrow">{record.tradition} · {record.region}</p>
        <h2>{record.name} {record.originalName ? <em>{record.originalName}</em> : null}</h2>
        <p>{record.shortDefinition}</p>
      </div>
      <div className="research-result__meta"><span>{record.era ?? "Ongoing context"}</span><span>{record.category ?? record.tags[0] ?? "Concept"}</span><span>{record.confidence} confidence</span></div>
    </Link>
  );
}

export default function ResearchSearch() {
  const [, setLocation] = useLocation();
  const initialQuery = typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<ResearchFilterState>({});
  const deferredQuery = useDeferredValue(query);
  const search = trpc.research.search.useQuery({ query: deferredQuery, filters, pageSize: 18 });
  const facets = search.data?.facets;
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const updateQuery = (next: string) => { setQuery(next); const url = new URL(window.location.href); if (next) url.searchParams.set("q", next); else url.searchParams.delete("q"); setLocation(`${url.pathname}${url.search}`); };
  const choices = useMemo(() => ({ region: facets?.regions ?? [], tradition: facets?.traditions ?? [], era: facets?.eras ?? [], category: facets?.categories ?? [], genre: facets?.categories ?? [], instrument: ["Instrument"], language: ["Sanskrit", "Arabic"], confidence: ["primary", "high", "medium", "low"] }), [facets]);

  return <div className="research-page">
    <SiteHeader />
    <main className="research-shell">
      <header className="research-hero">
        <p className="eyebrow">Research search</p>
        <h1>Search the language of music.</h1>
        <p>Exact terms, alternate spellings, native scripts, transliterations, definitions, and relationship context are ranked together—without treating a contextual match as equivalence.</p>
        <label className="research-search-field" htmlFor="research-search"><Search size={21} strokeWidth={1.5} /><input id="research-search" value={query} onChange={event => updateQuery(event.target.value)} placeholder="Try raga, राग, Arabic mode, or three against two rhythm" autoComplete="off" /><span>⌘ K</span></label>
      </header>

      <div className="research-layout">
        <aside className="research-filters" aria-label="Search filters">
          <div className="research-filters__heading"><div><Filter size={16} strokeWidth={1.5} /><span>Refine results</span></div>{activeFilterCount ? <button type="button" onClick={() => setFilters({})}>Clear {activeFilterCount}</button> : null}</div>
          {filterLabels.map(key => <label key={key}><span>{key}</span><select value={filters[key] ?? ""} onChange={event => setFilters(current => ({ ...current, [key]: (key === "confidence" ? event.target.value || undefined : event.target.value || undefined) } as ResearchFilterState))}><option value="">Any {key}</option>{choices[key].map(value => <option key={value} value={value}>{value}</option>)}</select></label>)}
        </aside>
        <section className="research-results" aria-live="polite">
          <div className="research-results__heading"><div><p className="eyebrow">{query ? "Matching source-grounded records" : "Start with a concept or a question"}</p><h2>{search.data?.total ?? 0} records</h2></div><SlidersHorizontal size={19} strokeWidth={1.5} /></div>
          <p className="research-results__notice">{search.data?.researchNotice ?? "Preparing Sonata’s research index…"}</p>
          {search.isLoading ? <div className="research-empty">Searching the published knowledge graph…</div> : null}
          {!search.isLoading && !search.data?.items.length ? <div className="research-empty"><Search size={22} strokeWidth={1.5} /><p>No published record matches this query yet. Try a broader term or explore a pathway below.</p></div> : null}
          <div className="research-result-list">{search.data?.items.map(record => <SearchResult key={record.publicId} record={record} />)}</div>
        </section>
      </div>
      <section className="research-pathways"><p className="eyebrow">Discovery pathways</p><div>{["Region", "Tradition", "Genre", "Era", "Instrument", "Theory", "Rhythm", "Melody", "Harmony", "Culture"].map(pathway => <Link key={pathway} href={`/search?q=${encodeURIComponent(pathway)}`}>{pathway}<ArrowRight size={14} /></Link>)}</div></section>
    </main>
  </div>;
}
