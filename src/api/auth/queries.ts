import { useQuery } from '@tanstack/react-query';

import { authKeys } from '@/api/auth/keys';
import type { SessionResponse } from '@/api/auth/types';
import { apiClient, unwrap } from '@/api/client';

export function useSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: async (): Promise<SessionResponse> => unwrap(await apiClient.GET('/api/auth/session')),
    refetchOnWindowFocus: true,
    staleTime: 30 * 1000,
  });
}

export function useCurrentUser() {
  const { data, isPending, isError } = useSession();

  return {
    user: data?.authenticated ? data.user : null,
    isAuthenticated: data?.authenticated === true,
    isPending,
    isError,
  };
}
