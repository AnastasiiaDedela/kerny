import { useMutation } from '@tanstack/react-query';

import { apiClient, unwrap } from '@/api/client';
import type { ContactRequestResponse, CreateContactRequestDto } from '@/api/content/types';

/**
 * POST /api/public/contact-requests — the marketing "Contact Us" form. Unauthenticated,
 * and nothing else reads contact requests back, so there is no cache to invalidate.
 *
 * Validation failures come back as `fieldErrors` keyed by the DTO's field names
 * (`firstName`, `lastName`, `email`, `question`, `consent`) — render them with the
 * `fieldError` helper rather than pre-checking in the form.
 */
export function useCreateContactRequest() {
  return useMutation({
    mutationFn: async (body: CreateContactRequestDto): Promise<ContactRequestResponse> =>
      unwrap(await apiClient.POST('/api/public/contact-requests', { body })),
  });
}
