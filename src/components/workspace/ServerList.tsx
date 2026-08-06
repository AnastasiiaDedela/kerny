'use client';

import { useServerList } from '@/api/servers';
import { ServerTable, type ServerRow } from '@/components/workspace/ServerTable';
import { WorkspaceNotice } from '@/components/workspace/WorkspaceNotice';

export function ServerList() {
  const { servers, isPending, isError } = useServerList();

  const rows: ServerRow[] = servers
    .filter((server) => server.status !== 'deleted')
    .map((server) => ({
      id: server.id,
      name: server.name,
      os: server.os.name,
      ip: server.primaryIp ?? '—',
      region: server.region.city,
      status: server.status,
    }));

  if (rows.length === 0) {
    if (isPending || isError) return null;

    return (
      <WorkspaceNotice
        title="No servers yet"
        description="Create your first cloud server to see it here."
      />
    );
  }

  return <ServerTable data={rows} />;
}
