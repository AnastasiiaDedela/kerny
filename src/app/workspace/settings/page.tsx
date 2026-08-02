import {
  AccountSettingsList,
  type AccountSetting,
} from '@/components/workspace/AccountSettingsList';

const settings: AccountSetting[] = [
  { title: 'Email Address', description: 'nickname@kerny.com', action: 'Edit E-Mail' },
  { title: 'Password', description: 'Created 10 days ago', action: 'Change' },
  {
    title: 'Sign out of all devices',
    description: 'You will need to sign in again on all devices',
    action: 'Sign Out',
  },
  {
    title: 'Delete Account',
    description: 'Your account will be permanently deleted',
    action: 'Delete Account',
    destructive: true,
  },
];

export default function AccountSettingsPage() {
  return (
    <div>
      <h1 className="text-xl leading-6 font-semibold text-white">Account Settings</h1>

      <div className="mt-[30px]">
        <AccountSettingsList items={settings} />
      </div>
    </div>
  );
}
