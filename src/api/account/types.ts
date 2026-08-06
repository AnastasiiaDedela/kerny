import type { components } from '@/types/api';

export type AccountSettingsResponse = components['schemas']['AccountSettingsResponse'];

export type AccountSettings = AccountSettingsResponse['settings'];

export type MeResponse = components['schemas']['MeResponse'];

export type Balance = components['schemas']['Balance'];

export type EmailChangeRequestDto = components['schemas']['EmailChangeRequestDto'];
export type EmailChangeConfirmDto = components['schemas']['EmailChangeConfirmDto'];
export type PasswordChangeDto = components['schemas']['PasswordChangeDto'];
