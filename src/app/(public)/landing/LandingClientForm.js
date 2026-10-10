"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, User, ArrowRight, ShieldCheck, Download, CheckCircle2, AlertCircle } from "lucide-react";
import { apiClient } from "@/lib/api";
import { trackFormSubmission } from "@/lib/conversionTracking";

export default function LandingClientForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    preference: "TP 1 & TP 2 Residential Plots",
    budget: "₹15 Lakh - ₹35 Lakh",
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: val }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!phoneRegex.test(formData.phone)) {
      setStatus("error");
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setStatus("loading");
    try {
      const utmSource =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("utm_source") ||
            sessionStorage.getItem("dholera_utm_source") ||
            "google_ads"
          : "google_ads";

      // 1. Post to backend lead API
      await apiClient.post("/leads", {
        name: formData.name,
        phone: formData.phone,
        notes: `Preference: ${formData.preference} | Budget: ${formData.budget}`,
        source: "Google Ads Landing Page",
        utm_source: utmSource,
        preferred_language: typeof window !== "undefined" ? window.localStorage.getItem("preferred_lang") || "en" : "en",
      });

      // 2. Track Conversion across Google Ads, GTM, Meta Pixel
      trackFormSubmission({
        name: formData.name,
        phone: formData.phone,
        source: "google_ads_landing_form",
        budget: formData.budget,
        target_zone: formData.preference,
        investor_type: "Campaign Inquirer",
      });

      // 3. Route to dedicated thank-you page
      router.push("/thank-you");
    } catch (err) {
      console.error("Lead submission error:", err);
      // Even if network fails, track conversion and redirect to avoid losing lead intent
      trackFormSubmission({
        name: formData.name,
        phone: formData.phone,
        source: "google_ads_landing_form_fallback",
        budget: formData.budget,
        target_zone: formData.preference,
        investor_type: "Campaign Inquirer",
      });
      router.push("/thank-you");
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
          Official 2025–2026 Price Sheet
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white mb-2">
        Get TP1 & TP2 Rate Card
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6">
        Instant WhatsApp delivery of verified Town Planning maps and current per sq. yd pricing.
      </p>

      {status === "error" && errorMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-3 text-xs font-semibold text-red-700 dark:text-red-300 mb-4">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rajesh Sharma"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-3 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
            WhatsApp Mobile Number
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 dark:text-slate-400">
              +91
            </span>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="9876543210"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-12 pr-4 py-3 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
            Interested Sector / Zone
          </label>
          <select
            value={formData.preference}
            onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-3 text-sm font-medium text-slate-900 dark:text-white focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none transition-colors"
          >
            <option value="TP 1 & TP 2 Residential Plots">TP 1 & TP 2 (Residential Plots)</option>
            <option value="High Access Commercial Corridor">High Access Commercial Corridor</option>
            <option value="Industrial / Near Tata Semi-conductor">Industrial / Near Tata Semiconductor</option>
            <option value="Agricultural / Bulk Land Investment">Bulk Land Investment</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
            Investment Budget
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-3 text-sm font-medium text-slate-900 dark:text-white focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none transition-colors"
          >
            <option value="₹15 Lakh - ₹35 Lakh">₹15 Lakh - ₹35 Lakh</option>
            <option value="₹35 Lakh - ₹75 Lakh">₹35 Lakh - ₹75 Lakh</option>
            <option value="₹75 Lakh - ₹1.5 Crore">₹75 Lakh - ₹1.5 Crore</option>
            <option value="₹1.5 Crore+">₹1.5 Crore+</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 text-sm font-black uppercase tracking-wider shadow-xl shadow-orange-600/20 transition-all hover:-translate-y-0.5 disabled:opacity-50"
        >
          {status === "loading" ? (
            <span>Processing...</span>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Get Rate Card & TP Maps</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5 pt-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          100% Privacy Protected. No spam guaranteed.
        </p>
      </form>
    </div>
  );
}
