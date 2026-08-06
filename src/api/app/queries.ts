import { useQuery } from '@tanstack/react-query';

import { appKeys } from '@/api/app/keys';
import type { OkResponse } from '@/api/app/types';
import { apiClient, unwrap } from '@/api/client';

export function useApiRoot() {
  return useQuery({
    queryKey: appKeys.root(),
    queryFn: async (): Promise<OkResponse> => unwrap(await apiClient.GET('/api')),
  });
}

export function useApiReachable() {
  const { data, isPending, isError } = useApiRoot();

  return {
    isReachable: data?.ok === true,
    isPending,
    isError,
  };
}
