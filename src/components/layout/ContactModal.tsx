'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { fieldError, formError } from '@/api/auth';
import { useContactDetails, useCreateContactRequest } from '@/api/content';
import { FieldError, FormError } from '@/components/layout/auth/shared';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const description =
  'Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus sagittis';

const sentDescription = 'Thanks — we have your message and will get back to you by email shortly.';

/**
 * `CreateContactRequestDto` has no phone field, but the design asks for one, so the
 * number rides along at the top of the free-text body. Drop this once the API grows a
 * dedicated `phone` field.
 */
function withPhone(question: string, phone: string) {
  return phone.trim() ? `Phone: ${phone.trim()}\n\n${question}` : question;
}

/** Icon and label are ours; the value comes from `/api/public/contact-info`. */
const contactRows = [
  { icon: '/icons/mail.svg', width: 26, height: 20, label: 'Email' },
  { icon: '/icons/address.svg', width: 26, height: 26, label: 'Address' },
  { icon: '/icons/calendar.svg', width: 26, height: 26, label: 'Schedule' },
] as const;

/**
 * Decorative brand icons. The API's `socialLinks` is empty and carries no icon, so these
 * stay local — give them hrefs once the endpoint returns any.
 */
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
  const { contactInfo } = useContactDetails();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [consent, setConsent] = useState(false);

  const contactRequest = useCreateContactRequest();

  function reset() {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setQuestion('');
    setConsent(false);
    contactRequest.reset();
  }

  const values: Record<(typeof contactRows)[number]['label'], string> = {
    Email: contactInfo?.supportEmail ?? '—',
    Address: contactInfo?.address ?? '—',
    Schedule: contactInfo?.schedule ?? '—',
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        // Closing discards the draft, so the next open starts clean rather than on the
        // old success screen or a stale validation error.
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="bg-background max-w-[min(749px,calc(100%-20px))] gap-0 rounded-[30px] border-0 px-5 py-7.5 ring-0 sm:max-w-[min(749px,calc(100%-20px))] lg:p-7.5"
      >
        <div className="flex flex-col gap-7.5 lg:flex-row">
          <div className="w-full lg:w-100 lg:shrink-0">
            <div className="flex items-start justify-between">
              <h2 className="text-foreground text-2xl leading-[29px] font-semibold">
                {contactRequest.isSuccess ? 'Message Sent' : 'Contact Us'}
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => {
                  reset();
                  onOpenChange(false);
                }}
                className="text-foreground/50 hover:text-foreground flex size-6 shrink-0 items-center justify-center rounded-[5px] bg-white/[0.04] transition-colors"
              >
                <X className="size-3" />
              </button>
            </div>
            <p className="text-muted-foreground mt-2 text-sm leading-[17px] lg:max-w-100">
              {contactRequest.isSuccess ? sentDescription : description}
            </p>

            {contactRequest.isSuccess ? (
              <Button
                type="button"
                onClick={() => {
                  reset();
                  onOpenChange(false);
                }}
                className="mt-4 h-[46px] w-full rounded-[10px] text-sm font-medium"
              >
                Okay!
              </Button>
            ) : (
              <form
                className="mt-4 flex flex-col gap-2.5"
                onSubmit={(event) => {
                  event.preventDefault();
                  contactRequest.mutate({
                    firstName,
                    lastName,
                    email,
                    question: withPhone(question, phone),
                    consent,
                    sourcePage: window.location.pathname,
                  });
                }}
              >
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="flex flex-col gap-1">
                    <Input
                      placeholder="First Name"
                      autoComplete="given-name"
                      required
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      className={fieldClassName}
                    />
                    <FieldError>{fieldError(contactRequest.error, 'firstName')}</FieldError>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Input
                      placeholder="Last Name"
                      autoComplete="family-name"
                      required
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      className={fieldClassName}
                    />
                    <FieldError>{fieldError(contactRequest.error, 'lastName')}</FieldError>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    placeholder="Email Address"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={fieldClassName}
                  />
                  <FieldError>{fieldError(contactRequest.error, 'email')}</FieldError>
                </div>
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className={fieldClassName}
                />
                <div className="flex flex-col gap-1">
                  <Textarea
                    placeholder="Describe your Question"
                    required
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    className={cn(fieldClassName, 'h-40 items-start py-4')}
                  />
                  <FieldError>{fieldError(contactRequest.error, 'question')}</FieldError>
                </div>

                <label className="text-muted-foreground mt-2.5 flex items-center gap-3 text-xs leading-[15px]">
                  <Checkbox
                    checked={consent}
                    onCheckedChange={setConsent}
                    className="data-checked:bg-primary rounded-[5px] border-0 bg-white/[0.04]"
                  />
                  I give my consent to the processing of personal data
                </label>
                <FieldError>{fieldError(contactRequest.error, 'consent')}</FieldError>

                <FormError>{formError(contactRequest.error)}</FormError>

                <Button
                  type="submit"
                  disabled={contactRequest.isPending}
                  className="mt-2.5 h-[46px] w-full rounded-[10px] text-sm font-medium"
                >
                  {contactRequest.isPending ? 'Sending…' : 'Send'}
                </Button>
              </form>
            )}
          </div>

          <div className="hidden w-[259px] flex-col justify-center gap-7.5 lg:flex">
            <div className="flex flex-col gap-8">
              {contactRows.map(({ icon, width, height, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Image src={icon} alt="" width={width} height={height} className="shrink-0" />
                  <div className="flex flex-col gap-1">
                    <p className="text-muted-foreground text-sm">{label}</p>
                    <p className="text-foreground text-sm font-medium whitespace-pre-line">
                      {values[label]}
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
