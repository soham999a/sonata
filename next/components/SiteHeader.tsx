"use client";

import { Compass, Menu, Search, Sparkles, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { SonataMark } from "./SonataMark";
import { useAuth } from "./AuthProvider";

const NAVIGATION = [
  { label: "Discover", href: "/#discover" },
  { label: "Search", href: "/search" },
  { label: "Compare", href: "/compare" },
  { label: "Learn", href: "/learn" },
];

export function SiteHeader({ inverse = false }: { inverse?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const canAccessEditorial = user?.isAdmin === true;

  return (
    <header className={`site-header ${inverse ? "site-header--inverse" : ""}`}>
      <div className="site-header__inner">
        <SonataMark inverse={inverse} />
        <nav className={`site-header__nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {NAVIGATION.map(item =>
            item.href.startsWith("/#") ? (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ),
          )}
          {canAccessEditorial ? (
            <Link href="/editorial" onClick={() => setMenuOpen(false)}>
              Editorial
            </Link>
          ) : null}
        </nav>
        <div className="site-header__actions">
          <Link href="/assistant" className="icon-button icon-button--search" aria-label="Open Sonata assistant" title="Sonata assistant">
            <Sparkles size={17} strokeWidth={1.6} />
          </Link>
          <Link href="/search" className="icon-button icon-button--search site-header__search-shortcut" aria-label="Search Sonata" title="Focus search">
            <Search size={18} strokeWidth={1.7} />
          </Link>
          {canAccessEditorial ? (
            <Link href="/editorial" className="header-editorial-link">
              <Compass size={15} strokeWidth={1.7} aria-hidden="true" />
              <span>Workbench</span>
            </Link>
          ) : null}
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
