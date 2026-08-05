'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import {
  useDeleteServer,
  useEnableBackups,
  useExtendServer,
  usePowerServer,
  useReinstallServer,
  useResetServerPassword,
  useRestartServer,
  useUpdateServerSettings,
  type ServerDetail,
} from '@/api/servers';
import { ConfirmModal } from '@/components/workspace/ConfirmModal';
import { isServerActive } from '@/lib/servers';
import { cn } from '@/lib/utils';

/** The four card icons ship with the primary/16 badge baked into the 30×30 artboard. */
const cardIcons = {
  status: '/icons/server-info-icons/status.svg',
  renewal: '/icons/server-info-icons/renewal.svg',
  restart: '/icons/server-info-icons/restart.svg',
  extend: '/icons/server-info-icons/extend.svg',
};

/** Actions that charge money or destroy data go behind a confirmation. */
type Confirmation = 'extend' | 'backups' | 'reinstall' | 'password' | 'delete';

const CONFIRM_COPY: Record<Confirmation, { title: string; description: string }> = {
  extend: {
    title: 'Extend Server',
    description:
      'This buys another billing period at the current rate and charges your balance immediately.',
  },
  backups: {
    title: 'Enable Backups',
    description:
      'Backups are a paid add-on. Enabling them charges your balance and cannot be switched off from this screen.',
  },
  reinstall: {
    title: 'Reinstall Server',
    description:
      'The server is wiped and the current operating system is installed fresh. All data on it is lost permanently.',
  },
  password: {
    title: 'Change Password',
    description:
      'A new root password is generated. The current one stops working as soon as the reset completes.',
  },
  delete: {
    title: 'Delete Server',
    description: 'The server and everything on it are destroyed. This cannot be undone.',
  },
};

function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-5 w-[34px] shrink-0 rounded-full transition-colors disabled:opacity-50',
        checked ? 'bg-primary' : 'bg-white/[0.06]'
      )}
    >
      <span
        className={cn(
          'absolute top-[3px] size-3.5 rounded-full bg-white transition-all',
          checked ? 'left-[17px]' : 'left-[3px]'
        )}
      />
    </button>
  );
}

