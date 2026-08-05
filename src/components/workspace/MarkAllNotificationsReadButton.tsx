'use client';

import { useMarkAllNotificationsRead, useNotificationList } from '@/api/notifications';

/**
 * Sits beside the Notifications heading, so it reads the unread count itself rather than
 * taking it as a prop — the query is the same one `NotificationFeed` uses, so TanStack
 * dedupes it and the page stays a server component.
 *
 * Renders nothing until there is something to clear: while the list is loading or failing
 * `unreadCount` is 0, which is also the "inbox already clear" answer, and in all three
 * cases the button would do nothing.
 */
export function MarkAllNotificationsReadButton() {
  const { unreadCount } = useNotificationList();
  const markAllRead = useMarkAllNotificationsRead();

  if (unreadCount === 0) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => markAllRead.mutate()}
      disabled={markAllRead.isPending}
      className="shrink-0 cursor-pointer text-sm leading-[17px] font-medium text-white/50 transition-colors hover:text-white disabled:cursor-default disabled:opacity-50"
    >
      Mark all as read
    </button>
  );
}
