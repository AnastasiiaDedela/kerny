'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { usePublicRegions, type Region } from '@/api/catalog';
import { regionCountry, regionFlagSrc, regionsIn } from '@/lib/catalog';
import { Reveal } from '@/components/common/Reveal';

const PREVIEW_COUNT = 5;

const STAGGER_MS = 60;
const STAGGER_CAP = 6;

function RegionCard({ region, index = 0 }: { region: Region; index?: number }) {
  const country = regionCountry(region);
  const flag = regionFlagSrc(region);

  return (
    <Reveal direction="up" delay={Math.min(index, STAGGER_CAP) * STAGGER_MS}>
      <div className="flex h-[78px] items-center justify-between gap-3 rounded-[15px] bg-gradient-to-b from-white/[0] to-white/[0.08] px-5">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="truncate text-sm font-semibold">{region.city}</div>
          <div className="text-muted-foreground truncate text-xs">{country}</div>
        </div>
        <span className="relative h-[24px] w-9 shrink-0 overflow-hidden rounded-[4px] ring-1 ring-white/10">
          {flag && <Image src={flag} alt={country} fill sizes="36px" className="object-cover" />}
        </span>
      </div>
    </Reveal>
  );
}

function GroupHeader({ title, showMore }: { title: string; showMore?: boolean }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-2xl leading-none font-bold">{title}</h3>
      {showMore && (
        <Link
          href="/data-centers"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs underline underline-offset-4 transition-colors"
        >
          Show More <ArrowRight className="size-3 no-underline" />
        </Link>
      )}
    </div>
  );
}

export function DataCenterRegions() {
  const { regions } = usePublicRegions();

  const northAmerica = regionsIn(regions, 'North America').slice(0, PREVIEW_COUNT);
  const europe = regionsIn(regions, 'Europe').slice(0, PREVIEW_COUNT);
  const asia = regionsIn(regions, 'Asia').slice(0, PREVIEW_COUNT);
  const australia = regionsIn(regions, 'Australia');
  const southAmerica = regionsIn(regions, 'South America');
  const africa = regionsIn(regions, 'Africa');

  return (
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <h2 className="text-left text-3xl font-extrabold tracking-tight md:text-center md:text-4xl">
        {regions.length > 0 && `${regions.length} `}Cloud Data Center Regions
      </h2>

      <div className="mt-12 space-y-8">
        <div>
          <GroupHeader title="North America" showMore />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {northAmerica.map((r, i) => (
              <RegionCard key={r.id} region={r} index={i} />
            ))}
          </div>
        </div>

        <div>
          <GroupHeader title="Europe" showMore />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {europe.map((r, i) => (
              <RegionCard key={r.id} region={r} index={i} />
            ))}
          </div>
        </div>

        <div>
          <GroupHeader title="Asia" showMore />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {asia.map((r, i) => (
              <RegionCard key={r.id} region={r} index={i} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          <div className="lg:col-span-2">
            <GroupHeader title="Australia" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {australia.map((r, i) => (
                <RegionCard key={r.id} region={r} index={i} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <GroupHeader title="South America" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {southAmerica.map((r, i) => (
                <RegionCard key={r.id} region={r} index={i} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <GroupHeader title="Africa" />
            <div className="grid grid-cols-1 gap-4">
              {africa.map((r, i) => (
                <RegionCard key={r.id} region={r} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
