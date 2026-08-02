import { ServerInformation, type ServerInfo } from '@/components/workspace/ServerInformation';
import { ServerManagement } from '@/components/workspace/ServerManagement';

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

export default function ServerPage() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 lg:min-h-[958px] lg:grid-cols-[minmax(0,1fr)_280px]">
      <ServerInformation server={server} />
      <ServerManagement />
    </div>
  );
}
