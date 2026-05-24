"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Map, 
  Layers, 
  FileText, 
  Search, 
  Lock, 
  FileType, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: 0, label: "Official Documents", icon: FileText },
  { id: 1, label: "Town Planning (TP) Maps", icon: Layers },
  { id: 2, label: "Development Plan (DP) Maps", icon: Map },
];

export function HomeClient() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [search, setSearch] = React.useState("");

  const scrollToDocuments = () => {
    const el = document.getElementById("document-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-24 pb-20 md:pt-32 md:pb-40">
        {/* Decorative background elements */}
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

            {/* Quick Access Categories */}
            <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6 pt-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id);
                    scrollToDocuments();
                  }}
                  className={cn(
                    "flex flex-col items-center gap-4 rounded-2xl border p-6 transition-all",
                    activeTab === cat.id
                      ? "border-orange-500 bg-orange-500/10 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                      : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  <cat.icon className="h-10 w-10" />
                  <span className="font-bold uppercase tracking-wider text-sm">{cat.label}</span>
                </button>
              ))}
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
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tool Teaser */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center text-center space-y-6 mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 md:text-5xl">
              Project Clearance & Fee Engine
            </h2>
            <p className="max-w-2xl text-lg text-slate-600 font-medium">
              Instantly verify zoning compliance and calculate official DSIRDA development permission fees. 
              Our semantic engine provides instant answers for your land development queries.
            </p>
          </div>
          
          <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-12">
             {/* Placeholder for PreScreeningWizard */}
             <div className="flex flex-col items-center justify-center space-y-8 py-12">
                <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center">
                  <ShieldCheck className="h-10 w-10 text-orange-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">System Initialization</h4>
                  <p className="text-slate-500 font-medium italic">Our semantic clearance engine is analyzing regional zoning data...</p>
                </div>
                <Link
                  href="/clearance-engine"
                  className="rounded-full bg-slate-900 px-10 py-4 text-white font-bold transition-transform hover:scale-105 active:scale-95"
                >
                  Access Full Tool
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Document Section */}
      <section id="document-section" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl uppercase tracking-tighter">
                {categories[activeTab].label}
              </h2>
              <p className="text-slate-500 font-bold tracking-widest text-xs uppercase italic">
                Browsing Verified Dholera Platform Data
              </p>
            </div>
            
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search TP maps, brochures, or legal docs..."
                className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 font-semibold text-slate-900 outline-none transition-all focus:border-orange-600 focus:bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Document Grid Placeholder */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group overflow-hidden rounded-3xl border border-slate-100 bg-white transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-orange-200">
                <div className="relative aspect-[4/3] bg-slate-100 flex items-center justify-center">
                  <FileType className="h-16 w-16 text-slate-300 transition-transform group-hover:scale-110" />
                  <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white shadow-lg">
                    <Lock className="h-4 w-4" />
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">Verification Required</span>
                    <h4 className="text-lg font-extrabold text-slate-900 leading-tight">Dholera Smart City {categories[activeTab].label.split(' ')[0]} Data {i}</h4>
                  </div>
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-bold text-white transition-all group-hover:bg-orange-600">
                    Unlock Document
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="rounded-full border-2 border-orange-600 px-12 py-4 text-orange-600 font-bold transition-all hover:bg-orange-600 hover:text-white">
              Load More Intel
            </button>
          </div>
        </div>
      </section>

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/10">
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold flex items-center gap-3">
                  <span className="h-1.5 w-8 bg-orange-600 rounded-full" />
                  Strategic TP Mapping
                </h3>
                <p className="text-slate-400 font-medium">
                  We provide the most accurate Town Planning (TP) maps for all 6 TP schemes in Dholera SIR, 
                  allowing users to visualize the exact plot locations, road widths, and zoning overlays.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold flex items-center gap-3">
                  <span className="h-1.5 w-8 bg-orange-600 rounded-full" />
                  Infrastructure Evidence
                </h3>
                <p className="text-slate-400 font-medium">
                  Dominate your investment strategy with verified evidence of the Dholera International Airport, 
                  DMIC corridor connectivity, and the activation area progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
