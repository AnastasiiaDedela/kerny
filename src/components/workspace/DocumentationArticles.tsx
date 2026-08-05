'use client';

import { useDocsArticles } from '@/api/docs';
import { DocumentationSection } from '@/components/workspace/DocumentationSection';
import { WorkspaceNotice } from '@/components/workspace/WorkspaceNotice';

/**
 * Fetches the documentation articles so the page can stay a server component. Every
 * block in an article's `body` renders as a paragraph — the block `type` is an open
 * string in the schema, so filtering on it would silently drop content.
 *
 * Renders bare sections: the page owns the column that spaces them.
 */
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

  /* Same reasoning as `NotificationFeed`: only a settled, successful response can mean
     there is genuinely nothing to read. */
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
