'use client';

import { useState } from 'react';

import { fieldError, formError } from '@/api/auth';
import {
  useBillingOverview,
  useDefaultPaymentMethod,
  useUpdateBillingProfile,
  type BillingProfileDto,
} from '@/api/billing';
import { FieldError, FormError } from '@/components/layout/auth/shared';
import { Button } from '@/components/ui/button';
import { AddPaymentMethodModal } from '@/components/workspace/AddPaymentMethodModal';
import { formatPaymentMethod } from '@/lib/billing';

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your Name...' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your Email...' },
  { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter your Address...' },
  {
    name: 'taxId',
    label: 'Tax ID',
    type: 'text',
    placeholder: 'Enter your Tax ID...',
    optional: true,
  },
  {
    name: 'companyDetails',
    label: 'Company Details',
    type: 'text',
    placeholder: 'Enter your Company Details...',
    optional: true,
  },
] as const;

type FieldName = (typeof fields)[number]['name'];

const emptyForm: Record<FieldName, string> = {
  name: '',
  email: '',
  address: '',
  taxId: '',
  companyDetails: '',
};

function toProfileDto(values: Record<FieldName, string>): BillingProfileDto {
  const dto: BillingProfileDto = {};

  for (const key of Object.keys(values) as FieldName[]) {
    const value = values[key].trim();
    if (value) dto[key] = value;
  }

  return dto;
}

export function PaymentMethodForm() {
  const [values, setValues] = useState(emptyForm);
  const [hydrated, setHydrated] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);

  const { profile } = useBillingOverview();
  const { paymentMethod } = useDefaultPaymentMethod();
  const updateProfile = useUpdateBillingProfile();

  if (profile && !hydrated) {
    setHydrated(true);
    setValues({
      name: profile.name ?? '',
      email: profile.email ?? '',
      address: profile.address ?? '',
      taxId: profile.taxId ?? '',
      companyDetails: profile.companyDetails ?? '',
    });
  }

  return (
    <section className="rounded-[10px] bg-white/[0.04] p-5 lg:p-6">
      <h2 className="text-xl leading-6 font-semibold text-white">Payment Method</h2>

      <div className="mt-4 flex min-h-[66px] flex-wrap items-center justify-between gap-2.5 rounded-[10px] bg-white/[0.04] p-[13px] lg:gap-4 lg:pr-[13px] lg:pl-6">
        <span className="text-sm leading-[17px] font-medium text-white lg:text-base lg:leading-[19px]">
          {paymentMethod ? formatPaymentMethod(paymentMethod) : 'No Payment Method'}
        </span>
        <button
          type="button"
          onClick={() => setCardModalOpen(true)}
          className="h-10 w-[120px] shrink-0 rounded-[8px] bg-white/[0.1] text-sm leading-[17px] font-medium text-white/50 transition-colors hover:text-white lg:w-[140px] lg:text-base lg:leading-[19px]"
        >
          Add Method
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateProfile.mutate(toProfileDto(values));
        }}
      >
        <div className="mt-4 flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-base leading-[19px] font-medium text-white"
              >
                {field.label}
                {'optional' in field && <span className="text-white/50"> (optional)</span>}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={values[field.name]}
                onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                placeholder={field.placeholder}
                className="h-[46px] w-full rounded-[8px] bg-white/[0.04] px-4 py-[7px] text-sm leading-[17px] font-normal text-white outline-none placeholder:text-white/30"
              />
              <FieldError>{fieldError(updateProfile.error, field.name)}</FieldError>
            </div>
          ))}
        </div>

        <FormError>{formError(updateProfile.error)}</FormError>

        <Button
          type="submit"
          disabled={updateProfile.isPending}
          className="mt-5 h-[46px] w-full text-sm leading-[17px] font-medium"
        >
          Save
        </Button>
      </form>

      <AddPaymentMethodModal open={cardModalOpen} onOpenChange={setCardModalOpen} />
    </section>
  );
}
