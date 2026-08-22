import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComponentWorkbench } from "@/components/gallery/component-workbench";
import { getComponent, getComponents } from "@/lib/catalog";
import { familyLabel, sourceLabels } from "@/lib/labels";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getComponents().map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponent(slug);
  return component
    ? {
        title: component.title,
        description: `${component.exportName}, port React TypeScript.`,
      }
    : {};
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) notFound();
  return (
    <div className="page-shell detail-page">
      <Link className="back-link" href={`/families/${component.family}`}>
        ← {familyLabel(component.family)}
      </Link>
      <header className="detail-heading">
        <div>
          <p className="eyebrow">
            {sourceLabels[component.sourceRepository]} ·{" "}
            {familyLabel(component.family)}
          </p>
          <h1>{component.title}</h1>
          <code>{component.exportName}</code>
        </div>
        <a
          className="source-link"
          href={component.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          Voir la source ↗
        </a>
      </header>
      <ComponentWorkbench slug={component.slug} title={component.title} />
      <section className="provenance" aria-labelledby="provenance-title">
        <div>
          <p className="eyebrow">Provenance</p>
          <h2 id="provenance-title">Port React TypeScript autorisé</h2>
          <p>
            Création originale de{" "}
            <a href="https://github.com/frontend-joe">Frontend Joe</a>. YoDev
            fournit ici une enveloppe React isolée pour la visualisation.
          </p>
        </div>
        <dl>
          <div>
            <dt>Dépôt</dt>
            <dd>{component.sourceRepository}</dd>
          </div>
          <div>
            <dt>Chemin</dt>
            <dd>{component.sourcePath}</dd>
          </div>
          <div>
            <dt>Commit/source</dt>
            <dd>
              <code>{component.sourceSha.slice(0, 12)}</code>
            </dd>
          </div>
          <div>
            <dt>Statut</dt>
            <dd>{component.portStatus}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
