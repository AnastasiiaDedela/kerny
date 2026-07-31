---
name: repository-map
description: One-line index of every source file in this repo and what it does. Use when locating where something lives, or before creating a new file, to confirm whether similar functionality already exists.
---

Current as of this writing — re-check with `Glob`/`Read` if it looks stale, don't treat this as gospel forever.

## `src/app/`

- `layout.tsx` — root layout: `<html>`/`<body>`, loads Inter as `--font-inter`, renders `<Header />` (shared by every page).
- `globals.css` — Tailwind v4 theme (`@theme inline`), dark-only palette on `:root`.
- `(site)/layout.tsx` — `<main>` + default `<Footer />` (`'legal'` variant).
- `(site)/page.tsx` — home page, stacks `home/*` sections.
- `(site)/pricing/page.tsx` — **stub only** (`<h1>Pricing</h1>`). `TariffTable`/`CloudServerBuilder` and `@tanstack/react-table` don't exist yet — see the `tanstack` skill.
- `about/layout.tsx`, `about/page.tsx` — `<main>` + `<Footer variant="brand" />`, stacks `about/*` sections.
- `data-centers/layout.tsx`, `data-centers/page.tsx` — same footer variant, stacks `data-centers/*` sections.

## `src/components/home/`

`Banner.tsx`, `WhatIsVps.tsx`, `WhyOurService.tsx`, `OperationSystems.tsx`, `DataCenterRegions.tsx`, `Faq.tsx`, `CtaBanner.tsx` — one file per home-page visual section, imported in order by `(site)/page.tsx`.

## `src/components/about/`

`OurAudience.tsx`, `OurAdvantages.tsx`, `JoinTeam.tsx` — same pattern for `/about`.

## `src/components/data-centers/`

`DataCentersContent.tsx` — same pattern for `/data-centers`.

## `src/components/layout/`

- `Header.tsx` — `'use client'`; nav links array, desktop nav + mobile overlay menu with `useState` open/close.
- `Footer.tsx` — `variant: 'legal' | 'brand'` prop; `LegalDetails`/brand-summary + shared `NavColumn` (Services/Company links).

## `src/components/ui/`

`accordion.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`, `tabs.tsx` — shadcn (`base-nova` style) primitives on `@base-ui/react`. See the `ui` skill before adding more.

## `src/lib/`

`utils.ts` — `cn()` (clsx + tailwind-merge). Only className helper in the repo.

## `public/`

`images/` (incl. `images/about-us-img/`, `images/systems-img/`), `icons/`, `flags/` — served via `next/image`.

## Root config

- `next.config.ts` — `images.qualities: [75, 100]`, `dangerouslyAllowSVG` + sandboxing CSP.
- `components.json` — shadcn config: style `base-nova`, base color `neutral`, icons `lucide`, css vars on, aliases `@/components`, `@/lib`, `@/components/ui`, `@/lib`(utils), `@/hooks`.
- `eslint.config.mjs` — flat config: `eslint-config-next` (core-web-vitals + typescript) + `eslint-config-prettier`.
- `.prettierrc` — semi, single quotes, trailing comma `es5`, print width 100, `prettier-plugin-tailwindcss`.
- `tsconfig.json` — `strict: true`, path alias `@/*` → `./src/*`.

## Stale docs — don't trust literally

`COMPONENTS_SETUP.md` predates a rename/restructure: it references `Hero.tsx`, `Features.tsx`, `Regions.tsx`, `Systems.tsx`, `CTA.tsx`, none of which exist under those names (the real files are `Banner.tsx`, `WhyOurService.tsx`, `DataCenterRegions.tsx`, `OperationSystems.tsx`, `CtaBanner.tsx`), and calls `@base-ui/react` "Radix UI primitives (via Base UI)" when the repo uses Base UI directly, not Radix. Use this map and `CLAUDE.md` instead; `COMPONENTS_SETUP.md`'s shadcn-add instructions and dependency list are still accurate.
