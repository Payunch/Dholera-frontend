"use client";

import React, { useState, useEffect } from 'react';
import { X, FileText, Loader2, Lock, ShieldCheck, ExternalLink, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';
import { safeLocalStorage } from '@/utils/storage';

interface SecurePdfViewerProps {
  pdfId: string;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const SecurePdfViewer = ({ pdfId, onClose }: SecurePdfViewerProps) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requiresPayment, setRequiresPayment] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const token = safeLocalStorage.getItem('lead_token');
  const fingerprint = safeLocalStorage.getItem('visitorFingerprint');
  const leadName = safeLocalStorage.getItem('lead_name') || 'Guest';
  const leadEmail = safeLocalStorage.getItem('lead_email') || 'Guest';
  const leadPhone = safeLocalStorage.getItem('lead_phone') || 'Guest';

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
               (navigator.maxTouchPoints > 0 && /Macintosh/i.test(navigator.userAgent)));
  }, []);

  const directUrl = `${API_BASE_URL}/pdf/view/${pdfId}?token=${token}`;

  const fetchPdf = async () => {
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
        throw new Error(errData.error || `Failed to load document (${res.status})`);
      }

      if (isMobile) {
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
    } catch (err: any) {
      console.error('SecurePdfViewer Fetch Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pdfId) {
      setError('Invalid document ID');
      setLoading(false);
      return;
    }
    fetchPdf();
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [pdfId, token, isMobile]);

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

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to create payment order');

      if (orderData.alreadyPurchased) {
        fetchPdf();
        return;
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Dholera Platform',
        description: 'Premium Document Access',
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/payment/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token || ''
              },
              body: JSON.stringify({ ...response, pdfId, leadToken: token })
            });

            if (verifyRes.ok) {
              fetchPdf();
            } else {
              setError('Payment verification failed.');
            }
          } catch (err) {
            setError('Connection error during verification.');
          }
        },
        prefill: { name: leadName, email: leadEmail, contact: leadPhone },
        theme: { color: '#ea580c' }
      };

      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Payment gateway is still loading. Please try again in a few seconds.');
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setPaymentLoading(false);
    }
  };

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

        {error && !requiresPayment && (
          <div className="max-w-sm w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-xl font-black text-slate-900 uppercase mb-2">Access Denied</h3>
            <p className="text-slate-500 font-medium mb-8">{error}</p>
            <button onClick={onClose} className="w-full rounded-2xl bg-slate-900 py-4 text-white font-black uppercase tracking-widest">Close Viewer</button>
          </div>
        )}

        {!loading && !error && (isMobile || blobUrl) && (
          <div className="relative w-full h-full max-w-6xl bg-white shadow-2xl overflow-hidden rounded-xl flex flex-col">
            {/* Watermark Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] grid grid-cols-2 md:grid-cols-3 grid-rows-4 overflow-hidden">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className="flex items-center justify-center -rotate-45 text-[10px] md:text-sm font-black text-slate-950 uppercase text-center">
                   {leadPhone} <br/> {leadEmail}
                 </div>
               ))}
            </div>

            {isMobile ? (
              <div className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-6">
                <FileText className="h-24 w-24 text-slate-200" />
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-900 uppercase">Document Ready</h4>
                  <p className="text-slate-500 font-medium">For the best experience on mobile, please view in full screen mode.</p>
                </div>
                <button onClick={() => window.open(directUrl, '_blank')} className="rounded-2xl bg-slate-900 px-8 py-4 text-white font-black uppercase tracking-widest flex items-center gap-3">
                  Open Document <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                <div className="absolute top-0 inset-x-0 h-14 z-20 cursor-not-allowed" title="Toolbar restricted" />
                <iframe 
                  src={`${blobUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="flex-1 w-full border-none"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
