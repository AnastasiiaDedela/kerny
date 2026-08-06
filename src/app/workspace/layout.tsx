'use client';

import { usePathname } from 'next/navigation';
import { WorkspaceHeader } from '@/components/workspace/WorkspaceHeader';
import { WorkspaceSidebar } from '@/components/workspace/WorkspaceSidebar';

const fullWidthRoutes = ['/workspace/settings'];

export default function WorkspaceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <>
      <WorkspaceHeader />
      <main className="mx-auto flex w-full max-w-340 flex-1 flex-col gap-6 px-5 pb-5 lg:flex-row lg:pb-10">
        {!fullWidthRoutes.includes(pathname) && <WorkspaceSidebar />}
        <div className="min-w-0 flex-1">{children}</div>
      </main>
    </>
  );
}
