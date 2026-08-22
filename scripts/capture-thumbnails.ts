import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { catalogSchema } from "../lib/catalog-schema";

const catalog = catalogSchema.parse(
  JSON.parse(fs.readFileSync("content/components.json", "utf8")),
);
const outputDirectory = path.resolve("public/thumbnails");
const placeholders = process.argv.includes("--placeholders");
const sourceFilter = process.argv
  .find((argument) => argument.startsWith("--source="))
  ?.slice("--source=".length);
const selectedComponents = sourceFilter
  ? catalog.components.filter(
      (component) => component.sourceRepository === sourceFilter,
    )
  : catalog.components;
if (sourceFilter && selectedComponents.length === 0) {
  throw new Error(`Source inconnue ou vide : ${sourceFilter}`);
}
fs.mkdirSync(outputDirectory, { recursive: true });

function escapeXml(value: string) {
  return value.replace(
    /[<>&'\"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

if (placeholders) {
  for (const component of selectedComponents) {
    const title = escapeXml(component.title);
    const source = escapeXml(component.sourceRepository);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="450"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#17161c"/><stop offset="1" stop-color="#5b45e0"/></linearGradient></defs><rect width="720" height="450" fill="url(#g)"/><circle cx="620" cy="55" r="180" fill="#ffffff" opacity=".08"/><text x="48" y="320" fill="#bdb3ff" font-family="Arial" font-size="18" font-weight="700">${source}</text><text x="48" y="365" fill="#ffffff" font-family="Arial" font-size="34" font-weight="700">${title}</text></svg>`;
    await sharp(Buffer.from(svg))
      .webp({ quality: 82 })
      .toFile(path.join(outputDirectory, `${component.slug}.webp`));
  }
  console.log(`Generated ${selectedComponents.length} placeholder thumbnails.`);
  process.exit(0);
}

const baseUrl = process.env.CAPTURE_BASE_URL ?? "http://127.0.0.1:3000";
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 720, height: 450 },
});
let cursor = 0;
async function worker() {
  const page = await context.newPage();
  while (cursor < selectedComponents.length) {
    const component = selectedComponents[cursor++];
    if (!component) break;
    await page.goto(`${baseUrl}/api/preview/${component.slug}`, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await page.waitForTimeout(700);
    const png = await page.screenshot({ type: "png" });
    await sharp(png)
      .resize(720, 450, { fit: "cover" })
      .webp({ quality: 78 })
      .toFile(path.join(outputDirectory, `${component.slug}.webp`));
  }
  await page.close();
}
await Promise.all(Array.from({ length: 6 }, () => worker()));
await browser.close();
console.log(`Captured ${selectedComponents.length} live thumbnails.`);
