'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CirclePlus, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TariffTable, type TariffRow } from './TariffTable';

// ── Static data ──────────────────────────────────────────────────────────────

const osList = [
  'Ubuntu 24.04',
  'Ubuntu 24.04',
  'Ubuntu 24.04',
  'Ubuntu 24.04',
  'Ubuntu 24.04',
];

const regions = [
  { city: 'Chicago', code: 'us' },
  { city: 'New York', code: 'us' },
  { city: 'London', code: 'gb' },
  { city: 'Frankfurt', code: 'de' },
  { city: 'Amsterdam', code: 'nl' },
  { city: 'Tokyo', code: 'jp' },
  { city: 'Singapore', code: 'sg' },
];

const tariffs: TariffRow[] = [
  { id: 1, cpu: '1 × 3.3 GHz', ram: '1 GB', nvme: '15 GB', channel: '1 Gbit / Sec', costPerMonth: 50 },
  { id: 2, cpu: '1 × 3.3 GHz', ram: '2 GB', nvme: '30 GB', channel: '1 Gbit / Sec', costPerMonth: 80 },
  { id: 3, cpu: '2 × 3.3 GHz', ram: '4 GB', nvme: '60 GB', channel: '1 Gbit / Sec', costPerMonth: 140 },
  { id: 4, cpu: '2 × 3.3 GHz', ram: '8 GB', nvme: '120 GB', channel: '1 Gbit / Sec', costPerMonth: 220 },
  { id: 5, cpu: '4 × 3.3 GHz', ram: '16 GB', nvme: '240 GB', channel: '1 Gbit / Sec', costPerMonth: 380 },
  { id: 6, cpu: '8 × 3.3 GHz', ram: '32 GB', nvme: '480 GB', channel: '1 Gbit / Sec', costPerMonth: 650 },
];

