import { queryOptions, useQueries, useQuery } from '@tanstack/react-query';

import { apiClient, unwrap } from '@/api/client';
import { docsKeys } from '@/api/docs/keys';
import type {
  Article,
  ArticleListResponse,
  ArticleResponse,
  ArticleSummary,
} from '@/api/docs/types';

const DOCS_STALE_TIME = 60 * 60 * 1000;

function articleOptions(slug: string) {
  return queryOptions({
    queryKey: docsKeys.article(slug),
    queryFn: async (): Promise<ArticleResponse> =>
      unwrap(await apiClient.GET('/api/docs/articles/{slug}', { params: { path: { slug } } })),
    staleTime: DOCS_STALE_TIME,
  });
}

export function useDocsArticleList() {
  return useQuery({
    queryKey: docsKeys.articles(),
    queryFn: async (): Promise<ArticleListResponse> =>
      unwrap(await apiClient.GET('/api/docs/articles')),
    staleTime: DOCS_STALE_TIME,
  });
}

export function useDocsArticleSummaries() {
  const { data, isPending, isError } = useDocsArticleList();

  return {
    summaries: data ? [...data.items].sort((a, b) => a.sortOrder - b.sortOrder) : EMPTY_SUMMARIES,
    isPending,
    isError,
  };
}

export function useDocsArticle(slug: string | undefined) {
  return useQuery({ ...articleOptions(slug ?? ''), enabled: Boolean(slug) });
}

export function useDocsArticles() {
  const { summaries, isPending: isListPending, isError: isListError } = useDocsArticleSummaries();

  const results = useQueries({
    queries: summaries.map((summary) => articleOptions(summary.slug)),
  });

  return {
    articles: results
      .map((result) => result.data?.article)
      .filter((article): article is Article => article !== undefined),
    isPending: isListPending || results.some((result) => result.isPending),
    isError: isListError || results.some((result) => result.isError),
  };
}

const EMPTY_SUMMARIES: ArticleSummary[] = [];
