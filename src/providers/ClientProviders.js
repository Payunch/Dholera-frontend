"use client";

import"@/lib/firebase";
import { LeadProvider } from"@/providers/LeadProvider";
import { LanguageProvider } from"@/providers/LanguageProvider";

export function ClientProviders({ children }: { children.ReactNode }) {
 return (
 <LanguageProvider>
 <LeadProvider>
 {children}
 </LeadProvider>
 </LanguageProvider>
 );
}
