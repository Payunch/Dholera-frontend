"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";

export function FloatingActions() {
  const { t } = useLanguage();
  
  const whatsappUrl = `https://wa.me/917435808031?text=${encodeURIComponent(t('whatsapp_hello'))}`;

  return (
    <>
      {/* Global Mobile Conversion Runtime Utilities (Sticky Bottom Action Bar) */}
      <div className="fixed bottom-0 left-0 right-0 z-[180] flex h-14 w-full md:hidden bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <a
          href="tel:+917435808031"
          className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-white font-bold tracking-wide active:bg-slate-800"
        >
          <Phone className="h-5 w-5" />
          <span>Call Expert</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold tracking-wide active:bg-[#128C7E]"
        >
          <MessageCircle className="h-5 w-5" />
          <span>WhatsApp Chat</span>
        </a>
      </div>

      {/* Desktop Sticky Owner Contact FAB */}
      <div className="fixed bottom-6 right-6 z-[140] hidden md:flex flex-col gap-3 group items-end">
         <a
           href={whatsappUrl}
           target="_blank"
           rel="noopener noreferrer"
           className="px-6 py-4 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:bg-[#128C7E] transition-all hover:-translate-y-1 font-black tracking-widest text-sm"
         >
           +91 74358 08031
         </a>
      </div>
    </>
  );
}
