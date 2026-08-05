import { queryOptions, useQueries, useQuery } from '@tanstack/react-query';

import { apiClient, unwrap } from '@/api/client';
import { docsKeys } from '@/api/docs/keys';
import type {
  Article,
  ArticleListResponse,
  ArticleResponse,
  ArticleSummary,
} from '@/api/docs/types';

/** Documentation changes on a CMS edit, not per session — an hour is plenty. */
const DOCS_STALE_TIME = 60 * 60 * 1000;

/** Shared so `useDocsArticle` and `useDocsArticles`' fan-out hit the same cache entry. */
function articleOptions(slug: string) {
  return queryOptions({
    queryKey: docsKeys.article(slug),
    queryFn: async (): Promise<ArticleResponse> =>
      unwrap(await apiClient.GET('/api/docs/articles/{slug}', { params: { path: { slug } } })),
    staleTime: DOCS_STALE_TIME,
  });
}

/**
 * GET /api/docs/articles — every published article's slug, title, summary and
 * `sortOrder`. Metadata only; `useDocsArticle()` fetches the body.
 */
export function useDocsArticleList() {
  return useQuery({
    queryKey: docsKeys.articles(),
    queryFn: async (): Promise<ArticleListResponse> =>
      unwrap(await apiClient.GET('/api/docs/articles')),
    staleTime: DOCS_STALE_TIME,
  });
}

/** Article summaries in `sortOrder` — the payload isn't promised to arrive sorted. */
export function useDocsArticleSummaries() {
  const { data, isPending, isError } = useDocsArticleList();

  return {
    summaries: data ? [...data.items].sort((a, b) => a.sortOrder - b.sortOrder) : EMPTY_SUMMARIES,
    isPending,
    isError,
  };
}

/**
 * GET /api/docs/articles/{slug} — one article with its `body` blocks and section
 * anchors. Skipped until a slug is supplied.
 */
export function useDocsArticle(slug: string | undefined) {
  return useQuery({ ...articleOptions(slug ?? ''), enabled: Boolean(slug) });
}

/**
 * Every article with its body, in `sortOrder`. The list endpoint carries summaries only,
 * so each body is a request of its own — hence the fan-out rather than one call.
 *
 * `isPending` stays true until the list *and* every body has landed, so the page never
 * paints a half-built set of articles.
 */
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

/** Stable identity so a pending render doesn't hand consumers a fresh array each time. */
const EMPTY_SUMMARIES: ArticleSummary[] = [];
