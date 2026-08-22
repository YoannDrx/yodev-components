import { z } from "zod";

export const sourceRepositories = [
  "css-components",
  "js-components",
  "css-reels",
  "es6-components",
  "react-components",
] as const;

export const portStatuses = [
  "ready",
  "pending",
  "outdated",
  "removed-upstream",
] as const;

const staticPreviewSchema = z.object({
  type: z.literal("static"),
  htmlPath: z.string().min(1),
  cssPaths: z.array(z.string()),
  scriptPaths: z.array(z.string()),
  assetBaseUrl: z.string().url(),
});

const reactPreviewSchema = z.object({
  type: z.literal("react"),
  route: z.string().startsWith("/"),
  deploymentUrl: z.string().url(),
});

export const componentManifestRecordSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  exportName: z.string().regex(/^[A-Z][A-Za-z0-9]+$/),
  title: z.string().min(1),
  family: z.string().min(1),
  sourceRepository: z.enum(sourceRepositories),
  sourcePath: z.string().min(1),
  sourceSha: z.string().min(7),
  sourceUrl: z.string().url(),
  portStatus: z.enum(portStatuses),
  interactive: z.boolean(),
  assetUrls: z.array(z.string().url()),
  preview: z.discriminatedUnion("type", [
    staticPreviewSchema,
    reactPreviewSchema,
  ]),
});

export const catalogSchema = z.object({
  version: z.literal(2),
  generatedAt: z.string(),
  owner: z.literal("frontend-joe"),
  repositoryShas: z.record(z.enum(sourceRepositories), z.string().min(7)),
  components: z.array(componentManifestRecordSchema),
});

export type SourceRepository = (typeof sourceRepositories)[number];
export type PortStatus = (typeof portStatuses)[number];
export type ComponentManifestRecord = z.infer<
  typeof componentManifestRecordSchema
>;
export type ComponentCatalog = z.infer<typeof catalogSchema>;

export type ControlDefinition<Props> = {
  key: keyof Props & string;
  label: string;
  type: "text" | "boolean" | "number" | "select";
  options?: readonly string[];
};

export type DemoScenario<Props> = {
  id: string;
  label: string;
  props: Partial<Props>;
};

export type ComponentDemoDefinition<Props> = {
  load: () => Promise<{ default: React.ComponentType<Props> }>;
  defaultProps: Props;
  controls: ControlDefinition<Props>[];
  scenarios: DemoScenario<Props>[];
};
