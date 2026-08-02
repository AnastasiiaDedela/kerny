'use client';

import { ModalActions, ModalShell } from '@/components/workspace/modal-parts';

/** Title + explanatory paragraph + Confirm/Cancel — shared by "Sign Out of All Devices" and
    "Delete Account", which differ only in copy and the colour of the confirm button. */
export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  destructive,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  destructive?: boolean;
}) {
  const close = () => onOpenChange(false);

  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title={title}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          close();
        }}
        className="mt-5 lg:mt-4"
      >
        <p className="text-sm leading-[17px] font-normal text-white/80">{description}</p>

        <ModalActions submitLabel="Confirm" onCancel={close} destructive={destructive} />
      </form>
    </ModalShell>
  );
}
