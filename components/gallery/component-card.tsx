import Link from "next/link";
import type { ComponentManifestRecord } from "@/lib/catalog-schema";
import { sourceLabels } from "@/lib/labels";

export function ComponentCard({
  component,
}: {
  component: ComponentManifestRecord;
}) {
  return (
    <Link className="component-card" href={`/components/${component.slug}`}>
      <div className="component-thumbnail">
        {/* eslint-disable-next-line @next/next/no-img-element -- generated local gallery asset */}
        <img src={`/thumbnails/${component.slug}.webp`} alt="" loading="lazy" />
        <span aria-hidden="true">{component.exportName.slice(0, 2)}</span>
      </div>
      <div className="card-copy">
        <span className="source-pill">
          {sourceLabels[component.sourceRepository]}
        </span>
        <h3>{component.title}</h3>
        <p>{component.exportName}</p>
      </div>
    </Link>
  );
}
