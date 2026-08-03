export { authKeys } from '@/api/auth/keys';
export { useCurrentUser, useSession } from '@/api/auth/queries';
export {
  fieldError,
  formError,
  useConfirmPasswordReset,
  useGoogleAuth,
  useLogin,
  useLogout,
  useRequestPasswordReset,
  useRevokeAllSessions,
  useSessionSync,
  useSignup,
} from '@/api/auth/mutations';
export type {
  LoginDto,
  PasswordResetConfirmDto,
  PasswordResetRequestDto,
  SessionResponse,
  SignupDto,
  User,
} from '@/api/auth/types';
