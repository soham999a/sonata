/**
 * STYLE: Editorial Cartography. An intentionally sparse relationship view that
 * feels like a research annotation, not a generic or overly dense graph tool.
 */
import { Link } from "wouter";

type ConstellationNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  emphasis?: "main" | "accent";
};

export function RelationshipConstellation({ nodes }: { nodes: ConstellationNode[] }) {
  const central = nodes.find(node => node.emphasis === "main") ?? nodes[0];

  return (
    <div className="constellation" aria-label="Relationship constellation">
      <img
        src="/manus-storage/sonata-relationship-constellation_2f8c7755.jpg"
        alt="Abstract brass linework representing concept relationships"
        className="constellation__texture"
      />
      <div className="constellation__lines" aria-hidden="true">
        {nodes
          .filter(node => node.id !== central?.id)
          .map(node => {
            const dx = node.x - (central?.x ?? 50);
            const dy = node.y - (central?.y ?? 50);
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            return (
              <span
                key={`line-${node.id}`}
                className="constellation__line"
                style={{
                  width: `${length}%`,
                  left: `${central?.x ?? 50}%`,
                  top: `${central?.y ?? 50}%`,
                  transform: `rotate(${angle}deg)`,
                }}
              />
            );
          })}
      </div>
      {nodes.map(node => (
        <Link
          href={node.id === "raga" ? "/entries/raga" : "/"}
          key={node.id}
          className={`constellation__node constellation__node--${node.emphasis ?? "quiet"}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          title={`Explore ${node.label}`}
        >
          <span className="constellation__dot" />
          <span>{node.label}</span>
        </Link>
      ))}
    </div>
  );
}
