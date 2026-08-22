import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import catalogData from "@/content/components.json";
import { catalogSchema } from "@/lib/catalog-schema";
import { componentLoaders } from "@/components/library/loaders.generated";

const catalog = catalogSchema.parse(catalogData);

describe("YoDev React library", () => {
  it("contains the exact five-repository inventory", () => {
    expect(catalog.components).toHaveLength(252);
    expect(new Set(catalog.components.map((item) => item.family)).size).toBe(
      31,
    );
    expect(
      catalog.components.filter(
        (item) => item.sourceRepository === "react-components",
      ),
    ).toHaveLength(79);
    expect(
      catalog.components.some((item) => item.sourcePath.includes("index copy")),
    ).toBe(false);
  });

  it("has a ready, unique React loader for every component", () => {
    expect(Object.keys(componentLoaders)).toHaveLength(252);
    expect(new Set(catalog.components.map((item) => item.id)).size).toBe(252);
    expect(new Set(catalog.components.map((item) => item.slug)).size).toBe(252);
    expect(
      catalog.components.every((item) => item.portStatus === "ready"),
    ).toBe(true);
    expect(catalog.components.map((item) => item.exportName)).toEqual(
      expect.arrayContaining([
        "CssCard01",
        "JsSidebar04",
        "ReelLoader03",
        "Es6Carousel01",
        "ReactSidebar01",
        "ReactDeleteButton",
      ]),
    );
  });

  it("renders all 252 typed wrappers with isolated preview URLs", async () => {
    for (const component of catalog.components) {
      const loaded = await componentLoaders[component.slug]?.();
      expect(loaded).toBeDefined();
      const view = render(
        createElement(loaded!.default, { title: component.title }),
      );
      expect(screen.getByTitle(component.title)).toHaveAttribute(
        "src",
        `/api/preview/${component.slug}`,
      );
      view.unmount();
    }
  });
});
