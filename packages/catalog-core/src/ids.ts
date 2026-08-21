import { createHash } from "node:crypto";

export function repositoryId(owner: string, repo: string) {
  return `github:${owner}/${repo}`;
}

export function itemId(owner: string, repo: string, sourcePath: string) {
  return `${repositoryId(owner, repo)}:${sourcePath || "/"}`;
}

export function slugFor(repo: string, sourcePath: string) {
  const readable = `${repo}-${sourcePath || "repository"}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
  const hash = createHash("sha256")
    .update(`${repo}:${sourcePath}`)
    .digest("hex")
    .slice(0, 8);
  return `${readable}-${hash}`;
}

export function humanize(value: string) {
  return value
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
