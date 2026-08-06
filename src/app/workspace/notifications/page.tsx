import { MarkAllNotificationsReadButton } from '@/components/workspace/MarkAllNotificationsReadButton';
import { NotificationFeed } from '@/components/workspace/NotificationFeed';
import { WorkspaceMobileNav } from '@/components/workspace/WorkspaceSidebar';

export default function NotificationsPage() {
  return (
    <div>
      <WorkspaceMobileNav className="mb-[30px] lg:hidden" />

      <div className="flex items-center justify-between gap-5">
        <h1 className="text-xl leading-6 font-semibold text-white">Notifications</h1>
        <MarkAllNotificationsReadButton />
      </div>

      <div className="mt-4">
        <NotificationFeed />
      </div>
    </div>
  );
}
