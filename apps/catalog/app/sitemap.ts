import type { MetadataRoute } from "next";
import { getCatalogItems, getRepositories } from "@/lib/catalog";
import { libraryItems } from "@/lib/library";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yodev-components.vercel.app";
  return ["", "/components", "/repositories", "/library", "/inbox", "/about"]
    .map((path) => ({ url: `${base}${path}`, lastModified: new Date() }))
    .concat(
      getCatalogItems().map((item) => ({
        url: `${base}/components/${item.slug}`,
        lastModified: new Date(),
      })),
      getRepositories().map((repo) => ({
        url: `${base}/repositories/${repo.name}`,
        lastModified: new Date(repo.pushedAt),
      })),
      libraryItems.map((item) => ({
        url: `${base}/library/${item.slug}`,
        lastModified: new Date(),
      })),
    );
}
