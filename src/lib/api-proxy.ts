import type { NextRequest } from 'next/server';

const UPSTREAM_URL = process.env.API_UPSTREAM_URL ?? 'https://api.kerny.tech';
const TRUSTED_ORIGIN = process.env.API_TRUSTED_ORIGIN ?? 'https://kerny.tech';

/** Connection-level headers that must not be copied between hops. */
const STRIPPED_HEADERS = [
  'connection',
  'keep-alive',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-length',
  'content-encoding',
  'accept-encoding',
];

function rewriteSetCookie(cookie: string, isSecureRequest: boolean) {
  // Drop `Domain=kerny.tech` so the cookie binds to whatever host serves the app.
  const attributes = cookie
    .split(';')
    .map((part) => part.trim())
    .filter((part) => !/^domain=/i.test(part));

  if (isSecureRequest) return attributes.join('; ');

  // Over plain http (dev) a `Secure` / `SameSite=None` cookie would be dropped.
  return attributes
    .filter((part) => !/^secure$/i.test(part))
    .map((part) => (/^samesite=none$/i.test(part) ? 'SameSite=Lax' : part))
    .join('; ');
}

/** Forwards `request` to `/api/<path>` upstream. An empty `path` targets `/api` itself. */
export async function proxyToApi(request: NextRequest, path: string[] = []) {
  const upstreamUrl = new URL(['/api', ...path].join('/'), UPSTREAM_URL);
  upstreamUrl.search = request.nextUrl.search;

  const headers = new Headers(request.headers);
  for (const header of STRIPPED_HEADERS) headers.delete(header);
  headers.set('origin', TRUSTED_ORIGIN);
  headers.set('referer', `${TRUSTED_ORIGIN}/`);

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';

  const upstream = await fetch(upstreamUrl, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    // Let the browser follow API redirects (e.g. the Google callback) itself.
    redirect: 'manual',
    cache: 'no-store',
  });

  const responseHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    if (key === 'set-cookie' || STRIPPED_HEADERS.includes(key)) return;
    responseHeaders.set(key, value);
  });

  const isSecureRequest = request.nextUrl.protocol === 'https:';
  for (const cookie of upstream.headers.getSetCookie()) {
    responseHeaders.append('set-cookie', rewriteSetCookie(cookie, isSecureRequest));
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}
