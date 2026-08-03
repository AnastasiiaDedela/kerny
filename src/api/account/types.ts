import type { components } from '@/types/api';

export type AccountSettingsResponse = components['schemas']['AccountSettingsResponse'];

/** The body of the settings envelope: email, password state, session count, deletion gate. */
export type AccountSettings = AccountSettingsResponse['settings'];

/** `{ user, balance, unreadCount }` — the one call that seeds an authenticated shell. */
export type MeResponse = components['schemas']['MeResponse'];

/** `{ amount, currency: 'COIN' }` — `amount` is a decimal string, not a number. */
export type Balance = components['schemas']['Balance'];

export type EmailChangeRequestDto = components['schemas']['EmailChangeRequestDto'];
export type EmailChangeConfirmDto = components['schemas']['EmailChangeConfirmDto'];
export type PasswordChangeDto = components['schemas']['PasswordChangeDto'];
