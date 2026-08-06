'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CirclePlus, ChevronDown } from 'lucide-react';
import {
  useDeployableOperatingSystems,
  useDeployableRegions,
  type OperatingSystem,
  type Region,
} from '@/api/catalog';
import {
  usePricing,
  useQuoteTotals,
  type BillingPeriod,
  type PricingAddon,
  type PricingTariff,
  type QuoteItem,
} from '@/api/pricing';
import { regionCountry, regionFlagSrc } from '@/lib/catalog';
import { formatAmount } from '@/lib/pricing';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/components/layout/AuthModalProvider';
import { TariffTable, toTariffRow } from './TariffTable';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Server {
  id: number;
  /** Catalog ids, empty until the catalog answers; the first option stands in. */
  osId: string;
  regionId: string;
  planId: string | null;
  addonIds: Set<string>;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Dropdown<T extends string>({
  value,
  options,
  onChange,
  renderOption,
  renderValue,
}: {
  value: T;
  options: T[];
  onChange: (val: T) => void;
  renderOption?: (val: T) => React.ReactNode;
  renderValue?: (val: T) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-[50px] w-full items-center justify-between rounded-[8px] bg-[#0F0F0F] px-4 text-left text-base text-white"
      >
        <span className="flex items-center gap-2">{renderValue ? renderValue(value) : value}</span>
        <ChevronDown
          strokeWidth={1.5}
          className={cn('size-4 shrink-0 text-white/30 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 left-0 z-20 mt-1 max-h-[220px] overflow-y-auto rounded-[8px] bg-[#0F0F0F]">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={cn(
                'flex w-full items-center gap-2 border border-white/10 px-3 py-2.5 text-base text-white transition-colors hover:bg-white/[0.06]',
                opt === value && 'bg-white/[0.06]'
              )}
            >
              {renderOption ? renderOption(opt) : opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FlagImage({ region }: { region: Region | undefined }) {
  const src = region ? regionFlagSrc(region) : null;

  return (
    <span className="relative inline-block h-4 w-6 overflow-hidden rounded-[2px]">
      {src && region && (
        <Image src={src} alt={regionCountry(region)} fill className="object-cover" />
      )}
    </span>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-[26px] w-[44px] shrink-0 rounded-full transition-colors',
        checked ? 'bg-[#434CF7]' : 'bg-white/[0.06]'
      )}
    >
      <span
        className={cn(
          'absolute top-1 h-[18px] w-[18px] rounded-full bg-white transition-[left] duration-150',
          checked ? 'left-[22px]' : 'left-1'
        )}
      />
    </button>
  );
}

function ServerCard({
  server,
  index,
  operatingSystems,
  regions,
  tariffs,
  addons,
  onUpdate,
  onRemove,
  canRemove,
}: {
  server: Server;
  index: number;
  operatingSystems: OperatingSystem[];
  regions: Region[];
  tariffs: PricingTariff[];
  addons: PricingAddon[];
  onUpdate: (s: Server) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  // The catalog arrives after first paint, so fall back to whatever loaded first.
  const osId = server.osId || operatingSystems[0]?.id || '';
  const regionId = server.regionId || regions[0]?.id || '';

  const osIds = operatingSystems.map((os) => os.id);
  const regionIds = regions.map((r) => r.id);

  function osName(id: string) {
    return operatingSystems.find((os) => os.id === id)?.name ?? '';
  }

  function regionFor(id: string) {
    return regions.find((r) => r.id === id);
  }

  // A plan is only offered where the provider actually has stock.
  const rows = useMemo(
    () =>
      tariffs
        .filter((tariff) => tariff.supportedRegionIds.includes(regionId))
        .map((tariff) => toTariffRow(tariff, regionId)),
    [tariffs, regionId]
  );

  function toggleAddon(id: string, enabled: boolean) {
    const next = new Set(server.addonIds);
    enabled ? next.add(id) : next.delete(id);
    onUpdate({ ...server, addonIds: next });
  }

  return (
    <div className="rounded-[15px] bg-white/[0.04] p-6 md:p-[30px]">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-2xl font-bold text-white">Cloud Server #{index + 1}</span>
        <button type="button" onClick={onRemove} className="group">
          <Image
            src="/icons/inactive-bin.svg"
            alt="Remove server"
            width={30}
            height={30}
            className="block group-hover:hidden"
          />
          <Image
            src="/icons/active-bin.svg"
            alt="Remove server"
            width={30}
            height={30}
            className="hidden group-hover:block"
          />
        </button>
      </div>

      {/* OS + Region */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <div>
          <p className="mb-2.5 text-base font-medium text-white/50">Operation System</p>
          <Dropdown
            value={osId}
            options={osIds}
            onChange={(id) => onUpdate({ ...server, osId: id })}
            renderOption={osName}
            renderValue={osName}
          />
        </div>
        <div>
          <p className="mb-2.5 text-base font-medium text-white/50">Region</p>
          <Dropdown
            value={regionId}
            options={regionIds}
            // Switching region can drop the chosen plan, so clear it rather than quote
            // a plan the new region doesn't sell.
            onChange={(id) => onUpdate({ ...server, regionId: id, planId: null })}
            renderOption={(id) => (
              <>
                <FlagImage region={regionFor(id)} />
                {regionFor(id)?.city ?? ''}
              </>
            )}
            renderValue={(id) => (
              <>
                <FlagImage region={regionFor(id)} />
                {regionFor(id)?.city ?? ''}
              </>
            )}
          />
        </div>
      </div>

      {/* Tariff table */}
      <div className="mt-4 md:mt-5">
        <p className="mb-2.5 text-base font-medium text-white/50">Tariff</p>
        <TariffTable
          data={rows}
          selectedId={server.planId}
          onSelect={(id) => onUpdate({ ...server, planId: id })}
        />
      </div>

      {/* Addons */}
      <div className="mt-4 flex flex-col gap-4">
        {addons.map((addon) => (
          <div key={addon.id} className="flex items-center gap-3">
            <Toggle
              checked={server.addonIds.has(addon.id)}
              onChange={(v) => toggleAddon(addon.id, v)}
            />
            <span className="text-sm font-medium text-white">
              {addon.label}{' '}
              <span className="text-white/30">+{formatAmount(addon.monthlyPrice)} €</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CostPanel({
  servers,
  total,
  periods,
  period,
  onPeriodChange,
  onRemove,
}: {
  servers: Server[];
  total: string | null;
  periods: { id: BillingPeriod; label: string; months: number }[];
  period: BillingPeriod;
  onPeriodChange: (p: BillingPeriod) => void;
  onRemove: (id: number) => void;
}) {
  const periodLabel = periods.find((p) => p.id === period)?.label ?? '';
  const { isLoggedIn, openLogIn } = useAuthModal();

  return (
    <div className="flex flex-col gap-5">
      {/* Cost card */}
      <div className="rounded-[15px] bg-white/[0.04] p-6 md:p-[30px]">
        <p className="mb-3 text-base font-medium text-white/50">Total cost with VAT</p>

        <div className="mb-5 flex h-10 items-center rounded-[8px] bg-[#0F0F0F] p-1">
          {periods.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPeriodChange(p.id)}
              className={cn(
                'flex h-8 flex-1 items-center justify-center rounded-[5px] text-sm font-normal transition-colors',
                period === p.id ? 'bg-white/[0.06] text-white' : 'text-white/50 hover:text-white/80'
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <p className="mb-5 text-[28px] leading-[34px] font-semibold text-white">
          {total ? `${formatAmount(total)} €` : '—'}{' '}
          <span className="text-base font-normal text-white/70">{periodLabel}</span>
        </p>

        {isLoggedIn ? (
          <Button className="w-full" size="lg" render={<Link href="/workspace/balance" />}>
            Proceed to Payment
          </Button>
        ) : (
          <Button className="w-full" size="lg" onClick={openLogIn}>
            Proceed to Payment
          </Button>
        )}
      </div>

      {/* Servers list */}
      <div className="rounded-[15px] bg-white/[0.04] p-6 md:p-[30px]">
        <p className="mb-3 text-base font-medium text-white/50">Cloud Servers</p>
        <div className="flex flex-col gap-2">
          {servers.map((s, i) => (
            <div
              key={s.id}
              className="flex h-[50px] items-center justify-between rounded-[8px] bg-[#0F0F0F] pr-2.5 pl-4"
            >
              <span className="text-base font-medium text-white">Cloud Server #{i + 1}</span>
              <button type="button" onClick={() => onRemove(s.id)}>
                <Image src="/icons/cross.svg" alt="Remove server" width={30} height={30} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

const emptyServer = (id: number): Server => ({
  id,
  osId: '',
  regionId: '',
  planId: null,
  addonIds: new Set(),
});

export function CloudServerBuilder() {
  const nextId = useRef(2);

  const { operatingSystems } = useDeployableOperatingSystems();
  const { regions } = useDeployableRegions();
  const { tariffs, addons, billingPeriods } = usePricing();

  const sortedRegions = useMemo(
    () => [...regions].sort((a, b) => a.city.localeCompare(b.city)),
    [regions]
  );

  const [servers, setServers] = useState<Server[]>([emptyServer(1)]);
  const [period, setPeriod] = useState<BillingPeriod>('MONTHLY');

  // Every selection has to be resolved (not just the ones the user touched) before the
  // API will price the basket, so apply the same first-option fallback the cards render.
  const quoteItems = useMemo<QuoteItem[]>(
    () =>
      servers
        .map((server) => ({
          operatingSystemId: server.osId || operatingSystems[0]?.id || '',
          regionId: server.regionId || sortedRegions[0]?.id || '',
          planId: server.planId ?? '',
          billingPeriod: period,
          addonIds: [...server.addonIds],
          quantity: 1,
        }))
        .filter((item) => item.operatingSystemId && item.regionId && item.planId),
    [servers, operatingSystems, sortedRegions, period]
  );

  const { total } = useQuoteTotals(quoteItems);

  function addServer() {
    setServers((prev) => [...prev, emptyServer(nextId.current++)]);
  }

  function removeServer(id: number) {
    setServers((prev) => prev.filter((s) => s.id !== id));
  }

  function updateServer(updated: Server) {
    setServers((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  }

  return (
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <h2 className="mb-8 text-center text-4xl font-bold md:text-5xl">Build Your Perfect Server</h2>

      <div className="grid grid-cols-1 gap-[60px] lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-5">
        {/* Left – server cards */}
        <div className="flex flex-col gap-5">
          {servers.map((s, i) => (
            <ServerCard
              key={s.id}
              server={s}
              index={i}
              operatingSystems={operatingSystems}
              regions={sortedRegions}
              tariffs={tariffs}
              addons={addons}
              onUpdate={updateServer}
              onRemove={() => removeServer(s.id)}
              canRemove={servers.length > 1}
            />
          ))}

          <button
            type="button"
            onClick={addServer}
            className="relative flex h-[60px] w-full items-center justify-center gap-[10px] rounded-[10px] bg-white/[0.04] text-base font-medium text-white/50 transition-colors hover:bg-white/[0.07]"
          >
            <svg
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'visible',
                pointerEvents: 'none',
              }}
            >
              <rect
                x="0.5"
                y="0.5"
                width="calc(100% - 1px)"
                height="calc(100% - 1px)"
                rx="9.5"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="8 8"
              />
            </svg>
            <CirclePlus className="size-4" strokeWidth={1} />
            Add Cloud Server
          </button>
        </div>

        {/* Right – cost panel */}
        <div className="self-start md:top-6">
          <CostPanel
            servers={servers}
            total={total}
            periods={billingPeriods}
            period={period}
            onPeriodChange={setPeriod}
            onRemove={removeServer}
          />
        </div>
      </div>
    </section>
  );
}
