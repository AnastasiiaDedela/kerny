import type { components } from '@/types/api';

/** Listing shape — metadata only, no body. Fetch the article by slug for the text. */
export type ArticleSummary = components['schemas']['ArticleSummary'];
export type ArticleListResponse = components['schemas']['ArticleListResponse'];

/** Full article: `body` is the block list to render, `sections` are its in-page anchors. */
export type Article = components['schemas']['Article'];
export type ArticleResponse = components['schemas']['ArticleResponse'];
export type ArticleSection = components['schemas']['ArticleSection'];
