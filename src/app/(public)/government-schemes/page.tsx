import { Metadata } from "next";
import { Landmark, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Government Schemes | Dholera Smart City Subsidies and Policies",
  description: "Explore Gujarat Government and Central Government schemes for Dholera SIR. Industrial subsidies, PLI schemes, and residential housing benefits.",
};

export default function GovernmentSchemesPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <header className="mb-16 space-y-4 max-w-4xl">
          <div className="inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-white">
            Official Policy Framework
          </div>
          <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 md:text-7xl uppercase leading-tight">
            Government <span className="text-orange-600 italic">Schemes</span>
          </h1>
          <p className="max-w-2xl text-lg font-medium text-slate-500 leading-relaxed">
            Leverage state and central government incentives designed to accelerate industrial and residential growth in the Dholera SIR.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
           {[
             { 
               title: "Industrial Subsidies", 
               items: ["Capital Subsidy on Fixed Assets", "Interest Subsidy for MSMEs", "Electricity Duty Exemptions", "Stamp Duty Waivers"],
               icon: Landmark,
               color: "border-blue-100 bg-blue-50/50"
             },
             { 
               title: "Production Linked Incentives (PLI)", 
               items: ["Semiconductor Manufacturing Support", "Electronics System Design (ESDM)", "Solar PV Module Incentives", "Advanced Chemistry Cell (ACC) Batteries"],
               icon: FileText,
               color: "border-orange-100 bg-orange-50/50"
             }
           ].map((scheme, i) => (
             <div key={i} className={`p-10 rounded-[2.5rem] border-2 ${scheme.color} space-y-8`}>
                <div className="flex items-center gap-6">
                   <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-slate-900 shadow-sm">
                      <scheme.icon className="h-7 w-7" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 uppercase">{scheme.title}</h3>
                </div>
                <ul className="space-y-4">
                   {scheme.items.map((item, j) => (
                     <li key={j} className="flex items-center gap-4 text-sm font-bold text-slate-700 uppercase tracking-tight">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                        {item}
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>

        <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 text-center max-w-3xl mx-auto shadow-sm">
           <h3 className="text-xl font-black text-slate-900 uppercase mb-4">Residential Benefits</h3>
           <p className="text-slate-500 font-medium leading-relaxed mb-8">
              Under PMAY and Gujarat State Housing policies, eligible first-time homebuyers in Dholera can access interest 
              subsidies and infrastructure benefits for plotted developments.
           </p>
           <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all">
              Apply for Guidance <ArrowRight className="h-4 w-4" />
           </Link>
        </div>
      </div>
    </div>
  );
}
