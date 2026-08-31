import Link from "next/link";
import { cn } from "@/lib/utils";

export function SonataMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={cn("sonata-mark", inverse && "sonata-mark--inverted")} aria-label="Sonata home">
      <span className="sonata-mark__symbol-frame">
        <span className="sonata-mark__symbol" role="img" aria-hidden="true" />
      </span>
      <span className="sonata-mark__word">Sonata</span>
    </Link>
  );
}
