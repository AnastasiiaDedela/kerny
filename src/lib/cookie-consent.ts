export const COOKIE_CATEGORIES = ['necessary', 'performance', 'functional', 'targeting'] as const;

export type CookieCategory = (typeof COOKIE_CATEGORIES)[number];

export type CookieConsent = Record<CookieCategory, boolean>;

export const CONSENT_COOKIE_NAME = 'kerny_cookie_consent';

const CONSENT_VERSION = 1;

const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

export const REQUIRED_CATEGORIES: CookieCategory[] = ['necessary'];

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

export const REJECT_ALL_CONSENT: CookieConsent = {
  necessary: true,
  performance: false,
  functional: false,
  targeting: false,
};

type StoredConsent = CookieConsent & { v: number };

export function readStoredConsent(): CookieConsent | null {
  if (typeof document === 'undefined') return null;

  try {
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
  if (window.location.protocol === 'https:') attributes.push('Secure');

  writeCookie(attributes.join('; '), consent);
}

export function clearStoredConsent(): void {
  if (typeof document === 'undefined') return;
  writeCookie(`${CONSENT_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`, null);
}

function writeCookie(value: string, decided: CookieConsent | null) {
  try {
    document.cookie = value;
  } catch {}
  publish(decided);
}

export type ConsentSnapshot =
  { status: 'unresolved' } | { status: 'resolved'; consent: CookieConsent | null };

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

export function getServerConsentSnapshot(): ConsentSnapshot {
  return UNRESOLVED;
}
