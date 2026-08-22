import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home exposes the real catalog", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Des idées brillantes/ }),
  ).toBeVisible();
  await expect(page.getByText("101", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Explorer le catalogue/ }),
  ).toBeVisible();
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(
    accessibility.violations.filter(
      (violation) => violation.impact === "critical",
    ),
  ).toEqual([]);
});

test("filters and opens a component", async ({ page }) => {
  await page.goto("/components");
  await page.getByRole("searchbox", { name: "Rechercher" }).fill("card-1");
  await expect(page.getByText(/résultat/)).toBeVisible();
  await page.locator(".catalog-card").first().click();
  await expect(
    page.getByRole("link", { name: /Voir la source/ }),
  ).toBeVisible();
});

test("renders the original component library", async ({ page }) => {
  await page.goto("/library/button");
  await expect(page.getByRole("heading", { name: "Button" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Action principale" }),
  ).toBeVisible();
});

test("keeps the upstream preview next to its YoDev adaptation", async ({
  page,
}) => {
  await page.goto(
    "/components/css-components-cards-card-1-index-html-c9ec73a0",
  );
  await expect(page.locator("iframe.preview-frame")).toHaveCount(1, {
    timeout: 15_000,
  });
  await expect(
    page.getByRole("link", { name: "Ouvrir l’adaptation" }),
  ).toHaveAttribute("href", "/library/profile-card");
});

test("shows a safe visual fallback for framework examples", async ({
  page,
}) => {
  await page.goto(
    "/components/vuejs-cards-src-components-cards-3dcubecard-vue-2eb62700",
  );
  await expect(page.getByText("Capture de provenance")).toBeVisible();
  await expect(page.locator(".snapshot-preview img")).toBeVisible();
});

test("renders an extended accessible control", async ({ page }) => {
  await page.goto("/library/switch");
  const control = page.getByRole("switch", { name: "Aperçus interactifs" });
  await expect(control).toBeChecked();
  await control.click();
  await expect(control).not.toBeChecked();
});
