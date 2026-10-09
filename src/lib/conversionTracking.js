"use client";

/**
 * Universal Google Ads & Analytics Conversion Tracking Helper
 * Provides unified, safe dispatchers for ad networks (Google Ads, GTM, Meta Pixel).
 */

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
const DEFAULT_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_LABEL || "";
const WHATSAPP_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL || DEFAULT_CONVERSION_LABEL;
const CALL_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL || DEFAULT_CONVERSION_LABEL;

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
export function trackWhatsAppClick(source = "general") {
  if (typeof window === "undefined") return;

  // Push to dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "whatsapp_click",
      lead_source: source,
      intent_type: "inquiry_chat",
      timestamp: new Date().toISOString(),
    });
  }

  // Trigger Google Ads conversion
  if (WHATSAPP_CONVERSION_LABEL) {
    trackGoogleConversion({
      label: WHATSAPP_CONVERSION_LABEL,
      value: 50.0, // Indicative value for chat lead
      currency: "INR",
    });
  }

  // Trigger Meta Pixel if present
  if (typeof window.fbq === "function") {
    window.fbq("track", "Contact", { content_category: "whatsapp", content_name: source });
  }
}

/**
 * Track Phone Call Button Clicks as Direct Lead Conversions
 */
export function trackPhoneClick(source = "general") {
  if (typeof window === "undefined") return;

  // Push to dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "phone_click",
      lead_source: source,
      intent_type: "direct_call",
      timestamp: new Date().toISOString(),
    });
  }

  // Trigger Google Ads conversion
  if (CALL_CONVERSION_LABEL) {
    trackGoogleConversion({
      label: CALL_CONVERSION_LABEL,
      value: 100.0, // High-value direct phone inquiry
      currency: "INR",
    });
  }

  // Trigger Meta Pixel if present
  if (typeof window.fbq === "function") {
    window.fbq("track", "Contact", { content_category: "phone", content_name: source });
  }
}

/**
 * Track Completed Lead Submissions (Form / Squeeze Page)
 */
export function trackFormSubmission({ name, phone, email, source = "lead_form", budget = "" } = {}) {
  if (typeof window === "undefined") return;

  // Set Enhanced Conversion user data if gtag available
  if (typeof window.gtag === "function") {
    const userData = {};
    if (email) userData.email = email.trim().toLowerCase();
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, "");
      userData.phone_number = cleanPhone.startsWith("91") ? `+${cleanPhone}` : `+91${cleanPhone}`;
    }
    if (Object.keys(userData).length > 0) {
      window.gtag("set", "user_data", userData);
    }
  }

  // Push to dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "generate_lead",
      lead_source: source,
      lead_budget: budget,
      value: 200.0,
      currency: "INR",
    });
  }

  // Fire Google Ads conversion
  trackGoogleConversion({
    label: DEFAULT_CONVERSION_LABEL,
    value: 200.0,
    currency: "INR",
  });

  // Fire Meta Pixel
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_category: "real_estate",
      content_name: source,
      value: 200.0,
      currency: "INR",
    });
  }
}
