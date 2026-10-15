"use client";

import React from 'react';
import Image from 'next/image';
import { Plane, CheckCircle2, ArrowRight, ShieldCheck, MapPin, Building, Compass, Clock, Download } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/providers/LanguageProvider';

export default function AirportPage() {
  const { t } = useLanguage();
  
  const distanceMatrix = [
    { destination: "ABCD Command Building (TP2A)", distance: "14 km", time: "15 mins via 55m Avenue" },
    { destination: "TP2 Commercial & Smart Residency", distance: "12 km", time: "12 mins direct access" },
    { destination: "TP1 Logistics & Industrial Hub", distance: "18 km", time: "18 mins via NH-751 Feeder" },
    { destination: "Ahmedabad (SG Highway / Ring Road)", distance: "80 km", time: "45 mins via Greenfield Expressway" }
  ];

  const milestones = [
    { 
      phase: "Phase 1 Runway & Terminal", 
      status: "Advanced Civil Works (85%+ Sub-Grade Complete)", 
      date: "Targeted Initial Flight Trials", 
      desc: "3,200-meter Code 4E runway capable of handling wide-body passenger aircraft (Boeing 777 / Airbus A350) and 1.5 million annual passengers." 
    },
    { 
      phase: "ATC Tower & Navigational Aids", 
      status: "Superstructure Topped Out", 
      date: "DVOR & Radar Installation", 
      desc: "Advanced Air Traffic Control tower with Instrument Landing System (ILS CAT-I) and Doppler Very High Frequency Omnirange (DVOR) beacons." 
    },
    { 
      phase: "Phase 2 Cargo & Parallel Runway", 
      status: "Master Plan Allocated", 
      date: "Capacity Scale to 5M+ Passengers", 
      desc: "Secondary 4,000m runway, dedicated international air cargo terminal, and bonded cold-chain logistics for semiconductor wafer transit." 
    },
    { 
      phase: "Multi-Modal Expressway Link", 
      status: "Connected Feeder Interchange", 
      date: "NH-751 Direct Access", 
      desc: "Direct expressway spur and proposed Ahmedabad-Dholera Semi-High Speed Regional Rapid Rail Transit (RRTS) station." 
    }
  ];

  const jvBreakdown = [
    { entity: "Airports Authority of India (AAI)", share: "51%", role: "Airport operator, air navigation, and engineering management" },
    { entity: "Government of Gujarat (GoG)", share: "33%", role: "Land allocation, regional infrastructure, and state statutory clearances" },
    { entity: "NICDIT (Govt of India)", share: "16%", role: "Industrial corridor financing and multi-modal freight integration" }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen w-full overflow-x-hidden transition-colors">
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/airportVision.webp" 
            alt={t('airport_title') || 'Dholera International Airport (DIACL)'} 
            fill 
            className="object-cover opacity-60"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center pt-24 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-600/20 border border-orange-500/30 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">
            <Plane className="h-3.5 w-3.5" /> DIACL Green-Field Aerotropolis
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
            {t('airport_title') || 'Dholera International Airport'}
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-200 font-medium leading-relaxed uppercase tracking-widest">
            Spanning 1,426 hectares (3,525 acres) across Navagam & Fedara. Designed as Western India&apos;s premier dual-use commercial & cargo aviation gateway.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link 
              href="/tp-maps" 
              className="px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-600/30 flex items-center gap-2"
            >
              See the Airport TP Map <ArrowRight className="h-4 w-4" />
            </Link>
            <a 
              href="https://wa.me/917435808031?text=Hi%20Naresh,%20please%20share%20the%20Airport%20Influence%20Zone%20Plot%20Guide%20and%20proximity%20matrix." 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2"
            >
              Request Airport Zone Plot Guide
            </a>
          </div>
        </div>
      </section>

      {/* Strategic Foundation & Demarcation */}
      <section className="py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px] space-y-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">Location & Demarcation</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
                Navagam & Fedara Aerotropolis Boundary
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium">
                The airport is situated at the northern apex of the Dholera Special Investment Region across <strong>Navagam</strong> and <strong>Fedara</strong> villages (Dholera Taluka, Ahmedabad District). It operates under Dholera International Airport Company Limited (DIACL) with zero residential displacement.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {[
                  "1,426 Hectares (3,525 Acres) Acquired",
                  "Code 4E Wide-Body Aircraft Ready",
                  "Dedicated Semiconductor Air Cargo Hub",
                  "Direct Access via NH-751 Expressway"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-black text-slate-800 dark:text-slate-200 uppercase text-[10px] tracking-wider bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Joint Venture Equity Breakdown */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-orange-600" />
                <h3 className="text-xl font-black uppercase text-slate-900 dark:text-white">
                  DIACL Joint Venture Structure
                </h3>
              </div>
              <div className="space-y-4">
                {jvBreakdown.map((jv, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white">{jv.entity}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{jv.role}</p>
                    </div>
                    <span className="shrink-0 text-xl font-black text-orange-600 dark:text-orange-400">{jv.share}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Distance Matrix Table */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">Transit Proximity</span>
              <h3 className="text-2xl md:text-3xl font-black uppercase text-slate-900 dark:text-white">
                Airport Drive Times & Distance Matrix
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {distanceMatrix.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="text-xs font-black uppercase text-slate-400 tracking-wider">Destination</div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white leading-snug">{item.destination}</h4>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-2xl font-black text-orange-600 dark:text-orange-400">{item.distance}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Milestones & OLS Regulations */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px] space-y-16">
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">Ground Status & Future Phases</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-slate-900 dark:text-white">
              Construction Milestones & Timelines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {milestones.map((m, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">{m.phase}</span>
                  <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {m.status}
                  </span>
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">{m.date}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* OLS Height Limitation Advisory */}
          <div className="p-8 rounded-[2rem] bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-2">
            <h4 className="text-sm font-black uppercase tracking-wider flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <Compass className="h-4 w-4" /> Obstacle Limitation Surface (OLS) Building Height Compliance
            </h4>
            <p className="text-xs leading-relaxed font-medium">
              Land parcels located within a 5 km to 15 km radius of the runway centerline are subject to Directorate General of Civil Aviation (DGCA) Obstacle Limitation Surface guidelines. Structural height clearances (NOC) must be verified prior to high-rise commercial or residential development.
            </p>
          </div>
        </div>
      </section>

      {/* High-Intent Conversion CTA */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-950 to-black py-20 border-t border-slate-800 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-6">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Prime Aerotropolis Real Estate</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase">Interested in Airport-Side Property?</h2>
          <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed max-w-2xl mx-auto">
            Direct access to Town Planning Scheme 1 & 2 parcels flanking the airport feeder corridor. Request a customized plot portfolio or schedule an on-ground site briefing with Naresh Gohel.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a 
              href="https://wa.me/917435808031?text=Hi%20Naresh,%20I%20am%20interested%20in%20acquiring%20land%20in%20the%20Dholera%20Airport%20Influence%20Zone.%20Please%20share%20available%20survey%20numbers%20and%20rates." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Inquire via WhatsApp (+91 74358 08031)
            </a>
            <Link 
              href="/tp-maps" 
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              Explore Airport TP Map
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
