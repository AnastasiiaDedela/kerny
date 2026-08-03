---
name: architecture
description: Structural decision rules for this repo — which of the four layout families a new page joins, the Footer variant contract, and the client/server component boundary rule. Use when adding a page/route, changing a layout, or deciding whether a component needs 'use client'.
---

Deeper, decision-oriented companion to `CLAUDE.md`'s Architecture section — read that first for the map, this for the rules behind it.

## Where a new page goes

There are four layout families. Pick by what chrome the page needs — the decision is the layout, not the URL:

| Family                  | Chrome                                      | Add a page by                         |
| ----------------------- | ------------------------------------------- | ------------------------------------- |
| `(site)/`               | `<main>` + default `<Footer />` (`'legal'`) | dropping `page.tsx` in — no new layout |
| `about/`, `data-centers/` | `<main>` + `<Footer variant="brand" />`   | new top-level folder **+ its own `layout.tsx`** |
| `workspace/`            | `WorkspaceHeader` + `WorkspaceSidebar`, **no footer** | dropping `page.tsx` under `workspace/` — no new layout (see the `workspace` skill) |
| `api/`                  | none — route handlers, not pages            | see the `api-layer` skill              |

`src/app/(site)/` exists purely to let `/` and `/pricing` share one layout without adding a URL segment. `/about` and `/data-centers` are **not** in it because they need a different `<Footer>` prop (see below).

So: join `(site)` only if the page needs the exact same layout — bare `<main>`, default `<Footer />`, no other wrapper. If it needs `Footer variant="brand"` or any other divergence, give it its own `<route>/layout.tsx`. If it's authenticated product UI, it belongs under `workspace/` and needs no layout at all.

`<Header />` is in the **root** layout, so every page gets it including `/workspace`, which renders its own `WorkspaceHeader` below it.

## Footer variant contract

This is easy to get backwards because both call sites look symmetric:

- `src/app/(site)/layout.tsx` → `<Footer />` with **no variant prop** → defaults to `'legal'` → renders the company legal block (name/country/registration/address) + payment badges (`LegalDetails` in `Footer.tsx`).
- `src/app/about/layout.tsx` and `src/app/data-centers/layout.tsx` → `<Footer variant="brand" />` → renders the lorem-ipsum brand summary paragraph instead.

- `src/app/workspace/layout.tsx` → **no `<Footer>` at all**. Don't add one "for consistency".

Swapping the two variants compiles fine (both are valid `FooterVariant` values) and renders the wrong footer content with no type error — check this explicitly when touching any layout.

## Client/server boundary

Default every component to a server component. Add `'use client'` only at the component that actually needs browser state/events/hooks — e.g. `Header.tsx` (mobile menu `useState`), `WorkspaceSidebar.tsx` (`usePathname`), the tables (selection state). Presentational `@base-ui/react`-backed primitives don't automatically need it in their own file: check the primitive file's own top line rather than assuming a blanket rule (see the `ui` skill).

Any TanStack Query hook (`useSession`, `useCurrentUser`, any mutation) makes its component a client component. Push the boundary down to the smallest island that needs the data rather than marking a whole `page.tsx` — the static copy around it should stay on the server. `Providers` (`src/app/providers.tsx`) is the one client wrapper mounted at the root, and it only wraps children in a context, so it doesn't force anything below it to be a client component.

## Page composition

A `page.tsx` is an ordered stack of imported section components from `src/components/<page>/` — no shared layout logic lives in `page.tsx` itself; that belongs in the route's `layout.tsx`.

## Two data regimes coexist

This repo is mid-migration, so **check the file rather than assuming either state**:

- **Marketing pages** are still fully hard-coded — copy and data are module-level constants directly above the component that uses them (see `coding-standards`). Don't introduce fetching here without being asked.
- **Workspace + auth** have a real data layer: `src/api/` (openapi-fetch + TanStack Query), proxied through `src/app/api/*` route handlers. See the `api-layer` skill. Several workspace pages still hold mock constants that haven't been wired up yet.

There is no CMS and no database in this repo — the API is a separate service at `api.kerny.tech`.
