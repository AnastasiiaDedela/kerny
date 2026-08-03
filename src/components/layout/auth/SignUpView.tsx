'use client';

import { useState } from 'react';

import { fieldError, formError, useGoogleAuth, useSignup } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

export function SignUpView({
  onClose,
  onLogIn,
  onSuccess,
}: {
  onClose: () => void;
  onLogIn: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [personalDataConsent, setPersonalDataConsent] = useState(false);

  const signup = useSignup();
  const google = useGoogleAuth();

  return (
    <>
      <AuthModalHeader title="Sign Up" onClose={onClose} />
      <AuthModalDescription>{description}</AuthModalDescription>

      <form
        className="mt-4 flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          signup.mutate({ email, password, repeatPassword, personalDataConsent }, { onSuccess });
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
            <FieldError>{fieldError(signup.error, 'email')}</FieldError>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={fieldClassName}
            />
            <FieldError>{fieldError(signup.error, 'password')}</FieldError>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Repeat Password"
              type="password"
              autoComplete="new-password"
              required
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
              className={fieldClassName}
            />
            <FieldError>{fieldError(signup.error, 'repeatPassword')}</FieldError>
          </div>
        </div>

        <label className="mt-4 flex items-center gap-3 text-xs leading-[15px] text-white/50">
          <Checkbox
            checked={personalDataConsent}
            onCheckedChange={setPersonalDataConsent}
            className="data-checked:bg-primary size-6 shrink-0 rounded-[5px] border-0 bg-white/[0.04]"
          />
          <span>
            I consent to the processing of personal data and agree to the{' '}
            <a href="#" className="text-primary">
              terms of confidentiality
            </a>
          </span>
        </label>
        <FieldError>{fieldError(signup.error, 'personalDataConsent')}</FieldError>

        <FormError>{formError(signup.error)}</FormError>

        <Button
          type="submit"
          disabled={signup.isPending}
          className="mt-4 h-[46px] w-full rounded-[10px] text-sm font-medium"
        >
          {signup.isPending ? 'Signing Up…' : 'Sign Up'}
        </Button>
      </form>

      <div className="mt-2">
        <SecondaryButton onClick={onLogIn}>I already have an account</SecondaryButton>
      </div>

      <div className="mt-4">
        <OrDivider />
      </div>

      <div className="mt-4">
        <GoogleButton
          disabled={google.isPending}
          onClick={() => google.mutate({ next: window.location.pathname, personalDataConsent })}
        >
          Sign Up With Google
        </GoogleButton>
        <FormError>{formError(google.error)}</FormError>
      </div>
    </>
  );
}
