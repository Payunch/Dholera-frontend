"use client";

/**
 * Universal Google Ads & Analytics Conversion Tracking Helper
 * Provides unified, safe dispatchers for ad networks (Google Ads, GTM, Meta Pixel).
 * Enriched with dynamic custom dimensions for real estate investment leads:
 * - investor_budget
 * - target_zone
 * - investor_type
 * - property_name
 */

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
const DEFAULT_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_LABEL || "";
const WHATSAPP_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL || DEFAULT_CONVERSION_LABEL;
const CALL_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL || DEFAULT_CONVERSION_LABEL;

/**
 * Helper to auto-infer zone from URL or context if not explicitly provided
 */
function inferZone(explicitZone = "") {
  if (explicitZone && explicitZone !== "General") return explicitZone;
  if (typeof window === "undefined") return "Dholera SIR General";
  const path = window.location.pathname.toLowerCase();
  if (path.includes("tp1")) return "TP1 Activation Area";
  if (path.includes("tp2")) return "TP2 Smart Residency";
  if (path.includes("tp3")) return "TP3 Expressway Corridor";
  if (path.includes("tp4")) return "TP4 Coastal/High-Density";
  if (path.includes("airport") || path.includes("navagam")) return "Airport City / Navagam";
  if (path.includes("commercial")) return "High Street Commercial";
  if (path.includes("industrial")) return "Heavy / High-Tech Industrial";
  return "Dholera SIR General";
}

/**
 * Helper to auto-infer property/content name
 */
function inferProperty(explicitProperty = "") {
  if (explicitProperty) return explicitProperty;
  if (typeof window === "undefined") return "Dholera Platform";
  return document.title ? document.title.split("|")[0].trim() : window.location.pathname;
}

/**
 * Dispatch a conversion event directly to Google Ads and dataLayer
 */
export function trackGoogleConversion({
  label = DEFAULT_CONVERSION_LABEL,
  value = 1.0,
  currency = "INR",
  transactionId = null,
} = {}) {
  if (typeof window === "undefined") return;

  // 1. Send via GTM / dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "google_ads_conversion",
      conversion_value: value,
      currency: currency,
      conversion_label: label,
      transaction_id: transactionId || `conv_${Date.now()}`,
    });
  }

  // 2. Send via gtag if configured
  if (typeof window.gtag === "function" && GOOGLE_ADS_ID && label) {
    const sendTo = `${GOOGLE_ADS_ID}/${label}`;
    const payload = {
      send_to: sendTo,
      value: value,
      currency: currency,
    };
    if (transactionId) {
      payload.transaction_id = transactionId;
    }
    window.gtag("event", "conversion", payload);
  }
}

/**
 * Track WhatsApp CTA Clicks as High-Intent Lead Conversions
 */
export function trackWhatsAppClick(source = "general", { target_zone = "", property_name = "" } = {}) {
  if (typeof window === "undefined") return;

  const resolvedZone = inferZone(target_zone);
  const resolvedProperty = inferProperty(property_name);

  // Push to dataLayer with enriched custom dimensions
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "whatsapp_click",
      lead_source: source,
      intent_type: "inquiry_chat",
      target_zone: resolvedZone,
      property_name: resolvedProperty,
      timestamp: new Date().toISOString(),
    });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "whatsapp_click", {
      lead_source: source,
      target_zone: resolvedZone,
      property_name: resolvedProperty,
      value: 50.0,
      currency: "INR",
    });
  }

  // Trigger Google Ads conversion
  if (WHATSAPP_CONVERSION_LABEL) {
    trackGoogleConversion({
      label: WHATSAPP_CONVERSION_LABEL,
      value: 50.0,
      currency: "INR",
    });
  }

  // Trigger Meta Pixel if present
  if (typeof window.fbq === "function") {
    window.fbq("track", "Contact", { 
      content_category: "whatsapp", 
      content_name: source,
      target_zone: resolvedZone 
    });
  }
}

/**
 * Track Phone Call Button Clicks as Direct Lead Conversions
 */
