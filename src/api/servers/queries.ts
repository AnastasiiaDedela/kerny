import { useQuery } from '@tanstack/react-query';

import { apiClient, unwrap } from '@/api/client';
import { serverKeys } from '@/api/servers/keys';
import type {
  BackupsResponse,
  ServerDetailResponse,
  ServerHistoryResponse,
  ServerIpListResponse,
  ServerListResponse,
} from '@/api/servers/types';

/**
 * A server's state moves without the user touching it — provisioning finishes, a power
 * operation settles, the provider drifts — so these read short and refetch on focus,
 * unlike the catalog.
 */
const SERVER_STALE_TIME = 15 * 1000;

/**
 * GET /api/servers — the signed-in user's servers. 401s when signed out, and the shared
 * retry predicate gives up on 4xx, so an unauthenticated caller fails fast.
 *
 * Returns the first page only; `pageInfo.nextCursor` is not followed yet.
 */
export function useServers() {
  return useQuery({
    queryKey: serverKeys.list(),
    queryFn: async (): Promise<ServerListResponse> => unwrap(await apiClient.GET('/api/servers')),
    staleTime: SERVER_STALE_TIME,
    refetchOnWindowFocus: true,
  });
}

/** The list as a plain array, for components that don't care about paging. */
export function useServerList() {
  const { data, isPending, isError } = useServers();

  return {
    servers: data?.items ?? EMPTY_LIST,
    isPending,
    isError,
  };
}

/** GET /api/servers/{serverId} — the full detail record behind the server page. */
export function useServer(serverId: string | undefined) {
  return useQuery({
    queryKey: serverKeys.detail(serverId ?? ''),
    queryFn: async (): Promise<ServerDetailResponse> =>
      unwrap(
        await apiClient.GET('/api/servers/{serverId}', {
          params: { path: { serverId: serverId! } },
        })
      ),
    enabled: Boolean(serverId),
    staleTime: SERVER_STALE_TIME,
    refetchOnWindowFocus: true,
  });
}

/** GET /api/servers/{serverId}/history — billing and action log, newest page first. */
export function useServerHistory(serverId: string | undefined) {
  return useQuery({
    queryKey: serverKeys.history(serverId ?? ''),
    queryFn: async (): Promise<ServerHistoryResponse> =>
      unwrap(
        await apiClient.GET('/api/servers/{serverId}/history', {
          params: { path: { serverId: serverId! } },
        })
      ),
    enabled: Boolean(serverId),
  });
}

/** GET /api/servers/{serverId}/ip-addresses — both the v4 and v6 pools in one list. */
export function useServerIpAddresses(serverId: string | undefined) {
  return useQuery({
    queryKey: serverKeys.ipAddresses(serverId ?? ''),
    queryFn: async (): Promise<ServerIpListResponse> =>
      unwrap(
        await apiClient.GET('/api/servers/{serverId}/ip-addresses', {
          params: { path: { serverId: serverId! } },
        })
      ),
    enabled: Boolean(serverId),
  });
}

/** GET /api/servers/{serverId}/backups — whether the paid backup add-on is on. */
export function useServerBackups(serverId: string | undefined) {
  return useQuery({
    queryKey: serverKeys.backups(serverId ?? ''),
    queryFn: async (): Promise<BackupsResponse> =>
      unwrap(
        await apiClient.GET('/api/servers/{serverId}/backups', {
          params: { path: { serverId: serverId! } },
        })
      ),
    enabled: Boolean(serverId),
    staleTime: SERVER_STALE_TIME,
  });
}

const EMPTY_LIST: ServerListResponse['items'] = [];
