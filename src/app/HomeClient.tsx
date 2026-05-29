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
import { cn } from "@/lib/utils";
import { PdfListing } from "@/components/pdf/PdfListing";
import { TripleSplitImage } from "@/components/common/DynamicImages";

export function HomeClient() {
  const heroSteps = [
    {
      step: "01",
      title: "Send the plot context",
      desc: "Share plot number, goal, and expected use so we can anchor to verified sources.",
    },
    {
      step: "02",
      title: "We match official plans",
      desc: "We map your input to DSIRDA-aligned planning, zoning, and fee references.",
    },
    {
      step: "03",
      title: "Get actionable evidence",
      desc: "Receive the maps, fees, and compliance signals you need to move fast.",
    },
  ];

  const signalStrip = [
    {
      title: "DSIRDA-aligned sources",
      desc: "Every map is checked against official planning records.",
    },
    {
      title: "Planning-grade visuals",
      desc: "TP, DP, and zone context delivered in one place.",
    },
    {
      title: "Decision-ready outputs",
      desc: "Clear references for compliance and investment validation.",
    },
  ];

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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0b0f12] pt-24 pb-20 md:pt-32 md:pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-orange-600/30 blur-[120px] animate-float-soft" />
          <div
            className="absolute -bottom-32 right-[-40px] h-96 w-96 rounded-full bg-teal-500/30 blur-[140px] animate-float-soft"
            style={{ animationDelay: "1.5s" }}
          />
          <div className="absolute inset-0 bg-grid-sand opacity-15" />
        </div>

        <div className="container relative z-10 mx-auto grid items-center gap-12 px-4 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-orange-300 animate-fade-up">
              Verified DSIR Infrastructure Intelligence
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-up">
              The Official <span className="text-orange-500">Dholera Platform</span> for evidence-backed planning
            </h1>

            <p className="max-w-2xl text-lg text-slate-300 md:text-xl animate-fade-up">
              Access verified planning maps, TP maps, and live infrastructure signals. Move from plot context to
              compliance confidence with clarity and speed.
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row pt-2 animate-fade-up">
              <Link
                href="/clearance-engine"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-orange-500 sm:w-auto"
              >
                Start Free Pre-Screening
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/updates"
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                See Growth Updates
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
              {signalStrip.map((signal) => (
                <div
                  key={signal.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 backdrop-blur"
                >
                  <p className="font-display text-base font-semibold text-white">{signal.title}</p>
                  <p className="mt-2 text-xs text-slate-300">{signal.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-300">Context Pack</span>
              <span className="text-xs text-slate-400">Built for DSIR decisions</span>
            </div>

            <div className="mt-6 space-y-6">
              {heroSteps.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-black text-white">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-slate-300">
              Bring the plot details. We return the verified maps, zoning, and fees that matter most.
            </div>
          </div>
        </div>
      </section>

      {/* Core Loop Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-teal-600">Core Loop</p>
              <h2 className="font-display text-3xl font-bold text-slate-900 md:text-5xl">
                Context in, clarity out
              </h2>
              <p className="text-base text-slate-600">
                The fastest planning decisions come from tight loops. We help you supply the right context,
                convert it into verified evidence, and keep each step clear.
              </p>
            </div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
              Section by section precision
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {coreLoop.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">{item.step}</span>
                  <item.icon className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="bg-[#f2efe8] py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-10 max-w-2xl space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">Evidence Signals</p>
            <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
              Designed to remove guesswork
            </h2>
            <p className="text-slate-600">
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
              <div key={idx} className="flex flex-col items-start space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50">
                <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600")}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Feature Alignment: Interactive Tool & Project Gallery */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8 max-w-2xl space-y-3">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-teal-600">Visual Evidence</p>
            <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
              See the planning context in one glance
            </h2>
            <p className="text-sm text-slate-600">
              From boundary verification to infrastructure readiness, we surface the visuals that drive the decision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((idx) => (
              <TripleSplitImage key={idx} index={idx} height={240} />
            ))}
          </div>
        </div>
      </section>

      {/* Restored Gated PDF Access Logic */}
      <React.Suspense fallback={<div className="py-20 text-center font-black uppercase tracking-widest text-slate-400">Loading Intelligence...</div>}>
        <PdfListing />
      </React.Suspense>

      {/* Quality Bar Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto grid gap-10 px-4 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">Quality Bar</p>
            <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
              Every release is checked like a decision engine
            </h2>
            <p className="text-base text-slate-600">
              We review each section the same way you review a land decision. Clear labels, verified data, and
              zero broken flows.
            </p>
          </div>
          <div className="space-y-3">
            {qualityBar.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-teal-600" />
                <span className="text-sm font-semibold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-black uppercase tracking-[0.3em] text-orange-400">Why Dholera Platform?</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                As the primary <span className="font-bold text-white uppercase italic">Dholera Platform</span>, we bridge the gap between 
                complex urban planning data and investor accessibility. Our platform is built on the pillars of transparency, 
                verification, and real-time intelligence. 
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
