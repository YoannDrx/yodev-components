import Link from "next/link";
import { getCatalogItems } from "@/lib/catalog";
import { libraryItems } from "@/lib/library";

export default function LibraryPage() {
  const catalogItems = getCatalogItems();
  const covered = catalogItems.filter((item) => item.librarySlug).length;
  const interactive = catalogItems.filter(
    (item) => item.preview.type === "static-srcdoc",
  ).length;
  const intentionalFallbacks = catalogItems.filter(
    (item) => item.preview.type === "none",
  ).length;
  return (
    <div className="page">
      <p className="eyebrow">@yodev/components · v0.1.0</p>
      <h1 className="page-title">
        Toutes les familles utiles, prêtes à vivre ailleurs.
      </h1>
      <p className="page-intro">
        Ces {libraryItems.length} composants couvrent les principales familles
        réutilisables repérées. Chaque pièce est une réécriture React typée,
        accessible et indépendante du catalogue. Les références de Joe restent
        visibles, mais leur code n’est jamais copié dans le package.
      </p>
      <section className="stats" aria-label="Couverture des adaptations">
        <div className="stat">
          <strong>{libraryItems.length}</strong>
          <span>composants React originaux</span>
        </div>
        <div className="stat">
          <strong>{covered}</strong>
          <span>références couvertes par famille</span>
        </div>
        <div className="stat">
          <strong>{interactive}</strong>
          <span>sources interactives conservées</span>
        </div>
        <div className="stat">
          <strong>{intentionalFallbacks}</strong>
          <span>dépôts sans composant à afficher</span>
        </div>
      </section>
      <div className="section card-grid">
        {libraryItems.map((item) => (
          <Link
            key={item.slug}
            className="catalog-card"
            href={`/library/${item.slug}`}
          >
            <div className="card-preview">
              <span>YD</span>
            </div>
            <div className="card-meta">
              <span>{item.category}</span>
              <span className="badge green">Original</span>
            </div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
