"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, CheckCircle2, MessageCircle, Phone, ArrowRight, ShieldCheck, Map, FileText, Home } from "lucide-react";
import { trackGoogleConversion } from "@/lib/conversionTracking";

export default function ThankYouPage() {
  const router = useRouter();

  const handleClose = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  useEffect(() => {
    // Standard view event only (prevent duplicate conversion counts)
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "thank_you_view",
        page_location: window.location.href,
        page_path: "/thank-you",
      });
    }

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Thank You",
        page_location: window.location.href,
        page_path: "/thank-you",
      });
    }
  }, []);

  const whatsappUrl = `https://wa.me/918200448270?text=${encodeURIComponent(
    "Hi Naresh, I just submitted an inquiry on Dholera Platform. Please share the TP1/TP2 land rate card and investment guide on WhatsApp."
  )}`;

  return (
    <main
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl text-slate-100 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full bg-slate-900/95 border border-slate-700/80 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-center my-auto animate-in zoom-in-95 duration-300 cursor-default"
      >
        {/* Corner Close Icon Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 group z-30"
          aria-label="Close dialog"
          title="Close dialog"
        >
          <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200 text-slate-300 group-hover:text-white" />
        </button>

        {/* Success Badge */}
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">
          <ShieldCheck className="h-4 w-4" /> Inquiry Registered Successfully
        </div>

        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-4">
          Thank You! Your Request Has Been Logged
        </h1>

        <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
          Our senior Dholera infrastructure advisor will review your requested TP zone and contact you within <span className="text-orange-400 font-bold">15 minutes</span> with verified plot details and government zoning maps.
        </p>

        {/* Instant Fast-Track CTA */}
        <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 mb-8 text-left">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Need Instant Details on WhatsApp?
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Skip the phone call wait. Tap below to receive the latest Dholera TP1 & TP2 rate card and PDF master plan instantly on your WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3.5 text-sm font-black uppercase tracking-wider transition-transform hover:-translate-y-0.5 shadow-lg shadow-green-500/20"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <a
              href="tel:+918200448270"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white px-6 py-3.5 text-sm font-black uppercase tracking-wider transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call Advisor
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div className="border-t border-slate-700/60 pt-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Continue Exploring Verified Data
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <Link
              href="/tp-maps"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition-colors"
            >
              <Map className="h-3.5 w-3.5" />
              Town Planning Maps
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/investment-guide"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              Due Diligence Guide
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
              Back to Home
            </Link>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg px-3 py-1 transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5 text-orange-400" />
              Close Popup
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
