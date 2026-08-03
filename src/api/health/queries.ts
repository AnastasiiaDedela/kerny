import { useQuery } from '@tanstack/react-query';

import { apiClient, unwrap } from '@/api/client';
import { healthKeys } from '@/api/health/keys';
import type { HealthResponse, ReadinessResponse } from '@/api/health/types';

/**
 * GET /api/health — liveness. Answers `status: 'ok'` whenever the process is up at
 * all, so a failed request (not the payload) is the signal here. `providers` reports
 * which integrations hold real credentials vs. run mocked.
 */
export function useHealth() {
  return useQuery({
    queryKey: healthKeys.health(),
    queryFn: async (): Promise<HealthResponse> => unwrap(await apiClient.GET('/api/health')),
  });
}

/**
 * GET /api/health/readiness — readiness. Unlike liveness this can answer
 * `status: 'degraded'` (currently when the database is `not_configured` or `error`),
 * which is the one worth rendering: the API responds but can't serve real work.
 */
export function useReadiness() {
  return useQuery({
    queryKey: healthKeys.readiness(),
    queryFn: async (): Promise<ReadinessResponse> =>
      unwrap(await apiClient.GET('/api/health/readiness')),
    // Readiness flips without user action; a short window keeps a status view honest.
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });
}

/** Convenience wrapper for components that only need "can the API serve requests?". */
export function useApiStatus() {
  const { data, isPending, isError } = useReadiness();

  return {
    // A request that never landed is worse than `degraded`, so treat it as not ready.
    isReady: data?.status === 'ok',
    isDegraded: data?.status === 'degraded',
    database: data?.database.status ?? null,
    providers: data?.providers ?? null,
    isPending,
    isError,
  };
}
