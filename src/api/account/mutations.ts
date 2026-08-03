import { useMutation, useQueryClient } from '@tanstack/react-query';

import { accountKeys } from '@/api/account/keys';
import type {
  EmailChangeConfirmDto,
  EmailChangeRequestDto,
  PasswordChangeDto,
} from '@/api/account/types';
import { useSessionSync } from '@/api/auth';
import { apiClient, unwrap } from '@/api/client';

/**
 * POST /api/account/email/change-request — step 1 of 2. Emails a confirmation code to
 * the *new* address; nothing changes until `useConfirmEmailChange` runs, so the cache
 * is deliberately left alone here.
 */
export function useRequestEmailChange() {
  return useMutation({
    mutationFn: async (body: EmailChangeRequestDto) =>
      unwrap(await apiClient.POST('/api/account/email/change-request', { body })),
  });
}

/**
 * POST /api/account/email/confirm — step 2 of 2. `code` comes from the email and
 * `newEmail` must match the address it was sent to. Returns the updated user, so the
 * session cache is re-seeded and the account queries are refetched.
 */
export function useConfirmEmailChange() {
  const queryClient = useQueryClient();
  const { onAuthenticated } = useSessionSync();

  return useMutation({
    mutationFn: async (body: EmailChangeConfirmDto) =>
      unwrap(await apiClient.POST('/api/account/email/confirm', { body })),
    onSuccess: ({ user }) => {
      onAuthenticated(user);
      // Both `settings.email` and `me.user.email` are now stale.
      void queryClient.invalidateQueries({ queryKey: accountKeys.all });
    },
  });
}

/**
 * POST /api/account/password/change — requires the current password, so a hijacked
 * session can't lock the owner out. Refetches settings because `password.changedAt`
 * and `activeSessionCount` both move when other sessions are dropped.
 */
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

/**
 * DELETE /api/account — only succeeds when `settings.deletion.eligible` is true; check
 * `useAccountDeletion()` before offering the control, and expect a 4xx otherwise. The
 * session is gone server-side on success, so clear it locally too.
 */
export function useDeleteAccount() {
  const { onSignedOut } = useSessionSync();

  return useMutation({
    mutationFn: async () => unwrap(await apiClient.DELETE('/api/account')),
    onSuccess: onSignedOut,
  });
}
