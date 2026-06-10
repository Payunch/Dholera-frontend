"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  User, 
  Phone, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Building, 
  ShieldCheck, 
  Calendar as CalendarIcon,
  ChevronRight,
  Target,
  Users,
  History,
  Mail
} from "lucide-react";
import { apiClient } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useLead } from "@/providers/LeadProvider";
import { useLanguage } from "@/providers/LanguageProvider";

export default function AboutUsPage() {
  const { verifiedLead } = useLead();
  const { t } = useLanguage();
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Contact Form State
  const [contactForm, setContactForm] = React.useState({ name: "", phone: "", email: "" });
  const [contactStatus, setContactStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  // Site Visit Form State
  const [visitForm, setVisitForm] = React.useState({ name: "", phone: "", date: tomorrow });

  // Pre-fill forms if lead is already verified
  React.useEffect(() => {
    if (verifiedLead) {
      setContactForm(prev => ({
        ...prev,
        name: verifiedLead.name || prev.name,
        phone: verifiedLead.phone || prev.phone
      }));
      setVisitForm(prev => ({
        ...prev,
        name: verifiedLead.name || prev.name,
        phone: verifiedLead.phone || prev.phone
      }));
    }
  }, [verifiedLead]);
  const [visitStatus, setVisitStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'contact' | 'visit') => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (type === 'contact') setContactForm({ ...contactForm, phone: val });
    else setVisitForm({ ...visitForm, phone: val });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || contactForm.phone.length !== 10) return;
    setContactStatus("loading");
    try {
      await apiClient.post("/leads", { ...contactForm, source: "About Us - Contact Card" });
      setContactStatus("success");
      setContactForm({ name: "", phone: "", email: "" });
    } catch (err) {
      setContactStatus("error");
    }
  };

  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitForm.name || visitForm.phone.length !== 10) return;
    const selectedDate = new Date(visitForm.date);
    if (selectedDate > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) {
       setVisitStatus("error");
       return;
    }
    setVisitStatus("loading");
    try {
      await apiClient.post("/leads", { 
        ...visitForm, 
        source: "About Us - Site Visit Card",
        notes: `Requested site visit for: ${visitForm.date}`
      });
      setVisitStatus("success");
      setVisitForm({ name: "", phone: "", date: tomorrow });
    } catch (err) {
      setVisitStatus("error");
    }
  };

  return (
    <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pb-32 w-full overflow-x-hidden font-sans">
      
      {/* Header Section - Refactored for proper sizing */}
      <section className="relative bg-white dark:bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden">
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
             {t('intelligence_network')}
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[0.85]">
            {t('nav_about').split(' ').slice(0, 1).join(' ')} <span className="text-orange-600 italic">{t('nav_about').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-widest">
            {t('about_us_subtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 mt-24 max-w-[1600px]">
        
        {/* About Us Cards - REFACTORED FOR 1/2/3/4 RESPONSIVENESS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-32">
          {[
            { title: "Verified Data", desc: "Real-time TP maps and land records cross-checked with DSIRDA.", icon: ShieldCheck, img: "/images/airportVision.webp" },
            { title: "Expert Support", desc: "Connecting you with certified developers and legal advisors.", icon: Users, img: "/images/arialviewdholeraexpress.webp" },
            { title: "Strategic ROI", desc: "Data-driven insights to maximize your land appreciation.", icon: Target, img: "/images/expressHighway.webp" },
            { title: "Trust Record", desc: "Over 5 years of tracking Dholera's infrastructure milestones.", icon: History, img: "/images/dholerasirGujrat.webp" },
          ].map((item, i) => (
            <div key={i} className="group bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-black/60 hover:shadow-2xl dark:hover:shadow-black/100 hover:border-[#FF7A00] hover:-translate-y-2 transition-all duration-500 flex flex-col">
               <div className="relative h-56 w-full">
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    fill 
                    className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-6 left-6 h-12 w-12 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-orange-600 shadow-lg dark:shadow-black/80 border border-slate-100 dark:border-slate-800">
                     <item.icon className="h-6 w-6" />
                  </div>
               </div>
               <div className="p-8 space-y-3">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-orange-600 transition-colors">{item.title}</h3>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-widest">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>

        {/* Founder Profile Section - Refactored for better spacing/grid */}
        <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-14 lg:p-20 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-black/90 mb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 group hover:shadow-2xl dark:hover:shadow-black/100 transition-all duration-500 overflow-hidden">
           
           {/* Background Image */}
           <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-700 pointer-events-none">
              <Image 
                src="/images/a1.jpg" 
                alt="Naresh Gohel Dholera Site" 
                fill 
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-slate-900/80 group-hover:bg-slate-900/70 transition-colors duration-500" />
           </div>

           {/* Founder Image */}
           <div className="relative z-10 w-full lg:w-[400px] shrink-0 aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl dark:shadow-black/100 group-hover:-translate-y-2 transition-transform duration-500 border border-white/10">
              <Image 
                src="/images/ng.png" 
                alt="Naresh Gohel - Founder" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
              <div className="absolute bottom-8 left-8">
                 <h3 className="text-3xl font-black text-white uppercase tracking-tight">Naresh Gohel</h3>
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">Founder & Director</p>
              </div>
           </div>

           {/* Content */}
           <div className="relative z-10 flex-1 space-y-10">
              <div className="inline-flex items-center rounded-full bg-orange-600/20 border border-orange-500/30 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-orange-400">
                 {t('visionary_leadership_title')}
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white uppercase leading-[1] tracking-tight group-hover:text-[#FF7A00] transition-colors duration-300">
                 {t('about_title').split(' ').slice(0, 1).join(' ')} <span className="italic text-[#FF7A00]">{t('about_title').split(' ').slice(1).join(' ')}</span>
              </h2>
              <div className="relative">
                 {/* Quote Mark Decoration */}
                 <div className="absolute -top-10 -left-10 text-[10rem] font-serif text-slate-700 dark:text-slate-800 opacity-20 z-0">"</div>
                 <p className="relative z-10 text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic border-l-8 border-[#FF7A00] pl-8">
                    {t('visionary_leadership_desc')}
                 </p>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
