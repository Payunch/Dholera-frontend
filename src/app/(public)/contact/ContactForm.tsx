"use client";

import * as React from "react";
import Link from "next/link";
import { User, Phone, Mail, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { apiClient } from "@/lib/api";
import { useLead } from "@/providers/LeadProvider";
import { useLanguage } from "@/providers/LanguageProvider";

export function ContactForm() {
  const { verifiedLead } = useLead();
  const { t } = useLanguage();
  const [formData, setFormData] = React.useState({ name: "", phone: "", email: "" });

  // Pre-fill form if lead is already verified
  React.useEffect(() => {
    if (verifiedLead) {
      setFormData(prev => ({
        ...prev,
        name: verifiedLead.name || prev.name,
        phone: verifiedLead.phone || prev.phone,
        email: verifiedLead.email || prev.email
      }));
    }
  }, [verifiedLead]);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error" | "consent-error" | "validation-error">("idle");
  const [consentAccepted, setConsentAccepted] = React.useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: val });
    if (status === "validation-error" && val.length === 10) setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAccepted) {
      setStatus("consent-error");
      return;
    }

    if (formData.phone.length !== 10) {
      setStatus("validation-error");
      return;
    }

    setStatus("loading");
    try {
      await apiClient.post("/leads", { ...formData, source: "Dholera Platform Next" });
      setStatus("success");
      setFormData({ name: "", phone: "", email: "" });
      setConsentAccepted(false);
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 rounded-[2.5rem] bg-white dark:bg-slate-900 p-12 text-center shadow-2xl animate-in zoom-in-95 duration-500">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 shadow-[0_0_40px_rgba(22,163,74,0.2)] border border-green-200 dark:border-green-500/30">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">{t('request_received')}</h3>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400 italic">
            &quot;{t('call_back_msg')}&quot;
          </p>
        </div>
        <button 
          onClick={() => setStatus("idle")}
          className="rounded-full bg-slate-900 dark:bg-orange-600 px-10 py-4 font-black uppercase tracking-widest text-white transition-transform hover:scale-105"
        >
          {t('book_another')}
        </button>
      </div>
    );
  }

  return (
    <div className="relative rounded-[2.5rem] bg-white dark:bg-slate-900 p-8 shadow-2xl md:p-12 border border-slate-100 dark:border-slate-800 transition-colors">
      {status === "error" && (
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {t('err_generic')}
        </div>
      )}

      {status === "validation-error" && (
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {t('err_phone')}
        </div>
      )}

      {status === "consent-error" && (
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4 text-xs font-bold text-orange-600 uppercase tracking-wider">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {t('err_terms')}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t('full_name')}
              className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-4 pl-12 pr-4 text-sm font-black tracking-widest text-slate-900 dark:text-white outline-none transition-all focus:border-orange-600 focus:bg-white dark:focus:bg-slate-900"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="tel"
              placeholder={t('mobile_number')}
              pattern="[0-9]{10}"
              maxLength={10}
              className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-4 pl-12 pr-4 text-sm font-black tracking-widest text-slate-900 dark:text-white outline-none transition-all focus:border-orange-600 focus:bg-white dark:focus:bg-slate-900"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="relative flex h-6 items-center pt-1">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-2 border-slate-200 dark:border-slate-700 text-orange-600 focus:ring-orange-600 bg-white dark:bg-slate-900"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
            />
          </div>
          <p className="text-[10px] font-bold leading-relaxed text-slate-400 uppercase tracking-widest">
            {t('terms_agree')} {" "}
            <Link href="/terms-and-conditions" className="text-slate-900 dark:text-slate-200 underline decoration-orange-600 decoration-2 underline-offset-4 hover:text-orange-600 transition-colors">
              {t('terms_of_service')}
            </Link>{" "}
            {t('and')}{" "}
            <Link href="/privacy-policy" className="text-slate-900 dark:text-slate-200 underline decoration-orange-600 decoration-2 underline-offset-4 hover:text-orange-600 transition-colors">
              {t('privacy_policy')}
            </Link>
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
              {t('establish_conn')}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
