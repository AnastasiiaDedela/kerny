---
name: coding-standards
description: TypeScript, export, and file-organization conventions specific to this repo — path aliases, component export style, inline prop typing, data-constant placement. Use when writing or editing any .ts/.tsx file.
---

- Import via the `@/*` path alias (`@/*` → `./src/*`, `tsconfig.json`) — never relative `../../..` across top-level folders.
- Section and UI components use **named exports** (`export function Faq() {}`), not default exports. `page.tsx`/`layout.tsx` are the one exception — Next.js requires those as default exports.
- Type props inline against the primitive/element being wrapped rather than a standalone `interface`:
  - `React.ComponentProps<'div'> & { size?: 'default' | 'sm' }` (`Card`)
  - `ButtonPrimitive.Props & VariantProps<typeof buttonVariants>` (`Button`)
    Follow this shape for new components instead of declaring a separate `Props` interface.
  - Two sanctioned exceptions: table components use a named `interface XProps { data: Row[] }` because the row generic needs a name (see `tanstack`), and `src/api/*/types.ts` files declare exported type aliases of generated schemas (see `api-types`).
- Hard-coded copy/data is a `const` at module scope, directly above the component that consumes it — e.g. `Faq.tsx`'s `title`/`content` strings, `DataCenterRegions.tsx`'s `northAmerica`/`europe`/... arrays with an explicit `type Region = { city: string; country: string; code: string }`. Don't extract this into a separate data file or fetch layer unless asked.
- Placeholder body copy is literal `"Lorem ipsum..."` throughout — intentional (content not finalized yet), not a bug. Don't replace it with real copy unless the task is specifically about that page's content.
- No test suite exists in this repo (`CLAUDE.md`) — don't scaffold test files or a test framework unless explicitly requested.
- `strict: true`, `noEmit`, `isolatedModules` are on — avoid patterns that need a separate type-only export/compile step.
- There is **no** `typecheck` script in `package.json` (`lint`, `format`, `format:check` only). Run `npx tsc --noEmit` when a change needs type verification — don't tell the user to run a script that doesn't exist.
- Data-fetching code is the exception to the "hard-coded const" rule above and has its own module layout — see the `api-layer` skill before adding anything under `src/api/`.
- Class name composition always goes through `cn()` from `@/lib/utils` (clsx + tailwind-merge), never manual string concatenation or template literals for conditional classes.
