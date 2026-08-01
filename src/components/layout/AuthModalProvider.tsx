'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

import { AuthModal } from '@/components/layout/auth/AuthModal';
import type { AuthStep } from '@/components/layout/auth/shared';

type AuthModalContextValue = {
  openSignUp: () => void;
  openLogIn: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<AuthStep | null>(null);

  return (
    <AuthModalContext.Provider
      value={{
        openSignUp: () => setStep('sign-up'),
        openLogIn: () => setStep('log-in'),
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
