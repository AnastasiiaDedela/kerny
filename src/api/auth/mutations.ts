import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authKeys } from '@/api/auth/keys';
import type {
  LoginDto,
  PasswordResetConfirmDto,
  PasswordResetRequestDto,
  SignupDto,
  User,
} from '@/api/auth/types';
import { UNAUTHENTICATED_SESSION } from '@/api/auth/types';
import { ApiError, apiClient, unwrap } from '@/api/client';

/**
 * Seed the session cache from a login/signup response, then confirm it with the API.
 *
 * Exported so other authenticated domains (e.g. account email change, account
 * deletion) sync the session the same way instead of inventing their own.
 */
export function useSessionSync() {
  const queryClient = useQueryClient();

  return {
    onAuthenticated(user: User) {
      queryClient.setQueryData(authKeys.session(), { authenticated: true, user });
      // Re-reads /session so a cookie the browser refused to store surfaces immediately.
      void queryClient.invalidateQueries({ queryKey: authKeys.session() });
    },
    onSignedOut() {
      queryClient.setQueryData(authKeys.session(), UNAUTHENTICATED_SESSION);
      // Everything else in the cache belonged to the previous user.
      queryClient.removeQueries({ predicate: (query) => query.queryKey[0] !== 'auth' });
    },
  };
}

/** POST /api/auth/signup */
export function useSignup() {
  const { onAuthenticated } = useSessionSync();

  return useMutation({
    mutationFn: async (body: SignupDto) =>
      unwrap(await apiClient.POST('/api/auth/signup', { body })),
    onSuccess: ({ user }) => onAuthenticated(user),
  });
}

/** POST /api/auth/login */
export function useLogin() {
  const { onAuthenticated } = useSessionSync();

  return useMutation({
    mutationFn: async (body: LoginDto) => unwrap(await apiClient.POST('/api/auth/login', { body })),
    onSuccess: ({ user }) => onAuthenticated(user),
  });
}

/** POST /api/auth/logout */
export function useLogout() {
  const { onSignedOut } = useSessionSync();

  return useMutation({
    mutationFn: async () => unwrap(await apiClient.POST('/api/auth/logout')),
    // Clear locally even if the call fails — the user asked to be signed out.
    onSettled: onSignedOut,
  });
}

/** POST /api/auth/password-reset/request — sends the emailed reset link. */
export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: async (body: PasswordResetRequestDto) =>
      unwrap(await apiClient.POST('/api/auth/password-reset/request', { body })),
  });
}

/** POST /api/auth/password-reset/confirm — `token` comes from the emailed link. */
export function useConfirmPasswordReset() {
  return useMutation({
    mutationFn: async (body: PasswordResetConfirmDto) =>
      unwrap(await apiClient.POST('/api/auth/password-reset/confirm', { body })),
  });
}

/**
 * GET /api/auth/google/start, then hand the browser to Google.
 *
 * `next` must be a safe internal path; the API redirects back to it after the
 * callback exchange.
 */
export function useGoogleAuth() {
  return useMutation({
    mutationFn: async (params?: { next?: string; personalDataConsent?: boolean }) => {
      const { authorizationUrl } = unwrap(
        await apiClient.GET('/api/auth/google/start', { params: { query: params } })
      );
      return authorizationUrl;
    },
    onSuccess: (authorizationUrl) => {
      window.location.assign(authorizationUrl);
    },
  });
}

/** POST /api/auth/sessions/revoke-all — signs the user out of every device. */
export function useRevokeAllSessions() {
  const { onSignedOut } = useSessionSync();

  return useMutation({
    mutationFn: async () => unwrap(await apiClient.POST('/api/auth/sessions/revoke-all')),
    onSuccess: onSignedOut,
  });
}

/** Pull a field-level message out of a failed mutation, if the API sent one. */
export function fieldError(error: unknown, field: string): string | undefined {
  return error instanceof ApiError ? error.fieldErrors[field] : undefined;
}

/** The message to show above a form when a request fails. */
export function formError(error: unknown): string | undefined {
  if (!error) return undefined;
  if (error instanceof ApiError) return error.message;
  return 'Network error. Please check your connection and try again.';
}
