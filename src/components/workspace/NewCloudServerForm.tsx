'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  useDeployableOperatingSystems,
  useDeployableRegions,
  type OperatingSystem,
  type Region,
} from '@/api/catalog';
import { continentsOf, regionCountry, regionFlagSrc, regionsIn } from '@/lib/catalog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TariffTable, type TariffRow } from '@/components/pricing/TariffTable';

/**
 * The picker is family-level, but the API lists one entry per image, so each card matches
 * a set of them. Only groups we ship an icon for are offered — the families left out
 * (`iso`, `snapshot`, `backup`, `application`, `marketplace_app`) aren't operating systems.
 */
const osGroups: {
  id: string;
  label: string;
  icon: string;
  match: (os: OperatingSystem) => boolean;
}[] = [
  {
    id: 'almalinux',
    label: 'Alma Linux',
    icon: '/images/systems-img/alma.png',
    match: (os) => os.family === 'almalinux',
  },
  {
    id: 'alpinelinux',
    label: 'Alpine Linux',
    icon: '/images/systems-img/alpine.png',
    match: (os) => os.family === 'alpinelinux',
  },
  {
    id: 'archlinux',
    label: 'Arch Linux',
    icon: '/images/systems-img/arch.png',
    match: (os) => os.family === 'archlinux',
  },
  {
    id: 'centos',
    label: 'CentOS',
    icon: '/images/systems-img/centos.png',
    match: (os) => os.family === 'centos',
  },
  {
    id: 'debian',
    label: 'Debian',
    icon: '/images/systems-img/debian.png',
    match: (os) => os.family === 'debian',
  },
  {
    id: 'fedora',
    label: 'Fedora',
    icon: '/images/systems-img/fedora.png',
    match: (os) => os.family === 'fedora',
  },
  {
    id: 'fedora-coreos',
    label: 'Fedora CoreOS',
    icon: '/images/systems-img/fedora-coreos.png',
    match: (os) => os.family === 'fedora-coreos',
  },
  {
    id: 'freebsd',
    label: 'FreeBSD',
    icon: '/images/systems-img/freebsd.png',
    match: (os) => os.family === 'freebsd',
  },
  {
    id: 'openbsd',
    label: 'OpenBSD',
    icon: '/images/systems-img/openbsd.png',
    match: (os) => os.family === 'openbsd',
  },
  {
    id: 'flatcar',
    label: 'Flatcar Container Linux',
    icon: '/images/systems-img/flatcar.png',
    match: (os) => os.family === 'flatcar',
  },
  {
    id: 'rockylinux',
    label: 'Rocky Linux',
    icon: '/images/systems-img/rocky.png',
    match: (os) => os.family === 'rockylinux',
  },
  {
    // Windows Core ships as its own card, so the plain Windows one must exclude it.
    id: 'windows',
    label: 'Windows',
    icon: '/images/systems-img/windows.png',
    match: (os) => os.family === 'windows' && !os.name.startsWith('Windows Core'),
  },
  {
    id: 'opensuse',
    label: 'openSUSE leap',
    icon: '/images/systems-img/opensuse.png',
    match: (os) => os.family === 'opensuse',
  },
  {
    id: 'ubuntu',
    label: 'Ubuntu',
    icon: '/images/systems-img/ubuntu.png',
    match: (os) => os.family === 'ubuntu',
  },
  {
    id: 'windows-core',
    label: 'Windows Core',
    icon: '/images/systems-img/powershell.png',
    match: (os) => os.name.startsWith('Windows Core'),
  },
];

/**
 * Placeholder latency indicators. The catalog has no latency field, so these stay mocked
 * and are cycled across whatever regions the API returns.
 */
const pingColors = ['#FAB500', '#00F700', '#E6132B'];

const tariffs: TariffRow[] = [
  {
    id: 1,
    cpu: '1 × 3.3 GGz',
    ram: '1 GB',
    nvme: '15 GB',
    channel: '1 Gbit / Sec',
    costPerMonth: 50,
  },
  {
    id: 2,
    cpu: '1 × 3.3 GGz',
    ram: '2 GB',
    nvme: '30 GB',
    channel: '1 Gbit / Sec',
    costPerMonth: 50,
  },
  {
    id: 3,
    cpu: '1 × 3.3 GGz',
    ram: '1 GB',
    nvme: '15 GB',
    channel: '1 Gbit / Sec',
    costPerMonth: 50,
  },
  {
    id: 4,
    cpu: '1 × 3.3 GGz',
    ram: '1 GB',
    nvme: '15 GB',
    channel: '1 Gbit / Sec',
    costPerMonth: 50,
  },
  {
    id: 5,
    cpu: '1 × 3.3 GGz',
    ram: '1 GB',
    nvme: '15 GB',
    channel: '1 Gbit / Sec',
    costPerMonth: 50,
  },
  {
    id: 6,
    cpu: '1 × 3.3 GGz',
    ram: '1 GB',
    nvme: '15 GB',
    channel: '1 Gbit / Sec',
    costPerMonth: 50,
  },
];

