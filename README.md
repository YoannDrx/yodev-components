# YoDev Components

YoDev Components is a visual catalog of frontend inspiration and a separate,
reusable React component package. The initial catalog follows every public
repository published by [Frontend Joe](https://github.com/frontend-joe).

The current inventory contains 101 repositories and 493 curated entries: 334
isolated HTML/CSS/JS previews, 152 safe framework/project snapshots, one
external demo and six explicit non-component fallbacks. The original
`@yodev/components` package provides 26 accessible React components covering
409 reusable source references by family.

## Principles

- Catalog external work with exact provenance and license status.
- Run HTML/CSS/JS previews inside a restricted iframe.
- Never copy unlicensed upstream source into `@yodev/components`.
- Keep human curation separate from generated GitHub metadata.
- Preserve the upstream preview when an original YoDev adaptation exists.

## Development

```bash
corepack enable
pnpm install
GH_TOKEN="$(gh auth token)" pnpm catalog:sync
pnpm dev
```

Open <http://localhost:3000>. See `CONTRIBUTING.md` for the curation workflow.

## Workspace

- `apps/catalog`: Next.js App Router application.
- `packages/ui`: original `@yodev/components` React package.
- `packages/catalog-core`: schemas, GitHub synchronization and preview helpers.
- `catalog/generated`: machine-owned catalog data.
- `catalog/curation`: human-owned favorites, reviews and notes.

## Legal

The MIT license covers original YoDev code only. Read
`UPSTREAM_CONTENT_NOTICE.md` before reusing any cataloged item.
