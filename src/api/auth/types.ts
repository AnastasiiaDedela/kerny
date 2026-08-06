import type { components } from '@/types/api';

export type User = components['schemas']['User'];
export type SignupDto = components['schemas']['SignupDto'];
export type LoginDto = components['schemas']['LoginDto'];
export type PasswordResetRequestDto = components['schemas']['PasswordResetRequestDto'];
export type PasswordResetConfirmDto = components['schemas']['PasswordResetConfirmDto'];

export type SessionResponse =
  { authenticated: false; user?: null } | { authenticated: true; user: User };

export const UNAUTHENTICATED_SESSION: SessionResponse = { authenticated: false, user: null };
