import { useQuery } from '@tanstack/react-query';

import { catalogKeys } from '@/api/catalog/keys';
import type {
  OperatingSystem,
  OperatingSystemListResponse,
  Region,
  RegionListResponse,
} from '@/api/catalog/types';
import { apiClient, unwrap } from '@/api/client';

const CATALOG_STALE_TIME = 60 * 60 * 1000;

export function useRegions() {
  return useQuery({
    queryKey: catalogKeys.regions(),
    queryFn: async (): Promise<RegionListResponse> =>
      unwrap(await apiClient.GET('/api/public/regions')),
    staleTime: CATALOG_STALE_TIME,
  });
}

export function usePublicRegions() {
  const { data, isPending, isError } = useRegions();

  return {
    regions: data?.items.filter((region) => region.publicVisible) ?? EMPTY_REGIONS,
    isPending,
    isError,
  };
}

export function useDeployableRegions() {
  const { data, isPending, isError } = useRegions();

  return {
    regions:
      data?.items.filter((region) => region.publicVisible && region.available) ?? EMPTY_REGIONS,
    isPending,
    isError,
  };
}

export function useOperatingSystems() {
  return useQuery({
    queryKey: catalogKeys.operatingSystems(),
    queryFn: async (): Promise<OperatingSystemListResponse> =>
      unwrap(await apiClient.GET('/api/public/operating-systems')),
    staleTime: CATALOG_STALE_TIME,
  });
}

export function useDeployableOperatingSystems() {
  const { data, isPending, isError } = useOperatingSystems();

  return {
    operatingSystems: data?.items.filter((os) => os.deployable) ?? EMPTY_OPERATING_SYSTEMS,
    isPending,
    isError,
  };
}

const EMPTY_REGIONS: Region[] = [];
const EMPTY_OPERATING_SYSTEMS: OperatingSystem[] = [];
