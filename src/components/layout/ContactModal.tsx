'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const description =
  'Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus sagittis';

const contactInfo = [
  { icon: '/icons/mail.svg', width: 26, height: 20, label: 'Email', value: 'username@vps.com' },
  {
    icon: '/icons/address.svg',
    width: 26,
    height: 26,
    label: 'Address',
    value: 'City, Region, LV-1234',
  },
  {
    icon: '/icons/calendar.svg',
    width: 26,
    height: 26,
    label: 'Schedule',
    value: 'Monday - Friday: 08:00 - 23:00\nSaturday - Sunday: 10:00 - 18:00',
  },
];

const socials = [
  { name: 'X', icon: '/icons/x.svg', width: 27, height: 24 },
  { name: 'TikTok', icon: '/icons/tiktok.svg', width: 21, height: 24 },
  { name: 'Instagram', icon: '/icons/instagram.svg', width: 24, height: 24 },
  { name: 'YouTube', icon: '/icons/youtube.svg', width: 35, height: 24 },
];

const fieldClassName =
  'h-[46px] w-full rounded-[8px] border-0 bg-white/[0.04] px-4 text-sm text-foreground placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-primary/50';

export function ContactModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-background max-w-[min(749px,calc(100%-20px))] gap-0 rounded-[30px] border-0 px-5 py-7.5 ring-0 sm:max-w-[min(749px,calc(100%-20px))] lg:p-7.5"
      >
        <div className="flex flex-col gap-7.5 lg:flex-row">
          <div className="w-full lg:w-100 lg:shrink-0">
            <div className="flex items-start justify-between">
              <h2 className="text-foreground text-2xl leading-[29px] font-semibold">Contact Us</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => onOpenChange(false)}
                className="text-foreground/50 hover:text-foreground flex size-6 shrink-0 items-center justify-center rounded-[5px] bg-white/[0.04] transition-colors"
              >
                <X className="size-3" />
              </button>
            </div>
            <p className="text-muted-foreground mt-2 text-sm leading-[17px] lg:max-w-100">
              {description}
            </p>

            <form className="mt-4 flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <Input placeholder="First Name" className={fieldClassName} />
                <Input placeholder="Last Name" className={fieldClassName} />
              </div>
              <Input placeholder="Email Address" type="email" className={fieldClassName} />
              <Input placeholder="Phone Number" type="tel" className={fieldClassName} />
              <Textarea
                placeholder="Describe your Question"
                className={cn(fieldClassName, 'h-40 items-start py-4')}
              />

              <label className="text-muted-foreground mt-2.5 flex items-center gap-3 text-xs leading-[15px]">
                <Checkbox className="data-checked:bg-primary rounded-[5px] border-0 bg-white/[0.04]" />
                I give my consent to the processing of personal data
              </label>

              <Button
                type="submit"
                className="mt-2.5 h-[46px] w-full rounded-[10px] text-sm font-medium"
              >
                Send
              </Button>
            </form>
          </div>

          <div className="hidden w-[259px] flex-col justify-center gap-7.5 lg:flex">
            <div className="flex flex-col gap-8">
              {contactInfo.map(({ icon, width, height, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <Image src={icon} alt="" width={width} height={height} className="shrink-0" />
                  <div className="flex flex-col gap-1">
                    <p className="text-muted-foreground text-sm">{label}</p>
                    <p className="text-foreground text-sm font-medium whitespace-pre-line">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {socials.map(({ name, icon, width, height }) => (
                <Image key={name} src={icon} alt={name} width={width} height={height} />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