const addons = [
  { id: 'service1', name: 'Name of Service', price: 10 },
  { id: 'service2', name: 'Name of Service', price: 10 },
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface Server {
  id: number;
  os: string;
  region: string;
  selectedTariffId: number | null;
  enabledAddons: Set<string>;
}

type Period = 'Day' | 'Month' | 'Year';

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
        <span className="flex items-center gap-2">
          {renderValue ? renderValue(value) : value}
        </span>
        <ChevronDown
          strokeWidth={1.5}
          className={cn('size-4 shrink-0 text-white/30 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-20 mt-1 max-h-[220px] overflow-y-auto rounded-[8px] bg-[#0F0F0F]">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={cn(
                'flex w-full items-center gap-2 border border-white/10 px-3 py-2.5 text-base text-white transition-colors hover:bg-white/[0.06]',
                opt === value && 'bg-white/[0.06]',
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

function FlagImage({ code, city }: { code: string; city: string }) {
  return (
    <span className="relative inline-block h-4 w-6 overflow-hidden rounded-[2px]">
      <Image src={`/flags/${code}.svg`} alt={city} fill className="object-cover" />
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
        checked ? 'bg-[#434CF7]' : 'bg-white/[0.06]',
      )}
    >
      <span
        className={cn(
          'absolute top-1 h-[18px] w-[18px] rounded-full bg-white transition-[left] duration-150',
          checked ? 'left-[22px]' : 'left-1',
        )}
      />
    </button>
  );
}

function ServerCard({
  server,
  index,
  onUpdate,
  onRemove,
  canRemove,
}: {
  server: Server;
  index: number;
  onUpdate: (s: Server) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const regionCities = regions.map((r) => r.city);

  function regionCode(city: string) {
    return regions.find((r) => r.city === city)?.code ?? 'us';
  }

  function toggleAddon(id: string, enabled: boolean) {
    const next = new Set(server.enabledAddons);
    enabled ? next.add(id) : next.delete(id);
    onUpdate({ ...server, enabledAddons: next });
  }

  return (
    <div className="rounded-[15px] bg-white/[0.04] p-6 md:p-[30px]">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-2xl font-bold text-white">Cloud Server #{index + 1}</span>
        <button type="button" onClick={onRemove} className="group">
          <Image src="/icons/inactive-bin.svg" alt="Remove server" width={30} height={30} className="block group-hover:hidden" />
          <Image src="/icons/active-bin.svg" alt="Remove server" width={30} height={30} className="hidden group-hover:block" />
        </button>
      </div>

      {/* OS + Region */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2.5 text-base font-medium text-white/50">Operation System</p>
          <Dropdown
            value={server.os}
            options={osList}
            onChange={(os) => onUpdate({ ...server, os })}
          />
        </div>
        <div>
          <p className="mb-2.5 text-base font-medium text-white/50">Region</p>
          <Dropdown
            value={server.region}
            options={regionCities}
            onChange={(region) => onUpdate({ ...server, region })}
            renderOption={(city) => (
              <>
                <FlagImage code={regionCode(city)} city={city} />
                {city}
              </>
            )}
            renderValue={(city) => (
              <>
                <FlagImage code={regionCode(city)} city={city} />
                {city}
              </>
            )}
          />
        </div>
      </div>

      {/* Tariff table */}
      <div className="mt-4 md:mt-5">
        <p className="mb-2.5 text-base font-medium text-white/50">Tariff</p>
        <TariffTable
          data={tariffs}
          selectedId={server.selectedTariffId}
          onSelect={(id) => onUpdate({ ...server, selectedTariffId: id })}
        />
      </div>

      {/* Addons */}
      <div className="mt-4 flex flex-col gap-4">
        {addons.map((addon) => (
          <div key={addon.id} className="flex items-center gap-3">
            <Toggle
              checked={server.enabledAddons.has(addon.id)}
              onChange={(v) => toggleAddon(addon.id, v)}
            />
            <span className="text-sm font-medium text-white">
              {addon.name}{' '}
              <span className="text-white/30">+{addon.price} €</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CostPanel({
  servers,
  onRemove,
}: {
  servers: Server[];
  onRemove: (id: number) => void;
}) {
  const [period, setPeriod] = useState<Period>('Day');

  const totalPerMonth = servers.reduce((sum, s) => {
    const tariff = tariffs.find((t) => t.id === s.selectedTariffId);
    const addonSum = addons
      .filter((a) => s.enabledAddons.has(a.id))
      .reduce((acc, a) => acc + a.price, 0);
    return sum + (tariff?.costPerMonth ?? 0) + addonSum;
  }, 0);

  const displayCost =
    period === 'Day'
      ? (totalPerMonth / 30).toFixed(2)
      : period === 'Month'
        ? totalPerMonth.toFixed(2)
        : (totalPerMonth * 12).toFixed(2);

  const periodLabel = { Day: 'per day', Month: 'per month', Year: 'per year' }[period];

  return (
    <div className="flex flex-col gap-5">
      {/* Cost card */}
      <div className="rounded-[15px] bg-white/[0.04] p-6 md:p-[30px]">
        <p className="mb-3 text-base font-medium text-white/50">Total cost with VAT</p>

        <div className="mb-5 flex h-10 items-center rounded-[8px] bg-[#0F0F0F] p-1">
          {(['Day', 'Month', 'Year'] as Period[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={cn(
                'flex h-8 flex-1 items-center justify-center rounded-[5px] text-sm font-normal transition-colors',
                period === p ? 'bg-white/[0.06] text-white' : 'text-white/50 hover:text-white/80',
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <p className="mb-5 text-[28px] font-semibold leading-[34px] text-white">
          {displayCost} €{' '}
          <span className="text-base font-normal text-white/70">{periodLabel}</span>
        </p>

        <Button className="w-full" size="lg">
          Proceed to Payment
        </Button>
      </div>

      {/* Servers list */}
      <div className="rounded-[15px] bg-white/[0.04] p-6 md:p-[30px]">
        <p className="mb-3 text-base font-medium text-white/50">Cloud Servers</p>
        <div className="flex flex-col gap-2">
          {servers.map((s, i) => (
            <div
              key={s.id}
              className="flex h-[50px] items-center justify-between rounded-[8px] bg-[#0F0F0F] pl-4 pr-2.5"
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

export function CloudServerBuilder() {
  const nextId = useRef(2);

  const [servers, setServers] = useState<Server[]>([
    { id: 1, os: 'Ubuntu 24.04', region: 'Chicago', selectedTariffId: null, enabledAddons: new Set() },
  ]);

  function addServer() {
    const id = nextId.current++;
    setServers((prev) => [
      ...prev,
      { id, os: 'Ubuntu 24.04', region: 'Chicago', selectedTariffId: null, enabledAddons: new Set() },
    ]);
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

      <div className="grid grid-cols-1 gap-[60px] lg:gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Left – server cards */}
        <div className="flex flex-col gap-5">
          {servers.map((s, i) => (
            <ServerCard
              key={s.id}
              server={s}
              index={i}
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
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}
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
          <CostPanel servers={servers} onRemove={removeServer} />
        </div>
      </div>
    </section>
  );
}
