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

/** Editorial content changes on a CMS edit, not per session — an hour is plenty. */
const CONTENT_STALE_TIME = 60 * 60 * 1000;

/**
 * GET /api/public/faq — the marketing FAQ. Unauthenticated. The API does not promise
 * `sortOrder` ordering in the payload, so `useFaqItems()` sorts before rendering.
 */
export function useFaq() {
  return useQuery({
    queryKey: contentKeys.faq(),
    queryFn: async (): Promise<FaqListResponse> => unwrap(await apiClient.GET('/api/public/faq')),
    staleTime: CONTENT_STALE_TIME,
  });
}

/** FAQ entries in `sortOrder`, ready to render. */
export function useFaqItems() {
  const { data, isPending, isError } = useFaq();

  return {
    items: data ? [...data.items].sort((a, b) => a.sortOrder - b.sortOrder) : EMPTY_FAQ,
    isPending,
    isError,
  };
}

/**
 * GET /api/public/legal — titles, descriptions and `lastUpdated` for every policy
 * document. Metadata only; `useLegalDocument()` fetches the body.
 *
 * Nothing renders this yet: the app has no `/legal` route, so the footer's policy links
 * are still hard-coded. Wire them once a document page exists.
 */
export function useLegalDocuments() {
  return useQuery({
    queryKey: contentKeys.legal(),
    queryFn: async (): Promise<LegalListResponse> =>
      unwrap(await apiClient.GET('/api/public/legal')),
    staleTime: CONTENT_STALE_TIME,
  });
}

/** Legal documents as a plain array, alphabetical by title. */
export function useLegalSummaries() {
  const { data, isPending, isError } = useLegalDocuments();

  return {
    documents: data ? [...data.items].sort((a, b) => a.title.localeCompare(b.title)) : EMPTY_LEGAL,
    isPending,
    isError,
  };
}

/**
 * GET /api/public/legal/{slug} — one document with `bodyMarkdown` and a pre-parsed
 * `content` block list. Skipped until a slug is supplied.
 */
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

/**
 * GET /api/public/contact-info — support email, postal address, opening hours and social
 * links for the contact surfaces. `schedule` is newline-separated and meant to be
 * rendered with `whitespace-pre-line`.
 */
export function useContactInfo() {
  return useQuery({
    queryKey: contentKeys.contactInfo(),
    queryFn: async (): Promise<ContactInfoResponse> =>
      unwrap(await apiClient.GET('/api/public/contact-info')),
    staleTime: CONTENT_STALE_TIME,
  });
}

/** Convenience wrapper for the contact modal/footer, which only need the body. */
export function useContactDetails() {
  const { data, isPending, isError } = useContactInfo();

  return {
    contactInfo: data?.contactInfo ?? null,
    isPending,
    isError,
  };
}

/** Stable identities so a pending render doesn't hand consumers a fresh array each time. */
const EMPTY_FAQ: FaqItem[] = [];
const EMPTY_LEGAL: LegalSummary[] = [];
