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
  Calendar,
  Sparkles,
  Lock,
  Shield,
  Bell,
  FileText
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
  const [visitError, setVisitError] = React.useState("");

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

  const uniqueHighlights = [
    {
      icon: Sparkles,
      title: "Daily admin updates",
      text: "Fresh Dholera posts can be published by admin every day and shown inside the app for logged-in users."
    },
    {
      icon: Lock,
      title: "Logged-in only access",
      text: "Exclusive posts, PDFs, and reports can be hidden from anonymous visitors and unlocked after login."
    },
    {
      icon: Shield,
      title: "Secure account flow",
      text: "Users sign up with mobile, email, and password while the app keeps the session and initials safe."
    },
    {
      icon: Bell,
      title: "Real-time notifications",
      text: "Important updates and new content can be pushed to the app so users return when something changes."
    },
    {
      icon: FileText,
      title: "Watermarked reports",
      text: "PDF previews can be stamped with the user name and mobile number so shared documents stay traceable."
    }
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
    if (visitStatus === 'error') {
      setVisitFormStatus('idle');
      setVisitError("");
    }
  };

  const handleVisitSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!visitForm.name || !phoneRegex.test(visitForm.phone)) {
      setVisitFormStatus("error");
      setVisitError(!visitForm.name ? "Please enter your full name." : "Please enter a valid 10-digit mobile number.");
      return;
    }

    // Date validation: must be within a week
    const selectedDate = new Date(visitForm.date);
    const maxDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    if (selectedDate > maxDate) {
      setVisitFormStatus("error");
      setVisitError("Please choose a date within the next 7 days.");
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
    } catch (err) {
      console.error("Site visit submission error:", err);
      setVisitFormStatus("error");
      setVisitError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        ""
      );
    } finally {
      // ALWAYS open WhatsApp regardless of DB success (fallback)
      const whatsappMessage = `Hello Naresh, I have submitted a Site Visit Request.\n*Name:* ${visitForm.name}\n*Phone:* ${visitForm.phone}\n*Date:* ${visitForm.date}`;
      const whatsappUrl = `https://wa.me/917435808031?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      setVisitForm({ name: "", phone: "", date: tomorrow });
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
          <div className="max-w-4xl w-full glass-panel p-6 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[2.5rem] shadow-heavy relative overflow-hidden">
            {/* Background Image for the Content Box */}
            <div className="absolute inset-0 z-0 opacity-45 dark:opacity-40 pointer-events-none">
              <Image
                src="/images/futuristic_dholera.png"
                alt="Dholera Future Vision"
                fill
                className="object-cover object-right-center"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/95 via-white/80 to-white/35 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/40 pointer-events-none" />

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
                <span className="hidden sm:inline font-black">{t('verified_data')}</span>
                <span className="sm:hidden font-black">{t('verified_data')}</span>
              </div>

              <h1 className="font-display text-[1.913rem] sm:text-[3.188rem] md:text-[4.463rem] font-black tracking-normal text-slate-950 dark:text-white uppercase leading-[1.05] mb-8 max-w-3xl">
                {t('hero_title')}
              </h1>

              <p className="max-w-2xl text-[1.02rem] sm:text-[1.148rem] md:text-[1.275rem] font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-12">
                {t('hero_desc')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#F59E0B] px-10 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[#d97706] hover:scale-105 shadow-heavy sm:w-auto active:scale-95"
                >
                  {t('talk_to_owner')}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projects"
                  className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#0A192F] dark:bg-white dark:text-[#0A192F] px-10 text-xs font-black uppercase tracking-widest text-white transition-all hover:scale-105 shadow-heavy sm:w-auto active:scale-95"
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
                <p className="text-[8.16px] sm:text-[10.2px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{t('trusted_by')}</p>
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

      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,122,0,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_30%)]" />
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="mx-auto mb-14 max-w-4xl text-center space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-orange-300">
              <Sparkles className="h-3.5 w-3.5" />
              Unique App Features
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight">
              Why users keep coming back to the Dholera app
            </h2>
            <p className="mx-auto max-w-2xl text-sm md:text-base font-medium text-slate-300 leading-relaxed">
              The website should explain the app clearly: daily admin posts, locked content for logged-in users, secure account access, notifications, and protected PDF viewing.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {uniqueHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/10"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-orange-500/20 bg-orange-500/10 px-6 py-8 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="text-xl font-black uppercase text-white">Daily content, built for trust</h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Use the home page to explain what users get after login: verified updates, exclusive reports, and a secure account that remembers the user on return.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:justify-end">
              <Link
                href="/blogs"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#FF7A00] px-5 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-orange-600"
              >
                View Updates
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:border-orange-400/40 hover:bg-white/10"
              >
                Talk to Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="group text-left rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-[#FF7A00] hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF7A00]/10 text-[#FF7A00] ring-1 ring-[#FF7A00]/20">
                <Image
                  src="/images/hp.png"
                  alt="Dholera app icon"
                  width={34}
                  height={34}
                />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00]">
                App Preview
              </p>
              <h3 className="mt-3 text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                What the Dholera app gives users
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Tap to see the app summary. This card explains the daily admin updates, logged-in-only content, secure login flow, notifications, and protected PDF access that users get after installation.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                Open details
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>

            <Link
              href="/projects"
              className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-[#FF7A00] hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <Image
                  src="/images/hp.png"
                  alt="Explore projects"
                  width={34}
                  height={34}
                />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Explore the site
              </p>
              <h3 className="mt-3 text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                Browse projects and updates
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Use this tile to navigate through the main website sections, including projects, blogs, and contact.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#FF7A00]">
                Open site
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white p-8 shadow-2xl dark:bg-slate-950">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 rounded-full border border-slate-200 p-2 text-slate-500 transition-colors hover:text-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white"
              aria-label="Close app details"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-[#FF7A00]/10 ring-1 ring-[#FF7A00]/20">
                <Image
                  src="/images/hp.png"
                  alt="Dholera app icon"
                  width={48}
                  height={48}
                />
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00]">
                  Dholera App Summary
                </p>
                <h3 className="text-3xl font-black uppercase tracking-tight text-slate-950 dark:text-white">
                  Built to share Dholera information clearly
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  The app is meant to share Dholera-related updates, secure user content, PDFs, and daily admin posts. It should be described exactly that way in your store listing and website, without claiming official government affiliation unless you truly have it.
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    "Daily admin-posted updates",
                    "Login required for private content",
                    "Secure account and password flow",
                    "Notifications and PDF access"
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-[#FF7A00] px-5 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-orange-600"
                  >
                    Contact Team
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 px-5 text-xs font-black uppercase tracking-[0.2em] text-slate-700 transition-colors hover:border-[#FF7A00] hover:text-[#FF7A00] dark:border-slate-800 dark:text-slate-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

            <div className="glass-panel rounded-[1.5rem] p-8 md:p-10 shadow-heavy relative overflow-hidden z-10 hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)] transition-shadow duration-500">
              {visitStatus === 'error' && (
                <div className="mb-8 flex flex-col gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-[10px] font-bold text-red-400 uppercase tracking-widest leading-relaxed">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{t('transmission_failed')}</span>
                  </div>
                  <p className="text-[9px] text-red-500/80 pl-8">
                    {visitError || t('err_generic')}
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
