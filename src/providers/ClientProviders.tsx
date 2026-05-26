"use client";

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
