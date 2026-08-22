"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
type FamilySummary = {
  slug: string;
  title: string;
  count: number;
  searchText: string;
};

export function LibraryExplorer({ families }: { families: FamilySummary[] }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      families.filter((family) => {
        if (!normalized) return true;
        return [family.title, family.slug, family.searchText]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      }),
    [families, normalized],
  );
  return (
    <section aria-labelledby="families-title">
      <div className="search-row">
        <label>
          <span className="sr-only">Rechercher un composant</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher Card, Sidebar, React…"
          />
        </label>
        <span aria-live="polite">
          {visible.length} famille{visible.length > 1 ? "s" : ""}
        </span>
      </div>
      <h2 className="section-title" id="families-title">
        Toutes les familles
      </h2>
      {visible.length ? (
        <div className="family-grid">
          {visible.map((family, index) => (
            <Link
              className="family-card"
              href={`/families/${family.slug}`}
              key={family.slug}
              style={{ "--family-index": index } as React.CSSProperties}
            >
              <span className="family-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{family.title}</h3>
                <p>
                  {family.count} composant{family.count > 1 ? "s" : ""}
                </p>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">Aucune famille ne correspond.</div>
      )}
    </section>
  );
}
