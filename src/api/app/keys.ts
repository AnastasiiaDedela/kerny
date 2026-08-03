export const appKeys = {
  all: ['app'] as const,
  root: () => [...appKeys.all, 'root'] as const,
};
