import React from 'react';
import { Map, Layers, Download, CheckCircle2, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Dholera TP Maps (1-6) - Official DSIRDA Archive',
  description: 'Access high-resolution Town Planning (TP) maps for Dholera SIR. Verify plot boundaries, survey numbers, and infrastructure markings for TP1 to TP6.',
  keywords: 'Dholera TP Maps, Dholera SIR TP 1 Map, Dholera TP 2 Map Download, DSIRDA Maps, Dholera Survey Numbers'
};

export default function TpMapsPage() {
  const tpList = [
    { title: "Town Planning Scheme 1 (TP 1)", area: "Activation Area", focus: "Industrial & Mixed Use" },
    { title: "Town Planning Scheme 2 (TP 2)", area: "High Density Area", focus: "Residential & Commercial" },
    { title: "Town Planning Scheme 3 (TP 3)", area: "Logistic Hub", focus: "Connectivity & Storage" },
    { title: "Town Planning Scheme 4 (TP 4)", area: "Knowledge & IT", focus: "Education & Tech" },
    { title: "Town Planning Scheme 5 (TP 5)", area: "City Center", focus: "Premium Core" },
    { title: "Town Planning Scheme 6 (TP 6)", area: "Coastal Zone", focus: "Tourism & Solar" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-slate-50 py-24 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
           <div className="max-w-4xl space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Planning Repository</span>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 leading-[0.9]">
                Official <span className="text-orange-600 italic">TP Maps</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                The most comprehensive collection of verified Town Planning (TP) maps for Dholera SIR. Every plot, road, and utility line mapped with precision.
              </p>
           </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {tpList.map((tp, i) => (
                <div key={i} className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all">
                   <div className="flex justify-between items-start mb-8">
                      <div className="h-14 w-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                        <Map className="h-6 w-6" />
                      </div>
                      <Link href="/#documents" className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-orange-600 group-hover:text-white transition-all">
                        <Download className="h-4 w-4" />
                      </Link>
                   </div>
                   <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">{tp.title}</h3>
                   <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                         <Layers className="h-3 w-3" /> {tp.area}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-600">
                         <ShieldCheck className="h-3 w-3" /> {tp.focus}
                      </div>
                   </div>
                   <Link 
                     href="/#documents" 
                     className="w-full py-4 rounded-xl border-2 border-slate-100 font-black uppercase tracking-widest text-[10px] text-slate-400 group-hover:border-orange-600 group-hover:text-orange-600 transition-all flex items-center justify-center gap-2"
                   >
                     View Map Details
                   </Link>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-slate-900 py-32 text-white overflow-hidden relative">
         <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
                    Verify Your <span className="text-orange-400 italic">Plot Location</span>
                  </h2>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">
                    Our maps are updated in real-time as per DSIRDA notifications. Don't rely on outdated photocopies.
                  </p>
                  <div className="space-y-4">
                     {[
                       "High-resolution PDF downloads",
                       "Exact plot boundaries & survey numbers",
                       "Road width and infrastructure markings",
                       "Zoning & use-case details (FSI, BCR)"
                     ].map((item, i) => (
                       <div key={i} className="flex items-center gap-3 font-bold uppercase text-[10px] tracking-widest">
                         <div className="h-6 w-6 rounded-full bg-orange-600/20 flex items-center justify-center text-orange-500">
                           <CheckCircle2 className="h-3 w-3" />
                         </div>
                         {item}
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="bg-white/5 rounded-[3rem] p-10 border border-white/10 space-y-8">
                  <div className="flex items-center gap-6">
                     <div className="h-16 w-16 rounded-2xl bg-orange-600 flex items-center justify-center shadow-2xl shadow-orange-600/40">
                        <FileText className="h-8 w-8 text-white" />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black uppercase">Start Verification</h4>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">From ₹5 Per Document</p>
                     </div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                     <p className="text-sm text-slate-400 leading-relaxed italic">
                       "Having the latest TP maps was the only reason I could identify a plot that was overlapping with an upcoming expressway. This platform saved me from a major investment error."
                     </p>
                     <p className="text-xs font-black uppercase tracking-widest text-orange-500">— Verified Investor</p>
                  </div>
                  <Link href="/#documents" className="w-full py-6 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-orange-600 hover:text-white transition-all">
                    Launch Documents Hub <ArrowRight className="h-4 w-4" />
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
