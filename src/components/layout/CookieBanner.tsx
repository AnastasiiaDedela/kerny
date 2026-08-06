'use client';

import { useCookiePolicy } from '@/api/content';

const fallbackTitle = 'Cookies';

const fallbackDescription =
  'We use cookies to keep the site running, remember your preferences and understand how it is used. Choose which ones you allow.';

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM10 8.25C9.30964 8.25 8.75 8.80964 8.75 9.5V14.5C8.75 15.1904 9.30964 15.75 10 15.75C10.6904 15.75 11.25 15.1904 11.25 14.5V9.5C11.25 8.80964 10.6904 8.25 10 8.25ZM10 4.25C9.30964 4.25 8.75 4.80964 8.75 5.5C8.75 6.19036 9.30964 6.75 10 6.75C10.6904 6.75 11.25 6.19036 11.25 5.5C11.25 4.80964 10.6904 4.25 10 4.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function firstParagraph(text: string) {
  return text.split(/\n\s*\n/)[0].trim();
}

export function CookieBanner({
  onAccept,
  onDecline,
  onOpenSettings,
}: {
  onAccept: () => void;
  onDecline: () => void;
  onOpenSettings: () => void;
}) {
  const { policy } = useCookiePolicy();

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed right-2.5 bottom-2.5 left-2.5 z-40 max-w-[328px] rounded-[10px] border-[length:0.5px] border-white/10 bg-[#0f0f0f] bg-[image:linear-gradient(290.1deg,rgba(255,255,255,0)_67.42%,rgba(255,255,255,0.2)_100%)] p-5 sm:right-auto sm:bottom-5 sm:left-5 sm:w-[328px]"
    >
      <div className="flex gap-3">
        <InfoIcon />

        <div className="min-w-0 flex-1">
          <p className="text-sm leading-[17px] font-semibold text-white">
            {policy?.title || fallbackTitle}
          </p>

          <p className="mt-1.5 line-clamp-5 text-xs leading-[15px] text-white/50">
            {policy?.description ? firstParagraph(policy.description) : fallbackDescription}
          </p>

          <div className="mt-2.5 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={onAccept}
              className="bg-primary h-9 rounded-[10px] text-sm leading-[17px] font-medium text-white transition-colors hover:bg-[#6C72FA]"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={onDecline}
              className="border-primary hover:bg-primary/10 h-9 rounded-[10px] border-[length:0.5px] text-sm leading-[17px] font-medium text-white transition-colors"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={onOpenSettings}
              className="h-9 rounded-[10px] border-[length:0.5px] border-white text-sm leading-[17px] font-medium text-white transition-colors hover:bg-white/10"
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
