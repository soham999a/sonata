/**
 * STYLE: Editorial Cartography. A slim, rule-led top navigation with a
 * responsive disclosure rather than a standard oversized product header.
 */
import { Compass, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { SonataMark } from "./SonataMark";

export function SiteHeader({ inverse = false }: { inverse?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const canAccessEditorial = user?.role === "admin";
  const navigation = [
    { label: "Discover", href: "/#discover" },
    { label: "Atlas", href: "/#atlas" },
    { label: "Method", href: "/#method" },
  ];

  return (
    <header className={`site-header ${inverse ? "site-header--inverse" : ""}`}>
      <div className="site-header__inner">
        <SonataMark inverted={inverse} />
        <nav className={`site-header__nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navigation.map(item => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          {canAccessEditorial ? <Link href="/editorial" onClick={() => setMenuOpen(false)}>Editorial</Link> : null}
        </nav>
        <div className="site-header__actions">
          <button
            type="button"
            className="icon-button icon-button--search"
            aria-label="Focus the Sonata search"
            title="Focus search"
            onClick={() => {
              document.getElementById("sonata-search")?.focus();
              setLocation("/#discover");
            }}
          >
            <Search size={18} strokeWidth={1.7} />
          </button>
          {canAccessEditorial ? <Link href="/editorial" className="header-editorial-link"><Compass size={15} strokeWidth={1.7} aria-hidden="true" /><span>Workbench</span></Link> : null}
          <button
            type="button"
            className="icon-button icon-button--menu"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            title={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? <X size={19} strokeWidth={1.7} /> : <Menu size={19} strokeWidth={1.7} />}
          </button>
        </div>
      </div>
    </header>
  );
}
