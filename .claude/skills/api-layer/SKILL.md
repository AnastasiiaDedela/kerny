---
name: api-layer
description: Conventions for src/api/ — the openapi-fetch client, unwrap()/ApiError, TanStack Query hooks, query-key factories, and the same-origin proxy that makes localhost calls work. Use when adding or editing any data fetching, mutation, auth, or session code.
---

This repo **does** have a data layer, despite older docs saying it doesn't. It lives in `src/api/` and is consumed through TanStack Query hooks.

## Per-domain module shape

One folder per API domain (`src/api/auth/`, `src/api/app/`), always the same five files:

| File           | Holds                                                             |
| -------------- | ----------------------------------------------------------------- |
| `keys.ts`      | Query-key factory                                                  |
| `types.ts`     | Aliases of generated schemas + any hand-narrowed types            |
| `queries.ts`   | `useQuery` hooks (reads)                                          |
| `mutations.ts` | `useMutation` hooks (writes)                                      |
| `index.ts`     | Explicit re-exports — the module's public surface                 |

**Import from the domain root** (`import { useLogin } from '@/api/auth'`), never deep into `@/api/auth/mutations`. Adding a domain means adding all five files and re-exporting every public hook/type from `index.ts`.

Key factories are hierarchical so a broad key invalidates its children:

```ts
export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
};
```

## The client: always `unwrap()`

`src/api/client.ts` exports `apiClient` (openapi-fetch, typed by `paths`), `unwrap()`, and `ApiError`.

openapi-fetch resolves with `{ data, error }` instead of throwing, but TanStack Query needs a **rejected promise** to mark a query as failed. So every call goes through `unwrap`:

```ts
queryFn: async (): Promise<SessionResponse> => unwrap(await apiClient.GET('/api/auth/session')),
```

Never destructure `{ data, error }` off `apiClient` directly in a hook — the failure silently looks like success.

`ApiError` carries `code`, `status`, and `fieldErrors` (per-input messages keyed by field name, ready to render next to a form field). `src/api/auth/mutations.ts` exports `fieldError`/`formError` helpers for pulling messages out of an unknown error in form components — use those rather than re-checking `instanceof` at each call site.

## Query client defaults

`src/api/query-client.ts` already sets `staleTime: 60s`, `retry: false` for mutations, and a retry predicate that **gives up on any 4xx** (`error.status < 500`) since those are final. Don't re-specify these per hook; only override when a specific endpoint genuinely differs (e.g. `useSession` deliberately sets `refetchOnWindowFocus: true` and a shorter 30s `staleTime`, because the cookie can be dropped server-side at any time).

`getQueryClient()` returns a fresh client on the server and a singleton in the browser — mounted once by `Providers` (`src/app/providers.tsx`). Don't construct a `QueryClient` anywhere else.

## Why the proxy exists — read before "fixing" it

The API rejects any browser request whose `Origin` isn't `https://kerny.tech` (`invalid_origin` / `csrf_evidence_required`), so **localhost cannot call it directly**. `src/lib/api-proxy.ts` forwards `/api/*` from the Next server, where that origin check can be satisfied, and rewrites `Set-Cookie` (drops `Domain=`, and over plain http strips `Secure` / downgrades `SameSite=None` to `Lax`) so the `kerny_session` cookie is accepted on the app's own host.

Two route files share it, and both are needed: `src/app/api/[...path]/route.ts` for nested paths, and `src/app/api/route.ts` for the bare `/api` root (a catch-all needs ≥1 segment, so it never matches that one). Both re-export one handler for every verb.

`apiClient` therefore has `baseUrl: ''` (same-origin) and `credentials: 'include'`. Setting `NEXT_PUBLIC_API_BASE_URL=https://api.kerny.tech` bypasses the proxy — only valid once the app is served from an allowlisted origin.

## Session and auth

- `useSession()` is the source of truth for "am I logged in?"; `useCurrentUser()` is the convenience wrapper most components should use.
- Login/signup mutations seed the session cache via `setQueryData` **and then invalidate**, so a cookie the browser refused to store surfaces immediately rather than showing a phantom logged-in state.
- Logout clears via `onSettled` (not `onSuccess`) — the user asked to be signed out even if the call failed — and removes every non-`auth` query, since that data belonged to the previous user.

Follow these patterns for new authenticated domains rather than inventing a fresh cache-sync approach.

## Hooks mean client components

Any component calling one of these hooks needs `'use client'`. Keep that boundary as narrow as possible — see the `architecture` skill.
