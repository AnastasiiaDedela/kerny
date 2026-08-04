import { useMutation, useQueryClient } from '@tanstack/react-query';

import { accountKeys } from '@/api/account/keys';
import { apiClient, unwrap } from '@/api/client';
import { notificationKeys } from '@/api/notifications/keys';
import type { NotificationResponse, ReadAllNotificationsResponse } from '@/api/notifications/types';

/**
 * Both writes move the unread count, and the shell reads that count from `GET /api/me`
 * rather than from the list — so refresh both or the badge keeps the stale number.
 */
function useNotificationInvalidation() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    queryClient.invalidateQueries({ queryKey: accountKeys.me() });
  };
}

/**
 * PATCH /api/notifications/{notificationId}/read — marks one notification read and
 * returns it in its new state. No body.
 */
export function useMarkNotificationRead() {
  const invalidate = useNotificationInvalidation();

  return useMutation({
    mutationFn: async (notificationId: string): Promise<NotificationResponse> =>
      unwrap(
        await apiClient.PATCH('/api/notifications/{notificationId}/read', {
          params: { path: { notificationId } },
        })
      ),
    onSuccess: invalidate,
  });
}

/**
 * POST /api/notifications/read-all — clears the whole backlog, not just the loaded page.
 * The response's `updatedCount` is how many were actually still unread.
 */
export function useMarkAllNotificationsRead() {
  const invalidate = useNotificationInvalidation();

  return useMutation({
    mutationFn: async (): Promise<ReadAllNotificationsResponse> =>
      unwrap(await apiClient.POST('/api/notifications/read-all')),
    onSuccess: invalidate,
  });
}
