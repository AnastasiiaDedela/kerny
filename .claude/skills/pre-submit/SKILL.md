---
name: pre-submit
description: Project-specific pre-submit checklist for this repo — server/client boundary, Footer variant correctness, API-layer conventions, container/token conventions, formatting. Use before calling any code change in this repo done.
---

Named `pre-submit` rather than `review` because a built-in skill already owns that name and would shadow this one.

## Every change

- [ ] New/changed component defaults to a server component; `'use client'` only where actually needed (state/events/browser APIs/query hooks) — see the `architecture` skill.
- [ ] Section wrapper matches the repo convention (`mx-auto w-full max-w-340 px-5 py-{n}`), not a new ad-hoc container — see `frontend-standards`.
- [ ] Colors use semantic tokens (`bg-background`, `text-foreground`, ...) unless matching an existing one-off raw-hex precedent.
- [ ] `next/image` used for any image, never `<img>`; `fill` vs explicit `width`/`height` chosen per `frontend-standards`.
- [ ] Named exports for components; only `page.tsx`/`layout.tsx` default-export — see `coding-standards`.
- [ ] `npm run lint` and `npm run format:check` pass (or `npm run format` was run) before calling the change done. There is **no** typecheck script — if types matter, run `npx tsc --noEmit`.
- [ ] No test files added — this repo has no test suite — unless the user explicitly asked for one.
- [ ] Placeholder Lorem ipsum copy left untouched unless the task is specifically about that page's content.
- [ ] If the change touches routing/layouts/images/fonts/metadata/`next.config.ts`, it matches the doc found via the `nextjs-docs` skill, not pre-16 Next.js assumptions.

## Layout / routing changes

- [ ] Right `<Footer>` for the family: no prop (`'legal'`) for `(site)`, `variant="brand"` for standalone pages like `about/`/`data-centers/`, **none at all** for `workspace/` — see `architecture`. Getting this backwards compiles fine and silently renders the wrong footer.
- [ ] No redundant `layout.tsx` added under `(site)/` or `workspace/` — both already supply their shell.

## UI primitive changes

- [ ] New shadcn primitives added via `npx shadcn@latest add`, not hand-written; `data-slot` preserved — see `ui`.
- [ ] Workspace modals compose `ModalShell`/`ModalField` from `modal-parts.tsx` instead of a fresh `Dialog` — see `workspace`.

## Data / API changes

- [ ] Every `apiClient` call is wrapped in `unwrap()` — a bare `{ data, error }` destructure makes failures look like successes.
- [ ] New hooks live in the domain's `queries.ts`/`mutations.ts` and are re-exported from its `index.ts`; consumers import from `@/api/<domain>`, not a deep path — see `api-layer`.
- [ ] Query keys come from the domain's key factory, not an inline array literal.
- [ ] No per-hook re-specifying of defaults already set in `query-client.ts` (`staleTime`, 4xx no-retry, mutation `retry: false`).
- [ ] Types alias `components['schemas'][...]` via the domain `types.ts` rather than being hand-copied — and `src/types/api.d.ts` was grepped, not read whole (see `api-types`).
- [ ] Nothing hard-codes `https://api.kerny.tech`; the proxy in `lib/api-proxy.ts` and `NEXT_PUBLIC_API_BASE_URL` handle that.
- [ ] Mock constants replaced by hooks weren't left behind as dead code.
