# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The rule above is not boilerplate. This project pins **Next.js 16.2** and **React 19.2**, both of which diverge from older training data. Before writing routing, rendering, image, font, or config code, invoke the `nextjs-docs` skill to find the exact guide under `node_modules/next/dist/docs/01-app/` (App Router) instead of exploring the tree, and heed deprecation notices.

## What this is

Kerny — a marketing site for a VPS hosting service. Static, content-driven marketing pages (home, about, pricing, data centers). No backend, no database, no API routes, no auth; all copy and data are hard-coded inline in components.

## Commands

```bash
npm run dev            # dev server on http://localhost:3000
npm run build          # production build
npm run start          # serve the production build
npm run lint           # eslint (flat config)
npm run format         # prettier --write .
npm run format:check   # prettier --check . (CI-safe)
```

There is no test suite. Package manager is **pnpm** (`pnpm-lock.yaml`, `pnpm-workspace.yaml` present) though a `package-lock.json` also exists — prefer pnpm.

## Architecture

### Routing (App Router)

- `src/app/layout.tsx` is the **root** layout: sets `<html>`/`<body>`, loads the Inter font as `--font-inter`, and renders the shared `<Header />` for every page.
- Page groups each own their `<Footer />` via a nested layout, so the footer is not in the root:
  - `src/app/(site)/` — route group (no URL segment) holding the home page (`/`) and `/pricing`. Its `layout.tsx` wraps children in `<main>` and appends `<Footer />` (no variant — defaults to `'legal'`: company legal block + payment badges).
  - `src/app/about/` and `src/app/data-centers/` — each has its own `layout.tsx` appending `<Footer variant="brand" />` instead (brand summary paragraph, no legal block).
- A page is composed by importing section components and stacking them (see `src/app/(site)/page.tsx`). Adding a marketing page = new folder under `src/app/`, a `layout.tsx` (main + footer), and a `page.tsx` that assembles section components.

### Component layers

- `src/components/ui/` — shadcn/ui primitives (`style: "base-nova"`), built on **`@base-ui/react`** (NOT Radix, despite what `COMPONENTS_SETUP.md` says — that doc is partly stale). Variants use `class-variance-authority`. Add more with `npx shadcn@latest add <name>`.
- `src/components/<page>/` — page-specific section components (`home/`, `about/`, `pricing/`, `data-centers/`), one file per visual section.
- `src/components/layout/` — `Header` and `Footer`, shared across all pages.
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge). Use it for all conditional className composition.
- Path alias: `@/*` → `src/*`.

### Styling & design system

- **Tailwind CSS v4** (CSS-first; no `tailwind.config.js`). All theme config lives in `src/app/globals.css` via `@theme inline` and CSS custom properties on `:root`.
- The app is **dark-only** by default: `:root` defines the dark palette directly (background `#0f0f0f`, primary/brand `#434cf7`). Use semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`) rather than raw hex where a token exists.
- Prettier runs `prettier-plugin-tailwindcss`, so class order is auto-managed — don't hand-sort classes.
- Responsive pattern is mobile-first with `md:`/`lg:` breakpoints; several components render **separate mobile and desktop markup** blocks toggled by `lg:hidden` / `hidden lg:block` (see `TariffTable.tsx`) rather than restyling one tree.

### Client vs server components

Default to server components. Add `'use client'` only for interactivity — e.g. `Header` (mobile menu state), and the pricing components that use `@tanstack/react-table` and selection state (`TariffTable`, `CloudServerBuilder`).

### Assets

- `public/images/`, `public/icons/`, `public/flags/` — served via `next/image`.
- `next.config.ts` allows image `quality: 100` (for detailed illustrations that band at 75) and enables `dangerouslyAllowSVG` with a sandboxing CSP, because local SVG badges/flags are served through the optimizer. Keep that CSP if you touch image config.
- `--font-logo` expects a "Nekst" font that isn't shipped yet; it falls back to Inter. The `Kerny` wordmark uses `font-logo`.
