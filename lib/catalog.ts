import { cache } from "react";
import data from "@/content/components.json";
import { catalogSchema, type ComponentManifestRecord } from "./catalog-schema";
import { familyLabel } from "./labels";

export const getCatalog = cache(() => catalogSchema.parse(data));

export const getComponents = cache(() => getCatalog().components);

export function getComponent(
  slug: string,
): ComponentManifestRecord | undefined {
  return getComponents().find((component) => component.slug === slug);
}

export const getFamilies = cache(() => {
  const grouped = new Map<string, ComponentManifestRecord[]>();
  for (const component of getComponents()) {
    const current = grouped.get(component.family) ?? [];
    current.push(component);
    grouped.set(component.family, current);
  }
  return [...grouped.entries()]
    .map(([slug, components]) => ({
      slug,
      title: familyLabel(slug),
      components: components.sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
});

export function getFamily(slug: string) {
  return getFamilies().find((family) => family.slug === slug);
}
