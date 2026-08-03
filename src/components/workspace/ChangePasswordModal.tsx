'use client';

import { useState } from 'react';

import { useChangePassword } from '@/api/account';
import { fieldError, formError } from '@/api/auth';
import { FieldError, FormError } from '@/components/layout/auth/shared';
import { ModalActions, ModalField, ModalShell } from '@/components/workspace/modal-parts';

const emptyPasswords = { current: '', next: '', repeat: '' };

export function ChangePasswordModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [values, setValues] = useState(emptyPasswords);
  const [mismatch, setMismatch] = useState(false);

  const change = useChangePassword();

  const close = () => {
    setValues(emptyPasswords);
    setMismatch(false);
    change.reset();
    onOpenChange(false);
  };

  const submit = () => {
    // The API never sees `repeat`, so the two-field match is ours to check.
    if (values.next !== values.repeat) {
      setMismatch(true);
      return;
    }
    setMismatch(false);
    change.mutate(
      { currentPassword: values.current, newPassword: values.next },
      { onSuccess: close }
    );
  };

  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title="Change Password">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="mt-5 lg:mt-4"
      >
        <div className="flex flex-col gap-4 lg:gap-3">
          <ModalField
            id="currentPassword"
            label="Current Password"
            placeholder="Enter Current Password..."
            value={values.current}
            onValueChange={(current) => setValues((v) => ({ ...v, current }))}
            type="password"
          />
          <FieldError>{fieldError(change.error, 'currentPassword')}</FieldError>

          <ModalField
            id="newPassword"
            label="New Password"
            placeholder="Enter New Password..."
            value={values.next}
            onValueChange={(next) => setValues((v) => ({ ...v, next }))}
            type="password"
          />
          <FieldError>{fieldError(change.error, 'newPassword')}</FieldError>

          <ModalField
            id="repeatPassword"
            label="Repeat Password"
            placeholder="Repeat Password..."
            value={values.repeat}
            onValueChange={(repeat) => setValues((v) => ({ ...v, repeat }))}
            type="password"
          />
          <FieldError>{mismatch ? 'Passwords do not match.' : undefined}</FieldError>
        </div>

        <FormError>{formError(change.error)}</FormError>

        <ModalActions submitLabel="Change" onCancel={close} pending={change.isPending} />
      </form>
    </ModalShell>
  );
}
