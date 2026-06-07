"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { useLanguage } from "@/providers/LanguageProvider";
import { 
  ChevronLeft, 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  Info, 
  CheckCircle2, 
  Calendar,
  Grid,
  Building,
  Landmark,
  ExternalLink
} from "lucide-react";

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const { lang, t } = useLanguage();

  const title = project.name;
  const tagline = t(project.taglineKey);
  const description = t(project.descKey);

  return (
    <div className="bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pt-12 pb-32">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Back Link */}
        <Link
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-orange-600"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Projects Hub
        </Link>

        {/* Hero Info Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Details Column (8 Cols on large screen) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header copy */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[9px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-xl shadow-sm">
                  {project.category}
                </span>
                
                {project.reraApproved ? (
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border border-green-100 shadow-sm">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    RERA Approved
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border border-amber-100 shadow-sm">
                    <Info className="h-3.5 w-3.5" />
                    Clearance Pending
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl font-black uppercase tracking-tight text-slate-900 md:text-5xl leading-tight">
                {title}
              </h1>

              <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {tagline}
              </p>
            </div>

            {/* Project Image */}
            <div className="relative h-64 md:h-96 w-full bg-slate-100 border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-slate-950/10" />
            </div>

            {/* Overview / Story Card */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-6">
              <h2 className="font-display text-2xl font-black uppercase tracking-tight text-slate-900">
                Project Overview
              </h2>
              
              <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                {description}
              </p>

              {/* Specs Table List */}
              <div className="pt-6 border-t border-slate-100 grid gap-6 sm:grid-cols-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Available Sizes</span>
                  <p className="text-sm font-black text-slate-800 uppercase">{project.plotSizes}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Offering</span>
                  <p className="text-sm font-black text-slate-800 uppercase">{project.offering}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Internal Roads</span>
                  <p className="text-sm font-black text-slate-800 uppercase">{project.roadWidth}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Zoning Designation</span>
                  <p className="text-sm font-black text-slate-800 uppercase">{project.zoning}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Map & Action Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            
            {/* Map Frame Card */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900 font-display">
                    Geographic Alignment
                  </span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  TP Coordinates
                </span>
              </div>

              {/* Map Embed Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-150 shadow-sm bg-slate-100 h-[300px] flex">
                <iframe
                  title={`${project.name} Google Map Location`}
                  src={project.mapUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Project Location</span>
                <p className="text-sm font-black text-slate-800 uppercase leading-tight">{project.location}</p>
              </div>
            </div>

            {/* CTAs Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 text-slate-900 dark:text-white space-y-6 shadow-xl shadow-slate-950/15">
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-black uppercase tracking-tight">
                  Advisory Desk
                </h3>
                <p className="text-xs font-semibold text-slate-350 leading-relaxed">
                  Connect directly with our infrastructure desk to verify survey records, zoning boundaries, and current pricing.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <a
                  href={`https://wa.me/917435808031?text=${encodeURIComponent(project.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] text-white text-xs font-black uppercase tracking-widest hover:bg-[#128C7E] transition-all shadow-lg shadow-green-500/10"
                >
                  <MessageSquare className="h-5 w-5" />
                  Inquire on WhatsApp
                </a>

                <Link
                  href="/clearance-engine"
                  className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Verify via Clearance Engine
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
