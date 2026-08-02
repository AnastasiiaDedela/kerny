'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/** The four card icons ship with the primary/16 badge baked into the 30×30 artboard. */
const cardIcons = {
  status: '/icons/server-info-icons/status.svg',
  renewal: '/icons/server-info-icons/renewal.svg',
  restart: '/icons/server-info-icons/restart.svg',
  extend: '/icons/server-info-icons/extend.svg',
};

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-5 w-[34px] shrink-0 rounded-full transition-colors',
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
}: {
  icon: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex h-[110px] flex-col justify-between rounded-[8px] bg-[#0F0F0F] p-3">
      <Image src={icon} alt="" width={30} height={30} />
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm leading-[17px] font-medium text-white">{label}</span>
        <Toggle checked={checked} onChange={onChange} label={label} />
      </div>
    </div>
  );
}

function ActionCard({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      type="button"
      className="flex h-[110px] flex-col justify-between rounded-[8px] bg-[#0F0F0F] p-3 text-left transition-colors hover:bg-[#161616]"
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
}: {
  icon: string;
  width: number;
  height: number;
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex h-10 items-center justify-between gap-2 rounded-[8px] bg-[#0F0F0F] px-3 py-[11px] transition-colors hover:bg-[#161616]"
    >
      <span className="flex items-center gap-2">
        <Image src={icon} alt="" width={width} height={height} />
        <span className="text-sm leading-[17px] font-medium text-white">{label}</span>
      </span>
      <ChevronRight className="size-3.5 shrink-0 text-white/30" strokeWidth={1.5} />
    </button>
  );
}

export function ServerManagement() {
  const [powered, setPowered] = useState(true);
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(false);

  return (
    <section className="flex h-full flex-col rounded-[10px] bg-white/[0.04] p-6">
      <h2 className="text-xl leading-6 font-semibold text-white">Server Management</h2>

      <div className="mt-4 flex flex-col gap-3">
        <ToggleCard
          icon={cardIcons.status}
          label="Status"
          checked={powered}
          onChange={setPowered}
        />
        <ToggleCard
          icon={cardIcons.renewal}
          label="Auto-renewal"
          checked={autoRenewal}
          onChange={setAutoRenewal}
        />

        <div className="grid grid-cols-2 gap-3">
          <ActionCard icon={cardIcons.restart} label="Restart" />
          <ActionCard icon={cardIcons.extend} label="Extend" />
        </div>
      </div>

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
        />
        <ActionRow
          icon="/icons/server-info-icons/reinstall.svg"
          width={14}
          height={12}
          label="Reinstall"
        />
        <ActionRow
          icon="/icons/server-info-icons/key.svg"
          width={14}
          height={14}
          label="Change password"
        />

        <div className="flex h-10 items-center justify-between gap-2 rounded-[8px] bg-[#0F0F0F] px-3 py-[11px]">
          <span className="flex items-center gap-2">
            <Image src="/icons/server-info-icons/recovery.svg" alt="" width={14} height={15} />
            <span className="text-sm leading-[17px] font-medium text-white">Recovery mode</span>
          </span>
          <Toggle checked={recoveryMode} onChange={setRecoveryMode} label="Recovery mode" />
        </div>
      </div>

      <button
        type="button"
        className="mt-4 flex h-10 items-center justify-center gap-2 rounded-[10px] bg-[#FF172F]/20 px-3 py-[11px] transition-colors hover:bg-[#FF172F]/30 lg:mt-auto"
      >
        <Image src="/icons/server-info-icons/bin.svg" alt="" width={15} height={18} />
        <span className="text-sm leading-[17px] font-medium text-white">Delete server</span>
      </button>
    </section>
  );
}
