"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TrendingUp, ShieldCheck, Landmark, ArrowRight, CheckCircle2, Calculator, Layers, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";

export default function InvestmentGuidePage() {
  const { t } = useLanguage();

  // Dynamic Land Acquisition Calculator State
  const [plotSize, setPlotSize] = useState(250);
  const [ratePerSqYd, setRatePerSqYd] = useState(4200);

  const baseCost = plotSize * ratePerSqYd;
  const stampDuty = Math.round(baseCost * 0.049); // 4.9% Gujarat Stamp Duty
  const registrationFee = Math.round(baseCost * 0.01); // 1.0% Registration Fee
  const legalFee = 25000; // Advocate Title Search & 30-year due diligence
  const totalCost = baseCost + stampDuty + registrationFee + legalFee;

  const zones = [
    {
      title: "Activation Area (TP2A - 22.5 sq km)",
      status: "100% Operational Trunk Infrastructure",
      desc: "Home to the Tata Semiconductor Fab (₹91,000 Cr), ABCD Command Center, and active plug-and-play utility corridors.",
      focus: "Commercial, Electronics, Hospitality"
    },
    {
      title: "Town Planning 1 & 2 (TP1 & TP2)",
      status: "Sanctioned & Advanced Civil Development",
      desc: "Immediate residential townships and logistics parks flanking the 109 km Ahmedabad-Dholera Expressway.",
      focus: "Residential Societies, Knowledge Hubs"
    },
    {
      title: "Town Planning 3 (TP3 - 66.5 sq km)",
      status: "Educational & Knowledge City",
      desc: "Designated for international university campuses, healthcare cities, and research institutes.",
      focus: "Institutional, IT & Medical"
    },
    {
      title: "Town Planning 4 (TP4 - 60.1 sq km)",
      status: "Heavy Engineering & Defense Corridor",
      desc: "Large land parcels with direct freight corridors and dedicated high-voltage power substations.",
      focus: "Aerospace, Defense, Precision Engineering"
    },
    {
      title: "Town Planning 5 (TP5 - 74.8 sq km)",
      status: "Solar & Green Energy Influence Zone",
      desc: "Adjacent to the 4,400 MW Dholera Solar Park with heavy duty internal arterial roads.",
      focus: "Clean Tech, Data Centers, Renewable R&D"
    },
    {
      title: "Airport Influence Zone (Navagam / Fedara)",
      status: "Under Construction Aerotropolis",
      desc: "High-value commercial and transit-oriented plots surrounding the upcoming Dholera International Airport.",
      focus: "Hotels, Warehousing, Corporate Transit"
    }
  ];

  return (
    <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pb-32 w-full overflow-x-hidden">
      
      {/* Header Block */}
      <section className="relative bg-slate-950 pt-32 pb-24 border-b border-slate-200 dark:border-slate-800 overflow-hidden mb-16 dark:bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Image 
            src="/images/dholerasirGujrat.webp" 
            alt="Dholera Strategic Alpha" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white dark:from-[#0B132B]/80 dark:via-transparent dark:to-[#0B132B] z-0 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
          <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            Institutional Real Estate Intelligence
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
            Dholera SIR Investment Playbook
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-widest">
            Data-backed capital allocation strategies, historical appreciation metrics, zoning master plans, and dynamic land acquisition cost calculations.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-[1600px] space-y-20">
        
        {/* Dynamic Stamp Duty & Land Acquisition Cost Calculator */}
        <section className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white p-8 md:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/15 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-5xl mx-auto space-y-10">
            <div className="space-y-3 text-center md:text-left">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400">
                <Calculator className="h-4 w-4" /> Real Estate Acquisition Cost Breakdown
              </span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
                Gujarat Stamp Duty & Legal Fee Calculator
              </h2>
              <p className="text-xs md:text-sm text-slate-400 font-medium max-w-2xl">
                Calculate genuine out-of-pocket acquisition expenses including statutory Gujarat Stamp Duty (4.9%), Sub-Registrar Fee (1%), and 30-year advocate title search charges.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-6 bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider">
                    <span>Plot Dimension:</span>
                    <span className="text-orange-400">{plotSize} Sq. Yards</span>
                  </div>
                  <input 
                    type="range" 
                    min="150" 
                    max="2000" 
                    step="25"
                    value={plotSize}
                    onChange={(e) => setPlotSize(Number(e.target.value))}
                    className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase">
                    <span>150 Sq. Yd (Compact)</span>
                    <span>1000 Sq. Yd</span>
                    <span>2000 Sq. Yd (Estate)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider">
                    <span>Rate Per Sq. Yard:</span>
                    <span className="text-orange-400">₹{ratePerSqYd.toLocaleString('en-IN')} / Sq. Yd</span>
                  </div>
                  <input 
                    type="range" 
                    min="2500" 
                    max="12000" 
                    step="250"
                    value={ratePerSqYd}
                    onChange={(e) => setRatePerSqYd(Number(e.target.value))}
                    className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase">
                    <span>₹2,500 (Early TP)</span>
                    <span>₹6,500 (TP2 Residential)</span>
                    <span>₹12,000 (Commercial/Expressway)</span>
                  </div>
                </div>
              </div>

              {/* Output Cost Breakdown */}
              <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-6 md:p-8 border border-white/10 space-y-4">
                <div className="space-y-2.5 pb-4 border-b border-white/10 text-xs font-semibold">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Land Consideration:</span>
                    <span className="font-bold text-white">₹{baseCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Gujarat Stamp Duty (4.9%):</span>
                    <span className="font-bold text-emerald-400">₹{stampDuty.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Sub-Registrar Registration Fee (1.0%):</span>
                    <span className="font-bold text-emerald-400">₹{registrationFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Advocate 30-Yr Title Clearance Report:</span>
                    <span className="font-bold text-slate-300">₹{legalFee.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Total Acquisition Outlay</span>
                    <span className="text-2xl md:text-3xl font-black text-orange-400">
                      ₹{totalCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/917435808031?text=${encodeURIComponent(`Hi Naresh, I calculated an acquisition cost of ₹${totalCost.toLocaleString('en-IN')} for a ${plotSize} sq. yd plot at ₹${ratePerSqYd}/sq.yd. Please share matching title-clear plots.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg"
                  >
                    Match Inventory
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Historical Appreciation Trajectory & Holding Horizons */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">Verified Growth Timeline</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 dark:text-white">
              Dholera Land Appreciation Cycles (2018 – 2026+)
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Historical transaction rates per square yard tracked against key infrastructure triggers.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-black uppercase tracking-wider text-[10px]">
                  <th className="p-4 md:p-6">Cycle & Era</th>
                  <th className="p-4 md:p-6">Major Infrastructure Milestone</th>
                  <th className="p-4 md:p-6">Average Rate / Sq. Yd</th>
                  <th className="p-4 md:p-6">Appreciation Index</th>
                  <th className="p-4 md:p-6">Recommended Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-600 dark:text-slate-300">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-4 md:p-6 font-bold text-slate-900 dark:text-white">2018 – 2020 (Inception)</td>
                  <td className="p-4 md:p-6">Regional Master Plan DP 2040 gazetted, Activation Area grading</td>
                  <td className="p-4 md:p-6 font-mono font-bold">₹1,200 – ₹1,800</td>
                  <td className="p-4 md:p-6"><span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold">Baseline (1.0x)</span></td>
                  <td className="p-4 md:p-6">Early Land Banking in TP1 / TP2</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-4 md:p-6 font-bold text-slate-900 dark:text-white">2021 – 2023 (Trunk Infra)</td>
                  <td className="p-4 md:p-6">Expressway civil contracts awarded, underground utility ducts completed</td>
                  <td className="p-4 md:p-6 font-mono font-bold">₹2,200 – ₹3,400</td>
                  <td className="p-4 md:p-6"><span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold">+85% Growth</span></td>
                  <td className="p-4 md:p-6">Residential Society Land Assembly</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-4 md:p-6 font-bold text-slate-900 dark:text-white">2024 – 2025 (Semicon Trigger)</td>
                  <td className="p-4 md:p-6">Tata Fab ₹91,000 Cr announcement, Airport Phase 1 runway grading 80%+</td>
                  <td className="p-4 md:p-6 font-mono font-bold">₹3,800 – ₹5,500</td>
                  <td className="p-4 md:p-6"><span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-bold">+210% Growth</span></td>
                  <td className="p-4 md:p-6">Commercial Corridor & Sector Roads</td>
                </tr>
                <tr className="bg-orange-50/40 dark:bg-orange-950/20 font-bold hover:bg-orange-50/60">
                  <td className="p-4 md:p-6 text-orange-600 dark:text-orange-400">2026 Present (Operational)</td>
                  <td className="p-4 md:p-6 text-slate-900 dark:text-white">Expressway opening, Micron/Tata vendor ecosystem allotting</td>
                  <td className="p-4 md:p-6 font-mono text-orange-600 dark:text-orange-400">₹4,200 – ₹8,500</td>
                  <td className="p-4 md:p-6"><span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-black">+370% Cumulative</span></td>
                  <td className="p-4 md:p-6 text-slate-900 dark:text-white">Prime Plotted NA Freehold Land</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-4 md:p-6 font-bold text-slate-900 dark:text-white">2028 – 2030 (Projected)</td>
                  <td className="p-4 md:p-6">Commercial chip production, Dholera Airport flight operations</td>
                  <td className="p-4 md:p-6 font-mono font-bold text-slate-500">₹8,000 – ₹15,000+</td>
                  <td className="p-4 md:p-6"><span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold">Projected 6x - 8x</span></td>
                  <td className="p-4 md:p-6">Capital Realization & Rental Yield</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Expanded 6 Investment Zones */}
        <section className="space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">Regional Allocation Matrix</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 dark:text-white">
              Complete Investment Zones Breakdown
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Detailed investor guidelines across all 6 high-growth zones of Dholera Special Investment Region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {zones.map((z, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-orange-500/50 transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[9px] font-black uppercase tracking-wider border border-orange-500/20 inline-block">
                    {z.status}
                  </span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                    {z.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {z.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-500">
                  <span>Focus: {z.focus}</span>
                  <Link href="/tp-maps" className="text-orange-600 hover:text-orange-500 flex items-center gap-1">
                    Map <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rebranded Title Due Diligence Check Card */}
        <section className="rounded-[2.5rem] bg-slate-900 border border-slate-800 p-8 md:p-14 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400">
              <ShieldCheck className="h-5 w-5" /> Title Due Diligence & Survey Verification
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Request Title Due Diligence Check
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
              Prevent revenue disputes and boundary overlaps. Provide your target <strong>Survey Number</strong>, <strong>Taluka (Dholera)</strong>, and <strong>Village</strong>. Our legal panel cross-verifies against AnyRoR, Form 7/12, and the sanctioned DSIRDA Town Planning scheme map.
            </p>
            <div className="flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-wider text-slate-400 pt-2">
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">30-Year Title Search</span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">FP vs Revenue Overlay</span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Zero Encumbrance Cert</span>
            </div>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
            <Link
              href="/clearance-engine"
              className="px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-widest text-center transition-all shadow-xl shadow-orange-600/30"
            >
              Start Clearance Verification
            </Link>
            <a
              href="https://wa.me/917435808031?text=Hi%20Naresh,%20I%20would%20like%20to%20request%20a%20legal%20Title%20Clearance%20Due%20Diligence%20Check%20for%20a%20survey%20plot%20in%20Dholera."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-widest text-center transition-all border border-white/20"
            >
              Direct Advocate Inquiry
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
