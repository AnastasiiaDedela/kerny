import { cn } from '@/lib/utils';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read?: boolean;
}

export function NotificationList({
  items,
  onMarkRead,
  pendingId,
}: {
  items: NotificationItem[];
  onMarkRead?: (id: string) => void;
  pendingId?: string | null;
}) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const markable = Boolean(onMarkRead) && !item.read;
        const isPending = item.id === pendingId;

        return (
          <article
            key={item.id}
            className={cn(
              'relative rounded-[10px] bg-white/[0.04] p-5 transition-opacity',
              !item.read &&
                'border-primary border-r-2 bg-[linear-gradient(90deg,rgba(67,76,247,0)_25.71%,rgba(67,76,247,0.12)_100%)] pr-[18px]',
              isPending && 'opacity-50'
            )}
          >
            {markable && (
              <button
                type="button"
                onClick={() => onMarkRead?.(item.id)}
                disabled={isPending}
                aria-label={`Mark "${item.title}" as read`}
                className="focus-visible:ring-ring/50 absolute inset-0 cursor-pointer rounded-[10px] outline-none focus-visible:ring-3 disabled:cursor-default"
              />
            )}

            <div className="flex items-start justify-between gap-5">
              <h2 className="text-lg leading-[22px] font-semibold text-white">{item.title}</h2>
              <span
                aria-hidden
                className={cn(
                  'size-1.5 shrink-0 rounded-full',
                  item.read ? 'bg-white/10' : 'bg-primary'
                )}
              />
            </div>

            <p className="mt-2.5 text-base leading-[19px] text-white/50">{item.message}</p>

            <p className="mt-4 text-sm leading-[17px] text-white/50">{item.time}</p>
          </article>
        );
      })}
    </div>
  );
}
