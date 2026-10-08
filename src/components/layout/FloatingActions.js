"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";

export function FloatingActions() {
    const { t } = useLanguage();

    const whatsappUrl = `https://wa.me/917435808031?text=${encodeURIComponent("HELLO, I AM INTERESTED IN INVESTMENT OPPORTUNITIES IN *DHOLERA SMART CITY*. PLEASE SHARE THE LATEST UPDATES AND PROJECT DETAILS IN RESIDENTIAL")}`;

    return (
        <>
            {/* Global Sticky Owner Contact FAB (Visible on all devices) */}
            <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[140] flex flex-col gap-3 group items-end">
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#128C7E] transition-all hover:-translate-y-1 font-black tracking-widest text-xs sm:text-sm"
                    aria-label="Contact Owner on WhatsApp"
                >
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span>+91 74358 08031</span>
                </a>
            </div>
        </>
    );
}
