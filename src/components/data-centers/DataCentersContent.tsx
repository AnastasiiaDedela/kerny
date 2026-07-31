'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type Region = { city: string; country: string; code: string };

const northAmerica: Region[] = [
  { city: 'Toronto', country: 'Canada', code: 'ca' },
  { city: 'Mexico City', country: 'Mexico', code: 'mx' },
  { city: 'Atlanta', country: 'Georgia', code: 'us' },
  { city: 'Honolulu', country: 'Hawaii', code: 'us' },
  { city: 'Chicago', country: 'Illinois', code: 'us' },
  { city: 'Dallas', country: 'Texas', code: 'us' },
  { city: 'Los Angeles', country: 'California', code: 'us' },
  { city: 'Miami', country: 'Florida', code: 'us' },
  { city: 'New York Area', country: 'New York', code: 'us' },
  { city: 'SF Bay Area', country: 'CA', code: 'us' },
  { city: 'Seattle', country: 'Washington', code: 'us' },
];

const southAmerica: Region[] = [
  { city: 'São Paulo', country: 'Brazil', code: 'br' },
  { city: 'Santiago', country: 'Chile', code: 'cl' },
];

const europe: Region[] = [
  { city: 'Amsterdam', country: 'Netherlands', code: 'nl' },
  { city: 'London', country: 'United Kingdom', code: 'gb' },
  { city: 'Frankfurt', country: 'Germany', code: 'de' },
  { city: 'Paris', country: 'France', code: 'fr' },
  { city: 'Madrid', country: 'Spain', code: 'es' },
  { city: 'Stockholm', country: 'Sweden', code: 'se' },
  { city: 'Warsaw', country: 'Poland', code: 'pl' },
  { city: 'Manchester', country: 'United Kingdom', code: 'gb' },
];

const asia: Region[] = [
  { city: 'Tokyo', country: 'Japan', code: 'jp' },
  { city: 'Osaka', country: 'Japan', code: 'jp' },
  { city: 'Seoul', country: 'Korea, Republic of', code: 'kr' },
  { city: 'Singapore', country: 'Singapore', code: 'sg' },
  { city: 'Mumbai', country: 'India', code: 'in' },
  { city: 'Delhi NCR', country: 'India', code: 'in' },
  { city: 'Tel Aviv-Yafo', country: 'Israel', code: 'il' },
  { city: 'Bangalore', country: 'India', code: 'in' },
];

const australia: Region[] = [
  { city: 'Sydney', country: 'Australia', code: 'au' },
  { city: 'Melbourne', country: 'Australia', code: 'au' },
];

const africa: Region[] = [{ city: 'Johannesburg', country: 'South Africa', code: 'za' }];

const allRegions = [...northAmerica, ...southAmerica, ...europe, ...asia, ...australia, ...africa];

type TabValue = 'all' | 'northAmerica' | 'europe' | 'asia' | 'australia';

const tabs: { value: TabValue; label: string; regions: Region[] }[] = [
  { value: 'all', label: 'All Regions', regions: allRegions },
  { value: 'northAmerica', label: 'North America', regions: northAmerica },
  { value: 'europe', label: 'Europe', regions: europe },
  { value: 'asia', label: 'Asia', regions: asia },
  { value: 'australia', label: 'Australia', regions: australia },
];

function RegionCard({ city, country, code }: Region) {
  return (
    <div className="flex h-[78px] items-center justify-between gap-3 rounded-[15px] bg-gradient-to-b from-white/[0] to-white/[0.08] px-5">
      <div className="flex min-w-0 flex-col gap-1">
        <div className="truncate text-sm font-semibold">{city}</div>
        <div className="text-muted-foreground truncate text-xs">{country}</div>
      </div>
      <span className="relative h-[24px] w-9 shrink-0 overflow-hidden rounded-[4px] ring-1 ring-white/10">
        <Image src={`/flags/${code}.svg`} alt={country} fill className="object-cover" />
      </span>
    </div>
  );
}

export function DataCentersContent() {
  const [activeTab, setActiveTab] = useState<TabValue>('all');

  const activeRegions = tabs.find((t) => t.value === activeTab)!.regions;

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
          <RegionCard key={`${region.city}-${region.country}`} {...region} />
        ))}
      </div>
    </section>
  );
}
