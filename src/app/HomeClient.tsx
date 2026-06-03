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
  Map
} from "lucide-react";
import { PdfListing } from "@/components/pdf/PdfListing";
import { useLanguage } from '@/providers/LanguageProvider';

export function HomeClient() {
  const { lang, t } = useLanguage();
  
  // Gallery Lightbox State
  const [activeImageIdx, setActiveImageIdx] = React.useState<number | null>(null);

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
      link: "https://dholerahub.com/dholera-plot-price-2026/",
      tag: "Rates & Guide"
    },
    {
      title: "Why Smart Investors Are Turning Toward Emerging Real Estate Markets",
      date: "May 19, 2026",
      author: "dholerahub@gmail.com",
      excerpt: "Real estate has always been one of the strongest wealth-building assets across generations. While stocks and digital investments may fluctuate, emerging land markets with heavy government capital expenditure provide massive long-term growth.",
      image: "/images/expressHighway.webp",
      link: "https://dholerahub.com/why-smart-investors-are-turning-toward-emerging-real-estate-markets/",
      tag: "Market Trends"
    },
    {
      title: "Understanding real estate wealth creation and the rise of a future-ready location",
      date: "May 5, 2026",
      author: "dholerahub@gmail.com",
      excerpt: "Real estate has earned its reputation as one of the most dependable ways to build long-term wealth. Discover how infrastructure catalysts like the DMIC, dedicated corridors, and smart utilities create property value multiplication.",
      image: "/images/345-1-e1777985454613-300x271.jpeg",
      link: "https://dholerahub.com/rsc-group-dholera-dholera-smart-city-gujrat/",
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

  const satyajaDescription: Record<string, string> = {
    en: "Investing in Dholera Smart City is a smart decision for the future. Satyaja's projects like Bliss 107, Bliss Grandeur, Bliss Rung, and Prelude Industrial Park offer secure, high-yield investment options. Property values are poised for high appreciation due to rapid infrastructural developments. Secure your land assets now.",
    hi: "धोलेरा स्मार्ट सिटी में निवेश करना भविष्य के लिए एक समझदारी भरा निर्णय है। Satyaja के सभी प्रोजेक्ट्स जैसे Bliss 107, Bliss Grandeur, Bliss Rung और Prelude Industrial Park आपको सुरक्षित और लाभदायक निवेश का अवसर प्रदान करते हैं। यहां तेजी से विकास हो रहा है, जिससे आने वाले समय में प्रॉपर्टी की कीमतों में बड़ा उछाल देखने को मिलेगा। अभी निवेश करने का सही समय है।",
    gu: "ધોલેરા સ્માર્ટ સિટીમાં રોકાણ કરવું એ ભવિષ્ય માટે એક સમજદારીભર્યો નિર્ણય છે. સત્યજાના પ્રોજેક્ટ્સ જેવા કે Bliss 107, Bliss Grandeur, Bliss Rung અને Prelude Industrial Park સુરક્ષિત અને ઊંચા વળતર આપતા રોકાણના વિકલ્પો પ્રદાન કરે છે. ઝડપી ઇન્ફ્રાસ્ટ્રક્ચર વિકાસને કારણે મિલકતના મૂલ્યોમાં મોટો વધારો થવાની સંભાવના છે. આજે જ તમારો પ્લોટ બુક કરો અને તમારું ભવિષ્ય સુરક્ષિત કરો."
  };

  const activeSatyajaDesc = satyajaDescription[lang] || satyajaDescription.en;

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
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-orange-600 transition-colors group/btn"
                  >
                    {t('read_more')}
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
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

      {/* Verified Land Opportunities (Satyaja Plots Bliss Grandeur) */}
      <section id="plots" className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="mb-20 text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              {t('satyaja_plots')}
            </p>
            <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl uppercase leading-tight">
              {t('book_plot_today')}
            </h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              {t('satyaja_tagline')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Left Card: Plot Project Details */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-xl shadow-slate-200/50 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border border-green-100 shadow-sm">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    RERA Approved
                  </span>
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border border-blue-100 shadow-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    Pipali Highway
                  </span>
                </div>

                <h3 className="font-display text-3xl font-black uppercase tracking-tight text-slate-900">
                  Satyaja Bliss Grandeur 1 & 2
                </h3>

                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                  {activeSatyajaDesc}
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available Sizes</span>
                    <p className="text-sm font-black text-slate-805 uppercase">100 - 500 Sq. Yards</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Type</span>
                    <p className="text-sm font-black text-slate-805 uppercase">Residential Plots</p>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://wa.me/917435808310?text=Hi%20Dholera%20Platform,%20I%20am%20interested%20in%20Satyaja%20Plots%20(Bliss%20Grandeur%201%20%26%202).%20Please%20send%20more%20information%20about%20rates,%20availability,%20and%20brochure."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] text-white text-sm font-black uppercase tracking-widest hover:bg-[#128C7E] transition-all shadow-xl shadow-green-500/10 hover:shadow-green-500/20"
                >
                  <MessageSquare className="h-5 w-5" />
                  {t('whatsapp_inquiry')}
                </a>
              </div>
            </div>

            {/* Right Card: Google Map Embed Frame */}
            <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-150 shadow-xl bg-slate-100 min-h-[400px] flex">
              <div className="absolute top-6 right-6 z-10 bg-white border border-slate-100 rounded-xl px-4 py-2 shadow-md flex items-center gap-2">
                <Map className="h-4 w-4 text-orange-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                  Pipali Junction Link
                </span>
              </div>
              <iframe
                title="Satyaja Dholera Plots Pipali Highway Map Location"
                src="https://maps.google.com/maps?q=Pipali%20Junction,%20Dholera,%20Gujarat,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[400px] border-0"
                loading="lazy"
                allowFullScreen
              />
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
