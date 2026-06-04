"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api';
import { setCookie, getCookie } from '@/utils/cookies';

const generateSessionId = () => {
  return '_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

const getBrowserFingerprint = () => {
  try {
    const { userAgent, language, hardwareConcurrency } = navigator;
    // deviceMemory is not on all browsers TS types
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let nextSessionId = getCookie('visitorSessionId');
    let nextFingerprint = getCookie('visitorFingerprint');

    if (isAdminPath) return;

    if (!nextSessionId) {
      nextSessionId = generateSessionId();
      setCookie('visitorSessionId', nextSessionId, 1); // 1 day
    }

    if (!nextFingerprint) {
      nextFingerprint = getBrowserFingerprint();
      setCookie('visitorFingerprint', nextFingerprint, 365); // 1 year
    }

    const activeSessionId = nextSessionId;
    const activeFingerprint = nextFingerprint;

    if (activeSessionId !== sessionId) {
      window.setTimeout(() => setSessionId(nextSessionId), 0);
    }

    if (activeFingerprint !== fingerprint) {
      window.setTimeout(() => setFingerprint(nextFingerprint), 0);
    }

    const checkReturning = async () => {
      const existingToken = getCookie('lead_token');
      // Only check if no token exists, fingerprint is available AND is valid
      const isValidFingerprint = activeFingerprint && /^fp_[a-z0-9]+$/i.test(activeFingerprint);

      if (!existingToken && isValidFingerprint) {
        try {
          const res = await fetch(`${API_BASE_URL}/leads/check-visitor/${activeFingerprint}`);
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
          // Silent fail for network errors to prevent console spam in dev/offline
          console.debug('Visitor tracking: connection pending');
        }
      }
    };

    checkReturning();

    const interval = setInterval(() => {
      const token = getCookie('lead_token');

      if (token) {
        fetch(`${API_BASE_URL}/leads/track-returning`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
          },
          body: JSON.stringify({
            page: pathname,
            timeSpent: 15
          })
        }).catch(err => console.warn('Tracking error (returning):', err.message));
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [pathname, isAdminPath, sessionId, fingerprint]);

  return { sessionId, fingerprint };
};
