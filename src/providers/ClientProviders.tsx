"use client";

import "@/lib/firebase";
import { LeadProvider } from "@/providers/LeadProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LeadProvider>
        {children}
      </LeadProvider>
    </LanguageProvider>
  );
}
