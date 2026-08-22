import fs from "node:fs";
import { catalogSchema, sourceRepositories } from "../lib/catalog-schema";

const catalog = catalogSchema.parse(
  JSON.parse(fs.readFileSync("content/components.json", "utf8")),
);
const expected = {
  "css-components": 75,
  "js-components": 40,
  "css-reels": 33,
  "es6-components": 25,
  "react-components": 79,
} as const;

for (const repository of sourceRepositories) {
  const count = catalog.components.filter(
    (component) =>
      component.sourceRepository === repository &&
      component.portStatus !== "removed-upstream",
  ).length;
  if (count !== expected[repository]) {
    throw new Error(
      `${repository}: expected ${expected[repository]}, got ${count}`,
    );
  }
}

const unique = (values: string[], label: string) => {
  if (new Set(values).size !== values.length) {
    throw new Error(`Duplicate ${label}`);
  }
};
unique(
  catalog.components.map((component) => component.id),
  "ids",
);
unique(
  catalog.components.map((component) => component.slug),
  "slugs",
);
unique(
  catalog.components.map((component) => component.exportName),
  "exports",
);

const families = new Set(
  catalog.components.map((component) => component.family),
);
if (families.size !== 31)
  throw new Error(`Expected 31 families, got ${families.size}`);
if (
  !process.env.ALLOW_PENDING &&
  catalog.components.some((component) => component.portStatus !== "ready")
) {
  throw new Error("Initial release contains a non-ready port");
}
console.log(
  `Catalog valid: ${catalog.components.length} components, 31 families.`,
);
