'use client';

import { useState } from 'react';

import { formError } from '@/api/auth';
import { useCreateDeposit, type DepositAction } from '@/api/billing';
import { FormError } from '@/components/layout/auth/shared';
import { ModalActions, ModalField, ModalShell } from '@/components/workspace/modal-parts';

function actionNotice(action: DepositAction): string | null {
  switch (action.kind) {
    case 'redirect':
      return null;
    case 'hosted_session':
      return 'Your payment is ready. Finish it in the checkout window from your payment provider.';
    case 'pending':
      return action.instructions;
  }
}

export function DepositModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [amount, setAmount] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const deposit = useCreateDeposit();

  const close = () => {
    setAmount('');
    setNotice(null);
    deposit.reset();
    onOpenChange(false);
  };

  const submit = () => {
    deposit.mutate(
      { amount: amount.trim(), currency: 'COIN' },
      {
        onSuccess: ({ action }) => {
          if (action.kind === 'redirect') {
            window.location.assign(action.redirectUrl);
            return;
          }
          setNotice(actionNotice(action));
        },
      }
    );
  };

  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title="Deposit">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="mt-5 lg:mt-4"
      >
        <ModalField
          id="depositAmount"
          label="Amount"
          placeholder="100.00"
          value={amount}
          onValueChange={(value) => {
            setNotice(null);
            setAmount(value);
          }}
          inputMode="numeric"
        />

        {notice && (
          <p className="mt-3 text-sm leading-[17px] font-normal text-white/80">{notice}</p>
        )}

        <FormError>{formError(deposit.error)}</FormError>

        <ModalActions submitLabel="Deposit" onCancel={close} pending={deposit.isPending} />
      </form>
    </ModalShell>
  );
}
