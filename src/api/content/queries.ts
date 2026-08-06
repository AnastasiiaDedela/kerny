import { useQuery } from '@tanstack/react-query';

import { apiClient, unwrap } from '@/api/client';
import { contentKeys } from '@/api/content/keys';
import type {
  ContactInfoResponse,
  FaqItem,
  FaqListResponse,
  LegalDocumentResponse,
  LegalListResponse,
  LegalSummary,
} from '@/api/content/types';

const CONTENT_STALE_TIME = 60 * 60 * 1000;

export function useFaq() {
  return useQuery({
    queryKey: contentKeys.faq(),
    queryFn: async (): Promise<FaqListResponse> => unwrap(await apiClient.GET('/api/public/faq')),
    staleTime: CONTENT_STALE_TIME,
  });
}

export function useFaqItems() {
  const { data, isPending, isError } = useFaq();

  return {
    items: data ? [...data.items].sort((a, b) => a.sortOrder - b.sortOrder) : EMPTY_FAQ,
    isPending,
    isError,
  };
}

export function useLegalDocuments() {
  return useQuery({
    queryKey: contentKeys.legal(),
    queryFn: async (): Promise<LegalListResponse> =>
      unwrap(await apiClient.GET('/api/public/legal')),
    staleTime: CONTENT_STALE_TIME,
  });
}

export function useLegalSummaries() {
  const { data, isPending, isError } = useLegalDocuments();

  return {
    documents: data ? [...data.items].sort((a, b) => a.title.localeCompare(b.title)) : EMPTY_LEGAL,
    isPending,
    isError,
  };
}

export function useLegalDocument(slug: string | undefined) {
  return useQuery({
    queryKey: contentKeys.legalDocument(slug ?? ''),
    queryFn: async (): Promise<LegalDocumentResponse> =>
      unwrap(
        await apiClient.GET('/api/public/legal/{slug}', { params: { path: { slug: slug! } } })
      ),
    enabled: Boolean(slug),
    staleTime: CONTENT_STALE_TIME,
  });
}

const COOKIE_POLICY_SLUG = 'cookie-policy';

export function useCookiePolicy() {
  const { documents, isPending, isError } = useLegalSummaries();

  return {
    policy: documents.find((document) => document.slug === COOKIE_POLICY_SLUG) ?? null,
    isPending,
    isError,
  };
}

export function useContactInfo() {
  return useQuery({
    queryKey: contentKeys.contactInfo(),
    queryFn: async (): Promise<ContactInfoResponse> =>
      unwrap(await apiClient.GET('/api/public/contact-info')),
    staleTime: CONTENT_STALE_TIME,
  });
}

export function useContactDetails() {
  const { data, isPending, isError } = useContactInfo();

  return {
    contactInfo: data?.contactInfo ?? null,
    isPending,
    isError,
  };
}

const EMPTY_FAQ: FaqItem[] = [];
const EMPTY_LEGAL: LegalSummary[] = [];
