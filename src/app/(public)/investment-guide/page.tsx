import { Metadata } from "next";
import Image from "next/image";
import { TrendingUp, ShieldCheck, Landmark, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dholera Investment Guide | Strategic Land Acquisition Strategies",
  description: "Comprehensive guide for investing in Dholera SIR. Real estate ROI, industrial allotment policies, and legal compliance for NRI and domestic investors.",
};

export default function InvestmentGuidePage() {
  return (
    <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pb-32 w-full overflow-x-hidden">
      
      {/* Header Block */}
      <section className="relative bg-white dark:bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden mb-16">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <Image 
            src="/images/dholerasirGujrat.webp" 
            alt="Dholera Strategic Alpha" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
          <div className="inline-flex items-center rounded-full bg-green-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-green-500 border border-green-500/30">
            Strategic Alpha
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
            Investment <span className="text-orange-600 italic">Playbook</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-widest">
            Maximize your ROI with verified data on Dholera SIR industrial growth, infrastructure timelines, and land appreciation cycles.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
           <div className="lg:col-span-2 space-y-12">
              <section className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-xl shadow-slate-200/10 hover:-translate-y-1 transition-all duration-500">
                 <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase mb-8 flex items-center gap-4">
                    <TrendingUp className="h-8 w-8 text-orange-600" /> Why Dholera Now?
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[
                      "Early stage Greenfield advantages",
                      "Government backed infrastructure",
                      "Strategic location on DMIC route",
                      "Transparent digital land records",
                      "Platinum rated smart infrastructure",
                      "High-tech industrial ecosystem"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 group">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight group-hover:text-slate-900 dark:text-white">{item}</span>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none" />
                 <h2 className="text-2xl font-black uppercase mb-8 relative z-10">Investment Zones</h2>
                 <div className="space-y-6 relative z-10">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300">
                       <h3 className="text-orange-500 font-black uppercase text-sm mb-3">Activation Area (22.5 sq km)</h3>
                       <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">The core priority zone for immediate development and industrial operations. Direct connectivity to the 4500MW Solar Park.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300">
                       <h3 className="text-orange-500 font-black uppercase text-sm mb-3">TP1 & TP2 (Residential Hubs)</h3>
                       <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Focus for residential communities, housing societies, and social infrastructure. Most vibrant zone for individual investors.</p>
                    </div>
                 </div>
              </section>
           </div>

           <div className="space-y-8">
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/10 hover:-translate-y-1 transition-all duration-500">
                 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-6">Risk Assessment</h3>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 uppercase tracking-widest text-[10px]">
                    Ensure your investment is safe with our AI-powered risk scoring engine.
                 </p>
                 <Link href="/clearance-engine" className="flex h-14 w-full items-center justify-center bg-white dark:bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95">
                    Run Clearance Check
                 </Link>
              </div>

              <div className="bg-orange-600 rounded-[2.5rem] p-10 text-slate-900 dark:text-white shadow-xl shadow-orange-600/10 hover:-translate-y-1 transition-all duration-500">
                 <ShieldCheck className="h-12 w-12 text-white mb-6 animate-pulse" />
                 <h3 className="text-xl font-black uppercase mb-4">Legal Advisory</h3>
                 <p className="text-xs font-bold text-slate-900 dark:text-white/80 leading-relaxed mb-8 uppercase tracking-widest">
                    Professional support for title verification, NA permissions, and RERA compliance documentation.
                 </p>
                 <Link href="/contact" className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 group">
                    Consult Expert <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
