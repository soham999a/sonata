import { ChevronRight } from "lucide-react";

export function TaxonomyRibbon({ path }: { path: string[] }) {
  return (
    <nav className="taxonomy-ribbon" aria-label="Taxonomy path">
      {path.map((item, index) => (
        <span className="taxonomy-ribbon__part" key={`${item}-${index}`}>
          <span>{item}</span>
          {index < path.length - 1 ? <ChevronRight size={12} strokeWidth={1.5} aria-hidden="true" /> : null}
        </span>
      ))}
    </nav>
  );
}
