"use client";

import React, { useState, useEffect, useCallback } from'react';
import Image from'next/image';
import { Map, Layers, Search, Filter, ShieldCheck, ArrowRight, HelpCircle, Loader2 } from'lucide-react';
import Link from'next/link';
import { cn } from'@/lib/utils';
import { apiClient } from'@/lib/api';
import { useLanguage } from'@/providers/LanguageProvider';





const DEFAULT_TP_SCHEMES = [
  {
    tp_id: 'TP1',
    title: 'Town Planning Scheme 1 (TP1)',
    area: '51.4 sq km - High Access Corridor',
    focus: 'Residential & Logistics Zone',
    badges: [
      { text: 'Sanctioned & Gazetted', type: 'compliance' },
      { text: 'Expressway Frontage', type: 'investment' }
    ],
    pdfSearch: 'TP 1'
  },
  {
    tp_id: 'TP2',
    title: 'Town Planning Scheme 2 (TP2 - 2A & 2B)',
    area: '102.3 sq km - Core Activation Hub',
    focus: 'Commercial, Residential & Smart City Center',
    badges: [
      { text: 'ABCD Building Zone', type: 'compliance' },
      { text: '100% Plug-and-Play', type: 'investment' }
    ],
    pdfSearch: 'TP 2'
  },
  {
    tp_id: 'TP3',
    title: 'Town Planning Scheme 3 (TP3)',
    area: '66.5 sq km - Knowledge & IT Corridor',
    focus: 'Institutional, IT & High-Tech Parks',
    badges: [
      { text: 'University & Research Hub', type: 'compliance' },
      { text: 'Greenfield Advantage', type: 'investment' }
    ],
    pdfSearch: 'TP 3'
  },
  {
    tp_id: 'TP4',
    title: 'Town Planning Scheme 4 (TP4)',
    area: '60.1 sq km - Heavy Manufacturing & Defense',
    focus: 'Industrial & Ancillary Ecosystem',
    badges: [
      { text: 'GIDC & Direct Freight', type: 'compliance' },
      { text: 'Dedicated Power Feeder', type: 'investment' }
    ],
    pdfSearch: 'TP 4'
  },
  {
    tp_id: 'TP5',
    title: 'Town Planning Scheme 5 (TP5)',
    area: '74.8 sq km - Solar & Green Energy Hub',
    focus: 'Clean Energy & Heavy Engineering',
    badges: [
      { text: '4,400 MW Solar Park Adj.', type: 'compliance' },
      { text: 'High-Load Corridors', type: 'investment' }
    ],
    pdfSearch: 'TP 5'
  },
  {
    tp_id: 'TP6',
    title: 'Town Planning Scheme 6 (TP6)',
    area: '67.0 sq km - Logistics & Maritime Gateway',
    focus: 'Port Connectivity & Freight Handling',
    badges: [
      { text: 'Gulf of Khambhat Access', type: 'compliance' },
      { text: 'Multi-Modal Logistics', type: 'investment' }
    ],
    pdfSearch: 'TP 6'
  },
  {
    tp_id: 'ACT',
    title: 'Operational Activation Area (TP2A)',
    area: '22.5 sq km - 100% Operational',
    focus: 'Tata Semiconductor Fab & ABCD Hub',
    badges: [
      { text: 'Fully Built Trunk Infra', type: 'compliance' },
      { text: 'Immediate Allotment', type: 'investment' }
    ],
    pdfSearch: 'DP'
  }
];

