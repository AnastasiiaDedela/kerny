import Link from 'next/link';
import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServerList } from '@/components/workspace/ServerList';

export default function WorkspacePage() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-[28px] leading-[34px] font-bold text-white">Cloud Servers</h1>
        <Button render={<Link href="/workspace/new-server" />} nativeButton={false}>
          <CirclePlus className="size-4" strokeWidth={1.5} />
          New Server
        </Button>
      </div>

      <p className="mt-6 mb-4 text-base leading-[19px] text-white/50">Your Active Servers</p>

      <ServerList />
    </div>
  );
}
