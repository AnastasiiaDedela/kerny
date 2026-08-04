import createClient from 'openapi-fetch';

import type { components, paths } from '@/types/api';

/**
 * Same-origin by default: calls go to `/api/*` and are forwarded by the proxy in
 * `src/app/api/[...path]/route.ts`. The API only trusts requests originating from
 * `https://kerny.tech`, so a browser on localhost cannot call it directly.
 *
 * Set `NEXT_PUBLIC_API_BASE_URL=https://api.kerny.tech` to skip the proxy once the
 * app is served from an origin the API allowlists.
 */
export const apiClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
  // The session lives in the `kerny_session` cookie (securitySchemes.cookieAuth).
  credentials: 'include',
});

/**
 * Header required by the endpoints that create, charge or destroy (`POST /api/servers`,
 * `.../backups/enable`, `.../extend`, `DELETE /api/servers/{id}`, and the billing writes),
 * so a retried request can't double-charge.
 *
 * One fresh key per call is correct here: mutations don't auto-retry (`query-client.ts`
 * sets `retry: false`), so every invocation is a distinct user intent.
 */
export function idempotencyHeaders() {
  return { 'Idempotency-Key': crypto.randomUUID() };
}

type ErrorEnvelope = components['schemas']['ApiErrorEnvelope'];

function isErrorEnvelope(value: unknown): value is ErrorEnvelope {
  if (typeof value !== 'object' || value === null || !('error' in value)) return false;
  const { error } = value as { error: unknown };
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
}

/** Typed view of the API's `{ error: { code, message, fieldErrors? } }` envelope. */
export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  /** Per-input messages, keyed by field name — ready to render next to a form field. */
  readonly fieldErrors: Record<string, string>;

  constructor(
    message: string,
    options: { code: string; status: number; fieldErrors?: Record<string, string> }
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = options.code;
    this.status = options.status;
    this.fieldErrors = options.fieldErrors ?? {};
  }

  static from(error: unknown, response: Response): ApiError {
    if (isErrorEnvelope(error)) {
      return new ApiError(error.error.message, {
        code: error.error.code,
        status: response.status,
        fieldErrors: error.error.fieldErrors,
      });
    }

    return new ApiError('Something went wrong. Please try again.', {
      code: 'unknown_error',
      status: response.status,
    });
  }
}

/**
 * openapi-fetch resolves with `{ data, error }` instead of throwing. TanStack Query
 * needs a rejected promise to mark a query/mutation as failed, so unwrap it here.
 */
export function unwrap<TData>(result: {
  data?: TData;
  error?: unknown;
  response: Response;
}): TData {
  if (result.error !== undefined || result.data === undefined) {
    throw ApiError.from(result.error, result.response);
  }
  return result.data;
}
