import { Metadata } from "next";
import { TrendingUp, ShieldCheck, Landmark, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dholera Investment Guide | Strategic Land Acquisition Strategies",
  description: "Comprehensive guide for investing in Dholera SIR. Real estate ROI, industrial allotment policies, and legal compliance for NRI and domestic investors.",
};

export default function InvestmentGuidePage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <header className="mb-20 space-y-4 max-w-4xl">
          <div className="inline-flex items-center rounded-full bg-green-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-green-700 border border-green-200">
            Strategic Alpha
          </div>
          <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 md:text-7xl uppercase leading-tight">
            Investment <span className="text-orange-600 italic">Playbook</span>
          </h1>
          <p className="max-w-2xl text-lg font-medium text-slate-500 leading-relaxed">
            Maximize your ROI with verified data on Dholera SIR industrial growth, infrastructure timelines, and land appreciation cycles.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
           <div className="lg:col-span-2 space-y-12">
              <section className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-sm">
                 <h2 className="text-2xl font-black text-slate-900 uppercase mb-8 flex items-center gap-4">
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
                      <div key={i} className="flex items-start gap-4">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                        <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{item}</span>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="bg-slate-900 rounded-[2.5rem] p-12 text-white shadow-2xl">
                 <h2 className="text-2xl font-black uppercase mb-8">Investment Zones</h2>
                 <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                       <h3 className="text-orange-500 font-black uppercase text-sm mb-2">Activation Area (22.5 sq km)</h3>
                       <p className="text-sm text-slate-400 font-medium">The core priority zone for immediate development and industrial operations.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                       <h3 className="text-orange-500 font-black uppercase text-sm mb-2">TP1 & TP2 (Residential Hubs)</h3>
                       <p className="text-sm text-slate-400 font-medium">Focus for residential communities, housing societies, and social infrastructure.</p>
                    </div>
                 </div>
              </section>
           </div>

           <div className="space-y-8">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                 <h3 className="text-xl font-black text-slate-900 uppercase mb-6">Risk Assessment</h3>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 uppercase tracking-widest text-[10px]">
                    Ensure your investment is safe with our AI-powered risk scoring engine.
                 </p>
                 <Link href="/clearance-engine" className="flex h-12 w-full items-center justify-center bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all">
                    Run Clearance Check
                 </Link>
              </div>

              <div className="bg-orange-50 rounded-[2.5rem] p-8 border border-orange-100">
                 <ShieldCheck className="h-10 w-10 text-orange-600 mb-6" />
                 <h3 className="text-xl font-black text-slate-900 uppercase mb-4">Legal Advisory</h3>
                 <p className="text-xs font-semibold text-slate-600 leading-relaxed mb-6">
                    Professional support for title verification, NA permissions, and RERA compliance documentation.
                 </p>
                 <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-orange-600 flex items-center gap-2 hover:gap-4 transition-all">
                    Consult Expert <ArrowRight className="h-4 w-4" />
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