function ToggleCard({
  icon,
  label,
  checked,
  onChange,
  disabled,
}: {
  icon: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex h-[110px] flex-col justify-between rounded-[8px] bg-[#0F0F0F] p-3">
      <Image src={icon} alt="" width={30} height={30} />
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm leading-[17px] font-medium text-white">{label}</span>
        <Toggle checked={checked} onChange={onChange} label={label} disabled={disabled} />
      </div>
    </div>
  );
}

function ActionCard({
  icon,
  label,
  onClick,
  disabled,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-[110px] flex-col justify-between rounded-[8px] bg-[#0F0F0F] p-3 text-left transition-colors hover:bg-[#161616] disabled:opacity-50"
    >
      <Image src={icon} alt="" width={30} height={30} />
      <span className="text-sm leading-[17px] font-medium text-white">{label}</span>
    </button>
  );
}

function ActionRow({
  icon,
  width,
  height,
  label,
  onClick,
  disabled,
}: {
  icon: string;
  width: number;
  height: number;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 items-center justify-between gap-2 rounded-[8px] bg-[#0F0F0F] px-3 py-[11px] transition-colors hover:bg-[#161616] disabled:opacity-50"
    >
      <span className="flex items-center gap-2">
        <Image src={icon} alt="" width={width} height={height} />
        <span className="text-sm leading-[17px] font-medium text-white">{label}</span>
      </span>
      <ChevronRight className="size-3.5 shrink-0 text-white/30" strokeWidth={1.5} />
    </button>
  );
}

export function ServerManagement({ server }: { server: ServerDetail }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState<Confirmation | null>(null);

  const powerServer = usePowerServer(server.id);
  const restartServer = useRestartServer(server.id);
  const updateSettings = useUpdateServerSettings(server.id);
  const enableBackups = useEnableBackups(server.id);
  const extendServer = useExtendServer(server.id);
  const reinstallServer = useReinstallServer(server.id);
  const resetPassword = useResetServerPassword(server.id);
  const deleteServer = useDeleteServer(server.id);

  // An operation already in flight means the API will reject a second one.
  const busy = server.operation?.status === 'pending' || server.operation?.status === 'running';

  const close = () => setConfirming(null);

  const confirmations: Record<Confirmation, { run: () => void; pending: boolean; error: unknown }> =
    {
      extend: {
        // Extending renews on the period the server was bought on.
        run: () =>
          extendServer.mutate(
            { billingPeriod: server.pricing.billingPeriod },
            { onSuccess: close }
          ),
        pending: extendServer.isPending,
        error: extendServer.error,
      },
      backups: {
        run: () => enableBackups.mutate(undefined, { onSuccess: close }),
        pending: enableBackups.isPending,
        error: enableBackups.error,
      },
      reinstall: {
        // No OS picker exists on this screen, so reinstall means "same image, fresh".
        run: () =>
          reinstallServer.mutate(
            { operatingSystemId: server.os.id, confirmDataLoss: true },
            { onSuccess: close }
          ),
        pending: reinstallServer.isPending,
        error: reinstallServer.error,
      },
      password: {
        run: () => resetPassword.mutate(undefined, { onSuccess: close }),
        pending: resetPassword.isPending,
        error: resetPassword.error,
      },
      delete: {
        run: () =>
          deleteServer.mutate(undefined, {
            onSuccess: () => {
              close();
              router.push('/workspace');
            },
          }),
        pending: deleteServer.isPending,
        error: deleteServer.error,
      },
    };

  const active = confirming ? confirmations[confirming] : null;

  return (
    <section className="flex h-full flex-col rounded-[10px] bg-white/[0.04] p-6">
      <h2 className="text-xl leading-6 font-semibold text-white">Server Management</h2>

      <div className="mt-4 flex flex-col gap-3">
        <ToggleCard
          icon={cardIcons.status}
          label="Status"
          checked={isServerActive(server.status)}
          disabled={busy || powerServer.isPending}
          onChange={(on) => powerServer.mutate({ state: on ? 'on' : 'off' })}
        />
        <ToggleCard
          icon={cardIcons.renewal}
          label="Auto-renewal"
          checked={server.validity.autoRenewal}
          disabled={updateSettings.isPending}
          onChange={(autoRenewal) => updateSettings.mutate({ autoRenewal })}
        />

        <div className="grid grid-cols-2 gap-3">
          <ActionCard
            icon={cardIcons.restart}
            label="Restart"
            disabled={busy || restartServer.isPending}
            onClick={() => restartServer.mutate()}
          />
          <ActionCard
            icon={cardIcons.extend}
            label="Extend"
            disabled={busy}
            onClick={() => setConfirming('extend')}
          />
        </div>
      </div>

      {/* Ticket and Upgrade have no endpoint in the Servers section — left inert. */}
      <div className="mt-4 flex flex-col gap-2">
        <ActionRow
          icon="/icons/server-info-icons/ticket.svg"
          width={14}
          height={14}
          label="Ticket"
        />
        <ActionRow
          icon="/icons/server-info-icons/upgrade.svg"
          width={14}
          height={14}
          label="Upgrade"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <ActionRow
          icon="/icons/server-info-icons/backup.svg"
          width={14}
          height={14}
          label="Enable backups"
          disabled={server.settings.backupsEnabled || busy}
          onClick={() => setConfirming('backups')}
        />
        <ActionRow
          icon="/icons/server-info-icons/reinstall.svg"
          width={14}
          height={12}
          label="Reinstall"
          disabled={busy}
          onClick={() => setConfirming('reinstall')}
        />
        <ActionRow
          icon="/icons/server-info-icons/key.svg"
          width={14}
          height={14}
          label="Change password"
          disabled={busy}
          onClick={() => setConfirming('password')}
        />

        <div className="flex h-10 items-center justify-between gap-2 rounded-[8px] bg-[#0F0F0F] px-3 py-[11px]">
          <span className="flex items-center gap-2">
            <Image src="/icons/server-info-icons/recovery.svg" alt="" width={14} height={15} />
            <span className="text-sm leading-[17px] font-medium text-white">Recovery mode</span>
          </span>
          <Toggle
            checked={server.settings.recoveryMode}
            disabled={updateSettings.isPending}
            onChange={(recoveryMode) => updateSettings.mutate({ recoveryMode })}
            label="Recovery mode"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setConfirming('delete')}
        className="mt-4 flex h-10 items-center justify-center gap-2 rounded-[10px] bg-[#FF172F]/20 px-3 py-[11px] transition-colors hover:bg-[#FF172F]/30 lg:mt-auto"
      >
        <Image src="/icons/server-info-icons/bin.svg" alt="" width={15} height={18} />
        <span className="text-sm leading-[17px] font-medium text-white">Delete server</span>
      </button>

      {confirming && active && (
        <ConfirmModal
          open
          onOpenChange={(open) => !open && close()}
          title={CONFIRM_COPY[confirming].title}
          description={CONFIRM_COPY[confirming].description}
          destructive={confirming === 'delete' || confirming === 'reinstall'}
          onConfirm={active.run}
          pending={active.pending}
          error={active.error}
        />
      )}
    </section>
  );
}
