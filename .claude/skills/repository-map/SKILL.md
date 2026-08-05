---
name: repository-map
description: One-line index of every source file in this repo and what it does. Use when locating where something lives, or before creating a new file, to confirm whether similar functionality already exists.
---

Current as of this writing — re-check with `Glob`/`Read` if it looks stale, don't treat this as gospel forever.

The repo has two halves: **marketing pages** (`/`, `/about`, `/data-centers`, `/pricing`) and the **authenticated workspace** (`/workspace/*`), plus an API layer shared by both.

## `src/app/`

- `layout.tsx` — root layout: `<html>`/`<body>`, loads Inter as `--font-inter`, renders `<Providers>` + `<Header />`.
- `providers.tsx` — `'use client'`; `QueryClientProvider` from `getQueryClient()`.
- `globals.css` — Tailwind v4 theme (`@theme inline`), dark-only palette on `:root`.
- `(site)/layout.tsx` — `<main>` + default `<Footer />` (`'legal'` variant).
- `(site)/page.tsx` — home page, stacks `home/*` sections.
- `(site)/pricing/page.tsx` — pricing page; `TariffTable` + `CloudServerBuilder`.
- `about/layout.tsx`, `about/page.tsx` — `<main>` + `<Footer variant="brand" />`, stacks `about/*`.
- `data-centers/layout.tsx`, `data-centers/page.tsx` — same footer variant, stacks `data-centers/*`.
- `workspace/layout.tsx` — `<WorkspaceHeader />` + `<WorkspaceSidebar />` shell, **no footer**. See the `workspace` skill.
- `workspace/page.tsx` (cloud servers), `balance/`, `notifications/`, `documentations/`, `new-server/`, `servers/[id]/` — workspace pages.
- `api/[...path]/route.ts`, `api/route.ts` — same-origin proxy handlers, both delegating to `lib/api-proxy.ts`. See the `api-layer` skill.

## `src/api/`

TanStack Query + openapi-fetch data layer — see the `api-layer` skill before touching.

- `client.ts` — `apiClient` (openapi-fetch), `unwrap()`, `ApiError`.
- `query-client.ts` — `getQueryClient()`; server-fresh / browser-singleton, shared defaults.
- `auth/` — `index.ts`, `keys.ts`, `queries.ts` (`useSession`, `useCurrentUser`), `mutations.ts` (signup/login/logout/password reset/Google/revoke, plus `fieldError`/`formError`), `types.ts`.
- `app/` — same five-file shape; `useApiRoot`/`useApiReachable` health checks.
- `health/` — `useHealth`/`useReadiness`/`useApiStatus` liveness + readiness probes.
- `account/` — `queries.ts` (`useAccountSettings`, `useMe`, `useAccountBalance`, `useAccountDeletion`), `mutations.ts` (email change request/confirm, password change, account deletion).
- `catalog/` — public regions + operating systems; `useRegions`/`usePublicRegions`/`useDeployableRegions`, `useOperatingSystems`/`useDeployableOperatingSystems`. Reads only, 1h `staleTime`.
- `content/` — public FAQ, legal documents, contact info; `useFaqItems`, `useLegalSummaries`/`useLegalDocument`, `useContactDetails`. The legal hooks are unwired (no `/legal` route exists).
- `pricing/` — `usePricing` (tariffs/addons/billing periods/VAT) and `useQuote`/`useQuoteTotals`. The quote is a POST modelled as a **query**: pure function of its items, so the cost panels re-run it on every selection change.
- `billing/` — `queries.ts` (`useBillingSummary`/`useBillingOverview`, `useBillingTransactions`, `useDefaultPaymentMethod`), `mutations.ts` (profile patch, deposit, payment-method setup + save, promocode). Cards are collected by the provider: setup returns a redirect or a hosted-session token, never a direct card save.
- `servers/` — `queries.ts` (`useServers`/`useServerList`, `useServer`, `useServerHistory`, `useServerIpAddresses`, `useServerBackups`), `mutations.ts` (power/restart/settings/backups/reinstall/password reset+reveal/extend/delete/create). Short 15s `staleTime` — status changes without user action.

`POST /api/servers`, `.../backups/enable`, `.../extend` and `DELETE /api/servers/{id}` require an `Idempotency-Key` header — use `idempotencyHeaders()` from `client.ts`.

## `src/types/`

- `api.d.ts` — **10.5k lines, generated** from the OpenAPI spec. Never read whole; see the `api-types` skill.

## `src/components/home/`

`Banner.tsx`, `WhatIsVps.tsx`, `WhyOurService.tsx`, `OperationSystems.tsx`, `DataCenterRegions.tsx`, `Faq.tsx`, `CtaBanner.tsx` — one file per home-page section, imported in order by `(site)/page.tsx`. `DataCenterRegions.tsx` is `'use client'` (reads `@/api/catalog`); the rest are server components.

