export const catalogKeys = {
  all: ['catalog'] as const,
  regions: () => [...catalogKeys.all, 'regions'] as const,
  operatingSystems: () => [...catalogKeys.all, 'operating-systems'] as const,
};
