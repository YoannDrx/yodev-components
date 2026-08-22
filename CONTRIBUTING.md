# Contributing

The generated inventory is machine-owned. Never edit
`content/components.json`, `components/library/ports.generated.tsx` or
`components/library/loaders.generated.ts` by hand.

For an upstream refresh:

```bash
GH_TOKEN="$(gh auth token)" pnpm catalog:sync
pnpm generate:ports
pnpm catalog:check
```

A new source remains `pending` and a modified source becomes `outdated` until
its React wrapper, fixture, preview and attribution have been reviewed. Removed
sources remain available as `removed-upstream` to avoid breaking URLs.

Before opening a pull request, run format check, lint, TypeScript, unit tests,
the Next.js build and the critical Playwright flows.
