import { QueryClient, isServer } from '@tanstack/react-query';

import { ApiError } from '@/api/client';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Server components render before hydration; a short window keeps the client
        // from refetching everything the moment it mounts.
        staleTime: 60 * 1000,
        retry: (failureCount, error) => {
          // 4xx answers are final — only retry infrastructure failures.
          if (error instanceof ApiError && error.status < 500) return false;
          return failureCount < 2;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    // Always a fresh client on the server so requests never share cache.
    return makeQueryClient();
  }
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
