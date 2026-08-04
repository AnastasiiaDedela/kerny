export const serverKeys = {
  all: ['servers'] as const,
  list: () => [...serverKeys.all, 'list'] as const,
  detail: (serverId: string) => [...serverKeys.all, 'detail', serverId] as const,
  history: (serverId: string) => [...serverKeys.all, 'history', serverId] as const,
  ipAddresses: (serverId: string) => [...serverKeys.all, 'ip-addresses', serverId] as const,
  backups: (serverId: string) => [...serverKeys.all, 'backups', serverId] as const,
};
