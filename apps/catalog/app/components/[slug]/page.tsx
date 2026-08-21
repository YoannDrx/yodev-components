import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalogItems, getItemBySlug, getManifest } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCatalogItems()
    .filter((item) => item.reviewStatus !== "unavailable")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  return item
    ? {
        title: item.name,
        description: `${item.componentType} provenant de ${item.repositoryId}.`,
      }
    : {};
}

export default async function ComponentDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) notFound();
  const repository = getManifest().repositories.find(
    (value) => value.id === item.repositoryId,
  );
  const preview = item.preview;
  return (
    <div className="page">
      <div className="detail-head">
        <div>
          <p className="eyebrow">
            {item.componentType} · {item.technologies.join(" · ")}
          </p>
          <h1>{item.name}</h1>
        </div>
        <div className="detail-actions">
          <a href={item.sourceUrl} target="_blank" rel="noreferrer">
            Voir la source ↗
          </a>
          {repository ? (
            <Link href={`/repositories/${repository.name}`}>Voir le dépôt</Link>
          ) : null}
        </div>
      </div>
      <div className="detail-grid">
        <section className="preview-panel" aria-label="Aperçu du composant">
          {preview.type === "static-srcdoc" ? (
            <iframe
              className="preview-frame"
              src={`/api/preview/${item.slug}`}
              sandbox="allow-scripts"
              referrerPolicy="no-referrer"
              title={`Aperçu de ${item.name}`}
            />
          ) : preview.type === "external" ? (
            <iframe
              className="preview-frame"
              src={preview.url}
              sandbox="allow-scripts"
              referrerPolicy="no-referrer"
              title={`Démo externe de ${item.name}`}
            />
          ) : preview.type === "owned" ? (
            <div className="preview-fallback">
              <div>
                <p>Ce composant possède une adaptation YoDev interactive.</p>
                <Link className="cta" href={`/library/${preview.librarySlug}`}>
                  Ouvrir l’adaptation
                </Link>
              </div>
            </div>
          ) : (
            <div className="preview-fallback">
              <div>
                <strong>Aperçu isolé non disponible</strong>
                <p>{preview.reason}</p>
                <a
                  className="cta secondary"
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Inspecter sur GitHub ↗
                </a>
              </div>
            </div>
          )}
        </section>
        <aside className="meta-panel">
          <dl className="meta-list">
            <div>
              <dt>Statut</dt>
              <dd>
                <span
                  className={`badge ${item.reviewStatus === "adapted" ? "green" : "accent"}`}
                >
                  {item.reviewStatus}
                </span>
              </dd>
            </div>
            <div>
              <dt>Licence</dt>
              <dd>
                <span
                  className={`badge ${item.licenseStatus === "licensed" ? "green" : "amber"}`}
                >
                  {repository?.licenseSpdx ?? "Aucune licence identifiée"}
                </span>
              </dd>
            </div>
            <div>
              <dt>Dépôt</dt>
              <dd>{item.repositoryId.replace("github:", "")}</dd>
            </div>
            <div>
              <dt>Chemin</dt>
              <dd>{item.sourcePath || "Racine du dépôt"}</dd>
            </div>
            <div>
              <dt>Commit</dt>
              <dd>
                <code>{item.sourceSha.slice(0, 12)}</code>
              </dd>
            </div>
            <div>
              <dt>Tags</dt>
              <dd className="tag-row">
                {item.tags.map((tag) => (
                  <span className="badge" key={tag}>
                    {tag}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Attribution</dt>
              <dd>
                Création originale de{" "}
                <a
                  href="https://github.com/frontend-joe"
                  target="_blank"
                  rel="noreferrer"
                >
                  Frontend Joe
                </a>
                . YoDev affiche uniquement une référence isolée.
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
