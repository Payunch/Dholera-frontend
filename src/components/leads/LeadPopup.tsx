"use client";

import React, { useEffect, useState, useRef } from 'react';
import { X, Loader2, CheckCircle2, Phone, User, ArrowRight } from 'lucide-react';
import { useLead } from '@/providers/LeadProvider';
import { apiClient } from '@/lib/api';
import { SplitLogo } from '@/components/common/DynamicImages';

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
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
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
    
    if (!validateName(name)) return setError('Please enter your full name.');
    if (!validatePhone(cleanPhone)) return setError('Please enter a valid 10-digit mobile number.');

    setLoading(true);
    setError('');

    try {
      // Use the frictionless onboard route
      const res = await apiClient.post('/leads/onboard', {
        name: name.trim(),
        phone: cleanPhone,
        sessionId,
        browserFingerprint: fingerprint
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
      setError(err.response?.data?.error || 'Failed to save details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4 animate-in fade-in duration-500">
      <div className="relative w-full max-w-[400px] overflow-hidden rounded-[2rem] bg-white shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
        {!compulsory && (
          <button 
            onClick={() => {
              setOpen(false);
              if (onClose) onClose();
            }} 
            className="absolute right-6 top-6 text-slate-300 hover:text-slate-900 transition-all z-20"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        
        <div className="p-8 md:p-10">
          <div className="flex justify-center mb-8"><SplitLogo height={48} /></div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">
              {step === 'success' ? 'Access Granted' : 'Unlock Access'}
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
              {step === 'success' ? 'Opening PDF...' : 'Please provide your details to view this PDF'}
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
                  placeholder="Your Full Name" 
                  required
                  autoFocus
                  className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 font-bold text-sm outline-none focus:border-orange-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="tel" 
                  placeholder="Mobile Number" 
                  required
                  className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 font-bold text-sm outline-none focus:border-orange-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                  value={phone} 
                  onChange={(e) => setPhone(sanitizeDigits(e.target.value, 10))}
                />
              </div>
              
              <button 
                disabled={loading} 
                className="mt-2 w-full rounded-xl bg-orange-600 py-4 font-black uppercase tracking-widest text-xs text-white transition-all hover:bg-slate-900 shadow-xl shadow-orange-600/20 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Continue <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center py-6 space-y-4 animate-in fade-in zoom-in-90 duration-500">
               <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                 <CheckCircle2 className="h-10 w-10" />
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

