"use client";

/**
 * Dholera Web Analytics & Experimentation Engine
 * Implements core analytics from Internetwork Security & Web Analytics:
 * - Exp 1: Engagement Tracking (Scroll Depth, Active Dwell Time, Bounce detection)
 * - Exp 2: Page Load Speed Measurement via Navigation Timing API
 * - Exp 3: A/B Testing Framework (Persistent split allocation & conversion tracking)
 * - Exp 4: Smart Cookie & Preference Memory
 * - Exp 5: Return Visitor Detection & Engagement
 * - Exp 6: Search Intent & Keyword Tracking
 * - Exp 7: Referral Source & Backlink Attribution (UTM & Referrer)
 */

const ATTRIBUTION_COOKIE = "dholera_attribution";
const PREFERENCES_COOKIE = "dholera_user_prefs";
const AB_TEST_PREFIX = "dholera_ab_";

/**
 * Cookie Helper functions (Exp 4)
 */
export function setCookie(name, value, days = 30) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(typeof value === "object" ? JSON.stringify(value) : value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  if (!match) return null;
  try {
    const val = decodeURIComponent(match[3]);
    return val.startsWith("{") || val.startsWith("[") ? JSON.parse(val) : val;
  } catch (_) {
    return decodeURIComponent(match[3]);
  }
}

/**
 * Experiment 2: Page Load Time Measurement (Navigation Timing API)
 */
export function measurePageSpeed() {
  if (typeof window === "undefined" || !window.performance) return null;

  try {
    let metrics = {};

    // Modern PerformanceNavigationTiming
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries && navEntries.length > 0) {
      const nav = navEntries[0];
      metrics = {
        loadTimeMs: Math.round(nav.loadEventEnd > 0 ? nav.loadEventEnd - nav.startTime : 0),
        domReadyMs: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
        ttfbMs: Math.round(nav.responseStart - nav.requestStart),
        dnsMs: Math.round(nav.domainLookupEnd - nav.domainLookupStart),
        transferSizeKb: nav.transferSize ? Math.round(nav.transferSize / 1024) : 0,
      };
    } else if (window.performance.timing) {
      // Legacy window.performance.timing fallback
      const t = window.performance.timing;
      metrics = {
        loadTimeMs: Math.max(0, t.loadEventEnd - t.navigationStart),
        domReadyMs: Math.max(0, t.domContentLoadedEventEnd - t.navigationStart),
        ttfbMs: Math.max(0, t.responseStart - t.requestStart),
        dnsMs: Math.max(0, t.domainLookupEnd - t.domainLookupStart),
      };
    }

    if (metrics.loadTimeMs > 0) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[WebAnalytics Exp 2] Page Speed Measured:", metrics);
      }

      // Push to dataLayer for GA4
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "page_performance",
          page_load_time_ms: metrics.loadTimeMs,
          dom_ready_time_ms: metrics.domReadyMs,
          ttfb_ms: metrics.ttfbMs,
        });
      }
    }

    return metrics;
  } catch (err) {
    console.warn("[WebAnalytics] Performance timing error:", err);
    return null;
  }
}

/**
 * Experiment 7: Referral & Backlink Source Attribution
 * Captures UTM parameters, organic search referrer, or backlink blogs
 */