const fieldClass =
  'h-[46px] w-full rounded-[8px] bg-white/[0.04] px-5 py-[13px] text-sm leading-[17px] font-normal text-white outline-none placeholder:text-white/50';

type Period = 'Hour' | 'Day' | 'Month';

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-4">
      <p className="text-lg leading-[22px] font-semibold">
        <span className="text-white/50">{number}</span> <span className="text-white">{title}</span>
      </p>
      <div className="mt-4 border-t-[0.5px] border-white/20" />
    </div>
  );
}

function Flag({ region }: { region: Region }) {
  const src = regionFlagSrc(region);

  return (
    <span className="relative mb-2 block h-5 w-[30px] overflow-hidden rounded-[5px]">
      {src && <Image src={src} alt={regionCountry(region)} fill className="object-cover" />}
    </span>
  );
}

function RegionCard({
  region,
  ping,
  selected,
  onClick,
}: {
  region: Region;
  ping: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative flex h-[100px] flex-col justify-end rounded-[10px] p-4 text-left transition-colors',
        selected ? 'border-primary bg-primary/10 border' : 'bg-white/[0.04] hover:bg-white/[0.06]'
      )}
    >
      <span className="absolute top-3 right-4 flex items-center gap-1 rounded-[5px] bg-white/[0.06] px-2.5 py-1">
        <span className="size-1 rounded-full" style={{ backgroundColor: ping }} />
        <span className="text-[10px] leading-3 text-white">165 mss</span>
      </span>
      <Flag region={region} />
      <p className="text-sm leading-[17px] font-semibold text-white">{region.city}</p>
      <p className="text-[10px] leading-3 text-white/50">{regionCountry(region)}</p>
    </button>
  );
}

