import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogCard } from "@/components/catalog-card";
import {
  getItemsForRepository,
  getRepositories,
  getRepository,
} from "@/lib/catalog";

type Props = { params: Promise<{ repo: string }> };
export function generateStaticParams() {
  return getRepositories().map((repository) => ({ repo: repository.name }));
}
export default async function RepositoryPage({ params }: Props) {
  const { repo } = await params;
  const repository = getRepository(repo);
  if (!repository) notFound();
  const items = getItemsForRepository(repository.id);
  return (
    <div className="page">
      <div className="detail-head">
        <div>
          <p className="eyebrow">
            {repository.kind} · {repository.technologies.join(" · ")}
          </p>
          <h1>{repository.name}</h1>
          <p className="page-intro">
            {repository.description ?? "Aucune description fournie."}
          </p>
        </div>
        <div className="detail-actions">
          <a href={repository.url} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          {repository.homepage ? (
            <a href={repository.homepage} target="_blank" rel="noreferrer">
              Démo ↗
            </a>
          ) : null}
        </div>
      </div>
      <div className="notice">
        Commit indexé : <code>{repository.headSha.slice(0, 12)}</code> · Licence
        : {repository.licenseSpdx ?? "non détectée"} · Mise à jour :{" "}
        {new Date(repository.pushedAt).toLocaleDateString("fr-FR")}
      </div>
      <section className="section">
        <div className="section-heading">
          <h2>
            {items.length} référence{items.length > 1 ? "s" : ""}
          </h2>
          <Link href="/components">Catalogue complet →</Link>
        </div>
        <div className="card-grid">
          {items.map((item) => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
