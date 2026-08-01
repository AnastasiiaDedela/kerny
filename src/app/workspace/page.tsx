import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServerTable, type ServerRow } from '@/components/workspace/ServerTable';

const servers: ServerRow[] = [
  {
    id: 1,
    name: 'Server Name',
    os: 'CentOs SELinux 8 x64',
    ip: '192.168.10.245',
    region: 'Atlantida',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Server Name',
    os: 'CentOs SELinux 8 x64',
    ip: '192.168.24.108',
    region: 'Atlantida',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Server Name',
    os: 'CentOs SELinux 8 x64',
    ip: '192.168.33.71',
    region: 'Atlantida',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Server Name',
    os: 'CentOs SELinux 8 x64',
    ip: '192.168.45.19',
    region: 'Atlantida',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Server Name',
    os: 'CentOs SELinux 8 x64',
    ip: '192.168.58.203',
    region: 'Atlantida',
    status: 'Active',
  },
];

export default function WorkspacePage() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[28px] leading-[34px] font-bold text-white">Cloud Servers</h1>
        <Button>
          <CirclePlus className="size-4" strokeWidth={1.5} />
          New Server
        </Button>
      </div>

      <p className="mt-6 mb-4 text-base leading-[19px] text-white/50">Your Active Servers</p>

      <ServerTable data={servers} />
    </div>
  );
}
