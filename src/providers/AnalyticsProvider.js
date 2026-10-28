"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  measurePageSpeed,
  captureTrafficAttribution,
  recordVisitorSession,
  getUserPreferences,
  saveUserPreferences,
  getABTestVariant,
  trackABConversion,
  trackSearchIntent
} from "@/lib/webAnalytics";

const AnalyticsContext = createContext(null);

export function AnalyticsProvider({ children }) {
  const pathname = usePathname();
  const [visitorSession, setVisitorSession] = useState({ isReturning: false, visitCount: 1 });
  const [preferences, setPreferences] = useState({});
  const activeTimeRef = useRef(0);
  const scrollMilestonesRef = useRef(new Set());

  useEffect(() => {
    // 1. Capture traffic attribution & referrer (Exp 7)
    captureTrafficAttribution();

    // 2. Track returning visitor vs new visitor (Exp 5)
    const session = recordVisitorSession();
    setVisitorSession(session);
    setPreferences(getUserPreferences());

    // 3. Measure Page Load Speed (Exp 2)
    if (document.readyState === "complete") {
      measurePageSpeed();
    } else {
      const handleLoad = () => {
        setTimeout(measurePageSpeed, 200);
      };
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Track active dwell time & scroll depth per page view (Exp 1)
  useEffect(() => {
    scrollMilestonesRef.current.clear();
    activeTimeRef.current = 0;

    // Active time counter (pauses when user switches tab)
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") {
        activeTimeRef.current += 1;
      }
    }, 1000);

    // Scroll depth milestone tracker (25%, 50%, 75%, 100%)
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const currentScroll = window.scrollY;
      const scrollPercent = Math.min(100, Math.round((currentScroll / scrollHeight) * 100));

      const milestones = [25, 50, 75, 100];
      for (const m of milestones) {
        if (scrollPercent >= m && !scrollMilestonesRef.current.has(m)) {
          scrollMilestonesRef.current.add(m);
          if (window.dataLayer) {
            window.dataLayer.push({
              event: "scroll_depth_milestone",
              depth: m,
              page: pathname,
            });
          }
          if (typeof window.gtag === "function") {
            window.gtag("event", "scroll", {
              percent_scrolled: m,
              page_path: pathname,
            });
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);

      // On leaving page, record engagement duration if > 5s
      const dwellSeconds = activeTimeRef.current;
      if (dwellSeconds >= 5 && window.dataLayer) {
        window.dataLayer.push({
          event: "page_dwell_time",
          seconds: dwellSeconds,
          page: pathname,
        });
      }
    };
  }, [pathname]);

  const updatePreferences = (newPrefs) => {
    const updated = saveUserPreferences(newPrefs);
    setPreferences(updated);
    return updated;
  };

  const value = {
    visitorSession,
    preferences,
    updatePreferences,
    getABTestVariant,
    trackABConversion,
    trackSearchIntent
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    return {
      visitorSession: { isReturning: false, visitCount: 1 },
      preferences: {},
      updatePreferences: () => {},
      getABTestVariant: (name, variants) => variants?.[0] || "A",
      trackABConversion: () => {},
      trackSearchIntent: () => {},
    };
  }
  return context;
}
