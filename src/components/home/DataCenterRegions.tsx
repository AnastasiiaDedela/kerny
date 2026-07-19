import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

type Region = { city: string; country: string; code: string };

const northAmerica: Region[] = [
  { city: 'Toronto', country: 'Canada', code: 'ca' },
  { city: 'Mexico City', country: 'Mexico', code: 'mx' },
  { city: 'Atlanta', country: 'Georgia', code: 'us' },
  { city: 'Honolulu', country: 'Hawaii', code: 'us' },
  { city: 'Chicago', country: 'Illinois', code: 'us' },
];

const europe: Region[] = [
  { city: 'Amsterdam', country: 'Netherlands', code: 'nl' },
  { city: 'London', country: 'United Kingdom', code: 'gb' },
  { city: 'Frankfurt', country: 'Germany', code: 'de' },
  { city: 'Paris', country: 'France', code: 'fr' },
  { city: 'Madrid', country: 'Spain', code: 'es' },
];

const asia: Region[] = [
  { city: 'Tokyo', country: 'Japan', code: 'jp' },
  { city: 'Osaka', country: 'Japan', code: 'jp' },
  { city: 'Seoul', country: 'Korea, Republic of', code: 'kr' },
  { city: 'Singapore', country: 'Singapore', code: 'sg' },
  { city: 'Mumbai', country: 'India', code: 'in' },
];

const australia: Region[] = [
  { city: 'Sydney', country: 'Australia', code: 'au' },
  { city: 'Melbourne', country: 'Australia', code: 'au' },
];

const southAmerica: Region[] = [
  { city: 'São Paulo', country: 'Brazil', code: 'br' },
  { city: 'Santiago', country: 'Chile', code: 'cl' },
];

const africa: Region[] = [{ city: 'Johannesburg', country: 'South Africa', code: 'za' }];

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

function GroupHeader({ title, showMore }: { title: string; showMore?: boolean }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-2xl leading-none font-bold">{title}</h3>
      {showMore && (
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs underline underline-offset-4 transition-colors"
        >
          Show More <ArrowRight className="size-3 no-underline" />
        </button>
      )}
    </div>
  );
}

export function DataCenterRegions() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <h2 className="text-left text-3xl font-extrabold tracking-tight md:text-center md:text-4xl">
        32 Cloud Data Center Regions
      </h2>

      <div className="mt-12 space-y-8">
        {/* North America */}
        <div>
          <GroupHeader title="North America" showMore />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {northAmerica.map((r) => (
              <RegionCard key={r.city} {...r} />
            ))}
          </div>
        </div>

        {/* Europe */}
        <div>
          <GroupHeader title="Europe" showMore />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {europe.map((r) => (
              <RegionCard key={r.city} {...r} />
            ))}
          </div>
        </div>

        {/* Asia */}
        <div>
          <GroupHeader title="Asia" showMore />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {asia.map((r) => (
              <RegionCard key={r.city} {...r} />
            ))}
          </div>
        </div>

        {/* Australia / South America / Africa */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-4">
          <div className="lg:col-span-2">
            <GroupHeader title="Australia" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {australia.map((r) => (
                <RegionCard key={r.city} {...r} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <GroupHeader title="South America" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {southAmerica.map((r) => (
                <RegionCard key={r.city} {...r} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <GroupHeader title="Africa" />
            <div className="grid grid-cols-1 gap-4">
              {africa.map((r) => (
                <RegionCard key={r.city} {...r} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
