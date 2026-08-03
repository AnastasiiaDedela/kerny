import { useQuery } from '@tanstack/react-query';

import { authKeys } from '@/api/auth/keys';
import type { SessionResponse } from '@/api/auth/types';
import { apiClient, unwrap } from '@/api/client';

/** GET /api/auth/session — the source of truth for "am I logged in?". */
export function useSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: async (): Promise<SessionResponse> => unwrap(await apiClient.GET('/api/auth/session')),
    // The session cookie can be dropped server-side at any time; re-check on focus.
    refetchOnWindowFocus: true,
    staleTime: 30 * 1000,
  });
}

/** Convenience wrapper for components that only care about the user. */
export function useCurrentUser() {
  const { data, isPending, isError } = useSession();

  return {
    user: data?.authenticated ? data.user : null,
    isAuthenticated: data?.authenticated === true,
    isPending,
    isError,
  };
}
