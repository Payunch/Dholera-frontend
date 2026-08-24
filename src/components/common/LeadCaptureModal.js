"use client";

import React, { useState, useEffect } from'react';
import { X, ShieldCheck, ArrowRight, User, Phone, CheckCircle2, AlertCircle, Loader2 } from'lucide-react';
import { cn } from'@/lib/utils';
import { useLead } from'@/providers/LeadProvider';
import { useLanguage } from'@/providers/LanguageProvider';
import { apiClient } from'@/lib/api';

export default function LeadCaptureModal() {
 const { verifiedLead, loginLead, loading: leadLoading } = useLead();
 const { t } = useLanguage();
 const [isOpen, setIsOpen] = useState(false);
 const [form, setForm] = useState({ name:'', phone:'' });
 const [status, setStatus] = useState('idle');
 const [hasDismissed, setHasDismissed] = useState(false);

 useEffect(() => {
 // Disabled automatic popup to reduce friction for SEO and ads
 /*
 if (!verifiedLead && !leadLoading && !hasDismissed) {
 const timer = setTimeout(() => {
 setIsOpen(true);
 }, 10000); // Trigger after 10 seconds

 return () => clearTimeout(timer);
 }
 */

 // Allow opening modal via explicit CTA triggers
 const handleOpenModal = () => setIsOpen(true);
 window.addEventListener('openLeadModal', handleOpenModal);
 
 return () => {
 window.removeEventListener('openLeadModal', handleOpenModal);
 };
 }, [verifiedLead, leadLoading, hasDismissed]);

 const handlePhoneChange = (e) => {
 const val = e.target.value.replace(/\D/g,'').slice(0, 10);
 setForm({ ...form, phone: val });
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 if (!form.name || form.phone.length !== 10) return;

 setStatus('loading');
 try {
 const response = await apiClient.post('/leads/onboard', {
 name: form.name,
 phone: form.phone,
 source:'Proactive Lead Capture'
 });

 if (response.data.success) {
 loginLead({
 name: response.data.name,
 phone: response.data.phone,
 token: response.data.lead_token
 });
 setStatus('success');
 setTimeout(() => setIsOpen(false), 2000);
 } else {
 setStatus('error');
 }
 } catch (err) {
 console.error('Lead capture error:', err);
 setStatus('error');
 }
 };

 const handleClose = () => {
 setIsOpen(false);
 setHasDismissed(true);
 // Optional: store dismissal in sessionStorage to avoid showing again in the same tab
 sessionStorage.setItem('lead_modal_dismissed','true');
 };

 // Re-check dismissal on mount
 useEffect(() => {
 if (sessionStorage.getItem('lead_modal_dismissed')) {
 setHasDismissed(true);
 }
 }, []);

 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-500">
 <div className="bg-white dark:bg-[#0B132B] w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-slate-800 animate-in zoom-in-95 duration-500 dark:bg-slate-900">
 
 {/* Close Button */}
 <button 
 onClick={handleClose}
 className="absolute top-6 right-6 p-2 rounded-xl bg-white dark:bg-slate-900 text-slate-400 hover:text-white transition-all z-20"
 >
 <X className="h-5 w-5" />
 </button>

 <div className="p-8 md:p-12 space-y-8 relative overflow-hidden">
 {/* Subtle Background Accent */}
 <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
 
 <div className="relative z-10 text-center space-y-4">
 <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#FF7A00]">
 <ShieldCheck className="h-4 w-4" /> {t('exclusive_access') ||'Exclusive Data Matrix Access'}
 </div>
 <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
 Unlock <span className="text-[#FF7A00] italic">Verified Intelligence</span>
 </h2>
 <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
 Enter your details to instantly view town planning maps and DSIRDA infrastructure reports.
 </p>
 </div>

 {status ==='success' ? (
 <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
 <div className="h-20 w-20 bg-green-500/20 text-[#10B981] rounded-full flex items-center justify-center mx-auto border border-[#10B981]/30">
 <CheckCircle2 className="h-10 w-10" />
 </div>
 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase">Identity Verified</h3>
 <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
 Redirecting to Data Matrix...
 </p>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
 <div className="space-y-2">
 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
 <div className="relative">
 <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
 <input 
 type="text" 
 placeholder="ENTER YOUR NAME"
 required
 value={form.name}
 onChange={(e) => setForm({ ...form, name: e.target.value })}
 className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-all"
 />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">WhatsApp Number</label>
 <div className="relative">
 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
 <input
 type="tel"
 placeholder="10-DIGIT MOBILE"
 required
 pattern="[0-9]{10}"
 maxLength={10}
 value={form.phone}
 onChange={handlePhoneChange}
 className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-white dark:bg-slate-950 border ${form.phone.length > 0 && form.phone.length < 10 ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-all`}
 />
 </div>
 {form.phone.length > 0 && form.phone.length < 10 && (
   <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1 animate-pulse">
     {t('phone_too_short') || "MUST BE 10 DIGITS"}
   </p>
 )}
 </div>

 {status ==='error' && (
 <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-500/5 p-3 rounded-xl border border-red-500/20">
 <AlertCircle className="h-4 w-4" />
 Failed to establish connection. Try again.
 </div>
 )}

 <button 
 type="submit"
 disabled={status ==='loading' || form.phone.length !== 10 || !form.name}
 className="w-full h-16 mt-4 rounded-2xl bg-[#FF7A00] text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-600 disabled:bg-slate-800 disabled:text-slate-600 dark:text-slate-400 transition-all shadow-xl shadow-orange-600/10 flex items-center justify-center gap-3 active:scale-95"

 >
 {status ==='loading' ? (
 <Loader2 className="h-5 w-5 animate-spin" />
 ) : (
 <>
 Initialize Connection <ArrowRight className="h-4 w-4" />
 </>
 )}
 </button>

 <p className="text-[8px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest text-center mt-6 px-4">
 By connecting, you agree to receive verified Dholera SIR project reports via WhatsApp for official investment intelligence.
 </p>
 </form>
 )}
 </div>
 </div>
 </div>
 );
}
