import { useQuery } from '@tanstack/react-query';

import { accountKeys } from '@/api/account/keys';
import type { AccountSettingsResponse, MeResponse } from '@/api/account/types';
import { apiClient, unwrap } from '@/api/client';

/**
 * GET /api/account/settings — everything the settings screen renders: the current
 * email, whether a password is set (Google-only accounts have none) and when it last
 * changed, how many sessions are live, and whether deletion is currently allowed.
 *
 * 401s when signed out, and the shared retry predicate gives up on 4xx, so an
 * unauthenticated caller fails fast rather than looping.
 */
export function useAccountSettings() {
  return useQuery({
    queryKey: accountKeys.settings(),
    queryFn: async (): Promise<AccountSettingsResponse> =>
      unwrap(await apiClient.GET('/api/account/settings')),
  });
}

/**
 * GET /api/me — the frontend handoff: user, balance and unread notification count in
 * one call, so an authenticated shell doesn't need three requests to paint.
 */
export function useMe() {
  return useQuery({
    queryKey: accountKeys.me(),
    queryFn: async (): Promise<MeResponse> => unwrap(await apiClient.GET('/api/me')),
  });
}

/** Convenience wrapper for the header/balance widgets, which only need these two. */
export function useAccountBalance() {
  const { data, isPending, isError } = useMe();

  return {
    balance: data?.balance ?? null,
    unreadCount: data?.unreadCount ?? 0,
    isPending,
    isError,
  };
}

/**
 * Convenience wrapper for the delete-account control: the API decides eligibility
 * (active servers, outstanding balance) and returns the reason to show when it says no.
 */
export function useAccountDeletion() {
  const { data, isPending, isError } = useAccountSettings();

  return {
    // Absent data is not permission to delete — default to blocked.
    canDelete: data?.settings.deletion.eligible === true,
    reason: data?.settings.deletion.reason ?? null,
    isPending,
    isError,
  };
}
