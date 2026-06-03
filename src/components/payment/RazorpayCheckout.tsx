"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, ShieldCheck, ArrowRight } from 'lucide-react';
import { apiClient } from '@/lib/api';

interface RazorpayCheckoutProps {
  pdfIds: string[];
  type: 'view' | 'download';
  onSuccess: (data: any) => void;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const RazorpayCheckout = ({ pdfIds, type, onSuccess, onClose }: RazorpayCheckoutProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Load Razorpay Script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => initializeOrder();
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeOrder = async () => {
    try {
      // 2. Create Order on Backend
      const res = await apiClient.post('/payment/create-order', {
        pdfIds,
        type
      });

      if (!res.data.success) throw new Error('Order creation failed');

      const { order_id, amount, currency, key_id } = res.data;

      // 3. Open Razorpay Checkout
      const options = {
        key: key_id,
        amount: amount,
        currency: currency,
        name: "Dholera Platform",
        description: `Unlocking ${pdfIds.length} PDF (${type})`,
        order_id: order_id,
        handler: async (response: any) => {
          // 4. Verify Payment on Backend
          try {
            const verifyRes = await apiClient.post('/payment/verify', {
              ...response,
              pdfIds,
              type
            });

            if (verifyRes.data.success) {
              onSuccess(verifyRes.data);
            } else {
              setError('Payment verification failed');
            }
          } catch (err) {
            setError('Verification connection error');
          }
        },
        prefill: {
          name: localStorage.getItem('lead_name') || '',
          contact: localStorage.getItem('lead_phone') || '',
        },
        theme: {
          color: "#ea580c"
        },
        modal: {
          ondismiss: () => onClose()
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (err: any) {
      console.error('Razorpay Init Error:', err);
      setError(err.response?.data?.error || 'Failed to initialize payment');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl">
        {loading ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Initializing Secure Payment</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Please wait while we connect to Razorpay...</p>
          </div>
        ) : error ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Payment Error</h3>
            <p className="text-sm font-medium text-slate-500">{error}</p>
            <button onClick={onClose} className="w-full bg-slate-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
              Go Back
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center animate-pulse">
                <ShieldCheck className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Secure Checkout Active</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Complete the payment in the Razorpay window to unlock your PDFs instantly.</p>
          </div>
        )}
      </div>
    </div>
  );
};
