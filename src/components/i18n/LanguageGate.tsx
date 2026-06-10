"use client";

import React, { useEffect, useState } from'react';
import { useLanguage } from'@/providers/LanguageProvider';
import { getCookie } from'@/utils/cookies';
import { ArrowRight, Globe } from'lucide-react';
import { SplitLogo } from'@/components/common/DynamicImages';

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
 { code:"hi", label:"हिन्दी (Hindi)" },
 { code:"en", label:"English" },
 { code:"gu", label:"ગુજરાતી (Gujarati)" },
 ] as const;

 return (
 <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/40 backdrop-blur-xl p-4">
 <div className="w-full max-w-2xl rounded-[3rem] bg-white/90 dark:bg-slate-900/90 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.3)] text-center space-y-8 border border-white/20 dark:border-slate-800 animate-in zoom-in-95 duration-500">
 <div className="flex justify-center"><SplitLogo height={40} isFull /></div>
 
 <div className="space-y-3">
 <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-orange-600">
 <Globe className="h-3 w-3" /> Language Settings
 </div>
 <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
 Select Your Language <br/>
 <span className="text-orange-600 italic">अपनी भाषा चुनें</span>
 </h2>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
 {languages.map((l) => (
 <button
 key={l.code}
 onClick={() => {
 setLang(l.code);
 setShow(false);
 }}
 className="group rounded-3xl border-2 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 p-6 font-black uppercase tracking-widest text-[11px] text-slate-900 dark:text-white hover:border-orange-600 hover:bg-white dark:hover:bg-slate-900 transition-all flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-2xl hover:-translate-y-1 relative"
 >
 <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 text-slate-400 group-hover:bg-orange-600 group-hover:text-white flex items-center justify-center group-hover:scale-110 transition-all duration-300">
 <Globe className="h-5 w-5" />
 </div>
 <span className="text-center group-hover:text-orange-600 transition-colors">{l.label}</span>
 <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-orange-600 absolute bottom-4 right-4" />
 </button>
 ))}
 </div>

 <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed">
 You can change this later from the top navigation bar <br/> 
 आप इसे बाद में शीर्ष नेविगेशन बार से बदल सकते हैं
 </p>
 </div>
 </div>
 );
}
