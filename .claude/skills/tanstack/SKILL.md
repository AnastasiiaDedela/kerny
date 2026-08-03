---
name: tanstack
description: Conventions for @tanstack/react-table across the pricing and workspace tables — column helper pattern, exported row types, which row models are wired up. Use when building or editing a data table. For @tanstack/react-query data fetching, use the api-layer skill instead.
---

Both TanStack packages are installed and in use: **`@tanstack/react-table` ^8.21.3** (tables) and **`@tanstack/react-query` ^5.101.4** (data fetching). This skill covers the table; for query/mutation hooks see the `api-layer` skill.

## Where tables already exist

Five components, all `'use client'` — read the nearest one before writing a new table:

- `src/components/pricing/TariffTable.tsx` — tier comparison
- `src/components/pricing/CloudServerBuilder.tsx` — configurator (selection state)
- `src/components/workspace/ServerTable.tsx` — the cleanest reference
- `src/components/workspace/BalanceHistoryTable.tsx`, `ServerHistory.tsx`, `ServerIpAddresses.tsx`

## The pattern

- `createColumnHelper<Row>()` + `useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })` + `flexRender`.
- **Only `getCoreRowModel` is wired up anywhere.** No sorting, filtering, or pagination model is in use. Add one only if the feature actually calls for it — don't include it reflexively.
- The row type is an **exported interface beside the component**, and pages import it to type their data:
  ```ts
  import { ServerTable, type ServerRow } from '@/components/workspace/ServerTable';
  ```
- Props use a small explicit `interface XProps { data: Row[] }`. This is the one sanctioned exception to `coding-standards`' inline-prop-typing rule — the row generic needs a name anyway.
- Cells render through tiny local presentational components (`TextValue`, `StatusValue`, `IpValue` in `ServerTable.tsx`) rather than inline JSX inside the column definition.
- Keep `'use client'` on the table island only; `page.tsx` and surrounding static copy stay server components (see `architecture`).

## Responsive tables

`TariffTable.tsx` renders **two full markup blocks** toggled with `lg:hidden` / `hidden lg:block` rather than restyling one tree — the mobile and desktop presentations are structurally different. Follow that when the same is true; use single-tree responsive utilities when only spacing/columns change (see `frontend-standards`).

Inside the workspace shell, the content slot is `min-w-0 flex-1` so a wide table scrolls instead of stretching the flex row — don't remove that (see `workspace`).

## Data source

Table data is currently hard-coded as module-level `const`s on the pages, even though `src/api/` exists — a migration in progress. `Grep` the specific page rather than assuming; if you're wiring it to the API, follow `api-layer`.

## Package manager

This project uses **pnpm** (`pnpm-lock.yaml`, `pnpm-workspace.yaml`) — `pnpm add <pkg>`, not npm, if a dependency is genuinely missing.
