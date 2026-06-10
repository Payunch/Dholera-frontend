"use client";

import React, { useState, useEffect } from 'react';
import { X, MessageSquare } from 'lucide-react';

interface BlogPopupTriggerProps {
  blogTitle?: string;
}

export function BlogPopupTrigger({ blogTitle = "Dholera Investment Update" }: BlogPopupTriggerProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;

    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('blog_lead_popup_dismissed');
    if (dismissed === 'true') return;

    // Show popup after 12 seconds of reading
    const timer = setTimeout(() => {
      setShowPopup(true);
      setHasTriggered(true);
    }, 12000);

    return () => clearTimeout(timer);
  }, [hasTriggered]);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem('blog_lead_popup_dismissed', 'true');
  };

  const handleWhatsAppClick = () => {
    setShowPopup(false);
    sessionStorage.setItem('blog_lead_popup_dismissed', 'true');
    const text = encodeURIComponent(`Hello Naresh, I am interested in <b>Dholera SIR investment opportunities.<b> I was reading your article on "${blogTitle}" and would like more details.`);
    window.open(`https://wa.me/917435808031?text=${text}`, '_blank');
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in duration-500">
      <div className="relative w-full max-w-[400px] overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900 p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-900 dark:text-slate-505 dark:hover:text-white transition-all z-20"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-6 pt-4">
          <div className="h-16 w-16 bg-[#25D366]/10 text-[#25D366] rounded-2xl flex items-center justify-center mx-auto border border-[#25D366]/20">
            <MessageSquare className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF7A00]">
              Exclusive Investment Access
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
              Connect With The Founder
            </h3>
            <p className="text-xs font-semibold text-slate-505 dark:text-slate-400 leading-relaxed max-w-[280px] mx-auto uppercase tracking-wide">
              Chat directly with Naresh Gohel on WhatsApp for expert land guidance, TP maps, and payment plans.
            </p>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="w-full h-14 rounded-xl bg-[#25D366] text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-[#128C7E] transition-all shadow-xl shadow-green-500/10 flex items-center justify-center gap-2 active:scale-95"
          >
            <MessageSquare className="h-4 w-4" />
            Chat on WhatsApp
          </button>

          <button
            onClick={handleClose}
            className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-650 transition-colors pt-2"
          >
            I'll read details first
          </button>
        </div>
      </div>
    </div>
  );
}
