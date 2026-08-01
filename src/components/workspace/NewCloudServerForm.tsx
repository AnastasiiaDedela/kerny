'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TariffTable, type TariffRow } from '@/components/pricing/TariffTable';

const osOptions = [
  { label: 'Alma Linux', icon: '/images/systems-img/alma.png' },
  { label: 'Alpine Linux', icon: '/images/systems-img/alpine.png' },
  { label: 'Arch Linux', icon: '/images/systems-img/arch.png' },
  { label: 'CentOS', icon: '/images/systems-img/centos.png' },
  { label: 'Debian', icon: '/images/systems-img/debian.png' },
  { label: 'Fedora', icon: '/images/systems-img/fedora.png' },
  { label: 'Fedora CoreOS', icon: '/images/systems-img/fedora-coreos.png' },
  { label: 'FreeBSD', icon: '/images/systems-img/freebsd.png' },
  { label: 'OpenBSD', icon: '/images/systems-img/openbsd.png' },
  { label: 'Flatcar Container Linux', icon: '/images/systems-img/flatcar.png' },
  { label: 'Rocky Linux', icon: '/images/systems-img/rocky.png' },
  { label: 'Windows', icon: '/images/systems-img/windows.png' },
  { label: 'openSUSE leap', icon: '/images/systems-img/opensuse.png' },
  { label: 'Ubuntu', icon: '/images/systems-img/ubuntu.png' },
  { label: 'Windows Core', icon: '/images/systems-img/powershell.png' },
];

const continents = ['North America', 'Europe', 'Asia', 'Australia', 'South America', 'Africa'];

const regionCards = [
  { id: 1, ping: '#FAB500' },
  { id: 2, ping: '#00F700' },
  { id: 3, ping: '#E6132B' },
  { id: 4, ping: '#FAB500' },
  { id: 5, ping: '#FAB500' },
  { id: 6, ping: '#FAB500' },
  { id: 7, ping: '#FAB500' },
  { id: 8, ping: '#00F700' },
  { id: 9, ping: '#FAB500' },
  { id: 10, ping: '#FAB500' },
  { id: 11, ping: '#FAB500' },
  { id: 12, ping: '#FAB500' },
];

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

function FlagNL() {
  return (
    <span className="relative mb-2 block h-5 w-[30px] overflow-hidden rounded-[5px]">
      <Image src="/flags/nl.svg" alt="Netherlands" fill className="object-cover" />
    </span>
  );
}

function RegionCard({
  ping,
  selected,
  onClick,
}: {
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
      <FlagNL />
      <p className="text-sm leading-[17px] font-semibold text-white">Amsterdam</p>
      <p className="text-[10px] leading-3 text-white/50">Netherlands</p>
    </button>
  );
}

function CostSummary({
  os,
  tariff,
  period,
  onPeriodChange,
}: {
  os: string;
  tariff: TariffRow | undefined;
  period: Period;
  onPeriodChange: (p: Period) => void;
}) {
  const rows: [string, string][] = [
    ['OS', os],
    ['Region', 'Amsterdam'],
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
  const [selectedOs, setSelectedOs] = useState('Arch Linux');
  const [selectedContinent, setSelectedContinent] = useState('Europe');
  const [selectedRegionId, setSelectedRegionId] = useState(5);
  const [selectedTariffId, setSelectedTariffId] = useState<number | null>(2);
  const [period, setPeriod] = useState<Period>('Hour');
  const [hostName, setHostName] = useState('');
  const [serverName, setServerName] = useState('');
  const [comment, setComment] = useState('');

  const selectedTariff = tariffs.find((t) => t.id === selectedTariffId);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-[30px]">
      <div className="flex flex-col gap-10">
        {/* 01 Operation System */}
        <section>
          <SectionHeading number="01" title="Operation System" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-[10px]">
            {osOptions.map((os) => (
              <button
                key={os.label}
                type="button"
                onClick={() => setSelectedOs(os.label)}
                className={cn(
                  'flex min-h-[110px] flex-col items-center justify-center gap-3 rounded-[10px] p-4 text-center transition-colors lg:aspect-square lg:min-h-0 lg:gap-[14px]',
                  selectedOs === os.label
                    ? 'border-primary bg-primary/10 border'
                    : 'bg-white/[0.04] hover:bg-white/[0.06]'
                )}
              >
                <Image
                  src={os.icon}
                  alt=""
                  width={70}
                  height={70}
                  className="size-10 object-contain lg:size-[70px]"
                />
                <span className="text-sm leading-[17px] text-white lg:text-xs lg:leading-[15px]">
                  {os.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 02 Region */}
        <section>
          <SectionHeading number="02" title="Region" />
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex gap-2 overflow-x-auto pb-1 lg:w-40 lg:shrink-0 lg:flex-col lg:gap-2.5 lg:overflow-visible lg:pb-0">
              {continents.map((continent) => (
                <button
                  key={continent}
                  type="button"
                  onClick={() => setSelectedContinent(continent)}
                  className={cn(
                    'flex h-10 w-full min-w-[130px] shrink-0 items-center justify-center rounded-[10px] text-sm transition-colors lg:min-w-0',
                    selectedContinent === continent
                      ? 'border-primary bg-primary/10 border text-white'
                      : 'bg-white/[0.04] text-white/50 hover:text-white'
                  )}
                >
                  {continent}
                </button>
              ))}
            </div>

            <div className="grid flex-1 grid-cols-2 gap-2.5 sm:grid-cols-3">
              {regionCards.map((card) => (
                <RegionCard
                  key={card.id}
                  ping={card.ping}
                  selected={selectedRegionId === card.id}
                  onClick={() => setSelectedRegionId(card.id)}
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
        os={selectedOs}
        tariff={selectedTariff}
        period={period}
        onPeriodChange={setPeriod}
      />
    </div>
  );
}
