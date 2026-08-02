'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ServerInfo {
  name: string;
  host: string;
  flag: string;
  flagAlt: string;
  ip: string;
  login: string;
  password: string;
  status: 'Active' | 'Inactive';
  cost: string;
  validUntil: string;
  tariff: string;
  system: string;
  cpu: string;
  ram: string;
  storage: string;
  connection: string;
}

const tabs = ['Information', 'History', 'IP-addresses', 'Backups'];

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
      className="text-white/30 transition-colors hover:text-white/60"
    >
      <Copy className="size-3.5" strokeWidth={1.5} />
    </button>
  );
}

export function ServerInformation({ server }: { server: ServerInfo }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="h-full rounded-[10px] bg-white/[0.04] p-6">
      {/* Server identity */}
      <div className="flex items-center gap-6">
        <span className="bg-primary/20 flex size-[100px] shrink-0 items-center justify-center rounded-[8.33px]">
          <Image src="/images/servers/claud server.svg" alt="" width={52} height={35} />
        </span>

        <div className="flex min-w-0 flex-col gap-4">
          <h1 className="text-xl leading-6 font-semibold text-white">{server.name}</h1>
          <div className="flex items-center gap-2.5">
            <span className="relative block h-4 w-5 shrink-0 overflow-hidden rounded-[5px]">
              <Image src={server.flag} alt={server.flagAlt} fill className="object-cover" />
            </span>
            <span className="truncate text-base leading-[19px] font-medium text-white">
              {server.host}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-[30px] grid grid-cols-2 gap-2.5 sm:flex">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={cn(
              'flex h-10 items-center justify-center rounded-full px-4 text-base leading-[19px] font-medium transition-colors sm:flex-1',
              i === 0
                ? 'bg-primary text-white'
                : 'bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Information */}
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
            <Value>{revealed ? server.password : '*************'}</Value>
            <button
              type="button"
              onClick={() => setRevealed((v) => !v)}
              aria-label={revealed ? 'Hide password' : 'Show password'}
              className="text-white/30 transition-colors hover:text-white/60"
            >
              {revealed ? (
                <EyeOff className="size-4" strokeWidth={1.5} />
              ) : (
                <Eye className="size-4" strokeWidth={1.5} />
              )}
            </button>
          </span>
        </Row>

        <Row label="Status">
          <span className="flex items-center gap-1.5">
            <span
              className={cn(
                'size-1 rounded-full',
                server.status === 'Active' ? 'bg-[#00F551]' : 'bg-destructive'
              )}
            />
            <Value>{server.status}</Value>
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
    </section>
  );
}
