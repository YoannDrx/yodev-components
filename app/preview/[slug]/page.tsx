import { notFound } from "next/navigation";
import { ComponentRenderer } from "@/components/library/component-renderer";
import { getComponent, getComponents } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getComponents().map((component) => ({ slug: component.slug }));
}

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) notFound();
  return (
    <div className="standalone-preview">
      <ComponentRenderer
        className="library-frame"
        loading="eager"
        slug={slug}
        title={component.title}
      />
    </div>
  );
}
