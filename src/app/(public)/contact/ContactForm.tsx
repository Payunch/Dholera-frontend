"use client";

import * as React from"react";
import Link from"next/link";
import { User, Phone, CheckCircle2, AlertCircle, ChevronRight } from"lucide-react";
import { apiClient } from"@/lib/api";
import { useLead } from"@/providers/LeadProvider";
import { useLanguage } from"@/providers/LanguageProvider";

export function ContactForm() {
 const { verifiedLead } = useLead();
 const { t } = useLanguage();
 const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
 const today = new Date().toISOString().split('T')[0];
 const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

 const [formData, setFormData] = React.useState({ 
 name:"", 
 phone:"", 
 date: tomorrow 
 });

 // Pre-fill form if lead is already verified
 React.useEffect(() => {
 if (verifiedLead) {
 setFormData(prev => ({
 ...prev,
 name: verifiedLead.name || prev.name,
 phone: verifiedLead.phone || prev.phone
 }));
 }
 }, [verifiedLead]);

 const [status, setStatus] = React.useState<"idle" |"loading" |"success" |"error">("idle");

 const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const val = e.target.value.replace(/\D/g,'').slice(0, 10);
 setFormData({ ...formData, phone: val });
 if (status ==="error") setStatus("idle");
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 const phoneRegex = /^[6-9]\d{9}$/;
 if (!formData.name || !phoneRegex.test(formData.phone)) return;
 
 // Date validation
 const selectedDate = new Date(formData.date);
 if (selectedDate > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) {
 setStatus("error");
 return;
 }

 setStatus("loading");
 try {
 await apiClient.post("/leads", { 
 ...formData, 
 source:"Contact Page - Standardized Form",
 notes:`Requested meeting for: ${formData.date}`,
 preferred_language: window.localStorage.getItem('preferred_lang') ||'en'
 });
 setStatus("success");
 setFormData({ name:"", phone:"", date: tomorrow });
 } catch (err) {
 console.error("Submission error:", err);
 setStatus("error");
 }
 };

 if (status ==="success") {
 return (
 <div className="text-center py-12 space-y-6 bg-white dark:bg-slate-900 rounded-[1.5rem] p-8 md:p-10 border border-slate-800 shadow-xl animate-in zoom-in-95 duration-300">
 <div className="h-20 w-20 bg-green-500/20 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#10B981]/30">
 <CheckCircle2 className="h-10 w-10" />
 </div>
 <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase">{t('request_received')}</h3>
 <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase leading-relaxed max-w-[240px] mx-auto">
 {t('call_back_msg')}
 </p>
 <button 
 onClick={() => setStatus('idle')}
 className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] hover:text-orange-400 pt-4"
 >
 {t('book_another')}
 </button>
 </div>
 );
 }

 return (
 <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-8 md:p-10 border border-slate-800 shadow-xl relative overflow-hidden transition-colors">
 {status ==='error' && (
 <div className="mb-8 flex flex-col gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-[10px] font-bold text-red-400 uppercase tracking-widest leading-relaxed">
 <div className="flex items-center gap-3">
 <AlertCircle className="h-4 w-4 shrink-0" />
 <span>{t('transmission_failed')}</span>
 </div>
 <p className="text-[9px] text-red-500/80 pl-8">
 {new Date(formData.date) > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
 ? t('date_limit_msg') 
 : t('err_generic')}
 </p>
 </div>
 )}

 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-6 text-center">{t('priority_conn')}</h3>
 <form className="space-y-4" onSubmit={handleSubmit}>
 <div className="space-y-2">
 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 ml-1">{t('full_name')}</label>
 <div className="relative">
 <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-300" />
 <input 
 type="text" 
 placeholder={t('full_name')} 
 required 
 value={formData.name}
 onChange={(e) => setFormData({...formData, name: e.target.value})}
 className="w-full pl-12 pr-5 py-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-widest placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-all"
 />
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 ml-1">{t('mobile_number')}</label>
 <div className="relative">
 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-300" />
 <input 
 type="tel" 
 placeholder="10-DIGIT MOBILE" 
 required 
 pattern="[0-9]{10}"
 maxLength={10}
 value={formData.phone}
 onChange={handlePhoneChange}
 className={`w-full pl-12 pr-5 py-4 rounded-xl bg-white dark:bg-slate-950 border ${formData.phone.length > 0 && formData.phone.length < 10 ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} text-xs font-bold uppercase tracking-widest placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-all`}
 />
 </div>
 {formData.phone.length > 0 && formData.phone.length < 10 && (
 <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1 animate-pulse">
 {t('phone_too_short') || "MUST BE 10 DIGITS"}
 </p>
 )}
 </div>
 <div className="space-y-2">
 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 ml-1 flex justify-between">
 <span>{t('deployment_date')}</span>
 <span className="text-orange-500/50">{t('date_limit_msg')}</span>
 </label>
 <input 
 type="date" 
 required 
 value={formData.date}
 min={today}
 max={nextWeek}
 onChange={(e) => setFormData({...formData, date: e.target.value})}
 className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-widest placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-all"
 />
 </div>
 <button 
 type="submit"
 disabled={status ==='loading' || !(/^[6-9]\d{9}$/.test(formData.phone))}
 className="w-full h-14 mt-4 rounded-xl bg-[#FF7A00] text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-600 disabled:bg-slate-700 disabled:text-slate-400 transition-all shadow-xl shadow-orange-600/10 flex items-center justify-center active:scale-95 group"
 >
 {status ==='loading' ? (
 <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 ) : (
 <>
 {t('establish_conn')}
 <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
 </>
 )}
 </button>
 </form>
 </div>
 );
}
