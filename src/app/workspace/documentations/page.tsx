import { DocumentationArticles } from '@/components/workspace/DocumentationArticles';
import { WorkspaceMobileNav } from '@/components/workspace/WorkspaceSidebar';

export default function DocumentationsPage() {
  return (
    <div>
      {/* Same 30px under the nav card as the other workspace pages. */}
      <WorkspaceMobileNav className="mb-[30px] lg:hidden" />

      <h1 className="text-xl leading-6 font-semibold text-white">Documentations</h1>

      <div className="mt-4 flex flex-col gap-6 lg:mt-6">
        <DocumentationArticles />
      </div>
    </div>
  );
}
