"use client";

import React from "react";
import Link from "next/link";
import { 
  Map, 
  Smartphone, 
  MessageSquare, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  Car
} from "lucide-react";

export function BlogLeadMagnets({ blogTitle = "Dholera Smart City Update", slug = "" }) {
  const whatsappMessage = encodeURIComponent(
    `Hello Naresh, I was reading your article "${blogTitle}" on Dholera Platform. I want more details on verified plots and the latest TP master plan.`
  );

  return (
    <section className="my-14 space-y-8 rounded-[2.5rem] border border-orange-500/20 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
      {/* Glow decorations */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-[11px] font-black uppercase tracking-widest text-orange-400">
          <Sparkles className="h-3.5 w-3.5" />
          Investor Resource Center
        </div>
        <h3 className="mt-3 text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
          Download High-Res TP Maps & Free Investor Tools
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
          Planning an investment or tracking infrastructure in Dholera SIR? Access our verified GIS master plans, official mobile app, and free advisory.
        </p>
      </div>

      {/* Grid of Lead Magnets */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {/* Magnet 1: TP Maps */}
        <div className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all hover:border-orange-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-orange-500/10">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Map className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-400">
                Official GIS Maps
              </span>
              <h4 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors">
                Dholera TP 1 – TP 6 Maps
              </h4>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-normal">
                High-definition Town Planning master plans, road grid hierarchy, and zoning boundaries for all sectors.
              </p>
            </div>
          </div>
          <div className="pt-6">
            <Link
              href="/tp-maps"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 px-4 py-3 text-xs font-black uppercase tracking-wider text-white transition-all shadow-md shadow-orange-600/30"
            >
              <Download className="h-4 w-4" />
              View / Download Maps
            </Link>
          </div>
        </div>

        {/* Magnet 2: Android APK */}
        <div className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all hover:border-blue-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-blue-500/10">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">
                Official Mobile App
              </span>
              <h4 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Dholera Android APK
              </h4>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-normal">
                Real-time plot status, interactive GIS layers, push notifications for breaking news, and offline documents.
              </p>
            </div>
          </div>
          <div className="pt-6">
            <Link
              href="/download"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-3 text-xs font-black uppercase tracking-wider text-white transition-all shadow-md shadow-blue-600/30"
            >
              <Download className="h-4 w-4" />
              Get Android APK
            </Link>
          </div>
        </div>

        {/* Magnet 3: WhatsApp VIP Advisory & Free Site Visit */}
        <div className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all hover:border-emerald-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-emerald-500/10">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                Free Investor Support
              </span>
              <h4 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                1-on-1 WhatsApp Advisory
              </h4>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-normal">
                Direct guidance from Naresh Gohel on NA/NOC clear titles, registry verification, and free site visit cab from Ahmedabad.
              </p>
            </div>
          </div>
          <div className="pt-6">
            <a
              href={`https://wa.me/917435808031?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-3 text-xs font-black uppercase tracking-wider text-white transition-all shadow-md shadow-emerald-600/30"
            >
              <MessageSquare className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="relative z-10 pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 text-[11px] text-slate-300 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>100% Free Resources &bull; Government Master Plan Aligned</span>
        </div>
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-orange-400" />
          <Link href="/#site-visit" className="text-orange-400 hover:underline font-bold">
            Book Weekend Site Visit Cab &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