export function captureTrafficAttribution() {
  if (typeof window === "undefined") return {};

  const existing = getCookie(ATTRIBUTION_COOKIE);
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");
  const utmCampaign = urlParams.get("utm_campaign");
  const utmContent = urlParams.get("utm_content");
  const referrer = document.referrer || "";

  // Only update if there is fresh campaign info or no prior attribution stored
  if (!existing || utmSource || referrer) {
    let source = utmSource || "direct";
    let medium = utmMedium || "none";

    if (!utmSource && referrer) {
      try {
        const refUrl = new URL(referrer);
        if (refUrl.hostname.includes("google")) {
          source = "google";
          medium = "organic";
        } else if (refUrl.hostname.includes("bing")) {
          source = "bing";
          medium = "organic";
        } else if (refUrl.hostname.includes("facebook") || refUrl.hostname.includes("instagram")) {
          source = "meta_social";
          medium = "referral";
        } else if (!refUrl.hostname.includes(window.location.hostname)) {
          source = refUrl.hostname;
          medium = "referral_backlink";
        }
      } catch (_) {}
    }

    const attribution = {
      source,
      medium,
      campaign: utmCampaign || existing?.campaign || "",
      content: utmContent || existing?.content || "",
      referrer: referrer || existing?.referrer || "",
      landingPage: existing?.landingPage || window.location.pathname,
      firstTouchTimestamp: existing?.firstTouchTimestamp || new Date().toISOString(),
      lastTouchTimestamp: new Date().toISOString(),
    };

    setCookie(ATTRIBUTION_COOKIE, attribution, 30);
    return attribution;
  }

  return existing || {};
}

/**
 * Experiment 4: User Preference Memory
 */
export function saveUserPreferences(prefs = {}) {
  if (typeof window === "undefined") return;
  const current = getUserPreferences();
  const updated = { ...current, ...prefs, lastActiveAt: new Date().toISOString() };
  setCookie(PREFERENCES_COOKIE, updated, 90);
  try {
    localStorage.setItem(PREFERENCES_COOKIE, JSON.stringify(updated));
  } catch (_) {}
  return updated;
}

export function getUserPreferences() {
  if (typeof window === "undefined") return {};
  const fromCookie = getCookie(PREFERENCES_COOKIE);
  if (fromCookie && typeof fromCookie === "object") return fromCookie;
  try {
    const raw = localStorage.getItem(PREFERENCES_COOKIE);
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

/**
 * Experiment 5: Returning Visitor Tracker
 */
export function recordVisitorSession() {
  if (typeof window === "undefined") return { isReturning: false, visitCount: 1 };
  const prefs = getUserPreferences();
  const visitCount = (prefs.visitCount || 0) + 1;
  const isReturning = visitCount > 1;

  saveUserPreferences({ visitCount, lastVisitAt: new Date().toISOString() });
  return { isReturning, visitCount };
}

/**
 * Experiment 3: Persistent Client-Side A/B Testing Framework
 */
export function getABTestVariant(experimentName, variants = ["A", "B"]) {
  if (typeof window === "undefined") return variants[0];
  const cookieKey = `${AB_TEST_PREFIX}${experimentName}`;
  const existing = getCookie(cookieKey);

  if (existing && variants.includes(existing)) {
    return existing;
  }

  // 50/50 randomized split allocation
  const chosenIndex = Math.floor(Math.random() * variants.length);
  const selected = variants[chosenIndex];
  setCookie(cookieKey, selected, 30);

  if (window.dataLayer) {
    window.dataLayer.push({
      event: "ab_experiment_assigned",
      experiment_name: experimentName,
      experiment_variant: selected,
    });
  }

  return selected;
}

export function trackABConversion(experimentName, goalName = "lead_conversion") {
  if (typeof window === "undefined") return;
  const cookieKey = `${AB_TEST_PREFIX}${experimentName}`;
  const variant = getCookie(cookieKey) || "A";

  if (window.dataLayer) {
    window.dataLayer.push({
      event: "ab_experiment_conversion",
      experiment_name: experimentName,
      experiment_variant: variant,
      goal_name: goalName,
    });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "ab_conversion", {
      experiment: experimentName,
      variant: variant,
      goal: goalName,
    });
  }
}

/**
 * Experiment 6: Search Intent & Keyword Tracking
 */
export function trackSearchIntent(query, filters = {}) {
  if (!query || typeof window === "undefined") return;
  const cleaned = query.trim().toLowerCase();

  if (window.dataLayer) {
    window.dataLayer.push({
      event: "site_search_intent",
      search_term: cleaned,
      search_category: filters.category || filters.zone || "general",
    });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "search", {
      search_term: cleaned,
    });
  }
}
