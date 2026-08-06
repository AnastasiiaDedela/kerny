'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

import { CookieBanner } from '@/components/layout/CookieBanner';
import { CookieSettingsModal } from '@/components/layout/CookieSettingsModal';
import {
  ACCEPT_ALL_CONSENT,
  DEFAULT_CONSENT,
  getConsentSnapshot,
  getServerConsentSnapshot,
  REJECT_ALL_CONSENT,
  subscribeToConsent,
  writeStoredConsent,
  type CookieConsent,
} from '@/lib/cookie-consent';

type CookieConsentValue = {
  /** `null` both before the cookie has been read and when no choice is stored. */
  consent: CookieConsent | null;
  openCookieSettings: () => void;
};

const CookieConsentContext = createContext<CookieConsentValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  // The cookie is not readable during SSR, so it is an external store rather than state:
  // the server snapshot stays `unresolved` and React swaps in the real one after
  // hydration, which keeps the first client paint identical to the server HTML.
  const snapshot = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  const consent = snapshot.status === 'resolved' ? snapshot.consent : null;

  // `writeStoredConsent` publishes to the store, so there is no local copy to keep in sync.
  const decide = useCallback((next: CookieConsent) => {
    writeStoredConsent(next);
    setSettingsOpen(false);
  }, []);

  const openCookieSettings = useCallback(() => setSettingsOpen(true), []);

  return (
    <CookieConsentContext.Provider value={{ consent, openCookieSettings }}>
      {children}

      {snapshot.status === 'resolved' && !consent && !settingsOpen && (
        <CookieBanner
          onAccept={() => decide(ACCEPT_ALL_CONSENT)}
          onDecline={() => decide(REJECT_ALL_CONSENT)}
          onOpenSettings={openCookieSettings}
        />
      )}

      <CookieSettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        consent={consent ?? DEFAULT_CONSENT}
        onConfirm={decide}
      />
    </CookieConsentContext.Provider>
  );
}

/**
 * The stored consent plus a way to reopen the settings modal — for a "Cookie Settings"
 * link, or for a feature that must check `consent.targeting` before it loads a script.
 */
export function useCookieConsent() {
  const value = useContext(CookieConsentContext);
  if (!value) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return value;
}
