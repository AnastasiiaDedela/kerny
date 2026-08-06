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

const SERVER_STALE_TIME = 15 * 1000;

export function useServers() {
  return useQuery({
    queryKey: serverKeys.list(),
    queryFn: async (): Promise<ServerListResponse> => unwrap(await apiClient.GET('/api/servers')),
    staleTime: SERVER_STALE_TIME,
    refetchOnWindowFocus: true,
  });
}

export function useServerList() {
  const { data, isPending, isError } = useServers();

  return {
    servers: data?.items ?? EMPTY_LIST,
    isPending,
    isError,
  };
}

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
