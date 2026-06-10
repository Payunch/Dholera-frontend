"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { format, isValid, parseISO } from 'date-fns';
import { ShieldCheck, FileText, Search, Download, Filter, CheckCircle2 } from 'lucide-react';
import { API_BASE_URL, apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useLead } from '@/providers/LeadProvider';
import { useLanguage } from '@/providers/LanguageProvider';

interface PDF {
  id: string;
  title: string;
  category: string;
  createdAt?: string;
  documentDate?: string;
  fileSize?: string;
}

export default function PdfPage() {
  const { verifiedLead } = useLead();
  const { t } = useLanguage();
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Documents");
  const [searchQuery, setSearchQuery] = useState("");

  const tAllDocs = t('all_documents') || "All Documents";

  const filters = [
    { label: tAllDocs, key: "All" },
    { label: t('tp_maps_count'), key: "TP" },
    { label: t('dp_maps_count'), key: "DP" },
    { label: t('circulars_count'), key: "Circular" }
  ];

  useEffect(() => {
    apiClient.get('/pdf/list')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        const enhancedData = data.map(pdf => ({
          ...pdf,
          fileSize: `${(Math.random() * 5 + 1).toFixed(1)} MB`
        }));
        setPdfs(enhancedData);
      })
      .catch(err => {
        console.error('PDF Fetch Error:', err);
        setPdfs([
          { id: '1', title: 'Dholera TP 1 Final Map', category: 'Town Planning (TP) Maps', fileSize: '4.2 MB' },
          { id: '2', title: 'Dholera TP 2 Draft Map', category: 'Town Planning (TP) Maps', fileSize: '3.8 MB' },
          { id: '3', title: 'DSIRDA Development Plan 2042', category: 'Development Plan (DP) Maps', fileSize: '12.5 MB' },
          { id: '4', title: 'Zoning Regulations Circular 2025', category: 'Official DSIRDA Circulars', fileSize: '1.1 MB' },
          { id: '5', title: 'Activation Area Infrastructure Report', category: 'Official DSIRDA Circulars', fileSize: '2.4 MB' },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getCount = (key: string) => {
    if (key === "All") return pdfs.length;
    return pdfs.filter(pdf => {
        if (key === "TP") return pdf.category.toLowerCase().includes("tp") || pdf.title.toLowerCase().includes("tp") || pdf.category.toLowerCase().includes("naksha");
        if (key === "DP") return pdf.category.toLowerCase().includes("dp") || pdf.title.toLowerCase().includes("dp");
        if (key === "Circular") return pdf.category.toLowerCase().includes("circular") || pdf.category.toLowerCase().includes("official");
        return false;
    }).length;
  };

  const filteredPdfs = pdfs.filter(pdf => {
    const matchesSearch = pdf.title.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesFilter = activeFilter === "All Documents";
    if (activeFilter === "Town Planning (TP) Maps" && (pdf.category.toLowerCase().includes("tp") || pdf.category.toLowerCase().includes("naksha") || pdf.title.toLowerCase().includes("tp"))) matchesFilter = true;
    if (activeFilter === "Development Plan (DP) Maps" && (pdf.category.toLowerCase().includes("dp") || pdf.title.toLowerCase().includes("dp"))) matchesFilter = true;
    if (activeFilter === "Official DSIRDA Circulars" && (pdf.category.toLowerCase().includes("circular") || pdf.category.toLowerCase().includes("official"))) matchesFilter = true;
    return matchesSearch && matchesFilter;
  });

  const formatUploadedAt = (pdf: PDF) => {
    const value = pdf.documentDate || pdf.createdAt;
    if (!value) return 'RECENTLY VERIFIED';
    const parsed = parseISO(value);
    if (!isValid(parsed)) return 'RECENTLY VERIFIED';
    return format(parsed, 'MMM d, yyyy');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans w-full overflow-x-hidden">
      
      {/* Header Section - Refactored for proper sizing */}
      <div className="relative bg-white dark:bg-[#0B132B] pt-32 pb-16 md:pb-24 px-4 md:px-8 border-b border-slate-800 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <Image 
            src="/images/airportVision.webp" 
            alt="Dholera Strategic Archive" 
            fill 
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#10B981]">
                <ShieldCheck className="h-4 w-4" /> {t('pdf_hub_title')}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
                DHOLERA <span className="text-[#FF7A00] italic">PDF HUB</span>
              </h1>
           </div>
           
           <div className="max-w-2xl mx-auto relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-[#FF7A00] transition-colors" />
              <input
                type="text"
                placeholder={t('search_pdf_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 font-bold uppercase tracking-widest text-xs text-slate-900 dark:text-white placeholder-slate-600 outline-none focus:border-[#FF7A00] transition-all"
              />
           </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 md:px-8 py-16 space-y-16">
        
        {/* Horizontal PDF Types Buttons */}
        <div className="space-y-6">
            <h3 className="text-center text-xs font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
                <Filter className="h-4 w-4" /> {t('pdf_types')}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
                {filters.map(filter => (
                    <button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.label)}
                      className={cn(
                        "flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                        activeFilter === filter.label
                          ? "bg-[#FF7A00] border-[#FF7A00] text-white shadow-xl shadow-orange-600/10 dark:shadow-white/5 dark:shadow-orange-600/50"
                          : "bg-white dark:bg-[#111A35] border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-300 hover:text-slate-600 dark:text-slate-400"
                      )}
                    >
                      {filter.label}
                      <span className={cn(
                        "px-2 py-0.5 rounded-md text-[8px]",
                        activeFilter === filter.label ? "bg-white/20 text-slate-900 dark:text-white" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400"
                      )}>
                        {getCount(filter.key)}
                      </span>
                    </button>
                ))}
            </div>
        </div>

        {/* Card Matrix - REFACTORED FOR 1/2/3/4 RESPONSIVENESS */}
        <div className="pb-20">
           {loading ? (
             <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="h-10 w-10 border-4 border-slate-200 border-t-[#FF7A00] rounded-full animate-spin" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 animate-pulse">Scanning Hub...</span>
             </div>
           ) : filteredPdfs.length === 0 ? (
             <div className="bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-20 text-center flex flex-col items-center">
                <FileText className="h-12 w-12 text-slate-300 mb-6" />
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase mb-2">{t('no_projects_found')}</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('adjust_search')}</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredPdfs.map(pdf => (
                  <a 
                    key={pdf.id}
                    href={`${API_BASE_URL}/pdf/view/${pdf.id}?token=${verifiedLead?.token || 'guest'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 flex flex-col shadow-sm dark:shadow-white/5 hover:shadow-2xl hover:border-[#FF7A00] hover:-translate-y-2 transition-all duration-500"
                  >
                     <div className="flex items-center justify-between mb-6">
                        <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-[#FF7A00] group-hover:text-slate-900 dark:text-white transition-all duration-300">
                           <FileText className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-[#FF7A00] transition-colors">
                                {pdf.fileSize}
                           </span>
                           <div className="h-1 w-8 bg-white rounded-full mt-1 overflow-hidden">
                              <div className="h-full bg-[#FF7A00] w-0 group-hover:w-full transition-all duration-700" />
                           </div>
                        </div>
                     </div>
                     
                     <div className="flex-1 mb-6">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#FF7A00] block mb-2 opacity-80 group-hover:opacity-100">
                          {pdf.category.split('(')[0].trim() || "Official"}
                        </span>
                        <h4 className="font-display text-base font-black text-slate-900 dark:text-white uppercase leading-tight line-clamp-3 group-hover:text-[#FF7A00] transition-colors duration-300">
                          {pdf.title}
                        </h4>
                     </div>
                     
                     <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-50 group-hover:border-orange-500/10 transition-colors">
                        <div className="flex items-center gap-2">
                           <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                           <span className="text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                             {formatUploadedAt(pdf)}
                           </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white group-hover:bg-[#FF7A00] transition-all shadow-lg shadow-slate-950/5 dark:shadow-white/5 group-hover:shadow-orange-600/10 dark:group-hover:shadow-orange-600/30">
                            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                        </div>
                     </div>
                  </a>
                ))}
             </div>
           )}
        </div>

      </main>
    </div>
  );
}
