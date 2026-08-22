import {
  applyCuration,
  catalogManifestSchema,
  type CatalogItem,
  type CatalogManifest,
  type RepositoryRecord,
} from "@yodev/catalog-core";
import manifestData from "../../../catalog/generated/frontend-joe.json";
import curationData from "../../../catalog/generated/curation.json";
import { getAdaptationSlug } from "./library";

const empty: CatalogManifest = {
  version: 1,
  generatedAt: new Date(0).toISOString(),
  source: {
    provider: "github",
    owner: "frontend-joe",
    url: "https://github.com/frontend-joe",
  },
  repositories: [],
  items: [],
};

export function getManifest(): CatalogManifest {
  return catalogManifestSchema.parse(manifestData ?? empty);
}

export function getCatalogItems(): CatalogItem[] {
  return applyCuration(getManifest().items, curationData).map((item) => {
    const librarySlug = item.librarySlug ?? getAdaptationSlug(item);
    return librarySlug
      ? { ...item, librarySlug, reviewStatus: "adapted" as const }
      : item;
  });
}

export function getItemBySlug(slug: string) {
  return getCatalogItems().find((item) => item.slug === slug);
}

export function getRepositories(): RepositoryRecord[] {
  return getManifest().repositories;
}

export function getRepository(name: string) {
  return getRepositories().find((repository) => repository.name === name);
}

export function getItemsForRepository(repositoryId: string) {
  return getCatalogItems().filter((item) => item.repositoryId === repositoryId);
}
