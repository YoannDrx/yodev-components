import { describe, expect, it } from "vitest";
import {
  detectKind,
  detectTechnologies,
  extractItems,
  itemId,
  slugFor,
  type GitHubRepository,
  type GitTreeEntry,
} from "../src/index";

const repository: GitHubRepository = {
  name: "css-components",
  html_url: "https://github.com/frontend-joe/css-components",
  description: "Components",
  homepage: null,
  default_branch: "main",
  pushed_at: "2026-01-01T00:00:00Z",
  archived: false,
  fork: false,
  size: 20,
  license: null,
};
const tree: GitTreeEntry[] = [
  { path: "cards/card-1", mode: "040000", type: "tree", sha: "tree" },
  {
    path: "cards/card-1/index.html",
    mode: "100644",
    type: "blob",
    sha: "html",
  },
  { path: "cards/card-1/styles.css", mode: "100644", type: "blob", sha: "css" },
  { path: "cards/card-1/main.js", mode: "100644", type: "blob", sha: "js" },
  {
    path: ".agents/skills/example/index.html",
    mode: "100644",
    type: "blob",
    sha: "ignored",
  },
];

describe("catalog identifiers", () => {
  it("creates deterministic, URL-safe slugs", () => {
    expect(slugFor("CSS Components", "cards/card-1/index.html")).toMatch(
      /^css-components-cards-card-1-index-html-[a-f0-9]{8}$/,
    );
    expect(slugFor("CSS Components", "cards/card-1/index.html")).toBe(
      slugFor("CSS Components", "cards/card-1/index.html"),
    );
  });
  it("keeps canonical GitHub provenance", () => {
    expect(
      itemId("frontend-joe", "css-components", "cards/card-1/index.html"),
    ).toBe("github:frontend-joe/css-components:cards/card-1/index.html");
  });
});

describe("repository extraction", () => {
  it("classifies collection technology and ignores agent folders", () => {
    expect(detectKind(repository, tree)).toBe("single-component");
    expect(detectTechnologies(repository.name, tree)).toEqual(
      expect.arrayContaining(["html-css", "javascript"]),
    );
  });
  it("builds a static preview from sibling files", () => {
    const [item] = extractItems({
      owner: "frontend-joe",
      repo: repository,
      sha: "1234567890abcdef",
      tree,
      technologies: ["html-css", "javascript"],
    });
    expect(item?.preview).toEqual(
      expect.objectContaining({
        type: "static-srcdoc",
        cssPaths: ["cards/card-1/styles.css"],
        scriptPaths: ["cards/card-1/main.js"],
      }),
    );
    expect(item?.licenseStatus).toBe("unlicensed");
  });
  it("keeps complete applications as one project reference", () => {
    const application = { ...repository, name: "product-app" };
    const appTree: GitTreeEntry[] = [
      {
        path: "src/App.tsx",
        mode: "100644",
        type: "blob",
        sha: "app",
      },
      {
        path: "src/app/settings/page.tsx",
        mode: "100644",
        type: "blob",
        sha: "settings",
      },
    ];
    const items = extractItems({
      owner: "frontend-joe",
      repo: application,
      sha: "1234567890abcdef",
      tree: appTree,
      technologies: ["react"],
    });
    expect(detectKind(application, appTree)).toBe("application");
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(
      expect.objectContaining({
        sourcePath: "",
        preview: expect.objectContaining({ type: "snapshot" }),
      }),
    );
  });
});
