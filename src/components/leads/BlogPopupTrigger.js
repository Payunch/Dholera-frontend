"use client";

import React, { useState, useEffect } from 'react';
import { X, MessageSquare } from 'lucide-react';



export function BlogPopupTrigger({ blogTitle = "Dholera Investment Update" }) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;

    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('blog_lead_popup_dismissed');
    if (dismissed === 'true') return;

    // Show popup after 45 seconds of reading
    const timer = setTimeout(() => {
      setShowPopup(true);
      setHasTriggered(true);
    }, 45000);

    return () => clearTimeout(timer);
  }, [hasTriggered]);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem('blog_lead_popup_dismissed', 'true');
  };

  const handleWhatsAppClick = () => {
    setShowPopup(false);
    sessionStorage.setItem('blog_lead_popup_dismissed', 'true');
    
    // Fire Meta Pixel Event
    if (typeof window !== "undefined" && (window).fbq) {
      (window).fbq('track', 'Contact');
    }

    // WhatsApp native bold formatting uses asterisks * instead of <b> tags
    const text = encodeURIComponent(`HELLO NARESH, I AM INTERESTED IN INVESTMENT OPPORTUNITIES IN *DHOLERA SMART CITY*. PLEASE SHARE THE LATEST UPDATES AND PROJECT DETAILS`);
    window.open(`https://wa.me/917435808031?text=${text}`, '_blank');
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/85 backdrop-blur-lg p-4 animate-in fade-in duration-500">
      <div className="relative w-full max-w-[400px] overflow-hidden rounded-[2.5rem] bg-white/10 dark:bg-slate-950/20 backdrop-blur-2xl shadow-2xl border border-white/20 dark:border-slate-800/60 p-8 animate-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 text-white/60 hover:text-white transition-all z-20"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-6 pt-4">
          <div className="h-16 w-16 bg-[#25D366]/20 text-[#25D366] rounded-2xl flex items-center justify-center mx-auto border border-[#25D366]/30">
            <MessageSquare className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF7A00]">
              Direct Help from the Founder
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">
              Talk to Naresh Gohel
            </h3>
            <p className="text-xs font-semibold text-slate-300 dark:text-slate-400 leading-relaxed max-w-[280px] mx-auto uppercase tracking-wide">
              Message Naresh directly on WhatsApp for simple advice about land, maps, and easy ways to pay.
            </p>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="w-full h-14 rounded-xl bg-[#25D366] text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-[#128C7E] transition-all shadow-xl shadow-green-500/10 flex items-center justify-center gap-2 active:scale-95 border-0 outline-none"
          >
            <MessageSquare className="h-4 w-4" />
            Chat on WhatsApp
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
