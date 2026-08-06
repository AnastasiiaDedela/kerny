import { useMutation, useQueryClient } from '@tanstack/react-query';

import { accountKeys } from '@/api/account/keys';
import type {
  EmailChangeConfirmDto,
  EmailChangeRequestDto,
  PasswordChangeDto,
} from '@/api/account/types';
import { useSessionSync } from '@/api/auth';
import { apiClient, unwrap } from '@/api/client';

export function useRequestEmailChange() {
  return useMutation({
    mutationFn: async (body: EmailChangeRequestDto) =>
      unwrap(await apiClient.POST('/api/account/email/change-request', { body })),
  });
}

export function useConfirmEmailChange() {
  const queryClient = useQueryClient();
  const { onAuthenticated } = useSessionSync();

  return useMutation({
    mutationFn: async (body: EmailChangeConfirmDto) =>
      unwrap(await apiClient.POST('/api/account/email/confirm', { body })),
    onSuccess: ({ user }) => {
      onAuthenticated(user);
      void queryClient.invalidateQueries({ queryKey: accountKeys.all });
    },
  });
}

export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: PasswordChangeDto) =>
      unwrap(await apiClient.POST('/api/account/password/change', { body })),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: accountKeys.settings() });
    },
  });
}

export function useDeleteAccount() {
  const { onSignedOut } = useSessionSync();

  return useMutation({
    mutationFn: async () => unwrap(await apiClient.DELETE('/api/account')),
    onSuccess: onSignedOut,
  });
}
