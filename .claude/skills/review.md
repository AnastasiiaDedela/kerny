---
name: review
description: Project-specific pre-submit checklist for this repo — server/client boundary, Footer variant correctness, container/token conventions, formatting. Use before calling any code change in this repo done.
---

- [ ] New/changed component defaults to a server component; `'use client'` only where actually needed (state/events/browser APIs) — see the `architecture` skill.
- [ ] New or changed layout uses the right `<Footer>` variant: no prop (`'legal'`) for pages grouped like `(site)`, `variant="brand"` for standalone pages like `about/`/`data-centers/` — see the `architecture` skill. Getting this backwards compiles fine and silently renders the wrong footer content.
- [ ] Section wrapper matches the repo convention (`mx-auto w-full max-w-340 px-5 py-{n}`), not a new ad-hoc container — see `frontend-standards`.
- [ ] Colors use semantic tokens (`bg-background`, `text-foreground`, ...) unless matching an existing one-off raw-hex precedent.
- [ ] `next/image` used for any image, never `<img>`; `fill` vs explicit `width`/`height` chosen per `frontend-standards`.
- [ ] New shadcn primitives added via `npx shadcn@latest add`, not hand-written; `data-slot` preserved — see `ui`.
- [ ] `npm run lint` and `npm run format:check` pass (or `npm run format` was run) before calling the change done.
- [ ] No test files added — this repo has no test suite — unless the user explicitly asked for one.
- [ ] Placeholder Lorem ipsum copy left untouched unless the task is specifically about that page's content.
- [ ] If the change touches routing/layouts/images/fonts/metadata/`next.config.ts`, it matches the doc found via the `nextjs-docs` skill, not pre-16 Next.js assumptions.
