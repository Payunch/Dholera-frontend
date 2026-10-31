"use client";

import React, { useState, useEffect } from 'react';
import { X, MessageCircle, ArrowRight } from 'lucide-react';

export function BlogPopupTrigger({ blogTitle = "Dholera Investment Update" }) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;

    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('blog_lead_popup_dismissed');
    if (dismissed === 'true') return;

    // Trigger popup strictly after 18 seconds (15+ seconds)
    const timer = setTimeout(() => {
      setShowPopup(true);
      setHasTriggered(true);
    }, 18000);

    return () => clearTimeout(timer);
  }, [hasTriggered]);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem('blog_lead_popup_dismissed', 'true');
  };

  const handleWhatsAppClick = () => {
    setShowPopup(false);
    sessionStorage.setItem('blog_lead_popup_dismissed', 'true');

    // Fire Meta Pixel Contact Event
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq('track', 'Contact');
    }

    const message = encodeURIComponent(
      `Hi Naresh, I am reading "${blogTitle}" on Dholera Platform. I would like to connect on WhatsApp for verified plot rates, legal title clearance, and current inventory in Dholera SIR.`
    );
    window.open(`https://wa.me/918200448270?text=${message}`, '_blank');
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/85 backdrop-blur-lg p-4 animate-in fade-in duration-500">
      <div className="relative w-full max-w-[420px] overflow-hidden rounded-[2.5rem] bg-slate-900/95 backdrop-blur-2xl shadow-2xl border border-slate-700/60 p-8 animate-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 text-white/60 hover:text-white transition-all z-20 cursor-pointer"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-6 pt-2">
          {/* WhatsApp Glowing Badge */}
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] shadow-[0_0_30px_rgba(37,211,102,0.3)]">
            <MessageCircle className="h-10 w-10 fill-[#25D366] text-transparent" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366]"></span>
            </span>
          </div>

          <div className="space-y-2">
            <span className="inline-block rounded-full bg-orange-500/15 border border-orange-500/30 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF7A00]">
              Direct Founder Advisory
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">
              Contact Us On WhatsApp
            </h3>
            <p className="text-xs font-semibold text-slate-300 dark:text-slate-300 leading-relaxed max-w-[320px] mx-auto tracking-wide">
              Connect directly with <strong className="text-white">Naresh Gohel</strong> on WhatsApp for verified 2026 plot valuations, legal title search, and ground reality guidance.
            </p>
          </div>

          {/* Primary Action: Direct WhatsApp Chat */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#1faa4b] text-white text-xs font-black uppercase tracking-[0.18em] transition-all shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 flex items-center justify-center gap-2.5 active:scale-95 border-0 outline-none cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 fill-white text-transparent" />
            <span>Chat on WhatsApp</span>
            <ArrowRight className="h-4 w-4 opacity-80" />
          </button>

          <button
            onClick={handleClose}
            className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors border-0 bg-transparent outline-none cursor-pointer"
          >
            I'll continue reading first
          </button>
        </div>
      </div>
    </div>
  );
}
