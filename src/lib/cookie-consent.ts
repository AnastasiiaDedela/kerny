/**
 * Cookie-consent storage. The API has no consent endpoint (nothing under `/api` records a
 * cookie choice), so the decision lives in a first-party cookie on the app's own host —
 * a cookie rather than `localStorage` so a future server component or middleware can read
 * it during the request without a client round-trip.
 */

/** Order is the order the settings modal renders them in. */
export const COOKIE_CATEGORIES = ['necessary', 'performance', 'functional', 'targeting'] as const;

export type CookieCategory = (typeof COOKIE_CATEGORIES)[number];

export type CookieConsent = Record<CookieCategory, boolean>;

export const CONSENT_COOKIE_NAME = 'kerny_cookie_consent';

/**
 * Bump when the categories change or the policy is materially revised — a stored choice
 * from an older version is discarded and the banner asks again.
 */
const CONSENT_VERSION = 1;

/** Six months, the usual ceiling regulators accept before re-asking. */
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

/** Strictly necessary cookies are never optional — the toggle is fixed "Always Active". */
export const REQUIRED_CATEGORIES: CookieCategory[] = ['necessary'];

/** What the settings modal starts on before any choice is stored (matches the design). */
export const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  performance: false,
  functional: true,
  targeting: false,
};

export const ACCEPT_ALL_CONSENT: CookieConsent = {
  necessary: true,
  performance: true,
  functional: true,
  targeting: true,
};

/** "Decline" still keeps the strictly necessary bucket — it cannot be switched off. */
export const REJECT_ALL_CONSENT: CookieConsent = {
  necessary: true,
  performance: false,
  functional: false,
  targeting: false,
};

type StoredConsent = CookieConsent & { v: number };

/**
 * The stored choice, or `null` when nothing is stored, the payload is unreadable, or it
 * predates `CONSENT_VERSION` — every one of those cases means "ask again".
 *
 * Browser only; returns `null` during SSR. React components should read it through
 * `getConsentSnapshot()` instead, which distinguishes "not read yet" from "no choice".
 */
export function readStoredConsent(): CookieConsent | null {
  if (typeof document === 'undefined') return null;

  try {
    // Reading `document.cookie` throws outright in a sandboxed frame, so the access sits
    // inside the same guard as the parse — an unreadable jar just means "ask again".
    const match = document.cookie
      .split('; ')
      .find((entry) => entry.startsWith(`${CONSENT_COOKIE_NAME}=`));
    if (!match) return null;

    const parsed = JSON.parse(decodeURIComponent(match.slice(CONSENT_COOKIE_NAME.length + 1)));
    if (!parsed || typeof parsed !== 'object') return null;

    const stored = parsed as Partial<StoredConsent>;
    if (stored.v !== CONSENT_VERSION) return null;

    const consent = { ...REJECT_ALL_CONSENT };
    for (const category of COOKIE_CATEGORIES) {
      if (typeof stored[category] === 'boolean') consent[category] = stored[category];
    }
    // A tampered payload cannot switch the required buckets off.
    for (const category of REQUIRED_CATEGORIES) consent[category] = true;

    return consent;
  } catch {
    return null;
  }
}

export function writeStoredConsent(consent: CookieConsent): void {
  if (typeof document === 'undefined') return;

  const payload: StoredConsent = { ...consent, v: CONSENT_VERSION };
  const attributes = [
    `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(payload))}`,
    'Path=/',
    `Max-Age=${CONSENT_MAX_AGE}`,
    'SameSite=Lax',
  ];
  // `Secure` would make the cookie unwritable over plain http, which is how dev runs.
  if (window.location.protocol === 'https:') attributes.push('Secure');

  writeCookie(attributes.join('; '), consent);
}

/** Drops the stored choice so the banner reappears. Exposed for a "withdraw consent" flow. */
export function clearStoredConsent(): void {
  if (typeof document === 'undefined') return;
  writeCookie(`${CONSENT_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`, null);
}

function writeCookie(value: string, decided: CookieConsent | null) {
  try {
    document.cookie = value;
  } catch {
    // Same sandboxed-frame case as the read. The choice cannot persist, but publishing it
    // still honours the click for this page view rather than re-showing the banner.
  }
  publish(decided);
}

/* -------------------------------------------------------------------------- */
/* useSyncExternalStore backing                                               */
/* -------------------------------------------------------------------------- */

/**
 * `unresolved` is not the same as "no consent stored": the cookie is invisible during SSR
 * and hydration, and the two must render differently — unresolved shows nothing, `null`
 * shows the banner. Without the distinction every returning visitor would see the banner
 * flash in and out before hydration finished.
 */
export type ConsentSnapshot =
  { status: 'unresolved' } | { status: 'resolved'; consent: CookieConsent | null };

/** Stable identity — `useSyncExternalStore` re-renders on any snapshot identity change. */
const UNRESOLVED: ConsentSnapshot = { status: 'unresolved' };

let snapshot: ConsentSnapshot = UNRESOLVED;
const listeners = new Set<() => void>();

function publish(consent: CookieConsent | null) {
  snapshot = { status: 'resolved', consent };
  for (const listener of listeners) listener();
}

export function subscribeToConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getConsentSnapshot(): ConsentSnapshot {
  if (snapshot === UNRESOLVED && typeof document !== 'undefined') {
    snapshot = { status: 'resolved', consent: readStoredConsent() };
  }
  return snapshot;
}

/** Always unresolved on the server, so the markup React hydrates against carries no banner. */
export function getServerConsentSnapshot(): ConsentSnapshot {
  return UNRESOLVED;
}
