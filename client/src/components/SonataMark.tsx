/**
 * STYLE: Editorial Cartography. A compact brand unit with geometric restraint;
 * it uses the generated abstract mark rather than literal music symbolism.
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
        src="/manus-storage/sonata-brand-mark_6fafe208.png"
        alt=""
        aria-hidden="true"
        className="sonata-mark__symbol"
      />
      {!compact ? <span className="sonata-mark__word">Sonata</span> : null}
    </Link>
  );
}
