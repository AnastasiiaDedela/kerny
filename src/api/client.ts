import createClient from 'openapi-fetch';

import type { components, paths } from '@/types/api';

export const apiClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
  credentials: 'include',
});

export function idempotencyHeaders() {
  return { 'Idempotency-Key': crypto.randomUUID() };
}

type ErrorEnvelope = components['schemas']['ApiErrorEnvelope'];

function isErrorEnvelope(value: unknown): value is ErrorEnvelope {
  if (typeof value !== 'object' || value === null || !('error' in value)) return false;
  const { error } = value as { error: unknown };
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
}

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
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
