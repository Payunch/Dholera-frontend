"use client";

import { useVisitorTracking } from"@/hooks/useVisitorTracking";

export function VisitorTracker() {
 // session tracking only - UI popups moved to specific triggers (e.g. PDF access)
 const { sessionId, fingerprint } = useVisitorTracking();
 return null;
}
