import fs from "node:fs";
import path from "node:path";
import {
  catalogManifestSchema,
  loadCuration,
  manifestPath,
  workspaceRoot,
} from "../src/index";

if (!fs.existsSync(manifestPath)) {
  throw new Error("Missing catalog manifest. Run pnpm catalog:sync first.");
}

const manifest = catalogManifestSchema.parse(
  JSON.parse(fs.readFileSync(manifestPath, "utf8")),
);
const repositoryIds = new Set<string>();
const itemIds = new Set<string>();
const slugs = new Set<string>();

for (const repository of manifest.repositories) {
  if (repositoryIds.has(repository.id))
    throw new Error(`Duplicate repository: ${repository.id}`);
  repositoryIds.add(repository.id);
}

for (const item of manifest.items) {
  if (itemIds.has(item.id)) throw new Error(`Duplicate item: ${item.id}`);
  if (slugs.has(item.slug))
    throw new Error(`Duplicate item slug: ${item.slug}`);
  if (!repositoryIds.has(item.repositoryId))
    throw new Error(`Unknown repository for ${item.id}`);
  itemIds.add(item.id);
  slugs.add(item.slug);
}

const overrides = loadCuration();
for (const override of overrides) {
  if (!itemIds.has(override.itemId)) {
    throw new Error(`Curation references an unknown item: ${override.itemId}`);
  }
}

fs.writeFileSync(
  path.join(workspaceRoot, "catalog/generated/curation.json"),
  `${JSON.stringify(overrides, null, 2)}\n`,
);

console.log(
  `Catalog valid: ${repositoryIds.size} repositories, ${itemIds.size} items.`,
);
