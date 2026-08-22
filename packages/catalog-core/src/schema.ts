import { z } from "zod";

export const repositoryKinds = [
  "component-collection",
  "single-component",
  "application",
  "template",
  "resource",
  "assets",
  "empty",
  "unknown",
] as const;

export const technologies = [
  "html-css",
  "javascript",
  "es6",
  "react",
  "nextjs",
  "tailwind",
  "svelte",
  "vue",
  "svg",
  "unknown",
] as const;

export const previewDescriptorSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("static-srcdoc"),
    htmlPath: z.string().min(1),
    cssPaths: z.array(z.string()),
    scriptPaths: z.array(z.string()),
    assetBaseUrl: z.string().url(),
  }),
  z.object({ type: z.literal("external"), url: z.string().url() }),
  z.object({
    type: z.literal("snapshot"),
    imagePath: z.string(),
    reason: z.string(),
  }),
  z.object({ type: z.literal("owned"), librarySlug: z.string().min(1) }),
  z.object({ type: z.literal("none"), reason: z.string().min(1) }),
]);

export const repositoryRecordSchema = z.object({
  id: z.string().min(1),
  owner: z.string().min(1),
  name: z.string().min(1),
  url: z.string().url(),
  description: z.string().optional(),
  homepage: z.string().url().optional(),
  defaultBranch: z.string().min(1),
  headSha: z.string().min(7),
  pushedAt: z.string(),
  licenseSpdx: z.string().optional(),
  archived: z.boolean(),
  fork: z.boolean(),
  kind: z.enum(repositoryKinds),
  technologies: z.array(z.enum(technologies)).min(1),
});

export const catalogItemSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  repositoryId: z.string().min(1),
  sourcePath: z.string(),
  sourceUrl: z.string().url(),
  sourceSha: z.string().min(7),
  name: z.string().min(1),
  componentType: z.string().min(1),
  technologies: z.array(z.enum(technologies)).min(1),
  tags: z.array(z.string()),
  preview: previewDescriptorSchema,
  librarySlug: z.string().min(1).optional(),
  licenseStatus: z.enum(["licensed", "unlicensed", "unknown"]),
  reviewStatus: z.enum([
    "new",
    "reviewed",
    "favorite",
    "adapted",
    "unavailable",
  ]),
});

export const catalogManifestSchema = z.object({
  version: z.literal(1),
  generatedAt: z.string(),
  source: z.object({
    provider: z.literal("github"),
    owner: z.string(),
    url: z.string().url(),
  }),
  repositories: z.array(repositoryRecordSchema),
  items: z.array(catalogItemSchema),
});

export const curationOverrideSchema = z.object({
  itemId: z.string().min(1),
  favorite: z.boolean().optional(),
  hidden: z.boolean().optional(),
  reviewed: z.boolean().optional(),
  title: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  librarySlug: z.string().optional(),
});

export type RepositoryKind = (typeof repositoryKinds)[number];
export type Technology = (typeof technologies)[number];
export type PreviewDescriptor = z.infer<typeof previewDescriptorSchema>;
export type RepositoryRecord = z.infer<typeof repositoryRecordSchema>;
export type CatalogItem = z.infer<typeof catalogItemSchema>;
export type CatalogManifest = z.infer<typeof catalogManifestSchema>;
export type CurationOverride = z.infer<typeof curationOverrideSchema>;
