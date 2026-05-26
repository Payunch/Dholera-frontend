"use client";

import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { LeadPopup } from "@/components/leads/LeadPopup";

export function VisitorTracker() {
  const { sessionId, fingerprint } = useVisitorTracking();
  return <LeadPopup sessionId={sessionId || undefined} fingerprint={fingerprint || undefined} />;
}
