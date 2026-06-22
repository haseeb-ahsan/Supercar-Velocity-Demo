"use client";

import { FormEvent, useState } from "react";
import { inputClass as baseInputClass, labelClass as baseLabelClass } from "@/lib/form-styles";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  // NOTE: Phase-0/1 frontend demo — no backend yet. Phase 2 wires this
  // to Zod + React Hook Form, a Lead row in Neon, a Resend
  // notification email, and Cloudflare Turnstile, same as the other
  // forms across the site.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-accent/40 bg-background px-6 py-10 text-center">
        <span className="block h-px w-10 bg-accent mx-auto mb-5" aria-hidden="true" />
        <p className="font-heading text-xl text-text mb-2">Message Sent</p>
        <p className="font-body text-sm text-text-muted">
          Thank you for getting in touch — a member of our team will reply soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
      <div>
        <label className={baseLabelClass}>Subject</label>
        <input
          type="text"
          placeholder="What is this regarding?"
          className={baseInputClass}
          required
        />
      </div>
      <div>
        <label className={baseLabelClass}>Message</label>
        <textarea
          rows={4}
          placeholder="How can we help?"
          className={baseInputClass}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-accent text-background font-body font-semibold text-sm tracking-wide uppercase py-3.5 hover:bg-text transition-colors duration-300"
      >
        Send Message
      </button>
    </form>
  );
}
