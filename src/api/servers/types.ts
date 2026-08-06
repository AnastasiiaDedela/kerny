import type { components } from '@/types/api';

export type ServerListResponse = components['schemas']['ServerListResponse'];
export type ServerListItem = components['schemas']['ServerListItem'];

export type ServerDetailResponse = components['schemas']['ServerDetailResponse'];

export type ServerDetail = components['schemas']['ServerDetail'];

export type ServerStatus = ServerDetail['status'];

export type ServerOperation = components['schemas']['ServerOperation'];
export type ServerOperationResponse = components['schemas']['ServerOperationResponse'];

export type ServerHistoryResponse = components['schemas']['ServerHistoryResponse'];

export type ServerHistoryEntry = ServerHistoryResponse['items'][number];

export type ServerIpListResponse = components['schemas']['ServerIpListResponse'];

export type ServerIpAddress = ServerIpListResponse['items'][number];

export type BackupsResponse = components['schemas']['BackupsResponse'];
export type BackupsEnableResponse = components['schemas']['BackupsEnableResponse'];

export type PowerServerDto = components['schemas']['PowerServerDto'];
export type UpdateServerSettingsDto = components['schemas']['UpdateServerSettingsDto'];
export type ReinstallServerDto = components['schemas']['ReinstallServerDto'];
export type ExtendServerDto = components['schemas']['ExtendServerDto'];

export type ServerPasswordRevealResponse = components['schemas']['ServerPasswordRevealResponse'];
