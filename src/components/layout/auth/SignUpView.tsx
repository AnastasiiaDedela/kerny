import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

export function SignUpView({
  onClose,
  onLogIn,
  onSubmit,
}: {
  onClose: () => void;
  onLogIn: () => void;
  onSubmit: () => void;
}) {
  return (
    <>
      <AuthModalHeader title="Sign Up" onClose={onClose} />
      <AuthModalDescription>{description}</AuthModalDescription>

      <form
        className="mt-4 flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex flex-col gap-2.5">
          <Input placeholder="Email" type="email" className={fieldClassName} />
          <Input placeholder="Password" type="password" className={fieldClassName} />
          <Input placeholder="Repeat Password" type="password" className={fieldClassName} />
        </div>

        <label className="mt-4 flex items-center gap-3 text-xs leading-[15px] text-white/50">
          <Checkbox className="data-checked:bg-primary size-6 shrink-0 rounded-[5px] border-0 bg-white/[0.04]" />
          <span>
            I consent to the processing of personal data and agree to the{' '}
            <a href="#" className="text-primary">
              terms of confidentiality
            </a>
          </span>
        </label>

        <Button type="submit" className="mt-4 h-[46px] w-full rounded-[10px] text-sm font-medium">
          Sign Up
        </Button>
      </form>

      <div className="mt-2">
        <SecondaryButton onClick={onLogIn}>I already have an account</SecondaryButton>
      </div>

      <div className="mt-4">
        <OrDivider />
      </div>

      <div className="mt-4">
        <GoogleButton>Sign Up With Google</GoogleButton>
      </div>
    </>
  );
}
