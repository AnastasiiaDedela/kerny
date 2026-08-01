import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { NewCloudServerForm } from '@/components/workspace/NewCloudServerForm';

export default function NewCloudServerPage() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[28px] leading-[34px] font-bold text-white">New Cloud Server</h1>
        <Link
          href="/workspace"
          className="flex h-10 w-[140px] items-center justify-center gap-2.5 rounded-[10px] bg-white/[0.04] px-3 py-2.5 text-sm leading-[17px] font-medium text-white/50 hover:text-white"
        >
          <ChevronLeft size={10} strokeWidth={1.5} />
          Go Back
        </Link>
      </div>

      <div className="mt-8">
        <NewCloudServerForm />
      </div>
    </div>
  );
}
