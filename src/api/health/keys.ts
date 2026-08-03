export const healthKeys = {
  all: ['health'] as const,
  health: () => [...healthKeys.all, 'health'] as const,
  readiness: () => [...healthKeys.all, 'readiness'] as const,
};
