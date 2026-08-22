import type { SourceRepository } from "./catalog-schema";

export const sourceLabels: Record<SourceRepository, string> = {
  "css-components": "CSS Components",
  "js-components": "JS Components",
  "css-reels": "CSS Reels",
  "es6-components": "ES6 Components",
  "react-components": "React Components",
};

export function familyLabel(value: string) {
  if (value === "gsap") return "GSAP";
  if (value === "svgs") return "SVGs";
  return value.charAt(0).toUpperCase() + value.slice(1);
}
