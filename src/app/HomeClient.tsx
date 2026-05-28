"use client";

import * as React from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  ShieldCheck,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PdfListing } from "@/components/pdf/PdfListing";
import { TripleSplitImage } from "@/components/common/DynamicImages";

export function HomeClient() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-24 pb-20 md:pt-32 md:pb-40">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-orange-600 blur-[120px]" />
          <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-blue-600 blur-[120px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center md:px-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm font-bold text-orange-400">
              <span className="mr-2 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              India&apos;s First Operational Smart City
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              The Official <span className="text-orange-500">Dholera Platform</span> for Growth Intelligence
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-slate-300 md:text-xl">
              Access verified planning maps, TP maps, and real-time infrastructure data. 
              The most trusted portal for land investment compliance and growth evidence in DSIR.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
              <Link
                href="/clearance-engine"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-orange-500 sm:w-auto"
              >
                Start Free Pre-Screening
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                Consult an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { 
                icon: ShieldCheck, 
                title: "Verified Compliance", 
                desc: "Every map and document on Dholera Platform is verified against official DSIRDA data." 
              },
              { 
                icon: TrendingUp, 
                title: "Growth Evidence", 
                desc: "Track real-time development progress with infrastructure intelligence and on-ground reports." 
              },
              { 
                icon: BarChart3, 
                title: "Investment Analytics", 
                desc: "Calculate development fees and ROI metrics with our semantically powered engines." 
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl border border-slate-100 hover:border-orange-100 transition-colors">
                <div className={cn("flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600")}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Feature Alignment: Interactive Tool & Project Gallery */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
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

      {/* SEO Content Block */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-orange-500">Why Dholera Platform?</h2>
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
