"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Lock } from 'lucide-react';
import { SITE_BASE_URL } from '@/lib/api';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/providers/LanguageProvider';

export function HomeBlogsList({ updates = [] }) {
  const { t } = useLanguage();
  if (!updates || updates.length === 0) return null;

  return (
    <section className="py-20 relative bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-slate-900 dark:text-white tracking-tight">
              {t('latest')} <span className="text-orange-600">{t('blogs')}</span>
            </h2>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">
              {t('intelligence_feed_desc')}
            </p>
          </div>
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF7A00] hover:text-orange-600 transition-colors group"
          >
            {t('view_all_updates')}
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {updates.map((post) => {
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
                href={`/blogs/${post.id}`}
                className="group flex flex-col bg-white dark:bg-slate-950 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-black/100 hover:border-[#FF7A00] hover:-translate-y-2 overflow-hidden"
              >
                {imgSrc && (
                  <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <Image 
                      src={imgSrc}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/0 transition-colors duration-500" />
                  </div>
                )}
                
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#FF7A00] px-2.5 py-1 bg-orange-50 dark:bg-orange-950/10 rounded-lg border border-orange-100/50 dark:border-orange-500/20">
                        {post.category}
                      </span>
                      {post.isExclusive && (
                        <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-amber-500 px-2 py-1 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <Lock className="h-2 w-2" /> {t('exclusive') || 'Exclusive'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                      <TrendingUp className="h-3 w-3" />
                      {format(new Date(post.publishedAt || post.createdAt), "MMM d, yyyy")}
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-black text-slate-900 dark:text-white uppercase leading-snug group-hover:text-[#FF7A00] transition-colors duration-300 line-clamp-2 mb-4">
                    {post.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    {post.content.replace(/<[^>]*>?/gm, '').slice(0, 100)}...
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white group-hover:text-[#FF7A00] transition-all duration-300">
                    <span>{t('read_analysis') || 'Read Analysis'}</span>
                    <ArrowRight className="h-3 w-3 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
