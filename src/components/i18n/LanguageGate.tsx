"use client";

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/providers/LanguageProvider';
import { getCookie } from '@/utils/cookies';
import { ArrowRight, Globe } from 'lucide-react';
import { SplitLogo } from '@/components/common/DynamicImages';

export function LanguageGate() {
  const { lang, setLang } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const savedLang = getCookie('preferred_lang');
    if (!savedLang) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const languages = [
    { code: "hi", label: "हिन्दी (Hindi)" },
    { code: "en", label: "English" },
    { code: "gu", label: "ગુજરાતી (Gujarati)" },
  ] as const;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-3xl rounded-[3rem] bg-white dark:bg-slate-900 p-10 md:p-14 shadow-2xl text-center space-y-10 border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-500">
        <div className="flex justify-center"><SplitLogo height={50} /></div>
        
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-orange-600">
            <Globe className="h-3 w-3" /> {lang === 'hi' ? 'भाषा का चयन' : lang === 'gu' ? 'ભાષા પસંદગી' : 'Language Selection'}
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            {lang === 'hi' ? 'चुनें' : lang === 'gu' ? 'પસંદ કરો' : 'SELECT YOUR LANGUAGE'}
          </h2>
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
            अपनी भाषा चुनें और आगे बढ़ें <br/> Select your language to continue
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setShow(false);
              }}
              className="group rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 font-black uppercase tracking-widest text-sm text-slate-900 dark:text-white hover:border-orange-600 hover:bg-white dark:hover:bg-slate-900 transition-all flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 relative"
            >
              <div className="h-12 w-12 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6" />
              </div>
              <span className="text-center">{l.label}</span>
              <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-orange-600 absolute bottom-4 right-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
