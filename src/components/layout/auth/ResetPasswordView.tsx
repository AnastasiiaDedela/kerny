'use client';

import { useState } from 'react';

import { fieldError, formError, useRequestPasswordReset } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AuthModalDescription,
  AuthModalHeader,
  description,
  FieldError,
  fieldClassName,
  FormError,
  SecondaryButton,
} from '@/components/layout/auth/shared';

export function ResetPasswordView({
  onClose,
  onSuccess,
  onGoBack,
}: {
  onClose: () => void;
  onSuccess: () => void;
  onGoBack: () => void;
}) {
  const [email, setEmail] = useState('');

  const requestReset = useRequestPasswordReset();

  return (
    <>
      <AuthModalHeader title="Reset Password" onClose={onClose} />
      <AuthModalDescription>{description}</AuthModalDescription>

      <form
        className="mt-4 flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          requestReset.mutate({ email }, { onSuccess });
        }}
      >
        <div className="flex flex-col gap-1">
          <Input
            placeholder="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClassName}
          />
          <FieldError>{fieldError(requestReset.error, 'email')}</FieldError>
        </div>

        <FormError>{formError(requestReset.error)}</FormError>

        <Button
          type="submit"
          disabled={requestReset.isPending}
          className="mt-4 h-[46px] w-full rounded-[10px] text-sm font-medium"
        >
          {requestReset.isPending ? 'Sending…' : 'Reset Password'}
        </Button>
      </form>

      <div className="mt-2">
        <SecondaryButton onClick={onGoBack}>Go Back</SecondaryButton>
      </div>
    </>
  );
}