export default function TpMapsPage() {
  const { t } = useLanguage();
  const [tpList, setTpList] = useState(DEFAULT_TP_SCHEMES);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedScheme, setSelectedScheme] = useState(DEFAULT_TP_SCHEMES[0]);

  const fetchMaps = useCallback(async () => {
    try {
      const response = await apiClient.get("/content/tp-maps");
      if (Array.isArray(response.data) && response.data.length > 0) {
        setTpList(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch TP Maps:", err);
    }
  }, []);

  useEffect(() => {
    fetchMaps();
  }, [fetchMaps]);

  const filters = ["All", "Activation Area", "Residential", "Industrial", "Logistics"];

  const filteredList = tpList.filter(tp => {
    const badgesStr = Array.isArray(tp.badges) ? tp.badges.map(b => b.text).join(' ') : '';
    const matchesSearch = tp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tp.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      badgesStr.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || tp.area.includes(activeFilter) || tp.focus.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen font-sans w-full overflow-x-hidden">
      
      {/* Header Section */}
      <section className="relative bg-slate-950 pt-32 pb-16 md:pb-20 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <Image 
            src="/images/airportVision.webp" 
            alt="Dholera Strategic Vision" 
            fill 
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/80 to-slate-950/95" />

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-4">
          <div>
            <span className="relative z-10 inline-block px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-[11px] font-bold text-orange-400 uppercase tracking-widest backdrop-blur-md mb-3">
              Official DSIRDA Master Plan & GIS Matrix
            </span>
          </div>
          <h1 className="relative z-10 text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md uppercase">
            {t('tp_maps_matrix_title') || 'DHOLERA SIR TP MAPS MATRIX'}
          </h1>
          <p className="relative z-10 text-xs sm:text-sm font-semibold text-slate-200 max-w-2xl mx-auto uppercase tracking-wider drop-shadow-sm leading-relaxed">
            {t('tp_maps_matrix_desc') || 'Access verified town planning records, road widths, and zoning use-cases for the entire Dholera Special Investment Region.'}
          </p>
        </div>
      </section>

      {/* Interactive GIS Scheme Visualizer Above Fold */}
      <section className="border-b border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-600 tracking-wider">
                <Map className="h-4 w-4" /> Interactive Scheme Explorer
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase">
                {selectedScheme.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {selectedScheme.area} • Primary Zoning: <strong className="text-orange-600 dark:text-orange-400">{selectedScheme.focus}</strong>
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {DEFAULT_TP_SCHEMES.map(s => (
                  <button
                    key={s.tp_id}
                    onClick={() => setSelectedScheme(s)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all",
                      selectedScheme.tp_id === s.tp_id
                        ? "bg-orange-600 text-white shadow-md shadow-orange-600/30"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    )}
                  >
                    {s.tp_id}
                  </button>
                ))}
              </div>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/pdf?search=${selectedScheme.pdfSearch || selectedScheme.tp_id}&trigger=true`}
                className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-black uppercase tracking-widest text-center shadow-lg transition-all"
              >
                Download Verified Naksha (PDF)
              </Link>
              <a
                href={`https://wa.me/917435808031?text=${encodeURIComponent(`Hi Naresh, please share high-res TP Map and FP allocation list for ${selectedScheme.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-widest text-center shadow-lg transition-all"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

 {/* Interactive Matrix Dashboard */}
 <section className="py-16 bg-white dark:bg-[#0B132B] min-h-[60vh] dark:bg-slate-900">
 <div className="container mx-auto px-4 md:px-8">
 
 {/* Search & Filter UI */}
 <div className="max-w-5xl mx-auto mb-16 space-y-8">
 <div className="relative group">
 <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
 <Search className="h-6 w-6 text-slate-400 group-focus-within:text-[#FF7A00] transition-colors" />
 </div>
 <input 
 type="text"
 placeholder={t('search_placeholder')}
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-16 pr-6 py-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-[#FF7A00] focus:shadow-[0_0_20px_rgba(255,122,0,0.15)] transition-all"
 />
 </div>

 <div className="flex flex-wrap items-center justify-center gap-3">
 <div className="flex items-center gap-2 mr-4 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-300">
 <Filter className="h-4 w-4" /> {t('quick_filters')}
 </div>
 {filters.map(filter => (
 <button
 key={filter}
 onClick={() => setActiveFilter(filter)}
 className={cn(
"min-h-11 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
 activeFilter === filter 
 ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-md font-black"
 : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-transparent dark:border-slate-700/60"
 )}
 >
 {filter}
 </button>
 ))}
 </div>
 </div>

 {/* Interactive Zone Cards Grid - REFACTORED FOR 1/2/3/4 RESPONSIVENESS */}
 {loading ? (
 <div className="flex flex-col items-center justify-center py-20">
 <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
 <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('tp_loading_matrix')}</p>
 </div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 max-w-[1600px] mx-auto">
 {filteredList.map((tp) => {
   const badges = Array.isArray(tp.badges) ? tp.badges : (typeof tp.badges === 'string' ? JSON.parse(tp.badges) : []);
   const pdfSearchQuery = tp.pdfSearch || tp.tp_id || 'TP';
   const waText = encodeURIComponent(`Hi Naresh, I am interested in Town Planning Scheme data and plot availability for ${tp.title} in Dholera SIR.`);

   return (
     <div 
       key={tp.tp_id} 
       className="group relative p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-[#FF7A00] transition-all duration-500 flex flex-col justify-between"
     >
       {/* Psychology Badges */}
       <div className="absolute -top-4 right-6 flex flex-col gap-2 z-10 items-end transition-transform group-hover:scale-110">
         {badges.map((badge, bIdx) => (
           <span 
             key={bIdx} 
             className={cn(
               "backdrop-blur-md text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg border",
               badge.type === 'compliance' 
                 ? "bg-[#10B981] text-white border-[#10B981]" 
                 : "bg-[#D97706] text-white border-[#D97706]"
             )}
           >
             {badge.text}
           </span>
         ))}
       </div>

       <div>
         <div className="flex justify-between items-start mb-8 pt-2">
           <div className="h-14 w-14 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white transition-all duration-300">
             <Map className="h-7 w-7 text-orange-600" />
           </div>
           <div className="group/info relative cursor-help">
             <HelpCircle className="h-5 w-5 text-slate-300 hover:text-[#FF7A00] transition-colors" />
             <div className="absolute right-0 top-8 w-48 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[8px] font-black uppercase tracking-widest p-4 rounded-xl opacity-0 pointer-events-none group-hover/info:opacity-100 transition-all duration-300 z-20 shadow-2xl">
               {t('tp_verify_boundaries') || 'Verified boundaries cross-checked with Gujarat State Gazette'}
             </div>
           </div>
         </div>

         <h3 className="font-display text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight group-hover:text-[#FF7A00] transition-colors duration-300">
           {tp.title}
         </h3>
         
         <div className="space-y-3 mb-8 p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
           <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
             <Layers className="h-3.5 w-3.5 text-slate-400" /> 
             {tp.area}
           </div>
           <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-wider text-orange-600">
             <ShieldCheck className="h-3.5 w-3.5" /> 
             {tp.focus}
           </div>
         </div>
       </div>

       <div className="space-y-2 pt-2">
         <Link
           href={`/pdf?search=${pdfSearchQuery}&trigger=true`}
           className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-black uppercase tracking-widest text-[9px] transition-all flex items-center justify-center gap-2 shadow-sm"
         >
           Access Scheme Naksha (PDF) <ArrowRight className="h-3.5 w-3.5" />
         </Link>
         <a
           href={`https://wa.me/917435808031?text=${waText}`}
           target="_blank"
           rel="noopener noreferrer"
           className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-[9px] transition-all flex items-center justify-center gap-2 shadow-sm"
         >
           Inquire via WhatsApp
         </a>
       </div>
     </div>
   );
 })}
 </div>
 )}
 
 {!loading && filteredList.length === 0 && (
 <div className="text-center py-20 text-slate-500 dark:text-slate-300 font-bold uppercase tracking-widest text-sm">
 {t('no_matching_zones')}
 </div>
 )}

 </div>
 </section>
 </div>
 );
}
