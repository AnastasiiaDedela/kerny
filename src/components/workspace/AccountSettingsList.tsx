'use client';

import { useState } from 'react';

import { ChangeEmailModal } from '@/components/workspace/ChangeEmailModal';
import { ChangePasswordModal } from '@/components/workspace/ChangePasswordModal';
import { ConfirmModal } from '@/components/workspace/ConfirmModal';
import { cn } from '@/lib/utils';

export type AccountSettingModal = 'email' | 'password' | 'signOut' | 'delete';

export type AccountSetting = {
  title: string;
  description: string;
  action: string;
  /** Which dialog the action button opens. */
  modal: AccountSettingModal;
  /** Renders the action in the red "danger" treatment. */
  destructive?: boolean;
};

const CONFIRM_COPY =
  'Lorem ipsum dolor sit amet consectetur. Interdum amet montes ipsum in molestie quisque. Blandit risus odio a non scelerisque turpis eget. Scelerisque at at sit ipsum montes ornare pulvinar.';

export function AccountSettingsList({
  items,
  currentEmail,
}: {
  items: AccountSetting[];
  currentEmail: string;
}) {
  const [openModal, setOpenModal] = useState<AccountSettingModal | null>(null);

  /** Keeps the closing animation intact: only clears the id once the dialog reports it is shut. */
  const closeOn = (modal: AccountSettingModal) => (open: boolean) =>
    setOpenModal(open ? modal : null);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div
          key={item.title}
          className={cn(
            'flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-36',
            // Rows are separated by a hairline with 16px of air on either side.
            i > 0 && 'mt-4 border-t border-white/10 pt-4'
          )}
        >
          <div className="flex flex-col gap-1.5">
            <p className="text-base leading-[19px] font-semibold text-white">{item.title}</p>
            <p className="text-sm leading-[17px] text-white/50">{item.description}</p>
          </div>

          <button
            type="button"
            onClick={() => setOpenModal(item.modal)}
            className={cn(
              'flex h-10 w-35 shrink-0 items-center justify-center rounded-[8px] text-sm leading-[17px] font-medium transition-colors',
              item.destructive
                ? 'bg-[#FB3737]/20 text-[#FB3737] hover:bg-[#FB3737]/30'
                : 'bg-white/[0.06] text-white hover:bg-white/10'
            )}
          >
            {item.action}
          </button>
        </div>
      ))}

      <ChangeEmailModal
        open={openModal === 'email'}
        onOpenChange={closeOn('email')}
        currentEmail={currentEmail}
      />
      <ChangePasswordModal open={openModal === 'password'} onOpenChange={closeOn('password')} />
      <ConfirmModal
        open={openModal === 'signOut'}
        onOpenChange={closeOn('signOut')}
        title="Sign Out of All Devices"
        description={CONFIRM_COPY}
      />
      <ConfirmModal
        open={openModal === 'delete'}
        onOpenChange={closeOn('delete')}
        title="Delete Account"
        description={CONFIRM_COPY}
        destructive
      />
    </div>
  );
}
