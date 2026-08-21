import type {
  CatalogItem,
  PreviewDescriptor,
  RepositoryKind,
  Technology,
} from "./schema";
import { humanize, itemId, slugFor } from "./ids";

export type GitTreeEntry = {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
};

export type GitHubRepository = {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  default_branch: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  size: number;
  license: { spdx_id: string } | null;
};

const ignoredParts = new Set([
  "node_modules",
  "dist",
  "build",
  ".next",
  ".git",
  ".github",
  ".agents",
  ".claude",
  ".qoder",
  ".windsurf",
  "coverage",
]);

export function usableBlobs(tree: GitTreeEntry[]) {
  return tree.filter(
    (entry) =>
      entry.type === "blob" &&
      !entry.path.split("/").some((part) => ignoredParts.has(part)),
  );
}

export function detectTechnologies(
  repoName: string,
  tree: GitTreeEntry[],
): Technology[] {
  const blobs = usableBlobs(tree);
  const paths = blobs.map((entry) => entry.path.toLowerCase());
  const found = new Set<Technology>();
  const name = repoName.toLowerCase();

  if (
    name.includes("nextjs") ||
    paths.some(
      (path) => path === "next.config.js" || path === "next.config.mjs",
    )
  )
    found.add("nextjs");
  if (name.includes("react") || paths.some((path) => /\.(jsx|tsx)$/.test(path)))
    found.add("react");
  if (name.includes("svelte") || paths.some((path) => path.endsWith(".svelte")))
    found.add("svelte");
  if (name.includes("vue") || paths.some((path) => path.endsWith(".vue")))
    found.add("vue");
  if (
    name.includes("tailwind") ||
    paths.some((path) => path.includes("tailwind"))
  )
    found.add("tailwind");
  if (name.startsWith("es6-") || name === "es6-components") found.add("es6");
  if (paths.some((path) => path.endsWith(".js")) && !found.has("react"))
    found.add("javascript");
  if (paths.some((path) => path.endsWith(".html") || path.endsWith(".css")))
    found.add("html-css");
  if (paths.some((path) => path.endsWith(".svg"))) found.add("svg");
  if (found.size === 0) found.add("unknown");

  return [...found];
}

export function detectKind(
  repo: GitHubRepository,
  tree: GitTreeEntry[],
): RepositoryKind {
  const blobs = usableBlobs(tree);
  const name = repo.name.toLowerCase();
  if (blobs.length === 0 || repo.size === 0) return "empty";
  if (name === "assets") return "assets";
  if (["useful-links", "save-these"].includes(name)) return "resource";
  if (
    /components|reels|widgets|cards|buttons|navbars|sidebars|menus|dropdowns|accordions|loaders|controls|modals|charts|carousels/.test(
      name,
    )
  ) {
    return blobs.filter(
      (entry) =>
        entry.path.endsWith(".html") || /Example\.(jsx|tsx)$/.test(entry.path),
    ).length > 1
      ? "component-collection"
      : "single-component";
  }
  if (/boilerplate|template/.test(name)) return "template";
  if (
    blobs.some((entry) =>
      /(^|\/)src\/(App|main)\.(jsx|tsx|js|ts)$/.test(entry.path),
    )
  )
    return "application";
  return "unknown";
}

function componentTypeFromPath(path: string) {
  const parts = path.split("/").filter(Boolean);
  const ignored = new Set(["src", "components", "routes", "app", "pages"]);
  const part = parts.find((value) => !ignored.has(value.toLowerCase()));
  const value = part ? humanize(part).replace(/s$/, "").trim() : "";
  return value || "Projet";
}

