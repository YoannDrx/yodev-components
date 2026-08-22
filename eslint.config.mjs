import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    "**/.next/**",
    "apps/**",
    "catalog/**",
    "packages/**",
    "outputs/**",
    "**/dist/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "components/library/generated/**",
    "next-env.d.ts",
    "work/**",
  ]),
]);
