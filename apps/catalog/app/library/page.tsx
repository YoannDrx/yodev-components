import Link from "next/link";
import { libraryItems } from "@/lib/library";

export default function LibraryPage() {
  return (
    <div className="page">
      <p className="eyebrow">@yodev/components · v0.1.0</p>
      <h1 className="page-title">
        Dix pièces originales, prêtes à vivre ailleurs.
      </h1>
      <p className="page-intro">
        Chaque composant est une réécriture React typée, accessible et
        indépendante du catalogue. Les références de Joe restent visibles, mais
        leur code n’est jamais copié dans le package.
      </p>
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
