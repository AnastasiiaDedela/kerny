import Image from 'next/image';

import { SecondaryButton } from '@/components/layout/auth/shared';

const description =
  'Lorem ipsum dolor sit amet consectetur. Mattis venenatis viverra ac scelerisque sed in fames mauris iaculis. Et a at cum elementum sit sodales ornare sed gravida.';

export function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[110px] w-[164px]">
        <Image
          src="/images/success.svg"
          alt=""
          width={278}
          height={224}
          className="absolute -top-[53px] -left-[57px] max-w-none"
        />
      </div>
      <h2 className="text-foreground mt-5 text-center text-[20px] leading-6 font-semibold">
        Successfully
      </h2>
      <p className="text-muted-foreground mt-2.5 text-sm leading-[17px]">{description}</p>
      <div className="mt-3.75 w-full rounded-sm lg:mt-4">
        <SecondaryButton onClick={onClose} className="rounded-[8px]">
          Okay!
        </SecondaryButton>
      </div>
    </div>
  );
}
