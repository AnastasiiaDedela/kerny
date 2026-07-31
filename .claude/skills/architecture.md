---
name: architecture
description: Structural decision rules for this repo — when a new page joins the (site) route group vs gets its own layout, the Footer variant contract, and the client/server component boundary rule. Use when adding a page/route, changing a layout, or deciding whether a component needs 'use client'.
---

Deeper, decision-oriented companion to `CLAUDE.md`'s Architecture section — read that first for the map, this for the rules behind it.

## Route groups: when to join `(site)` vs make a new folder

`src/app/(site)/` exists purely to let `/` and `/pricing` share one `layout.tsx` (bare `<main>` + default `<Footer />`) without adding a URL segment. `/about` and `/data-centers` are **not** in `(site)` because they need a different `<Footer>` prop (see below) — each gets its own top-level folder + `layout.tsx` instead.

Rule for a new page: join `(site)` only if it needs the exact same layout — bare `<main>`, default `<Footer />`, no other wrapper. If it needs `Footer variant="brand"` or any other divergence, give it its own `<route>/layout.tsx` like `about/` and `data-centers/`.

## Footer variant contract

This is easy to get backwards because both call sites look symmetric:

- `src/app/(site)/layout.tsx` → `<Footer />` with **no variant prop** → defaults to `'legal'` → renders the company legal block (name/country/registration/address) + payment badges (`LegalDetails` in `Footer.tsx`).
- `src/app/about/layout.tsx` and `src/app/data-centers/layout.tsx` → `<Footer variant="brand" />` → renders the lorem-ipsum brand summary paragraph instead.

Swapping these compiles fine (both are valid `FooterVariant` values) and renders the wrong footer content with no type error — check this explicitly when touching any layout.

## Client/server boundary

Default every component to a server component. Add `'use client'` only at the component that actually needs browser state/events/hooks — e.g. `Header.tsx` (mobile menu `useState`). Presentational `@base-ui/react`-backed primitives don't automatically need it in their own file: check the primitive file's own top line rather than assuming a blanket rule (see the `ui` skill).

## Page composition

A `page.tsx` is an ordered stack of imported section components from `src/components/<page>/` — no shared layout logic lives in `page.tsx` itself; that belongs in the route's `layout.tsx`.

## No data layer

All copy/data is hard-coded as module-level constants directly above the component that uses them (see the `coding-standards` skill). There is no fetch, no CMS, no API route, no database — don't introduce one without being asked.
