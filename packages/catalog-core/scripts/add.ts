import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { curationDirectory } from "../src/index";

const value = process.argv[2];
if (!value) throw new Error("Usage: pnpm catalog:add <github-url>");
const url = new URL(value);
if (url.hostname !== "github.com")
  throw new Error("Only github.com URLs are supported.");
const [owner, repo, marker, ref, ...sourceParts] = url.pathname
  .split("/")
  .filter(Boolean);
if (!owner || !repo) throw new Error("Expected a GitHub repository URL.");
const sourcePath =
  marker === "tree" || marker === "blob" ? sourceParts.join("/") : "";
const itemId = `github:${owner}/${repo}:${sourcePath || "/"}`;
const filename = `manual-${owner}-${repo}-${sourcePath || "repository"}`
  .replace(/[^a-z0-9]+/gi, "-")
  .toLowerCase();
const payload = {
  itemId,
  reviewed: false,
  notes: `Manual source requested from ${value}${ref ? ` at ${ref}` : ""}`,
  tags: ["manual-source"],
};
fs.mkdirSync(curationDirectory, { recursive: true });
fs.writeFileSync(
  path.join(curationDirectory, `${filename}.yaml`),
  YAML.stringify(payload),
);
console.log(`Registered manual source request: ${itemId}`);
