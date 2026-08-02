import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ServerInformation, type ServerInfo } from '@/components/workspace/ServerInformation';
import { ServerManagement } from '@/components/workspace/ServerManagement';
import type { HistoryEntry } from '@/components/workspace/ServerHistory';
import type { IpAddressGroup } from '@/components/workspace/ServerIpAddresses';

const server: ServerInfo = {
  name: 'Server Name',
  host: 'sw1.kerny.vps',
  flag: '/flags/us.svg',
  flagAlt: 'United States',
  ip: '192.168.1.0',
  login: 'root',
  password: 'kerny-vps-2026',
  status: 'Active',
  cost: '€ 9 / month',
  validUntil: '03.03.2026, 00:07',
  tariff: 'Econom',
  system: 'Ubuntu 24.04',
  cpu: '1 core',
  ram: '4 GB',
  storage: '10 GB',
  connection: 'up to 300 MB/s',
};

const history: HistoryEntry[] = Array.from({ length: 14 }, (_, i) => ({
  id: `entry-${i}`,
  action: 'Service extension #151',
  time: '03.02.2026 00:30:55',
  amount: '€ -999.00',
}));

const ipGroups: IpAddressGroup[] = [
  {
    title: 'IPV4',
    rows: [
      {
        id: 'ipv6-1',
        subnet: '2a12:5940:b694::/48',
        mask: '/48',
        gateway: '2a12:5940:b694::1',
        ptr: '-',
        active: true,
      },
    ],
  },
  {
    title: 'IPV4: 1/15',
    rows: [
      {
        id: 'ipv4-1',
        subnet: '192.168.1.1',
        mask: '255.255.255.255',
        gateway: '10.0.0.1',
        ptr: '-',
        type: 'Main',
        active: true,
      },
    ],
  },
];

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

export default function ServerPage() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[28px] leading-[34px] font-bold text-white">Server Info</h1>
        <Link
          href="/workspace"
          className="flex h-10 w-[140px] items-center justify-center gap-2.5 rounded-[10px] bg-white/[0.04] px-3 py-2.5 text-sm leading-[17px] font-medium text-white/50 hover:text-white"
        >
          <ChevronLeft size={10} strokeWidth={1.5} />
          Go Back
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-5 lg:min-h-[958px] lg:grid-cols-[minmax(0,1fr)_280px]">
        <ServerInformation
          server={server}
          history={history}
          ipGroups={ipGroups}
          instruction={instruction}
          backups={backups}
        />
        <ServerManagement />
      </div>
    </div>
  );
}
