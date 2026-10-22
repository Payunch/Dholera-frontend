"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  X,
  CheckCircle2,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  FileText,
  Home,
  Map,
  Building2,
  Sparkles,
  ArrowRight,
  Download
} from "lucide-react";

function ThankYouContactContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawName = searchParams.get("name") || "";
  const cleanName = rawName.trim();

  const handleClose = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/contact");
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Deduplicated Page View Tracking (Prevents refresh inflation)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const dedupeKey = `ty_contact_view_${cleanName || "lead"}`;
    if (!sessionStorage.getItem(dedupeKey)) {
      sessionStorage.setItem(dedupeKey, "true");

      if (window.dataLayer) {
        window.dataLayer.push({
          event: "thank_you_contact_view",
          lead_source: "contact_page",
          page_location: window.location.href,
          page_path: "/thank-you/contact",
        });
      }

      if (window.gtag) {
        window.gtag("event", "page_view", {
          page_title: "Thank You Contact",
          page_location: window.location.href,
          page_path: "/thank-you/contact",
        });
      }
    }
  }, [cleanName]);

  const whatsappMessage = cleanName
    ? `Hi Naresh, I am ${cleanName}. I just submitted an inquiry on Dholera Platform regarding verified plot availability, TP master plans, and investment options. Please share the details.`
    : `Hi Naresh, I just submitted an inquiry on Dholera Platform regarding verified plot availability, TP master plans, and investment options. Please share the details.`;

  const whatsappUrl = `https://wa.me/918200448270?text=${encodeURIComponent(
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

        {/* 1. Top Success Badge & Dynamic Headline */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            <div className="w-18 h-18 sm:w-20 sm:h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="h-9 w-9 sm:h-10 sm:w-10 animate-in zoom-in-75 duration-300" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 items-center justify-center text-[10px] text-white font-bold">✓</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-black uppercase tracking-widest text-orange-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" /> Direct Advisory Inquiry Registered
          </div>

          {/* Fallback-safe Dynamic Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
            {cleanName ? `Thank You, ${cleanName}!` : "Thank You! Inquiry Received"}
          </h1>

          {/* Realistic SLA: 2 to 4 hours */}
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
            Your inquiry has been assigned directly to Senior Dholera Advisor{" "}
            <span className="text-white font-bold">Naresh Gohel</span>. You will receive a personalized response within{" "}
            <span className="text-orange-400 font-bold">2 to 4 business hours</span> (or instantly via WhatsApp below).
          </p>
        </div>

        {/* 2. Elevated WhatsApp Primary CTA (Directly below header) */}
        <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-5 sm:p-6 mb-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                  Instant Response Available
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Need Faster Answers? Chat on WhatsApp
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 max-w-md">
                Connect directly with Naresh Gohel on WhatsApp for immediate rate cards, plot availability, and site visit bookings.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white px-6 py-3.5 text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-green-500/25 hover:scale-102 active:scale-98 shrink-0 w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp Directly
            </a>
          </div>
        </div>

        {/* 3. Immediate Value Lead Magnet (Download Maps / Due Diligence Guide) */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-orange-400" />
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">
                While You Wait: Free Investor Tools
              </span>
            </div>
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
              Instant Access
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/tp-maps"
              className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all hover:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                  <Map className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                    Official TP 1 – TP 6 Maps
                  </h4>
                  <p className="text-[10px] text-slate-400">High-res GIS master planning files</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/investment-guide"
              className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all hover:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    Investor Due Diligence Guide
                  </h4>
                  <p className="text-[10px] text-slate-400">NA/NOC title verification checklist</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        {/* 4. Realistic SLA & What to Expect */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-orange-400" /> What to Expect Next
            </h2>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
              <Clock className="h-3 w-3 text-orange-400" /> Response: 2–4 Hours (Same Day)
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
              <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-black mb-2.5">
                1
              </div>
              <h3 className="text-xs font-bold uppercase text-white mb-1">
                Direct Founder Review
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal">
                No middlemen or call center queues. Naresh Gohel personally analyzes your inquiry.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-black mb-2.5">
                2
              </div>
              <h3 className="text-xs font-bold uppercase text-white mb-1">
                Verified Title Check
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal">
                Instant verification of NA clear title status, DSIRDA compliance, and boundary coordinates.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-black mb-2.5">
                3
              </div>
              <h3 className="text-xs font-bold uppercase text-white mb-1">
                Transparent Rate Card
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal">
                Realistic market valuation benchmarks for TP1, TP2, and Expressway commercial corridors.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Consolidated Clean Direct Action Bar (No Redundancy) */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <a
              href="tel:+918200448270"
              className="flex items-center gap-2.5 py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-colors"
            >
              <Phone className="h-4 w-4 text-orange-400 shrink-0" />
              <span className="font-bold text-slate-200">Call: +91 82004 48270</span>
            </a>

            <a
              href="mailto:gohelnaresh7707@gmail.com"
              className="flex items-center gap-2.5 py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-colors"
            >
              <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="font-bold text-slate-200">Email: gohelnaresh7707@gmail.com</span>
            </a>

            <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-slate-400">
              <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
              <span className="font-medium">DSIR, Gujarat</span>
            </div>
          </div>
        </div>

        {/* 6. Footer Navigation & Close */}
        <div className="border-t border-slate-800/80 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-medium">
          <div className="flex flex-wrap items-center gap-3 text-slate-400">
            <Link href="/projects" className="hover:text-orange-400 transition-colors">
              Verified Projects
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-orange-400 transition-colors">
              Return Home
            </Link>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl px-4 py-2 transition-colors cursor-pointer text-xs font-bold"
          >
            <X className="h-3.5 w-3.5 text-orange-400" />
            Close Window
          </button>
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
