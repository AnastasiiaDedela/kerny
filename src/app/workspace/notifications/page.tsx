import { NotificationFeed } from '@/components/workspace/NotificationFeed';
import { WorkspaceMobileNav } from '@/components/workspace/WorkspaceSidebar';

export default function NotificationsPage() {
  return (
    <div>
      {/* Same 30px under the nav card as the balance page; there it's a 20px column gap + 10px. */}
      <WorkspaceMobileNav className="mb-[30px] lg:hidden" />

      <h1 className="text-xl leading-6 font-semibold text-white">Notifications</h1>

      <div className="mt-4">
        <NotificationFeed />
      </div>
    </div>
  );
}
