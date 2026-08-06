import type { Notification } from '@/api/notifications';
import type { NotificationItem } from '@/components/workspace/NotificationList';
import { formatServerTimestamp } from '@/lib/servers';

export function toNotificationItem(notification: Notification): NotificationItem {
  return {
    id: notification.id,
    title: notification.title,
    message: notification.text,
    time: formatServerTimestamp(notification.createdAt),
    read: !notification.unread,
  };
}
