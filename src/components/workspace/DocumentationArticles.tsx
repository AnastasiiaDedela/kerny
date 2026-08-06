'use client';

import { useDocsArticles } from '@/api/docs';
import { DocumentationSection } from '@/components/workspace/DocumentationSection';
import { WorkspaceNotice } from '@/components/workspace/WorkspaceNotice';

export function DocumentationArticles() {
  const { articles, isPending, isError } = useDocsArticles();

  if (isPending) {
    return <WorkspaceNotice title="Loading documentation" description="Fetching the guides." />;
  }

  if (isError) {
    return (
      <WorkspaceNotice
        title="Couldn't load documentation"
        description="Refresh the page to try again."
      />
    );
  }

  if (articles.length === 0) {
    return (
      <WorkspaceNotice
        title="No documentation yet"
        description="Guides and reference material will appear here."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-[10px] bg-white/[0.04] p-6">
      {articles.map((article) => (
        <DocumentationSection
          key={article.slug}
          title={article.title}
          paragraphs={article.body.map((block) => block.text)}
        />
      ))}
    </div>
  );
}
