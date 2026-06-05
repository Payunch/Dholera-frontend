"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ShieldCheck, MapPin, Scale, Search, Shield } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

export default function PortalsPage() {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'category-a',
      title: t('land_records_title'),
      subtitle: t('land_records_desc'),
      icon: MapPin,
      links: [
        {
          name: "Gujarat AnyROR (Urban)",
          desc: "Official state portal to check property cards and 7/12 extracts for urban plots.",
          url: "https://anyror.gujarat.gov.in/"
        },
        {
          name: "Gujarat AnyROR (Rural)",
          desc: "Verify rural land records, survey numbers, and agricultural land details.",
          url: "https://anyror.gujarat.gov.in/LandRecordRural.aspx"
        },
        {
          name: "i-ORA Revenue Portal",
          desc: "Integrated Online Revenue Applications for mutation entries and land premium payment.",
          url: "https://iora.gujarat.gov.in/"
        }
      ]
    },
    {
      id: 'category-b',
      title: t('legal_compliance_title'),
      subtitle: t('legal_compliance_desc'),
      icon: Scale,
      links: [
        {
          name: "Gujarat RERA Portal",
          desc: "Check developer track records, project registration status, and legal encumbrances.",
          url: "https://gujrera.gujarat.gov.in/#/"
        },
        {
          name: "RERA Registered Projects Search",
          desc: "Direct link to search and verify active residential/commercial projects in Dholera.",
          url: "https://gujrera.gujarat.gov.in/#/project-search"
        }
      ]
    },
    {
      id: 'category-c',
      title: t('planning_regulations_title'),
      subtitle: t('planning_regulations_desc'),
      icon: Shield,
      links: [
        {
          name: "Official DSIRDA Website",
          desc: "Dholera Special Investment Region Development Authority official announcements.",
          url: "https://dholera.gujarat.gov.in/"
        },
        {
          name: "GIDC Industrial Allotment",
          desc: "Gujarat Industrial Development Corporation land allotment portal for Dholera.",
          url: "https://gidc.gujarat.gov.in/"
        },
        {
          name: "Town Planning Circulars",
          desc: "Latest state notifications regarding Town Planning Act modifications in DSIR.",
          url: "https://udd.gujarat.gov.in/"
        }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans w-full overflow-x-hidden transition-colors">
      
      {/* Header Section */}
      <section className="relative bg-white dark:bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <Image 
            src="/images/futuristic_dholera.png" 
            alt={t('verified_portals_title')} 
            fill 
            className="object-cover"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
           <div className="max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#10B981]">
                <ShieldCheck className="h-4 w-4" /> {t('third_party_verification')}
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {t('verified_portals_title')}
              </h1>
              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
                {t('portals_desc')}
              </p>
           </div>
        </div>
      </section>

      {/* Directory Grid Blocks */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
           
           <div className="grid gap-16">
              {categories.map((cat, idx) => (
                <div key={cat.id} className="scroll-mt-32">
                   
                   {/* Category Header */}
                   <div className="flex items-center gap-6 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
                      <div className="h-16 w-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#FF7A00] shadow-sm">
                        <cat.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                          {cat.title}
                        </h2>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                          {cat.subtitle}
                        </p>
                      </div>
                   </div>

                   {/* Links Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cat.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-[#FF7A00] transition-all hover:-translate-y-1 flex flex-col justify-between"
                        >
                           <div>
                              <div className="flex justify-between items-start mb-6">
                                 <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800/30">
                                   <ShieldCheck className="h-3 w-3 text-[#10B981]" />
                                   <span className="text-[8px] font-black uppercase tracking-widest text-[#10B981]">Verified Link</span>
                                 </div>
                                 <ExternalLink className="h-5 w-5 text-slate-300 group-hover:text-[#FF7A00] transition-colors" />
                              </div>
                              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase leading-snug group-hover:text-[#FF7A00] transition-colors mb-3">
                                {link.name}
                              </h3>
                              <p className="text-xs font-medium text-slate-500 dark:text-slate-500 dark:text-slate-400 leading-relaxed">
                                {link.desc}
                              </p>
                           </div>
                           
                           <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-[#FF7A00] group-hover:text-orange-500 flex items-center justify-between">
                              Access Portal <Search className="h-4 w-4" />
                           </div>
                        </a>
                      ))}
                   </div>

                </div>
              ))}
           </div>
        </div>
      </section>
      
    </div>
  );
}
