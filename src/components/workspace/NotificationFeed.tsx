'use client';

import { useMarkNotificationRead, useNotificationList } from '@/api/notifications';
import { NotificationList } from '@/components/workspace/NotificationList';
import { WorkspaceNotice } from '@/components/workspace/WorkspaceNotice';
import { toNotificationItem } from '@/lib/notifications';

/**
 * Fetches the signed-in user's notifications so the page can stay a server component.
 * Presentation lives in `NotificationList`; this only maps the payload onto it.
 *
 * The three states are checked in order because an empty list means something different
 * in each: in flight it means "not yet", failed (401 when signed out) means "we don't
 * know", and only a settled, successful response means the inbox is actually empty.
 */
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
      /* `variables` is the id of the call in flight, so the card being marked is the only
         one that dims. A failed call just leaves the item unread — the list refetches on
         focus anyway, and there is no error slot in the card design. */
      pendingId={markRead.isPending ? markRead.variables : null}
    />
  );
}
