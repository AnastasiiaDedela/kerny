import type { NextRequest } from 'next/server';

import { proxyToApi } from '@/lib/api-proxy';

/**
 * `/api` itself — the App tag's root marker. The `[...path]` catch-all next door
 * needs at least one segment, so without this route a request to `/api` would 404
 * in Next before ever reaching the upstream API.
 */

export const dynamic = 'force-dynamic';

function proxy(request: NextRequest) {
  return proxyToApi(request);
}

export { proxy as GET, proxy as HEAD, proxy as OPTIONS };
