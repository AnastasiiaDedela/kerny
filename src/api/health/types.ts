import type { components } from '@/types/api';

export type HealthResponse = components['schemas']['HealthResponse'];
export type ReadinessResponse = components['schemas']['ReadinessResponse'];

export type ProviderState = components['schemas']['ProviderState'];

export type ProviderName = keyof HealthResponse['providers'];
