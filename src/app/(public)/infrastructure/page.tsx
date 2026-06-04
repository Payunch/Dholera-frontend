import React from 'react';
import Image from 'next/image';
import { Cpu, Zap, Road, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dholera Smart City Infrastructure - Tata Fab, Solar Park & Expressway',
  description: 'Explore the trunk infrastructure of Dholera SIR. Real-time updates on Tata Semicon Fab, Micron plant, 4400MW Solar Park, and Ahmedabad-Dholera Expressway.',
  keywords: 'Dholera Infrastructure, Tata Fab Dholera, Micron Dholera, Dholera Solar Park, Dholera Expressway Status'
};

export default function InfrastructurePage() {
  const categories = [
    {
      title: "Industrial & Semicon",
      icon: Cpu,
      items: [
        "Tata Electronics Mega Fab - ₹91,000 Cr Investment",
        "Micron ATMP Plant - World-class memory manufacturing",
        "Over 22.5 sq km allocated for Industrial activity",
        "Direct link to Dedicated Freight Corridor (DFC)"
      ]
    },
    {
      title: "Utility Powerhouse",
      icon: Zap,
      items: [
        "4400 MW Solar Park - Largest in a single location",
        "24x7 Uninterrupted Industrial Power Supply",
        "SCADA-enabled Smart Water Management",
        "Zero Liquid Discharge (ZLD) system"
      ]
    },
    {
      title: "Connectivity",
      icon: Road,
      items: [
        "Ahmedabad-Dholera 109km Expressway (Underway)",
        "Massive 10-lane backbone for smooth transit",
        "Dholera Metro Rail connectivity planned",
        "Multi-modal Logistic Hub (Airport + Port + Rail)"
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60">
          <Image 
            src="/images/arialviewdholeraexpress.webp" 
            alt="Dholera Smart Infrastructure" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 bg-orange-600/20 px-4 py-1.5 rounded-full border border-orange-500/30">
              Future Proof City
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Dholera <span className="text-orange-600 italic">Smart</span> Infrastructure
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
              India's most advanced industrial ecosystem with trunk infrastructure worth ₹3,000+ Crore already in place.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all">
                <div className="h-16 w-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-8">
                  <cat.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-6">{cat.title}</h3>
                <div className="space-y-4">
                   {cat.items.map((item, j) => (
                     <div key={j} className="flex items-start gap-3">
                       <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                       <span className="text-sm font-bold text-slate-500 leading-snug">{item}</span>
                     </div>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
           <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 opacity-10 blur-[100px]" />
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                 <div className="space-y-8">
                    <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
                      Decide based on <span className="text-orange-500 italic">Ground Reality</span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      Don't invest based on rumors. We provide official TP Maps, zoning details, and development permissions directly from the DSIRDA archive.
                    </p>
                    <div className="flex flex-wrap gap-4">
                       <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                          <p className="text-3xl font-black text-orange-500">₹3000cr+</p>
                          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Trunk Infra Spent</p>
                       </div>
                       <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                          <p className="text-3xl font-black text-orange-500">22.5km²</p>
                          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Activation Area</p>
                       </div>
                    </div>
                    <div className="pt-4">
                       <Link href="/#documents" className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-orange-600/20">
                         Browse Planning Maps <ArrowRight className="h-4 w-4" />
                       </Link>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square rounded-[2rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center p-6 space-y-4">
                       <ShieldCheck className="h-10 w-10 text-orange-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Plots</span>
                    </div>
                    <div className="mt-8 aspect-square rounded-[2rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center p-6 space-y-4">
                       <Road className="h-10 w-10 text-orange-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Internal Roads</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
