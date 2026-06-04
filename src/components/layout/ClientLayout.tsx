"use client";

import { useEffect } from "react";
import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientProviders } from "@/providers/ClientProviders";
import { VisitorTracker } from "@/components/common/VisitorTracker";
import { UniversalConnect } from "@/components/common/UniversalConnect";
import ConsentBanner from "@/components/consent/ConsentBanner";

import { Phone, MessageCircle } from "lucide-react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Import Bootstrap JS on client side
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
  }, []);

  return (
    <ClientProviders>
      <div className="flex min-h-screen flex-col">
        <React.Suspense fallback={<div className="h-20 bg-slate-950/80" />}>
          <Navbar />
        </React.Suspense>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <React.Suspense fallback={null}>
        <VisitorTracker />
      </React.Suspense>
      <ConsentBanner />

      {/* Global Mobile Conversion Runtime Utilities (Sticky Bottom Action Bar) */}
      <div className="fixed bottom-0 left-0 right-0 z-[180] flex h-14 w-full md:hidden bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <a
          href="tel:+917435808031"
          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-bold tracking-wide active:bg-slate-800"
        >
          <Phone className="h-5 w-5" />
          <span>Call Expert</span>
        </a>
        <a
          href="https://wa.me/917435808031"
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
           href="https://wa.me/917435808031"
           target="_blank"
           rel="noopener noreferrer"
           className="px-6 py-4 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:bg-[#128C7E] transition-all hover:-translate-y-1 font-black tracking-widest text-sm"
         >
           +91 74358 08031
         </a>
      </div>
      
      <UniversalConnect />
    </ClientProviders>
  );
}
