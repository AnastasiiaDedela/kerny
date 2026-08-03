import type { components } from '@/types/api';

export type HealthResponse = components['schemas']['HealthResponse'];
export type ReadinessResponse = components['schemas']['ReadinessResponse'];

/** `{ configured, mockEnabled }` — whether a third-party integration has real credentials. */
export type ProviderState = components['schemas']['ProviderState'];

/** The integrations both probes report on: `vultr` | `irbyx` | `resend`. */
export type ProviderName = keyof HealthResponse['providers'];
