/**
 * STYLE: Editorial Cartography. A compact brand unit with the supplied Sonata
 * application mark as its durable product identifier.
 */
import { Link } from "wouter";

type SonataMarkProps = {
  inverted?: boolean;
};

export function SonataMark({ inverted = false }: SonataMarkProps) {
  return (
    <Link href="/" aria-label="Sonata home" className={`sonata-mark ${inverted ? "sonata-mark--inverted" : ""}`}>
      <span className="sonata-mark__symbol-frame" aria-hidden="true">
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663126664570/ZhrehmHxfBttGhjk.png"
          alt=""
          className="sonata-mark__symbol"
        />
      </span>
      <span className="sonata-mark__word">Sonata</span>
    </Link>
  );
}
