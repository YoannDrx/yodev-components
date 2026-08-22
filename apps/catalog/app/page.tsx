import Link from "next/link";
import { getCatalogItems, getManifest } from "@/lib/catalog";
import { libraryItems } from "@/lib/library";
import { CatalogCard } from "@/components/catalog-card";

export default function HomePage() {
  const manifest = getManifest();
  const items = getCatalogItems();
  const live = items.filter(
    (item) => item.preview.type === "static-srcdoc",
  ).length;
  const newItems = items
    .filter((item) => item.reviewStatus === "new")
    .slice(0, 6);
  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Atelier frontend personnel</p>
          <h1 className="page-title">
            Des idées brillantes.
            <br />
            Une librairie à toi.
          </h1>
          <p className="page-intro">
            Explore les créations de Frontend Joe par technologie et par
            catégorie, puis transforme tes favoris en composants React robustes
            et réutilisables.
          </p>
          <div className="hero-actions">
            <Link className="cta" href="/components">
              Explorer le catalogue
            </Link>
            <Link className="cta secondary" href="/library">
              Voir les adaptations
            </Link>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit-label">CSS · JS · ES6 · React</span>
        </div>
      </section>
      <section className="stats" aria-label="Statistiques">
        <div className="stat">
          <strong>{manifest.repositories.length}</strong>
          <span>dépôts indexés</span>
        </div>
        <div className="stat">
          <strong>{items.length}</strong>
          <span>références détectées</span>
        </div>
        <div className="stat">
          <strong>{live}</strong>
          <span>aperçus interactifs</span>
        </div>
        <div className="stat">
          <strong>{libraryItems.length}</strong>
          <span>adaptations YoDev</span>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>Fraîchement découvert</h2>
          <Link href="/inbox">Tout voir →</Link>
        </div>
        {newItems.length ? (
          <div className="card-grid">
            {newItems.map((item) => (
              <CatalogCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty">
            Lance `pnpm catalog:sync` pour remplir le catalogue.
          </div>
        )}
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>Le kit YoDev</h2>
          <Link href="/library">Les {libraryItems.length} composants →</Link>
        </div>
        <div className="card-grid">
          {libraryItems.slice(0, 6).map((item) => (
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
      </section>
    </div>
  );
}
