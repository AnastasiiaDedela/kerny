---
name: frontend-standards
description: Styling, responsive, and layout conventions for page/section components — container widths, breakpoint strategy, mobile-vs-desktop markup pattern, dark-only theming, icon/image handling. Use when writing or editing Tailwind classes in section components (src/components/<page>/*) or layouts.
---

- **Dark-only**: no light/dark toggle. `:root` already defines the dark palette, so section components don't need `dark:` variants — those only appear inside imported shadcn primitives for defensive parity.
- **Semantic tokens over raw hex**: `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, etc. Raw hex/oklch is acceptable only for a one-off state a token doesn't cover (e.g. `Button`'s `hover:bg-[#6C72FA]`) — don't add a new raw color if an existing token fits.
- **Container pattern**: top-level section wrapper is `mx-auto w-full max-w-340 px-5 py-{n}` (`max-w-340` = 1360px). Reuse this exact wrapper for new sections rather than inventing a new max-width.
- **Mobile-first**, `md:`/`lg:` breakpoints. Two responsive strategies coexist in this repo — pick per case, don't mix within one component:
  - _Single tree, responsive utilities_ (most sections — `Faq.tsx`, `DataCenterRegions.tsx`): use when mobile/desktop differ only in spacing/columns/direction.
  - _Two full markup blocks_, toggled with `lg:hidden` / `hidden lg:block` (`Header.tsx`'s mobile overlay menu): use when mobile and desktop are structurally different UI, not just restyled.
- **Arbitrary Tailwind values are normal here** — `px-[10px]`, `w-175`, `gap-12.5`, `rounded-[15px]`, `h-[78px]`. This project doesn't restrict itself to the default spacing scale; don't "clean up" arbitrary values into the nearest default one.
- Prettier auto-sorts class order (`prettier-plugin-tailwindcss`) — never hand-order classes; run `npm run format` instead of manually reordering.
- **Icons**: `lucide-react`, sized with `size-*` utilities (`size-7`, `size-3`), not `width`/`height` props.
- **Images**: `next/image`. Use `fill` inside a `relative` + `overflow-hidden` sized wrapper for cropped/responsive images (flags in `DataCenterRegions.tsx`); use explicit `width`/`height` for fixed-size assets (payment badges in `Footer.tsx`). `quality={100}` is opt-in per `next.config.ts` (illustrations that band at the default 75) — don't set it globally.
