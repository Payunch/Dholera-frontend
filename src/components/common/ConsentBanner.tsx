"use client";

import { useState, useEffect } from "react";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleConsent = (granted: boolean) => {
    localStorage.setItem("cookie_consent", granted ? "granted" : "denied");
    setShow(false);

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: granted ? "granted" : "denied",
        analytics_storage: granted ? "granted" : "denied",
      });
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-2xl z-[100] animate-in slide-in-from-bottom-5">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-2">We value your privacy</h3>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => handleConsent(true)}
          className="flex-1 bg-[#FF7A00] hover:bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl transition-all shadow-md shadow-orange-600/20"
        >
          Accept All
        </button>
        <button
          onClick={() => handleConsent(false)}
          className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest py-3 rounded-xl transition-all"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
