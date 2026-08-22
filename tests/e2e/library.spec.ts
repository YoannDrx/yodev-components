import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home exposes 252 components and 31 families", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /252 composants/ }),
  ).toBeVisible();
  await expect(
    page.getByLabel("Statistiques").getByText("31", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Toutes les familles" }),
  ).toBeVisible();
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(
    accessibility.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
});

test("filters a family and opens an isolated component", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("searchbox", { name: "Rechercher un composant" })
    .fill("sidebar");
  await page.getByRole("link", { name: /Sidebars/ }).click();
  await expect(page.getByRole("heading", { name: "Sidebars" })).toBeVisible();
  await page.locator(".component-card").first().click();
  await expect(page.locator("iframe.library-frame")).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: /Voir la source/ }),
  ).toBeVisible();
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(
    accessibility.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    ),
  ).toEqual([]);
});

test("serves a static and a React preview", async ({ request }) => {
  const staticPreview = await request.get("/api/preview/css-card01");
  expect(staticPreview.ok()).toBeTruthy();
  expect(await staticPreview.text()).toContain("<style>");
  const reactPreview = await request.get("/api/preview/react-accordion01");
  expect(reactPreview.ok()).toBeTruthy();
  expect(await reactPreview.text()).toContain("history.replaceState");
});

test("boots the upstream React bundle inside the isolated preview", async ({
  page,
}) => {
  await page.goto("/api/preview/react-accordion01", {
    waitUntil: "networkidle",
  });
  await expect(page.locator("#root .image-accordion")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Canada" })).toBeVisible();
});
