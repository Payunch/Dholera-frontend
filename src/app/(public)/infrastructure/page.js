"use client";

import React from 'react';
import Image from 'next/image';
import { Cpu, Zap, Road, CheckCircle2, ArrowRight, ShieldCheck, Layers, Building2, Sun, Droplets, Network } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/providers/LanguageProvider';

export default function InfrastructurePage() {
  const { t } = useLanguage();
  const plainText = (key) => (t(key) || '').replace(/<[^>]*>/g, "");

  const utilityPillars = [
    {
      title: "Subterranean Smart Utility Ducts",
      icon: Network,
      metrics: "6-Compartment Integrated Ducts",
      desc: "All civic utilities—potable water, recycled water, 66 kV power cables, piped natural gas, storm drainage, and multi-core fiber—run through concrete underground trenches. Road digging is permanently eliminated.",
      tags: ["Zero Road Digging", "Sub-Surface Trenches", "Plug-and-Play"]
    },
    {
      title: "Tata Semiconductor Fab & Anchor Park",
      icon: Cpu,
      metrics: "₹91,000 Cr Mega Investment",
      desc: "Tata Electronics and Taiwan's PSMC anchor India's flagship 28nm & 40nm chip fabrication facility inside the Activation Area, supported by dedicated high-voltage uninterrupted power and industrial gas lines.",
      tags: ["Commercial Fab", "Vendor Ecosystem", "High-Tech Manufacturing"]
    },
    {
      title: "4,400 MW Dholera Solar Park",
      icon: Sun,
      metrics: "Asia's Largest Solar Installation",
      desc: "Massive coastal solar generation facility providing 100% renewable power blending to industrial operations, connected to Gujarat Energy Transmission Corporation (GETCO) 765 kV pooling stations.",
      tags: ["Green Energy", "Low Industrial Tariff", "Zero Carbon Target"]
    },
    {
      title: "ABCD Command & Operations Center",
      icon: Building2,
      metrics: "IGBC Platinum Smart Center",
      desc: "Administrative and Business Center for Dholera (ABCD). Hosts city-wide SCADA monitoring, automated flood sensor telemetry, intelligent traffic control, and unified municipal governance under one roof.",
      tags: ["City Brain", "Central SCADA", "24/7 Monitoring"]
    },
    {
      title: "Zero Liquid Discharge (ZLD) Water Grid",
      icon: Droplets,
      metrics: "100 MLD Capacity with Dual Piping",
      desc: "Closed-loop water conservation with 100 MLD water treatment, 10 MLD sewage treatment plant, and dual-piping supplying tertiary-treated water for industrial cooling and landscape irrigation.",
      tags: ["ZLD Compliant", "Recycled Water", "Narmada Canal Sourced"]
    },
    {
      title: "Multi-Modal Arterial Road Network",
      icon: Road,
      metrics: "55m to 250m Central Boulevards",
      desc: "Heavy-load concrete pavements engineered to transport super-dimensional industrial cargo directly between the NH-751 Expressway, Dholera Airport, and Dholera Port corridors.",
      tags: ["High-Load Pavements", "Expressway Linked", "Cycle & Transit Tracks"]
    }
  ];

  return (
    <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen w-full overflow-x-hidden dark:bg-slate-900">
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[65vh] flex items-center bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image 
            src="/images/arialviewdholeraexpress.webp" 
            alt="Dholera Smart Infrastructure" 
            fill 
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="max-w-4xl space-y-6 pt-24">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 bg-orange-600/20 px-4 py-1.5 rounded-full border border-orange-500/30">
              Plug-and-Play Trunk Infrastructure
            </span>
            <h1 className="min-w-0 break-words text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-tight sm:leading-[0.85] [overflow-wrap:anywhere]">
              {t('smart_infra_title') || 'Dholera Smart Infrastructure'}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-medium leading-relaxed uppercase tracking-widest max-w-3xl">
              Engineered from the ground up: Subterranean utility ducts, 4,400 MW clean solar power, the ABCD central command center, and multi-modal expressway corridors.
            </p>
          </div>
        </div>
      </section>

      {/* Ahmedabad-Dholera Expressway Ground Reality */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 md:px-8 space-y-6">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">Access Corridor Reality</p>
          <h2 className="text-3xl font-black text-slate-950 dark:text-white md:text-5xl">
            {t('ahmedabad_to_dholera_distance') || 'Ahmedabad to Dholera Expressway (NH-751)'}
          </h2>
          <div className="space-y-4 text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            <p>{plainText('expressway_length_desc') || 'The 109 km, 4-lane (expandable to 8-lane) access-controlled expressway slashes travel time between Ahmedabad and Dholera from 2.5 hours to under 45 minutes.'}</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Verified Source: Ministry of Road Transport and Highways (MoRTH) & National Highways Authority of India (NHAI).
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2233516&lang=2&reg=48" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rounded-xl bg-orange-600 hover:bg-orange-700 px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-all shadow-md"
            >
              MoRTH Official Update
            </a>
            <Link href="/airport" className="rounded-xl border border-slate-300 dark:border-slate-700 hover:border-orange-500 px-6 py-3 text-xs font-black uppercase tracking-wider transition-all">
              Airport Guide
            </Link>
            <Link href="/tp-maps" className="rounded-xl border border-slate-300 dark:border-slate-700 hover:border-orange-500 px-6 py-3 text-xs font-black uppercase tracking-wider transition-all">
              Inspect Arterial TP Maps
            </Link>
          </div>
        </div>
      </section>

      {/* Core Engineering Pillars Grid */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px] space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">Trunk Utility Breakdown</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-slate-900 dark:text-white">
              6 Core Infrastructure Pillars
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Every plotted sector in Dholera SIR is served by certified subterranean civil assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {utilityPillars.map((pillar, i) => (
              <div 
                key={i} 
                className="bg-slate-50 dark:bg-slate-800/60 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-700/80 hover:border-orange-500/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-4">
                  <div className="h-14 w-14 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-orange-600 shadow-sm">
                    <pillar.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">
                      {pillar.metrics}
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white mt-1">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {pillar.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-slate-200 dark:border-slate-700/60">
                  {pillar.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Stat Badges (Clickable Links) */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-14 border border-slate-200 dark:border-slate-800 shadow-xl space-y-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">Verified Public Capital</span>
                <h3 className="text-2xl md:text-4xl font-black uppercase text-slate-900 dark:text-white">
                  Ground Infrastructure Benchmarks
                </h3>
              </div>
              <Link 
                href="/tp-maps" 
                className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
              >
                Explore Active Schemes <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Clickable Stat Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link 
                href="/pdf?search=DP&trigger=true" 
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:shadow-lg transition-all group"
              >
                <p className="text-3xl font-black text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform">₹3,000 cr+</p>
                <p className="text-xs font-black uppercase text-slate-900 dark:text-white mt-1">Trunk Infra Spent</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 font-medium">Click to inspect official DSIRDA allocation gazettes →</p>
              </Link>

              <Link 
                href="/projects" 
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:shadow-lg transition-all group"
              >
                <p className="text-3xl font-black text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform">22.5 km²</p>
                <p className="text-xs font-black uppercase text-slate-900 dark:text-white mt-1">Operational Activation Area</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 font-medium">Browse verified commercial plots inside TP2A →</p>
              </Link>

              <Link 
                href="/tp-maps" 
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:shadow-lg transition-all group"
              >
                <p className="text-3xl font-black text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform">55m - 250m</p>
                <p className="text-xs font-black uppercase text-slate-900 dark:text-white mt-1">Arterial Roads</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 font-medium">Check ROW alignment on high-res TP maps →</p>
              </Link>

              <Link 
                href="/clearance-engine" 
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:shadow-lg transition-all group"
              >
                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">100%</p>
                <p className="text-xs font-black uppercase text-slate-900 dark:text-white mt-1">Clear Title Verification</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 font-medium">Run due diligence check on target survey number →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
