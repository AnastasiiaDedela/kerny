import type { components } from '@/types/api';

export type ServerListResponse = components['schemas']['ServerListResponse'];
export type ServerListItem = components['schemas']['ServerListItem'];

export type ServerDetailResponse = components['schemas']['ServerDetailResponse'];

/**
 * Everything the detail page renders, already joined: `os`, `region`, `tariff`,
 * `resources`, `pricing`, `validity`, `credentials`, `settings` and the in-flight
 * `operation`. Money is a decimal string; `validUntil` is an ISO timestamp.
 */
export type ServerDetail = components['schemas']['ServerDetail'];

/**
 * Lifecycle state. Only `active` means "running and yours to use" — the rest are
 * transitional (`powering_on`, `restarting`, …) or terminal (`suspended`, `deleted`).
 */
export type ServerStatus = ServerDetail['status'];

/** An async job the API is running against the server; poll the detail until it settles. */
export type ServerOperation = components['schemas']['ServerOperation'];
export type ServerOperationResponse = components['schemas']['ServerOperationResponse'];

export type ServerHistoryResponse = components['schemas']['ServerHistoryResponse'];

/** `{ id, action, amount, currency, occurredAt }` — billing/action log entry. */
export type ServerHistoryEntry = ServerHistoryResponse['items'][number];

export type ServerIpListResponse = components['schemas']['ServerIpListResponse'];

/** One address. `family` splits the v4/v6 pools; `type` marks the main address. */
export type ServerIpAddress = ServerIpListResponse['items'][number];

export type BackupsResponse = components['schemas']['BackupsResponse'];
export type BackupsEnableResponse = components['schemas']['BackupsEnableResponse'];

export type PowerServerDto = components['schemas']['PowerServerDto'];
export type UpdateServerSettingsDto = components['schemas']['UpdateServerSettingsDto'];
export type ReinstallServerDto = components['schemas']['ReinstallServerDto'];
export type ExtendServerDto = components['schemas']['ExtendServerDto'];

/** `{ login, password }` — plaintext, returned only by the reveal call. Never cached. */
export type ServerPasswordRevealResponse = components['schemas']['ServerPasswordRevealResponse'];
