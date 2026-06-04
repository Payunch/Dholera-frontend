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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-24 pb-20 md:pt-32 md:pb-40 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-10 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-orange-600 animate-fade-up">
                <ShieldCheck className="h-4 w-4 text-orange-600" />
                Verified Infrastructure Intelligence
              </div>

              <h1 className="font-display text-5xl font-black tracking-tight text-slate-900 sm:text-6xl xl:text-7xl uppercase leading-[0.95] animate-fade-up">
                Decide with <span className="text-orange-600 italic">{t('certainty')}</span> in Dholera SIR
              </h1>

              <p className="max-w-2xl text-lg font-medium text-slate-500 md:text-xl animate-fade-up-slow leading-relaxed">
                The primary platform for verified planning maps, TP maps, and real-time infrastructure tracking. 
                Accelerating professional land decisions with industrial-grade data.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row pt-4 animate-fade-up-slow">
                <Link
                  href="/clearance-engine"
                  className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-10 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600 sm:w-auto shadow-xl shadow-slate-900/10 hover:shadow-orange-600/20"
                >
                  Launch Clearance Engine
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#plots"
                  className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-10 text-sm font-black uppercase tracking-widest text-slate-900 transition-all hover:border-slate-400 sm:w-auto"
                >
                  Verified Plots
                </Link>
              </div>
            </div>

            {/* Right Decorative Showcase Column */}
            <div className="lg:col-span-5 hidden lg:block animate-fade-up-slow">
              <div className="relative p-4 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/80 overflow-hidden group">
                <div className="absolute top-8 left-8 z-10 bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">
                  Expressway construction
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

      {/* PDF Listing Section (Intelligence Hub) */}
      <div id="documents" className="bg-white">
        <React.Suspense fallback={
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="h-10 w-10 border-4 border-slate-100 border-t-orange-600 rounded-full animate-spin" />
            <span className="font-black uppercase tracking-widest text-slate-400 animate-pulse">{t('scanning_archives')}</span>
          </div>
        }>
          <PdfListing />
        </React.Suspense>
      </div>

      {/* Dholera Investment Insights (Featured Posts) */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-20 text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              {t('featured_insights')}
            </p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight">
              Dholera Smart City <span className="text-orange-600 italic">Insights</span>
            </h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              {t('featured_insights_desc')}
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

      {/* Dholera Photo Gallery (Interactive Lightbox Gallery) */}
      <section className="bg-white py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-20 text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              {t('photo_gallery')}
            </p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight">
              Verified <span className="text-orange-600 italic">Progress</span> Logs
            </h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              {t('photo_gallery_desc')}
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

      {/* Featured Projects Grid */}
      <section id="plots" className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="mb-20 text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              FEATURED OPPORTUNITIES
            </p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight animate-fade-up">
              Verified Land & <span className="text-orange-600 italic">Project Portals</span>
            </h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed animate-fade-up-slow">
              Select any verified land development to check detailed dimensions, road layouts, and geographic zoning.
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
              },
              {
                slug: "dream-world-city",
                name: "Dream World City",
                category: "Residential",
                tagline: "Premium Residential Plots & Villas",
                sizes: "144 - 300 Sq. Yards",
              },
              {
                slug: "breeze-residency",
                name: "Breeze Residency",
                category: "Residential",
                tagline: "Planned Plotted Community in Prime Sector",
                sizes: "120 - 250 Sq. Yards",
              },
              {
                slug: "aerocity-hub",
                name: "Aerocity Hub",
                category: "Commercial",
                tagline: "Commercial & Airport Proximity Plots",
                sizes: "200 - 600 Sq. Yards",
              },
              {
                slug: "imperial-tp4b2",
                name: "Imperial TP4B2",
                category: "Industrial",
                tagline: "Heavy Industrial & Manufacturing Land Blocks",
                sizes: "500 - 2000 Sq. Yards",
              }
            ].map((project) => (
              <div
                key={project.slug}
                className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Blank Image Block */}
                  <div className="relative h-44 w-full bg-slate-100 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/dream-world-city.jpg" // 1x1 white pixel PNG
                      alt={project.name}
                      fill
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50/70">
                      <div className="h-8 w-8 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center mb-1.5 shadow-sm group-hover:text-orange-600 transition-all duration-300">
                        {project.category === "Residential" && <Grid className="h-4 w-4" />}
                        {project.category === "Commercial" && <Building className="h-4 w-4" />}
                        {project.category === "Industrial" && <Landmark className="h-4 w-4" />}
                      </div>
                      <span className="text-[7px] font-black uppercase tracking-widest text-slate-400 font-display">Placeholder Image</span>
                    </div>
                    
                    <span className="absolute top-3 left-3 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg z-10 font-display">
                      {project.category}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none font-display">
                      {project.tagline}
                    </p>
                    <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-500 font-display">
                      <span>Plot Sizes</span>
                      <span className="font-black text-slate-800">{project.sizes}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all font-display"
                  >
                    View Project Details
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Projects CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/projects"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-8 text-xs font-black uppercase tracking-widest text-slate-900 hover:border-slate-400 transition-all shadow-sm font-display"
            >
              Browse All Projects
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Investor Advantages Section */}
      <section className="bg-white py-32 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-20 text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              {t('benefits_title')}
            </p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight">
              Strategic Investment <span className="text-orange-600 italic">Advantages</span>
            </h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              {t('benefits_desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Advantage 1: Site Visit & Stay */}
            <div className="flex flex-col md:flex-row gap-6 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-[2rem] bg-white border border-slate-100 text-orange-600 shadow-sm">
                <div className="relative h-12 w-12">
                  <Image
                    src="/images/free-visit.png"
                    alt="Free Site Visit Icon"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-slate-900">
                  {t('free_visit')}
                </h3>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                  {t('free_visit_desc')}
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/917435808310?text=Hi%20Dholera%20Platform,%20I%20want%20to%20book%20a%20site%20visit.%20Please%20share%20details%20about%20your%20pick-up%20services%20and%20guest%20stay."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-orange-600 transition-colors group"
                  >
                    Schedule Visit
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Advantage 2: Strategic Location */}
            <div className="flex flex-col md:flex-row gap-6 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-[2rem] bg-white border border-slate-100 text-orange-600 shadow-sm">
                <div className="relative h-12 w-12">
                  <Image
                    src="/images/strategic-location.png"
                    alt="Strategic Location Icon"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-slate-900">
                  {t('strategic_loc')}
                </h3>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                  {t('strategic_loc_desc')}
                </p>
                <div className="pt-2">
                  <Link
                    href="/clearance-engine"
                    className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-orange-600 transition-colors group"
                  >
                    Analyze Zones
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="bg-white py-32 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white text-center shadow-2xl">
            <div className="absolute inset-0 bg-orange-600 opacity-5 blur-[120px] -translate-y-1/2" />
            
            <div className="space-y-4 relative z-10 mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Newsletter</span>
              <h2 className="font-display text-3xl font-black md:text-4xl uppercase leading-tight max-w-2xl mx-auto">
                {t('subscribe_title')}
              </h2>
              <p className="text-slate-350 text-sm max-w-xl mx-auto leading-relaxed">
                {t('subscribe_desc')}
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
                    {t('subscribe_btn')}
                  </button>
                </form>
              )}

              {subscribeStep === "verify" && (
                <form onSubmit={handleVerifySubmit} className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6 text-left animate-in zoom-in-95 duration-200">
                  <p className="text-xs font-black uppercase tracking-wider text-orange-400 leading-normal">
                    {t('subscribe_verification_req')}
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
                        t('subscribe_complete')
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
                    {t('subscribe_success_msg')}
                  </p>
                  <button
                    onClick={() => setSubscribeStep("email")}
                    className="mt-4 text-xs font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                  >
                    Subscribe another email
                  </button>
                </div>
              )}

              {subscribeStep === "error" && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center animate-in zoom-in-95 duration-200">
                  <p className="text-sm font-black uppercase tracking-widest text-red-400">
                    Neural Link Error. Please verify your connection or phone number and try again.
                  </p>
                  <button
                    onClick={() => setSubscribeStep("verify")}
                    className="mt-4 text-xs font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Core Loop Section */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-24 text-center space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">{t('the_loop')}</p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-6xl uppercase">
              How we turn data into <span className="text-orange-600 italic">{t('proof')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {coreLoop.map((item) => (
              <div
                key={item.step}
                className="group flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:-translate-y-2"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-slate-50 text-orange-600 border border-slate-100 group-hover:bg-orange-600 group-hover:text-white transition-colors">
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

      {/* Trust & Signals Section */}
      <section className="bg-white py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center mb-20 space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">{t('evidence_signals')}</p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight">
              Designed to <span className="text-orange-600 italic">{t('remove')}</span> Guesswork
            </h2>
            <p className="text-lg font-medium text-slate-500 leading-relaxed">
              We translate complex planning records into a clean decision surface. Each module is tuned for
              compliance, speed, and investor clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { 
                icon: ShieldCheck, 
                title: "Verified Compliance", 
                desc: "Every map and document is checked against public DSIRDA sources." 
              },
              { 
                icon: TrendingUp, 
                title: "Growth Evidence", 
                desc: "Track infrastructure progress with real updates and visual proof." 
              },
              { 
                icon: BarChart3, 
                title: "Decision Analytics", 
                desc: "Estimate fees, plot readiness, and investment outcomes with confidence." 
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-start space-y-6 rounded-3xl border border-slate-100 bg-slate-50/50 p-8 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/40">
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

      {/* Established Industrial Giants & Anchors Grid */}
      <section className="bg-slate-50 py-32 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-20 text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              {t('established_giants')}
            </p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight">
              Major Corporate <span className="text-orange-600 italic">Anchors</span>
            </h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              {t('established_giants_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                logo: "/images/tata.png",
                name: "Tata Group",
                role: "Semiconductor & Solar Energy",
                desc: "Establishing India's first commercial semiconductor fabrication facility (with PSMC) and developing a massive 4,000 MW solar park."
              },
              {
                logo: "/images/vedanta.png",
                name: "Vedanta Group",
                role: "Electronics Cluster",
                desc: "Participating in Dholera's high-tech electronics manufacturing and display hub, driving local hardware ecosystem creation."
              },
              {
                logo: "/images/larsen-toubro.png",
                name: "Larsen & Toubro (L&T)",
                role: "Master Infrastructure",
                desc: "Selected to engineer and deploy the master infrastructure, smart roads, utility ducts, and underground networks for the Activation Area."
              },
              {
                logo: "/images/torrent.png",
                name: "Torrent Power",
                role: "Grid Infrastructure",
                desc: "Implementing the primary distribution system, substations, and smart grid elements to guarantee 24/7 industrial electricity."
              },
              {
                logo: "/images/renew.png",
                name: "ReNew Power",
                role: "Green Tech Manufacturing",
                desc: "Setting up a gigawatt-scale manufacturing plant for solar cells and modules to fuel the renewable energy requirements of the smart city."
              },
              {
                logo: "/images/hp.png",
                name: "Hindustan Petroleum (HP)",
                role: "Freight Fueling & Infrastructure",
                desc: "Constructing high-capacity fueling centers, terminal logistics depots, and auxiliary service stations along critical expressway links."
              }
            ].map((giant, idx) => (
              <div 
                key={idx}
                className="group flex flex-col justify-between p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-6">
                  {/* Logo Container */}
                  <div className="relative h-20 w-full flex items-center justify-center p-2 bg-slate-50/50 rounded-2xl border border-slate-100 group-hover:bg-orange-50/20 group-hover:border-orange-100 transition-all duration-300">
                    <div className="relative h-14 w-32">
                      <Image
                        src={giant.logo}
                        alt={`${giant.name} logo`}
                        fill
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[9px] font-black uppercase tracking-wider text-orange-600">
                      {giant.role}
                    </span>
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-slate-900">
                      {giant.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                      {giant.desc}
                    </p>
                  </div>
                </div>
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
                As the primary <span className="font-bold text-white uppercase italic tracking-wider">{t('dholera_platform')}</span>, we bridge the gap between 
                complex urban planning data and investor accessibility.
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
