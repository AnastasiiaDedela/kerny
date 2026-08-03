---
name: nextjs-docs
description: Lookup table mapping routing/rendering/image/font/metadata/config topics to exact file paths under node_modules/next/dist/docs/01-app. Use before writing or editing routing, layouts, Server/Client Component boundaries, next/image, next/font, metadata, or next.config.ts code, instead of globbing the docs tree from scratch.
---

This repo pins Next.js 16.2 / React 19.2, which diverges from older training data (see `AGENTS.md`). This table is scoped to what a static, backend-less marketing site actually touches — read the exact file via `Read`, don't `Glob`/re-explore the tree.

## Fundamentals

| Topic                                                 | File                                                    |
| ----------------------------------------------------- | ------------------------------------------------------- |
| Project structure conventions                         | `01-getting-started/02-project-structure.md`            |
| `layout.tsx`/`page.tsx` nesting rules                 | `01-getting-started/03-layouts-and-pages.md`            |
| `<Link>`, navigation, prefetching                     | `01-getting-started/04-linking-and-navigating.md`       |
| Server vs Client Components, `'use client'` placement | `01-getting-started/05-server-and-client-components.md` |
| CSS setup (Tailwind v4 with Next 16)                  | `01-getting-started/11-css.md`                          |
| `next/image`                                          | `01-getting-started/12-images.md`                       |
| `next/font`                                           | `01-getting-started/13-fonts.md`                        |
| Metadata API / OG images                              | `01-getting-started/14-metadata-and-og-images.md`       |
| `error.tsx`/`not-found.tsx`                           | `01-getting-started/10-error-handling.md`               |
| Deploying                                             | `01-getting-started/17-deploying.md`                    |
| Upgrading from pre-16 Next                            | `01-getting-started/18-upgrading.md`                    |

## Component & file-convention reference

| Topic                                                              | File                                                    |
| ------------------------------------------------------------------ | ------------------------------------------------------- |
| `<Image>` full API                                                 | `03-api-reference/02-components/image.md`               |
| `<Link>` full API                                                  | `03-api-reference/02-components/link.md`                |
| `next/font` full API                                               | `03-api-reference/02-components/font.md`                |
| `<Script>`                                                         | `03-api-reference/02-components/script.md`              |
| `layout.tsx`                                                       | `03-api-reference/03-file-conventions/layout.md`        |
| `page.tsx`                                                         | `03-api-reference/03-file-conventions/page.md`          |
| Route groups `(name)`                                              | `03-api-reference/03-file-conventions/route-groups.md`  |
| `src/` folder                                                      | `03-api-reference/03-file-conventions/src-folder.md`    |
| `loading.tsx`                                                      | `03-api-reference/03-file-conventions/loading.md`       |
| `error.tsx`                                                        | `03-api-reference/03-file-conventions/error.md`         |
| `not-found.tsx`                                                    | `03-api-reference/03-file-conventions/not-found.md`     |
| `template.tsx` vs `layout.tsx`                                     | `03-api-reference/03-file-conventions/template.md`      |
| `public/` folder                                                   | `03-api-reference/03-file-conventions/public-folder.md` |
| Metadata files (icons, manifest, opengraph-image, robots, sitemap) | `03-api-reference/03-file-conventions/01-metadata/*.md` |
| `'use client'` directive                                           | `03-api-reference/01-directives/use-client.md`          |

## `next.config.ts`

| Topic                                                                     | File                                                             |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Full config index                                                         | `03-api-reference/05-config/01-next-config-js/index.md`          |
| `images.*` (qualities, `dangerouslyAllowSVG`, CSP — see `next.config.ts`) | `03-api-reference/05-config/01-next-config-js/images.md`         |
| `typescript.*`                                                            | `03-api-reference/05-config/01-next-config-js/typescript.md`     |
| ESLint options                                                            | `03-api-reference/05-config/03-eslint.md`                        |
| `reactCompiler`                                                           | `03-api-reference/05-config/01-next-config-js/reactCompiler.md`  |
| `typedRoutes`                                                             | `03-api-reference/05-config/01-next-config-js/typedRoutes.md`    |
| `viewTransition`                                                          | `03-api-reference/05-config/01-next-config-js/viewTransition.md` |

## Situational guides

| Topic                                         | File                                 |
| --------------------------------------------- | ------------------------------------ |
| Rendering philosophy (static vs dynamic)      | `02-guides/rendering-philosophy.md`  |
| Static export (`output: 'export'`)            | `02-guides/static-exports.md`        |
| Self-hosting                                  | `02-guides/self-hosting.md`          |
| Lazy loading (`next/dynamic`)                 | `02-guides/lazy-loading.md`          |
| Third-party libraries (`@next/third-parties`) | `02-guides/third-party-libraries.md` |
| View transitions                              | `02-guides/view-transition.md`       |
| Sass                                          | `02-guides/sass.md`                  |
| Production checklist                          | `02-guides/production-checklist.md`  |

All paths are relative to `node_modules/next/dist/docs/01-app/`.

## Out of scope (don't chase these unless the project actually grows into them)

Route handlers, server actions, forms/mutating data, auth, data security, ISR/PPR, i18n, multi-tenant/multi-zone, MCP/AI agents — this site has no backend, no database, no API routes, no auth (`CLAUDE.md`). If a task genuinely needs one of these, `Glob node_modules/next/dist/docs/01-app` as a fallback rather than guessing from pre-16 knowledge.
