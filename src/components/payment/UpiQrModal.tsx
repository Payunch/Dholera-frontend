"use client";

import React, { useState, useEffect, useMemo } from"react";
import { X, ShieldCheck, Copy, Check, Loader2, ArrowRight } from"lucide-react";
import { QRCodeSVG } from"qrcode.react";

interface UpiQrModalProps {
 upiId: string;
 amount: number;
 merchantName: string;
 transactionId: string;
 onClose: () => void;
 onVerifyUtr: (utr: string) => Promise<boolean>;
}

export const UpiQrModal = ({
 upiId,
 amount: baseAmount,
 merchantName,
 transactionId,
 onClose,
 onVerifyUtr
}: UpiQrModalProps) => {
 const [copied, setCopied] = useState(false);
 const [mounted, setMounted] = useState(false);
 const [count, setCount] = useState(1);
 const [utr, setUtr] = useState("");
 const [isVerifying, setIsVerifying] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const totalAmount = baseAmount * count;

 // Build UPI Link safely: upi://pay?pa=upiid&pn=name&am=amount&cu=INR
 const upiLink = useMemo(() => {
 const params = new URLSearchParams();
 params.set('pa', upiId);
 params.set('pn', merchantName);
 params.set('am', totalAmount.toFixed(2));
 params.set('cu','INR');
 return`upi://pay?${params.toString()}`;
 }, [upiId, merchantName, totalAmount]);

 useEffect(() => {
 setMounted(true);
 }, []);

 const handleCopy = () => {
 navigator.clipboard.writeText(upiId);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };

 const handleVerify = async () => {
 if (!/^\d{10,14}$/.test(utr)) {
 setError("Please enter a valid Transaction/UTR number.");
 return;
 }
 setError(null);
 setIsVerifying(true);
 try {
 const success = await onVerifyUtr(utr);
 if (!success) {
 setError("Could not submit request. Please try again.");
 }
 } catch (err) {
 setError("Connection error. Please try again.");
 } finally {
 setIsVerifying(false);
 }
 };

 if (!mounted) return null;

 return (
 <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm animate-in fade-in duration-300">
 <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
 
 {/* Left Side: QR & Payment Info */}
 <div className="p-8 text-center md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-slate-100">
 <div className="mb-4 inline-block rounded-3xl border-8 border-slate-50 bg-white p-4 shadow-inner">
 <QRCodeSVG value={upiLink} size={160} level="H" />
 </div>

 <div className="mb-4 space-y-1">
 <span className="block text-3xl font-black text-slate-900 dark:text-white">₹{totalAmount.toFixed(2)}</span>
 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">
 Unlocking {count} PDF{count > 1 ?'s' :''}
 </span>
 </div>

 {/* UPI ID Copy */}
 <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-3 border border-slate-100 text-left">
 <div>
 <span className="block text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">UPI ID</span>
 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{upiId}</span>
 </div>
 <button
 onClick={handleCopy}
 className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200 text-slate-400 hover:text-orange-600 transition-all"
 >
 {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
 </button>
 </div>

 <div className="mt-auto">
 <a
 href={upiLink}
 className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-600/10 md:hidden"

 >
 Open UPI App
 </a>
 </div>
 </div>

 {/* Right Side: Verification & Unlock */}
 <div className="p-8 md:w-1/2 bg-white/50 flex flex-col justify-center relative">
 <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:text-white transition-colors">
 <X className="h-5 w-5" />
 </button>

 <div className="mb-6">
 <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Admin Approval</h3>
 <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed mt-1">
 Paid already? Enter your Transaction ID / UTR No. for Admin verification.
 </p>
 </div>

 <div className="space-y-4">
 <div className="space-y-2">
 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">UTR / Transaction ID</label>
 <input 
 type="text"
 placeholder="Enter 12-digit number"
 maxLength={14}
 value={utr}
 onChange={(e) => setUtr(e.target.value.replace(/\D/g,''))}
 className="w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 dark:text-white outline-none focus:border-orange-600 transition-all"
 />
 </div>

 {error && <p className="text-[9px] font-bold text-red-500 uppercase px-1">{error}</p>}

 <button 
 disabled={isVerifying || utr.length < 10}
 onClick={handleVerify}
 className="w-full bg-white dark:bg-slate-900 hover:bg-orange-600 disabled:bg-slate-300 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
 >
 {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Submit for Approval <Check className="h-4 w-4" /></>}
 </button>

 <p className="text-[9px] font-bold text-slate-500 uppercase text-center mt-4">
 Access is usually granted within 5-10 minutes.
 </p>
 </div>

 <p className="mt-8 text-[8px] font-bold leading-relaxed text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">
 Once submitted, Admin will verify the payment in GPay/Bank and unlock your documents.
 </p>
 </div>
 </div>
 </div>
 );
};
