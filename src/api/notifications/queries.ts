import { useQuery } from '@tanstack/react-query';

import { apiClient, unwrap } from '@/api/client';
import { notificationKeys } from '@/api/notifications/keys';
import type { Notification, NotificationListResponse } from '@/api/notifications/types';

const NOTIFICATION_STALE_TIME = 30 * 1000;

export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: async (): Promise<NotificationListResponse> =>
      unwrap(await apiClient.GET('/api/notifications')),
    staleTime: NOTIFICATION_STALE_TIME,
    refetchOnWindowFocus: true,
  });
}

export function useNotificationList() {
  const { data, isPending, isError } = useNotifications();

  return {
    notifications: data?.items ?? EMPTY_LIST,
    unreadCount: data?.unreadCount ?? 0,
    isPending,
    isError,
  };
}

const EMPTY_LIST: Notification[] = [];
