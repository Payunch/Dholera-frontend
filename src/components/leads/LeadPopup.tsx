"use client";

import React, { useEffect, useState } from 'react';
import { X, Loader2, CheckCircle2, ShieldCheck, Mail, Phone, User, KeyRound, Lock } from 'lucide-react';
import { useLead } from '@/providers/LeadProvider';
import { API_BASE_URL } from '@/lib/api';
import { safeLocalStorage, safeSessionStorage } from '@/utils/storage';
import { SplitLogo } from '@/components/common/DynamicImages';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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

interface LeadPopupProps {
  sessionId?: string;
  fingerprint?: string;
  compulsory?: boolean;
  onSuccess?: (data: any) => void;
}

export const LeadPopup = ({ sessionId, fingerprint, compulsory = false, onSuccess }: LeadPopupProps) => {
  const { loginLead } = useLead();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'details' | 'otp' | 'passcode' | 'login' | 'success'>('details');
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (compulsory) {
      setOpen(true);
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

  const goToStep = (nextStep: typeof step) => {
    setError('');
    setStatusMessage('');
    setStep(nextStep);
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
      setError('Please enter a valid 10-digit Indian mobile number.');
      return false;
    }
    if (!validateEmail(cleanEmail)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!consentAccepted) {
      setError('Please accept the Terms & Conditions and Privacy Policy.');
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

      const data = await res.json();

      if (!res.ok) {
        if (data.alreadyRegistered) {
          setError('You are already registered. Please login with your passcode.');
          setFormData((current) => ({
            ...current,
            name: cleanName,
            phone: cleanPhone,
            email: cleanEmail
          }));
          setStep('login');
          return false;
        }
        setError(data.error || 'Failed to send verification code.');
        return false;
      }

      setResendCountdown(30);
      setStatusMessage(isResend ? 'A fresh verification code has been sent.' : data.message || 'Verification code sent.');
      setStep('otp');
      return true;
    } catch (err) {
      setError('Connection error. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(formData.otp)) {
      setError('Please enter the 6-digit code.');
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
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid verification code.');
        return;
      }

      setFormData((current) => ({
        ...current,
        otp: '',
        verificationToken: data.verification_token
      }));
      setStep('passcode');
    } catch (err) {
      setError('Connection error.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetupPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(formData.passcode)) {
      setError('Passcode must be 6 digits.');
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to set passcode.');
      completeAuth(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/leads/login-with-passcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, passcode: formData.passcode })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed.');
      completeAuth(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const completeAuth = (data: any) => {
    if (data.lead_token) {
      safeLocalStorage.setItem('lead_token', data.lead_token);
      safeLocalStorage.setItem('lead_email', data.lead.email);
      safeLocalStorage.setItem('lead_phone', data.lead.phone);
      safeLocalStorage.setItem('lead_name', data.lead.name);

      loginLead({
        name: data.lead.name,
        phone: data.lead.phone,
        token: data.lead_token
      });
    }

    setStep('success');
    if (onSuccess) onSuccess(data);
    setTimeout(() => setOpen(false), 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-2xl animate-in zoom-in-95 duration-300">
        {!compulsory && (
          <button onClick={() => setOpen(false)} className="absolute right-6 top-6 text-slate-400 hover:text-slate-900 transition-colors">
            <X className="h-6 w-6" />
          </button>
        )}

        <div className="p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <SplitLogo height={50} />
          </div>

          <h2 className="text-center text-2xl font-black uppercase tracking-tight text-slate-900 mb-2">
            {step === 'success' ? 'Welcome' : step === 'login' ? 'Welcome Back' : 'Exclusive Access'}
          </h2>

          {error && <p className="text-center text-sm font-bold text-red-500 mb-4">{error}</p>}
          {statusMessage && step !== 'success' && <p className="text-center text-sm font-bold text-green-600 mb-4">{statusMessage}</p>}

          {step === 'details' && (
            <form onSubmit={(e) => { e.preventDefault(); requestOtp(); }} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text" placeholder="Full Name" required
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 font-bold outline-none focus:border-orange-600"
                  value={formData.name} onChange={(e) => updateFormField('name', e.target.value)}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="tel" placeholder="Mobile Number" required
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 font-bold outline-none focus:border-orange-600"
                  value={formData.phone} onChange={(e) => updateFormField('phone', sanitizeDigits(e.target.value, 10))}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email" placeholder="Email Address" required
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 font-bold outline-none focus:border-orange-600"
                  value={formData.email} onChange={(e) => updateFormField('email', e.target.value)}
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={consentAccepted} onChange={(e) => setConsentAccepted(e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-600" />
                <span className="text-xs font-medium text-slate-500 leading-relaxed">
                  I agree to the <Link href="/terms-and-conditions" className="text-orange-600 underline">T&C</Link> and <Link href="/privacy-policy" className="text-orange-600 underline">Privacy Policy</Link>.
                </span>
              </label>
              <button disabled={loading} className="w-full rounded-2xl bg-slate-900 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Get Verification Code'}
              </button>
              <p className="text-center text-xs font-bold text-slate-500">
                Already registered? <button type="button" onClick={() => setStep('login')} className="text-orange-600 underline">Sign In</button>
              </p>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <p className="text-center text-sm font-medium text-slate-500">Enter code sent to {formData.email}</p>
              <input
                type="text" autoFocus required maxLength={6}
                className="w-full text-center text-3xl font-black tracking-[0.5em] rounded-2xl border-2 border-slate-100 bg-slate-50 py-5 outline-none focus:border-orange-600"
                value={formData.otp} onChange={(e) => updateFormField('otp', sanitizeDigits(e.target.value, 6))}
              />
              <button disabled={loading} className="w-full rounded-2xl bg-slate-900 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Verify Code'}
              </button>
              <div className="flex justify-between">
                <button type="button" onClick={() => setStep('details')} className="text-xs font-bold text-slate-500">Edit Details</button>
                <button type="button" disabled={resendCountdown > 0} onClick={() => requestOtp({ isResend: true })} className="text-xs font-bold text-orange-600">
                   {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend Code'}
                </button>
              </div>
            </form>
          )}

          {step === 'passcode' && (
            <form onSubmit={handleSetupPasscode} className="space-y-6">
              <p className="text-center text-sm font-medium text-slate-500">Set your 6-digit secure passcode</p>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password" autoFocus required maxLength={6}
                  className="w-full text-center text-3xl tracking-[0.5em] rounded-2xl border-2 border-slate-100 bg-slate-50 py-5 outline-none focus:border-orange-600"
                  value={formData.passcode} onChange={(e) => updateFormField('passcode', sanitizeDigits(e.target.value, 6))}
                />
              </div>
              <button disabled={loading} className="w-full rounded-2xl bg-slate-900 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Complete Setup'}
              </button>
            </form>
          )}

          {step === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="tel" placeholder="Mobile Number" required
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 font-bold outline-none focus:border-orange-600"
                  value={formData.phone} onChange={(e) => updateFormField('phone', sanitizeDigits(e.target.value, 10))}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password" placeholder="Passcode" required maxLength={6}
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 font-bold outline-none focus:border-orange-600"
                  value={formData.passcode} onChange={(e) => updateFormField('passcode', sanitizeDigits(e.target.value, 6))}
                />
              </div>
              <button disabled={loading} className="w-full rounded-2xl bg-slate-900 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In'}
              </button>
              <button type="button" onClick={() => setStep('details')} className="w-full text-center text-xs font-bold text-orange-600">New User? Join Here</button>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center py-10 space-y-4 animate-in fade-in slide-in-from-bottom-4">
               <CheckCircle2 className="h-20 w-20 text-green-500" />
               <h3 className="text-2xl font-black text-slate-900 uppercase">Access Granted</h3>
               <p className="font-medium text-slate-500">Redirecting to platform...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
