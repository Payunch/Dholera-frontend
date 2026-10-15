"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { ArrowRight, TrendingUp, Search, Lock } from "lucide-react";
import Image from "next/image";
import { SITE_BASE_URL } from "@/lib/api";
import { format } from "date-fns";
import { useLanguage } from '@/providers/LanguageProvider';
import { cn } from "@/lib/utils";
import { getBlogPath } from "@/lib/blogSlug";

function sanitizeExcerpt(content) {
  if (!content) return "";
  return content
    .replace(/<[^>]*>?/gm, '')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\|[^\n]+\|/g, '')
    .replace(/#{1,6}\s+[^\n]+/g, '')
    .replace(/\*{1,3}([^\*]+)\*{1,3}/g, '$1')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
}

function cleanCategoryBadge(category) {
  if (!category) return "News";
  const primary = category.split(',')[0].trim();
  return primary.replace(/&amp;/g, '&').replace(/_/g, ' ');
}

const CATEGORIES = [
  { label: 'All News', slug: 'all' },
  { label: 'Infrastructure', slug: 'infrastructure' },
  { label: 'Investment', slug: 'investment' },
  { label: 'Industrial & Planning', slug: 'industrial' },
  { label: 'Connectivity', slug: 'connectivity' },
];

export default function BlogsClient({ initialUpdates, hasError }) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredBlogs = (initialUpdates || []).filter((blog) => {
    const postCategory = (blog.category || '').toLowerCase();
    const postTitle = (blog.title || '').toLowerCase();
    const postExcerpt = (blog.excerpt || sanitizeExcerpt(blog.content) || '').toLowerCase();
    const postContent = (blog.content || '').toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    // Category filter: normalize both article category and filter state
    const matchesCategory =
      selectedCategory === 'all' ||
      postCategory.includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'industrial' && (
        postCategory.includes('plan') ||
        postCategory.includes('industr') ||
        postCategory.includes('scheme') ||
        postCategory.includes('development')
      )) ||
      (selectedCategory === 'connectivity' && (
        postCategory.includes('connect') ||
        postCategory.includes('expressway') ||
        postCategory.includes('airport') ||
        postCategory.includes('logistic')
      ));

    // Search input filter
    const matchesSearch =
      !query ||
      postTitle.includes(query) ||
      postExcerpt.includes(query) ||
      postCategory.includes(query) ||
      postContent.includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-slate-950 py-24 md:py-32 border-b border-slate-800">
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
          <Image
            src="/images/expresswayVision.webp"
            alt="Dholera Intelligence Network"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950" />

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center pt-20">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black uppercase tracking-tighter text-white leading-[0.95]">
              {t('intelligence_feed_title') || "Intelligence Feed"}
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 font-bold uppercase tracking-[0.25em]">
              {t('intelligence_feed_subtitle') || "Live updates from India's first smart city"}
            </p>
          </div>
        </div>
      </section>

      {/* Guide Links */}
      <section className="border-b border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <h2 className="text-3xl font-black text-slate-950 dark:text-white">
            {t('blogs_header_title') || "Dholera news, infrastructure updates and planning analysis"}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600 dark:text-slate-300">
            {t('blogs_header_desc') || "Follow dated coverage of Dholera SIR infrastructure, industrial announcements, planning, policy and property due diligence. Time-sensitive claims should be checked against the linked primary source and the article's publication or update date."}
          </p>
          <nav aria-label="Dholera topic guides" className="mt-7 flex flex-wrap gap-3">
            <Link href="/tp-maps" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black dark:border-slate-700 hover:border-orange-500 transition-colors">
              {t('topic_tp_maps') || "TP maps"}
            </Link>
            <Link href="/smart-city" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black dark:border-slate-700 hover:border-orange-500 transition-colors">
              {t('topic_dholera_facts') || "Dholera SIR facts"}
            </Link>
            <Link href="/infrastructure" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black dark:border-slate-700 hover:border-orange-500 transition-colors">
              {t('topic_infrastructure') || "Infrastructure"}
            </Link>
            <Link href="/airport" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black dark:border-slate-700 hover:border-orange-500 transition-colors">
              {t('topic_airport') || "Airport"}
            </Link>
            <Link href="/investment-guide" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black dark:border-slate-700 hover:border-orange-500 transition-colors">
              {t('topic_due_diligence') || "Due diligence"}
            </Link>
            <Link href="/editorial-policy" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black dark:border-slate-700 hover:border-orange-500 transition-colors">
              {t('topic_editorial_standards') || "Editorial standards"}
            </Link>
          </nav>
        </div>
      </section>

      {/* Filter & Tabs Bar */}
      <section className="sticky top-20 z-[140] bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 py-6">
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px] flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-md font-black'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-transparent dark:border-slate-700/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder={t?.('search_placeholder') || 'Search intelligence...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#FF7A00]"
            />
          </div>

        </div>
      </section>

      {/* Grid Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
          
          {hasError ? (
            <div className="py-24 text-center">
              <p className="text-sm font-black uppercase tracking-widest text-red-500">
                {t('feed_offline_notice') || "Intelligence feed is temporarily unavailable. Please retry shortly."}
              </p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-24 text-center space-y-3">
              <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                {t('no_records_found') || "No intelligence posts found matching this category or search filter."}
              </p>
              <button
                type="button"
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                className="px-6 py-2.5 rounded-full bg-orange-600 text-white text-xs font-black uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredBlogs.map(post => {
                const imgSrc = post.imageUrl 
                  ? (
                      post.imageUrl.startsWith("http") ? post.imageUrl : 
                      post.imageUrl.startsWith("/uploads/") ? `${SITE_BASE_URL}${post.imageUrl}` :
                      post.imageUrl
                    )
                  : null;

                const excerpt = sanitizeExcerpt(post.content);
                const badge = cleanCategoryBadge(post.category);

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
                              {badge}
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

                      {excerpt && (
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-10 opacity-80 group-hover:opacity-100 transition-opacity">
                          {excerpt}...
                        </p>
                      )}

                      <div className="mt-auto pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white group-hover:text-[#FF7A00] transition-all duration-300">
                        <span>Read Analysis</span>
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          
        </div>
      </section>

    </div>
  );
}
