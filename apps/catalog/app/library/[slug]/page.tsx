import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LibraryPreview } from "@/components/library-preview";
import { getLibraryItem, libraryItems, type LibrarySlug } from "@/lib/library";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return libraryItems.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getLibraryItem((await params).slug);
  return item ? { title: item.name, description: item.description } : {};
}

export default async function LibraryDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getLibraryItem(slug);
  if (!item) notFound();
  const importName = item.name;
  return (
    <div className="page">
      <div className="detail-head">
        <div>
          <p className="eyebrow">Adaptation YoDev · {item.category}</p>
          <h1>{item.name}</h1>
          <p className="page-intro">{item.description}</p>
        </div>
        <div className="detail-actions">
          <a href={item.inspiration} target="_blank" rel="noreferrer">
            Inspiration ↗
          </a>
        </div>
      </div>
      <section className="library-stage">
        <LibraryPreview slug={slug as LibrarySlug} />
      </section>
      <pre className="code-box">
        <code>{`import { ${importName} } from "@yodev/components";\nimport "@yodev/components/styles.css";`}</code>
      </pre>
      <div className="prose">
        <h2>Une adaptation, pas une copie</h2>
        <p>
          Ce composant a été redessiné et réimplémenté pour YoDev avec une API
          React typée, des styles préfixés et des comportements accessibles. La
          référence visuelle d’origine est attribuée à Frontend Joe.
        </p>
        <h2>Contrat de réutilisation</h2>
        <p>
          Le composant accepte une classe CSS additionnelle et les attributs
          natifs pertinents. React et React DOM restent des peer dependencies ;
          aucun runtime Tailwind n’est requis.
        </p>
      </div>
    </div>
  );
}
