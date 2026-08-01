import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AuthModalDescription,
  AuthModalHeader,
  description,
  fieldClassName,
} from '@/components/layout/auth/shared';

export function NewPasswordView({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <>
      <AuthModalHeader title="New Password" onClose={onClose} />
      <AuthModalDescription>{description}</AuthModalDescription>

      <form
        className="mt-4 flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex flex-col gap-2.5">
          <Input placeholder="New Password" type="password" className={fieldClassName} />
          <Input placeholder="Repeat your Password" type="password" className={fieldClassName} />
        </div>

        <Button type="submit" className="mt-4 h-[46px] w-full rounded-[10px] text-sm font-medium">
          Confirm
        </Button>
      </form>
    </>
  );
}
