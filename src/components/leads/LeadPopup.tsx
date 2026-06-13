"use client";

import React, { useEffect, useState, useRef } from 'react';
import { X, Loader2, CheckCircle2, Phone, User, ArrowRight } from 'lucide-react';
import { useLead } from '@/providers/LeadProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { apiClient } from '@/lib/api';
import { SplitLogo } from '@/components/common/DynamicImages';
import Link from 'next/link';
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const sanitizeDigits = (value: string, maxLength: number) => value.replace(/\D/g, '').slice(0, maxLength);
const validateName = (name: string) => name.trim().length >= 2;
const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

interface LeadPopupProps {
  sessionId?: string;
  fingerprint?: string;
  compulsory?: boolean;
  onSuccess?: (data: any) => void;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
}

export const LeadPopup = ({ 
  sessionId, 
  fingerprint, 
  compulsory = false, 
  onSuccess,
  onClose,
  title,
  subtitle
}: LeadPopupProps) => {
  const { loginLead, verifiedLead } = useLead();
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('Verified Visitor');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'details' | 'otp' | 'success'>('details');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const recaptchaVerifierRef = useRef<any>(null);

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

  const initRecaptcha = () => {
    if (!auth || recaptchaVerifierRef.current) return;
    try {
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {}
      });
    } catch (err) {
      console.error('Failed to initialize recaptcha:', err);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = sanitizeDigits(phone, 10);
    
    if (!validatePhone(cleanPhone)) return setError(t('err_phone') || 'Please enter a valid 10-digit mobile number.');
    if (!agreedToTerms) return setError(t('err_terms') || 'You must agree to the terms and privacy policy.');

    setLoading(true);
    setError('');

    try {
      if (!auth) {
        throw new Error("Firebase Auth is not initialized.");
      }
      
      initRecaptcha();
      const verifier = recaptchaVerifierRef.current;
      if (!verifier) {
        throw new Error("Recaptcha verifier initialization failed.");
      }

      const phoneNumber = `+91${cleanPhone}`;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      setConfirmationResult(confirmation);
      setStep('otp');
    } catch (err: any) {
      console.error('Failed to send OTP:', err);
      setError(err.message || 'Failed to send verification code. Please check your phone number.');
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (e) {}
        recaptchaVerifierRef.current = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = sanitizeDigits(otpCode, 6);
    if (code.length !== 6) {
      return setError('Please enter a valid 6-digit verification code.');
    }

    setLoading(true);
    setError('');

    try {
      if (!confirmationResult) {
        throw new Error("No pending verification request found.");
      }

      await confirmationResult.confirm(code);
      
      // Get Firebase ID Token to securely verify in our backend database
      const idToken = await auth?.currentUser?.getIdToken();
      
      const cleanPhone = sanitizeDigits(phone, 10);
      const res = await apiClient.post('/leads/verify-otp', {
        name: name.trim(),
        phone: cleanPhone,
        firebaseToken: idToken,
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
      console.error('Failed to verify OTP:', err);
      setError(err.response?.data?.error || err.message || 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 backdrop-blur-lg p-4 animate-in fade-in duration-500">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[2.5rem] bg-white/10 dark:bg-slate-950/20 backdrop-blur-2xl shadow-2xl border border-white/20 dark:border-slate-800/60 animate-in zoom-in-95 duration-300">
        {!compulsory && (
          <button 
            onClick={() => {
              setOpen(false);
              if (onClose) onClose();
            }} 
            className="absolute right-6 top-6 text-white/60 hover:text-white dark:text-white/60 dark:hover:text-white transition-all z-20"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        
        <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* Left Column */}
          <div className="flex-1 w-full text-center md:text-left flex flex-col justify-center">
            <div className="flex justify-center md:justify-start mb-6 md:mb-10 brightness-0 invert">
              <SplitLogo height={42} />
            </div>
            
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3">
                {step === 'success' ? t('access_granted') || 'Access Granted' : (step === 'otp' ? 'Verify Code' : (title || t('start_here')))}
              </h2>
              <p className="text-[10px] md:text-xs font-bold text-slate-300 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
                {step === 'otp' ? 'Enter the verification code sent to your phone' : (subtitle || t('verify_desc'))}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 w-full bg-white/5 dark:bg-slate-950/40 p-6 md:p-8 rounded-[2rem] border border-white/10 dark:border-slate-800/60 relative">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 mb-6 text-center animate-in slide-in-from-top-2">
                <span className="text-[10px] font-bold uppercase tracking-tight">{error}</span>
              </div>
            )}

          {step === 'details' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="tel" 
                  placeholder={t('mobile_number') || 'Mobile Number'} 
                  required
                  autoFocus
                  className="w-full rounded-2xl border-2 border-white/10 dark:border-slate-800 bg-white/5 dark:bg-slate-950/40 py-5 pl-12 pr-4 font-black uppercase tracking-widest text-[10px] outline-none focus:border-orange-500 focus:bg-white/10 dark:focus:bg-slate-900/40 transition-all text-white dark:text-white placeholder:text-slate-400"
                  value={phone} 
                  onChange={(e) => setPhone(sanitizeDigits(e.target.value, 10))}
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-[#FF7A00] focus:ring-[#FF7A00] cursor-pointer"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <label htmlFor="terms" className="text-[10px] font-bold text-slate-300 leading-relaxed cursor-pointer uppercase tracking-tight">
                  {t('terms_agree') || 'I agree to the'} <Link href="/terms-and-conditions" className="text-[#FF7A00] font-black">{t('terms') || 'Terms'}</Link> {t('and') || 'and'} <Link href="/privacy-policy" className="text-[#FF7A00] font-black">{t('privacy') || 'Privacy Policy'}</Link>.
                </label>
              </div>
              
              <button 
                disabled={loading} 
                className="mt-2 w-full h-14 rounded-2xl bg-[#FF7A00] hover:bg-orange-600 disabled:bg-slate-700 text-white font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-orange-600/10 flex items-center justify-center gap-3 active:scale-95 group"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Send OTP <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  Sent to +91 {phone}
                </p>
              </div>
              <div className="relative">
                <input
                  type="text" 
                  placeholder="ENTER 6-DIGIT OTP" 
                  required
                  maxLength={6}
                  autoFocus
                  className="w-full rounded-2xl border-2 border-white/10 dark:border-slate-800 bg-white/5 dark:bg-slate-950/40 py-5 text-center font-black uppercase tracking-widest text-[10px] outline-none focus:border-orange-500 focus:bg-white/10 dark:focus:bg-slate-900/40 transition-all text-white dark:text-white placeholder:text-slate-400"
                  value={otpCode} 
                  onChange={(e) => setOtpCode(sanitizeDigits(e.target.value, 6))}
                />
              </div>
              
              <button 
                disabled={loading} 
                className="mt-2 w-full h-14 rounded-2xl bg-[#FF7A00] hover:bg-orange-600 disabled:bg-slate-700 text-white font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-orange-600/10 flex items-center justify-center gap-3 active:scale-95 group"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Verify OTP <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setStep('details');
                    setError('');
                  }}
                  className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-[#FF7A00] transition-colors"
                >
                  Change Phone Number
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center py-6 space-y-6 animate-in fade-in zoom-in-90 duration-500">
              <div className="h-24 w-24 rounded-full bg-green-500/10 dark:bg-green-950/30 flex items-center justify-center text-green-400 border border-green-500/20">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-white">{t('access_granted') || 'Access Granted'}</p>
            </div>
          )}
          </div>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};
