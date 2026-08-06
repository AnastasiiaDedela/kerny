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
  consent: CookieConsent | null;
  openCookieSettings: () => void;
};

const CookieConsentContext = createContext<CookieConsentValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  const consent = snapshot.status === 'resolved' ? snapshot.consent : null;

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

export function useCookieConsent() {
  const value = useContext(CookieConsentContext);
  if (!value) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return value;
}
