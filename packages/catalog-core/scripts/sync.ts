import fs from "node:fs";
import path from "node:path";
import {
  catalogManifestSchema,
  detectKind,
  detectTechnologies,
  extractItems,
  manifestPath,
  repositoryId,
  workspaceRoot,
  type CatalogItem,
  type CatalogManifest,
  type GitHubRepository,
  type GitTreeEntry,
  type RepositoryRecord,
} from "../src/index";

const owner = process.env.CATALOG_GITHUB_OWNER || "frontend-joe";
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const apiBase = "https://api.github.com";

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
    throw new Error(
      `GitHub ${response.status} for ${pathname}: ${await response.text()}`,
    );
  }
  return (await response.json()) as T;
}

async function listRepositories() {
  const repositories: GitHubRepository[] = [];
  for (let page = 1; ; page += 1) {
    const batch = await github<GitHubRepository[]>(
      `/users/${owner}/repos?type=owner&sort=full_name&direction=asc&per_page=100&page=${page}`,
    );
    repositories.push(...batch);
    if (batch.length < 100) break;
  }
  return repositories.filter((repository) => !repository.fork);
}

async function mapConcurrent<T, R>(
  values: T[],
  limit: number,
  mapper: (value: T) => Promise<R>,
) {
  const results = new Array<R>(values.length);
  let cursor = 0;
  async function worker() {
    while (cursor < values.length) {
      const index = cursor++;
      const value = values[index];
      if (value !== undefined) results[index] = await mapper(value);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, values.length) }, worker),
  );
  return results;
}

function loadPrevious(): CatalogManifest | undefined {
  if (!fs.existsSync(manifestPath)) return undefined;
  return catalogManifestSchema.parse(
    JSON.parse(fs.readFileSync(manifestPath, "utf8")),
  );
}

function comparable(manifest: CatalogManifest) {
  return JSON.stringify({ ...manifest, generatedAt: "stable" });
}

async function main() {
  const previous = loadPrevious();
  const previousItems = new Map(previous?.items.map((item) => [item.id, item]));
  const repositories = await listRepositories();

  const extracted = await mapConcurrent(repositories, 6, async (repository) => {
    const treeResponse =
      repository.size === 0
        ? { sha: "0000000", truncated: false, tree: [] as GitTreeEntry[] }
        : await github<{
            sha: string;
            truncated: boolean;
            tree: GitTreeEntry[];
          }>(
            `/repos/${owner}/${repository.name}/git/trees/${encodeURIComponent(repository.default_branch)}?recursive=1`,
          );
    const tree = treeResponse.tree ?? [];
    const sha = treeResponse.sha;
    const tech = detectTechnologies(repository.name, tree);
    const record: RepositoryRecord = {
      id: repositoryId(owner, repository.name),
      owner,
      name: repository.name,
      url: repository.html_url,
      ...(repository.description
        ? { description: repository.description }
        : {}),
      ...(repository.homepage?.startsWith("http")
        ? { homepage: repository.homepage }
        : {}),
      defaultBranch: repository.default_branch,
      headSha: sha,
      pushedAt: repository.pushed_at,
      ...(repository.license?.spdx_id &&
      repository.license.spdx_id !== "NOASSERTION"
        ? { licenseSpdx: repository.license.spdx_id }
        : {}),
      archived: repository.archived,
      fork: repository.fork,
      kind: detectKind(repository, tree),
      technologies: tech,
    };
    const items = extractItems({
      owner,
      repo: repository,
      sha,
      tree,
      technologies: tech,
      previous: previousItems,
    });
    return { record, items, truncated: treeResponse.truncated };
  });

  const activeItems = extracted.flatMap((entry) => entry.items);
  const activeIds = new Set(activeItems.map((item) => item.id));
  const unavailable: CatalogItem[] = (previous?.items ?? [])
    .filter((item) => !activeIds.has(item.id))
    .map((item) => ({ ...item, reviewStatus: "unavailable" as const }));
  const generatedAt = new Date().toISOString();
  const next: CatalogManifest = catalogManifestSchema.parse({
    version: 1,
    generatedAt,
    source: {
      provider: "github",
      owner,
      url: `https://github.com/${owner}`,
    },
    repositories: extracted
      .map((entry) => entry.record)
      .sort((a, b) => a.name.localeCompare(b.name)),
    items: [...activeItems, ...unavailable].sort((a, b) =>
      a.id.localeCompare(b.id),
    ),
  });

  if (previous && comparable(previous) === comparable(next)) {
    console.log(
      `Catalog unchanged: ${next.repositories.length} repositories, ${next.items.length} items.`,
    );
    return;
  }

  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, `${JSON.stringify(next, null, 2)}\n`);

  const newIds = new Set(next.items.map((item) => item.id));
  const added = next.items.filter((item) => !previousItems.has(item.id)).length;
  const removed = [...previousItems.keys()].filter(
    (id) => !newIds.has(id),
  ).length;
  const report = [
    "# Frontend Joe sync report",
    "",
    `- Generated: ${generatedAt}`,
    `- Repositories: ${next.repositories.length}`,
    `- Catalog items: ${next.items.length}`,
    `- New items: ${added}`,
    `- Removed items: ${removed}`,
    `- Truncated Git trees: ${extracted.filter((entry) => entry.truncated).length}`,
    "",
  ].join("\n");
  fs.writeFileSync(
    path.join(workspaceRoot, "catalog/generated/sync-report.md"),
    report,
  );

  const attribution = [
    "# Attributions",
    "",
    "Generated by `pnpm catalog:sync`.",
    "",
    `- [Frontend Joe](https://github.com/${owner}) — catalog source`,
    ...next.repositories.map(
      (repository) =>
        `- [${owner}/${repository.name}](${repository.url}) — ${repository.licenseSpdx ?? "no detected license"}`,
    ),
    "",
  ].join("\n");
  fs.writeFileSync(
    path.join(workspaceRoot, "ATTRIBUTIONS.generated.md"),
    attribution,
  );
  console.log(
    `Wrote ${next.repositories.length} repositories and ${next.items.length} items (${added} new).`,
  );
}

await main();
