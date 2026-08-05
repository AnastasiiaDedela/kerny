import type { components } from '@/types/api';

/**
 * One notification. `unread` — not a `read` flag — is what the API sends, and `href` is
 * an optional deep link that is `null` for purely informational entries.
 */
export type Notification = components['schemas']['Notification'];

/** Cursor-paged envelope: the page's items plus the account-wide `unreadCount`. */
export type NotificationListResponse = components['schemas']['NotificationListResponse'];

export type NotificationResponse = components['schemas']['NotificationResponse'];

/** `{ ok, unreadCount, updatedCount }` — `updatedCount` is how many were still unread. */
export type ReadAllNotificationsResponse = components['schemas']['ReadAllNotificationsResponse'];
