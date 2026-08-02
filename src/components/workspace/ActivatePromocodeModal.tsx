'use client';

import { useState } from 'react';

import { ModalActions, ModalField, ModalShell } from '@/components/workspace/modal-parts';

function ActivatePromocodeModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [promocode, setPromocode] = useState('');

  const close = () => {
    setPromocode('');
    onOpenChange(false);
  };

  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title="Activate Promocode">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          close();
        }}
        className="mt-4"
      >
        <ModalField
          id="promocode"
          label="Promocode"
          placeholder="K-123456790"
          value={promocode}
          onValueChange={setPromocode}
        />

        <ModalActions submitLabel="Activate" onCancel={close} />
      </form>
    </ModalShell>
  );
}

/** Trigger + dialog in one client island, so BalanceOverview stays a server component. */
export function ActivatePromocodeButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2.5 h-[46px] w-full rounded-[10px] bg-white/[0.06] text-sm leading-[17px] font-medium text-white/50 transition-colors hover:text-white"
      >
        Activate Promocode
      </button>
      <ActivatePromocodeModal open={open} onOpenChange={setOpen} />
    </>
  );
}
