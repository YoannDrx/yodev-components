"use client";

import { useState } from "react";
import { ComponentRenderer } from "@/components/library/component-renderer";

const viewports = {
  mobile: 375,
  tablet: 768,
  desktop: 1280,
} as const;

type Viewport = keyof typeof viewports;
type Background = "light" | "dark" | "transparent";

export function ComponentWorkbench({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [background, setBackground] = useState<Background>("light");
  const [revision, setRevision] = useState(0);
  return (
    <section className="workbench" aria-label={`Aperçu de ${title}`}>
      <div className="workbench-toolbar">
        <div className="segmented" aria-label="Viewport">
          {(Object.keys(viewports) as Viewport[]).map((value) => (
            <button
              aria-pressed={viewport === value}
              key={value}
              onClick={() => setViewport(value)}
              type="button"
            >
              {value === "mobile"
                ? "Mobile"
                : value === "tablet"
                  ? "Tablette"
                  : "Desktop"}
            </button>
          ))}
        </div>
        <label>
          <span>Fond</span>
          <select
            value={background}
            onChange={(event) =>
              setBackground(event.target.value as Background)
            }
          >
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
            <option value="transparent">Transparent</option>
          </select>
        </label>
        <button
          className="reset-button"
          onClick={() => setRevision((value) => value + 1)}
          type="button"
        >
          Réinitialiser
        </button>
      </div>
      <div className={`preview-stage background-${background}`}>
        <div className="viewport-shell" style={{ width: viewports[viewport] }}>
          <ComponentRenderer
            className="library-frame"
            key={`${slug}-${revision}`}
            loading="eager"
            slug={slug}
            title={title}
          />
        </div>
      </div>
    </section>
  );
}
