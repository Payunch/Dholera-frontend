"use client";

import React, { useEffect, useState, useRef } from 'react';
import { X, Loader2, CheckCircle2, Phone, User, ArrowRight } from 'lucide-react';
import { useLead } from '@/providers/LeadProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { apiClient } from '@/lib/api';
import { SplitLogo } from '@/components/common/DynamicImages';
import Link from 'next/link';

const sanitizeDigits = (value: string, maxLength: number) => value.replace(/\D/g, '').slice(0, maxLength);
const validateName = (name: string) => name.trim().length >= 2;
const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

interface LeadPopupProps {
  sessionId?: string;
  fingerprint?: string;
  compulsory?: boolean;
  onSuccess?: (data: any) => void;
  onClose?: () => void;
}

export const LeadPopup = ({ 
  sessionId, 
  fingerprint, 
  compulsory = false, 
  onSuccess,
  onClose
}: LeadPopupProps) => {
  const { loginLead, verifiedLead } = useLead();
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'details' | 'success'>('details');

  // Auto-close on verifiedLead availability
  useEffect(() => {
    if (verifiedLead && step !== 'success') {
       setStep('success');
       setTimeout(() => {
         setOpen(false);
         if (onClose) onClose();
       }, 1000);
    }
  }, [verifiedLead, step, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = sanitizeDigits(phone, 10);
    
    if (!validateName(name)) return setError(t('err_name'));
    if (!validatePhone(cleanPhone)) return setError(t('err_phone'));
    if (!agreedToTerms) return setError(t('err_terms'));

    setLoading(true);
    setError('');

    try {
      // Use the frictionless onboard route
      const res = await apiClient.post('/leads/onboard', {
        name: name.trim(),
        phone: cleanPhone,
        sessionId,
        browserFingerprint: fingerprint,
        preferred_language: lang
      });

      if (res.data.lead_token) {
        loginLead({ ...res.data, token: res.data.lead_token });
      }
      
      setStep('success');
      if (onSuccess) onSuccess(res.data);
      
      setTimeout(() => {
        setOpen(false);
        if (onClose) onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || t('err_generic'));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4 animate-in fade-in duration-500">
      <div className="relative w-full max-w-[400px] overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        {!compulsory && (
          <button 
            onClick={() => {
              setOpen(false);
              if (onClose) onClose();
            }} 
            className="absolute right-6 top-6 text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all z-20"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        
        <div className="p-8 md:p-10">
          <div className="flex justify-center mb-10"><SplitLogo height={42} /></div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">
              {step === 'success' ? t('access_granted') : t('start_here')}
            </h2>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
              {t('verify_desc')}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 mb-6 text-center animate-in slide-in-from-top-2">
               <span className="text-[10px] font-bold uppercase tracking-tight">{error}</span>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text" 
                  placeholder={t('full_name')} 
                  required
                  autoFocus
                  className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-5 pl-12 pr-4 font-black uppercase tracking-widest text-[10px] outline-none focus:border-orange-600 focus:bg-white dark:focus:bg-white dark:bg-slate-900 transition-all text-white placeholder:text-slate-400"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="tel" 
                  placeholder={t('mobile_number')} 
                  required
                  className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-5 pl-12 pr-4 font-black uppercase tracking-widest text-[10px] outline-none focus:border-orange-600 focus:bg-white dark:focus:bg-white dark:bg-slate-900 transition-all text-white placeholder:text-slate-400"
                  value={phone} 
                  onChange={(e) => setPhone(sanitizeDigits(e.target.value, 10))}
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-600 cursor-pointer"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <label htmlFor="terms" className="text-[10px] font-bold text-slate-400 leading-relaxed cursor-pointer uppercase tracking-tight">
                  {t('terms_agree')} <Link href="/terms-and-conditions" className="text-orange-600">{t('terms')}</Link> {t('and')} <Link href="/privacy-policy" className="text-orange-600">{t('privacy')}</Link>.
                </label>
              </div>
              
              <button 
                disabled={loading} 
                className="mt-2 w-full rounded-2xl bg-orange-600 py-5 font-black uppercase tracking-widest text-[10px] text-white transition-all hover:bg-white dark:bg-slate-900 dark:hover:bg-black shadow-xl shadow-orange-600/20 flex items-center justify-center gap-3 group"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    {t('get_access')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center py-6 space-y-6 animate-in fade-in zoom-in-90 duration-500">
               <div className="h-24 w-24 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500 border border-green-100 dark:border-green-500/30">
                 <CheckCircle2 className="h-12 w-12" />
               </div>
               <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">{t('access_granted')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

