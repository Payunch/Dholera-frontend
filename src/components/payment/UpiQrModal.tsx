"use client";

import React, { useState, useEffect } from "react";
import { X, ShieldCheck, Copy, Check, MessageSquare } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface UpiQrModalProps {
  upiId: string;
  amount: number;
  merchantName: string;
  onClose: () => void;
  onNotify: () => void;
}

export const UpiQrModal = ({
  upiId,
  amount,
  merchantName,
  onClose,
  onNotify,
}: UpiQrModalProps) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Simple UPI Link
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount.toFixed(2)}&cu=INR`;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-center text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white/50 hover:bg-white/20 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 shadow-lg shadow-orange-600/20">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight">Unlock Premium Hub</h3>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Scan & Pay to Admin</p>
        </div>

        {/* QR Section */}
        <div className="p-8 text-center">
          <div className="mb-6 inline-block rounded-3xl border-8 border-slate-50 bg-white p-4 shadow-inner">
            <QRCodeSVG value={upiLink} size={200} level="H" />
          </div>

          <div className="mb-6 space-y-1">
            <span className="block text-4xl font-black text-slate-900">₹{amount.toFixed(2)}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Lifetime Pro Access</span>
          </div>

          {/* UPI ID Copy */}
          <div className="mb-8 flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="text-left">
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Admin UPI ID</span>
              <span className="text-sm font-bold text-slate-700">{upiId}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 text-slate-400 hover:text-orange-600 hover:border-orange-200 transition-all"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          <div className="space-y-3">
            <a
              href={upiLink}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-600 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-orange-600/20 transition-all hover:bg-orange-500 md:hidden"
            >
              Pay via UPI App
            </a>
            
            <button
              onClick={onNotify}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800"
            >
              <MessageSquare className="h-4 w-4" />
              I have paid
            </button>
          </div>

          <p className="mt-6 text-[10px] font-bold leading-relaxed text-slate-400 uppercase tracking-widest">
            After payment, click "I have paid" to notify Admin. <br />
            Access is granted manually within minutes.
          </p>
        </div>
      </div>
    </div>
  );
};
