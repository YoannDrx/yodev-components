import type { MetadataRoute } from "next";
import { getComponents, getFamilies } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yodev-components.vercel.app";
  return [
    { url: base },
    { url: `${base}/about` },
    ...getFamilies().map((family) => ({
      url: `${base}/families/${family.slug}`,
    })),
    ...getComponents().map((component) => ({
      url: `${base}/components/${component.slug}`,
    })),
  ];
}
