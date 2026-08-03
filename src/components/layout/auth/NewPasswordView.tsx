'use client';

import { useState } from 'react';

import { fieldError, formError, useConfirmPasswordReset } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AuthModalDescription,
  AuthModalHeader,
  description,
  FieldError,
  fieldClassName,
  FormError,
} from '@/components/layout/auth/shared';

/**
 * The confirm endpoint needs the token from the emailed reset link. When the user
 * arrives via that link (`/?token=…`) it is filled in for them; otherwise they can
 * paste it, which keeps this step reachable on its own.
 */
function readTokenFromUrl() {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('token') ?? '';
}

export function NewPasswordView({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [tokenFromUrl] = useState(readTokenFromUrl);
  const [token, setToken] = useState(tokenFromUrl);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [mismatch, setMismatch] = useState(false);

  const confirmReset = useConfirmPasswordReset();

  return (
    <>
      <AuthModalHeader title="New Password" onClose={onClose} />
      <AuthModalDescription>{description}</AuthModalDescription>

      <form
        className="mt-4 flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          if (password !== repeatPassword) {
            setMismatch(true);
            return;
          }
          setMismatch(false);
          confirmReset.mutate({ token, password }, { onSuccess });
        }}
      >
        <div className="flex flex-col gap-2.5">
          {!tokenFromUrl && (
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Reset code from email"
                type="text"
                name="reset-token"
                // Without these the browser offers to autofill this as an email field.
                autoComplete="off"
                spellCheck={false}
                required
                value={token}
                onChange={(event) => setToken(event.target.value)}
                className={fieldClassName}
              />
              <FieldError>{fieldError(confirmReset.error, 'token')}</FieldError>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <Input
              placeholder="New Password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={fieldClassName}
            />
            <FieldError>{fieldError(confirmReset.error, 'password')}</FieldError>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Repeat your Password"
              type="password"
              autoComplete="new-password"
              required
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
              className={fieldClassName}
            />
            <FieldError>{mismatch ? 'Passwords do not match.' : undefined}</FieldError>
          </div>
        </div>

        <FormError>{formError(confirmReset.error)}</FormError>

        <Button
          type="submit"
          disabled={confirmReset.isPending}
          className="mt-4 h-[46px] w-full rounded-[10px] text-sm font-medium"
        >
          {confirmReset.isPending ? 'Confirming…' : 'Confirm'}
        </Button>
      </form>
    </>
  );
}
