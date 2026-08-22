import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  catalogSchema,
  sourceRepositories,
  type ComponentCatalog,
  type ComponentManifestRecord,
  type SourceRepository,
} from "../lib/catalog-schema";

type TreeEntry = {
  path: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
};

type RepoResponse = {
  html_url: string;
  default_branch: string;
  homepage: string | null;
};

const owner = "frontend-joe";
const apiBase = "https://api.github.com";
const outputPath = path.resolve("content/components.json");
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const initial = process.argv.includes("--initial");
const mediaPattern = /\.(avif|gif|jpe?g|mp4|png|svg|webm|webp|woff2?)$/i;
const ignored = new Set([
  ".git",
  ".github",
  ".agents",
  ".claude",
  ".qoder",
  ".windsurf",
  "node_modules",
  "dist",
  "build",
]);

async function github<T>(pathname: string): Promise<T> {
  const response = await fetch(`${apiBase}${pathname}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "yodev-components-sync",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) {
    throw new Error(`GitHub ${response.status}: ${pathname}`);
  }
  return (await response.json()) as T;
}

function usable(entry: TreeEntry) {
  return !entry.path.split("/").some((part) => ignored.has(part));
}

function words(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function pascal(value: string) {
  return words(value)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function kebab(value: string) {
  return words(value)
    .map((word) => word.toLowerCase())
    .join("-");
}

function singular(value: string) {
  if (value === "libraries") return "Library";
  if (value === "examples") return "Example";
  if (value === "controls") return "Control";
  if (value === "checkboxes") return "Checkbox";
  if (value === "switches") return "Switch";
  if (value === "gsap") return "Gsap";
  if (value.endsWith("ies")) return `${value.slice(0, -3)}y`;
  return value.endsWith("s") ? value.slice(0, -1) : value;
}

function variantName(folder: string) {
  const match = folder.match(/(?:part-|[-_])(\d+)$/i);
  if (match?.[1]) return match[1].padStart(2, "0");
  return pascal(folder);
}

function reactVariantName(value: string) {
  const normalized = value.replace(/^Controls - /, "");
  const match = normalized.match(/^(.*?)[\s_-]?(\d+)$/);
  return match?.[1] && match[2]
    ? `${pascal(match[1])}${match[2].padStart(2, "0")}`
    : pascal(normalized);
}

function exportName(repo: SourceRepository, family: string, variant: string) {
  const prefix = {
    "css-components": "Css",
    "js-components": "Js",
    "css-reels": "Reel",
    "es6-components": "Es6",
    "react-components": "React",
  }[repo];
  if (repo === "react-components") {
    return `${prefix}${reactVariantName(variant)}`;
  }
  const suffix = variantName(variant);
  return `${prefix}${pascal(singular(family))}${suffix}`;
}

function sourceStatus(
  prior: ComponentManifestRecord | undefined,
  sourceSha: string,
) {
  if (!prior) return initial ? "ready" : "pending";
  return prior.sourceSha === sourceSha ? prior.portStatus : "outdated";
}

function rawUrl(repo: string, sha: string, file: string) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${sha}/${file
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}

function shortHash(value: string) {
  return crypto.createHash("sha1").update(value).digest("hex").slice(0, 6);
}

function dedupeExports(records: ComponentManifestRecord[]) {
  const seen = new Map<string, number>();
  return records.map((record) => {
    const count = seen.get(record.exportName) ?? 0;
    seen.set(record.exportName, count + 1);
    if (count === 0) return record;
    return {
      ...record,
      exportName: `${record.exportName}${shortHash(record.id)}`,
      slug: `${record.slug}-${shortHash(record.id)}`,
    };
  });
}

async function staticComponents(
  repo: Exclude<SourceRepository, "react-components">,
  repository: RepoResponse,
  sha: string,
  tree: TreeEntry[],
  previous: Map<string, ComponentManifestRecord>,
) {
  const files = tree.filter((entry) => entry.type === "blob" && usable(entry));
  return files
    .filter((entry) => entry.path.endsWith("/index.html"))
    .map((entry): ComponentManifestRecord => {
      const parts = entry.path.split("/");
      const family = parts[0] ?? "examples";
      const folder = parts.at(-2) ?? "example";
      const directory = parts.slice(0, -1).join("/");
      const siblings = files.filter(
        (file) => file.path.slice(0, file.path.lastIndexOf("/")) === directory,
      );
      const id = `${repo}/${family}/${folder}`;
      const name = exportName(repo, family, folder);
      const sourceSha = entry.sha || sha;
      return {
        id,
        slug: kebab(name),
        exportName: name,
        title: words(folder).join(" "),
        family,
        sourceRepository: repo,
        sourcePath: entry.path,
        sourceSha,
        sourceUrl: `${repository.html_url}/blob/${sha}/${entry.path}`,
        portStatus: sourceStatus(previous.get(id), sourceSha),
        interactive:
          repo !== "css-components" ||
          siblings.some((file) => file.path.endsWith(".js")),
        assetUrls: siblings
          .filter((file) => mediaPattern.test(file.path))
          .map((file) => rawUrl(repo, sha, file.path)),
        preview: {
          type: "static",
          htmlPath: entry.path,
          cssPaths: siblings
            .filter((file) => file.path.endsWith(".css"))
            .map((file) => file.path),
          scriptPaths: siblings
            .filter((file) => file.path.endsWith(".js"))
            .map((file) => file.path),
          assetBaseUrl: rawUrl(repo, sha, `${directory}/`),
        },
      };
    });
}

async function reactComponents(
  repository: RepoResponse,
  sha: string,
  tree: TreeEntry[],
  previous: Map<string, ComponentManifestRecord>,
) {
  const routeResponse = await fetch(
    rawUrl("react-components", sha, "src/routes.jsx"),
  );
  if (!routeResponse.ok) throw new Error("Unable to fetch React routes");
  const source = await routeResponse.text();
  const matches = [
    ...source.matchAll(
      /name:\s*"([^"]+)"[\s\S]*?path:\s*"(\/[^"]+)"[\s\S]*?element:/g,
    ),
  ];
  const files = tree.filter((entry) => entry.type === "blob" && usable(entry));
  const deploymentUrl =
    repository.homepage || "https://react-components-nu-lake.vercel.app";
  return matches.map((match): ComponentManifestRecord => {
    const title = match[1] ?? "React component";
    const route = match[2] ?? "/";
    const normalizedFamily = (route.split("/").filter(Boolean)[0] ?? "examples")
      .replace(/^button$/, "buttons")
      .replace(/^dropdown$/, "dropdowns")
      .replace(/^signup$/, "signups");
    const variant = route.split("/").filter(Boolean).at(-1) ?? title;
    const id = `react-components/${normalizedFamily}/${variant}`;
    const name = exportName("react-components", normalizedFamily, title);
    const relevantAssets = files
      .filter(
        (file) =>
          mediaPattern.test(file.path) &&
          file.path.toLowerCase().includes(kebab(title).replaceAll("-", "")),
      )
      .slice(0, 12)
      .map((file) => rawUrl("react-components", sha, file.path));
    return {
      id,
      slug: kebab(name),
      exportName: name,
      title,
      family: normalizedFamily,
      sourceRepository: "react-components",
      sourcePath: `src/routes.jsx${route}`,
      sourceSha: sha,
      sourceUrl: `${repository.html_url}/blob/${sha}/src/routes.jsx`,
      portStatus: sourceStatus(previous.get(id), sha),
      interactive: true,
      assetUrls: relevantAssets,
      preview: { type: "react", route, deploymentUrl },
    };
  });
}

async function main() {
  const prior = fs.existsSync(outputPath)
    ? catalogSchema.parse(JSON.parse(fs.readFileSync(outputPath, "utf8")))
    : undefined;
  const previous = new Map(
    prior?.components.map((component) => [component.id, component]),
  );
  const repositoryShas = {} as Record<SourceRepository, string>;
  const active: ComponentManifestRecord[] = [];

  for (const repo of sourceRepositories) {
    const repository = await github<RepoResponse>(`/repos/${owner}/${repo}`);
    const commit = await github<{ sha: string }>(
      `/repos/${owner}/${repo}/commits/${encodeURIComponent(repository.default_branch)}`,
    );
    const treeResponse = await github<{
      sha: string;
      truncated: boolean;
      tree: TreeEntry[];
    }>(
      `/repos/${owner}/${repo}/git/trees/${encodeURIComponent(repository.default_branch)}?recursive=1`,
    );
    if (treeResponse.truncated) throw new Error(`${repo} tree is truncated`);
    repositoryShas[repo] = commit.sha;
    if (repo === "react-components") {
      active.push(
        ...(await reactComponents(
          repository,
          commit.sha,
          treeResponse.tree,
          previous,
        )),
      );
    } else {
      active.push(
        ...(await staticComponents(
          repo,
          repository,
          commit.sha,
          treeResponse.tree,
          previous,
        )),
      );
    }
  }

  const activeIds = new Set(active.map((component) => component.id));
  const removed = (prior?.components ?? [])
    .filter((component) => !activeIds.has(component.id))
    .map((component) => ({
      ...component,
      portStatus: "removed-upstream" as const,
    }));
  const components = dedupeExports([...active, ...removed]).sort((a, b) =>
    a.id.localeCompare(b.id),
  );
  const next: ComponentCatalog = catalogSchema.parse({
    version: 2,
    generatedAt: new Date().toISOString(),
    owner,
    repositoryShas,
    components,
  });
  const comparable = (catalog: ComponentCatalog) =>
    JSON.stringify({ ...catalog, generatedAt: "stable" });
  if (prior && comparable(prior) === comparable(next)) {
    console.log(`Catalog unchanged: ${components.length} components.`);
    return;
  }
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(next, null, 2)}\n`);
  execFileSync("pnpm", ["exec", "prettier", "--write", outputPath], {
    stdio: "ignore",
  });
  console.log(`Wrote ${components.length} components.`);
}

await main();