export function trackPhoneClick(source = "general", { target_zone = "", property_name = "" } = {}) {
  if (typeof window === "undefined") return;

  const resolvedZone = inferZone(target_zone);
  const resolvedProperty = inferProperty(property_name);

  // Push to dataLayer with enriched custom dimensions
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "phone_click",
      lead_source: source,
      intent_type: "direct_call",
      target_zone: resolvedZone,
      property_name: resolvedProperty,
      timestamp: new Date().toISOString(),
    });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "phone_click", {
      lead_source: source,
      target_zone: resolvedZone,
      property_name: resolvedProperty,
      value: 100.0,
      currency: "INR",
    });
  }

  // Trigger Google Ads conversion
  if (CALL_CONVERSION_LABEL) {
    trackGoogleConversion({
      label: CALL_CONVERSION_LABEL,
      value: 100.0,
      currency: "INR",
    });
  }

  // Trigger Meta Pixel if present
  if (typeof window.fbq === "function") {
    window.fbq("track", "Contact", { 
      content_category: "phone", 
      content_name: source,
      target_zone: resolvedZone 
    });
  }
}

/**
 * Track Completed Lead Submissions (Form / Squeeze Page / Popup)
 * Sends custom dimensions to GA4, GTM, and Google Ads Enhanced Conversions:
 * - investor_budget
 * - target_zone
 * - investor_type
 * - property_name
 */
export function trackFormSubmission({
  name,
  phone,
  email,
  source = "lead_form",
  budget = "",
  target_zone = "",
  investor_type = "",
  property_name = "",
  value = 200.0,
  currency = "INR",
} = {}) {
  if (typeof window === "undefined") return;

  const resolvedZone = inferZone(target_zone);
  const resolvedProperty = inferProperty(property_name);
  const resolvedBudget = budget || "Standard Investment Tier";
  const resolvedInvestorType = investor_type || "Direct Inquirer";

  // 1. Set Enhanced Conversion user data if gtag available
  if (typeof window.gtag === "function") {
    const userData = {};
    if (email) userData.email = email.trim().toLowerCase();
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, "");
      userData.phone_number = cleanPhone.startsWith("91") ? `+${cleanPhone}` : `+91${cleanPhone}`;
    }
    if (name) {
      userData.address = {
        first_name: name.trim().split(" ")[0] || name.trim(),
      };
    }
    if (Object.keys(userData).length > 0) {
      window.gtag("set", "user_data", userData);
    }

    // Fire GA4 imported conversion event specifically expected by Google Ads
    window.gtag("event", "conversion_event_submit_lead_form", {
      lead_source: source,
      investor_budget: resolvedBudget,
      target_zone: resolvedZone,
      investor_type: resolvedInvestorType,
      property_name: resolvedProperty,
      value: value,
      currency: currency,
    });

    // Standard GA4 generate_lead with custom dimensions
    window.gtag("event", "generate_lead", {
      lead_source: source,
      investor_budget: resolvedBudget,
      target_zone: resolvedZone,
      investor_type: resolvedInvestorType,
      property_name: resolvedProperty,
      value: value,
      currency: currency,
    });

    window.gtag("event", "conversion_event_contact", {
      lead_source: source,
      target_zone: resolvedZone,
    });
  }

  // 2. Push to dataLayer for GTM / GA4 custom variables
  if (window.dataLayer) {
    const payload = {
      event: "conversion_event_submit_lead_form",
      lead_source: source,
      investor_budget: resolvedBudget,
      lead_budget: resolvedBudget,
      target_zone: resolvedZone,
      investor_type: resolvedInvestorType,
      property_name: resolvedProperty,
      value: value,
      currency: currency,
      timestamp: new Date().toISOString(),
    };
    window.dataLayer.push(payload);

    window.dataLayer.push({
      ...payload,
      event: "generate_lead",
    });
  }

  // 3. Fire direct Google Ads conversion tag if label configured
  trackGoogleConversion({
    label: DEFAULT_CONVERSION_LABEL,
    value: value,
    currency: currency,
  });

  // 4. Fire Meta Pixel
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_category: "real_estate",
      content_name: source,
      investor_budget: resolvedBudget,
      target_zone: resolvedZone,
      value: value,
      currency: currency,
    });
  }
}
