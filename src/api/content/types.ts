import type { components } from '@/types/api';

export type FaqItem = components['schemas']['FaqItem'];
export type FaqListResponse = components['schemas']['FaqListResponse'];

export type LegalSummary = components['schemas']['LegalSummary'];
export type LegalListResponse = components['schemas']['LegalListResponse'];

export type LegalDocument = components['schemas']['LegalDocument'];
export type LegalDocumentResponse = components['schemas']['LegalDocumentResponse'];
export type ContentBlock = components['schemas']['ContentBlock'];

export type ContactInfoResponse = components['schemas']['ContactInfoResponse'];

export type ContactInfo = ContactInfoResponse['contactInfo'];

export type CreateContactRequestDto = components['schemas']['CreateContactRequestDto'];

export type ContactRequest = components['schemas']['ContactRequest'];
export type ContactRequestResponse = components['schemas']['ContactRequestResponse'];
