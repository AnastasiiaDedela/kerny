import { AccountSettingsList } from '@/components/workspace/AccountSettingsList';

export default function AccountSettingsPage() {
  return (
    <div>
      <h1 className="text-xl leading-6 font-semibold text-white">Account Settings</h1>

      <div className="mt-[30px]">
        <AccountSettingsList />
      </div>
    </div>
  );
}
