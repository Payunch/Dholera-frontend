"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Phone, ArrowRight, ShieldCheck, Map, FileText, Home } from "lucide-react";
import { trackGoogleConversion } from "@/lib/conversionTracking";

export default function ThankYouPage() {
  useEffect(() => {
    // 1. Fire Google Ads Primary Conversion Event on /thank-you mount
    trackGoogleConversion({
      label: process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_LABEL || "",
      value: 200.0,
      currency: "INR",
      transactionId: `lead_${Date.now()}`,
    });

    // 2. Fire Meta Pixel Lead Event
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: "thank_you_page",
        value: 200.0,
        currency: "INR",
      });
    }

    // 3. Push pageview conversion event to dataLayer
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "conversion_thank_you_view",
        page_location: window.location.href,
        page_path: "/thank-you",
      });
    }
  }, []);

  const whatsappUrl = `https://wa.me/917435808031?text=${encodeURIComponent(
    "Hi Naresh, I just submitted an inquiry on Dholera Platform. Please share the TP1/TP2 land rate card and investment guide on WhatsApp."
  )}`;

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto w-full bg-slate-800/80 border border-slate-700/60 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-sm text-center">
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
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700 mb-8 text-left">
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
              href="tel:+917435808031"
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
          </div>
        </div>
      </div>
    </main>
  );
}
