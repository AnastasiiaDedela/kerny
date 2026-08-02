'use client';

import { useState } from 'react';

import { ModalActions, ModalField, ModalShell } from '@/components/workspace/modal-parts';

export function ChangeEmailModal({
  open,
  onOpenChange,
  currentEmail,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentEmail: string;
}) {
  const [newEmail, setNewEmail] = useState('');

  const close = () => {
    setNewEmail('');
    onOpenChange(false);
  };

  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title="Change Email Address">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          close();
        }}
        className="mt-5 lg:mt-4"
      >
        <div className="flex flex-col gap-3">
          <ModalField
            id="currentEmail"
            label="Current Email"
            placeholder={currentEmail}
            value={currentEmail}
            onValueChange={() => {}}
            readOnly
          />

          <ModalField
            id="newEmail"
            label="New Email"
            placeholder="Enter New Email Address..."
            value={newEmail}
            onValueChange={setNewEmail}
            type="email"
          />
        </div>

        <ModalActions submitLabel="Send Code" onCancel={close} />
      </form>
    </ModalShell>
  );
}
