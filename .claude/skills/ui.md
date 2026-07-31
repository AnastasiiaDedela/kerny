---
name: ui
description: Conventions for src/components/ui/ primitives — shadcn (style base-nova) on @base-ui/react, cva variant pattern, data-slot attributes, adding new primitives. Use when adding, editing, or composing a component from src/components/ui/.
---

- Primitives are generated with `npx shadcn@latest add <name>` (config in `components.json`: style `base-nova`, base color `neutral`, icon library `lucide`) — add new ones via the CLI and adjust, don't hand-write a primitive shadcn already offers.
- Built on **`@base-ui/react`, not Radix** — `COMPONENTS_SETUP.md` says Radix in places; that's stale, ignore it (see `repository-map`).
- Every primitive root/part carries a `data-slot="<name>"` attribute (`data-slot="card"`, `data-slot="accordion-trigger"`, ...) — preserve this when editing; other code or CSS may select on it.
- Variants are defined with `class-variance-authority` (`cva`) in the same file; `className` is always merged last via `cn()` so caller overrides win.
- Two component shapes exist — match whichever the primitive you're touching already uses:
  - **Direct wrapper**: render the underlying element/primitive directly with `cn(variants(), className)` (`Button`, `Tabs`).
  - **Polymorphic**: use `useRender` + `mergeProps` from `@base-ui/react` to support a `render` prop, so the primitive can render as a different element (`Badge`, for rendering as `<a>` instead of `<span>`).
- `'use client'` is not consistent across primitives that all wrap `@base-ui/react` internals — `Tabs.tsx` declares it, `Accordion.tsx` and `Badge.tsx` don't. Check the specific file's own top line rather than assuming a blanket rule for "primitives built on Base UI."
- New variants get added directly into the relevant component's existing `cva` config rather than a wrapper component — see the `hero` variant added alongside shadcn's defaults in `buttonVariants` (`button.tsx`).
