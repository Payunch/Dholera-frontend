"use client";

import React, { useState, useEffect, useCallback } from"react";
import Link from"next/link";
import Image from"next/image";
import { apiClient } from"@/lib/api";
import { projects as staticProjects } from"@/data/projects";
import { useLanguage } from"@/providers/LanguageProvider";
import { ShieldCheck, MapPin, Search, Grid, Building, Landmark, ChevronRight, Loader2, X } from"lucide-react";
import dynamic from "next/dynamic";
const StaticPdfViewer = dynamic(() => import("@/components/pdf/StaticPdfViewer").then(mod => mod.StaticPdfViewer), { ssr: false });
import { cn } from "@/lib/utils";



export default function ProjectsPage() {
 const { lang, t } = useLanguage();
 const [projects, setProjects] = useState([]);
 const [loading, setLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("All");
 const [previewPdf, setPreviewPdf] = useState(null);

 const categories = [
 { label: t('all'), key:"All" },
 { label: t('residential'), key:"Residential" },
 { label: t('commercial'), key:"Commercial" },
 { label: t('industrial'), key:"Industrial" }
 ];

 const fetchProjects = useCallback(async () => {
  try {
  const response = await apiClient.get("/content/projects");
  const backendProjects = response.data || [];
  const merged = [...backendProjects];
  staticProjects.forEach(sp => {
    if (!merged.find(bp => bp.slug === sp.slug)) {
      merged.push(sp);
    }
  });
  setProjects(merged);
  } catch (err) {
  console.error("Failed to fetch projects:", err);
  setProjects(staticProjects);
  } finally {
  setLoading(false);
  }
 }, []);

 useEffect(() => {
 fetchProjects();
 }, [fetchProjects]);

 // Safe translation with fallback to project data
 const getProjectText = (key, fallback) => {
   if (!key) return fallback || "";
   const val = t(key);
   if (val && val !== key && !val.includes("_TAGLINE") && !val.includes("_DESC") && !val.includes("_tagline") && !val.includes("_desc")) {
     return val;
   }
   return fallback || "";
 };

 const propertyListings = projects.filter(p => p.slug !== "final-dholera-report");
 const researchDossier = projects.find(p => p.slug === "final-dholera-report");

 // Filter projects based on query and category
 const filteredProjects = propertyListings.filter((project) => {
   const tagline = getProjectText(project.taglineKey, project.tagline);
   const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     tagline.toLowerCase().includes(searchQuery.toLowerCase());
   const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
   return matchesSearch && matchesCategory;
 });

 return (
 <div className="bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pb-24 w-full overflow-x-hidden">
 
 {/* Header Block - Refactored for proper sizing */}
 <section className="relative bg-slate-950 pt-32 pb-16 md:pb-24 border-b border-slate-800 overflow-hidden mb-16">
 {/* Background Image Overlay */}
 <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
 <Image 
 src="/images/arialviewdholeraexpress.webp" 
 alt="Dholera Strategic Growth" 
 fill 
 className="object-cover"
 sizes="100vw"
 />
 </div>

 <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
 <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
 {t('official_archives')}
 </span>
 <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
 {t('verified_plotted_title')}
 </h1>
 <p className="text-sm sm:text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
 {t('verified_plotted_desc')}
 </p>
 </div>
 </section>

 <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
 
 {/* Filter Controls */}
 <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
 {/* Categories */}
 <div className="flex flex-wrap gap-2 justify-center">
 {categories.map((cat) => (
 <button
 key={cat.key}
 onClick={() => setSelectedCategory(cat.key)}
 className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
 selectedCategory === cat.key
 ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-md font-black"
 : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-transparent dark:border-slate-700/60"
 }`}
 >
 {cat.label}
 </button>
 ))}
 </div>

 {/* Search Input */}
 <div className="relative w-full md:w-72">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
 <input
 type="text"
 placeholder={t('search_by_project')}
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-11 pr-5 py-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest placeholder-slate-400 text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-orange-500 transition-all"
 />
 </div>
 </div>

 {/* Projects Grid - REFACTORED FOR 1/2/3/4 RESPONSIVENESS */}
 {loading ? (
 <div className="flex flex-col items-center justify-center py-20">
 <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
 <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Scanning Platform Archives...</p>
 </div>
 ) : filteredProjects.length > 0 ? (
 <div className="space-y-16">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
 {filteredProjects.map((project) => {
   const tagline = getProjectText(project.taglineKey, project.tagline);
   const projectDesc = getProjectText(project.descKey, project.description);
   const waText = encodeURIComponent(
     project.whatsappText || `Hi Naresh, I am inquiring about plotted land availability for ${project.name} in Dholera SIR.`
   );

   return (
     <div
       key={project.slug}
       className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#FF7A00] transition-all duration-500 flex flex-col justify-between"
     >
       <div>
         {/* Project Image */}
         <div className="relative w-full h-64 bg-slate-100 dark:bg-slate-800 overflow-hidden">
           <Image
             src={project.image.startsWith('/') ? project.image : `/images/${project.image}`}
             alt={project.name}
             fill
             className="object-cover transition-transform duration-700 group-hover:scale-110"
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
           />
           <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-500" />
           
           {/* Category Badge */}
           <span className="absolute top-5 left-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white text-[9px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-xl shadow-lg z-10">
             {project.category}
           </span>

           {project.reraApproved && (
             <span className="absolute top-5 right-5 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg z-10 flex items-center gap-1">
               <ShieldCheck className="h-3 w-3" /> RERA VERIFIED
             </span>
           )}
         </div>

         {/* Content */}
         <div className="p-6 md:p-8 space-y-4">
           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">
             <div className="h-1.5 w-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
             <MapPin className="h-3.5 w-3.5" />
             {project.location ? project.location.split(",")[0] : "Dholera SIR"}
           </div>

           <Link href={`/projects/${project.slug}`} className="block">
             <h3 className="font-display font-black uppercase tracking-tight text-xl md:text-2xl text-slate-900 dark:text-white group-hover:text-[#FF7A00] transition-colors duration-300">
               {project.name}
             </h3>
           </Link>

           {tagline && (
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 leading-tight">
               {tagline}
             </p>
           )}

           {/* Real Commercial Real Estate Specs */}
           <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px]">
             <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
               <span className="text-[8px] font-black uppercase text-slate-400 block tracking-wider">Starting Rate</span>
               <span className="font-black text-slate-900 dark:text-white truncate block">
                 {project.priceDisplay || "Price on Request"}
               </span>
             </div>
             <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
               <span className="text-[8px] font-black uppercase text-slate-400 block tracking-wider">Plot Dimensions</span>
               <span className="font-black text-slate-900 dark:text-white truncate block">
                 {project.plotSizes || "200 - 1000 Sq. Yd"}
               </span>
             </div>
           </div>

           {project.roadWidth && (
             <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
               <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
               <span>Road Access: {project.roadWidth}</span>
             </div>
           )}

           <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 pt-1">
             {projectDesc}
           </p>
         </div>
       </div>

       {/* Actions: Analyze Specs + WhatsApp Trigger */}
       <div className="p-6 md:p-8 pt-0 space-y-2.5">
         <Link
           href={`/projects/${project.slug}`}
           className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-sm group-hover:border group-hover:border-orange-500/30"
         >
           Analyze Project Specs
           <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
         </Link>
         
         <a
           href={`https://wa.me/917435808031?text=${waText}`}
           target="_blank"
           rel="noopener noreferrer"
           className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
         >
           Inquire on WhatsApp
         </a>
       </div>
     </div>
   );
 })}
 </div>

 {/* Featured Research Dossier / Ground Reality Matrix */}
 {researchDossier && (
   <div className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-[#0B132B] to-slate-950 border border-slate-800 p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
     <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[100px] pointer-events-none" />
     <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
       <div className="space-y-4 max-w-3xl">
         <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-orange-400">
           Institutional Research & Feasibility Matrix
         </span>
         <h3 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
           {researchDossier.name}
         </h3>
         <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
           {getProjectText(researchDossier.descKey, researchDossier.description)}
         </p>
         <div className="flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-wider text-slate-400 pt-2">
           <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Full TP1-TP6 Matrix</span>
           <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Verified Ground Realities</span>
           <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Free Investor Access</span>
         </div>
       </div>
       <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
         <button
           onClick={() => setPreviewPdf("/Final_Dholera_Report.pdf")}
           className="px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-600/20 text-center"
         >
           Read Full Intelligence Report
         </button>
         <a
           href="https://wa.me/917435808031?text=Hi%20Naresh,%20I%20would%20like%20to%20request%20the%20Final%20Dholera%20Ground%20Reality%20%26%20Land%20Matrix%20Dossier."
           target="_blank"
           rel="noopener noreferrer"
           className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest transition-all text-center"
         >
           Request Advisory Briefing
         </a>
       </div>
     </div>
   </div>
 )}
 </div>
 ) : (
 <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl max-w-xl mx-auto space-y-4 shadow-sm">
 <Grid className="h-10 w-10 text-slate-300 mx-auto" />
 <h3 className="font-display text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
 {t('no_projects_found')}
 </h3>
 <p className="text-sm font-semibold text-slate-500 px-8">
 {t('adjust_search')}
 </p>
 </div>
 )}

 </div>
 
 {previewPdf && (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-300">
 <div className="relative w-full max-w-6xl h-[85vh] bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800">
 <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
 <h3 className="font-display font-black uppercase tracking-widest text-slate-900 dark:text-white text-sm">Report Preview</h3>
 <button 
 onClick={() => setPreviewPdf(null)} 
 className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
 >
 <X className="h-5 w-5" />
 </button>
 </div>
 <div className="flex-1 w-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
 <StaticPdfViewer url={previewPdf} />
 </div>
 </div>
 </div>
 )}
 
 </div>
 );
}
