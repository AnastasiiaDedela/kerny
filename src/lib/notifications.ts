import type { Notification } from '@/api/notifications';
import type { NotificationItem } from '@/components/workspace/NotificationList';
import { formatServerTimestamp } from '@/lib/servers';

/**
 * An API notification in the shape the list renders: `text` becomes the message, the
 * ISO `createdAt` becomes the `03.02.2026 19:51:55` stamp, and the API's `unread` flag
 * is inverted — the card styles the *read* state, the payload reports the unread one.
 */
export function toNotificationItem(notification: Notification): NotificationItem {
  return {
    id: notification.id,
    title: notification.title,
    message: notification.text,
    time: formatServerTimestamp(notification.createdAt),
    read: !notification.unread,
  };
}
