"use client";

import React from'react';
import Image from'next/image';
import { Plane, CheckCircle2, ArrowRight } from'lucide-react';
import Link from'next/link';
import { useLanguage } from'@/providers/LanguageProvider';

export default function AirportPage() {
 const { t } = useLanguage();
 
 const milestones = [
 { phase: t('phase_1'), status: t('under_construction'), date: t('expected_2025'), desc: t('terminal_capacity') },
 { phase: t('phase_2'), status: t('planned'), date: t('expected_2030'), desc: t('expansion_desc') },
 { phase: t('connectivity'), status: t('expressway_linked'), date: t('ongoing'), desc: t('access_desc') },
 ];

 return (
 <div className="bg-white dark:bg-slate-950 min-h-screen w-full overflow-x-hidden transition-colors">
 {/* Hero Section - Refactored for proper sizing */}
 <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900 text-white">
 <div className="absolute inset-0 z-0">
 <Image 
 src="/images/airportVision.webp" 
 alt={t('airport_title')} 
 fill 
 className="object-cover opacity-60"
 sizes="100vw"
 priority
 />
 </div>
 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
 
 <div className="container relative z-10 mx-auto px-4 md:px-8 text-center pt-20">
 <div className="inline-flex items-center gap-2 rounded-full bg-orange-600/20 border border-orange-500/30 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 mb-6">
 <Plane className="h-3 w-3" /> <Translate id="strategic_roi" />
 </div>
 <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-6 leading-[0.85]">
 {t('airport_title')}
 </h1>
 <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed uppercase tracking-widest">
 {t('airport_subtitle')}
 </p>
 </div>
 </section>

 {/* Main Content */}
 <section className="py-24">
 <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
 <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
 <div className="space-y-8">
 <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
 {t('strategic_importance_title')}
 </h2>
 <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
 {t('airport_desc')}
 </p>
 
 <div className="grid sm:grid-cols-2 gap-4">
 {[
 t('land_allocated'),
 t('category_4e'),
 t('cargo_hub'),
 t('expressway_parallel')
 ].map((item, i) => (
 <div key={i} className="flex items-center gap-3 font-black text-slate-800 dark:text-slate-200 uppercase text-[10px] tracking-widest bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
 <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> {item}
 </div>
 ))}
 </div>

 <div className="pt-6">
 <Link 
 href="/pdf?trigger=true" 
 className="inline-flex items-center gap-3 bg-[#FF7A00] text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-600/10 dark:shadow-orange-600/50 active:scale-95"
 >
 {t('download_airport_maps')} <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
 {milestones.map((m, i) => (
 <div key={i} className="p-8 md:p-10 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl dark:hover:shadow-black/100 transition-all group flex flex-col justify-between">
 <div className="space-y-4">
 <div className="flex justify-between items-start">
 <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">{m.phase}</span>
 <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-[8px] font-black uppercase border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">{m.status}</span>
 </div>
 <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-[#FF7A00] transition-colors">{m.date}</h4>
 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-bold uppercase tracking-wider">{m.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section */}
 <section className="bg-white dark:bg-slate-900 py-24 text-white">
 <div className="container mx-auto px-4 text-center space-y-8">
 <h2 className="text-3xl md:text-5xl font-black uppercase">{t('interested_airport_prop')}</h2>
 <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto uppercase text-xs font-black tracking-widest leading-loose">
 {t('direct_access_tp')}
 </p>
 <div className="flex justify-center pt-4">
 <a href="https://wa.me/917435808031" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-green-500/10 hover:bg-[#128C7E] transition-colors">
 +91 74358 08031
 </a>
 </div>
 </div>
 </section>
 </div>
 );
}

function Translate({ id }) {
 const { t } = useLanguage();
 return <>{t(id)}</>;
}
