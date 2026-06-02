"use client";

import { useEffect, useRef, useState } from "react";
import { safeLocalStorage } from "@/utils/storage";

type ConsentChoice = "accepted" | "rejected";

const CONSENT_STORAGE_KEY = "analytics_consent_choice";
const OPEN_CONSENT_EVENT = "open-consent-banner";

function updateGoogleConsent(choice: ConsentChoice) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  const granted = choice === "accepted";

  window.gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const feedbackTimerRef = useRef<number | null>(null);

  const clearFeedbackTimer = () => {
    if (feedbackTimerRef.current) {
      window.clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
  };

  useEffect(() => {
    setMounted(true);
    const storedChoice = safeLocalStorage.getItem(CONSENT_STORAGE_KEY) as ConsentChoice | null;
    
    // Only show if no choice has been made
    if (storedChoice !== "accepted" && storedChoice !== "rejected") {
      setIsVisible(true);
    }

    if (storedChoice === "accepted" || storedChoice === "rejected") {
      updateGoogleConsent(storedChoice);
    }
  }, []);

  useEffect(() => {
    return () => {
      clearFeedbackTimer();
    };
  }, []);

  useEffect(() => {
    const handleOpenBanner = () => setIsVisible(true);

    window.addEventListener(OPEN_CONSENT_EVENT, handleOpenBanner);

    return () => {
      window.removeEventListener(OPEN_CONSENT_EVENT, handleOpenBanner);
    };
  }, []);

  const handleChoice = (choice: ConsentChoice) => {
    safeLocalStorage.setItem(CONSENT_STORAGE_KEY, choice);
    updateGoogleConsent(choice);
    clearFeedbackTimer();
    setStatusMessage(choice === "accepted" ? "Preferences saved. Analytics enabled." : "Preferences saved. Analytics disabled.");
    setIsVisible(false);

    feedbackTimerRef.current = window.setTimeout(() => {
      setStatusMessage(null);
      feedbackTimerRef.current = null;
    }, 2400);
  };

  if (!mounted) return null;

  return (
    <>
      {statusMessage && (
        <div className="fixed inset-x-0 bottom-4 z-[1000] px-4 pointer-events-auto">
          <div className="mx-auto max-w-md rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-lg shadow-emerald-950/10 animate-fade-up">
            {statusMessage}
          </div>
        </div>
      )}

      {isVisible && (
        <div className="fixed inset-x-0 bottom-0 z-[1000] px-4 pb-4 pointer-events-auto">
          <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur md:flex-row md:items-center md:justify-between animate-fade-up">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900">Cookies and analytics</p>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                We use Google Analytics to understand traffic and improve the site. Accept to allow analytics cookies, or reject to keep them disabled.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => handleChoice("rejected")}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => handleChoice("accepted")}
                className="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function openConsentBanner() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}