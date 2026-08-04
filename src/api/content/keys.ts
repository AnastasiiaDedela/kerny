export const contentKeys = {
  all: ['content'] as const,
  faq: () => [...contentKeys.all, 'faq'] as const,
  legal: () => [...contentKeys.all, 'legal'] as const,
  legalDocument: (slug: string) => [...contentKeys.legal(), slug] as const,
  contactInfo: () => [...contentKeys.all, 'contact-info'] as const,
};
