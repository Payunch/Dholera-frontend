"use client";

import React from 'react';
import Image from 'next/image';
import { Plane, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/providers/LanguageProvider';

export default function AirportPage() {
  const { t } = useLanguage();
  
  const milestones = [
    { phase: t('phase_1'), status: t('under_construction'), date: t('expected_2025'), desc: t('terminal_capacity') },
    { phase: t('phase_2'), status: t('planned'), date: t('expected_2030'), desc: t('expansion_desc') },
    { phase: t('connectivity'), status: t('expressway_linked'), date: t('ongoing'), desc: t('access_desc') },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen w-full overflow-x-hidden transition-colors">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/airportVision.webp" 
            alt={t('airport_title')} 
            fill 
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-600/20 border border-orange-500/30 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 mb-6">
            <Plane className="h-3 w-3" /> <Translate id="strategic_roi" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
            {t('airport_title')}
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            {t('airport_subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                {t('strategic_importance_title')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {t('airport_desc')}
              </p>
              
              <div className="space-y-4">
                {[
                  t('land_allocated'),
                  t('category_4e'),
                  t('cargo_hub'),
                  t('expressway_parallel')
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-bold text-slate-800 dark:text-slate-200 uppercase text-xs">
                    <CheckCircle2 className="h-5 w-5 text-green-500" /> {item}
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link 
                  href="/pdf" 
                  className="inline-flex items-center gap-3 bg-slate-900 dark:bg-orange-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 dark:hover:bg-orange-700 transition-all shadow-xl shadow-slate-900/10"
                >
                  {t('download_airport_maps')} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-6">
              {milestones.map((m, i) => (
                <div key={i} className="p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-2xl transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">{m.phase}</span>
                    <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-[8px] font-black uppercase border border-slate-200 dark:border-slate-700 dark:text-slate-300">{m.status}</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">{m.date}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black uppercase">{t('interested_airport_prop')}</h2>
          <p className="text-slate-400 max-w-xl mx-auto uppercase text-xs font-black tracking-widest leading-loose">
            {t('direct_access_tp')}
          </p>
          <div className="flex justify-center pt-4">
            <a href="https://wa.me/917435808031" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-green-500/20 hover:bg-[#128C7E] transition-colors">
              +91 74358 08031
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Translate({ id }: { id: string }) {
  const { t } = useLanguage();
  return <>{t(id)}</>;
}
