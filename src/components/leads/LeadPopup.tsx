"use client";

import React, { useEffect, useState } from 'react';
import { X, Loader2, CheckCircle2, Mail, Phone, User, KeyRound, Lock, ArrowLeft } from 'lucide-react';
import { useLead } from '@/providers/LeadProvider';
import { API_BASE_URL } from '@/lib/api';
import { safeLocalStorage, safeSessionStorage } from '@/utils/storage';
import { SplitLogo } from '@/components/common/DynamicImages';
import Link from 'next/link';

const INITIAL_FORM_DATA = {
  name: '',
  phone: '',
  email: '',
  otp: '',
  passcode: '',
  verificationToken: ''
};

const sanitizeDigits = (value: string, maxLength: number) => value.replace(/\D/g, '').slice(0, maxLength);
const validateName = (name: string) => name.trim().length >= 2;
const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

type LeadRecord = {
  id: number;
  name: string;
  phone: string;
  email?: string;
};

type LeadAuthResponse = {
  lead_token?: string;
  lead?: LeadRecord;
  verification_token?: string;
  alreadyRegistered?: boolean;
  message?: string;
  error?: string;
};

const getErrorMessage = (err: unknown, fallback: string) => {
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return fallback;
};

interface LeadPopupProps {
  sessionId?: string;
  fingerprint?: string;
  compulsory?: boolean;
  initialStep?: 'details' | 'login';
  onSuccess?: (data: LeadAuthResponse) => void;
}

