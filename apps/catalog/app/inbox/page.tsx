import { CatalogCard } from "@/components/catalog-card";
import { getCatalogItems } from "@/lib/catalog";

export default function InboxPage() {
  const items = getCatalogItems().filter((item) => item.reviewStatus === "new");
  return (
    <div className="page">
      <p className="eyebrow">Curation Git</p>
      <h1 className="page-title">À observer, classer, puis garder.</h1>
      <p className="page-intro">
        Ces références ont été détectées automatiquement mais n’ont pas encore
        été revues. Les décisions durables sont enregistrées dans
        `catalog/curation` et passent par une pull request.
      </p>
      <p className="result-count">
        {items.length} élément{items.length > 1 ? "s" : ""} à trier
      </p>
      {items.length ? (
        <div className="card-grid">
          {items.slice(0, 120).map((item) => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="empty">Tout est classé pour le moment.</div>
      )}
    </div>
  );
}
