import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { catalogSchema } from "../lib/catalog-schema";

const catalog = catalogSchema.parse(
  JSON.parse(fs.readFileSync("content/components.json", "utf8")),
);
const legacyDirectory = path.resolve("components/library/generated");
fs.rmSync(legacyDirectory, { recursive: true, force: true });

const declarations = catalog.components
  .map((component) => {
    const title = component.title
      .replaceAll("\\", "\\\\")
      .replaceAll('"', '\\"');
    return `export type ${component.exportName}Props = AuthorizedPortProps;

export const ${component.exportName} = forwardRef<
  HTMLIFrameElement,
  ${component.exportName}Props
>(function ${component.exportName}(props, ref) {
  return (
    <AuthorizedPortFrame
      {...props}
      ref={ref}
      slug="${component.slug}"
      title={props.title ?? "${title}"}
    />
  );
});`;
  })
  .join("\n\n");

const ports = `"use client";

import { forwardRef } from "react";
import {
  AuthorizedPortFrame,
  type AuthorizedPortProps,
} from "./authorized-port-frame";

${declarations}
`;
fs.writeFileSync(path.resolve("components/library/ports.generated.tsx"), ports);

const loaders = `import type { ComponentType } from "react";
import type { AuthorizedPortProps } from "./authorized-port-frame";

export const componentLoaders: Record<
  string,
  () => Promise<{ default: ComponentType<AuthorizedPortProps> }>
> = {
${catalog.components
  .map(
    (component) =>
      `  "${component.slug}": () => import("./ports.generated").then((module) => ({ default: module.${component.exportName} })),`,
  )
  .join("\n")}
};
`;
fs.writeFileSync(
  path.resolve("components/library/loaders.generated.ts"),
  loaders,
);

const attributions = `# Attributions

The ${catalog.components.length} catalog entries below are derived from the five pinned component
collections by [Frontend Joe](https://github.com/frontend-joe). Each link targets
the exact upstream path recorded by YoDev. The revision shown is the source blob
or repository commit used by the manifest.

${catalog.components
  .map(
    (component) =>
      `- [\`${component.id}\`](${component.sourceUrl}) — \`${component.exportName}\` — \`${component.sourceSha}\``,
  )
  .join("\n")}

See \`UPSTREAM_AUTHORIZATION_NOTICE.md\` for the rights notice.
`;
fs.writeFileSync(path.resolve("ATTRIBUTIONS.generated.md"), attributions);
execFileSync(
  "pnpm",
  [
    "exec",
    "prettier",
    "--write",
    "components/library/ports.generated.tsx",
    "components/library/loaders.generated.ts",
    "ATTRIBUTIONS.generated.md",
  ],
  { stdio: "ignore" },
);
console.log(`Generated ${catalog.components.length} React port exports.`);
