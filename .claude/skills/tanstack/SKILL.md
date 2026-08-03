---
name: tanstack
description: Planned conventions for the pricing page's data table (TariffTable) and configurator (CloudServerBuilder), which will use @tanstack/react-table. Use only when implementing or editing /pricing beyond its current stub.
---

## Current status — read this before assuming the components exist

`src/app/(site)/pricing/page.tsx` is currently a one-line stub (`<h1>Pricing</h1>`). `TariffTable` and `CloudServerBuilder` do not exist yet, and `@tanstack/react-table` is **not** in `package.json`, even though `CLAUDE.md`'s architecture section names them as already using it. Treat that line as the intended design, not existing code — verify with `Grep`/`Read` before relying on it.

## When actually building these

- Add the dependency first: `pnpm add @tanstack/react-table` (this project uses pnpm — `pnpm-lock.yaml`/`pnpm-workspace.yaml`).
- Row selection / sorting state means the table needs `'use client'` — but keep that boundary as narrow as possible (see the `architecture` skill): wrap only the interactive table/configurator island in `'use client'`, keep `page.tsx` and any static surrounding copy as server components.
- Follow the rest of the repo's existing conventions rather than inventing new ones:
  - Named export, not default (see `coding-standards`).
  - Module-level `const` for tier/column data with an explicit type, mirroring `Region` in `DataCenterRegions.tsx`.
  - Section wrapper `mx-auto w-full max-w-340 px-5 py-{n}` (see `frontend-standards`).
  - If the table and configurator render structurally different UI at mobile vs desktop (not just restyled), use the dual-markup `lg:hidden`/`hidden lg:block` pattern instead of trying to force one responsive tree.
- No data-fetching layer — tier/pricing data is hard-coded like everything else in this repo; don't add an API route or CMS call.
