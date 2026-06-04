"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronRight, 
  ChevronLeft,
  X,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  FileText,
  CheckCircle2,
  MapPin,
  Calendar,
  MessageSquare,
  ExternalLink,
  Map,
  Building,
  Landmark,
  Grid
} from "lucide-react";
import { PdfListing } from "@/components/pdf/PdfListing";
import { useLanguage } from '@/providers/LanguageProvider';

export function HomeClient() {
  const { lang, t } = useLanguage();
  
  // Gallery Lightbox State
  const [activeImageIdx, setActiveImageIdx] = React.useState<number | null>(null);

  
  // Newsletter Form State
  const [newsEmail, setNewsEmail] = React.useState("");
  const [newsName, setNewsName] = React.useState("");
  const [newsPhone, setNewsPhone] = React.useState("");
  const [subscribeStep, setSubscribeStep] = React.useState<"email" | "verify" | "success" | "error">("email");
  const [newsLoading, setNewsLoading] = React.useState(false);

  const coreLoop = [
    {
      step: "01",
      title: "Context Pack",
      desc: "We collect only the inputs that impact DSIR planning decisions.",
      icon: FileText,
    },
    {
      step: "02",
      title: "Evidence Mapping",
      desc: "We translate raw plans into structured, investor-grade proof.",
      icon: ShieldCheck,
    },
    {
      step: "03",
      title: "Signal Review",
      desc: "You scan the exact signals that remove ambiguity and delay.",
      icon: BarChart3,
    },
    {
      step: "04",
      title: "Confidence to Act",
      desc: "Move forward with clarity on fees, zoning, and compliance.",
      icon: TrendingUp,
    },
  ];

  const qualityBar = [
    "No broken links or missing documents in the planning flow.",
    "Clear visual hierarchy for maps, fees, and compliance signals.",
    "Mobile-first layouts with zero horizontal scroll.",
    "Explicit upload timestamps for every verified PDF release.",
    "Verified copy and labels aligned with DSIRDA terminology.",
  ];

  const blogPosts = [
    {
      title: "Dholera Plot Price 2026: Latest Rates, Best Locations & Investment Guide",
      date: "June 2, 2026",
      author: "dholerahub@gmail.com",
      excerpt: "Dholera Plot Price 2026 is one of the most searched real estate topics among investors looking for opportunities in Gujarat. This guide highlights the latest price trends, best sectors to invest in, and how to verify zoning records.",
      image: "/images/fghj-300x200.jpeg",
      link: "/updates/1",
      tag: "Rates & Guide"
    },
    {
      title: "Why Smart Investors Are Turning Toward Emerging Real Estate Markets",
      date: "May 19, 2026",
      author: "dholerahub@gmail.com",
      excerpt: "Real estate has always been one of the strongest wealth-building assets across generations. While stocks and digital investments may fluctuate, emerging land markets with heavy government capital expenditure provide massive long-term growth.",
      image: "/images/expressHighway.webp",
      link: "/updates/2",
      tag: "Market Trends"
    },
    {
      title: "Understanding real estate wealth creation and the rise of a future-ready location",
      date: "May 5, 2026",
      author: "dholerahub@gmail.com",
      excerpt: "Real estate has earned its reputation as one of the most dependable ways to build long-term wealth. Discover how infrastructure catalysts like the DMIC, dedicated corridors, and smart utilities create property value multiplication.",
      image: "/images/345-1-e1777985454613-300x271.jpeg",
      link: "/updates/3",
      tag: "Wealth Creation"
    }
  ];

  const galleryItems = [
    {
      src: "/images/arialviewdholeraexpress.webp",
      title: "Ahmedabad–Dholera Expressway Drone Shot",
      desc: "Drone shot showcasing construction progress of the access-controlled high-speed expressway connecting Ahmedabad to Dholera SIR."
    },
    {
      src: "/images/expressHighway.webp",
      title: "Ahmedabad–Dholera Expressway Route",
      desc: "A close-up view of the under-construction asphalt lanes of the new high-speed highway corridor."
    },
    {
      src: "/images/airportFeatureimage.webp",
      title: "Dholera International Airport Site",
      desc: "An aerial shot of the airport site development. This airport will serve as the logistics backbone for the region."
    },
    {
      src: "/images/airportVision.webp",
      title: "Dholera Airport Terminal Render",
      desc: "Futuristic render of the passenger terminal and commercial hub at Dholera International Airport, planned to handle heavy cargo and passenger volumes."
    },
    {
      src: "/images/dholeraexpress.webp",
      title: "Expressway Alignment & GIS Map",
      desc: "GIS-accurate route alignment map showing the 109 km route of NH-751 Expressway, key interchanges, and its connection to the airport."
    },
    {
      src: "/images/dholerasirGujrat.webp",
      title: "Dholera SIR State Map Locator",
      desc: "Geographical locator map showing Dholera Special Investment Region relative to Ahmedabad, Vadodara, Bhavnagar, and the Gulf of Khambhat."
    }
  ];

  // Obsolete Satyaja descriptions removed. Specs are now handled inside the dynamic routes.


  // Handle lightbox navigational controls
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx !== null) {
      setActiveImageIdx((activeImageIdx - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx !== null) {
      setActiveImageIdx((activeImageIdx + 1) % galleryItems.length);
    }
  };

  // Close lightbox on escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImageIdx(null);
      } else if (e.key === "ArrowLeft") {
        if (activeImageIdx !== null) {
          setActiveImageIdx((activeImageIdx - 1 + galleryItems.length) % galleryItems.length);
        }
      } else if (e.key === "ArrowRight") {
        if (activeImageIdx !== null) {
          setActiveImageIdx((activeImageIdx + 1) % galleryItems.length);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIdx]);

  // Newsletter Actions
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSubscribeStep("verify");
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsName || !newsPhone) return;

    setNewsLoading(true);
    try {
      const { apiClient } = await import("@/lib/api");
      await apiClient.post("/leads", {
        name: newsName,
        phone: newsPhone,
        email: newsEmail,
        source: "Newsletter Subscription"
      });
      setSubscribeStep("success");
      setNewsEmail("");
      setNewsName("");
      setNewsPhone("");
    } catch {
      setSubscribeStep("error");
    } finally {
      setNewsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Sticky Mobile Contact Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[160] bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <a
          href="tel:+917435808310"
          className="flex-1 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
        >
          <div className="h-4 w-4 bg-white/10 rounded-lg flex items-center justify-center">
            <svg className="h-2.5 w-2.5 fill-current" viewBox="0 0 24 24"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.018-4.547-.19-5.859-2.29s-1.129-4.73.551-6.522c.012-.013.011-.013 2.022-2.164l-4.518-6.57c-1.819 1.159-4.532 3.868-4.609 7.029-.086 3.511 1.448 8.01 4.75 12.352 3.321 4.364 7.237 7.376 11.235 7.337 2.308-.022 5.035-1.581 7.013-3.389z"/></svg>
          </div>
          Call Now
        </a>
        <a
          href="https://wa.me/917435808310?text=Hi%20Dholera%20Platform,%20I%20am%20interested%20in%20learning%20more%20about%20Dholera%20SIR%20investments."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
        >
          <MessageSquare className="h-4 w-4" />
          WhatsApp
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-24 pb-20 md:pt-32 md:pb-40 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-10 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-orange-600 animate-fade-up">
                <ShieldCheck className="h-4 w-4 text-orange-600" />
                Independent Investment Intelligence
              </div>

              <h1 className="font-display text-5xl font-black tracking-tight text-slate-900 sm:text-6xl xl:text-7xl uppercase leading-[0.95] animate-fade-up">
                Decide with <span className="text-orange-600 italic">{t('certainty')}</span> in Dholera SIR
              </h1>

              <p className="max-w-2xl text-lg font-medium text-slate-500 md:text-xl animate-fade-up-slow leading-relaxed">
                The definitive platform for verified TP maps, infrastructure progress, and industrial plot analytics. 
                Move from data to decisions with zero ambiguity.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row pt-4 animate-fade-up-slow">
                <Link
                  href="#site-visit"
                  className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-orange-600 px-10 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-orange-500 sm:w-auto shadow-xl shadow-orange-600/20"
                >
                  Book Free Site Visit
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#plots"
                  className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl border-2 border-slate-900 bg-white px-10 text-sm font-black uppercase tracking-widest text-slate-900 transition-all hover:bg-slate-50 sm:w-auto"
                >
                  View Verified Plots
                </Link>
              </div>
              
              <div className="flex items-center gap-6 pt-6 opacity-60">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-50 bg-slate-200" />
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trusted by 12,000+ Global Investors</p>
              </div>
            </div>

            {/* Right Decorative Showcase Column */}
            <div className="lg:col-span-5 hidden lg:block animate-fade-up-slow">
              <div className="relative p-4 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/80 overflow-hidden group">
                <div className="absolute top-8 left-8 z-10 bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">
                  Real-time Site progress
                </div>
                <div className="relative h-[450px] w-full rounded-[2rem] overflow-hidden">
                  <Image
                    src="/images/arialviewdholeraexpress.webp"
                    alt="Ahmedabad-Dholera Expressway development progress"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Established Industrial Giants & Anchors Grid - MOVED UP FOR SOCIAL PROOF */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
               Institutional Trust
            </p>
            <h2 className="text-xl font-black text-slate-900 uppercase leading-tight opacity-50">
              Leading <span className="text-orange-600">Global Giants</span> in Dholera
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity">
            {[
              { logo: "/images/tata.png", name: "Tata" },
              { logo: "/images/larsen-toubro.png", name: "L&T" },
              { logo: "/images/torrent.png", name: "Torrent Power" },
              { logo: "/images/renew.png", name: "ReNew" },
              { logo: "/images/hp.png", name: "HP" },
              { logo: "/images/vedanta.png", name: "Vedanta" }
            ].map((giant, idx) => (
              <div key={idx} className="relative h-12 w-32 grayscale hover:grayscale-0 transition-all">
                <Image
                  src={giant.logo}
                  alt={giant.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Listing Section (Intelligence Hub) */}
      <div id="documents" className="bg-slate-50">
        <div className="container mx-auto px-4 md:px-8 pt-24 pb-4">
           <div className="max-w-4xl space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">The Proof</span>
              <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight">
                Verified <span className="text-orange-600 italic">Intelligence</span> Hub
              </h2>
           </div>
        </div>
        <React.Suspense fallback={
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="h-10 w-10 border-4 border-slate-100 border-t-orange-600 rounded-full animate-spin" />
            <span className="font-black uppercase tracking-widest text-slate-400 animate-pulse">{t('scanning_archives')}</span>
          </div>
        }>
          <PdfListing />
        </React.Suspense>
      </div>

      {/* Featured Projects Grid */}
      <section id="plots" className="bg-white py-32 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="mb-20 text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              FEATURED OPPORTUNITIES
            </p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight animate-fade-up">
              Verified Land & <span className="text-orange-600 italic">Project Portals</span>
            </h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed animate-fade-up-slow">
              Direct access to premium residential and industrial inventories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                slug: "satyaja-bliss-grandeur",
                name: "Satyaja Bliss Grandeur 1 & 2",
                category: "Residential",
                tagline: "Prime Plotted Investment on Pipali Highway",
                sizes: "100 - 500 Sq. Yards",
                badges: ["NA/NOC Approved", "Near Activation Zone"]
              },
              {
                slug: "dream-world-city",
                name: "Dream World City",
                category: "Residential",
                tagline: "Premium Residential Plots & Villas",
                sizes: "144 - 300 Sq. Yards",
                badges: ["RERA Registered", "TP 1 Location"]
              },
              {
                slug: "breeze-residency",
                name: "Breeze Residency",
                category: "Residential",
                tagline: "Planned Plotted Community in Prime Sector",
                sizes: "120 - 250 Sq. Yards",
                badges: ["Ready Possession", "Bordering TP 2"]
              },
              {
                slug: "aerocity-hub",
                name: "Aerocity Hub",
                category: "Commercial",
                tagline: "Commercial & Airport Proximity Plots",
                sizes: "200 - 600 Sq. Yards",
                badges: ["Airport Road Frontage", "High ROI Potential"]
              },
              {
                slug: "imperial-tp4b2",
                name: "Imperial TP4B2",
                category: "Industrial",
                tagline: "Heavy Industrial & Manufacturing Land Blocks",
                sizes: "500 - 2000 Sq. Yards",
                badges: ["Industrial Zoning", "Power Grid Proximity"]
              }
            ].map((project) => (
              <div
                key={project.slug}
                className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image Block */}
                  <div className="relative h-56 w-full bg-slate-100 border-b border-slate-100 overflow-hidden">
                    <Image
                      src={`/images/projects/${project.slug}.jpg`} // assuming assets exist or fallback to placeholder below
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e: any) => {
                        e.target.src = "/images/dream-world-city.jpg";
                        e.target.className = "object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700";
                      }}
                    />
                    
                    {/* Badge Overlays */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      <span className="bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 z-10">
                       {project.badges.map((badge, bIdx) => (
                         <span key={bIdx} className="bg-white/90 backdrop-blur-sm text-slate-900 text-[7px] font-black uppercase tracking-widest px-2 py-1 rounded-lg shadow-sm border border-slate-200/50">
                           {badge}
                         </span>
                       ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-8 space-y-4">
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                      {project.tagline}
                    </p>
                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-orange-600" /> Plot Sizes</span>
                      <span className="font-black text-slate-900">{project.sizes}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-slate-900/10 hover:shadow-orange-600/20"
                  >
                    View Project Specs
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Projects CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/projects"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-10 text-xs font-black uppercase tracking-widest text-slate-900 hover:border-slate-900 transition-all shadow-sm"
            >
              Browse Full Inventory
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* COMPLIMENTARY SITE VISIT SECTION - ELEVATED & REDESIGNED */}
      <section id="site-visit" className="bg-slate-900 py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600 opacity-10 blur-[150px] translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-600 opacity-5 blur-[120px] -translate-x-1/2" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                 <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                    The Ultimate Hook
                 </div>
                 <h2 className="font-display text-5xl font-black text-white md:text-7xl uppercase leading-[0.95]">
                   Free Site Visit <br/> <span className="text-orange-600 italic">& Luxury Stay</span>
                 </h2>
                 <p className="text-lg font-medium text-slate-400 leading-relaxed uppercase tracking-widest text-xs max-w-lg">
                   Experience the Dholera miracle firsthand. We provide pick-up, guided site tours, and overnight guest house stay—completely on us.
                 </p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    {[
                      { icon: MapPin, text: "Pick-up from Ahmedabad/Airport" },
                      { icon: Building, text: "Premium Guest House Stay" },
                      { icon: ShieldCheck, text: "Guided Ground Intelligence" },
                      { icon: CheckCircle2, text: "Verified Title Reviews" }
                    ].map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-4 group">
                         <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                            <feat.icon className="h-5 w-5" />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{feat.text}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl relative">
                 <div className="absolute -top-6 -right-6 h-20 w-20 bg-orange-600 rounded-3xl flex items-center justify-center text-white shadow-xl rotate-12 animate-bounce">
                    <span className="text-center text-[10px] font-black leading-tight uppercase">Limited <br/> Slots</span>
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 uppercase mb-8">Book Your Experience</h3>
                 
                 <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    window.open(`https://wa.me/917435808310?text=Hi%20Dholera%20Platform,%20I%20want%20to%20book%20a%20site%20visit.%20Please%20share%20details.`, '_blank');
                 }}>
                    <div className="grid gap-4">
                       <input 
                         type="text" 
                         placeholder="FULL NAME" 
                         required 
                         className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest placeholder-slate-400 text-slate-900 outline-none focus:border-orange-500 transition-all"
                       />
                       <input 
                         type="tel" 
                         placeholder="PHONE NUMBER" 
                         required 
                         className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest placeholder-slate-400 text-slate-900 outline-none focus:border-orange-500 transition-all"
                       />
                       <input 
                         type="date" 
                         required 
                         className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest placeholder-slate-400 text-slate-900 outline-none focus:border-orange-500 transition-all"
                       />
                    </div>
                    <button 
                      type="submit"
                      className="w-full h-16 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10 mt-4"
                    >
                      Instant Booking Request
                    </button>
                    <p className="text-center text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                      No strings attached. Pure transparency.
                    </p>
                 </form>
              </div>
           </div>
        </div>
      </section>

      {/* Dholera Photo Gallery (Interactive Lightbox Gallery) */}
      <section className="bg-white py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-20 text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              VISUAL PROGRESS
            </p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight">
              Evidence in <span className="text-orange-600 italic">Motion</span>
            </h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              Scan actual site photos, drone captures, and construction milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className="group relative text-left w-full h-80 rounded-3xl border border-slate-100 overflow-hidden bg-slate-50 shadow-sm hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] font-black uppercase tracking-widest text-orange-400 mb-1">
                    Visual Evidence {idx + 1}
                  </span>
                  <h3 className="font-display text-base font-bold uppercase tracking-tight text-white mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-300 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal Component */}
      {activeImageIdx !== null && (
        <div 
          className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none animate-in fade-in duration-200"
          onClick={() => setActiveImageIdx(null)}
        >
          {/* Lightbox Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-[210]">
            <span className="text-slate-400 text-xs font-black uppercase tracking-widest">
              {activeImageIdx + 1} / {galleryItems.length}
            </span>
            <button
              onClick={() => setActiveImageIdx(null)}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/10"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-6 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/10 z-[210] hidden md:block"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/10 z-[210] hidden md:block"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Lightbox Main Container */}
          <div 
            className="relative max-w-4xl w-full flex flex-col gap-6"
            onClick={e => e.stopPropagation()}
          >
            {/* Main Lightbox Image */}
            <div className="relative h-[300px] sm:h-[450px] md:h-[550px] w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
              <Image
                src={galleryItems[activeImageIdx].src}
                alt={galleryItems[activeImageIdx].title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>

            {/* Description Card */}
            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 text-white max-w-2xl mx-auto w-full text-center space-y-2">
              <h3 className="font-display text-lg font-bold uppercase tracking-wider text-orange-400">
                {galleryItems[activeImageIdx].title}
              </h3>
              <p className="text-sm font-semibold text-slate-350 leading-relaxed">
                {galleryItems[activeImageIdx].desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dholera Investment Insights (Featured Posts) */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-20 text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              LATEST INTELLIGENCE
            </p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight">
              Market <span className="text-orange-600 italic">Signal</span> Logs
            </h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              Deep-dive analysis on price trends, policy shifts, and growth milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <div 
                key={idx}
                className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Post Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-50 border-b border-slate-50">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      {post.tag}
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-350" />
                        {post.date}
                      </span>
                      <span className="h-3 w-px bg-slate-200" />
                      <span className="truncate max-w-[120px]">{post.author.split('@')[0]}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-xs font-medium text-slate-500 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Post Action */}
                <div className="p-6 pt-0">
                  <Link
                    href={post.link}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-orange-600 transition-colors group/btn"
                  >
                    {t('read_more')}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Loop Section */}
      <section className="bg-white py-32 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-24 text-center space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">{t('the_loop')}</p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-6xl uppercase">
              The <span className="text-orange-600 italic">Dholera</span> Framework
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {coreLoop.map((item) => (
              <div
                key={item.step}
                className="group flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm transition-all hover:bg-white hover:shadow-xl hover:-translate-y-2"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white text-orange-600 border border-slate-100 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <item.icon className="h-8 w-8" />
                </div>
                <span className="mb-4 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-orange-600 transition-colors">{t('step')}{item.step}</span>
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-slate-900 mb-4">{item.title}</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="bg-slate-50 py-32 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white text-center shadow-2xl">
            <div className="absolute inset-0 bg-orange-600 opacity-5 blur-[120px] -translate-y-1/2" />
            
            <div className="space-y-4 relative z-10 mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Join the Circle</span>
              <h2 className="font-display text-3xl font-black md:text-4xl uppercase leading-tight max-w-2xl mx-auto">
                {t('subscribe_title')}
              </h2>
              <p className="text-slate-350 text-sm max-w-xl mx-auto leading-relaxed">
                Receive high-signal updates on Dholera land allotments and policy shifts directly in your inbox.
              </p>
            </div>

            <div className="relative z-10 max-w-md mx-auto">
              {subscribeStep === "email" && (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest placeholder-white/30 text-white outline-none focus:border-orange-500 focus:bg-white/10 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-xl bg-orange-600 text-white text-xs font-black uppercase tracking-widest hover:bg-orange-500 active:scale-95 transition-all shadow-lg shadow-orange-600/20"
                  >
                    Subscribe
                  </button>
                </form>
              )}

              {subscribeStep === "verify" && (
                <form onSubmit={handleVerifySubmit} className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6 text-left animate-in zoom-in-95 duration-200">
                  <p className="text-xs font-black uppercase tracking-wider text-orange-400 leading-normal">
                    Almost there! Enter your details to complete verification.
                  </p>
                  
                  <input
                    type="text"
                    placeholder="FULL NAME"
                    required
                    value={newsName}
                    onChange={(e) => setNewsName(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest placeholder-white/30 text-white outline-none focus:border-orange-500 focus:bg-white/10 transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="PHONE NUMBER"
                    required
                    value={newsPhone}
                    onChange={(e) => setNewsPhone(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest placeholder-white/30 text-white outline-none focus:border-orange-500 focus:bg-white/10 transition-all"
                  />

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={newsLoading}
                      className="flex-1 py-3.5 rounded-xl bg-orange-600 text-white text-xs font-black uppercase tracking-widest hover:bg-orange-500 active:scale-95 transition-all shadow-lg shadow-orange-600/20 flex justify-center items-center font-display"
                    >
                      {newsLoading ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Verify & Join"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubscribeStep("email")}
                      className="px-5 py-3.5 rounded-xl bg-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {subscribeStep === "success" && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center animate-in zoom-in-95 duration-200">
                  <p className="text-sm font-black uppercase tracking-widest text-green-400">
                    Welcome to the Inner Circle. Verification successful.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Signals Section */}
      <section className="bg-white py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center mb-20 space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">{t('evidence_signals')}</p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight">
              Evidence-Based <span className="text-orange-600 italic">Clarity</span>
            </h2>
            <p className="text-lg font-medium text-slate-500 leading-relaxed">
              We eliminate guesswork with structured planning data and real-time site monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { 
                icon: ShieldCheck, 
                title: "Title Integrity", 
                desc: "Every listed plot and project is verified for NA/NOC and clear title status." 
              },
              { 
                icon: TrendingUp, 
                title: "Yield Velocity", 
                desc: "Analyze plot appreciation potential based on infrastructure proximity." 
              },
              { 
                icon: BarChart3, 
                title: "Planning Depth", 
                desc: "Access granular TP maps and DP regulations for every zone in DSIR." 
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-start space-y-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 p-10 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/40">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-orange-600 shadow-md border border-slate-100">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-slate-900">{item.title}</h3>
                <p className="text-base font-medium text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Bar Section */}
      <section className="bg-slate-900 py-32 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-orange-600 opacity-5 blur-[120px] -translate-y-1/2" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-400">{t('institutional_integrity')}</p>
                <h2 className="font-display text-4xl font-black md:text-6xl uppercase leading-tight">
                  The Quality <span className="text-orange-400 italic">{t('bar')}</span>
                </h2>
              </div>
              <p className="text-xl text-slate-300 leading-relaxed font-medium">
                As the primary <span className="font-bold text-white uppercase italic tracking-wider">{t('dholera_platform')}</span>, we maintain absolute 
                neutrality and data precision for our users.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                 <div className="space-y-1">
                    <p className="text-4xl font-black text-white italic tracking-tighter uppercase">5,000+</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('hectares_monitored')}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-4xl font-black text-white italic tracking-tighter uppercase">100%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('verified_data')}</p>
                 </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {qualityBar.map((item) => (
                <div key={item} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-slate-100">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
