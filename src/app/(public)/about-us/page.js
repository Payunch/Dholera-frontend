"use client";

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Users, Target, History, Award, CheckCircle2, ArrowRight, MessageSquare, Phone, Linkedin, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/providers/LanguageProvider';

export default function AboutPage() {
  const { t } = useLanguage();

  const trustPillars = [
    { 
      title: "Verified Data", 
      desc: "Real-time TP schemes, GIS coordinates, and land records cross-checked with Gujarat State gazettes.", 
      icon: ShieldCheck, 
      img: "/images/airportVision.webp",
      tag: "100% Due Diligence"
    },
    { 
      title: "Expert Support", 
      desc: "Direct access to certified legal advocates, RERA advisors, and civil engineers on ground in Dholera.", 
      icon: Users, 
      img: "/images/arialviewdholeraexpress.webp",
      tag: "On-Ground Advisory"
    },
    { 
      title: "Strategic ROI", 
      desc: "Data-driven capital allocation models to maximize appreciation across industrial and plotted sectors.", 
      icon: Target, 
      img: "/images/expressHighway.webp",
      tag: "Capital Alpha"
    },
    { 
      title: "Trust Record", 
      desc: "Over 5 years of tracking Dholera's infrastructure milestones, civil progress, and policy updates.", 
      icon: History, 
      img: "/images/dholerasirGujrat.webp",
      tag: "Proven Track Record"
    },
  ];

  return (
    <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pb-32 w-full overflow-x-hidden font-sans dark:bg-slate-900">
      
      {/* Header Section */}
      <section className="relative bg-white dark:bg-[#0B132B] pt-32 pb-24 border-b border-slate-200 dark:border-slate-800 overflow-hidden dark:bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <Image 
            src="/images/futuristic_dholera.png" 
            alt="Dholera Vision" 
            fill 
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6 pt-20">
          <div className="inline-flex items-center rounded-full bg-[#FF7A00]/10 border border-orange-500/30 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#FF7A00]">
            {t('intelligence_network') || 'Dholera Platform Intelligence Network'}
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[0.85]">
            {t('nav_about') || 'About Us'}
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-widest">
            {t('about_us_subtitle') || 'Bridging institutional investors and landowners with verified DSIRDA land intelligence, Town Planning schemes, and on-ground due diligence.'}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 mt-24 max-w-[1600px] space-y-28">
        
        {/* Trust Pillars Grid */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">Our Institutional Foundation</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 dark:text-white">
              Why Investors Trust Dholera Platform
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {trustPillars.map((item, i) => (
              <div 
                key={i} 
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-[#FF7A00] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image 
                      src={item.img} 
                      alt={item.title} 
                      fill 
                      className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    />
                    <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-transparent transition-colors" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[9px] font-black uppercase tracking-wider text-orange-600">
                      {item.tag}
                    </span>
                    <div className="absolute bottom-4 left-4 h-12 w-12 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-orange-600 shadow-lg border border-slate-100 dark:border-slate-800">
                      <item.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="p-6 md:p-8 space-y-3">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Founder Profile Section */}
        <section className="relative bg-slate-900 rounded-[3rem] p-8 md:p-14 lg:p-20 border border-slate-800 shadow-2xl overflow-hidden text-white">
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <Image 
              src="/images/a1.jpg" 
              alt="Naresh Gohel Dholera Site" 
              fill 
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-slate-950/80" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Founder Image */}
            <div className="relative w-full lg:w-[380px] shrink-0 aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group">
              <Image 
                src="/images/ng.png" 
                alt="Naresh Gohel - Founder & Senior Land Advisor" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Naresh Gohel</h3>
                <p className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">Founder & Chief Land Strategist</p>
              </div>
            </div>

            {/* Founder Narrative */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center rounded-full bg-orange-600/20 border border-orange-500/30 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
                Ground Leadership & Proven Integrity
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black text-white uppercase leading-tight">
                Empowering Investors with Uncompromising Due Diligence
              </h2>

              <blockquote className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed italic border-l-4 border-orange-500 pl-6 space-y-2">
                <p>
                  &ldquo;In Dholera SIR, true capital protection comes from verifying every single Survey Number, Final Plot allocation, and revenue entry at the taluka office before a single rupee changes hands.&rdquo;
                </p>
              </blockquote>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                With over a decade of deep involvement in Gujarat&apos;s special investment regions, Naresh Gohel has guided domestic buyers, NRIs, and institutional developers through land assembly, title verification, NA permissions, and RERA compliance.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://wa.me/917435808031?text=Hi%20Naresh,%20I%20would%20like%20to%20connect%20regarding%20land%20advisory%20in%20Dholera." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" /> Connect with Naresh
                </a>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  Schedule Advisory Session
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Actionable 1-on-1 Consultation Booking Card */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0B0F19] to-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-14 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3 max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF7A00] text-[10px] font-black uppercase tracking-[0.25em]">
              Direct Consultation
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              Book a 1-on-1 Strategic Land Consultation
            </h2>
            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
              Have specific survey numbers, TP schemes, or budget parameters? Speak directly with Naresh Gohel for unbiased, certified title guidance and on-ground plot verification.
            </p>
          </div>
          <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a 
              href="https://wa.me/917435808031?text=Hi%20Naresh,%20I%20would%20like%20to%20book%20a%201-on-1%20strategic%20land%20consultation%20with%20you%20regarding%20Dholera%20investments." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 rounded-xl bg-[#FF7A00] hover:bg-orange-600 text-white text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-600/20 text-center flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Book via WhatsApp</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a  
              href="tel:+917435808031"
              style={{ color: '#ffffff' }}
              className="px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white !text-white border border-slate-700 text-xs font-black tracking-widest transition-all shadow-lg text-center flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4 text-[#FF7A00]" />
              +91 74358 08031
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
