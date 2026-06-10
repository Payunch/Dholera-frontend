"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api';
import { setCookie, getCookie } from '@/utils/cookies';

// Global singletons to prevent multiple component mounts from spamming APIs
let globalHasCheckedVisitor = false;
let globalHasStartedTracker = false;

const generateSessionId = () => {
  return '_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

const getBrowserFingerprint = () => {
  try {
    const { userAgent, language, hardwareConcurrency } = navigator;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 'unknown';
    const { width, height, colorDepth } = window.screen;

    let canvasData = 'no-canvas';
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.fillText("dholera-smart-city-v1", 2, 2);
        canvasData = canvas.toDataURL();
      }
    } catch (e) {
      console.warn('Fingerprint: Canvas blocked', e);
    }

    const str = `${userAgent}|${language}|${hardwareConcurrency}|${deviceMemory}|${width}x${height}x${colorDepth}|${canvasData}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return 'fp_' + Math.abs(hash).toString(36);
  } catch (err) {
    console.error('Fingerprint generation failed:', err);
    return 'fp_fallback_' + Math.random().toString(36).substring(2, 5);
  }
};

export const useVisitorTracking = () => {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith('/admin');

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  // Initialize fingerprint and session once
  useEffect(() => {
    if (typeof window === 'undefined' || isAdminPath) return;

    let nextSessionId = getCookie('visitorSessionId');
    let nextFingerprint = getCookie('visitorFingerprint');

    if (!nextSessionId) {
      nextSessionId = generateSessionId();
      setCookie('visitorSessionId', nextSessionId, 1);
    }

    if (!nextFingerprint) {
      nextFingerprint = getBrowserFingerprint();
      setCookie('visitorFingerprint', nextFingerprint, 365);
    }

    setSessionId(nextSessionId);
    setFingerprint(nextFingerprint);

  }, [isAdminPath]);

  // Check visitor status once per fingerprint
  useEffect(() => {
    if (typeof window === 'undefined' || isAdminPath || !fingerprint) return;
    if (globalHasCheckedVisitor) return;

    const checkReturning = async () => {
      globalHasCheckedVisitor = true; // Mark globally as checked
      const existingToken = getCookie('lead_token');
      const isValidFingerprint = fingerprint && /^fp_[a-z0-9]+$/i.test(fingerprint);

      if (!existingToken && isValidFingerprint) {
        try {
          const res = await fetch(`${API_BASE_URL}/leads/check-visitor/${fingerprint}`);
          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            console.warn('Check visitor server error:', errData.error || res.statusText);
            return;
          }
          const data = await res.json();
          if (data.verified && data.lead_token) {
            setCookie('lead_token', data.lead_token);
            if (data.lead) {
              setCookie('lead_phone', data.lead.phone || '');
              setCookie('lead_name', data.lead.name || '');
            }
          }
        } catch (err) {
          console.debug('Visitor tracking: connection pending');
        }
      }
    };

    checkReturning();
  }, [fingerprint, isAdminPath]);

  // Handle active page tracking and interval polling
  useEffect(() => {
    if (typeof window === 'undefined' || isAdminPath) return;
    if (globalHasStartedTracker) return; // Only run one global interval

    globalHasStartedTracker = true;

    const interval = setInterval(() => {
      const token = getCookie('lead_token');

      if (token) {
        fetch(`${API_BASE_URL}/leads/track-returning`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token.startsWith('Bearer') ? token : `Bearer ${token}`
          },
          body: JSON.stringify({
            page: window.location.pathname, // Use window.location to ensure latest path in global interval
            timeSpent: 60
          })
        }).catch(err => console.warn('Tracking error (returning):', err.message));
      }
    }, 60000);

    return () => {
      // We don't clear the global tracker on unmount of one component
      // so it runs cleanly across the entire app lifecycle
    };
  }, [isAdminPath]);

  return { sessionId, fingerprint };
};

