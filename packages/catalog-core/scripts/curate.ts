import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import {
  catalogManifestSchema,
  curationDirectory,
  curationOverrideSchema,
  manifestPath,
} from "../src/index";

const [action, itemId] = process.argv.slice(2);
if (!itemId || !["favorite", "review"].includes(action ?? "")) {
  throw new Error("Usage: curate.ts <favorite|review> <item-id>");
}
const manifest = catalogManifestSchema.parse(
  JSON.parse(fs.readFileSync(manifestPath, "utf8")),
);
if (!manifest.items.some((item) => item.id === itemId)) {
  throw new Error(`Unknown catalog item: ${itemId}`);
}
const filename = `${itemId
  .replace(/[^a-z0-9]+/gi, "-")
  .replace(/^-|-$/g, "")
  .toLowerCase()}.yaml`;
const filepath = path.join(curationDirectory, filename);
const existing = fs.existsSync(filepath)
  ? YAML.parse(fs.readFileSync(filepath, "utf8"))
  : { itemId };
const next = curationOverrideSchema.parse({
  ...existing,
  reviewed: true,
  ...(action === "favorite" ? { favorite: true } : {}),
});
fs.mkdirSync(curationDirectory, { recursive: true });
fs.writeFileSync(filepath, YAML.stringify(next));
console.log(`${action === "favorite" ? "Favorited" : "Reviewed"}: ${itemId}`);
