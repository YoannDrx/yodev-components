import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SourceFilter } from "@/components/gallery/source-filter";
import { getFamilies, getFamily } from "@/lib/catalog";

type Props = { params: Promise<{ family: string }> };

export function generateStaticParams() {
  return getFamilies().map((family) => ({ family: family.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { family: slug } = await params;
  const family = getFamily(slug);
  return family
    ? {
        title: family.title,
        description: `${family.components.length} variantes React.`,
      }
    : {};
}

export default async function FamilyPage({ params }: Props) {
  const { family: slug } = await params;
  const family = getFamily(slug);
  if (!family) notFound();
  return (
    <div className="page-shell">
      <Link className="back-link" href="/">
        ← Toutes les familles
      </Link>
      <header className="page-heading">
        <p className="eyebrow">Famille</p>
        <h1>{family.title}</h1>
        <p>{family.components.length} ports React TypeScript à explorer.</p>
      </header>
      <SourceFilter components={family.components} />
    </div>
  );
}
