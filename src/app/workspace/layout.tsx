import { WorkspaceHeader } from '@/components/workspace/WorkspaceHeader';
import { WorkspaceSidebar } from '@/components/workspace/WorkspaceSidebar';

export default function WorkspaceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <WorkspaceHeader />
      <main className="mx-auto flex w-full max-w-340 flex-1 flex-col gap-6 px-5 pb-10 min-[1240px]:flex-row">
        <WorkspaceSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </main>
    </>
  );
}
