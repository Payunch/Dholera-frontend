"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ShieldCheck, MapPin, Scale, Search, AlertTriangle, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { cn } from '@/lib/utils';

export default function PortalsPage() {
  const { t } = useLanguage();
  const [openGuide, setOpenGuide] = useState(null);

  const categories = [
    {
      id: 'category-a',
      title: t('land_records_title') || 'Land & Revenue Records',
      subtitle: t('land_records_desc') || 'Verified revenue records, 7/12 extracts, and digital mutation logs.',
      icon: MapPin,
      links: [
        {
          name: "Gujarat AnyROR (Urban)",
          desc: "Official state portal to check property cards and 7/12 extracts for urban plots.",
          url: "https://anyror.gujarat.gov.in/",
          domain: "anyror.gujarat.gov.in",
          steps: [
            "Select District: Ahmedabad > Taluka: Dholera",
            "Choose Village from 22 SIR Revenue Villages",
            "Enter Survey Number or Final Plot (FP) No. to view Property Card"
          ]
        },
        {
          name: "Gujarat AnyROR (Rural)",
          desc: "Verify rural land records, survey numbers, and agricultural land details.",
          url: "https://anyror.gujarat.gov.in/LandRecordRural.aspx",
          domain: "anyror.gujarat.gov.in",
          steps: [
            "Select District: Ahmedabad > Taluka: Dholera",
            "Choose Target Village & Form (VF-7, VF-8A, or VF-6 Mutation)",
            "Enter Survey Number to inspect land ownership history"
          ]
        },
        {
          name: "i-ORA Revenue Portal",
          desc: "Integrated Online Revenue Applications for mutation entries and land premium payment.",
          url: "https://iora.gujarat.gov.in/",
          domain: "iora.gujarat.gov.in",
          steps: [
            "Log in via Gujarat Citizen SSO credentials",
            "Navigate to Revenue > Non-Agricultural (NA) Permissions",
            "Track Application Status via Reference Number"
          ]
        }
      ]
    },
    {
      id: 'category-b',
      title: t('legal_compliance_title') || 'RERA & Legal Compliance',
      subtitle: t('legal_compliance_desc') || 'Developer track records, registration credentials, and encumbrance certificates.',
      icon: ShieldCheck,
      links: [
        {
          name: "Gujarat RERA Official Portal",
          desc: "Check developer track records, project registration status, and legal encumbrances.",
          url: "https://gujrera.gujarat.gov.in/#/",
          domain: "gujrera.gujarat.gov.in",
          steps: [
            "Access Project Registration directory",
            "Search by Developer Name or Gujarat RERA Registration No.",
            "Verify Escrow bank account and approved layout plan"
          ]
        },
        {
          name: "RERA Registered Projects Search",
          desc: "Direct link to search and verify active residential/commercial projects in Dholera.",
          url: "https://gujrera.gujarat.gov.in/#/project-search",
          domain: "gujrera.gujarat.gov.in",
          steps: [
            "Select District: Ahmedabad",
            "Filter by Project Type (Plotted / Residential / Commercial)",
            "Download quarterly compliance report and sanction certificate"
          ]
        }
      ]
    },
    {
      id: 'category-c',
      title: t('planning_regulations_title') || 'Town Planning & Industrial Authorities',
      subtitle: t('planning_regulations_desc') || 'Official DSIRDA notifications, GIDC industrial land allotment, and gazettes.',
      icon: Scale,
      links: [
        {
          name: "Official DSIRDA Portal",
          desc: "Dholera Special Investment Region Development Authority official announcements.",
          url: "https://dholera.gujarat.gov.in/",
          domain: "dholera.gujarat.gov.in",
          steps: [
            "Review Regional Development Plan (DP 2040)",
            "Inspect Comprehensive GDCR Building Bylaws 2024",
            "Check public notice board for upcoming Town Planning revisions"
          ]
        },
        {
          name: "GIDC Industrial Land Allotment",
          desc: "Gujarat Industrial Development Corporation land allotment portal for Dholera.",
          url: "https://gidc.gujarat.gov.in/",
          domain: "gidc.gujarat.gov.in",
          steps: [
            "Browse Dholera GIDC industrial estate plot inventory",
            "Review base allotment rate and power/water tariff matrix",
            "Apply for electronic plot allocation via investor portal"
          ]
        },
        {
          name: "Town Planning & Urban Dev Circulars",
          desc: "Latest state notifications regarding Town Planning Act modifications in DSIR.",
          url: "https://udd.gujarat.gov.in/",
          domain: "udd.gujarat.gov.in",
          steps: [
            "Filter by Urban Development & Urban Housing Department",
            "Access notifications tagged with 'Dholera SIR' or 'TP Scheme'",
            "Download statutory gazette copy for legal due diligence"
          ]
        }
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen font-sans w-full overflow-x-hidden transition-colors">
      
      {/* Header Section */}
      <section className="relative bg-slate-950 pt-32 pb-16 md:pb-24 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <Image 
            src="/images/futuristic_dholera.png" 
            alt={t('verified_portals_title') || 'Verified Land & Project Portals'} 
            fill 
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#10B981]">
            <ShieldCheck className="h-4 w-4" /> {t('third_party_verification') || 'Official Government Revenue Direct Access'}
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.1]">
            {t('verified_portals_title') || 'Verified Land & Project Portals'}
          </h1>
          <p className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
            {t('portals_desc') || 'Direct gateway to Gujarat State Land Records, AnyRoR, i-ORA, RERA verification, and DSIRDA development authority portals.'}
          </p>
        </div>
      </section>

      {/* Server Availability Notice + Title Clearance Assistance Banner */}
      <section className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6">
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px] space-y-4">
          {/* Maintenance Notice */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-800 dark:text-amber-300">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="text-xs font-bold leading-relaxed">
                <strong>Official Government Server Advisory:</strong> Gujarat State portals (AnyRoR and i-ORA) frequently undergo scheduled server maintenance during weekends and off-business hours. If queries time out, retry during standard state working hours (10:30 AM – 6:00 PM IST).
              </p>
            </div>
          </div>

          {/* High-Intent Title Clearance Trigger */}
          <div className="relative overflow-hidden p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-slate-900 via-[#0B0F19] to-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Subtle Ambient Radial Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF7A00] text-[10px] font-black uppercase tracking-[0.25em]">
                <ShieldCheck className="h-3 w-3" /> Due Diligence Engine
              </span>
              <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white">
                Request an Official Land Title Clearance Report
              </h2>
              <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
                Our legal advocates cross-verify raw survey numbers against AnyRoR, i-ORA, and DSIRDA TP records on your behalf.
              </p>
            </div>
            <Link
              href="/clearance-engine"
              className="relative z-10 shrink-0 px-8 py-4 rounded-xl bg-[#FF7A00] hover:bg-orange-600 text-white font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-orange-600/25 flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Request Clearance Report</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Directory Grid Blocks */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
          <div className="grid gap-16 lg:gap-24">
            {categories.map((cat) => (
              <div key={cat.id} className="scroll-mt-32">
                
                {/* Category Header */}
                <div className="flex items-center gap-6 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="h-16 w-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#FF7A00] shadow-sm">
                    <cat.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                      {cat.title}
                    </h2>
                    <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {cat.links.map((link, lIdx) => {
                    const guideId = `${cat.id}-${lIdx}`;
                    const isGuideOpen = openGuide === guideId;

                    return (
                      <div
                        key={lIdx}
                        className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-[#FF7A00] transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                              <ShieldCheck className="h-3 w-3 text-[#10B981]" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                                {link.domain}
                              </span>
                            </div>
                            <ExternalLink className="h-5 w-5 text-slate-300 group-hover:text-[#FF7A00] transition-colors" />
                          </div>

                          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase leading-snug group-hover:text-[#FF7A00] transition-colors mb-3">
                            {link.name}
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">
                            {link.desc}
                          </p>

                          {/* Collapsible 3-Bullet Practical Micro-Guide */}
                          <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-800/50">
                            <button
                              onClick={() => setOpenGuide(isGuideOpen ? null : guideId)}
                              className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300"
                            >
                              <span>How to query this portal</span>
                              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isGuideOpen && "rotate-180 text-orange-600")} />
                            </button>

                            {isGuideOpen && (
                              <ul className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                                {link.steps.map((st, sIdx) => (
                                  <li key={sIdx} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>{st}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-orange-600 dark:bg-slate-800 dark:hover:bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm"
                          >
                            Access Official Portal <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
