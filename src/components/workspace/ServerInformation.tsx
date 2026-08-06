'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ServerHistory, type HistoryEntry } from '@/components/workspace/ServerHistory';
import { ServerIpAddresses, type IpAddressGroup } from '@/components/workspace/ServerIpAddresses';
import { ServerBackups } from '@/components/workspace/ServerBackups';
import { useRevealServerPassword, type ServerStatus } from '@/api/servers';
import { isServerActive, serverStatusLabel } from '@/lib/servers';
import { cn } from '@/lib/utils';

export interface ServerInfo {
  name: string;
  host: string;
  flag: string | null;
  flagAlt: string;
  ip: string;
  login: string;
  passwordAvailable: boolean;
  status: ServerStatus;
  cost: string;
  validUntil: string;
  tariff: string;
  system: string;
  cpu: string;
  ram: string;
  storage: string;
  connection: string;
}

const tabs = [
  { label: 'Information', enabled: true },
  { label: 'History', enabled: true },
  { label: 'IP-addresses', enabled: true },
  { label: 'Backups', enabled: true },
] as const;

type Tab = (typeof tabs)[number]['label'];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex h-[46px] items-center justify-between gap-2.5 rounded-[10px] bg-[#0F0F0F] px-4 py-[13px]">
      <span className="text-sm leading-[17px] text-white/50">{label}</span>
      {children}
    </div>
  );
}

function Value({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-right text-sm leading-[17px] font-medium text-white">{children}</span>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(value)}
      aria-label={`Copy ${label}`}
      className="shrink-0 transition-opacity hover:opacity-60"
    >
      <Image src="/icons/server-info-icons/copy.svg" alt="" width={14} height={16} />
    </button>
  );
}

export function ServerInformation({
  serverId,
  server,
  history,
  ipGroups,
  instruction,
  backups,
  backupsEnabled,
}: {
  serverId: string;
  server: ServerInfo;
  history: HistoryEntry[];
  ipGroups: IpAddressGroup[];
  instruction: string[];
  backups: string[];
  backupsEnabled: boolean;
}) {
  const [activeTab, setActiveTab] = useState<Tab>('Information');

  return (
    <section className="h-full rounded-[10px] bg-white/[0.04] p-5 lg:p-6">
      <div className="flex items-center gap-6">
        <span className="bg-primary/20 flex size-[100px] shrink-0 items-center justify-center rounded-[8.33px]">
          <Image src="/images/servers/claud server.svg" alt="" width={52} height={35} />
        </span>

        <div className="flex min-w-0 flex-col gap-4">
          <h1 className="text-xl leading-6 font-semibold text-white">{server.name}</h1>
          <div className="flex items-center gap-2.5">
            <span className="relative block h-4 w-5 shrink-0 overflow-hidden rounded-[5px]">
              {server.flag && (
                <Image
                  src={server.flag}
                  alt={server.flagAlt}
                  fill
                  sizes="20px"
                  className="object-cover"
                />
              )}
            </span>
            <span className="truncate text-base leading-[19px] font-medium text-white">
              {server.host}
            </span>
          </div>
        </div>
      </div>

      <div className="@container mt-[30px]">
        <div className="grid grid-cols-2 gap-2.5 @min-[580px]:flex">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              disabled={!tab.enabled}
              onClick={() => setActiveTab(tab.label)}
              className={cn(
                'flex min-h-10 min-w-0 flex-1 items-center justify-center rounded-full px-4 py-2.5 text-center text-base leading-[19px] font-medium transition-colors',
                activeTab === tab.label ? 'bg-primary text-white' : 'bg-white/[0.06] text-white/50',
                tab.enabled && activeTab !== tab.label && 'hover:bg-white/[0.1] hover:text-white',
                !tab.enabled && 'cursor-not-allowed'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Information' && <InformationPanel serverId={serverId} server={server} />}
      {activeTab === 'History' && <ServerHistory data={history} />}
      {activeTab === 'IP-addresses' && (
        <ServerIpAddresses groups={ipGroups} instruction={instruction} />
      )}
      {activeTab === 'Backups' && (
        <ServerBackups serverId={serverId} paragraphs={backups} enabled={backupsEnabled} />
      )}
    </section>
  );
}

function InformationPanel({ serverId, server }: { serverId: string; server: ServerInfo }) {
  const [revealed, setRevealed] = useState(false);
  const reveal = useRevealServerPassword(serverId);

  function togglePassword() {
    if (revealed) {
      setRevealed(false);
      return;
    }
    if (reveal.data) {
      setRevealed(true);
      return;
    }
    reveal.mutate(undefined, { onSuccess: () => setRevealed(true) });
  }

  return (
    <div className="mt-5 flex flex-col gap-2.5">
      <Row label="IP">
        <span className="flex items-center gap-2.5">
          <Value>{server.ip}</Value>
          <CopyButton value={server.ip} label="IP" />
        </span>
      </Row>

      <Row label="Login">
        <span className="flex items-center gap-2.5">
          <Value>{server.login}</Value>
          <CopyButton value={server.login} label="login" />
        </span>
      </Row>

      <Row label="Password">
        <span className="flex items-center gap-2.5">
          <Value>
            {revealed && reveal.data ? reveal.data.credential.password : '*************'}
          </Value>
          <button
            type="button"
            onClick={togglePassword}
            disabled={!server.passwordAvailable || reveal.isPending}
            aria-label={revealed ? 'Hide password' : 'Show password'}
            className="shrink-0 transition-opacity hover:opacity-60 disabled:opacity-30"
          >
            <Image
              src={
                revealed
                  ? '/icons/server-info-icons/eye-off.svg'
                  : '/icons/server-info-icons/eye.svg'
              }
              alt=""
              width={16}
              height={12}
            />
          </button>
        </span>
      </Row>

      <Row label="Status">
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              'size-1 rounded-full',
              isServerActive(server.status) ? 'bg-[#00F551]' : 'bg-destructive'
            )}
          />
          <Value>{serverStatusLabel(server.status)}</Value>
        </span>
      </Row>

      <Row label="Cost">
        <Value>{server.cost}</Value>
      </Row>
      <Row label="Valid until">
        <Value>{server.validUntil}</Value>
      </Row>
      <Row label="Tariff">
        <Value>{server.tariff}</Value>
      </Row>
      <Row label="System">
        <Value>{server.system}</Value>
      </Row>
      <Row label="CPU">
        <Value>{server.cpu}</Value>
      </Row>
      <Row label="RAM">
        <Value>{server.ram}</Value>
      </Row>
      <Row label="Storage">
        <Value>{server.storage}</Value>
      </Row>
      <Row label="Connection">
        <Value>{server.connection}</Value>
      </Row>
    </div>
  );
}
