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

/**
 * Every write starts an async operation, so the record the API just returned is already
 * out of date by the time it lands. Invalidating detail + list is what actually shows the
 * new status; the response only tells us the job was accepted.
 */
function useServerInvalidation(serverId: string) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: serverKeys.detail(serverId) });
    queryClient.invalidateQueries({ queryKey: serverKeys.list() });
  };
}

/** POST /api/servers/{serverId}/power — `{ state: 'on' | 'off' }`. */
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

/** POST /api/servers/{serverId}/restart — no body. */
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

/** PATCH /api/servers/{serverId}/settings — `autoRenewal` and/or `recoveryMode`. */
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

/**
 * POST /api/servers/{serverId}/backups/enable — chargeable. The response carries the
 * `charge` that was applied, so surface it rather than assuming the price.
 */
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

/**
 * POST /api/servers/{serverId}/reinstall — destructive. The API requires
 * `confirmDataLoss: true`, so the caller must have actually asked the user.
 */
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

/** POST /api/servers/{serverId}/password/reset — issues a new password out of band. */
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

/**
 * POST /api/servers/{serverId}/password/reveal — returns the plaintext password.
 *
 * Deliberately a mutation: the result must not land in the query cache, where it would
 * persist in memory and be replayed to later readers. Keep it in local state, and only
 * for as long as it is on screen.
 */
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

/** POST /api/servers/{serverId}/extend — buys another billing period. */
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

/**
 * DELETE /api/servers/{serverId} — drops the server's own cache entries as well as
 * refreshing the list, since nothing should re-read a deleted record.
 */
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

/** POST /api/servers — provisions from a quote produced by `@/api/pricing`. */
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
