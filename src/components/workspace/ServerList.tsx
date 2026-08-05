'use client';

import { useServerList } from '@/api/servers';
import { ServerTable, type ServerRow } from '@/components/workspace/ServerTable';
import { WorkspaceNotice } from '@/components/workspace/WorkspaceNotice';

/**
 * Fetches the signed-in user's servers so the workspace page can stay a server component.
 * Deleted servers are dropped — the API still returns them, but the heading above this
 * list says "Your Active Servers".
 */
export function ServerList() {
  const { servers, isPending, isError } = useServerList();

  const rows: ServerRow[] = servers
    .filter((server) => server.status !== 'deleted')
    .map((server) => ({
      id: server.id,
      name: server.name,
      os: server.os.name,
      // A server has no address until the provider assigns one.
      ip: server.primaryIp ?? '—',
      region: server.region.city,
      status: server.status,
    }));

  /**
   * Only claim the account is empty once the API has actually said so. While the request
   * is in flight the list is empty too, and a failed one (401 when signed out) means we
   * don't know — showing "No servers yet" in either case would be a lie.
   */
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
