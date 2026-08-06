'use client';

import { useState } from 'react';

import { useCookiePolicy } from '@/api/content';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  COOKIE_CATEGORIES,
  REQUIRED_CATEGORIES,
  type CookieCategory,
  type CookieConsent,
} from '@/lib/cookie-consent';
import { cn } from '@/lib/utils';

const fallbackDescription =
  'We use cookies and similar technologies to keep the site running, remember your preferences, measure how the site performs and — with your permission — personalise what you see. Choose which categories you allow below; strictly necessary cookies cannot be switched off because the site does not work without them.';

const categoryLabels: Record<CookieCategory, string> = {
  necessary: 'Strictly Necessary Cookies',
  performance: 'Performance Cookies',
  functional: 'Functional Cookies',
  targeting: 'Targeting Cookies',
};

function ConsentToggle({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'focus-visible:ring-ring/50 flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors outline-none focus-visible:ring-3',
        checked ? 'bg-primary' : 'bg-white/10'
      )}
    >
      <span
        className={cn(
          'size-5 rounded-full bg-white transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  );
}

export function CookieSettingsModal({
  open,
  onOpenChange,
  consent,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consent: CookieConsent;
  onConfirm: (consent: CookieConsent) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-label="Cookies Settings"
        className="bg-background scrollbar-hairline max-h-[calc(100dvh-20px)] max-w-[min(600px,calc(100%-20px))] gap-0 overflow-y-auto rounded-[10px] border-[length:0.5px] border-white/10 p-6 ring-0 sm:max-w-[min(600px,calc(100%-20px))]"
      >
        <SettingsForm key={String(open)} consent={consent} onConfirm={onConfirm} />
      </DialogContent>
    </Dialog>
  );
}

function SettingsForm({
  consent,
  onConfirm,
}: {
  consent: CookieConsent;
  onConfirm: (consent: CookieConsent) => void;
}) {
  const { policy } = useCookiePolicy();
  const [draft, setDraft] = useState(consent);

  return (
    <>
      <h2 className="text-base leading-[19px] font-semibold text-white">Cookies Settings</h2>

      <p className="mt-4 text-sm leading-6 whitespace-pre-line text-white">
        {policy?.description || fallbackDescription}
      </p>

      <p className="mt-5 text-base leading-[19px] font-medium text-white">
        Manage Consent Preferences
      </p>

      <div className="mt-5 flex flex-col gap-5">
        {COOKIE_CATEGORIES.map((category) => {
          const required = REQUIRED_CATEGORIES.includes(category);

          return (
            <div key={category} className="flex items-center justify-between gap-4">
              <span className="text-sm leading-[17px] text-white">{categoryLabels[category]}</span>
              {required ? (
                <span className="text-primary text-right text-sm leading-[17px] font-medium">
                  Always Active
                </span>
              ) : (
                <ConsentToggle
                  label={categoryLabels[category]}
                  checked={draft[category]}
                  onCheckedChange={(checked) =>
                    setDraft((current) => ({ ...current, [category]: checked }))
                  }
                />
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onConfirm(draft)}
        className="bg-primary mt-6 h-[46px] w-full rounded-[10px] text-sm leading-[17px] font-medium text-white transition-colors hover:bg-[#6C72FA] sm:w-30"
      >
        Confirm
      </button>
    </>
  );
}
