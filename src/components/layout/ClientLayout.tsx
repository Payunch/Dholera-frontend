"use client";

import { useEffect } from "react";
import * as React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientProviders } from "@/providers/ClientProviders";
import { VisitorTracker } from "@/components/common/VisitorTracker";
import ConsentBanner from "@/components/consent/ConsentBanner";
import { LanguageGate } from "@/components/i18n/LanguageGate";
import { FloatingActions } from "@/components/layout/FloatingActions";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin');

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

  // Return clean layout for Admin
  if (isAdminPath) {
    return (
      <ClientProviders>
        <div className="min-h-screen bg-white dark:bg-slate-950">
          {children}
        </div>
      </ClientProviders>
    );
  }

  // Return full layout for Public
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
      <LanguageGate />
      <FloatingActions />
    </ClientProviders>
  );
}
