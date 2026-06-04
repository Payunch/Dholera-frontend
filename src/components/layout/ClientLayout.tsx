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
      <div className="fixed bottom-24 right-6 md:bottom-6 z-[140] flex flex-col gap-3 group items-end">
         <a
           href="https://wa.me/917435808310"
           target="_blank"
           rel="noopener noreferrer"
           className="px-6 py-4 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:bg-[#128C7E] transition-all hover:-translate-y-1 font-black tracking-widest text-sm"
         >
           +91 74358 08310
         </a>
      </div>
    </ClientProviders>
  );
}
