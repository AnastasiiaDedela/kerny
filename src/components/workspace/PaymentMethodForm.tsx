'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

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

export function PaymentMethodForm() {
  const [values, setValues] = useState(emptyForm);

  return (
    <section className="rounded-[10px] bg-white/[0.04] p-5 lg:p-6">
      <h2 className="text-xl leading-6 font-semibold text-white">Payment Method</h2>

      <div className="mt-4 flex min-h-[66px] flex-wrap items-center justify-between gap-4 rounded-[10px] bg-white/[0.04] py-[13px] pr-[13px] pl-6">
        <span className="text-base leading-[19px] font-medium text-white">No Payment Method</span>
        <button
          type="button"
          className="h-10 w-[140px] shrink-0 rounded-[8px] bg-white/[0.1] text-base leading-[19px] font-medium text-white/50 transition-colors hover:text-white"
        >
          Add Method
        </button>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
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
            </div>
          ))}
        </div>

        <Button type="submit" className="mt-5 h-[46px] w-full text-sm leading-[17px] font-medium">
          Save
        </Button>
      </form>
    </section>
  );
}
