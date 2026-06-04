import { Metadata } from "next";
import Image from "next/image";
import { Landmark, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Government Schemes | Dholera Smart City Subsidies and Policies",
  description: "Explore Gujarat Government and Central Government schemes for Dholera SIR. Industrial subsidies, PLI schemes, and residential housing benefits.",
};

export default function GovernmentSchemesPage() {
  return (
    <div className="bg-white min-h-screen pb-32 w-full overflow-x-hidden">
      
      {/* Header Block */}
      <section className="relative bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden mb-16">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <Image 
            src="/images/expressHighway.webp" 
            alt="Dholera Policy Framework" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
          <div className="inline-flex items-center rounded-full bg-orange-600/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 border border-orange-500/30">
            Policy & Incentives
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white uppercase leading-tight">
            Government <span className="text-orange-600 italic">Schemes</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-lg font-medium text-slate-300 leading-relaxed uppercase tracking-widest">
            Leverage state and central government incentives designed to accelerate industrial and residential growth in the Dholera SIR.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
           {[
             { 
               title: "Industrial Subsidies", 
               items: ["Capital Subsidy on Fixed Assets", "Interest Subsidy for MSMEs", "Electricity Duty Exemptions", "Stamp Duty Waivers"],
               icon: Landmark,
               color: "border-slate-100 bg-slate-50/50"
             },
             { 
               title: "Production Linked Incentives (PLI)", 
               items: ["Semiconductor Manufacturing Support", "Electronics System Design (ESDM)", "Solar PV Module Incentives", "Advanced Chemistry Cell (ACC) Batteries"],
               icon: FileText,
               color: "border-orange-100 bg-orange-50/50"
             }
           ].map((scheme, i) => (
             <div key={i} className={`group p-10 rounded-[2.5rem] border-2 ${scheme.color} space-y-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
                <div className="flex items-center gap-6">
                   <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <scheme.icon className="h-7 w-7" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 uppercase group-hover:text-orange-600 transition-colors">{scheme.title}</h3>
                </div>
                <ul className="space-y-4">
                   {scheme.items.map((item, j) => (
                     <li key={j} className="flex items-center gap-4 text-sm font-bold text-slate-700 uppercase tracking-tight group-hover:text-slate-900">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 animate-pulse" />
                        {item}
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none" />
           <h3 className="text-2xl md:text-4xl font-black text-white uppercase mb-6 relative z-10">Residential Benefits</h3>
           <p className="text-slate-400 font-medium leading-relaxed mb-10 uppercase tracking-widest text-xs relative z-10">
              Under PMAY and Gujarat State Housing policies, eligible first-time homebuyers in Dholera can access interest 
              subsidies and infrastructure benefits for plotted developments.
           </p>
           <Link href="/contact" className="relative z-10 inline-flex items-center gap-3 px-10 py-5 bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 active:scale-95">
              Apply for Guidance <ArrowRight className="h-4 w-4" />
           </Link>
        </div>
      </div>
    </div>
  );
}
