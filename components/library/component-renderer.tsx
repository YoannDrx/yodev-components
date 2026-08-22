"use client";

import { lazy, Suspense } from "react";
import { componentLoaders } from "./loaders.generated";
import type { AuthorizedPortProps } from "./authorized-port-frame";

const lazyComponents = Object.fromEntries(
  Object.entries(componentLoaders).map(([slug, loader]) => [
    slug,
    lazy(loader),
  ]),
);

export function ComponentRenderer({
  slug,
  ...props
}: AuthorizedPortProps & { slug: string }) {
  const Component = lazyComponents[slug];
  if (!Component) return <p>Aperçu introuvable.</p>;
  return (
    <Suspense fallback={<div className="preview-loading">Chargement…</div>}>
      <Component {...props} />
    </Suspense>
  );
}
