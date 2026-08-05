import { useQuery } from '@tanstack/react-query';

import { catalogKeys } from '@/api/catalog/keys';
import type {
  OperatingSystem,
  OperatingSystemListResponse,
  Region,
  RegionListResponse,
} from '@/api/catalog/types';
import { apiClient, unwrap } from '@/api/client';

/**
 * The catalog is provider inventory, not user data: it changes when a region or image is
 * added, which is rare. An hour keeps marketing pages from re-fetching 33 regions on
 * every navigation while still picking up changes within a session.
 */
const CATALOG_STALE_TIME = 60 * 60 * 1000;

/**
 * GET /api/public/regions — every data-center location, public or not. Unauthenticated.
 * Two flags narrow it: `publicVisible` gates marketing listings, `available` gates
 * whether a server can actually be deployed there. Prefer the wrappers below over
 * filtering at the call site.
 */
export function useRegions() {
  return useQuery({
    queryKey: catalogKeys.regions(),
    queryFn: async (): Promise<RegionListResponse> =>
      unwrap(await apiClient.GET('/api/public/regions')),
    staleTime: CATALOG_STALE_TIME,
  });
}

/** Regions the marketing pages may list — includes ones not currently deployable. */
export function usePublicRegions() {
  const { data, isPending, isError } = useRegions();

  return {
    regions: data?.items.filter((region) => region.publicVisible) ?? EMPTY_REGIONS,
    isPending,
    isError,
  };
}

/** Regions a server can be deployed to — what the builders should offer. */
export function useDeployableRegions() {
  const { data, isPending, isError } = useRegions();

  return {
    regions:
      data?.items.filter((region) => region.publicVisible && region.available) ?? EMPTY_REGIONS,
    isPending,
    isError,
  };
}

/**
 * GET /api/public/operating-systems — every image the provider exposes. Unauthenticated.
 * The list mixes real OS images with non-OS entries (`iso`, `snapshot`, `backup`,
 * `application`, `marketplace_app`), so pickers should filter by family.
 */
export function useOperatingSystems() {
  return useQuery({
    queryKey: catalogKeys.operatingSystems(),
    queryFn: async (): Promise<OperatingSystemListResponse> =>
      unwrap(await apiClient.GET('/api/public/operating-systems')),
    staleTime: CATALOG_STALE_TIME,
  });
}

/** Images that can actually be installed on a new server. */
export function useDeployableOperatingSystems() {
  const { data, isPending, isError } = useOperatingSystems();

  return {
    operatingSystems: data?.items.filter((os) => os.deployable) ?? EMPTY_OPERATING_SYSTEMS,
    isPending,
    isError,
  };
}

/** Stable identities so a pending render doesn't hand consumers a fresh array each time. */
const EMPTY_REGIONS: Region[] = [];
const EMPTY_OPERATING_SYSTEMS: OperatingSystem[] = [];
