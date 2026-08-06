import { useMutation, useQueryClient } from '@tanstack/react-query';

import { accountKeys } from '@/api/account/keys';
import { apiClient, unwrap } from '@/api/client';
import { notificationKeys } from '@/api/notifications/keys';
import type { NotificationResponse, ReadAllNotificationsResponse } from '@/api/notifications/types';

function useNotificationInvalidation() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    queryClient.invalidateQueries({ queryKey: accountKeys.me() });
  };
}

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

export function useMarkAllNotificationsRead() {
  const invalidate = useNotificationInvalidation();

  return useMutation({
    mutationFn: async (): Promise<ReadAllNotificationsResponse> =>
      unwrap(await apiClient.POST('/api/notifications/read-all')),
    onSuccess: invalidate,
  });
}
