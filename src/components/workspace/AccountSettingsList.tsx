'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAccountSettings, useDeleteAccount, type AccountSettings } from '@/api/account';
import { useRevokeAllSessions } from '@/api/auth';
import { ChangeEmailModal } from '@/components/workspace/ChangeEmailModal';
import { ChangePasswordModal } from '@/components/workspace/ChangePasswordModal';
import { ConfirmModal } from '@/components/workspace/ConfirmModal';
import { cn } from '@/lib/utils';

export type AccountSettingModal = 'email' | 'password' | 'signOut' | 'delete';

type AccountSettingRow = {
  title: string;
  action: string;
  /** Which dialog the action button opens. */
  modal: AccountSettingModal;
  /** Renders the action in the red "danger" treatment. */
  destructive?: boolean;
};

const ROWS: AccountSettingRow[] = [
  { title: 'Email Address', action: 'Edit E-Mail', modal: 'email' },
  { title: 'Password', action: 'Change', modal: 'password' },
  { title: 'Sign out of all devices', action: 'Sign Out', modal: 'signOut' },
  { title: 'Delete Account', action: 'Delete Account', modal: 'delete', destructive: true },
];

const CONFIRM_COPY =
  'Lorem ipsum dolor sit amet consectetur. Interdum amet montes ipsum in molestie quisque. Blandit risus odio a non scelerisque turpis eget. Scelerisque at at sit ipsum montes ornare pulvinar.';

/** Placeholder shown in a row's description slot until `/api/account/settings` answers. */
const LOADING_DESCRIPTION = '—';

/**
 * STUB — not a real value. `/api/account/settings` leaves `password.changedAt` null
 * until the password is changed for the first time, and no endpoint a non-admin user
 * can call exposes an account-creation date, so there is nothing to count from. The
 * design calls for "Created N days ago" in this state, so we show this fixed age.
 *
 * TODO: delete this and the branch below once the API populates `changedAt` at
 * password creation — the real calculation underneath already handles it.
 */
const PLACEHOLDER_PASSWORD_AGE_DAYS = 10;

function formatAge(days: number) {
  if (days <= 0) return 'Created today';
  return `Created ${days} day${days === 1 ? '' : 's'} ago`;
}

function passwordDescription(password: AccountSettings['password']) {
  if (!password.hasPassword) return 'No password set';
  if (!password.changedAt) return formatAge(PLACEHOLDER_PASSWORD_AGE_DAYS);

  return formatAge(Math.floor((Date.now() - new Date(password.changedAt).getTime()) / 86_400_000));
}

function describe(modal: AccountSettingModal, settings: AccountSettings | undefined) {
  switch (modal) {
    case 'email':
      return settings?.email ?? LOADING_DESCRIPTION;
    case 'password':
      return settings ? passwordDescription(settings.password) : LOADING_DESCRIPTION;
    case 'signOut':
      return 'You will need to sign in again on all devices';
    case 'delete':
      return 'Your account will be permanently deleted';
  }
}

export function AccountSettingsList() {
  const [openModal, setOpenModal] = useState<AccountSettingModal | null>(null);
  const router = useRouter();

  const { data } = useAccountSettings();
  const settings = data?.settings;

  const revokeAll = useRevokeAllSessions();
  const deleteAccount = useDeleteAccount();

  /** Keeps the closing animation intact: only clears the id once the dialog reports it is shut. */
  const closeOn = (modal: AccountSettingModal) => (open: boolean) =>
    setOpenModal(open ? modal : null);

  /** Both confirmations end the session, so the workspace is no longer ours to show. */
  const leaveWorkspace = () => {
    setOpenModal(null);
    router.push('/');
  };

  return (
    <div className="flex flex-col">
      {ROWS.map((item, i) => (
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
            <p className="text-sm leading-[17px] text-white/50">{describe(item.modal, settings)}</p>
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
        currentEmail={settings?.email ?? ''}
      />
      <ChangePasswordModal open={openModal === 'password'} onOpenChange={closeOn('password')} />
      <ConfirmModal
        open={openModal === 'signOut'}
        onOpenChange={closeOn('signOut')}
        title="Sign Out of All Devices"
        description={CONFIRM_COPY}
        onConfirm={() => revokeAll.mutate(undefined, { onSuccess: leaveWorkspace })}
        pending={revokeAll.isPending}
        error={revokeAll.error}
      />
      <ConfirmModal
        open={openModal === 'delete'}
        onOpenChange={closeOn('delete')}
        title="Delete Account"
        description={CONFIRM_COPY}
        destructive
        // Eligibility is the API's call (`settings.deletion`); a blocked delete comes
        // back as a 4xx and surfaces in the dialog rather than being pre-empted here.
        onConfirm={() => deleteAccount.mutate(undefined, { onSuccess: leaveWorkspace })}
        pending={deleteAccount.isPending}
        error={deleteAccount.error}
      />
    </div>
  );
}
