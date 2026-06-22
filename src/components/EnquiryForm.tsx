
'use client';

import { FormEvent, useState } from 'react';
import {
  inputClass as baseInputClass,
  labelClass as baseLabelClass,
} from '@/lib/form-styles';
import { MOCK_VEHICLES } from '@/lib/mock-vehicles';

type Variant = 'finance' | 'reserve' | 'general';

const COPY: Record<
  Variant,
  { title: string; submitLabel: string; successCopy: string }
> = {
  finance: {
    title: 'Finance Enquiry',
    submitLabel: 'Request Finance Quote',
    successCopy:
      'Thank you — a finance specialist will be in touch within one business day.',
  },
  reserve: {
    title: 'Reserve This Vehicle',
    submitLabel: 'Reserve Vehicle',
    successCopy:
      'Thank you — our sales team will call to confirm your reservation shortly.',
  },
  general: {
    title: 'General Enquiry',
    submitLabel: 'Send Enquiry',
    successCopy: "Thank you — we've received your message and will reply soon.",
  },
};

export default function EnquiryForm({
  variant = 'general', // Set a default value here
  vehicleName,
  vehicleLocked = true, // true when reached from a specific vehicle's page
}: {
  variant?: Variant; // Make it optional with ?
  vehicleName: string;
  vehicleLocked?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);

  // Use 'general' if variant is undefined
  const currentVariant = variant || 'general';
  const { title, submitLabel, successCopy } = COPY[currentVariant];

  // NOTE: this is a Phase-0/1 frontend demo — there is no backend yet,
  // so submitting just shows a local success state. Phase 2 of the
  // build guide wires this to Zod + React Hook Form, a Lead row in
  // Neon, a Resend notification email, and Cloudflare Turnstile.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className='border border-accent/40 bg-background px-6 py-10 text-center'>
        <span
          className='block h-px w-10 bg-accent mx-auto mb-5'
          aria-hidden='true'
        />
        <p className='font-heading text-xl text-text mb-2'>Request Received</p>
        <p className='font-body text-sm text-text-muted'>{successCopy}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <h3 className='font-heading text-xl text-text mb-1'>{title}</h3>

      {vehicleLocked ? (
        <p className='font-body text-xs text-text-muted mb-5'>
          Regarding the {vehicleName}
        </p>
      ) : (
        <div className='mb-1'>
          <label className={baseLabelClass}>Vehicle of Interest</label>
          <select className={baseInputClass} defaultValue="">
            <option value="" disabled>
              Select a vehicle&hellip;
            </option>
            {MOCK_VEHICLES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.year} {v.make} {v.model}
              </option>
            ))}
            <option value="other">Other / Not Currently Listed</option>
          </select>
        </div>
      )}

      {variant === 'finance' && (
        <>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className={baseLabelClass}>Deposit Amount</label>
              <input
                type='text'
                inputMode='numeric'
                placeholder='$0'
                className={baseInputClass}
              />
            </div>
            <div>
              <label className={baseLabelClass}>Annual Income</label>
              <input
                type='text'
                inputMode='numeric'
                placeholder='$0'
                className={baseInputClass}
              />
            </div>
          </div>
          <div>
            <label className={baseLabelClass}>Employment Status</label>
            <select className={baseInputClass}>
              <option>Employed</option>
              <option>Self-Employed</option>
              <option>Company Director</option>
              <option>Retired</option>
            </select>
          </div>
        </>
      )}

      {variant === 'reserve' && (
        <>
          <div>
            <label className={baseLabelClass}>Preferred Viewing Date</label>
            <input
              type='date'
              className={baseInputClass}
              required
            />
          </div>
          <div>
            <label className={baseLabelClass}>Notes</label>
            <textarea
              rows={3}
              placeholder='Anything specific you would like us to know...'
              className={baseInputClass}
            />
          </div>
        </>
      )}

      {variant === 'general' && (
        <div>
          <label className={baseLabelClass}>Message</label>
          <textarea
            rows={3}
            placeholder="I'd like to know more about..."
            className={baseInputClass}
          />
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div>
          <label className={baseLabelClass}>Full Name</label>
          <input
            type='text'
            placeholder='Jane Doe'
            className={baseInputClass}
            required
          />
        </div>
        <div>
          <label className={baseLabelClass}>Mobile</label>
          <input
            type='tel'
            placeholder='+1 000 000 0000'
            className={baseInputClass}
            required
          />
        </div>
      </div>
      <div>
        <label className={baseLabelClass}>Email</label>
        <input
          type='email'
          placeholder='jane@example.com'
          className={baseInputClass}
          required
        />
      </div>

      <button
        type='submit'
        className='w-full bg-accent text-background font-body font-semibold text-sm tracking-wide uppercase py-3.5 hover:bg-text transition-colors duration-300'
      >
        {submitLabel}
      </button>
    </form>
  );
}


