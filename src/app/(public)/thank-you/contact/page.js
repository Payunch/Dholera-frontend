"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Home,
  Map,
  Building2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { trackGoogleConversion } from "@/lib/conversionTracking";

function ThankYouContactContent() {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name") || "";

  useEffect(() => {
    // 1. Fire Google Ads Primary Conversion Event for Contact Inquiry
    trackGoogleConversion({
      label:
        process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL ||
        process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_LABEL ||
        "",
      value: 200.0,
      currency: "INR",
      transactionId: `contact_lead_${Date.now()}`,
    });

    // 2. Fire Meta Pixel Lead Event
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: "contact_page_thank_you",
        value: 200.0,
        currency: "INR",
      });
    }

    // 3. Push to GTM dataLayer
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "conversion_thank_you_contact_view",
        lead_source: "contact_page",
        page_location: window.location.href,
        page_path: "/thank-you/contact",
      });
      window.dataLayer.push({
        event: "conversion_event_submit_lead_form",
        lead_source: "contact_page",
        value: 200.0,
        currency: "INR",
      });
      window.dataLayer.push({
        event: "conversion_event_submit_lead_form_2",
        lead_source: "contact_page",
        value: 200.0,
        currency: "INR",
      });
    }

    // 4. Fire GA4 custom events (including both imported Google Ads identifiers)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion_event_submit_lead_form", {
        lead_source: "contact_page",
        value: 200.0,
        currency: "INR",
      });
      window.gtag("event", "conversion_event_submit_lead_form_2", {
        lead_source: "contact_page",
        value: 200.0,
        currency: "INR",
      });
      window.gtag("event", "conversion_event_contact", {
        lead_source: "contact_page",
      });
      window.gtag("event", "conversion_event_contact_thank_you", {
        lead_source: "contact_page",
      });
    }
  }, []);

  const whatsappMessage = userName
    ? `Hi Naresh, I am ${userName}. I just submitted an inquiry on the Dholera Platform Contact page. Please share verified plot details and investment opportunities.`
    : `Hi Naresh, I just submitted an inquiry on the Dholera Platform Contact page. Please share verified plot details and investment opportunities.`;

  const whatsappUrl = `https://wa.me/917435808031?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full bg-slate-900/90 border border-slate-800 rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-md relative z-10">
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
            <Sparkles className="h-3.5 w-3.5" /> Direct Advisory Inquiry Registered
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-3">
            {userName ? `Thank You, ${userName}!` : "Thank You! Inquiry Received"}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
            Your message has been assigned directly to Senior Dholera Advisor{" "}
            <span className="text-white font-bold">Naresh Gohel</span>. You will receive a direct response within{" "}
            <span className="text-orange-400 font-bold">15 minutes</span>.
          </p>
        </div>

        {/* Priority SLA Notification */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Guaranteed Advisory Window
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                Under 15 Minutes Response SLA
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 text-xs font-bold text-emerald-400">
            <ShieldCheck className="h-4 w-4" /> 100% Confidential
          </div>
        </div>

        {/* 3 Pillars of Contact Due Diligence */}
        <div className="mb-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-orange-400" /> What to Expect
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-black mb-3">
                1
              </div>
              <h3 className="text-xs font-bold uppercase text-white mb-1">
                Direct Founder Access
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal">
                No middlemen or call center agents. Direct consultation with ground-level experts.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-black mb-3">
                2
              </div>
              <h3 className="text-xs font-bold uppercase text-white mb-1">
                Verified Title Check
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal">
                Instant verification of NA orders, DSIRDA clearance, and micro-zone boundary maps.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-black mb-3">
                3
              </div>
              <h3 className="text-xs font-bold uppercase text-white mb-1">
                Transparent Pricing
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal">
                Clear price benchmarks for TP1, TP2, and Expressway commercial plots.
              </p>
            </div>
          </div>
        </div>

        {/* Direct Channels Contact Card */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 mb-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
            Direct Reach Channels
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <a
              href="tel:+917435808031"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-colors"
            >
              <Phone className="h-4 w-4 text-orange-400 shrink-0" />
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold">Hotline</span>
                <span className="font-bold text-slate-200">+91 74358 08031</span>
              </div>
            </a>

            <a
              href="mailto:gohelnaresh7707@gmail.com"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-colors"
            >
              <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold">Email</span>
                <span className="font-bold text-slate-200 truncate block">gohelnaresh...</span>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
              <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold">Location</span>
                <span className="font-bold text-slate-200">DSIR, Gujarat</span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Fast-Track Action Block */}
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-700/80 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">
              Need Faster Answers on WhatsApp?
            </h2>
          </div>
          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            Message Naresh Gohel directly on WhatsApp to get instant answers regarding land availability, rates, and Town Planning schemes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white px-6 py-4 text-xs font-black uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-green-500/20 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp Directly
            </a>
            <a
              href="tel:+917435808031"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 text-xs font-black uppercase tracking-wider border border-slate-700 transition-colors"
            >
              <Phone className="h-4 w-4 text-orange-400" />
              Call Advisor
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
              Due Diligence Guide
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition-colors py-1 px-2"
            >
              <Home className="h-3.5 w-3.5 text-orange-400" />
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ThankYouContactPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
          <div className="h-8 w-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </main>
      }
    >
      <ThankYouContactContent />
    </Suspense>
  );
}
