"use client";

import * as React from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  ShieldCheck,
  TrendingUp,
  BarChart3,
  FileText,
  CheckCircle2
} from "lucide-react";
import { PdfListing } from "@/components/pdf/PdfListing";

export function HomeClient() {
  const coreLoop = [
    {
      step: "01",
      title: "Context Pack",
      desc: "We collect only the inputs that impact DSIR planning decisions.",
      icon: FileText,
    },
    {
      step: "02",
      title: "Evidence Mapping",
      desc: "We translate raw plans into structured, investor-grade proof.",
      icon: ShieldCheck,
    },
    {
      step: "03",
      title: "Signal Review",
      desc: "You scan the exact signals that remove ambiguity and delay.",
      icon: BarChart3,
    },
    {
      step: "04",
      title: "Confidence to Act",
      desc: "Move forward with clarity on fees, zoning, and compliance.",
      icon: TrendingUp,
    },
  ];

  const qualityBar = [
    "No broken links or missing documents in the planning flow.",
    "Clear visual hierarchy for maps, fees, and compliance signals.",
    "Mobile-first layouts with zero horizontal scroll.",
    "Explicit upload timestamps for every official PDF release.",
    "Verified copy and labels aligned with DSIRDA terminology.",
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-24 pb-20 md:pt-32 md:pb-40 border-b border-slate-100">
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-4xl text-center space-y-10">
            <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-orange-600 animate-fade-up">
              Official Infrastructure Intelligence
            </div>

            <h1 className="font-display text-5xl font-black tracking-tight text-slate-900 sm:text-7xl lg:text-8xl uppercase leading-[0.95] animate-fade-up">
              Decide with <span className="text-orange-600 italic">Certainty</span> in Dholera SIR
            </h1>

            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-500 md:text-xl animate-fade-up-slow leading-relaxed">
              The primary platform for verified planning maps, TP maps, and real-time infrastructure tracking. 
              Accelerating professional land decisions with industrial-grade data.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4 animate-fade-up-slow">
              <Link
                href="/clearance-engine"
                className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-10 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600 sm:w-auto shadow-xl shadow-slate-900/10 hover:shadow-orange-600/20"
              >
                Launch Clearance Engine
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/updates"
                className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-10 text-sm font-black uppercase tracking-widest text-slate-900 transition-all hover:border-slate-400 sm:w-auto"
              >
                Growth Updates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Listing Section (Intelligence Hub) */}
      <div id="documents" className="bg-white">
        <React.Suspense fallback={<div className="py-32 text-center font-black uppercase tracking-widest text-slate-300 animate-pulse">Scanning Archives...</div>}>
          <PdfListing />
        </React.Suspense>
      </div>

      {/* Core Loop Section */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-24 text-center space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">The Loop</p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-6xl uppercase">
              How we turn data into <span className="text-orange-600 italic">Proof</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {coreLoop.map((item) => (
              <div
                key={item.step}
                className="group flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:-translate-y-2"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-slate-50 text-orange-600 border border-slate-100 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <item.icon className="h-8 w-8" />
                </div>
                <span className="mb-4 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-orange-600 transition-colors">Step {item.step}</span>
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-slate-900 mb-4">{item.title}</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Signals Section */}
      <section className="bg-white py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center mb-20 space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">Evidence Signals</p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight">
              Designed to <span className="text-orange-600 italic">Remove</span> Guesswork
            </h2>
            <p className="text-lg font-medium text-slate-500 leading-relaxed">
              We translate complex planning records into a clean decision surface. Each module is tuned for
              compliance, speed, and investor clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { 
                icon: ShieldCheck, 
                title: "Verified Compliance", 
                desc: "Every map and document is checked against official DSIRDA sources." 
              },
              { 
                icon: TrendingUp, 
                title: "Growth Evidence", 
                desc: "Track infrastructure progress with real updates and visual proof." 
              },
              { 
                icon: BarChart3, 
                title: "Decision Analytics", 
                desc: "Estimate fees, plot readiness, and investment outcomes with confidence." 
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-start space-y-6 rounded-3xl border border-slate-100 bg-slate-50/50 p-8 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/40">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-orange-600 shadow-md border border-slate-100">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-slate-900">{item.title}</h3>
                <p className="text-base font-medium text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Bar Section */}
      <section className="bg-slate-900 py-32 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-orange-600 opacity-5 blur-[120px] -translate-y-1/2" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-400">Institutional Integrity</p>
                <h2 className="font-display text-4xl font-black md:text-6xl uppercase leading-tight">
                  The Quality <span className="text-orange-400 italic">Bar</span>
                </h2>
              </div>
              <p className="text-xl text-slate-300 leading-relaxed font-medium">
                As the primary <span className="font-bold text-white uppercase italic tracking-wider">Dholera Platform</span>, we bridge the gap between 
                complex urban planning data and investor accessibility.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                 <div className="space-y-1">
                    <p className="text-4xl font-black text-white italic tracking-tighter uppercase">5,000+</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hectares Monitored</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-4xl font-black text-white italic tracking-tighter uppercase">100%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Data</p>
                 </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {qualityBar.map((item) => (
                <div key={item} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-slate-100">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
