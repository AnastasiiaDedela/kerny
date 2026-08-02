import { NotificationList, type NotificationItem } from '@/components/workspace/NotificationList';

const message =
  'Lorem ipsum dolor sit amet consectetur. Maecenas vel tortor nisl ultricies donec facilisis accumsan pellentesque. Amet egestas nam at viverra pulvinar at maecenas volutpat. Pellentesque quisque proin consectetur in purus. Eu lorem purus quam ac. Eget arcu elit sagittis sed vestibulum.';

const notifications: NotificationItem[] = Array.from({ length: 5 }, (_, i) => ({
  id: `notification-${i}`,
  title: 'Title of Notification',
  message,
  time: '03.02.2026 19:51:55',
  read: i >= 3,
}));

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="text-xl leading-6 font-semibold text-white">Notifications</h1>

      <div className="mt-4">
        <NotificationList items={notifications} />
      </div>
    </div>
  );
}
