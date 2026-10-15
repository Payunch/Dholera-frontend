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



export function PdfListing() {
 const { verifiedLead } = useLead();
 const { t } = useLanguage();
 const { sessionId, fingerprint } = useVisitorTracking();
 
 const [pdfs, setPdfs] = useState([]);
 const [loading, setLoading] = useState(true);
 const [activeTab, setActiveTab] = useState(0);
 const [search, setSearch] = useState('');
 const [purchasedPdfIds, setPurchasedPdfIds] = useState([]);
 
 const [selectedPdfId, setSelectedPdfId] = useState(null);
 const [preSelectedType, setPreSelectedType] = useState('view');
 const [showViewer, setShowViewer] = useState(false);
 const [showVerifyPopup, setShowVerifyPopup] = useState(false);
 const [postLoginAction, setPostLoginAction] = useState(null);

 // Selection Mode State
 const [isSelectionMode, setIsSelectionMode] = useState(false);
 const [selectionType, setSelectionType] = useState('view');
 const [selectedPdfs, setSelectedPdfs] = useState([]);
 const [showBulkCheckout, setShowBulkCheckout] = useState(false);

 const [tempTxnId, setTempTxnId] = useState(null);
 const [calculatedTotal, setCalculatedTotal] = useState(0);
 const [utr, setUtr] = useState('');
 const [isVerifyingUtr, setIsVerifyingUtr] = useState(false);
 const [utrSubmitted, setUtrSubmitted] = useState(false);
 const [utrError, setUtrError] = useState(null);

 const pricePerPdf = selectionType ==='download' ? 300 : 150;
 const selectionTotal = Math.min(selectedPdfs.length * pricePerPdf, 499);

  useEffect(() => {
  apiClient.get('/pdf/list')
  .then(res => setPdfs(Array.isArray(res.data) ? res.data : []))
  .catch(err => console.error('PDF Listing Error:', err))
  .finally(() => setLoading(false));
  }, []);

  // Auto popup trigger on load has been removed as per user request

 const tabs = [
 { id: 0, label: t('pdf_cat_official'), keywords: ['pdf','brochure','legal','general'] },
 { id: 1, label: t('pdf_cat_naksha'), keywords: ['naksha','tp'] },
 { id: 2, label: t('pdf_cat_dp'), keywords: ['dp','map'] },
 ];

 const filtered = pdfs.filter(pdf => {
   const titleLower = (pdf.title || '').toLowerCase();
   if (titleLower.includes('test') || titleLower.includes('mutool') || /^file\s+[a-z0-9]+/i.test(titleLower)) {
     return false;
   }
   const cat = (pdf.category || '').toLowerCase();
   const matchesTab = tabs[activeTab].keywords.some(k => cat.includes(k));
   const matchesSearch = !search || 
     `${pdf.title} ${pdf.category}`.toLowerCase().includes(search.toLowerCase());
   return matchesTab && matchesSearch;
 });

 const handlePdfClick = (pdfId, type = 'view') => {
   if (isSelectionMode) {
     toggleSelection(pdfId);
     return;
   }

   const freeTrialId = process.env.NEXT_PUBLIC_FREE_TRIAL_PDF_ID || '19';
   const isFree = false; // All PDFs require mobile verification

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

 const toggleSelection = (pdfId) => {
 if (pdfId ==='19') return; // Free PDF
 setSelectedPdfs(prev => 
 prev.includes(pdfId) 
 ? prev.filter(id => id !== pdfId) 
 : [...prev, pdfId]
 );
 };

 const handleAuthSuccess = (data) => {
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

  const handleVerifyUtr = async (e) => {
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
    } catch (err) {
      setUtrError(err.response?.data?.error || 'Connection failed.');
    } finally {
      setIsVerifyingUtr(false);
    }
  };

 const formatUploadedAt = (pdf) => {
 const value = pdf.documentDate || pdf.createdAt;
 if (!value) return'Date unavailable';
 const parsed = parseISO(value);
 if (!isValid(parsed)) return'Date unavailable';
 return format(parsed,'MMM d, yyyy');
 };

 return (
 <section className="py-24 bg-[#F8FAFC] dark:bg-[#0B0F19] transition-colors" id="documents">
 <div className="container mx-auto px-4 md:px-8">
 <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
 <div className="space-y-4">
 <h2 className="font-display text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
 Verified <span className="text-orange-600 italic">Intelligence</span>
 </h2>
 <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg w-fit">
 <ShieldCheck className="h-3 w-3 text-green-600" />
 All maps cross-verified with official DSIRDA releases
 </div>
 <div className="flex flex-wrap gap-2 pt-2">
 {tabs.map(tab => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={cn(
"px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
 activeTab === tab.id 
 ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-md font-black"
 : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-transparent dark:border-slate-700/60"
 )}
 >
 {tab.label}
 </button>
 ))}


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
 const isFree = false;
 const hasAccess = !!verifiedLead;
 const catLower = (pdf.category || '').toLowerCase();
 const titleLower = (pdf.title || '').toLowerCase();
 const isMasterPlan = catLower.includes('tp') || catLower.includes('naksha') || catLower.includes('dp') || catLower.includes('map') || titleLower.includes('master') || titleLower.includes('town planning') || titleLower.includes('scheme') || activeTab > 0;
 
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
 isSelected ? "border-orange-600 ring-4 ring-orange-500/10 shadow-2xl" : "border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-orange-500/50 hover:-translate-y-1.5",
 isSelectionMode && isFree &&"opacity-50 cursor-not-allowed"
 )}
 >
 <div className="mb-6 aspect-[4/3] rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/90 dark:from-slate-950 dark:to-slate-900/90 flex flex-col items-center justify-center relative overflow-hidden border border-slate-200/80 dark:border-slate-800 group-hover:border-orange-500/50 transition-colors">
   <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
   <div className="h-16 w-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-md flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
     <FileText className={cn("h-8 w-8 transition-colors", isSelected ? "text-[#FF7A00]" : isMasterPlan ? "text-[#FF7A00]" : "text-slate-700 dark:text-slate-300")} />
   </div>
   <span className="mt-3 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
     {isMasterPlan ? "Town Planning Archive" : "Government Document"}
   </span>
 
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
    isMasterPlan ? (
      <button 
        onClick={(e) => { e.stopPropagation(); handlePdfClick(pdf.id,'view'); }}
        className="w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] bg-[#FF7A00] hover:bg-orange-600 text-white transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-orange-600/20 active:scale-95"
      >
        <Lock className="h-3.5 w-3.5" /> Unlock Master Plan
      </button>
    ) : (
      <button 
        onClick={(e) => { e.stopPropagation(); handlePdfClick(pdf.id,'view'); }}
        className="w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700/60 transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-95"
      >
        <FileText className="h-3.5 w-3.5 text-[#FF7A00]" /> Verify & Access PDF
      </button>
    )
  ) : (
  <button 
  onClick={(e) => { e.stopPropagation(); handlePdfClick(pdf.id); }}
  className={cn(
 "w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2",
  isSelected 
    ? "bg-orange-600 text-white shadow-md shadow-orange-600/20" 
    : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm"
  )}
  >
  {isSelectionMode ? (isSelected ? 'Selected' : 'Select PDF') : (
    <>
      <Eye className="h-3.5 w-3.5 text-emerald-500" /> Open Document
    </>
  )}
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



 {showVerifyPopup && (
 <LeadPopup
 sessionId={sessionId || undefined}
 fingerprint={fingerprint || undefined}
 compulsory={false}
 onSuccess={handleAuthSuccess}
 onClose={() => {
   setShowVerifyPopup(false);
   setPostLoginAction(null);
 }}
 title="Instant Document Access"
 subtitle="Verify your mobile number to unlock instant high-resolution viewing and downloads for all official DSIRDA Town Planning and Development Plan gazettes."
 showCountdown={false}
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
