'use client';

import { useState } from 'react';

import { useConfirmEmailChange, useRequestEmailChange } from '@/api/account';
import { fieldError, formError } from '@/api/auth';
import { FieldError, FormError } from '@/components/layout/auth/shared';
import { ModalActions, ModalField, ModalShell } from '@/components/workspace/modal-parts';

/**
 * Two API calls behind one dialog: `change-request` mails a code to the new address,
 * then `confirm` swaps the address over. The second step reuses the same fields, so
 * the dialog swaps its inputs rather than opening a second modal.
 */
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
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'request' | 'confirm'>('request');

  const request = useRequestEmailChange();
  const confirm = useConfirmEmailChange();

  const close = () => {
    setNewEmail('');
    setCode('');
    setStep('request');
    request.reset();
    confirm.reset();
    onOpenChange(false);
  };

  const submit = () => {
    if (step === 'request') {
      request.mutate({ newEmail }, { onSuccess: () => setStep('confirm') });
      return;
    }
    confirm.mutate({ code, newEmail }, { onSuccess: close });
  };

  const pending = request.isPending || confirm.isPending;
  const error = step === 'request' ? request.error : confirm.error;

  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title="Change Email Address">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="mt-5 lg:mt-4"
      >
        <div className="flex flex-col gap-4 lg:gap-3">
          {step === 'request' ? (
            <>
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
              <FieldError>{fieldError(request.error, 'newEmail')}</FieldError>
            </>
          ) : (
            <>
              {/* Kept visible and locked: `confirm` sends `newEmail` back alongside the code. */}
              <ModalField
                id="newEmail"
                label="New Email"
                placeholder={newEmail}
                value={newEmail}
                onValueChange={() => {}}
                readOnly
              />

              <ModalField
                id="confirmationCode"
                label="Confirmation Code"
                placeholder="Enter Code From Email..."
                value={code}
                onValueChange={setCode}
              />
              <FieldError>{fieldError(confirm.error, 'code')}</FieldError>
            </>
          )}
        </div>

        <FormError>{formError(error)}</FormError>

        <ModalActions
          submitLabel={step === 'request' ? 'Send Code' : 'Confirm'}
          onCancel={close}
          pending={pending}
        />
      </form>
    </ModalShell>
  );
}
