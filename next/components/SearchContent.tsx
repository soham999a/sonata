"use client";

import { ArrowRight, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { rankResearchRecords, type SearchFilters, type ResearchSearchRecord } from "@/lib/domain/sonata-research";

function buildFacetLabels(records: ResearchSearchRecord[]): Array<{ key: keyof SearchFilters; label: string; options: string[] }> {
  const uniq = (values: Array<string | undefined>) => [...new Set(values.filter((v): v is string => Boolean(v)))];
  return [
    { key: "region", label: "Region", options: uniq(records.map(r => r.region)) },
    { key: "tradition", label: "Tradition", options: uniq(records.map(r => r.tradition)) },
    { key: "category", label: "Category", options: uniq(records.map(r => r.category)) },
  ];
}

function SearchPageContent({ initialRecords }: { initialRecords: ResearchSearchRecord[] }) {
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>({});

  const facetLabels = useMemo(() => buildFacetLabels(initialRecords), [initialRecords]);
  const results = useMemo(() => rankResearchRecords(initialRecords, query, filters).slice(0, 100), [query, filters, initialRecords]);

  return (
    <div className="research-page">
      <SiteHeader />
      <main className="research-shell">
        <header className="research-hero">
          <p className="eyebrow eyebrow--brass">Research search</p>
          <h1>Search knowledge with context, not flattening.</h1>
          <p>
            Results are ranked by exact name, native script, transliteration, and cultural-context matching — never by treating every tradition as equivalent.
          </p>
        </header>

        <div className="research-search-field">
          <Search size={20} strokeWidth={1.5} aria-hidden="true" />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search a term, a tradition, a transliteration…"
            autoComplete="off"
          />
        </div>

        <div className="research-layout">
          <aside className="research-filters">
            <div className="research-filters__heading">
              <div>
                <strong>Refine</strong>
              </div>
            </div>
            {facetLabels.map(facet => (
              <label key={facet.key}>
                {facet.label}
                <select
                  value={filters[facet.key] ?? ""}
                  onChange={event => setFilters(prev => ({ ...prev, [facet.key]: event.target.value || undefined }))}
                >
                  <option value="">Any</option>
                  {facet.options.map(option => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </aside>

          <section className="research-results">
            <div className="research-results__heading">
              <div>
                <p className="eyebrow">{query ? "Ranked results" : "Foundation records"}</p>
                <h2>{query ? `“${query}”` : "All catalogue starting points"}</h2>
              </div>
              <span className="eyebrow">{results.length.toString().padStart(2, "0")} records</span>
            </div>

            {results.length === 0 ? (
              <div className="research-empty">
                <Sparkles size={20} strokeWidth={1.5} aria-hidden="true" />
                <p>No matching record. Try a broader term or clear a filter.</p>
              </div>
            ) : null}

            <div className="research-result-list">
              {results.map((record, index) => (
                <Link href={`/entries/${record.slug}`} key={record.slug} className="research-result">
                  <span className="research-result__index">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{record.region}</span>
                  </span>
                  <div>
                    <p className="eyebrow">
                      {record.entityType} · {record.tradition}
                    </p>
                    <h2>
                      {record.name}
                      {record.originalName ? <em> · {record.originalName}</em> : null}
                    </h2>
                    <p>{record.shortDefinition}</p>
                  </div>
                  <div className="research-result__meta">
                    <span>{record.matchReasons.slice(0, 2).join(", ") || "foundation record"}</span>
                    <span>{record.score} match</span>
                    <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export function SearchContent({ initialRecords }: { initialRecords: ResearchSearchRecord[] }) {
  return (
    <Suspense fallback={null}>
      <SearchPageContent initialRecords={initialRecords} />
    </Suspense>
  );
}
