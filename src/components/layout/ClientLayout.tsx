"use client";

import { useEffect } from "react";
import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientProviders } from "@/providers/ClientProviders";
import { VisitorTracker } from "@/components/common/VisitorTracker";
import ConsentBanner from "@/components/consent/ConsentBanner";

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
    </ClientProviders>
  );
}
