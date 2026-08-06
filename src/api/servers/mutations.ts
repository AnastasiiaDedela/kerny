import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient, idempotencyHeaders, unwrap } from '@/api/client';
import { serverKeys } from '@/api/servers/keys';
import type {
  BackupsEnableResponse,
  ExtendServerDto,
  PowerServerDto,
  ReinstallServerDto,
  ServerOperationResponse,
  ServerPasswordRevealResponse,
  UpdateServerSettingsDto,
} from '@/api/servers/types';
import type { components } from '@/types/api';

function useServerInvalidation(serverId: string) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: serverKeys.detail(serverId) });
    queryClient.invalidateQueries({ queryKey: serverKeys.list() });
  };
}

export function usePowerServer(serverId: string) {
  const invalidate = useServerInvalidation(serverId);

  return useMutation({
    mutationFn: async (body: PowerServerDto): Promise<ServerOperationResponse> =>
      unwrap(
        await apiClient.POST('/api/servers/{serverId}/power', {
          params: { path: { serverId } },
          body,
        })
      ),
    onSuccess: invalidate,
  });
}

export function useRestartServer(serverId: string) {
  const invalidate = useServerInvalidation(serverId);

  return useMutation({
    mutationFn: async (): Promise<ServerOperationResponse> =>
      unwrap(
        await apiClient.POST('/api/servers/{serverId}/restart', {
          params: { path: { serverId } },
        })
      ),
    onSuccess: invalidate,
  });
}

export function useUpdateServerSettings(serverId: string) {
  const invalidate = useServerInvalidation(serverId);

  return useMutation({
    mutationFn: async (body: UpdateServerSettingsDto) =>
      unwrap(
        await apiClient.PATCH('/api/servers/{serverId}/settings', {
          params: { path: { serverId } },
          body,
        })
      ),
    onSuccess: invalidate,
  });
}

export function useEnableBackups(serverId: string) {
  const queryClient = useQueryClient();
  const invalidate = useServerInvalidation(serverId);

  return useMutation({
    mutationFn: async (): Promise<BackupsEnableResponse> =>
      unwrap(
        await apiClient.POST('/api/servers/{serverId}/backups/enable', {
          params: { path: { serverId }, header: idempotencyHeaders() },
        })
      ),
    onSuccess: () => {
      invalidate();
      queryClient.invalidateQueries({ queryKey: serverKeys.backups(serverId) });
    },
  });
}

export function useReinstallServer(serverId: string) {
  const invalidate = useServerInvalidation(serverId);

  return useMutation({
    mutationFn: async (body: ReinstallServerDto) =>
      unwrap(
        await apiClient.POST('/api/servers/{serverId}/reinstall', {
          params: { path: { serverId } },
          body,
        })
      ),
    onSuccess: invalidate,
  });
}

export function useResetServerPassword(serverId: string) {
  const invalidate = useServerInvalidation(serverId);

  return useMutation({
    mutationFn: async () =>
      unwrap(
        await apiClient.POST('/api/servers/{serverId}/password/reset', {
          params: { path: { serverId } },
        })
      ),
    onSuccess: invalidate,
  });
}

export function useRevealServerPassword(serverId: string) {
  return useMutation({
    mutationFn: async (): Promise<ServerPasswordRevealResponse> =>
      unwrap(
        await apiClient.POST('/api/servers/{serverId}/password/reveal', {
          params: { path: { serverId } },
        })
      ),
  });
}

export function useExtendServer(serverId: string) {
  const invalidate = useServerInvalidation(serverId);

  return useMutation({
    mutationFn: async (body: ExtendServerDto) =>
      unwrap(
        await apiClient.POST('/api/servers/{serverId}/extend', {
          params: { path: { serverId }, header: idempotencyHeaders() },
          body,
        })
      ),
    onSuccess: invalidate,
  });
}

export function useDeleteServer(serverId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<ServerOperationResponse> =>
      unwrap(
        await apiClient.DELETE('/api/servers/{serverId}', {
          params: { path: { serverId }, header: idempotencyHeaders() },
        })
      ),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: serverKeys.detail(serverId) });
      queryClient.invalidateQueries({ queryKey: serverKeys.list() });
    },
  });
}

export function useCreateServer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      body: components['schemas']['CreateServerDto']
    ): Promise<ServerOperationResponse> =>
      unwrap(
        await apiClient.POST('/api/servers', {
          params: { header: idempotencyHeaders() },
          body,
        })
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: serverKeys.list() }),
  });
}
