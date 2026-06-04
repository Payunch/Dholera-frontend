"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects, Project } from "@/data/projects";
import { useLanguage } from "@/providers/LanguageProvider";
import { ShieldCheck, MapPin, Search, Grid, Building, Landmark, ChevronRight } from "lucide-react";

export default function ProjectsPage() {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Residential", "Commercial", "Industrial"];

  // Filter projects based on query and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t(project.taglineKey).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24 w-full overflow-x-hidden">
      
      {/* Header Block */}
      <section className="relative bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden mb-16">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <Image 
            src="/images/arialviewdholeraexpress.webp" 
            alt="Dholera Strategic Growth" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
            OFFICIAL PLATFORM ARCHIVES
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-tight">
            Verified Plotted <span className="text-orange-600 italic">Developments</span>
          </h1>
          <p className="text-sm sm:text-lg font-medium text-slate-300 max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
            Scan and select verified residential communities, airport logistics zones, and industrial parks in Dholera SIR.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Filter Controls */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-md shadow-slate-950/15"
                    : "bg-slate-50 border border-slate-150 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="SEARCH BY PROJECT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-xl bg-slate-50 border border-slate-150 text-[10px] font-black uppercase tracking-widest placeholder-slate-400 text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project: Project) => {
              const projectDesc = t(project.descKey);
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#FF7A00] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-500" />
                      
                      {/* Category Badge */}
                      <span className="absolute top-6 left-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg z-10 transition-transform group-hover:scale-110">
                        {project.category}
                      </span>

                      {project.reraApproved && (
                        <span className="absolute top-6 right-6 bg-green-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg z-10 transition-transform group-hover:scale-110">
                          RERA VERIFIED
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-10 space-y-5">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
                        <MapPin className="h-3.5 w-3.5" />
                        {project.location.split(",")[0]}
                      </div>

                      <h3 className="font-display text-2xl font-black uppercase tracking-tight text-slate-900 group-hover:text-[#FF7A00] transition-colors duration-300">
                        {project.name}
                      </h3>

                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">
                        {t(project.taglineKey)}
                      </p>

                      <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        {projectDesc}
                      </p>
                    </div>
                  </div>

                  {/* Actions (Visual Button) */}
                  <div className="p-10 pt-0">
                    <div className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest group-hover:bg-[#FF7A00] transition-all duration-300 shadow-xl shadow-slate-950/10 group-hover:shadow-orange-600/20">
                      Analyze Project Specs
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl max-w-xl mx-auto space-y-4 shadow-sm">
            <Grid className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="font-display text-xl font-black uppercase tracking-tight text-slate-800">
              No Projects Found
            </h3>
            <p className="text-sm font-semibold text-slate-500 px-8">
              Adjust your search keywords or categories to scan other verified platform options.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
