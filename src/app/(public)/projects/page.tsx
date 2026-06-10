"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiClient } from "@/lib/api";
import { useLanguage } from "@/providers/LanguageProvider";
import { ShieldCheck, MapPin, Search, Grid, Building, Landmark, ChevronRight, Loader2 } from "lucide-react";

interface Project {
  slug: string;
  name: string;
  category: string;
  taglineKey: string;
  descKey: string;
  location: string;
  image: string;
  reraApproved: boolean;
}

export default function ProjectsPage() {
  const { lang, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    { label: t('all'), key: "All" },
    { label: t('residential'), key: "Residential" },
    { label: t('commercial'), key: "Commercial" },
    { label: t('industrial'), key: "Industrial" }
  ];

  const fetchProjects = useCallback(async () => {
    try {
      const response = await apiClient.get("/content/projects");
      setProjects(response.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter projects based on query and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t(project.taglineKey).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pb-24 w-full overflow-x-hidden">
      
      {/* Header Block - Refactored for proper sizing */}
      <section className="relative bg-white dark:bg-[#0B132B] pt-32 pb-16 md:pb-24 border-b border-slate-800 overflow-hidden mb-16">
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
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
            {t('verified_plotted_title').split(' ').slice(0, 2).join(' ')} <span className="text-orange-600 italic">{t('verified_plotted_title').split(' ').slice(2).join(' ')}</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
            {t('verified_plotted_desc')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
        
        {/* Filter Controls */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-white/5 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat.key
                    ? "bg-[#FF7A00] text-white shadow-md dark:shadow-white/5 shadow-orange-600/10 dark:shadow-orange-600/50"
                    : "bg-white dark:bg-slate-800 border border-slate-150 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {filteredProjects.map((project: Project) => {
              const projectDesc = t(project.descKey);
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm dark:shadow-white/5 hover:shadow-2xl hover:border-[#FF7A00] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative h-64 w-full bg-white dark:bg-slate-800 overflow-hidden">
                      <Image
                        src={project.image.startsWith('/') ? project.image : `/images/${project.image}`}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-500" />
                      
                      {/* Category Badge */}
                      <span className="absolute top-6 left-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg dark:shadow-white/5 z-10 transition-transform group-hover:scale-110">
                        {project.category}
                      </span>

                      {project.reraApproved && (
                        <span className="absolute top-6 right-6 bg-green-500 text-slate-900 dark:text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg dark:shadow-white/5 z-10 transition-transform group-hover:scale-110">
                          RERA VERIFIED
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-10 space-y-5">
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

                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        {projectDesc}
                      </p>
                    </div>
                  </div>

                  {/* Actions (Visual Button) */}
                  <div className="p-8 md:p-10 pt-0">
                    <div className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest group-hover:bg-[#FF7A00] transition-all duration-300 shadow-xl dark:shadow-white/5 shadow-slate-950/5 dark:shadow-white/10 group-hover:shadow-orange-600/10 dark:group-hover:shadow-orange-600/30">
                      Analyze Project Specs
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl max-w-xl mx-auto space-y-4 shadow-sm dark:shadow-white/5">
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
    </div>
  );
}