function createStaticPreview(
  owner: string,
  repo: string,
  sha: string,
  htmlPath: string,
  blobs: GitTreeEntry[],
): PreviewDescriptor {
  const directory = htmlPath.includes("/")
    ? htmlPath.slice(0, htmlPath.lastIndexOf("/"))
    : "";
  const siblings = blobs.filter((entry) => {
    const entryDirectory = entry.path.includes("/")
      ? entry.path.slice(0, entry.path.lastIndexOf("/"))
      : "";
    return entryDirectory === directory;
  });
  return {
    type: "static-srcdoc",
    htmlPath,
    cssPaths: siblings
      .filter((entry) => entry.path.endsWith(".css"))
      .map((entry) => entry.path),
    scriptPaths: siblings
      .filter((entry) => entry.path.endsWith(".js"))
      .map((entry) => entry.path),
    assetBaseUrl: `https://raw.githubusercontent.com/${owner}/${repo}/${sha}/${directory}${directory ? "/" : ""}`,
  };
}

export function extractItems(input: {
  owner: string;
  repo: GitHubRepository;
  sha: string;
  tree: GitTreeEntry[];
  technologies: Technology[];
  previous?: Map<string, CatalogItem>;
}): CatalogItem[] {
  const { owner, repo, sha, tree, technologies, previous } = input;
  const blobs = usableBlobs(tree);
  const licenseStatus =
    repo.license?.spdx_id && repo.license.spdx_id !== "NOASSERTION"
      ? "licensed"
      : repo.license
        ? "unknown"
        : "unlicensed";
  const candidates = new Map<string, PreviewDescriptor>();

  for (const entry of blobs) {
    const lower = entry.path.toLowerCase();
    if (lower.endsWith(".html") && !lower.includes("/public/")) {
      candidates.set(
        entry.path,
        createStaticPreview(owner, repo.name, sha, entry.path, blobs),
      );
    } else if (/Example\.(jsx|tsx)$/.test(entry.path)) {
      candidates.set(entry.path, {
        type: "none",
        reason:
          "Le composant React nécessite une adaptation ou une capture validée.",
      });
    } else if (/src\/routes\/.+\/\+page\.svelte$/.test(entry.path)) {
      candidates.set(entry.path, {
        type: "none",
        reason: "La route Svelte nécessite un build isolé.",
      });
    } else if (
      /(^|\/)(app|pages)\/.+\/page\.(tsx|jsx|js|ts)$/.test(entry.path)
    ) {
      candidates.set(entry.path, {
        type: "none",
        reason: "La page applicative nécessite un build isolé.",
      });
    } else if (lower.endsWith(".vue") && lower.includes("component")) {
      candidates.set(entry.path, {
        type: "none",
        reason: "Le composant Vue nécessite un build isolé.",
      });
    }
  }

  if (candidates.size === 0) {
    candidates.set(
      "",
      repo.homepage?.startsWith("http")
        ? { type: "external", url: repo.homepage }
        : {
            type: "none",
            reason: "Aucun aperçu autonome détecté pour ce dépôt.",
          },
    );
  }

  return [...candidates.entries()].map(([sourcePath, preview]) => {
    const id = itemId(owner, repo.name, sourcePath);
    const prior = previous?.get(id);
    const pathName = sourcePath
      ? sourcePath.split("/").at(-2) ||
        sourcePath.split("/").at(-1) ||
        repo.name
      : repo.name;
    const componentType = componentTypeFromPath(sourcePath || repo.name);
    const displayName =
      humanize(pathName).trim() || humanize(repo.name).trim() || "Projet";
    return {
      id,
      slug: slugFor(repo.name, sourcePath),
      repositoryId: `github:${owner}/${repo.name}`,
      sourcePath,
      sourceUrl: sourcePath
        ? `${repo.html_url}/blob/${sha}/${sourcePath}`
        : `${repo.html_url}/tree/${sha}`,
      sourceSha: sha,
      name: displayName,
      componentType,
      technologies,
      tags: [...new Set([repo.name, componentType.toLowerCase()])],
      preview,
      licenseStatus,
      reviewStatus:
        prior?.reviewStatus === "unavailable"
          ? "new"
          : (prior?.reviewStatus ?? "new"),
    } satisfies CatalogItem;
  });
}
