'use client';

import {
  useServer,
  useServerBackups,
  useServerHistory,
  useServerIpAddresses,
  type ServerDetail,
} from '@/api/servers';
import { ServerInformation, type ServerInfo } from '@/components/workspace/ServerInformation';
import { ServerManagement } from '@/components/workspace/ServerManagement';
import type { HistoryEntry } from '@/components/workspace/ServerHistory';
import type { IpAddressGroup } from '@/components/workspace/ServerIpAddresses';
import { regionCountry, regionFlagSrc } from '@/lib/catalog';
import { formatAmount, formatBandwidth, formatCpu, formatDisk, formatRam } from '@/lib/pricing';
import { formatServerDate, formatServerTimestamp } from '@/lib/servers';

/**
 * Body copy for the IP and backup tabs. The API serves no prose for either, so this stays
 * placeholder text — only the tables and the enable button are wired.
 */
const paragraph =
  'Lorem ipsum dolor sit amet consectetur. Vel dolor arcu urna eu vestibulum ipsum nulla. Tincidunt tristique tellus massa parturient non. Ultrices mauris ipsum cursus nunc ut leo tempor sed. Lorem nunc elementum auctor senectus. Pharetra laoreet elementum ullamcorper egestas. Gravida amet scelerisque proin at tellus feugiat mattis pulvinar pellentesque. Pretium cursus ultrices fermentum cum tristique.';

const instruction = [
  paragraph,
  paragraph,
  paragraph,
  paragraph,
  'Lorem ipsum dolor sit amet consectetur. Vel dolor arcu urna eu vestibulum ipsum nulla. Tincidunt tristique tellus massa parturient non. Ultrices mauris ipsum cursus nunc ut leo tempor sed',
];

const backupsParagraph =
  'Lorem ipsum dolor sit amet consectetur. Molestie morbi venenatis semper lorem pellentesque sed morbi in ac. Viverra ipsum enim adipiscing mollis duis faucibus nunc nisl.';

const backups = [backupsParagraph, backupsParagraph, backupsParagraph];

function toServerInfo(server: ServerDetail): ServerInfo {
  return {
    name: server.name,
    host: server.hostname,
    flag: regionFlagSrc(server.region),
    flagAlt: regionCountry(server.region),
    // A server has no address until the provider assigns one.
    ip: server.primaryIp ?? '—',
    login: server.credentials.login ?? '—',
    passwordAvailable: server.credentials.passwordAvailable,
    status: server.status,
    cost: `${formatAmount(server.pricing.monthlyPrice)} € / month`,
    validUntil: formatServerDate(server.validity.validUntil),
    // `Plan` carries no display name, so the provider's plan code is the only label.
    tariff: server.tariff.providerId,
    system: server.os.name,
    cpu: formatCpu(server.resources.cpuCount),
    ram: formatRam(server.resources.ramMb),
    storage: formatDisk(server.resources.diskGb),
    connection: formatBandwidth(server.resources.bandwidthGb),
  };
}

export function ServerDetailView({ serverId }: { serverId: string }) {
  const { data } = useServer(serverId);
  const { data: historyData } = useServerHistory(serverId);
  const { data: ipData } = useServerIpAddresses(serverId);
  const { data: backupsData } = useServerBackups(serverId);

  const server = data?.server;

  const history: HistoryEntry[] =
    historyData?.items.map((entry) => ({
      id: entry.id,
      action: entry.action,
      time: formatServerTimestamp(entry.occurredAt),
      amount: entry.amount ? `${entry.amount} ${entry.currency ?? ''}`.trim() : '—',
    })) ?? [];

  // The API returns one flat list; the design shows a table per address family.
  const ipGroups: IpAddressGroup[] = ['v4', 'v6']
    .map((family) => ({
      title: `IP${family.toUpperCase()}`,
      rows: (ipData?.items ?? [])
        .filter((ip) => ip.family.toLowerCase().includes(family))
        .map((ip) => ({
          id: ip.id,
          subnet: ip.ip,
          mask: ip.netmask ?? '—',
          gateway: ip.gateway ?? '—',
          ptr: ip.ptr ?? '-',
          type: ip.type,
          // The endpoint only returns addresses that are assigned, so all are live.
          active: true,
        })),
    }))
    .filter((group) => group.rows.length > 0);

  // Nothing to render until the detail lands; the two panels both depend on it.
  if (!server) return null;

  return (
    <div className="mt-8 grid grid-cols-1 items-stretch gap-5 lg:min-h-[958px] lg:grid-cols-[minmax(0,1fr)_280px]">
      <ServerInformation
        serverId={serverId}
        server={toServerInfo(server)}
        history={history}
        ipGroups={ipGroups}
        instruction={instruction}
        backups={backups}
        backupsEnabled={backupsData?.backups.enabled ?? server.settings.backupsEnabled}
      />
      <ServerManagement server={server} />
    </div>
  );
}
