# Contributing and curation

## Refresh Frontend Joe

```bash
GH_TOKEN="$(gh auth token)" pnpm catalog:sync
pnpm catalog:check
```

The generated manifest must never be edited by hand.

## Add and curate

```bash
pnpm catalog:add https://github.com/owner/repository/tree/main/path
pnpm catalog:favorite 'github:owner/repository:path'
pnpm catalog:review 'github:owner/repository:path'
```

Human decisions are stored as YAML in `catalog/curation`. Adaptations belong in
`packages/ui` and must include an inspiration URL, tests and accessible usage.
