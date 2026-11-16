"use client";

import React from "react";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";

export function FloatingActions() {
    const { t } = useLanguage();

    const whatsappUrl = `https://wa.me/918200448270?text=${encodeURIComponent("Hi Nareshji, I am inquiring about available title-clear plots and 2026 price per sq yard in Dholera SIR. Please share current rates and project brochure.")}`;
    const callUrl = "tel:+918200448270";

    const handleCallClick = () => {
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq('track', 'Contact');
        }
    };

    const handleWhatsAppClick = () => {
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq('track', 'Contact');
        }
    };

    const handleDownloadPdfClick = () => {
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent('openLeadModal'));
            if (window.fbq) window.fbq('track', 'Lead');
        }
    };

    return (
        <>
            {/* 1. Mobile Triple Sticky Conversion Bar (Visible on mobile screens < 640px) */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[150] bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 p-2 px-2.5 flex items-center gap-2 shadow-[0_-8px_30px_rgba(0,0,0,0.6)]">
                {/* Direct Call Button */}
                <a
                    href={callUrl}
                    onClick={handleCallClick}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-[11px] uppercase tracking-wider shadow-lg shadow-orange-600/30 active:scale-95 transition-all text-center"
                    aria-label="Call Land Advisor directly"
                >
                    <Phone className="h-3.5 w-3.5 shrink-0 fill-current" />
                    <span>Call</span>
                </a>

                {/* WhatsApp Rate Card Button */}
                <a
                    href={whatsappUrl}
                    onClick={handleWhatsAppClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] uppercase tracking-wider shadow-lg shadow-emerald-600/30 active:scale-95 transition-all text-center"
                    aria-label="Inquire on WhatsApp"
                >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0 fill-current" />
                    <span>WhatsApp</span>
                </a>

                {/* TP Map & Brochure PDF Download */}
                <button
                    type="button"
                    onClick={handleDownloadPdfClick}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-center"
                    aria-label="Download TP Maps PDF"
                >
                    <FileText className="h-3.5 w-3.5 shrink-0" />
                    <span>TP Maps</span>
                </button>
            </div>

            {/* 2. Desktop Floating Action Stack (Visible on screens >= 640px) */}
            <div className="hidden sm:flex fixed bottom-6 right-6 z-[140] flex-col gap-2.5 items-end">
                {/* PDF Brochure & TP Maps Download CTA */}
                <button
                    type="button"
                    onClick={handleDownloadPdfClick}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-xl transition-all duration-300 hover:-translate-y-0.5 font-black text-[11px] uppercase tracking-wider border border-amber-300/40"
                    aria-label="Get 2026 TP Map & Price PDF"
                >
                    <FileText className="h-3.5 w-3.5 shrink-0" />
                    <span>Get 2026 TP Maps & Price PDF</span>
                </button>

                {/* Direct Call Button */}
                <a
                    href={callUrl}
                    onClick={handleCallClick}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 font-black text-[11px] uppercase tracking-wider border border-orange-400/30"
                    aria-label="Call Land Advisor directly"
                >
                    <Phone className="h-3.5 w-3.5 shrink-0 fill-current" />
                    <span>Call Land Advisor: +91 82004 48270</span>
                </a>

                {/* WhatsApp Chat Button */}
                <a
                    href={whatsappUrl}
                    onClick={handleWhatsAppClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-700/60 hover:border-emerald-500/60 text-white shadow-2xl transition-all duration-300 hover:-translate-y-0.5 font-bold text-xs uppercase tracking-wider group"
                    aria-label="Chat with Land Advisor on WhatsApp"
                >
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366] shadow-[0_0_8px_#25D366]" />
                    </span>
                    <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366] transition-transform group-hover:scale-110" />
                    <span className="font-bold tracking-wider">WhatsApp Inquiries</span>
                </a>
            </div>
        </>
    );
}