## `src/components/about/` · `data-centers/` · `pricing/`

- about: `OurAudience.tsx`, `OurAdvantages.tsx`, `JoinTeam.tsx`
- data-centers: `DataCentersContent.tsx` — `'use client'`; continent tabs over `@/api/catalog` regions
- pricing: `TariffTable.tsx`, `CloudServerBuilder.tsx` — both `'use client'`, `@tanstack/react-table`

## `src/components/workspace/`

Shell: `WorkspaceHeader.tsx`, `WorkspaceSidebar.tsx` (exports `navItems`).
Tables: `ServerTable.tsx`, `BalanceHistoryTable.tsx`, `ServerHistory.tsx`, `ServerIpAddresses.tsx`.
Server detail: `ServerInformation.tsx`, `ServerManagement.tsx`, `ServerBackups.tsx`.
Other: `BalanceOverview.tsx`, `NotificationList.tsx`, `DocumentationSection.tsx`, `NewCloudServerForm.tsx`, `PaymentMethodForm.tsx`.
Modals: `modal-parts.tsx` (`ModalShell`, `ModalField`), `ActivatePromocodeModal.tsx`, `AddPaymentMethodModal.tsx`, `DepositModal.tsx`.

## `src/components/layout/`

- `Header.tsx` — `'use client'`; nav links array, desktop nav + mobile overlay menu.
- `Footer.tsx` — `variant: 'legal' | 'brand'`; `LegalDetails` + shared `NavColumn`.
- `AuthModalProvider.tsx` — context/provider driving the auth modal.
- `auth/` — `AuthModal.tsx` plus one file per view: `LogInView`, `SignUpView`, `ResetPasswordView`, `NewPasswordView`, `SuccessView`, and `shared.tsx` for common form pieces.

## `src/components/ui/`

`accordion.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`, `checkbox.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `input.tsx`, `tabs.tsx`, `textarea.tsx` — shadcn (`base-nova`) primitives on `@base-ui/react`. See the `ui` skill before adding more.

## `src/lib/`

- `utils.ts` — `cn()` (clsx + tailwind-merge). Only className helper in the repo.
- `api-proxy.ts` — `proxyToApi()`; origin/cookie rewriting. See `api-layer`.
- `catalog.ts` — presentation helpers for `@/api/catalog` regions: `regionCountry()` (ISO code → label), `regionFlagSrc()` (null when no local flag), `continentsOf()`, `regionsIn()`.
- `pricing.ts` — `tariffMonthlyPrice()` (region override beats the base price), `formatAmount()` and the CPU/RAM/disk/bandwidth formatters. Money is a decimal string; never parse it as a float.
- `billing.ts` — `formatBalance()` (`999 €`), the ledger formatters + `toHistoryEntry()` (API entry → history-table row), `formatPaymentMethod()`, `parseExpiry()` (`MM/YY` → month/year).
- `servers.ts` — `isServerActive()`/`serverStatusLabel()` (eleven API states → one green dot + a readable label), `formatServerDate()`, `formatServerTimestamp()`.

## `public/`

`images/` (incl. `about-us-img/`, `systems-img/`, `servers/`, `user-img/`), `icons/` (incl. `server-info-icons/`), `flags/` — served via `next/image`.

## Root config

- `next.config.ts` — `images.qualities: [75, 100]`, `dangerouslyAllowSVG` + sandboxing CSP.
- `components.json` — shadcn: style `base-nova`, base color `neutral`, icons `lucide`.
- `eslint.config.mjs` — flat config: `eslint-config-next` + `eslint-config-prettier`.
- `.prettierrc` — semi, single quotes, trailing comma `es5`, print width 100, `prettier-plugin-tailwindcss`.
- `tsconfig.json` — `strict: true`, path alias `@/*` → `./src/*`.
- Scripts are only `dev`/`build`/`start`/`lint`/`format`/`format:check` — there is **no** typecheck or codegen script.

## Stale docs — don't trust literally

`COMPONENTS_SETUP.md` predates a rename/restructure: it references `Hero.tsx`, `Features.tsx`, `Regions.tsx`, `Systems.tsx`, `CTA.tsx`, none of which exist under those names (the real files are `Banner.tsx`, `WhyOurService.tsx`, `DataCenterRegions.tsx`, `OperationSystems.tsx`, `CtaBanner.tsx`), and calls `@base-ui/react` "Radix UI primitives (via Base UI)" when the repo uses Base UI directly, not Radix. Use this map and `CLAUDE.md` instead; `COMPONENTS_SETUP.md`'s shadcn-add instructions and dependency list are still accurate.
