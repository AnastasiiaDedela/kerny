import type { components } from '@/types/api';

/** One question/answer pair. `sortOrder` is the display order the CMS intends. */
export type FaqItem = components['schemas']['FaqItem'];
export type FaqListResponse = components['schemas']['FaqListResponse'];

/** Listing shape — metadata only, no body. Fetch the document by slug for the text. */
export type LegalSummary = components['schemas']['LegalSummary'];
export type LegalListResponse = components['schemas']['LegalListResponse'];

/** Full document: `bodyMarkdown` plus a pre-parsed `content` block list. */
export type LegalDocument = components['schemas']['LegalDocument'];
export type LegalDocumentResponse = components['schemas']['LegalDocumentResponse'];
export type ContentBlock = components['schemas']['ContentBlock'];

export type ContactInfoResponse = components['schemas']['ContactInfoResponse'];

/** `{ supportEmail, address, schedule, socialLinks }` — the envelope's body. */
export type ContactInfo = ContactInfoResponse['contactInfo'];

/**
 * Body of the public contact form. Note there is no `phone` field — the modal folds the
 * phone number the design asks for into `question`.
 */
export type CreateContactRequestDto = components['schemas']['CreateContactRequestDto'];

/** The submitted request echoed back, with its server-assigned `id` and `status`. */
export type ContactRequest = components['schemas']['ContactRequest'];
export type ContactRequestResponse = components['schemas']['ContactRequestResponse'];
