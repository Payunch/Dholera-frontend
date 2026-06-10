import { Metadata } from"next";
import Image from"next/image";
import { ShieldCheck, MapPin, Grid, ArrowRight } from"lucide-react";
import Link from"next/link";

export const metadata: Metadata = {
 title:"Dholera Smart City Plots for Sale | Verified Residential & Commercial",
 description:"Explore verified residential, commercial, and industrial plots in Dholera SIR. Real-time availability and DSIRDA compliant land options.",
};

export default function PlotsForSalePage() {
 return (
 <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pb-32 w-full overflow-x-hidden dark:bg-slate-900">
 
 {/* Header Block */}
 <section className="relative bg-white dark:bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden mb-16 dark:bg-slate-900">
 {/* Background Image Overlay */}
 <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
 <Image 
 src="/images/airportVision.webp" 
 alt="Dholera Plotted Investments" 
 fill 
 className="object-cover"
 />
 </div>

 <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
 <div className="inline-flex items-center rounded-full bg-orange-600/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 border border-orange-500/30">
 Real Estate Inventory
 </div>
 <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
 Plotted <span className="text-orange-600 italic">Investments</span> & Land
 </h1>
 <p className="max-w-2xl mx-auto text-sm sm:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-widest">
 Direct access to verified residential, commercial, and industrial plots within the Dholera SIR jurisdiction. 
 Analyze zoning, DP regulations, and TP-wise land availability.
 </p>
 </div>
 </section>

 <div className="container mx-auto px-4 md:px-8">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {/* Quick Categories */}
 {[
 { title:"Residential Plots", desc:"Premium plots in TP-1 and TP-2 residential zones.", icon: Grid },
 { title:"Commercial Land", desc:"Strategic plots near the Activation Area and Linear Zone.", icon: ShieldCheck },
 { title:"Industrial Zones", desc:"Large land parcels for manufacturing and logistics units.", icon: MapPin },
 ].map((cat, i) => (
 <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all">
 <div className="h-16 w-16 rounded-[1.5rem] bg-orange-600 flex items-center justify-center text-slate-900 dark:text-white mb-8">
 <cat.icon className="h-8 w-8" />
 </div>
 <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase mb-4">{cat.title}</h3>
 <p className="text-slate-500 font-medium leading-relaxed mb-8">{cat.desc}</p>
 <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-600 hover:gap-4 transition-all">
 Browse Inventory <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}
