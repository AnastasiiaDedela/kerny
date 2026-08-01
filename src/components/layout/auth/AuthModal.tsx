'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LogInView } from '@/components/layout/auth/LogInView';
import { NewPasswordView } from '@/components/layout/auth/NewPasswordView';
import { ResetPasswordView } from '@/components/layout/auth/ResetPasswordView';
import type { AuthStep } from '@/components/layout/auth/shared';
import { SignUpView } from '@/components/layout/auth/SignUpView';
import { SuccessView } from '@/components/layout/auth/SuccessView';
import { cn } from '@/lib/utils';

export function AuthModal({
  step,
  onStepChange,
}: {
  step: AuthStep | null;
  onStepChange: (step: AuthStep | null) => void;
}) {
  const close = () => onStepChange(null);

  return (
    <Dialog open={step !== null} onOpenChange={(open) => !open && close()}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          'bg-background w-full gap-0 rounded-[30px] border-0 ring-0',
          step === 'success'
            ? 'max-w-[min(373px,calc(100%-20px))] px-5 pt-7.5 pb-7.5 lg:max-w-[min(460px,calc(100%-20px))] lg:px-7.5 lg:pt-10 lg:pb-10'
            : 'max-w-[min(460px,calc(100%-20px))] px-5 py-7.5 sm:max-w-[min(460px,calc(100%-20px))] lg:p-7.5'
        )}
      >
        {step === 'sign-up' && (
          <SignUpView onClose={close} onLogIn={() => onStepChange('log-in')} />
        )}
        {step === 'log-in' && (
          <LogInView
            onClose={close}
            onSignUp={() => onStepChange('sign-up')}
            onForgotPassword={() => onStepChange('reset-password')}
          />
        )}
        {step === 'reset-password' && (
          <ResetPasswordView
            onClose={close}
            onSubmit={() => onStepChange('new-password')}
            onGoBack={() => onStepChange('log-in')}
          />
        )}
        {step === 'new-password' && (
          <NewPasswordView onClose={close} onSubmit={() => onStepChange('success')} />
        )}
        {step === 'success' && <SuccessView onClose={close} />}
      </DialogContent>
    </Dialog>
  );
}
