import Link from "next/link";
import type { CatalogItem } from "@yodev/catalog-core";

export function CatalogCard({ item }: { item: CatalogItem }) {
  const previewLabel =
    item.preview.type === "static-srcdoc"
      ? "Aperçu direct"
      : item.preview.type === "owned"
        ? "Adaptation YoDev"
        : item.preview.type === "external"
          ? "Démo externe"
          : "Référence";
  return (
    <Link className="catalog-card" href={`/components/${item.slug}`}>
      <div className="card-preview">
        <span>{item.name.slice(0, 2).toUpperCase()}</span>
      </div>
      <div className="card-meta">
        <span>{item.componentType}</span>
        <span>·</span>
        <span>{previewLabel}</span>
      </div>
      <h3>{item.name}</h3>
      <p>
        {item.repositoryId.replace("github:frontend-joe/", "frontend-joe/")}
      </p>
    </Link>
  );
}
