import { cn } from '@/lib/utils';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read?: boolean;
}

/* Unread items carry the brand wash, the 2px right bar and a solid dot; read ones drop all three.
   The bar is inside the 1050px box, so unread trades 2px of right padding for it and both states
   keep the same 1010px text column. */
export function NotificationList({ items }: { items: NotificationItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <article
          key={item.id}
          className={cn(
            'rounded-[10px] bg-white/[0.04] p-5',
            !item.read &&
              'border-primary border-r-2 bg-[linear-gradient(90deg,rgba(67,76,247,0)_25.71%,rgba(67,76,247,0.12)_100%)] pr-[18px]'
          )}
        >
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
      ))}
    </div>
  );
}
