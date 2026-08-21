"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CatalogItem } from "@yodev/catalog-core";
import { CatalogCard } from "./catalog-card";

const PAGE_SIZE = 48;

export function CatalogExplorer({ items }: { items: CatalogItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const values = {
    q: params.get("q") ?? "",
    tech: params.get("tech") ?? "",
    type: params.get("type") ?? "",
    status: params.get("status") ?? "",
    preview: params.get("preview") ?? "",
    page: Math.max(1, Number(params.get("page")) || 1),
  };
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };
  const technologies = useMemo(
    () => [...new Set(items.flatMap((item) => item.technologies))].sort(),
    [items],
  );
  const types = useMemo(
    () => [...new Set(items.map((item) => item.componentType))].sort(),
    [items],
  );
  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const haystack = [
          item.name,
          item.repositoryId,
          item.componentType,
          ...item.tags,
        ]
          .join(" ")
          .toLowerCase();
        return (
          (!values.q || haystack.includes(values.q.toLowerCase())) &&
          (!values.tech || item.technologies.includes(values.tech as never)) &&
          (!values.type || item.componentType === values.type) &&
          (!values.status || item.reviewStatus === values.status) &&
          (!values.preview || item.preview.type === values.preview)
        );
      }),
    [items, values.q, values.tech, values.type, values.status, values.preview],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(values.page, pageCount);
  const visibleItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  return (
    <>
      <div className="filters" aria-label="Filtres du catalogue">
        <input
          type="search"
          value={values.q}
          onChange={(event) => update("q", event.target.value)}
          placeholder="Rechercher un composant ou un dépôt…"
          aria-label="Rechercher"
        />
        <select
          value={values.tech}
          onChange={(event) => update("tech", event.target.value)}
          aria-label="Technologie"
        >
          <option value="">Toutes technologies</option>
          {technologies.map((tech) => (
            <option key={tech}>{tech}</option>
          ))}
        </select>
        <select
          value={values.type}
          onChange={(event) => update("type", event.target.value)}
          aria-label="Catégorie"
        >
          <option value="">Toutes catégories</option>
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <select
          value={values.status}
          onChange={(event) => update("status", event.target.value)}
          aria-label="Statut"
        >
          <option value="">Tous statuts</option>
          <option value="new">Nouveau</option>
          <option value="reviewed">Revu</option>
          <option value="favorite">Favori</option>
          <option value="adapted">Adapté</option>
          <option value="unavailable">Indisponible</option>
        </select>
        <select
          value={values.preview}
          onChange={(event) => update("preview", event.target.value)}
          aria-label="Type d’aperçu"
        >
          <option value="">Tous aperçus</option>
          <option value="static-srcdoc">Interactif</option>
          <option value="external">Externe</option>
          <option value="owned">YoDev</option>
          <option value="none">Référence</option>
        </select>
      </div>
      <p className="result-count">
        {filtered.length} résultat{filtered.length > 1 ? "s" : ""} sur{" "}
        {items.length}
      </p>
      {filtered.length ? (
        <>
          <div className="card-grid">
            {visibleItems.map((item) => (
              <CatalogCard key={item.id} item={item} />
            ))}
          </div>
          {pageCount > 1 ? (
            <nav className="pagination" aria-label="Pagination du catalogue">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => update("page", String(currentPage - 1))}
              >
                Précédent
              </button>
              <span aria-live="polite">
                Page {currentPage} sur {pageCount}
              </span>
              <button
                type="button"
                disabled={currentPage === pageCount}
                onClick={() => update("page", String(currentPage + 1))}
              >
                Suivant
              </button>
            </nav>
          ) : null}
        </>
      ) : (
        <div className="empty">
          Aucun composant ne correspond à ces filtres.
        </div>
      )}
    </>
  );
}
