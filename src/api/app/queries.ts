import { useQuery } from '@tanstack/react-query';

import { appKeys } from '@/api/app/keys';
import type { OkResponse } from '@/api/app/types';
import { apiClient, unwrap } from '@/api/client';

/** GET /api — the API's root marker; a successful `{ ok: true }` means it is reachable. */
export function useApiRoot() {
  return useQuery({
    queryKey: appKeys.root(),
    queryFn: async (): Promise<OkResponse> => unwrap(await apiClient.GET('/api')),
  });
}

/** Convenience wrapper for callers that only need "is the API up?". */
export function useApiReachable() {
  const { data, isPending, isError } = useApiRoot();

  return {
    isReachable: data?.ok === true,
    isPending,
    isError,
  };
}
