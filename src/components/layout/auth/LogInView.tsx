import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AuthModalDescription,
  AuthModalHeader,
  description,
  fieldClassName,
  GoogleButton,
  OrDivider,
  SecondaryButton,
} from '@/components/layout/auth/shared';

export function LogInView({
  onClose,
  onSignUp,
  onForgotPassword,
}: {
  onClose: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}) {
  return (
    <>
      <AuthModalHeader title="Log In" onClose={onClose} />
      <AuthModalDescription>{description}</AuthModalDescription>

      <form className="mt-4 flex flex-col">
        <div className="flex flex-col gap-2.5">
          <Input placeholder="Email" type="email" className={fieldClassName} />
          <Input placeholder="Password" type="password" className={fieldClassName} />
        </div>

        <button
          type="button"
          onClick={onForgotPassword}
          className="text-muted-foreground hover:text-foreground mt-4 text-left text-sm leading-[17px] transition-colors"
        >
          Forget your Password?
        </button>

        <Button type="submit" className="mt-4 h-[46px] w-full rounded-[10px] text-sm font-medium">
          Log In
        </Button>
      </form>

      <div className="mt-2">
        <SecondaryButton onClick={onSignUp}>Don&apos;t have an account yet?</SecondaryButton>
      </div>

      <div className="mt-4">
        <OrDivider />
      </div>

      <div className="mt-4">
        <GoogleButton>Log In With Google</GoogleButton>
      </div>
    </>
  );
}
