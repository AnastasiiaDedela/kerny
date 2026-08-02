'use client';

import { useState } from 'react';

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

  const close = () => {
    setValues(emptyPasswords);
    onOpenChange(false);
  };

  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title="Change Password">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          close();
        }}
        className="mt-5 lg:mt-4"
      >
        <div className="flex flex-col gap-3">
          <ModalField
            id="currentPassword"
            label="Current Password"
            placeholder="Enter Current Password..."
            value={values.current}
            onValueChange={(current) => setValues((v) => ({ ...v, current }))}
            type="password"
          />

          <ModalField
            id="newPassword"
            label="New Password"
            placeholder="Enter New Password..."
            value={values.next}
            onValueChange={(next) => setValues((v) => ({ ...v, next }))}
            type="password"
          />

          <ModalField
            id="repeatPassword"
            label="Repeat Password"
            placeholder="Repeat Password..."
            value={values.repeat}
            onValueChange={(repeat) => setValues((v) => ({ ...v, repeat }))}
            type="password"
          />
        </div>

        <ModalActions submitLabel="Change" onCancel={close} />
      </form>
    </ModalShell>
  );
}
