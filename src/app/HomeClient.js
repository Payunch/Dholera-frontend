"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Building,
  ArrowRight,
  X,
  AlertCircle,
  Calendar 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import { useLanguage } from "@/providers/LanguageProvider";
import { useLead } from "@/providers/LeadProvider";
import { apiClient } from "@/lib/api";

export function HomeClient() {
  const { t } = useLanguage();
  const { verifiedLead } = useLead();
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  // Site Visit Form State
  const [visitForm, setVisitForm] = React.useState({ name: "", phone: "", date: tomorrow });

  // Pre-fill form if lead is already verified
  React.useEffect(() => {
    if (verifiedLead) {
      setVisitForm(prev => ({
        ...prev,
        name: verifiedLead.name || prev.name,
        phone: verifiedLead.phone || prev.phone
      }));
    }
  }, [verifiedLead]);
  const [visitStatus, setVisitFormStatus] = React.useState("idle");
  const [hoveredGrid, setHoveredGrid] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const heroImages = [
    "/images/arialviewdholeraexpress.webp",
    "/images/airportVision.webp",
    "/images/expressHighway.webp",
    "/images/dholerasirGujrat.webp"
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setVisitForm({ ...visitForm, phone: val });
    if (visitStatus === 'error') setVisitFormStatus('idle');
  };

  const handleVisitSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!visitForm.name || !phoneRegex.test(visitForm.phone)) {
      setVisitFormStatus("error");
      return;
    }

    // Date validation: must be within a week
    const selectedDate = new Date(visitForm.date);
    const maxDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    if (selectedDate > maxDate) {
      setVisitFormStatus("error");
      return;
    }

    setVisitFormStatus("loading");

    try {
      const utmSource = typeof window !== 'undefined' 
        ? new URLSearchParams(window.location.search).get('utm_source') || sessionStorage.getItem('dholera_utm_source') || 'organic' 
        : 'organic';
      await apiClient.post("/leads", {
        ...visitForm,
        source: "Website Site Visit Request",
        utm_source: utmSource,
        notes: `Requested site visit for: ${visitForm.date}`
      });
      setVisitFormStatus("success");
      
      // Fire Meta Pixel Event
      if (typeof window !== "undefined" && (window).fbq) {
        (window).fbq('track', 'Lead');
      }

      // Fire Google Ads Conversion Event
      if (typeof window !== "undefined" && (window).gtag) {
        (window).gtag('event', 'conversion', {
          'send_to': process.env.NEXT_PUBLIC_GOOGLE_ADS_ID + '/lead_conversion_label' // Assuming a default label, they can change this later
        });
      }

      const whatsappMessage = `Hello Naresh, I have submitted a Site Visit Request.\n*Name:* ${visitForm.name}\n*Phone:* ${visitForm.phone}\n*Date:* ${visitForm.date}`;
      const whatsappUrl = `https://wa.me/917435808031?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      setVisitForm({ name: "", phone: "", date: tomorrow });
    } catch (err) {
      console.error("Site visit submission error:", err);
      setVisitFormStatus("error");
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-slate-950 overflow-x-hidden w-full transition-colors">

      {/* 1.1 HERO SECTION - REFACTORED FOR PROPER SIZING */}
      <section className="relative w-full min-h-[70vh] md:min-h-[85vh] lg:min-h-[95vh] bg-white dark:bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800">
        {/* Animated Hero Carousel with HIGH-RES IMAGES */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={cn(
                "absolute inset-0 transition-opacity duration-[2000ms] ease-in-out will-change-opacity",
                currentImageIndex === idx ? "opacity-100 dark:opacity-60" : "opacity-0"
              )}
            >
              <Image
                src={img}
                alt={`Dholera SIR Infrastructure ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-cover object-center transform scale-110 motion-safe:animate-[pulse_10s_infinite] will-change-transform"
                sizes="100vw"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-white/5 dark:bg-slate-950/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/40 dark:from-[#0B132B] dark:via-transparent dark:to-[#0B132B]/80 pointer-events-none" />

          {/* Subtle Dholera Vector Overlay */}
          <div className="absolute inset-0 bg-[url('/logo.png')] bg-no-repeat bg-center opacity-5 grayscale invert scale-[1.5] md:scale-[2] pointer-events-none" />

          {/* Interactive Grid on top - Fluid Sizing */}
          <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-12 lg:grid-cols-20 grid-rows-12 gap-px opacity-10">
            {Array.from({ length: 240 }).map((_, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredGrid(i)}
                onMouseLeave={() => setHoveredGrid(null)}
                className={cn(
                  "w-full h-full border border-slate-700/50 transition-all duration-500",
                  hoveredGrid === i ? "bg-[#FF7A00] shadow-[0_0_20px_#FF7A00] opacity-80" : "bg-transparent"
                )}
              />
            ))}
          </div>
        </div>

        <div className="container relative z-10 px-4 md:px-8 mx-auto py-12 md:py-20 flex justify-center">
          <div className="max-w-4xl w-full backdrop-blur-xl bg-white/95 dark:bg-slate-950/80 p-6 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[2.5rem] border border-white/80 dark:border-white/10 shadow-2xl relative overflow-hidden">
            {/* Background Image for the Content Box */}
            <div className="absolute inset-0 z-0 opacity-20 dark:opacity-25 pointer-events-none">
              <Image
                src="/images/futuristic_dholera.png"
                alt="Dholera Future Vision"
                fill
                className="object-cover object-right-center"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/95 to-white/70 dark:from-slate-950 dark:via-slate-950/90 dark:to-slate-950/65 pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#FF7A00] mb-8 animate-fade-in">
                <div className="relative h-6 w-6 shrink-0">
                  <Image
                    src="/images/hp.png"
                    alt={t('verified_data')}
                    fill
                    sizes="24px"
                    className="object-contain"
                  />
                </div>
                <span className="hidden sm:inline">{t('verified_data')}</span>
                <span className="sm:hidden">{t('verified_data')}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-black tracking-normal text-slate-950 dark:text-white uppercase leading-[1.05] mb-8 max-w-3xl">
                {t('hero_title')}
              </h1>

              <p className="max-w-2xl text-base sm:text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100 leading-relaxed mb-12">
                {t('hero_desc')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#FF7A00] px-10 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600 sm:w-auto shadow-xl shadow-orange-600/10 active:scale-95"
                >
                  {t('talk_to_owner')}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projects"
                  className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#FF7A00] px-10 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600 sm:w-auto shadow-xl shadow-orange-600/10 active:scale-95"
                //  className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-md px-10 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white dark:hover:bg-slate-800/10 sm:w-auto active:scale-95 dark:bg-slate-900"
                >
                  {t('view_projects')}
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-10 opacity-60">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-900 dark:text-white">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{t('trusted_by')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.2 TRUST BANNER */}
      <section className="bg-white dark:bg-slate-950 py-16 border-b border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase leading-tight">
              {t('institutional_anchors_title')}
            </h2>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              {t('institutional_anchors_desc')}
            </p>
          </div>

          <div className="relative overflow-hidden group bg-white dark:bg-slate-950 w-full">
            <div className="flex w-max animate-marquee items-center py-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-16 md:gap-32 pr-16 md:pr-32 items-center shrink-0">
                  {[
                    { logo: "/images/tata.png", name: "Tata Electronics" },
                    { logo: "/images/larsen-toubro.png", name: "L&T Infrastructure" },
                    { logo: "/images/torrent.png", name: "Torrent Power" },
                    { logo: "/images/renew.png", name: "ReNew Power" },
                    { logo: "/images/tata.png", name: "Tata Electronics" },
                    { logo: "/images/larsen-toubro.png", name: "L&T Infrastructure" },
                    { logo: "/images/torrent.png", name: "Torrent Power" },
                    { logo: "/images/renew.png", name: "ReNew Power" },
                    { logo: "/images/tata.png", name: "Tata Electronics" },
                    { logo: "/images/larsen-toubro.png", name: "L&T Infrastructure" },
                    { logo: "/images/torrent.png", name: "Torrent Power" },
                    { logo: "/images/renew.png", name: "ReNew Power" }
                  ].map((giant, idx) => (
                    <div key={`${i}-${idx}`} className="relative h-32 w-80 flex-shrink-0 opacity-100 transition-all duration-500 hover:scale-110">
                      <Image
                        src={giant.logo}
                        alt={`${giant.name} logo`}
                        fill
                        sizes="(max-width: 768px) 200px, 320px"
                        className="object-contain dark:brightness-200"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute -bottom-8 inset-x-0 text-center text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {giant.name}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Gradient Overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 1.25 FEATURED PROJECTS SECTION */}
      <section className="py-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4 md:px-8">

          <div className="mb-16 text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00]">
              {t('verified_portfolio_title')}
            </span>
            <h2 className="font-display text-4xl font-black text-slate-900 dark:text-white md:text-5xl uppercase leading-tight">
              {t('featured_developments').split('').slice(0, 1).join('')} <span className="text-[#FF7A00] italic">{t('featured_developments').split('').slice(1).join('')}</span>
            </h2>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
              {t('explore_verified_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {projects.slice(0, 3).map((project) => {
              const projectDesc = t(project.descKey);
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#FF7A00] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative h-56 w-full bg-white dark:bg-slate-800 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-500" />

                      {/* Category Badge */}
                      <span className="absolute top-5 left-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg z-10 transition-transform group-hover:scale-110">
                        {project.category}
                      </span>

                      {project.reraApproved && (
                        <span className="absolute top-5 right-5 bg-green-500 text-slate-900 dark:text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg z-10 transition-transform group-hover:scale-110">
                          RERA VERIFIED
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-5">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
                        <MapPin className="h-3.5 w-3.5" />
                        {project.location.split(",")[0]}
                      </div>

                      <h3 className="font-display text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-[#FF7A00] transition-colors duration-300">
                        {project.name}
                      </h3>

                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 leading-none">
                        {t(project.taglineKey)}
                      </p>

                      <p className="text-sm font-medium text-slate-500 dark:text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        {projectDesc}
                      </p>
                    </div>
                  </div>

                  {/* Actions (Visual Button) */}
                  <div className="p-8 pt-0">
                    <div className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest group-hover:bg-[#FF7A00] transition-all duration-300 shadow-xl shadow-slate-950/5 group-hover:shadow-orange-600/10">
                      {t('get_access')}
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>

                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="px-8 py-4 bg-[#FF7A00] text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all shadow-md flex items-center gap-2">
              {t('nav_projects')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tp-maps" className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all shadow-sm flex items-center gap-2">
              {t('nav_tp_maps')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 1.3 FREE SITE VISIT & LUXURY STAY SECTION */}
      <section id="site-visit" className="bg-white dark:bg-slate-950 py-32 relative overflow-hidden transition-colors">
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex justify-center">
          <div className="bg-white dark:bg-[#0B132B] rounded-[2rem] p-10 md:p-14 shadow-2xl w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center border border-slate-800 relative overflow-hidden dark:bg-slate-900">

            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
              <Image
                src="/images/ng1.png"
                alt="Dholera Aerial Vision"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />

            </div>

            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00]">
                {t('exclusive_offer')}
              </div>
              <h2 className="font-display text-4xl font-black text-slate-900 dark:text-white md:text-5xl uppercase leading-[1.1]">
                {t('talk_to_owner_title').split('').slice(0, 2).join('')} <br /> <span className="text-[#FF7A00] italic">{t('talk_to_owner_title').split('').slice(2).join('')}</span>
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed tracking-wide">
                {t('talk_to_owner_desc')}
              </p>
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7A00] dark:bg-slate-900">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{t('pickup_service')}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7A00] dark:bg-slate-900">
                    <Building className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{t('premium_stay')}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7A00] dark:bg-slate-900">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{t('title_review')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-8 md:p-10 border border-slate-800 shadow-xl relative overflow-hidden z-10">
              {visitStatus === 'error' && (
                <div className="mb-8 flex flex-col gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-[10px] font-bold text-red-400 uppercase tracking-widest leading-relaxed">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{t('transmission_failed')}</span>
                  </div>
                  <p className="text-[9px] text-red-500/80 pl-8">
                    {new Date(visitForm.date) > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                      ? t('date_limit_msg')
                      : t('err_generic')}
                  </p>
                </div>
              )}
              {visitStatus === 'success' ? (
                <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-300">
                  <div className="h-20 w-20 bg-green-500/20 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#10B981]/30">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase">{t('request_received')}</h3>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase leading-relaxed max-w-[240px] mx-auto">
                    {t('call_back_msg')}
                  </p>
                  <button
                    onClick={() => setVisitFormStatus('idle')}
                    className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] hover:text-orange-400 pt-4"
                  >
                    {t('book_another')}
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-6 text-center">{t('priority_conn')}</h3>
                  <form className="space-y-4" onSubmit={handleVisitSubmit}>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{t('full_name')}</label>
                      <input
                        type="text"
                        placeholder={t('full_name')}
                        required
                        value={visitForm.name}
                        onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-widest placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{t('mobile_number')}</label>
                      <input
                        type="tel"
                        placeholder="10-DIGIT MOBILE"
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={visitForm.phone}
                        onChange={handlePhoneChange}
                        className={`w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-950 border ${visitForm.phone.length > 0 && visitForm.phone.length < 10 ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} text-xs font-bold uppercase tracking-widest placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-all`}
                      />
                      {visitForm.phone.length > 0 && visitForm.phone.length < 10 && (
                        <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1 animate-pulse">
                          {t('phone_too_short') || "MUST BE 10 DIGITS"}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex justify-between">
                        <span>{t('deployment_date')}</span>
                        <span className="text-orange-500/50">{t('date_limit_msg')}</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={visitForm.date}
                        min={today}
                        max={nextWeek}
                        onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={visitStatus === 'loading' || visitForm.phone.length !== 10}
                      className="w-full h-14 mt-4 rounded-xl bg-[#FF7A00] text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-600 disabled:bg-slate-700 disabled:text-slate-400 transition-all shadow-xl shadow-orange-600/10 flex items-center justify-center active:scale-95"
                    >
                      {visitStatus === 'loading' ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        t('establish_conn')
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
