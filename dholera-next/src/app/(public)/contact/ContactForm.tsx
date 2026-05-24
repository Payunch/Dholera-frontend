"use client";

import * as React from "react";
import Link from "next/link";
import { User, Phone, Mail, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { apiClient } from "@/lib/api";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [formData, setFormData] = React.useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error" | "consent-error">("idle");
  const [consentAccepted, setConsentAccepted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAccepted) {
      setStatus("consent-error");
      return;
    }

    setStatus("loading");
    try {
      await apiClient.post("/leads", { ...formData, source: "Dholera Platform Next" });
      setStatus("success");
      setFormData({ name: "", phone: "", email: "" });
      setConsentAccepted(false);
    } catch (err) {
      setStatus("error");
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hello! I am interested in Dholera Smart City investment via Dholera Platform.");
    window.open(`https://wa.me/911234567890?text=${text}`, "_blank");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 rounded-[2.5rem] bg-white p-12 text-center shadow-2xl animate-in zoom-in-95 duration-500">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-[0_0_40px_rgba(22,163,74,0.2)]">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900">Transmission Complete</h3>
          <p className="text-lg font-medium text-slate-500 italic">
            &quot;Your inquiry has been successfully injected into our master control. A regional intelligence officer will connect with you within 24 hours.&quot;
          </p>
        </div>
        <button 
          onClick={() => setStatus("idle")}
          className="rounded-full bg-slate-900 px-10 py-4 font-black uppercase tracking-widest text-white transition-transform hover:scale-105"
        >
          New Transmission
        </button>
      </div>
    );
  }

  return (
    <div className="relative rounded-[2.5rem] bg-white p-8 shadow-2xl md:p-12">
      {status === "error" && (
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-bold text-red-600 uppercase tracking-wider">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Neural Link Error. Please verify your connection and try again.
        </div>
      )}

      {status === "consent-error" && (
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4 text-xs font-bold text-orange-600 uppercase tracking-wider">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Compliance Required. Please acknowledge the legal frameworks.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="FULL NAME"
              className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm font-black tracking-widest text-slate-900 outline-none transition-all focus:border-orange-600 focus:bg-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="PHONE NUMBER"
              className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm font-black tracking-widest text-slate-900 outline-none transition-all focus:border-orange-600 focus:bg-white"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            placeholder="EMAIL ADDRESS (OPTIONAL)"
            className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm font-black tracking-widest text-slate-900 outline-none transition-all focus:border-orange-600 focus:bg-white"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="flex items-start gap-4">
          <div className="relative flex h-6 items-center pt-1">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-2 border-slate-200 text-orange-600 focus:ring-orange-600"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
            />
          </div>
          <p className="text-xs font-bold leading-relaxed text-slate-400 uppercase tracking-widest">
            I acknowledge the{" "}
            <Link href="/terms-and-conditions" className="text-slate-900 underline decoration-orange-600 decoration-2 underline-offset-4 hover:text-orange-600 transition-colors">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-slate-900 underline decoration-orange-600 decoration-2 underline-offset-4 hover:text-orange-600 transition-colors">
              Data Sovereignty Policy
            </Link>{" "}
            of Dholera Platform.
          </p>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 py-5 text-sm font-black uppercase tracking-[0.3em] text-white shadow-xl transition-all hover:bg-orange-500 active:scale-95 disabled:opacity-50"
        >
          {status === "loading" ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Initialize Connection
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

        <div className="pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-green-600 shadow-lg active:scale-95"
          >
            <MessageSquare className="h-5 w-5" />
            Secure WhatsApp Portal
          </button>
        </div>
      </form>
    </div>
  );
}
