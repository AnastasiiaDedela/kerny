'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

import { useCurrentUser, useLogout, type User } from '@/api/auth';
import { AuthModal } from '@/components/layout/auth/AuthModal';
import type { AuthStep } from '@/components/layout/auth/shared';

type AuthModalContextValue = {
  openSignUp: () => void;
  openLogIn: () => void;
  isLoggedIn: boolean;
  /** True until the first `/api/auth/session` answer arrives. */
  isLoading: boolean;
  user: User | null;
  logOut: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<AuthStep | null>(null);
  const { user, isAuthenticated, isPending } = useCurrentUser();
  const logout = useLogout();

  return (
    <AuthModalContext.Provider
      value={{
        openSignUp: () => setStep('sign-up'),
        openLogIn: () => setStep('log-in'),
        isLoggedIn: isAuthenticated,
        isLoading: isPending,
        user,
        logOut: () => logout.mutate(),
      }}
    >
      {children}
      <AuthModal step={step} onStepChange={setStep} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return ctx;
}