function CostSummary({
  os,
  region,
  tariff,
  period,
  onPeriodChange,
}: {
  os: string;
  region: string;
  tariff: TariffRow | undefined;
  period: Period;
  onPeriodChange: (p: Period) => void;
}) {
  const rows: [string, string][] = [
    ['OS', os || '—'],
    ['Region', region || '—'],
    ['CPU', tariff?.cpu ?? '—'],
    ['RAM', tariff?.ram ?? '—'],
    ['NVM', tariff?.nvme ?? '—'],
    ['Network Channel', tariff?.channel ?? '—'],
    ['Configuration', '666 € / hour'],
    ['Backups', '666 € / hour'],
    ['Public IP', '666 € / hour'],
    ['Server Number', '1'],
  ];

  return (
    <div className="rounded-[10px] bg-white/[0.04] p-6 lg:w-80">
      <p className="text-xl leading-6 font-semibold text-white">Cost</p>

      <div className="mt-3 flex h-10 items-center rounded-[8px] bg-[#0F0F0F] p-1">
        {(['Hour', 'Day', 'Month'] as Period[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPeriodChange(p)}
            className={cn(
              'flex h-8 flex-1 items-center justify-center rounded-[5px] text-sm transition-colors',
              period === p ? 'bg-white/[0.06] text-white' : 'text-white/50 hover:text-white/80'
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <span className="text-sm leading-[17px] text-white/50">{label}</span>
            <span className="text-sm leading-[17px] font-medium text-white">{value}</span>
          </div>
        ))}

        <div className="flex items-center justify-between gap-4">
          <span className="text-base leading-[19px] font-medium text-white">Total Price</span>
          <span className="text-base leading-[19px] font-medium text-white">999 999 €</span>
        </div>
      </div>

      <Button className="mt-4 h-[46px] w-full text-sm">Proceed to Payment</Button>
    </div>
  );
}

export function NewCloudServerForm() {
  const { operatingSystems } = useDeployableOperatingSystems();
  const { regions } = useDeployableRegions();

  const [selectedOsId, setSelectedOsId] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('Europe');
  const [selectedRegionId, setSelectedRegionId] = useState('');
  const [selectedTariffId, setSelectedTariffId] = useState<number | null>(2);
  const [period, setPeriod] = useState<Period>('Hour');
  const [hostName, setHostName] = useState('');
  const [serverName, setServerName] = useState('');
  const [comment, setComment] = useState('');

  const availableOsGroups = useMemo(
    () => osGroups.filter((group) => operatingSystems.some(group.match)),
    [operatingSystems]
  );
  const continents = useMemo(() => continentsOf(regions), [regions]);

  // Each selection falls back to the first valid option rather than clearing when the
  // catalog loads, or when switching continent leaves the chosen region out of view.
  const activeOs = availableOsGroups.find((g) => g.id === selectedOsId) ?? availableOsGroups[0];
  const activeContinent = continents.includes(selectedContinent)
    ? selectedContinent
    : (continents[0] ?? '');

  const continentRegions = useMemo(
    () => regionsIn(regions, activeContinent),
    [regions, activeContinent]
  );
  const activeRegion =
    continentRegions.find((r) => r.id === selectedRegionId) ?? continentRegions[0];

  const selectedTariff = tariffs.find((t) => t.id === selectedTariffId);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-[30px]">
      <div className="flex flex-col gap-10">
        {/* 01 Operation System */}
        <section>
          <SectionHeading number="01" title="Operation System" />
          <div className="grid grid-cols-3 items-start gap-3 min-[1300px]:grid-cols-5 min-[1300px]:gap-[10px]">
            {availableOsGroups.map((os) => (
              <button
                key={os.id}
                type="button"
                onClick={() => setSelectedOsId(os.id)}
                className={cn(
                  'flex min-h-[110px] w-full flex-col items-center justify-start gap-[13px] rounded-[10px] px-2 pt-4 pb-3 text-center transition-colors min-[1300px]:aspect-square min-[1300px]:min-h-0 min-[1300px]:justify-center min-[1300px]:gap-[14px] min-[1300px]:p-4',
                  activeOs?.id === os.id
                    ? 'border-primary bg-primary/10 border'
                    : 'bg-white/[0.04] hover:bg-white/[0.06]'
                )}
              >
                <Image
                  src={os.icon}
                  alt=""
                  width={70}
                  height={70}
                  className="size-[54px] object-contain min-[1300px]:size-[70px]"
                />
                <span
                  className={cn(
                    'text-white min-[1300px]:text-xs min-[1300px]:leading-[15px]',
                    os.label === 'Flatcar Container Linux'
                      ? 'text-[10px] leading-[12px]'
                      : 'text-xs leading-[15px]'
                  )}
                >
                  {os.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 02 Region */}
        <section>
          <SectionHeading number="02" title="Region" />
          <div className="flex flex-col gap-4 min-[1300px]:flex-row">
            <div className="grid grid-cols-3 gap-2 min-[1300px]:flex min-[1300px]:w-40 min-[1300px]:shrink-0 min-[1300px]:flex-col min-[1300px]:gap-2.5">
              {continents.map((continent) => (
                <button
                  key={continent}
                  type="button"
                  onClick={() => setSelectedContinent(continent)}
                  className={cn(
                    'flex h-10 w-full items-center justify-center rounded-[10px] text-sm transition-colors',
                    activeContinent === continent
                      ? 'border-primary bg-primary/10 border text-white'
                      : 'bg-white/[0.04] text-white/50 hover:text-white'
                  )}
                >
                  {continent}
                </button>
              ))}
            </div>

            <div className="grid flex-1 grid-cols-2 gap-2.5 min-[1090px]:grid-cols-3">
              {continentRegions.map((region, i) => (
                <RegionCard
                  key={region.id}
                  region={region}
                  ping={pingColors[i % pingColors.length]}
                  selected={activeRegion?.id === region.id}
                  onClick={() => setSelectedRegionId(region.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 03 Configuration */}
        <section>
          <SectionHeading number="03" title="Configuration" />
          <TariffTable
            data={tariffs}
            selectedId={selectedTariffId}
            onSelect={setSelectedTariffId}
            showHourly
          />
        </section>

        {/* 04 Network */}
        <section>
          <SectionHeading number="04" title="Network" />
          <div>
            <p className="mb-2.5 text-base leading-[19px] font-medium text-white">Host Name</p>
            <input
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              placeholder="Enter Host Name..."
              className={fieldClass}
            />
          </div>
        </section>

        {/* 05 Information about Server */}
        <section>
          <SectionHeading number="05" title="Information about Server" />
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-2.5 text-base leading-[19px] font-medium text-white">Server Name</p>
              <input
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="Enter Server Name..."
                className={fieldClass}
              />
            </div>
            <div>
              <p className="mb-2.5 text-base leading-[19px] font-medium text-white">Comment</p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter Comment..."
                rows={1}
                className={cn(fieldClass, 'resize-none')}
              />
            </div>
          </div>
        </section>
      </div>

      <CostSummary
        os={activeOs?.label ?? ''}
        region={activeRegion?.city ?? ''}
        tariff={selectedTariff}
        period={period}
        onPeriodChange={setPeriod}
      />
    </div>
  );
}
