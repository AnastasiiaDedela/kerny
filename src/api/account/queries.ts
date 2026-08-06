import { useQuery } from '@tanstack/react-query';

import { accountKeys } from '@/api/account/keys';
import type { AccountSettingsResponse, MeResponse } from '@/api/account/types';
import { apiClient, unwrap } from '@/api/client';

export function useAccountSettings() {
  return useQuery({
    queryKey: accountKeys.settings(),
    queryFn: async (): Promise<AccountSettingsResponse> =>
      unwrap(await apiClient.GET('/api/account/settings')),
  });
}

export function useMe() {
  return useQuery({
    queryKey: accountKeys.me(),
    queryFn: async (): Promise<MeResponse> => unwrap(await apiClient.GET('/api/me')),
  });
}

export function useAccountBalance() {
  const { data, isPending, isError } = useMe();

  return {
    balance: data?.balance ?? null,
    unreadCount: data?.unreadCount ?? 0,
    isPending,
    isError,
  };
}

export function useAccountDeletion() {
  const { data, isPending, isError } = useAccountSettings();

  return {
    canDelete: data?.settings.deletion.eligible === true,
    reason: data?.settings.deletion.reason ?? null,
    isPending,
    isError,
  };
}
