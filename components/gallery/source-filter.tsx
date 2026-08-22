"use client";

import { useMemo, useState } from "react";
import { ComponentCard } from "./component-card";
import type {
  ComponentManifestRecord,
  SourceRepository,
} from "@/lib/catalog-schema";
import { sourceLabels } from "@/lib/labels";

export function SourceFilter({
  components,
}: {
  components: ComponentManifestRecord[];
}) {
  const [source, setSource] = useState<SourceRepository | "all">("all");
  const sources = useMemo(
    () => [
      ...new Set(components.map((component) => component.sourceRepository)),
    ],
    [components],
  );
  const visible =
    source === "all"
      ? components
      : components.filter((component) => component.sourceRepository === source);
  return (
    <>
      <div className="filter-tabs" role="group" aria-label="Filtrer par source">
        <button
          className={source === "all" ? "active" : ""}
          onClick={() => setSource("all")}
          type="button"
        >
          Tout · {components.length}
        </button>
        {sources.map((value) => (
          <button
            className={source === value ? "active" : ""}
            key={value}
            onClick={() => setSource(value)}
            type="button"
          >
            {sourceLabels[value]}
          </button>
        ))}
      </div>
      <div className="component-grid">
        {visible.map((component) => (
          <ComponentCard component={component} key={component.id} />
        ))}
      </div>
    </>
  );
}
