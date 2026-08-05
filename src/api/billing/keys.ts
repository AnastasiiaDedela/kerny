export const billingKeys = {
  all: ['billing'] as const,
  summary: () => [...billingKeys.all, 'summary'] as const,
  transactions: () => [...billingKeys.all, 'transactions'] as const,
};
