'use client';

import { useState } from 'react';

import { fieldError, formError, useGoogleAuth, useLogin } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AuthModalDescription,
  AuthModalHeader,
  description,
  FieldError,
  fieldClassName,
  FormError,
  GoogleButton,
  OrDivider,
  SecondaryButton,
} from '@/components/layout/auth/shared';

export function LogInView({
  onClose,
  onSignUp,
  onForgotPassword,
  onSuccess,
}: {
  onClose: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useLogin();
  const google = useGoogleAuth();

  return (
    <>
      <AuthModalHeader title="Log In" onClose={onClose} />
      <AuthModalDescription>{description}</AuthModalDescription>

      <form
        className="mt-4 flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          login.mutate({ email, password }, { onSuccess });
        }}
      >
        <div className="flex flex-col gap-2.5">
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
            <FieldError>{fieldError(login.error, 'email')}</FieldError>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={fieldClassName}
            />
            <FieldError>{fieldError(login.error, 'password')}</FieldError>
          </div>
        </div>

        <button
          type="button"
          onClick={onForgotPassword}
          className="text-muted-foreground hover:text-foreground mt-4 text-left text-sm leading-[17px] transition-colors"
        >
          Forget your Password?
        </button>

        <FormError>{formError(login.error)}</FormError>

        <Button
          type="submit"
          disabled={login.isPending}
          className="mt-4 h-[46px] w-full rounded-[10px] text-sm font-medium"
        >
          {login.isPending ? 'Logging In…' : 'Log In'}
        </Button>
      </form>

      <div className="mt-2">
        <SecondaryButton onClick={onSignUp}>Don&apos;t have an account yet?</SecondaryButton>
      </div>

      <div className="mt-4">
        <OrDivider />
      </div>

      <div className="mt-4">
        <GoogleButton
          disabled={google.isPending}
          onClick={() => google.mutate({ next: window.location.pathname })}
        >
          Log In With Google
        </GoogleButton>
        <FormError>{formError(google.error)}</FormError>
      </div>
    </>
  );
}
