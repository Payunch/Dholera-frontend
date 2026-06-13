"use client";

import React, { useState, useEffect } from'react';
import { format, isValid, parseISO } from'date-fns';
import { useLead } from'@/providers/LeadProvider';
import { useLanguage } from'@/providers/LanguageProvider';
import { apiClient } from'@/lib/api';
import { SecurePdfViewer } from'@/components/pdf/SecurePdfViewer';
import { LeadPopup } from'@/components/leads/LeadPopup';
import { useVisitorTracking } from'@/hooks/useVisitorTracking';
import { Calendar, FileText, Lock, Search, ShieldCheck, X, Download, Eye, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from'@/lib/utils';

interface PDF {
 id: string;
 title: string;
 category: string;
 createdAt?: string;
 documentDate?: string;
}

export function PdfListing() {
 const { verifiedLead } = useLead();
 const { t } = useLanguage();
 const { sessionId, fingerprint } = useVisitorTracking();
 
 const [pdfs, setPdfs] = useState<PDF[]>([]);
 const [loading, setLoading] = useState(true);
 const [activeTab, setActiveTab] = useState(0);
 const [search, setSearch] = useState('');
 const [purchasedPdfIds, setPurchasedPdfIds] = useState<string[]>([]);
 
 const [selectedPdfId, setSelectedPdfId] = useState<string | null>(null);
 const [preSelectedType, setPreSelectedType] = useState<'view' |'download'>('view');
 const [showViewer, setShowViewer] = useState(false);
 const [showVerifyPopup, setShowVerifyPopup] = useState(false);
 const [postLoginAction, setPostLoginAction] = useState<'view' |'bulk_pay' | null>(null);

 // Selection Mode State
 const [isSelectionMode, setIsSelectionMode] = useState(false);
 const [selectionType, setSelectionType] = useState<'view' |'download'>('view');
 const [selectedPdfs, setSelectedPdfs] = useState<string[]>([]);
 const [showBulkCheckout, setShowBulkCheckout] = useState(false);

 const [tempTxnId, setTempTxnId] = useState<string | null>(null);
 const [calculatedTotal, setCalculatedTotal] = useState(0);
 const [utr, setUtr] = useState('');
 const [isVerifyingUtr, setIsVerifyingUtr] = useState(false);
 const [utrSubmitted, setUtrSubmitted] = useState(false);
 const [utrError, setUtrError] = useState<string | null>(null);

 const pricePerPdf = selectionType ==='download' ? 300 : 150;
 const selectionTotal = Math.min(selectedPdfs.length * pricePerPdf, 499);

 const fetchPurchases = React.useCallback(() => {
 if (!verifiedLead?.token) return;
 apiClient.get('/payment/my-purchases')
 .then(res => {
 const data = res.data;
 if (data.success && data.purchases) {
 const completed = data.purchases
 .filter((p: any) => p.status ==='completed')
 .map((p: any) => String(p.pdfId));
 setPurchasedPdfIds(completed);
 }
 })
 .catch(e => console.error('Purchases fetch error:', e));
 }, [verifiedLead?.token]);

 useEffect(() => {
 apiClient.get('/pdf/list')
 .then(res => setPdfs(Array.isArray(res.data) ? res.data : []))
 .catch(err => console.error('PDF Listing Error:', err))
 .finally(() => setLoading(false));

 fetchPurchases();
 const interval = setInterval(fetchPurchases, 30000);
 return () => clearInterval(interval);
 }, [fetchPurchases]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !loading && !verifiedLead) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('trigger') === 'true') {
        setShowVerifyPopup(true);
      }
    }
  }, [loading, verifiedLead]);

 const tabs = [
 { id: 0, label: t('pdf_cat_official'), keywords: ['pdf','brochure','legal','general'] },
 { id: 1, label: t('pdf_cat_naksha'), keywords: ['naksha','tp'] },
 { id: 2, label: t('pdf_cat_dp'), keywords: ['dp','map'] },
 ];

 const filtered = pdfs.filter(pdf => {
 const cat = (pdf.category ||'').toLowerCase();
 const matchesTab = tabs[activeTab].keywords.some(k => cat.includes(k));
 const matchesSearch = !search || 
`${pdf.title} ${pdf.category}`.toLowerCase().includes(search.toLowerCase());
 return matchesTab && matchesSearch;
 });

 const handlePdfClick = (pdfId: string, type:'view' |'download' ='view') => {
 if (isSelectionMode) {
 toggleSelection(pdfId);
 return;
 }

 const freeTrialId = process.env.NEXT_PUBLIC_FREE_TRIAL_PDF_ID ||'19';
 const isFree = String(pdfId) === String(freeTrialId);

 // Completely close viewer first to clear state
 setShowViewer(false);
 
 // Set parameters
 setSelectedPdfId(pdfId);
 setPreSelectedType(type);

 if (isFree || verifiedLead) {
 // Delay opening slightly to ensure clean mount
 setTimeout(() => setShowViewer(true), 50);
 } else {
 setPostLoginAction('view');
 setShowVerifyPopup(true);
 }
 };

 const toggleSelection = (pdfId: string) => {
 if (pdfId ==='19') return; // Free PDF
 setSelectedPdfs(prev => 
 prev.includes(pdfId) 
 ? prev.filter(id => id !== pdfId) 
 : [...prev, pdfId]
 );
 };

 const handleAuthSuccess = (data?: any) => {
 setShowVerifyPopup(false);
 
 setTimeout(() => {
 if (postLoginAction ==='view') {
 setShowViewer(true);
 } else if (postLoginAction ==='bulk_pay') {
 setShowBulkCheckout(true);
 }
 setPostLoginAction(null);
 }, 400);
 };

  const handleBulkPay = () => {
    if (!verifiedLead) {
      setPostLoginAction('bulk_pay');
      setShowVerifyPopup(true);
      return;
    }
    
    const idsToSubmit = selectedPdfs.length > 0 ? selectedPdfs : ['0'];
    apiClient.post('/payment/request-manual', {
      pdfIds: idsToSubmit,
      type: selectionType
    }).then(res => {
      if (res.data.alreadyUnlocked) {
        alert(res.data.message);
        return;
      }
      if (res.data.success) {
        setTempTxnId(res.data.transaction_id);
        setCalculatedTotal(res.data.amount);
        setShowBulkCheckout(true);
      }
    }).catch(e => {
      console.error('Failed to create pending manual payment:', e);
      alert('Failed to initiate checkout. Please try again.');
    });
  };

  const handleVerifyUtr = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10,14}$/.test(utr)) {
      setUtrError('Please enter a valid 10-14 digit UTR / Transaction ID.');
      return;
    }
    setUtrError(null);
    setIsVerifyingUtr(true);
    try {
      const res = await apiClient.post('/payment/verify-utr', {
        transaction_id: tempTxnId,
        utr
      });
      if (res.data.success) {
        setUtrSubmitted(true);
        setTimeout(() => {
          setShowBulkCheckout(false);
          setUtr('');
          setUtrSubmitted(false);
          setSelectedPdfs([]);
          setIsSelectionMode(false);
        }, 3000);
      } else {
        setUtrError(res.data.error || 'Failed to submit UTR.');
      }
    } catch (err: any) {
      setUtrError(err.response?.data?.error || 'Connection failed.');
    } finally {
      setIsVerifyingUtr(false);
    }
  };

 const formatUploadedAt = (pdf: PDF) => {
 const value = pdf.documentDate || pdf.createdAt;
 if (!value) return'Date unavailable';
 const parsed = parseISO(value);
 if (!isValid(parsed)) return'Date unavailable';
 return format(parsed,'MMM d, yyyy');
 };

 return (
 <section className="py-24 bg-white dark:bg-[#0B132B] transition-colors dark:bg-slate-900" id="documents">
 <div className="container mx-auto px-4 md:px-8">
 <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
 <div className="space-y-4">
 <h2 className="font-display text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
 Verified <span className="text-orange-600 italic">Intelligence</span>
 </h2>
 <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 px-3 py-1.5 rounded-lg w-fit">
 <ShieldCheck className="h-3 w-3 text-green-600" />
 All maps cross-verified with official DSIRDA releases
 </div>
 <div className="flex flex-wrap gap-2 pt-2">
 {tabs.map(tab => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={cn(
"px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2",
 activeTab === tab.id 
 ?"bg-orange-600 border-orange-600 text-white shadow-xl shadow-orange-600/10 dark:shadow-orange-600/50"
 
 :"bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-orange-600 hover:text-orange-600"
 )}
 >
 {tab.label}
 </button>
 ))}

 {!isSelectionMode && !verifiedLead && (
  <button
  onClick={() => setIsSelectionMode(true)}
  className="px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 border-dashed border-slate-200 text-slate-400 hover:border-orange-600 hover:text-orange-600 flex items-center gap-2"
  >
  <ShieldCheck className="h-3 w-3" /> Select Multiple
  </button>
  )}
 </div>
 </div>
 
 <div className="relative w-full md:w-96">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
 <input
 type="text"
 placeholder={t('search_placeholder')}
 className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white outline-none focus:border-orange-600 focus:bg-white dark:focus:bg-slate-950 transition-all"
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 />
 </div>
 </div>

 {loading ? (
 <div className="flex flex-col items-center py-20 gap-4">
 <div className="h-10 w-10 border-4 border-slate-100 border-t-orange-600 rounded-full animate-spin" />
 <span className="font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 animate-pulse">Scanning Archives...</span>
 </div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
 {filtered.map(pdf => {
 const isSelected = selectedPdfs.includes(pdf.id);
 const isFree = String(pdf.id) ==='19';
 const hasAccess = !!verifiedLead || isFree;
 
 return (
 <div 
 key={pdf.id}
 onClick={() => {
    if (!isSelectionMode) {
      handlePdfClick(pdf.id, 'view');
    } else {
      toggleSelection(pdf.id);
    }
  }}
 className={cn(
"group flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border dark:border-slate-800 transition-all relative cursor-pointer select-none",
 isSelected ?"border-orange-600 ring-4 ring-orange-500/10 shadow-2xl" :"border-slate-100 shadow-xl shadow-slate-200/10 hover:shadow-2xl hover:-translate-y-2",
 isSelectionMode && isFree &&"opacity-50 cursor-not-allowed"
 )}
 >
 <div className="mb-6 aspect-[4/3] rounded-2xl bg-white dark:bg-slate-950 flex items-center justify-center relative overflow-hidden border border-slate-50 dark:border-slate-800">
 <FileText className={cn("h-16 w-16 transition-all duration-500", isSelected ?"text-orange-600 scale-110" :"text-slate-200 dark:text-slate-700 group-hover:scale-110")} />
 
 {isSelectionMode && !isFree && (
 <div className={cn(
"absolute top-4 left-4 h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all",
 isSelected ?"bg-orange-600 border-orange-600 text-white" :"bg-white/80 dark:bg-slate-900/80 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
 )}>
 {isSelected && <ShieldCheck className="h-5 w-5" />}
 </div>
 )}
 </div>

 <div className="flex-1 flex flex-col space-y-4">
 <div className="flex items-center justify-between">
 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">
 {pdf.category}
 </span>
 <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
 <Calendar className="h-3 w-3" />
 {formatUploadedAt(pdf)}
 </div>
 </div>
 <h3 className="font-display text-xl font-black text-slate-900 dark:text-white leading-tight line-clamp-2">
 {pdf.title}
 </h3>
 
 <div className="pt-2 mt-auto">
  {!hasAccess && !isSelectionMode ? (
  <button 
  onClick={(e) => { e.stopPropagation(); handlePdfClick(pdf.id,'view'); }}
  className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] bg-orange-600 text-white hover:bg-orange-500 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95"
  >
  <Lock className="h-4 w-4" /> Verify Mobile to View
  </button>
  ) : (
  <button 
  onClick={(e) => { e.stopPropagation(); handlePdfClick(pdf.id); }}
  className={cn(
 "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2",
  isSelected ?"bg-orange-600 text-white" :"bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-orange-600 hover:text-white shadow-sm"
  )}
  >
  {isSelectionMode ? (isSelected ?'Selected' :'Select PDF') :'Open Vault'}
  </button>
  )}
 </div>
 </div>
 </div>
 );
 })}
 </div>
 )}
 </div>

  {/* Floating Bulk Checkout Bar */}
  {isSelectionMode && (
   <div className="fixed bottom-10 inset-x-0 z-[150] px-4 animate-in slide-in-from-bottom-10">
   <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 pr-6 flex flex-col md:flex-row items-center justify-between shadow-2xl border border-white/10 backdrop-blur-xl gap-4">
   <div className="flex items-center gap-6 pl-4">
   <button onClick={() => { setIsSelectionMode(false); setSelectedPdfs([]); }} className="text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-white transition-colors">
   <X className="h-6 w-6" />
   </button>
   <div className="flex flex-col">
   <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Selection Mode</span>
   <span className="text-sm font-bold text-slate-900 dark:text-white">{selectedPdfs.length} Documents Selected</span>
   </div>
   <button 
   onClick={() => {
   const allIds = filtered.filter(p => String(p.id) !=='19').map(p => p.id);
   setSelectedPdfs(allIds);
   }}
   className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 transition-colors border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg"
   >
   Select All in Category
   </button>
   </div>
   
   <div className="flex flex-wrap items-center gap-3">
   <button 
   onClick={() => {
     setSelectedPdfs(['0']);
     setTimeout(() => handleBulkPay(), 50);
   }}
   className="border-2 border-orange-600 hover:bg-orange-600 hover:text-white text-orange-600 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95"
   >
     Unlock All Maps (₹499)
   </button>
   <button 
   onClick={handleBulkPay}
   className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-600/10 active:scale-95"
   >
   {verifiedLead ? `Unlock Selection (₹${selectionTotal})` : 'Verify Mobile to Unlock'}
   </button>
   </div>
   </div>
   </div>
   )}

  {/* Bulk UPI Checkout Modal */}
  {showBulkCheckout && (
  <div className="fixed inset-0 z-[400] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-6">
  <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-center shadow-2xl border border-slate-100 dark:border-slate-800">
  <div className="h-20 w-20 bg-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-orange-500/20">
  <ShieldCheck className="h-10 w-10 text-orange-600" />
  </div>
  
  <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">
    {selectedPdfs.includes('0') ? 'Unlock All Documents' : `Unlock ${selectedPdfs.length} Documents`}
  </h3>
  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">Secure UPI Payment Required</p>

  <div className="space-y-4">
  <div className="p-6 bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
  <div className="text-left">
  <p className="text-[10px] font-black text-slate-400 uppercase">{selectionType ==='view' ?'Streaming' :'Full Download'} Access</p>
  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 uppercase">
    {selectedPdfs.includes('0') ? 'LIFETIME PRO ACCESS' : `${selectedPdfs.length} PREMIUM FILES`}
  </p>
  </div>
  <p className="text-3xl font-black italic text-orange-600">₹{calculatedTotal || selectionTotal}</p>
  </div>

  {!utrSubmitted ? (
    <form onSubmit={handleVerifyUtr} className="space-y-4 text-left">
      <div className="p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10 text-center">
        <span className="block text-[8px] font-black uppercase tracking-widest text-slate-500">Scan QR or Click to Pay</span>
        <a 
        href={`upi://pay?pa=solankiparesh1183@okaxis&pn=Dholera%20Platform&am=${calculatedTotal || selectionTotal}.00&cu=INR&tn=Bulk_Unlock_${tempTxnId}`}
        className="text-xs font-black text-[#FF7A00] hover:underline block mt-1 text-center"
        >
          UPI ID: solankiparesh1183@okaxis
        </a>
      </div>

      <div className="space-y-2">
        <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">Enter UPI Ref No. / UTR No.</label>
        <input 
          type="text"
          placeholder="12-DIGIT TRANSACTION UTR"
          required
          maxLength={14}
          className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-orange-600 transition-all text-center uppercase tracking-widest"
          value={utr}
          onChange={(e) => setUtr(e.target.value.replace(/\D/g,''))}
        />
      </div>

      {utrError && <p className="text-[9px] font-bold text-red-500 uppercase px-1 text-center">{utrError}</p>}

      <button 
        type="submit"
        disabled={isVerifyingUtr || utr.length < 10}
        className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95"
      >
        {isVerifyingUtr ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit UTR for Approval'}
      </button>

      <a 
      href={`https://wa.me/917435808031?text=Paid%20Rs.${calculatedTotal || selectionTotal}%20for%20access.%20Transaction%20ID:%20${tempTxnId}.%20UTR:%20${utr}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full border-2 border-green-500/20 hover:bg-green-500/5 text-green-500 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all text-center active:scale-95"
      >
        Submit via WhatsApp
      </a>
    </form>
  ) : (
    <div className="py-6 space-y-4">
      <div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto text-green-500">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <p className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">UTR Submitted!</p>
      <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed tracking-wide">Admin will verify the payment and grant access within 5-10 minutes.</p>
    </div>
  )}

  <button 
  type="button"
  onClick={() => setShowBulkCheckout(false)} 
  className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-white transition-all"
  >
    Close
  </button>
  </div>
  </div>
  </div>
  )}

 {showVerifyPopup && (
 <LeadPopup
 sessionId={sessionId || undefined}
 fingerprint={fingerprint || undefined}
 compulsory={false}
 onSuccess={handleAuthSuccess}
 onClose={() => {
 setShowVerifyPopup(false);
 setTimeout(() => {
 if (postLoginAction ==='view') {
 setShowViewer(true);
 } else if (postLoginAction ==='bulk_pay') {
 setShowBulkCheckout(true);
 }
 setPostLoginAction(null);
 }, 400);
 }}
 title="Limited Time Offer"
 subtitle="Complete your mobile verification to unlock and view any PDF document instantly"
 />
 )}
 
 {showViewer && selectedPdfId && (
 <SecurePdfViewer
 key={`${selectedPdfId}-${preSelectedType}`}
 pdfId={selectedPdfId}
 onClose={() => setShowViewer(false)}
 initialType={preSelectedType}
 />
 )}
 </section>
 );
}