export const LeadPopup = ({ 
  sessionId, 
  fingerprint, 
  compulsory = false, 
  initialStep = 'details',
  onSuccess 
}: LeadPopupProps) => {
  const { loginLead, verifiedLead } = useLead();
  const [open, setOpen] = useState(() => compulsory);
  const [step, setStep] = useState<'details' | 'otp' | 'passcode' | 'login' | 'success'>(initialStep);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);

  // If already logged in and popup is shown, just close it or show success
  useEffect(() => {
    if (verifiedLead && step !== 'success') {
       setStep('success');
       setTimeout(() => setOpen(false), 1000);
    }
  }, [verifiedLead, step]);

  useEffect(() => {
    if (compulsory) {
      safeSessionStorage.setItem('hasSeenPopup', 'true');
      return;
    }

    const hasSeenPopup = safeSessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      safeSessionStorage.setItem('hasSeenPopup', 'true');

      const timer = setTimeout(() => {
        const token = safeLocalStorage.getItem('lead_token');
        if (!token) {
          setOpen(true);
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [compulsory]);

  useEffect(() => {
    if (resendCountdown <= 0) return;

    const timer = window.setTimeout(() => {
      setResendCountdown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [resendCountdown]);

  const updateFormField = (field: keyof typeof INITIAL_FORM_DATA, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value
    }));
  };

  const requestOtp = async ({ isResend = false } = {}) => {
    const cleanName = formData.name.trim().replace(/\s+/g, ' ');
    const cleanPhone = sanitizeDigits(formData.phone, 10);
    const cleanEmail = formData.email.trim().toLowerCase();

    if (!validateName(cleanName)) {
      setError('Please enter your full name.');
      return false;
    }
    if (!validatePhone(cleanPhone)) {
      setError('Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (!validateEmail(cleanEmail)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!consentAccepted) {
      setError('Please accept the Terms & Conditions.');
      return false;
    }

    setLoading(true);
    setError('');
    setStatusMessage('');

    try {
      const res = await fetch(`${API_BASE_URL}/leads/register-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          sessionId,
          browserFingerprint: fingerprint
        })
      });

      const data = (await res.json()) as LeadAuthResponse;

      if (!res.ok) {
        if (data.alreadyRegistered) {
          setError('Mobile number already registered.');
          setFormData((current) => ({
            ...current,
            phone: cleanPhone
          }));
          setStep('login');
          return false;
        }
        setError(data.error || 'Failed to send verification code.');
        return false;
      }

      setResendCountdown(30);
      setStatusMessage(isResend ? 'Fresh code sent.' : data.message || 'Verification code sent.');
      setStep('otp');
      return true;
    } catch {
      setError('Network integrity failure.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(formData.otp)) {
      setError('6-digit code required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/leads/verify-registration-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp: formData.otp })
      });
      const data = (await res.json()) as LeadAuthResponse;

      if (!res.ok) {
        setError(data.error || 'Invalid code.');
        return;
      }

      setFormData((current) => ({
        ...current,
        otp: '',
        verificationToken: data.verification_token || ''
      }));
      setStep('passcode');
    } catch {
      setError('Communication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetupPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(formData.passcode)) {
      setError('6-digit passcode required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/leads/setup-passcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone,
          passcode: formData.passcode,
          verificationToken: formData.verificationToken
        })
      });
      const data = (await res.json()) as LeadAuthResponse;
      if (!res.ok) throw new Error(data.error || 'Passcode setup failed.');
      completeAuth(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Passcode setup failed.'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/leads/login-with-passcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: formData.phone, 
          passcode: formData.passcode,
          browserFingerprint: fingerprint 
        })
      });
      const data = (await res.json()) as LeadAuthResponse;
      if (!res.ok) throw new Error(data.error || 'Authentication failed.');
      completeAuth(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Access denied. Verify passcode.'));
    } finally {
      setLoading(false);
    }
  };

  const completeAuth = (data: LeadAuthResponse) => {
    if (data.lead_token && data.lead) {
      safeLocalStorage.setItem('lead_token', data.lead_token);
      safeLocalStorage.setItem('lead_email', data.lead.email || '');
      safeLocalStorage.setItem('lead_phone', data.lead.phone);
      safeLocalStorage.setItem('lead_name', data.lead.name);

      loginLead({
        id: data.lead.id,
        name: data.lead.name,
        phone: data.lead.phone,
        email: data.lead.email,
        token: data.lead_token
      });
    }

    setStep('success');
    if (onSuccess) onSuccess(data);
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4 transition-all animate-in fade-in duration-500">
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-[3rem] bg-white shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
        
        {!compulsory && (
          <button onClick={() => setOpen(false)} className="absolute right-8 top-8 text-slate-300 hover:text-slate-900 transition-all z-20">
            <X className="h-6 w-6" />
          </button>
        )}

        <div className="p-10 md:p-12">
          <div className="flex justify-center mb-8">
            <SplitLogo height={60} />
          </div>

          <div className="text-center mb-10">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">
              {step === 'success' ? 'Authenticated' : step === 'login' ? 'Sign In' : 'Investor Access'}
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
              {step === 'login' ? 'Enter credentials for the Intelligence Vault' : 'Verify identity to unlock DSIRDA archives'}
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 mb-6 animate-in slide-in-from-top-2">
               <Lock className="h-4 w-4 shrink-0" />
               <span className="text-xs font-bold uppercase tracking-tight">{error}</span>
            </div>
          )}

          {statusMessage && step !== 'success' && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 border border-green-100 text-green-600 mb-6 animate-in slide-in-from-top-2">
               <CheckCircle2 className="h-4 w-4 shrink-0" />
               <span className="text-xs font-bold uppercase tracking-tight">{statusMessage}</span>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={(e) => { e.preventDefault(); requestOtp(); }} className="space-y-4">
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                <input
                  type="text" placeholder="Full Name" required
                  className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-5 pl-14 pr-6 font-black text-sm outline-none focus:border-orange-600 focus:bg-white transition-all"
                  value={formData.name} onChange={(e) => updateFormField('name', e.target.value)}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                <input
                  type="tel" placeholder="Mobile Number" required
                  className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-5 pl-14 pr-6 font-black text-sm outline-none focus:border-orange-600 focus:bg-white transition-all"
                  value={formData.phone} onChange={(e) => updateFormField('phone', sanitizeDigits(e.target.value, 10))}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                <input
                  type="email" placeholder="Email Address" required
                  className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-5 pl-14 pr-6 font-black text-sm outline-none focus:border-orange-600 focus:bg-white transition-all"
                  value={formData.email} onChange={(e) => updateFormField('email', e.target.value)}
                />
              </div>
              
              <label className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <input 
                  type="checkbox" checked={consentAccepted} onChange={(e) => setConsentAccepted(e.target.checked)} 
                  className="mt-1 h-5 w-5 rounded-lg border-slate-200 text-orange-600 transition-all cursor-pointer" 
                />
                <span className="text-[10px] font-bold text-slate-400 leading-normal uppercase tracking-widest group-hover:text-slate-600">
                  I agree to the <Link href="/terms-and-conditions" className="text-orange-600 underline">Terms</Link> and <Link href="/privacy-policy" className="text-orange-600 underline">Privacy Policy</Link>.
                </span>
              </label>

              <button disabled={loading} className="w-full rounded-2xl bg-slate-900 py-5 font-black uppercase tracking-[0.2em] text-xs text-white transition-all hover:bg-orange-600 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Begin Handshake'}
              </button>

              <div className="pt-4 text-center">
                 <button type="button" onClick={() => setStep('login')} className="text-[10px] font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 underline">
                    Return to Login
                 </button>
              </div>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-8">
              <div className="space-y-6">
                <input
                  type="text" autoFocus required maxLength={6}
                  className="w-full text-center text-5xl font-black tracking-[0.4em] rounded-3xl border-2 border-slate-100 bg-slate-50 py-8 outline-none focus:border-orange-600 transition-all"
                  value={formData.otp} onChange={(e) => updateFormField('otp', sanitizeDigits(e.target.value, 6))}
                />
                <button disabled={loading} className="w-full rounded-2xl bg-slate-900 py-5 font-black uppercase tracking-[0.2em] text-xs text-white transition-all hover:bg-orange-600 shadow-xl shadow-slate-900/10">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Authorize Identity'}
                </button>
              </div>
              <div className="flex items-center justify-between px-2">
                <button type="button" onClick={() => setStep('details')} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 transition-colors">
                  <ArrowLeft className="h-3 w-3" /> Correction
                </button>
                <button type="button" disabled={resendCountdown > 0} onClick={() => requestOtp({ isResend: true })} className="text-[10px] font-black uppercase text-orange-600 disabled:text-slate-300">
                   {resendCountdown > 0 ? `Retry in ${resendCountdown}s` : 'Resend Code'}
                </button>
              </div>
            </form>
          )}

          {step === 'passcode' && (
            <form onSubmit={handleSetupPasscode} className="space-y-8">
              <div className="space-y-6 text-center">
                <div className="relative">
                  <KeyRound className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300" />
                  <input
                    type="password" autoFocus required maxLength={6}
                    className="w-full text-center text-4xl font-black tracking-[0.5em] rounded-3xl border-2 border-slate-100 bg-slate-50 py-8 outline-none focus:border-orange-600 transition-all"
                    value={formData.passcode} onChange={(e) => updateFormField('passcode', sanitizeDigits(e.target.value, 6))}
                  />
                </div>
                <button disabled={loading} className="w-full rounded-2xl bg-slate-900 py-5 font-black uppercase tracking-[0.2em] text-xs text-white transition-all hover:bg-orange-600 shadow-xl shadow-slate-900/10">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Secure Passcode'}
                </button>
              </div>
            </form>
          )}

          {step === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                  <input
                    type="tel" placeholder="Mobile Number" required
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-5 pl-14 pr-6 font-black text-sm outline-none focus:border-orange-600 focus:bg-white transition-all"
                    value={formData.phone} onChange={(e) => updateFormField('phone', sanitizeDigits(e.target.value, 10))}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                  <input
                    type="password" placeholder="Passcode" required maxLength={6}
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-5 pl-14 pr-6 font-black text-sm outline-none focus:border-orange-600 focus:bg-white transition-all"
                    value={formData.passcode} onChange={(e) => updateFormField('passcode', sanitizeDigits(e.target.value, 6))}
                  />
                </div>
              </div>
              <button disabled={loading} className="w-full rounded-2xl bg-slate-900 py-5 font-black uppercase tracking-[0.2em] text-xs text-white transition-all hover:bg-orange-600 shadow-xl shadow-slate-900/10">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Unlock Vault'}
              </button>
              <div className="text-center">
                 <button type="button" onClick={() => setStep('details')} className="text-[10px] font-black uppercase tracking-widest text-orange-600 underline">
                    New User? Enroll Now
                 </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center py-10 space-y-6 animate-in fade-in zoom-in-90 duration-500">
               <div className="h-24 w-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 shadow-inner">
                  <CheckCircle2 className="h-12 w-12" />
               </div>
               <div className="text-center">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Access Granted</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 italic">Synchronizing Intelligence Stream...</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
