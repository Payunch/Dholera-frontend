"use client";

import "@/lib/firebase";
import { LeadProvider } from "@/providers/LeadProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { AnalyticsProvider } from "@/providers/AnalyticsProvider";

export function ClientProviders({ children }) {
  return (
    <AnalyticsProvider>
      <LanguageProvider>
        <LeadProvider>
          {children}
        </LeadProvider>
      </LanguageProvider>
    </AnalyticsProvider>
  );
}
