"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";

export function FloatingActions() {
    const { t } = useLanguage();

    const whatsappUrl = `https://wa.me/917435808031?text=${encodeURIComponent("Hi Naresh, I am inquiring about available title-clear plots and investment opportunities in Dholera SIR. Please share current rates and project details.")}`;

    return (
        <>
            {/* Global Sticky Land Advisory FAB (Visible on all devices) */}
            <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[140] flex flex-col gap-3 group items-end">
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-700/60 hover:border-emerald-500/60 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 font-bold text-xs uppercase tracking-wider group"
                    aria-label="Chat with Land Advisor on WhatsApp"
                >
                    <div className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
                    <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366] transition-transform group-hover:scale-110" />
                    <span>Chat with Land Advisor</span>
                </a>
            </div>
        </>
    );
}
