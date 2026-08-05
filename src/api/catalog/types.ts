import type { components } from '@/types/api';

/**
 * A data-center location. `country` and `countryCode` are both ISO-3166 alpha-2 codes
 * (`'NL'`), not display names — see `regionCountry()` in `@/lib/catalog` for the label.
 * `flagUrl` is currently `null` for every region, so flags fall back to `public/flags/`.
 */
export type Region = components['schemas']['Region'];
export type RegionListResponse = components['schemas']['RegionListResponse'];

/**
 * A deployable image. `name` carries the full label (`'Ubuntu 24.04 LTS x64'`), `family`
 * is the slug the icons are keyed on (`'ubuntu'`), and `version` is empty in practice.
 */
export type OperatingSystem = components['schemas']['OperatingSystem'];
export type OperatingSystemListResponse = components['schemas']['OperatingSystemListResponse'];
