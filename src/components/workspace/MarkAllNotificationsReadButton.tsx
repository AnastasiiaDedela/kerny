'use client';

import { useMarkAllNotificationsRead, useNotificationList } from '@/api/notifications';

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
