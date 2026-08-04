export const docsKeys = {
  all: ['docs'] as const,
  articles: () => [...docsKeys.all, 'articles'] as const,
  article: (slug: string) => [...docsKeys.articles(), slug] as const,
};
