import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AuthModalDescription,
  AuthModalHeader,
  description,
  fieldClassName,
  SecondaryButton,
} from '@/components/layout/auth/shared';

export function ResetPasswordView({
  onClose,
  onSubmit,
  onGoBack,
}: {
  onClose: () => void;
  onSubmit: () => void;
  onGoBack: () => void;
}) {
  return (
    <>
      <AuthModalHeader title="Reset Password" onClose={onClose} />
      <AuthModalDescription>{description}</AuthModalDescription>

      <form
        className="mt-4 flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Input placeholder="Email" type="email" className={fieldClassName} />

        <Button type="submit" className="mt-4 h-[46px] w-full rounded-[10px] text-sm font-medium">
          Reset Password
        </Button>
      </form>

      <div className="mt-2">
        <SecondaryButton onClick={onGoBack}>Go Back</SecondaryButton>
      </div>
    </>
  );
}
