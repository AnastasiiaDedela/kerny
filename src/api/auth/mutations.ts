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

export function useSessionSync() {
  const queryClient = useQueryClient();

  return {
    onAuthenticated(user: User) {
      queryClient.setQueryData(authKeys.session(), { authenticated: true, user });
      void queryClient.invalidateQueries({ queryKey: authKeys.session() });
    },
    onSignedOut() {
      queryClient.setQueryData(authKeys.session(), UNAUTHENTICATED_SESSION);
      queryClient.removeQueries({ predicate: (query) => query.queryKey[0] !== 'auth' });
    },
  };
}

export function useSignup() {
  const { onAuthenticated } = useSessionSync();

  return useMutation({
    mutationFn: async (body: SignupDto) =>
      unwrap(await apiClient.POST('/api/auth/signup', { body })),
    onSuccess: ({ user }) => onAuthenticated(user),
  });
}

export function useLogin() {
  const { onAuthenticated } = useSessionSync();

  return useMutation({
    mutationFn: async (body: LoginDto) => unwrap(await apiClient.POST('/api/auth/login', { body })),
    onSuccess: ({ user }) => onAuthenticated(user),
  });
}

export function useLogout() {
  const { onSignedOut } = useSessionSync();

  return useMutation({
    mutationFn: async () => unwrap(await apiClient.POST('/api/auth/logout')),
    onSettled: onSignedOut,
  });
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: async (body: PasswordResetRequestDto) =>
      unwrap(await apiClient.POST('/api/auth/password-reset/request', { body })),
  });
}

export function useConfirmPasswordReset() {
  return useMutation({
    mutationFn: async (body: PasswordResetConfirmDto) =>
      unwrap(await apiClient.POST('/api/auth/password-reset/confirm', { body })),
  });
}

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

export function useRevokeAllSessions() {
  const { onSignedOut } = useSessionSync();

  return useMutation({
    mutationFn: async () => unwrap(await apiClient.POST('/api/auth/sessions/revoke-all')),
    onSuccess: onSignedOut,
  });
}

export function fieldError(error: unknown, field: string): string | undefined {
  return error instanceof ApiError ? error.fieldErrors[field] : undefined;
}

export function formError(error: unknown): string | undefined {
  if (!error) return undefined;
  if (error instanceof ApiError) return error.message;
  return 'Network error. Please check your connection and try again.';
}
