"use client";

import { useEffect } from "react";
import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientProviders } from "@/providers/ClientProviders";
import { VisitorTracker } from "@/components/common/VisitorTracker";
import ConsentBanner from "@/components/consent/ConsentBanner";

import { Phone, MessageCircle } from "lucide-react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
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

      {/* Sticky Owner Contact FAB */}
      <div className="fixed bottom-6 right-6 z-[140] flex flex-col gap-3 group items-end">
         {/* Call Action */}
         <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Call Owner
            </div>
            <a 
              href="tel:+917435808310" 
              className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-2xl hover:bg-orange-600 transition-all hover:-translate-y-1"
            >
              <Phone className="h-6 w-6" />
            </a>
         </div>
         
         {/* WhatsApp Action */}
         <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              WhatsApp Us
            </div>
            <a 
              href="https://wa.me/917435808310" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-16 w-16 rounded-[1.5rem] bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:bg-[#128C7E] transition-all hover:-translate-y-1"
            >
              <MessageCircle className="h-8 w-8" />
            </a>
         </div>
      </div>
    </ClientProviders>
  );
}
