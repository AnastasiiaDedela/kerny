'use client';

import Image from 'next/image';
import { useState } from 'react';

import { usePublicRegions, type Region } from '@/api/catalog';
import { regionCountry, regionFlagSrc, regionsIn } from '@/lib/catalog';
import { cn } from '@/lib/utils';

type TabValue = 'all' | 'North America' | 'Europe' | 'Asia' | 'Australia';

const tabs: { value: TabValue; label: string; continent: string | null }[] = [
  { value: 'all', label: 'All Regions', continent: null },
  { value: 'North America', label: 'North America', continent: 'North America' },
  { value: 'Europe', label: 'Europe', continent: 'Europe' },
  { value: 'Asia', label: 'Asia', continent: 'Asia' },
  { value: 'Australia', label: 'Australia', continent: 'Australia' },
];

function RegionCard({ region }: { region: Region }) {
  const country = regionCountry(region);
  const flag = regionFlagSrc(region);

  return (
    <div className="flex h-[78px] items-center justify-between gap-3 rounded-[15px] bg-gradient-to-b from-white/[0] to-white/[0.08] px-5">
      <div className="flex min-w-0 flex-col gap-1">
        <div className="truncate text-sm font-semibold">{region.city}</div>
        <div className="text-muted-foreground truncate text-xs">{country}</div>
      </div>
      <span className="relative h-[24px] w-9 shrink-0 overflow-hidden rounded-[4px] ring-1 ring-white/10">
        {flag && <Image src={flag} alt={country} fill sizes="36px" className="object-cover" />}
      </span>
    </div>
  );
}

export function DataCentersContent() {
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const { regions } = usePublicRegions();

  const continent = tabs.find((t) => t.value === activeTab)!.continent;
  const activeRegions = continent ? regionsIn(regions, continent) : regions;

  return (
    <section className="mx-auto w-full max-w-340 px-5 pt-7.5 pb-20 md:pt-0">
      <h1 className="text-left text-[32px] leading-[39px] font-bold md:text-center md:text-5xl md:leading-[58px]">
        Our Data Center Regions
      </h1>

      <div className="mt-7.5 flex flex-col gap-3 md:flex-row">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'flex h-[50px] items-center justify-center rounded-[10px] px-[18px] text-sm font-medium transition-colors md:flex-1',
              activeTab === tab.value
                ? 'border-primary bg-primary/20 border text-white'
                : 'bg-white/[0.06] text-white/50 hover:text-white'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-7.5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
        {activeRegions.map((region) => (
          <RegionCard key={region.id} region={region} />
        ))}
      </div>
    </section>
  );
}
