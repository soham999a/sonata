/**
 * STYLE: Editorial Cartography. A compact brand unit with the supplied Sonata
 * application mark as its durable product identifier.
 */
import { Link } from "wouter";

type SonataMarkProps = {
  inverted?: boolean;
  compact?: boolean;
};

export function SonataMark({ inverted = false, compact = false }: SonataMarkProps) {
  return (
    <Link href="/" className={`sonata-mark ${inverted ? "sonata-mark--inverted" : ""}`}>
      <img
        src="/manus-storage/sonata-app-icon_7aa2060e.png"
        alt="Sonata"
        className="sonata-mark__symbol"
      />
      {!compact ? <span className="sonata-mark__word">Sonata</span> : null}
    </Link>
  );
}
