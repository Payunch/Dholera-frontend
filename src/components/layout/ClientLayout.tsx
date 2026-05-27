"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientProviders } from "@/providers/ClientProviders";
import { VisitorTracker } from "@/components/common/VisitorTracker";
import OrganizationSchema from "@/components/OrganizationSchema";
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
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <OrganizationSchema />
      <VisitorTracker />
      <ConsentBanner />
    </ClientProviders>
  );
}
