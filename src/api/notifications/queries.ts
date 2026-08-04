import { useQuery } from '@tanstack/react-query';

import { apiClient, unwrap } from '@/api/client';
import { notificationKeys } from '@/api/notifications/keys';
import type { Notification, NotificationListResponse } from '@/api/notifications/types';

/**
 * Notifications land while the tab is already open — a provisioning job finishes, a
 * charge settles — so this reads short and refetches on focus, like the server list.
 */
const NOTIFICATION_STALE_TIME = 30 * 1000;

/**
 * GET /api/notifications — the signed-in user's notifications, newest first. 401s when
 * signed out, and the shared retry predicate gives up on 4xx, so an unauthenticated
 * caller fails fast.
 *
 * Takes the API's default page size (20). `pageInfo.nextCursor` is not followed yet —
 * the design has no "load more" control to hang it on.
 */
export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: async (): Promise<NotificationListResponse> =>
      unwrap(await apiClient.GET('/api/notifications')),
    staleTime: NOTIFICATION_STALE_TIME,
    refetchOnWindowFocus: true,
  });
}

/**
 * The page's items plus the account-wide unread count, for components that don't care
 * about the cursor. `unreadCount` counts every unread notification, not just this page.
 */
export function useNotificationList() {
  const { data, isPending, isError } = useNotifications();

  return {
    notifications: data?.items ?? EMPTY_LIST,
    unreadCount: data?.unreadCount ?? 0,
    isPending,
    isError,
  };
}

/** Stable identity so a pending render doesn't hand consumers a fresh array each time. */
const EMPTY_LIST: Notification[] = [];
