"use client";

import { useState } from "react";

// Brief requires a "Share Vehicle Function" on the vehicle detail
// page. On phones/supported browsers this opens the native share
// sheet (Messages, WhatsApp, Email, etc). Where that API isn't
// available, it falls back to copying the link and shows brief
// confirmation text so the action still feels complete either way.
export default function ShareVehicleButton({ vehicleName }: { vehicleName: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({ title: vehicleName, url });
      } catch {
        // Person cancelled the native share sheet — not an error, do nothing.
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Share ${vehicleName}`}
      className="flex items-center gap-2 border border-text/30 px-4 py-3 font-body text-xs tracking-widest uppercase text-text hover:border-accent hover:text-accent transition-colors duration-300"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 .05.54l-7.1 4.13a3 3 0 1 0 0 4.66l7.1 4.13A3 3 0 1 0 18 16a2.99 2.99 0 0 0-2.83 2H15a3 3 0 0 0 .05-.54l-7.1-4.13a3 3 0 1 0 0-2.66l7.1-4.13A3 3 0 0 0 18 8Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
      {copied ? "Link Copied" : "Share"}
    </button>
  );
}
