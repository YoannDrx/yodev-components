# YoDev Components

YoDev Components is a focused React gallery for the five component collections
pinned by [Frontend Joe](https://github.com/frontend-joe): CSS Components, JS
Components, CSS Reels, ES6 Components and React Components.

The generated inventory contains exactly **252 components** across **31
families**. Every entry has a typed React wrapper, an isolated interactive
preview, stable provenance and a lazy loader. The personal `frontendjoe` site
and every non-pinned repository are intentionally excluded.

## Development

```bash
corepack enable
pnpm install
GH_TOKEN="$(gh auth token)" pnpm catalog:sync
pnpm generate:ports
pnpm dev
```

Open <http://localhost:3000>.

## Quality checks

```bash
pnpm catalog:check
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

The weekly synchronizer only reads the five allow-listed repositories. New or
changed entries require a reviewed porting pull request and are never merged
automatically.

## Deployment

The Vercel project uses the repository root as its Root Directory and Node.js
22.x. Validate the generated Preview deployment before promoting the same
artifact to production.

## Legal

The MIT license covers original YoDev code only. Read
`UPSTREAM_AUTHORIZATION_NOTICE.md` before reusing a cataloged item.
