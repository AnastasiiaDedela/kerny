import type { Region } from '@/api/catalog';

const SHIPPED_FLAGS = new Set([
  'au',
  'br',
  'ca',
  'cl',
  'de',
  'es',
  'fr',
  'gb',
  'il',
  'in',
  'it',
  'jp',
  'kr',
  'mx',
  'nl',
  'pl',
  'se',
  'sg',
  'us',
  'za',
]);

const CONTINENT_ORDER = ['North America', 'Europe', 'Asia', 'Australia', 'South America', 'Africa'];

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

type RegionLike = Pick<Region, 'country' | 'countryCode' | 'flagUrl'>;

export function regionCountry(region: RegionLike): string {
  const code = region.countryCode ?? region.country;
  if (!code) return region.country;

  return countryNames.of(code) ?? code;
}

export function regionFlagSrc(region: RegionLike): string | null {
  if (region.flagUrl) return region.flagUrl;

  const code = (region.countryCode ?? region.country).toLowerCase();
  return SHIPPED_FLAGS.has(code) ? `/flags/${code}.svg` : null;
}

export function continentsOf(regions: Region[]): string[] {
  const present = new Set(regions.map((region) => region.continent));

  const known = CONTINENT_ORDER.filter((continent) => present.has(continent));
  const extra = [...present].filter((continent) => !CONTINENT_ORDER.includes(continent)).sort();

  return [...known, ...extra];
}

export function regionsIn(regions: Region[], continent: string): Region[] {
  return regions
    .filter((region) => region.continent === continent)
    .sort((a, b) => a.city.localeCompare(b.city));
}
