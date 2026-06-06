"use client";

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Smartphone, MessageSquare } from 'lucide-react';
import { getCookie } from '@/utils/cookies';

interface RazorpayCheckoutProps {
  pdfIds: string[];
  type: 'view' | 'download';
  onSuccess: (data: any) => void;
  onClose: () => void;
}

export const RazorpayCheckout = ({ pdfIds, type, onSuccess, onClose }: RazorpayCheckoutProps) => {
  const upiId = 'solankiparesh1183@okaxis'; // From your .env
  const adminPhone = '917435808310';
  const amount = type === 'download' ? pdfIds.length * 10 : pdfIds.length * 5;
  const leadPhone = getCookie('lead_phone') || '';

  const upiUrl = `upi://pay?pa=${upiId}&pn=Dholera%20Platform&am=${amount}.00&cu=INR&tn=Bulk%20PDF%20Unlock%20${pdfIds.join(',')}_${type}`;
  const waUrl = `https://wa.me/${adminPhone}?text=Paid%20Rs.${amount}%20for%20${type.toUpperCase()}%20access%20to%20${pdfIds.length}%20PDFs. IDs:%20${pdfIds.join(',')}.%20Please%20activate.`;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-center shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="h-20 w-20 bg-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-orange-500/20">
          <ShieldCheck className="h-10 w-10 text-orange-600" />
        </div>
        
        <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">Unlock {pdfIds.length} Documents</h3>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">Secure UPI Payment Required</p>

        <div className="space-y-4">
          <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
             <div className="text-left">
               <p className="text-[10px] font-black text-slate-400 uppercase">{type === 'view' ? 'Streaming' : 'Full Download'} Access</p>
               <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{pdfIds.length} PREMIUM FILES</p>
             </div>
             <p className="text-3xl font-black italic text-orange-600">₹{amount}</p>
          </div>

          <a href={upiUrl} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-600/20 active:scale-95">
            <Smartphone className="h-4 w-4" />
            Pay via UPI App
          </a>

          <a href={waUrl} className="w-full border-2 border-green-500/20 hover:bg-green-500/5 text-green-500 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95">
            <MessageSquare className="h-4 w-4" />
            Verify on WhatsApp
          </a>

          <button onClick={onClose} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
            Cancel
          </button>
        </div>

        <p className="mt-8 text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">Manual Activation • Secured by Dholera Growth Team</p>
      </div>
    </div>
  );
};

