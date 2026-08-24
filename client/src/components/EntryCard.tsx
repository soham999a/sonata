/**
 * STYLE: Editorial Cartography. Cards remain low-chrome and typographic, with
 * thin rules and the taxonomy metadata acting as the visual anchor.
 */
import { ArrowUpRight, Network } from "lucide-react";
import { Link } from "wouter";
import type { SonataEntryCard as SonataEntryCardData } from "../../../server/sonata.demo";

export function EntryCard({ entry, index = 0 }: { entry: SonataEntryCardData; index?: number }) {
  return (
    <Link href={`/entries/${entry.slug}`} className="entry-card" style={{ animationDelay: `${index * 55}ms` }}>
      <div className="entry-card__topline">
        <span className="eyebrow">{entry.entityType}</span>
        <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div className="entry-card__title-wrap">
        <h3>{entry.name}</h3>
        {entry.originalName ? <span className="entry-card__original">{entry.originalName}</span> : null}
      </div>
      <p>{entry.shortDefinition}</p>
      <div className="entry-card__footer">
        <span>{entry.tradition}</span>
        <span className="entry-card__relationship" title="Visible relationship count in this foundation preview">
          <Network size={13} strokeWidth={1.5} aria-hidden="true" />
          {entry.relationshipCount}
        </span>
      </div>
    </Link>
  );
}
