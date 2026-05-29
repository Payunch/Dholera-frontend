"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { X, FileText, Loader2, Lock, ShieldCheck, ExternalLink, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';
import { safeLocalStorage } from '@/utils/storage';

import { useLead } from '@/providers/LeadProvider';

interface SecurePdfViewerProps {
  pdfId: string;
  onClose: () => void;
}

export const SecurePdfViewer = ({ pdfId, onClose }: SecurePdfViewerProps) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requiresPayment, setRequiresPayment] = useState(false);
  const [requiresRegistration, setRequiresRegistration] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { logoutLead } = useLead();

  const token = safeLocalStorage.getItem('lead_token');
  const fingerprint = safeLocalStorage.getItem('visitorFingerprint');
  const leadEmail = safeLocalStorage.getItem('lead_email') || 'Guest';
  const leadPhone = safeLocalStorage.getItem('lead_phone') || 'Guest';

  const isMobile = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 0 && /Macintosh/i.test(navigator.userAgent));
  }, []);

  const directUrl = `${API_BASE_URL}/pdf/view/${pdfId}?token=${token}`;

  const fetchPdf = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRequiresPayment(false);
    try {
      if (!token) throw new Error('Verification required to access this document.');

      const res = await fetch(`${API_BASE_URL}/pdf/view/${pdfId}`, {
        headers: { 'Authorization': token || '' }
      });

      if (res.status === 402) {
        setRequiresPayment(true);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Server error' }));
        if (errData.trialLimitReached) {
          setRequiresRegistration(true);
          setLoading(false);
          return;
        }
        throw new Error(errData.error || `Failed to load document (${res.status})`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
    } catch (err) {
      console.error('SecurePdfViewer Fetch Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load document.');
    } finally {
      setLoading(false);
    }
  }, [pdfId, token]);

  useEffect(() => {
    if (!pdfId) return;
    // Defer execution to avoid synchronous setState in effect warning
    Promise.resolve().then(() => {
      fetchPdf();
    });
  }, [fetchPdf, pdfId]);

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify({ pdfId, leadToken: token, fingerprint })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to initiate payment');

      if (data.alreadyPurchased) {
        fetchPdf();
        return;
      }

      if (data.redirectUrl) {
        // Redirect to PhonePe payment page
        window.location.href = data.redirectUrl;
      } else {
        throw new Error('Payment gateway redirect URL missing');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate payment');
    } finally {
      setPaymentLoading(false);
    }
  };

  const displayError = !pdfId ? 'Invalid document ID' : error;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-slate-950/95 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900 px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-orange-500" />
          <span className="text-xs font-black uppercase tracking-widest text-white hidden sm:inline">
            Secure Viewer (Watermarked)
          </span>
        </div>
        <div className="flex items-center gap-4">
          {!loading && !error && isMobile && (
             <button onClick={() => window.open(directUrl, '_blank')} className="rounded-full bg-orange-600 px-4 py-1.5 text-xs font-black uppercase text-white hover:bg-orange-500 transition-colors">
               Full Screen
             </button>
          )}
          <button onClick={onClose} className="rounded-full p-2 bg-white/5 text-slate-400 hover:text-white hover:bg-red-500/20 transition-all">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {loading && <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />}
        
        {requiresRegistration && (
          <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-center mb-6">
               <div className="h-20 w-20 rounded-3xl bg-blue-50 flex items-center justify-center">
                 <ShieldCheck className="h-10 w-10 text-blue-600" />
               </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Trial Limit Reached</h3>
            <p className="text-slate-500 font-medium mb-8">
              You have already viewed one document in trial mode. Please register with your own details for full platform access.
            </p>
            <button 
              onClick={() => {
                logoutLead();
                onClose();
              }}
              className="w-full rounded-2xl bg-slate-900 py-5 text-white font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              Register for Full Access
            </button>
            <button onClick={onClose} className="mt-4 text-sm font-bold text-slate-400 hover:text-slate-600">Maybe Later</button>
          </div>
        )}

        {requiresPayment && (
          <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-center mb-6">
               <div className="h-20 w-20 rounded-3xl bg-orange-50 flex items-center justify-center">
                 <Lock className="h-10 w-10 text-orange-600" />
               </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Premium Document</h3>
            <p className="text-slate-500 font-medium mb-8">
              This official DSIRDA map/brochure is verified and gated. Pay a small fee of ₹10 to unlock lifetime access.
            </p>
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 border-2 border-dashed border-slate-200">
               <span className="block text-4xl font-black text-orange-600">₹10.00</span>
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">One-time payment</span>
            </div>
            <button 
              disabled={paymentLoading}
              onClick={handlePayment}
              className="w-full rounded-2xl bg-orange-600 py-5 text-white font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-3"
            >
              {paymentLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Pay Now & Unlock <ShieldCheck className="h-5 w-5" /></>}
            </button>
            <button onClick={onClose} className="mt-4 text-sm font-bold text-slate-400 hover:text-slate-600">Cancel</button>
          </div>
        )}

        {displayError && !requiresPayment && (
          <div className="max-w-sm w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-xl font-black text-slate-900 uppercase mb-2">Access Denied</h3>
            <p className="text-slate-500 font-medium mb-8">{displayError}</p>
            <button onClick={onClose} className="w-full rounded-2xl bg-slate-900 py-4 text-white font-black uppercase tracking-widest">Close Viewer</button>
          </div>
        )}

        {!loading && !displayError && blobUrl && (
          <div className="relative w-full h-full max-w-6xl bg-white shadow-2xl overflow-hidden rounded-xl flex flex-col">
            {/* Watermark Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] grid grid-cols-2 md:grid-cols-3 grid-rows-4 overflow-hidden">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className="flex items-center justify-center -rotate-45 text-[10px] md:text-sm font-black text-slate-950 uppercase text-center">
                   {leadPhone} <br/> {leadEmail}
                 </div>
               ))}
            </div>

            {/* Always try to show iframe, but provide a download/open button for mobile as backup */}
            <div className="flex-1 flex flex-col relative">
              {isMobile && (
                <div className="absolute top-4 right-4 z-30">
                  <a 
                    href={directUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-slate-900/80 backdrop-blur-sm px-4 py-2 text-[10px] font-black uppercase text-white hover:bg-orange-600 transition-all"
                  >
                    Full Screen <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              
              <div className="absolute top-0 inset-x-0 h-14 z-20 cursor-not-allowed" title="Toolbar restricted" />
              <iframe 
                src={`${blobUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="flex-1 w-full border-none h-full"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
