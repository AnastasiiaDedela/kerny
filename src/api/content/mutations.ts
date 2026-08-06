import { useMutation } from '@tanstack/react-query';

import { apiClient, unwrap } from '@/api/client';
import type { ContactRequestResponse, CreateContactRequestDto } from '@/api/content/types';

export function useCreateContactRequest() {
  return useMutation({
    mutationFn: async (body: CreateContactRequestDto): Promise<ContactRequestResponse> =>
      unwrap(await apiClient.POST('/api/public/contact-requests', { body })),
  });
}
