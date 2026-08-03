---
name: workspace
description: Conventions for the authenticated /workspace app section — its sidebar+header shell layout, the ModalShell/ModalField modal parts, the @tanstack/react-table pattern, and the mock-data-pending-API state. Use when adding or editing anything under src/app/workspace/ or src/components/workspace/.
---

`/workspace` is the authenticated product area, structurally different from the marketing pages: **no `<Footer>`, its own header and sidebar**, and a persistent two-column shell.

## The shell

`src/app/workspace/layout.tsx` renders `<WorkspaceHeader />` above a `<main>` that holds `<WorkspaceSidebar />` plus a `min-w-0 flex-1` content slot:

```tsx
<main className="mx-auto flex w-full max-w-340 flex-1 flex-col gap-6 px-5 pb-5 lg:flex-row lg:pb-10">
```

Same `max-w-340 px-5` container as the marketing sections (`frontend-standards`), but it stacks on mobile and goes two-column at `lg`. A new workspace page is just a `page.tsx` under `src/app/workspace/` — **don't add a nested `layout.tsx`**; the shell already applies, and `min-w-0` on the content slot is what keeps wide tables from blowing out the flex row. Keep it.

Routes today: `/workspace` (cloud servers), `/balance`, `/notifications`, `/documentations`, `/new-server`, `/servers/[id]`.

## Sidebar nav

`WorkspaceSidebar.tsx` is `'use client'` (needs `usePathname` for the active state) and exports `navItems` — a module-level array where each entry carries its own `icon` path, `width`, `height`, **and a per-item `gap` class**, because the SVGs have different intrinsic sizes and need individually tuned spacing. Adding a nav item means adding an entry there with all five fields, not just a label and href.

Icons are `next/image` with explicit `width`/`height` from `public/images/`, not `lucide-react` — match that.

## Modals

`modal-parts.tsx` holds the shared pieces; compose from them rather than hand-rolling a `Dialog`:

- `ModalShell` — `open`/`onOpenChange`/`title`/`children`, wraps `Dialog`+`DialogContent` with `showCloseButton={false}` and the project's exact modal box (373px / 30px radius on mobile, 448px / 20px radius and `bg-[#121212]` from `lg`).
- `ModalField` — labelled input row.

`ActivatePromocodeModal.tsx` and `AddPaymentMethodModal.tsx` are the reference usages. The sizing comments in `modal-parts.tsx` record real Figma values — don't "round" them (see `build-section`).

## Tables

Five components use `@tanstack/react-table`: `ServerTable`, `BalanceHistoryTable`, `ServerHistory`, `ServerIpAddresses`, and pricing's `TariffTable`. The shared pattern:

- `'use client'`, `createColumnHelper` + `getCoreRowModel` + `flexRender`, `useReactTable`.
- The row type is an **exported interface next to the component** (`export interface ServerRow`), and the page imports it to type its data array: `import { ServerTable, type ServerRow } from '@/components/workspace/ServerTable'`.
- Props are a small explicit `interface XProps { data: Row[] }` — this is the one place the repo uses a named props interface instead of inline typing, because the row generic needs the name anyway.
- Cell rendering goes through tiny local presentational components (`TextValue`, `StatusValue`, `IpValue`) rather than inline JSX in the column def. Follow that when adding columns.
- Only `getCoreRowModel` is wired up so far — no sorting/filtering/pagination model is in use. Add one only if the feature actually needs it.

## Data is still mocked — check before wiring

Every workspace page currently declares its data as a **module-level `const` of hard-coded mock values** (`servers` in `workspace/page.tsx`, `server` in `servers/[id]/page.tsx`) even though `src/api/` now exists and the API has real endpoints for this. That's a migration in progress, not a decision that the workspace is static.

So: before adding a feature here, `Grep` the actual file rather than assuming either state. If the task is to wire a page to the API, replace the const with hooks per the `api-layer` skill — which makes the page a client component, so keep the boundary narrow and let the static surrounding copy stay on the server.

Mock passwords in these constants (e.g. `password: 'kerny-vps-2026'`) are placeholder display data for the design, not credentials — but don't propagate them into anything that looks like real config.
