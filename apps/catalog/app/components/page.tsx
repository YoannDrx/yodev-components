import { Suspense } from "react";
import { CatalogExplorer } from "@/components/catalog-explorer";
import { getCatalogItems } from "@/lib/catalog";

export default function ComponentsPage() {
  const items = getCatalogItems();
  return (
    <div className="page">
      <p className="eyebrow">Catalogue complet</p>
      <h1 className="page-title">Tout voir, sans tout mélanger.</h1>
      <p className="page-intro">
        Filtre les références par technologie, catégorie, statut ou type
        d’aperçu. Chaque fiche conserve son chemin et son commit d’origine.
      </p>
      <Suspense fallback={<div className="empty">Chargement des filtres…</div>}>
        <CatalogExplorer items={items} />
      </Suspense>
    </div>
  );
}
