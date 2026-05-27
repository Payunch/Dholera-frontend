"use client";

import { openConsentBanner } from "@/components/consent/ConsentBanner";

export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={openConsentBanner}
      className="hover:text-orange-600 transition-colors"
    >
      Cookie settings
    </button>
  );
}