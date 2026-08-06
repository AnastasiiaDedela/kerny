import { useQuery } from '@tanstack/react-query';

import { apiClient, unwrap } from '@/api/client';
import { healthKeys } from '@/api/health/keys';
import type { HealthResponse, ReadinessResponse } from '@/api/health/types';

export function useHealth() {
  return useQuery({
    queryKey: healthKeys.health(),
    queryFn: async (): Promise<HealthResponse> => unwrap(await apiClient.GET('/api/health')),
  });
}

export function useReadiness() {
  return useQuery({
    queryKey: healthKeys.readiness(),
    queryFn: async (): Promise<ReadinessResponse> =>
      unwrap(await apiClient.GET('/api/health/readiness')),
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });
}

export function useApiStatus() {
  const { data, isPending, isError } = useReadiness();

  return {
    isReady: data?.status === 'ok',
    isDegraded: data?.status === 'degraded',
    database: data?.database.status ?? null,
    providers: data?.providers ?? null,
    isPending,
    isError,
  };
}
