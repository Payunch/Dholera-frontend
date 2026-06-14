"use client";

import { useEffect } from"react";
import * as React from"react";
import { usePathname, useSearchParams } from"next/navigation";
import { Navbar } from"@/components/layout/Navbar";
import { Footer } from"@/components/layout/Footer";
import { ClientProviders } from"@/providers/ClientProviders";
import { VisitorTracker } from"@/components/common/VisitorTracker";
import ConsentBanner from"@/components/consent/ConsentBanner";
import { LanguageGate } from"@/components/i18n/LanguageGate";
import { FloatingActions } from"@/components/layout/FloatingActions";

import { getCookie } from"@/utils/cookies";

export default function ClientLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const pathname = usePathname();
 const searchParams = useSearchParams();

 // Robust admin check: Path-based + Cookie-based
 const isAdminPath = pathname?.startsWith('/admin');
 const hasAdminCookie = typeof window !=="undefined" && (getCookie('admin_access_token') || getCookie('admin_refresh_token'));
 const isActuallyAdmin = isAdminPath || hasAdminCookie;

 useEffect(() => {
 if (typeof window !== "undefined") {
   const utm = searchParams?.get("utm_source");
   if (utm) {
     sessionStorage.setItem("dholera_utm_source", utm);
   }
 }

 import("bootstrap/dist/js/bootstrap.bundle.min.js");

 if (typeof window !=="undefined" &&"serviceWorker" in navigator) {
 navigator.serviceWorker.getRegistrations().then((registrations) => {
 for (const registration of registrations) {
 registration.unregister();
 }
 });
 }
 }, [searchParams]);

 // Return clean layout for Admin
 if (isActuallyAdmin) {
 return (
 <ClientProviders>
 <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
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
