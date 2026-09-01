"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { ArrowRight, TrendingUp, Landmark, HardHat, Search, Filter, Lock } from "lucide-react";
import Image from "next/image";
import { SITE_BASE_URL } from "@/lib/api";
import { format } from "date-fns";
import { useLanguage } from '@/providers/LanguageProvider';
import { cn } from "@/lib/utils";
import { getBlogPath } from "@/lib/blogSlug";


export default function BlogsClient({ initialUpdates, hasError }) {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const TABS = [
    { id: "All", label: "All News", keywords: [] },
    { id: "Investment", label: "Investment", keywords: ["investment", "price", "market"] },
    { id: "Infrastructure", label: "Infrastructure", keywords: ["infrastructure", "construction", "project"] },
    { id: "Legal", label: "Legal & Planning", keywords: ["planning", "policy", "legal", "subsidy", "registration"] },
  ];

  const filtered = initialUpdates.filter(post => {
    const matchesSearch = !search || 
      `${post.title} ${post.category} ${post.content}`.toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === "All") return matchesSearch;
    
    const tab = TABS.find(t => t.id === activeTab);
    const matchesTab = tab?.keywords.some(k => (post.category || "").toLowerCase().includes(k));
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen font-sans w-full overflow-x-hidden transition-colors">
      
      {/* Dynamic Header */}
      <section className="relative bg-slate-900 pt-32 pb-16 md:pb-24 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image 
            src="/images/dholerasirGujrat.webp" 
            alt="Intelligence Feed" 
            fill 
            className="object-cover grayscale brightness-50"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950" />

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center pt-20">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.85]">
              Intelligence <span className="text-orange-600 italic">Feed</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 font-bold uppercase tracking-[0.3em]">
              Live updates from India's first smart city
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <h2 className="text-3xl font-black text-slate-950 dark:text-white">Dholera news, infrastructure updates and planning analysis</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Follow dated coverage of Dholera SIR infrastructure, industrial announcements, planning, policy and property due diligence. Time-sensitive claims should be checked against the linked primary source and the article&apos;s publication or update date.
          </p>
          <nav aria-label="Dholera topic guides" className="mt-7 flex flex-wrap gap-3">
            <Link href="/tp-maps" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black dark:border-slate-700">TP maps</Link>
            <Link href="/smart-city" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black dark:border-slate-700">Dholera SIR facts</Link>
            <Link href="/infrastructure" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black dark:border-slate-700">Infrastructure</Link>
            <Link href="/airport" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black dark:border-slate-700">Airport</Link>
            <Link href="/investment-guide" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black dark:border-slate-700">Due diligence</Link>
            <Link href="/editorial-policy" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black dark:border-slate-700">Editorial standards</Link>
          </nav>
        </div>
      </section>

      {/* Filter & Tabs Bar */}
      <section className="sticky top-20 z-[140] bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 py-6">
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px] flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2",
                  activeTab === tab.id 
                    ? "bg-[#FF7A00] border-[#FF7A00] text-white shadow-xl shadow-orange-600/10 dark:shadow-orange-600/50" 
                    : "bg-transparent border-transparent text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder={t?.('search_placeholder') || 'Search intelligence...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-widest outline-none focus:border-[#FF7A00] transition-all text-slate-900 dark:text-white"
            />
          </div>

        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
          
          {hasError ? (
            <div className="py-32 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-black uppercase text-slate-900 dark:text-white tracking-tight">Temporarily Unavailable</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm">
                We are currently performing scheduled maintenance on our intelligence feed to bring you better insights. Please check back shortly.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-32 text-center space-y-4">
              <Filter className="h-12 w-12 text-slate-200 mx-auto" />
              <h3 className="text-xl font-black uppercase text-slate-300 tracking-tight">No intelligence matches your filter</h3>
              <button onClick={() => { setActiveTab("All"); setSearch(""); }} className="text-orange-600 text-xs font-black uppercase tracking-widest underline underline-offset-4">Reset all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {filtered.map(post => {
                const imgSrc = post.imageUrl 
                  ? (
                      post.imageUrl.startsWith("http") ? post.imageUrl : 
                      post.imageUrl.startsWith("/uploads/") ? `${SITE_BASE_URL}${post.imageUrl}` :
                      post.imageUrl
                    )
                  : null;

                return (
                  <Link 
                    key={post.id} 
                    href={getBlogPath(post)}
                    className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-black/100 hover:border-[#FF7A00] hover:-translate-y-2 overflow-hidden"
                  >
                    {imgSrc && (
                      <div className="relative h-72 md:h-80 w-full bg-white dark:bg-slate-950 overflow-hidden">
                        <Image 
                          src={imgSrc}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-500" />
                      </div>
                    )}
                    
                    <div className="p-8 md:p-10 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF7A00] px-3 py-1 bg-orange-50 dark:bg-orange-950/10 rounded-lg border border-orange-100/50 dark:border-orange-500/20 self-start">
                              {post.category}
                            </span>
                            {post.isExclusive && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-amber-500 px-2.5 py-1 bg-amber-500/10 rounded-lg border border-amber-500/20">
                                <Lock className="h-2.5 w-2.5" /> App Exclusive
                              </span>
                            )}
                          </div>
                          {post.author && (
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 capitalize">
                              By {post.author}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          <TrendingUp className="h-3 w-3" />
                          {format(new Date(post.publishedAt || post.createdAt), "MMM d, yyyy")}
                        </div>
                      </div>

                      <h3 className="font-display text-2xl font-black text-slate-900 dark:text-white uppercase leading-snug group-hover:text-[#FF7A00] transition-colors duration-300 line-clamp-3 mb-6">
                        {post.title}
                      </h3>

                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-10 opacity-80 group-hover:opacity-100 transition-opacity">
                        {post.content.replace(/<[^>]*>?/gm, '').slice(0, 150)}...
                      </p>

                      <div className="mt-auto pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white group-hover:text-[#FF7A00] transition-all duration-300">
                        <span>Read Analysis</span>
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
          
        </div>
      </section>

    </div>
  );
}
