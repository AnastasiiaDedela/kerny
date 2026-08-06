import type { NextRequest } from 'next/server';

import { proxyToApi } from '@/lib/api-proxy';

export const dynamic = 'force-dynamic';

function proxy(request: NextRequest) {
  return proxyToApi(request);
}

export { proxy as GET, proxy as HEAD, proxy as OPTIONS };
