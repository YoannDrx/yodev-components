import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  ["◈", "Vue d’ensemble", "/"],
  ["▦", "Composants", "/components"],
  ["⌘", "Dépôts", "/repositories"],
  ["◇", "Librairie YoDev", "/library"],
  ["○", "À trier", "/inbox"],
  ["i", "À propos", "/about"],
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="shell-sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">YD</span>
          <span>
            YoDev <em>Components</em>
          </span>
        </Link>
        <p className="side-label">Explorer</p>
        <nav className="side-nav" aria-label="Navigation principale">
          {nav.map(([glyph, label, href]) => (
            <Link key={href} href={href}>
              <span className="nav-glyph">{glyph}</span>
              {label}
            </Link>
          ))}
        </nav>
        <div className="side-footer">
          <ThemeToggle />
          <p>Catalogue visuel et composants React originaux.</p>
        </div>
      </aside>
      <main className="shell-main">
        <header className="topbar">
          <span className="topbar-kicker">
            Bibliothèque personnelle · Frontend
          </span>
          <div className="topbar-links">
            <a
              href="https://github.com/frontend-joe"
              target="_blank"
              rel="noreferrer"
            >
              Source Joe ↗
            </a>
            <a
              href="https://github.com/YoannDrx/yodev-components"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
