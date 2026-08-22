import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import {
  curationOverrideSchema,
  type CatalogItem,
  type CurationOverride,
} from "./schema";

const cwd = process.cwd();
export const workspaceRoot = cwd.endsWith(path.join("apps", "catalog"))
  ? path.resolve(cwd, "../..")
  : cwd;
export const manifestPath = path.join(
  workspaceRoot,
  "catalog/generated/frontend-joe.json",
);
export const curationDirectory = path.join(workspaceRoot, "catalog/curation");

export function loadCuration(): CurationOverride[] {
  if (!fs.existsSync(curationDirectory)) return [];
  return fs
    .readdirSync(curationDirectory)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
    .map((file) => {
      const value: unknown = YAML.parse(
        fs.readFileSync(path.join(curationDirectory, file), "utf8"),
      );
      return curationOverrideSchema.parse(value);
    });
}

export function applyCuration(
  items: CatalogItem[],
  overrides = loadCuration(),
): CatalogItem[] {
  const byId = new Map(
    overrides.map((override) => [override.itemId, override]),
  );
  return items
    .filter((item) => !byId.get(item.id)?.hidden)
    .map((item) => {
      const override = byId.get(item.id);
      if (!override) return item;
      const reviewStatus = override.librarySlug
        ? "adapted"
        : override.favorite
          ? "favorite"
          : override.reviewed
            ? "reviewed"
            : item.reviewStatus;
      return {
        ...item,
        name: override.title ?? item.name,
        tags: [...new Set([...item.tags, ...(override.tags ?? [])])],
        reviewStatus,
        librarySlug: override.librarySlug ?? item.librarySlug,
      };
    });
}
