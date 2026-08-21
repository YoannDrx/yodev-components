import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@yodev/catalog-core": path.resolve("packages/catalog-core/src/index.ts"),
      "@yodev/components": path.resolve("packages/ui/src/index.ts"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["packages/**/tests/**/*.test.{ts,tsx}"],
  },
});
