"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api';
import { safeLocalStorage, safeSessionStorage } from '@/utils/storage';

const generateSessionId = () => {
  return '_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

const getBrowserFingerprint = () => {
  try {
    const { userAgent, language, hardwareConcurrency } = navigator;
    // deviceMemory is not on all browsers TS types
    const deviceMemory = (navigator as any).deviceMemory || 'unknown';
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

  const sessionRef = useRef<string | null>(null);
  const fingerprintRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    sessionRef.current = safeSessionStorage.getItem('visitorSessionId');
    fingerprintRef.current = safeLocalStorage.getItem('visitorFingerprint');

    if (isAdminPath) return;

    if (!sessionRef.current) {
      sessionRef.current = generateSessionId();
      safeSessionStorage.setItem('visitorSessionId', sessionRef.current);
    }

    if (!fingerprintRef.current) {
      fingerprintRef.current = getBrowserFingerprint();
      safeLocalStorage.setItem('visitorFingerprint', fingerprintRef.current);
    }

    const checkReturning = async () => {
      const existingToken = safeLocalStorage.getItem('lead_token');
      if (!existingToken && fingerprintRef.current) {
        try {
          const res = await fetch(`${API_BASE_URL}/leads/check-visitor/${fingerprintRef.current}`);
          const data = await res.json();
          if (data.verified && data.lead_token) {
            safeLocalStorage.setItem('lead_token', data.lead_token);
            safeLocalStorage.setItem('lead_email', data.lead.email);
            safeLocalStorage.setItem('lead_phone', data.lead.phone);
            safeLocalStorage.setItem('lead_name', data.lead.name);
          }
        } catch (err) {
          console.error('Check visitor error:', err);
        }
      }
    };

    checkReturning();

    const interval = setInterval(() => {
      const token = safeLocalStorage.getItem('lead_token');

      if (token) {
        fetch(`${API_BASE_URL}/leads/track-returning`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            page: pathname,
            timeSpent: 15
          })
        }).catch(err => console.error('Tracking error:', err));
      } else {
        fetch(`${API_BASE_URL}/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: sessionRef.current,
            browserFingerprint: fingerprintRef.current,
            page: pathname,
            timeSpent: 15,
            source: document.referrer || 'Direct',
            deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
          })
        }).catch(err => console.error('Tracking error:', err));
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [pathname, isAdminPath]);

  return { sessionId: sessionRef.current, fingerprint: fingerprintRef.current };
};
