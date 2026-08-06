'use client';

import { useEnableBackups } from '@/api/servers';

export function ServerBackups({
  serverId,
  paragraphs,
  enabled,
}: {
  serverId: string;
  paragraphs: string[];
  enabled: boolean;
}) {
  const enableBackups = useEnableBackups(serverId);

  return (
    <section className="mt-5 rounded-[10px] bg-[#0F0F0F] p-5">
      <p className="text-2xl leading-[29px] font-semibold text-white">...</p>

      <div className="mt-4 flex flex-col gap-3">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-sm leading-[17px] text-white/50">
            {paragraph}
          </p>
        ))}
      </div>

      <button
        type="button"
        onClick={() => enableBackups.mutate()}
        disabled={enabled || enableBackups.isPending}
        className="bg-primary mt-5 flex h-10 w-[190px] items-center justify-center gap-2.5 rounded-[10px] p-2.5 text-center text-sm leading-[17px] font-medium text-white disabled:opacity-50"
      >
        {enabled ? 'Backups enabled' : 'Enable backups'}
      </button>
    </section>
  );
}
