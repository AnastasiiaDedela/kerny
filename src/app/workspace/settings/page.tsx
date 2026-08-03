import {
  AccountSettingsList,
  type AccountSetting,
} from '@/components/workspace/AccountSettingsList';

const email = 'nickname@kerny.com';

const settings: AccountSetting[] = [
  { title: 'Email Address', description: email, action: 'Edit E-Mail', modal: 'email' },
  { title: 'Password', description: 'Created 10 days ago', action: 'Change', modal: 'password' },
  {
    title: 'Sign out of all devices',
    description: 'You will need to sign in again on all devices',
    action: 'Sign Out',
    modal: 'signOut',
  },
  {
    title: 'Delete Account',
    description: 'Your account will be permanently deleted',
    action: 'Delete Account',
    modal: 'delete',
    destructive: true,
  },
];

export default function AccountSettingsPage() {
  return (
    <div>
      <h1 className="text-xl leading-6 font-semibold text-white">Account Settings</h1>

      <div className="mt-[30px]">
        <AccountSettingsList items={settings} currentEmail={email} />
      </div>
    </div>
  );
}
