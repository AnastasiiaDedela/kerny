import type { components } from '@/types/api';

export type User = components['schemas']['User'];
export type SignupDto = components['schemas']['SignupDto'];
export type LoginDto = components['schemas']['LoginDto'];
export type PasswordResetRequestDto = components['schemas']['PasswordResetRequestDto'];
export type PasswordResetConfirmDto = components['schemas']['PasswordResetConfirmDto'];

/**
 * Hand-written rather than `components['schemas']['SessionResponse']`: openapi-fetch
 * pipes responses through `Readable<T>`, whose key filter drops properties typed
 * `null` (`NonNullable<null>` is `never`, and `never` extends everything). That strips
 * `user: null` from the unauthenticated branch, so the generated type no longer
 * matches what the hook actually receives. `user` is optional here to cover both.
 */
export type SessionResponse =
  { authenticated: false; user?: null } | { authenticated: true; user: User };

export const UNAUTHENTICATED_SESSION: SessionResponse = { authenticated: false, user: null };
