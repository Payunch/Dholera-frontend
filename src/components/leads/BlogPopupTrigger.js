"use client";

import React, { useState, useEffect } from 'react';
import { X, MessageSquare, FileDown, ArrowRight } from 'lucide-react';
import { getABTestVariant, trackABConversion } from '@/lib/webAnalytics';

export function BlogPopupTrigger({ blogTitle = "Dholera Investment Update" }) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [variant, setVariant] = useState('A');

  useEffect(() => {
    // Experiment 3: Persistent A/B test variant assignment (Variant A vs Variant B)
    const assigned = getABTestVariant('blog_popup_cta', ['A', 'B']);
    setVariant(assigned);

    if (hasTriggered) return;

    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('blog_lead_popup_dismissed');
    if (dismissed === 'true') return;

    const triggerPopup = () => {
      setShowPopup(true);
      setHasTriggered(true);
    };

    // Show popup after 18 seconds of reading (optimized for mobile reader engagement)
    const timer = setTimeout(triggerPopup, 18000);

    // Experiment 1: Scroll depth trigger when reader scrolls past 40% of the article
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollPercent = (window.scrollY / scrollHeight) * 100;
      if (scrollPercent > 40) {
        triggerPopup();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem('blog_lead_popup_dismissed', 'true');
  };

  const handleActionClick = () => {
    setShowPopup(false);
    sessionStorage.setItem('blog_lead_popup_dismissed', 'true');

    // Track A/B conversion (Exp 3)
    trackABConversion('blog_popup_cta', variant === 'A' ? 'whatsapp_chat' : 'pdf_download');

    // Fire Meta Pixel Event
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq('track', 'Contact');
    }

    if (variant === 'B') {
      // Variant B: Direct WhatsApp message requesting PDF Master Plan & Rate Sheet
      const text = encodeURIComponent(`Hi Naresh, please share the official 2026 Dholera SIR Master Plan & TP1/TP2 Rate Sheet PDF referenced in "${blogTitle}".`);
      window.open(`https://wa.me/918200448270?text=${text}`, '_blank');
    } else {
      // Variant A: Direct Advisory Consultation
      const text = encodeURIComponent(`Hi Naresh, I am reading "${blogTitle}" on Dholera Platform. Please share the verified 2026 TP1/TP2 plot rate sheet and available inventory.`);
      window.open(`https://wa.me/918200448270?text=${text}`, '_blank');
    }
  };

  if (!showPopup) return null;

  const isVariantB = variant === 'B';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/85 backdrop-blur-lg p-4 animate-in fade-in duration-500">
      <div className="relative w-full max-w-[420px] overflow-hidden rounded-[2.5rem] bg-white/10 dark:bg-slate-950/20 backdrop-blur-2xl shadow-2xl border border-white/20 dark:border-slate-800/60 p-8 animate-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 text-white/60 hover:text-white transition-all z-20 cursor-pointer"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-6 pt-4">
          <div className={`h-16 w-16 ${isVariantB ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'bg-[#25D366]/20 text-[#25D366] border-[#25D366]/30'} rounded-2xl flex items-center justify-center mx-auto border`}>
            {isVariantB ? <FileDown className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF7A00]">
              {isVariantB ? 'Official DSIRDA 2026 Gazette' : 'Direct Help from the Founder'}
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">
              {isVariantB ? 'Get Master Plan & Plot Rates' : 'Talk to Naresh Gohel'}
            </h3>
            <p className="text-xs font-semibold text-slate-300 dark:text-slate-400 leading-relaxed max-w-[300px] mx-auto tracking-wide">
              {isVariantB
                ? 'Receive the complete high-resolution Town Planning Map, official zoning gazettes, and pricing sheets directly on WhatsApp.'
                : 'Message Naresh directly on WhatsApp for verified guidance on land titles, survey numbers, and flexible payment plans.'}
            </p>
          </div>

          <button
            onClick={handleActionClick}
            className={`w-full h-14 rounded-xl ${isVariantB ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20' : 'bg-[#25D366] hover:bg-[#128C7E] shadow-green-500/20'} text-white text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 border-0 outline-none cursor-pointer`}
          >
            {isVariantB ? <FileDown className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
            {isVariantB ? 'Download Master Plan PDF' : 'Chat on WhatsApp'}
            <ArrowRight className="h-4 w-4 opacity-75" />
          </button>

          <button
            onClick={handleClose}
            className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors pt-2 border-0 bg-transparent outline-none cursor-pointer"
          >
            I'll read details first
          </button>
        </div>
      </div>
    </div>
  );
}
