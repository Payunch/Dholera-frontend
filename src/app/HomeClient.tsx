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
  Calendar as CalendarIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import { useLanguage } from "@/providers/LanguageProvider";
import { apiClient } from "@/lib/api";

export function HomeClient() {
  const { t } = useLanguage();
  // Site Visit Form State
  const [visitForm, setVisitForm] = React.useState({ name: "", phone: "", date: "" });
  const [visitStatus, setVisitFormStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [hoveredGrid, setHoveredGrid] = React.useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const heroImages = [
    "/images/a1.jpg",
    "/images/a2.jpg",
    "/images/a3.jpg",
    "/images/a4.jpg"
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setVisitForm({ ...visitForm, phone: val });
  };

  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitForm.name || visitForm.phone.length !== 10) return;
    setVisitFormStatus("loading");
    
    try {
      await apiClient.post("/leads", { 
        ...visitForm, 
        source: "Website Site Visit Request",
        notes: `Requested site visit for: ${visitForm.date}`
      });
      setVisitFormStatus("success");
      setVisitForm({ name: "", phone: "", date: "" });
    } catch (err) {
      console.error("Site visit submission error:", err);
      setVisitFormStatus("error");
    }
  };

  return (
    <div className="flex flex-col bg-white">
      
      {/* 1.1 HERO SECTION */}
      <section className="relative w-full min-h-[90vh] bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800">
        {/* Animated Hero Carousel */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                currentImageIndex === idx ? "opacity-40" : "opacity-0"
              )}
            >
              <Image
                src={img}
                alt={`Dholera SIR Vision ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-cover object-center transform scale-105"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-[#0B132B] pointer-events-none" />
          {/* Interactive Grid on top */}
          <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-12 md:grid-cols-20 grid-rows-12 gap-px opacity-15">
            {Array.from({ length: 240 }).map((_, i) => (
              <div 
                key={i} 
                onMouseEnter={() => setHoveredGrid(i)}
                onMouseLeave={() => setHoveredGrid(null)}
                className={cn(
                  "w-full h-full border border-slate-800 transition-all duration-300",
                  hoveredGrid === i ? "bg-[#FF7A00] shadow-[0_0_15px_#FF7A00] opacity-100" : "bg-transparent"
                )}
              />
            ))}
          </div>
        </div>

        <div className="container relative z-10 px-4 md:px-8 mx-auto mt-20">
          <div className="max-w-4xl backdrop-blur-md bg-slate-950/40 p-8 md:p-12 rounded-[2rem] border border-slate-800 shadow-2xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF7A00] mb-8">
              <div className="relative h-5 w-5">
                <Image 
                  src="/images/hp.png" 
                  alt="Independent Investment Intelligence" 
                  fill 
                  className="object-contain"
                />
              </div>
              Independent Investment Intelligence
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white uppercase leading-[1.1] mb-6">
              Decide with <span className="text-[#FF7A00] italic">Certainty</span> in Dholera SIR
            </h1>

            <p className="max-w-2xl text-lg font-medium text-slate-300 md:text-xl leading-relaxed mb-10">
              The definitive platform for verified TP maps, infrastructure progress, and industrial plot analytics. 
              Move from data to decisions with zero ambiguity.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#FF7A00] px-10 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600 sm:w-auto shadow-xl shadow-orange-600/20"
              >
                Book Free Site Visit
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                href="/projects"
                className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl border-2 border-white/20 bg-transparent px-10 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white/5 sm:w-auto"
              >
                View Verified Projects
              </Link>
            </div>
            
            <div className="flex items-center gap-4 pt-8 opacity-80">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-700" />
                ))}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Trusted by 12,000+ Global Investors</p>
            </div>
          </div>
        </div>
      </section>

      {/* SITE VISIT MODAL */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8 bg-[#0B132B]/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => { if (visitStatus !== 'loading') setIsModalOpen(false); }}
        >
          <div 
            className="bg-[#0B132B] rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-lg relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {visitStatus === 'error' && (
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-[10px] font-bold text-red-500 uppercase tracking-wider">
                <AlertCircle className="h-4 w-4 shrink-0" />
                Connection Error. Neural link failed. Please try again.
              </div>
            )}

            {visitStatus === 'success' ? (
              <div className="text-center py-10 space-y-6">
                <div className="h-20 w-20 bg-green-500/20 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#10B981]/30">
                  <CheckCircle2 className="h-10 w-10 animate-in zoom-in-50 duration-500" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight">Request Received!</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-[280px] mx-auto">
                  Our Dholera expert will call you within 15 minutes to confirm details.
                </p>
                <button 
                  onClick={() => { setIsModalOpen(false); setVisitFormStatus('idle'); }}
                  className="mt-8 px-10 py-4 bg-[#FF7A00] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF7A00] mb-4">
                    Instant Booking
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Exclusive <span className="text-[#FF7A00] italic">Offer</span></h3>
                </div>

                <form className="space-y-4" onSubmit={handleVisitSubmit}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="ENTER YOUR NAME" 
                      required 
                      value={visitForm.name}
                      onChange={(e) => setVisitForm({...visitForm, name: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold uppercase tracking-widest placeholder-slate-700 text-white outline-none focus:border-[#FF7A00] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="10-DIGIT MOBILE NUMBER" 
                      required 
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={visitForm.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold uppercase tracking-widest placeholder-slate-700 text-white outline-none focus:border-[#FF7A00] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Preferred Date</label>
                    <input 
                      type="date" 
                      required 
                      value={visitForm.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setVisitForm({...visitForm, date: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold uppercase tracking-widest placeholder-slate-700 text-white outline-none focus:border-[#FF7A00] transition-all"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={visitStatus === 'loading' || visitForm.phone.length !== 10}
                    className="w-full h-16 mt-6 rounded-2xl bg-[#FF7A00] text-white text-sm font-black uppercase tracking-[0.2em] hover:bg-orange-600 disabled:bg-slate-800 disabled:text-slate-600 transition-all shadow-[0_0_30px_rgba(255,122,0,0.3)] flex items-center justify-center"
                  >
                    {visitStatus === 'loading' ? (
                      <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Confirm Booking Request"
                    )}
                  </button>
                  <p className="text-center text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-6">
                    Professional pick-up and premium stay included.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* 1.2 TRUST BANNER */}
      <section className="bg-white py-16 border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase leading-tight">
              Institutional Anchors Driving Dholera&apos;s Growth
            </h2>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              Multi-billion dollar infrastructure foundations already operational or underway.
            </p>
          </div>

          <div className="relative flex overflow-hidden group">
            <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 items-center py-4">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {[
                    { logo: "/images/tata.png", name: "Tata Electronics" },
                    { logo: "/images/larsen-toubro.png", name: "L&T Infrastructure" },
                    { logo: "/images/torrent.png", name: "Torrent Power" },
                    { logo: "/images/renew.png", name: "ReNew Power" }
                  ].map((giant, idx) => (
                    <div key={`${i}-${idx}`} className="relative h-12 w-40 flex-shrink-0 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500">
                      <Image
                        src={giant.logo}
                        alt={`${giant.name} logo`}
                        fill
                        className="object-contain"
                        onError={(e: any) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute -bottom-8 inset-x-0 text-center text-[8px] font-black uppercase tracking-widest text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {giant.name}
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </div>
      </section>

      {/* 1.25 FEATURED PROJECTS SECTION */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="mb-16 text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00]">
              VERIFIED PORTFOLIO
            </span>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight">
              Featured <span className="text-[#FF7A00] italic">Developments</span>
            </h2>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest leading-relaxed">
              Explore verified residential communities, airport logistics zones, and industrial parks in Dholera SIR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {projects.slice(0, 3).map((project) => {
              const projectDesc = t(project.descKey);
              return (
                <div
                  key={project.slug}
                  className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/0 transition-colors duration-300" />
                      
                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-md z-10">
                        {project.category}
                      </span>

                      {project.reraApproved && (
                        <span className="absolute top-4 right-4 bg-green-50 text-green-700 border border-green-200 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-sm z-10">
                          RERA
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-4">
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-[#FF7A00]">
                        <MapPin className="h-3.5 w-3.5" />
                        {project.location.split(",")[0]}
                      </div>

                      <h3 className="font-display text-xl font-bold uppercase tracking-tight text-slate-900 group-hover:text-[#FF7A00] transition-colors">
                        {project.name}
                      </h3>

                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">
                        {t(project.taglineKey)}
                      </p>

                      <p className="text-xs font-semibold text-slate-500 leading-relaxed line-clamp-3">
                        {projectDesc}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-8 pt-0">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#FF7A00] transition-all group/btn shadow-md"
                    >
                      Analyze Project Specs
                      <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#FF7A00] transition-all shadow-md flex items-center gap-2">
              Browse All Projects <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tp-maps" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-black uppercase tracking-widest text-[10px] hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all shadow-sm flex items-center gap-2">
              TP Maps Matrix <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 1.3 FREE SITE VISIT & LUXURY STAY SECTION */}
      <section id="site-visit" className="bg-slate-100 py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex justify-center">
          <div className="bg-[#0B132B] rounded-[2rem] p-10 md:p-14 shadow-2xl w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center border border-slate-800">
            
            <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00]">
                    Exclusive Offer
                </div>
                <h2 className="font-display text-4xl font-black text-white md:text-5xl uppercase leading-[1.1]">
                  Free Site Visit <br/> <span className="text-[#FF7A00] italic">& Luxury Stay</span>
                </h2>
                <p className="text-sm font-medium text-slate-400 leading-relaxed tracking-wide">
                  Experience the Dholera miracle firsthand. We provide pick-up, guided site tours, and overnight guest house stay—completely on us.
                </p>
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7A00]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">Pick-up from Ahmedabad/Airport</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7A00]">
                      <Building className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">Premium Guest House Stay</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7A00]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">Verified Title Reviews</span>
                  </div>
                </div>
            </div>

            <div className="bg-slate-900 rounded-[1.5rem] p-8 md:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
                {visitStatus === 'error' && (
                  <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-[10px] font-bold text-red-500 uppercase tracking-wider">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Connection Error. Transmission failed.
                  </div>
                )}
                {visitStatus === 'success' ? (
                  <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-300">
                    <div className="h-20 w-20 bg-green-500/20 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase">Request Received!</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase leading-relaxed max-w-[240px] mx-auto">
                      Our Dholera expert will call you within 15 minutes.
                    </p>
                    <button 
                      onClick={() => setVisitFormStatus('idle')}
                      className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] hover:text-orange-400 pt-4"
                    >
                      Book Another Slot
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-black text-white uppercase mb-6 text-center">Secure Your Slot</h3>
                    <form className="space-y-4" onSubmit={handleVisitSubmit}>
                      <div>
                        <input 
                          type="text" 
                          placeholder="FULL NAME" 
                          required 
                          value={visitForm.name}
                          onChange={(e) => setVisitForm({...visitForm, name: e.target.value})}
                          className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold uppercase tracking-widest placeholder-slate-500 text-white outline-none focus:border-[#FF7A00] transition-all"
                        />
                      </div>
                      <div>
                        <input 
                          type="tel" 
                          placeholder="PHONE NUMBER (10 DIGITS)" 
                          required 
                          pattern="[0-9]{10}"
                          maxLength={10}
                          value={visitForm.phone}
                          onChange={handlePhoneChange}
                          className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold uppercase tracking-widest placeholder-slate-500 text-white outline-none focus:border-[#FF7A00] transition-all"
                        />
                      </div>
                      <div>
                        <input 
                          type="date" 
                          required 
                          value={visitForm.date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setVisitForm({...visitForm, date: e.target.value})}
                          className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold uppercase tracking-widest placeholder-slate-500 text-white outline-none focus:border-[#FF7A00] transition-all"
                        />
                      </div>
                      <button 
                        type="submit"
                        disabled={visitStatus === 'loading' || visitForm.phone.length !== 10}
                        className="w-full h-14 mt-4 rounded-xl bg-[#FF7A00] text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-600 disabled:bg-slate-700 disabled:text-slate-400 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center"
                      >
                        {visitStatus === 'loading' ? (
                          <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          "Book Now"
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
