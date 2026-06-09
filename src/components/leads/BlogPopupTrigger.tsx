"use client";

import React, { useState, useEffect } from 'react';
import { LeadPopup } from '@/components/leads/LeadPopup';
import { useLead } from '@/providers/LeadProvider';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

export function BlogPopupTrigger() {
  const [showPopup, setShowPopup] = useState(false);
  const { verifiedLead } = useLead();
  const { sessionId, fingerprint } = useVisitorTracking();
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Only trigger if not already verified and not triggered in this session
    if (verifiedLead || hasTriggered) return;

    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('blog_lead_popup_dismissed');
    if (dismissed === 'true') return;

    // Random time between 10 to 25 seconds
    const randomTime = Math.floor(Math.random() * 15000) + 10000;
    
    const timer = setTimeout(() => {
      setShowPopup(true);
      setHasTriggered(true);
    }, randomTime);

    return () => clearTimeout(timer);
  }, [verifiedLead, hasTriggered]);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem('blog_lead_popup_dismissed', 'true');
  };

  if (!showPopup) return null;

  return (
    <LeadPopup 
      sessionId={sessionId || undefined}
      fingerprint={fingerprint || undefined}
      compulsory={false}
      onClose={handleClose}
      onSuccess={() => setShowPopup(false)}
    />
  );
}
