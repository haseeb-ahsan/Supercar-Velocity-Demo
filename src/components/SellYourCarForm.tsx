'use client';

import { FormEvent, useState } from 'react';
import { inputClass as baseInputClass, labelClass as baseLabelClass } from '@/lib/form-styles';

const CONDITIONS = ['Excellent', 'Very Good', 'Good', 'Fair', 'Needs Work'];

export default function SellYourCarForm() {
  const [submitted, setSubmitted] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);

  // NOTE: this is a Phase-0/1 frontend demo — there is no backend yet,
  // so submitting just shows a local success state. Phase 2 of the
  // build guide wires this to Zod + React Hook Form, a Lead row in
  // Neon, a Resend notification email, Cloudflare Turnstile, and
  // Cloudinary for the uploaded photos.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-accent/40 bg-background px-6 py-10 text-center">
        <span className="block h-px w-10 bg-accent mx-auto mb-5" aria-hidden="true" />
        <p className="font-heading text-xl text-text mb-2">Submission Received</p>
        <p className="font-body text-sm text-text-muted">
          Thank you — our valuation team will review your vehicle and be in touch within
          one business day. Your vehicle will not be advertised without your approval.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="font-heading text-xl text-text mb-1">Vehicle Submission</h3>
      <p className="font-body text-xs text-text-muted mb-5">
        Submitted for valuation only. Nothing is advertised without your approval.
      </p>

      <div>
        <label className={baseLabelClass}>Vehicle Registration</label>
        <input
          type="text"
          placeholder="e.g. AB12 CDE"
          className={baseInputClass}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={baseLabelClass}>Make</label>
          <input type="text" placeholder="Ferrari" className={baseInputClass} required />
        </div>
        <div>
          <label className={baseLabelClass}>Model</label>
          <input type="text" placeholder="296 GTB" className={baseInputClass} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={baseLabelClass}>Year</label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="2023"
            className={baseInputClass}
            required
          />
        </div>
        <div>
          <label className={baseLabelClass}>Mileage</label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="1,200"
            className={baseInputClass}
            required
          />
        </div>
      </div>

      <div>
        <label className={baseLabelClass}>Condition</label>
        <select className={baseInputClass} required defaultValue="">
          <option value="" disabled>
            Select condition&hellip;
          </option>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={baseLabelClass}>Asking Price</label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="£0"
          className={baseInputClass}
          required
        />
      </div>

      <div>
        <label className={baseLabelClass}>Upload Photos</label>
        <label
          className={`${baseInputClass} flex cursor-pointer items-center justify-between text-text-muted hover:border-accent transition-colors duration-300`}
        >
          <span>
            {photoCount > 0
              ? `${photoCount} photo${photoCount === 1 ? '' : 's'} selected`
              : 'Choose files…'}
          </span>
          <span className="text-accent text-xs tracking-widest uppercase">Browse</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => setPhotoCount(e.target.files?.length ?? 0)}
          />
        </label>
        <p className="mt-1.5 font-body text-[11px] text-text-muted">
          A few clear exterior and interior shots help us value your vehicle accurately.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={baseLabelClass}>Full Name</label>
          <input type="text" placeholder="Jane Doe" className={baseInputClass} required />
        </div>
        <div>
          <label className={baseLabelClass}>Mobile</label>
          <input
            type="tel"
            placeholder="+1 000 000 0000"
            className={baseInputClass}
            required
          />
        </div>
      </div>
      <div>
        <label className={baseLabelClass}>Email</label>
        <input
          type="email"
          placeholder="jane@example.com"
          className={baseInputClass}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-accent text-background font-body font-semibold text-sm tracking-wide uppercase py-3.5 hover:bg-text transition-colors duration-300"
      >
        Submit For Valuation
      </button>
    </form>
  );
}
