'use client';

import { useMarkNotificationRead, useNotificationList } from '@/api/notifications';
import { NotificationList } from '@/components/workspace/NotificationList';
import { WorkspaceNotice } from '@/components/workspace/WorkspaceNotice';
import { toNotificationItem } from '@/lib/notifications';

export function NotificationFeed() {
  const { notifications, isPending, isError } = useNotificationList();
  const markRead = useMarkNotificationRead();

  if (isPending) {
    return <WorkspaceNotice title="Loading notifications" description="Fetching your updates." />;
  }

  if (isError) {
    return (
      <WorkspaceNotice
        title="Couldn't load notifications"
        description="Sign in and refresh the page to try again."
      />
    );
  }

  if (notifications.length === 0) {
    return (
      <WorkspaceNotice
        title="No notifications yet"
        description="Account and server updates will appear here."
      />
    );
  }

  return (
    <NotificationList
      items={notifications.map(toNotificationItem)}
      onMarkRead={(id) => markRead.mutate(id)}
      pendingId={markRead.isPending ? markRead.variables : null}
    />
  );
}
