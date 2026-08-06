export { contentKeys } from '@/api/content/keys';
export { useCreateContactRequest } from '@/api/content/mutations';
export {
  useContactDetails,
  useContactInfo,
  useCookiePolicy,
  useFaq,
  useFaqItems,
  useLegalDocument,
  useLegalDocuments,
  useLegalSummaries,
} from '@/api/content/queries';
export type {
  ContactInfo,
  ContactInfoResponse,
  ContactRequest,
  ContactRequestResponse,
  ContentBlock,
  CreateContactRequestDto,
  FaqItem,
  FaqListResponse,
  LegalDocument,
  LegalDocumentResponse,
  LegalListResponse,
  LegalSummary,
} from '@/api/content/types';
