import type { Region } from '@/api/catalog';

/**
 * Country codes we ship a flag for under `public/flags/`. The API returns `flagUrl: null`
 * for every region today, so the local SVG is the only source — and asking `next/image`
 * for one we don't have would 404. Keep this in sync when adding a flag.
 */
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

/** Display order for the continent filters; anything unexpected is appended, not dropped. */
const CONTINENT_ORDER = ['North America', 'Europe', 'Asia', 'Australia', 'South America', 'Africa'];

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

/**
 * `region.country` is an ISO alpha-2 code (`'NL'`), not a label, so resolve it for display.
 * Falls back to the raw code for anything `Intl` doesn't recognise.
 */
export function regionCountry(region: Region): string {
  const code = region.countryCode ?? region.country;
  if (!code) return region.country;

  return countryNames.of(code) ?? code;
}

/** The flag to render for a region, or `null` when we have no artwork for its country. */
export function regionFlagSrc(region: Region): string | null {
  if (region.flagUrl) return region.flagUrl;

  const code = (region.countryCode ?? region.country).toLowerCase();
  return SHIPPED_FLAGS.has(code) ? `/flags/${code}.svg` : null;
}

/** Unique continents present in `regions`, in the order the filters render them. */
export function continentsOf(regions: Region[]): string[] {
  const present = new Set(regions.map((region) => region.continent));

  const known = CONTINENT_ORDER.filter((continent) => present.has(continent));
  const extra = [...present].filter((continent) => !CONTINENT_ORDER.includes(continent)).sort();

  return [...known, ...extra];
}

/** Regions in one continent, alphabetically by city so the grid order is stable. */
export function regionsIn(regions: Region[], continent: string): Region[] {
  return regions
    .filter((region) => region.continent === continent)
    .sort((a, b) => a.city.localeCompare(b.city));
}
