---
name: build-section
description: Turn a Figma image export + extracted Figma styles into a desktop and mobile section component for this repo. Use when the user sends a Figma export (image) and extracted styles and asks for a page section or layout to be built.
---

Procedure for the recurring workflow: user sends a Figma-exported image (desktop and/or mobile) plus extracted styles (colors, spacing, type), asks for the section to be built.

1. **Read the image(s)** with `Read`. If only one image is given, ask whether it's desktop, mobile, or both before assuming.
2. **Every number comes from the markup/styles the user sent — never invent one.** Padding, gaps, widths, heights, radii: use the exact value given. If a value isn't explicitly given (e.g. an outer container's padding that wasn't in the extracted styles), don't pick a "reasonable-looking" default (a past attempt guessed `p-10`/40px for a modal whose real spec was 30px, which silently broke the layout's box-model math and caused content to overflow the container) — check whether the surrounding numbers imply it (e.g. total width minus known children must equal padding × 2 + gaps) or ask.
   - Colors are the one place a semantic token is preferred over the raw value *when it computes to the exact same color* (`bg-background` for `#0F0F0F`, `bg-primary` for `#434CF7`, `bg-white/[0.04]` for `rgba(255,255,255,0.04)`, see `frontend-standards`) — that's fidelity via a name, not a substitution. If no token matches exactly, use the raw value, don't round to the nearest token.
   - Match spacing to this repo's arbitrary-value convention (`px-[10px]`, `gap-12.5`, `rounded-[15px]`) — the extracted px value maps directly, it doesn't get rounded to Tailwind's default scale.
   - If an asset (icon, brand mark, illustration) isn't available yet, leave a plain, undecorated placeholder (e.g. an empty sized `<span>` with the container's background) — don't invent a substitute glyph, letter, or icon that wasn't in the design.
3. **Decide file placement**: which page does this section belong to (`src/components/<page>/`)? If ambiguous, ask. One section per file, named export, module-level `const` for any copy/data (`coding-standards`).
4. **Decide mobile vs desktop strategy** (`frontend-standards`):
   - Single responsive tree if the mobile/desktop exports only differ in spacing/columns/stacking direction.
   - Two full markup blocks (`lg:hidden` / `hidden lg:block`) if the exports show a structurally different arrangement, not just a reflow.
5. **Reuse existing primitives** from `src/components/ui/` (`Button`, `Card`, `Badge`, `Accordion`, `Tabs`) wherever the design matches one, instead of hand-rolling the equivalent markup. Only add a new shadcn primitive via `npx shadcn@latest add <name>` if nothing already fits (`ui`).
6. **Copy**: use the actual text from the Figma export as the section's copy. Only fall back to this repo's `"Lorem ipsum..."` placeholder convention if the design itself clearly hasn't finalized that text.
7. **Section wrapper**: default to `mx-auto w-full max-w-340 px-5 py-{n}` unless the extracted styles clearly show a different container width/padding for this section.
8. **Assets**: any icon/illustration exported alongside the design goes to `public/images/`, `public/icons/`, or `public/flags/` per the existing layout (`repository-map`), served via `next/image` — `fill` inside a sized wrapper for cropped/responsive images, explicit `width`/`height` for fixed-size ones.
9. **Verify visually**: start the dev server preview, `resize_window` to mobile then desktop, screenshot, and compare side-by-side against the Figma export for spacing/typography/color drift before calling it done.
10. **Before finishing**: run through the `review` checklist, then `npm run lint` and `npm run format`.
