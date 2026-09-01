"use client";

import React, { useState, useEffect, useCallback } from'react';
import Image from'next/image';
import { Map, Layers, Search, Filter, ShieldCheck, ArrowRight, HelpCircle, Loader2 } from'lucide-react';
import Link from'next/link';
import { cn } from'@/lib/utils';
import { apiClient } from'@/lib/api';
import { useLanguage } from'@/providers/LanguageProvider';





export default function TpMapsPage() {
 const { t } = useLanguage();
 const [tpList, setTpList] = useState([]);
 const [loading, setLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState("");
 const [activeFilter, setActiveFilter] = useState("All");

 const fetchMaps = useCallback(async () => {
 try {
 const response = await apiClient.get("/content/tp-maps");
 setTpList(response.data);
 } catch (err) {
 console.error("Failed to fetch TP Maps:", err);
 } finally {
 setLoading(false);
 }
 }, []);

 useEffect(() => {
 fetchMaps();
 }, [fetchMaps]);

 const filters = ["All","Activation Area","Residential","Industrial","Logistics"];

 const filteredList = tpList.filter(tp => {
 const matchesSearch = tp.title.toLowerCase().includes(searchQuery.toLowerCase()) || tp.area.toLowerCase().includes(searchQuery.toLowerCase());
 const matchesFilter = activeFilter ==="All" || tp.area.includes(activeFilter) || tp.focus.includes(activeFilter);
 return matchesSearch && matchesFilter;
 });

 return (
 <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen font-sans w-full overflow-x-hidden dark:bg-slate-900">
 
 {/* Header Section - Refactored for proper sizing */}
 <section className="relative bg-white dark:bg-[#0B132B] pt-32 pb-16 md:pb-24 border-b border-slate-800 overflow-hidden dark:bg-slate-900">
 {/* Background Image Overlay */}
 <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
 <Image 
 src="/images/airportVision.webp" 
 alt="Dholera Strategic Vision" 
 fill 
 className="object-cover"
 sizes="100vw"
 />
 </div>

 <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
 <div className="max-w-4xl mx-auto">
 <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-[1.1]">
 {t('tp_maps_matrix_title')}
 </h1>
 <p className="mt-6 text-xs sm:text-sm md:text-base font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
 {t('tp_maps_matrix_desc')}
 </p>
 </div>
 </div>
 </section>

 <section className="border-b border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-950">
 <div className="mx-auto max-w-5xl px-4 md:px-8">
 <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">Planning document guide</p>
 <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white md:text-5xl">Dholera Smart City Map PDF and TP Scheme Guide</h2>
 <div className="mt-6 space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
 <p>Dholera SIR&apos;s developable area is organized into six Town Planning Schemes. TP1 and TP2 form Phase I, while the initial 22.5 sq km Activation Area was identified within TP2 East and part of TP4. Use the searchable matrix below to find available planning documents and related map records.</p>
 <p>A map is a planning reference, not proof of ownership, title, current zoning permission, or approval for a particular transaction. Check the document title, issuing authority, revision date, plot boundaries, road reservations, and current official records before relying on it.</p>
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
 <a href="https://www.pib.gov.in/newsite/PrintRelease.aspx?lang=2&reg=48&relid=122140" target="_blank" rel="noopener noreferrer" className="rounded-full bg-orange-600 px-6 py-3 text-sm font-black text-white">Government source: TP schemes and Activation Area</a>
 <Link href="/investment-guide" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-black dark:border-slate-700">Read the due-diligence guide</Link>
 <Link href="/smart-city" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-black dark:border-slate-700">Dholera SIR overview</Link>
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
"px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
 activeFilter === filter 
 ?"bg-[#FF7A00] text-white border-[#FF7A00] shadow-lg shadow-orange-600/10 dark:shadow-orange-600/50" 
 :"bg-white dark:bg-[#111A35] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:bg-slate-900"
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
 <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Loading Intelligence Matrix...</p>
 </div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 max-w-[1600px] mx-auto">
 {filteredList.map((tp) => (
 <Link 
 key={tp.tp_id} 
 href={`/pdf?search=${tp.title.split('')[tp.title.split('').length - 1]}&trigger=true`}
 className="group relative p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-[#111A35] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-[#FF7A00] transition-all duration-500 flex flex-col justify-between dark:bg-slate-900"
 >
 {/* Psychology Badges */}
 <div className="absolute -top-4 right-6 flex flex-col gap-2 z-10 items-end transition-transform group-hover:scale-110">
 {tp.badges.map((badge, bIdx) => (
 <span 
 key={bIdx} 
 className={cn(
"backdrop-blur-md text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg border",
 badge.type ==='compliance' 
 ?"bg-[#10B981] text-slate-900 dark:text-white border-[#10B981]" 
 :"bg-[#D97706] text-white border-[#D97706]"
 )}
 >
 {badge.text}
 </span>
 ))}
 </div>

 <div>
 <div className="flex justify-between items-start mb-10 pt-4">
 <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-white dark:hover:bg-slate-800 dark:bg-slate-900 group-hover:text-slate-900 dark:text-white transition-all duration-300">
 <Map className="h-8 w-8" />
 </div>
 <div className="group/info relative cursor-help">
 <HelpCircle className="h-6 w-6 text-slate-300 hover:text-[#FF7A00] transition-colors" />
 <div className="absolute right-0 top-8 w-48 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[8px] font-black uppercase tracking-widest p-4 rounded-xl opacity-0 pointer-events-none group-hover/info:opacity-100 transition-all duration-300 z-20 shadow-2xl">
 Verify exact plot boundaries, road widths, and zoning use-cases for this specific Town Planning scheme.
 </div>
 </div>
 </div>

 <h3 className="font-display text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight group-hover:text-[#FF7A00] transition-colors duration-300">
 {tp.title}
 </h3>
 
 <div className="space-y-4 mb-10 p-6 bg-white dark:bg-[#0B132B] rounded-[1.5rem] group-hover:bg-white dark:hover:bg-slate-800/50 transition-colors border border-transparent group-hover:border-orange-500/10 dark:bg-slate-900">
 <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
 <Layers className="h-4 w-4 text-slate-400 group-hover:text-orange-500 transition-colors" /> 
 {tp.area}
 </div>
 <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF7A00]">
 <ShieldCheck className="h-4 w-4 animate-pulse" /> 
 {tp.focus}
 </div>
 </div>
 </div>

 <div className="w-full h-14 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px] group-hover:bg-[#FF7A00] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-slate-950/5 group-hover:shadow-orange-600/10">
 Explore Data Matrix <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
 </div>
 </Link>
 ))}
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
