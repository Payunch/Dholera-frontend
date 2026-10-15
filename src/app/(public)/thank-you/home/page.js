"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  X,
  CheckCircle2,
  MessageCircle,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Car,
  FileText,
  Home,
  Map,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { trackGoogleConversion } from "@/lib/conversionTracking";

function ThankYouHomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name") || "";
  const visitDate = searchParams.get("date") || "";

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
    // 1. Fire Google Ads Conversion Event for Homepage Site Visit / Lead
    trackGoogleConversion({
      label:
        process.env.NEXT_PUBLIC_GOOGLE_ADS_HOME_LABEL ||
        process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_LABEL ||
        "",
      value: 300.0,
      currency: "INR",
      transactionId: `home_lead_${Date.now()}`,
    });

    // 2. Fire Meta Pixel Lead Event
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: "homepage_site_visit_thank_you",
        value: 300.0,
        currency: "INR",
      });
    }

    // 3. Push to GTM dataLayer
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "conversion_thank_you_home_view",
        lead_source: "homepage_site_visit",
        page_location: window.location.href,
        page_path: "/thank-you/home",
      });
      window.dataLayer.push({
        event: "conversion_event_submit_lead_form",
        lead_source: "homepage_site_visit",
        value: 300.0,
        currency: "INR",
      });
      window.dataLayer.push({
        event: "conversion_event_submit_lead_form_2",
        lead_source: "homepage_site_visit",
        value: 300.0,
        currency: "INR",
      });
    }

    // 4. Fire GA4 custom conversion events
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion_event_submit_lead_form", {
        lead_source: "homepage_site_visit",
        value: 300.0,
        currency: "INR",
      });
      window.gtag("event", "conversion_event_submit_lead_form_2", {
        lead_source: "homepage_site_visit",
        value: 300.0,
        currency: "INR",
      });
      window.gtag("event", "conversion_event_home_thank_you", {
        lead_source: "homepage_site_visit",
      });
    }
  }, []);

  const formattedDate = visitDate
    ? new Date(visitDate).toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Next Available Slot";

  const whatsappMessage = userName
    ? `Hi Naresh, I am ${userName}. I just booked a Dholera Site Visit on the homepage for ${formattedDate}. Please confirm my itinerary and share the TP1/TP2 maps.`
    : `Hi Naresh, I just booked a Dholera Site Visit on the homepage for ${formattedDate}. Please confirm my itinerary and share the TP1/TP2 maps.`;

  const whatsappUrl = `https://wa.me/917435808031?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <main
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl text-slate-100 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300 cursor-pointer"
    >
      {/* Background Glow Accents */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Pop-up Modal Dialog Card (ARD) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full bg-slate-900/95 border border-slate-700/80 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl my-auto animate-in zoom-in-95 duration-300 z-10 cursor-default"
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

        {/* Top Success Badge */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-5">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="h-10 w-10 animate-in zoom-in-75 duration-300" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 items-center justify-center text-[10px] text-white">✓</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-orange-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Homepage Booking Confirmed
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-3">
            {userName ? `Thank You, ${userName}!` : "Thank You! Request Received"}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
            Your Dholera Smart City on-ground site visit request has been securely logged. Our senior infrastructure advisor will call you within{" "}
            <span className="text-orange-400 font-bold">15 minutes</span>.
          </p>
        </div>

        {/* Confirmed Schedule Card */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Requested Visit Date
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                {formattedDate}
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 text-xs font-bold text-emerald-400">
            <Clock className="h-4 w-4" /> Priority Verification Active
          </div>
        </div>

        {/* 3 Steps What Happens Next */}
        <div className="mb-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-orange-400" /> What Happens Next
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-black mb-3">
                1
              </div>
              <h3 className="text-xs font-bold uppercase text-white mb-1">
                Field Coordinator Call
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal">
                Naresh Gohel will call to verify your pickup point, schedule, and passenger count.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-black mb-3">
                2
              </div>
              <h3 className="text-xs font-bold uppercase text-white mb-1">
                VIP Private Transport
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal">
                Free private AC vehicle pickup with direct guided inspection of TP1, TP2 & Airport sites.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-black mb-3">
                3
              </div>
              <h3 className="text-xs font-bold uppercase text-white mb-1">
                Legal & Map Dossier
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal">
                Complimentary handover of official DSIRDA zoning guidelines and verified plot registry copies.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp & Call Direct Action Block */}
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-700/80 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">
              Need Instant Itinerary & Rate Card on WhatsApp?
            </h2>
          </div>
          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            Skip the phone call queue. Connect directly with Naresh Gohel on WhatsApp to receive the current TP1/TP2 rates and your visit pass immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white px-6 py-4 text-xs font-black uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-green-500/20 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp Now
            </a>
            <a
              href="tel:+917435808031"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 text-xs font-black uppercase tracking-wider border border-slate-700 transition-colors"
            >
              <Phone className="h-4 w-4 text-orange-400" />
              +91 74358 08031
            </a>
          </div>
        </div>

        {/* Quick Resource Links */}
        <div className="border-t border-slate-800 pt-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4 text-center">
            Continue Exploring Verified Dholera Data
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <Link
              href="/tp-maps"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition-colors py-1 px-2"
            >
              <Map className="h-3.5 w-3.5 text-orange-400" />
              Town Planning Maps
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition-colors py-1 px-2"
            >
              <Building2 className="h-3.5 w-3.5 text-orange-400" />
              Verified Projects
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link
              href="/investment-guide"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition-colors py-1 px-2"
            >
              <FileText className="h-3.5 w-3.5 text-orange-400" />
              Investment Guide
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition-colors py-1 px-2"
            >
              <Home className="h-3.5 w-3.5 text-orange-400" />
              Return Home
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
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

export default function ThankYouHomePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
          <div className="h-8 w-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </main>
      }
    >
      <ThankYouHomeContent />
    </Suspense>
  );
}
