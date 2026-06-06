"use client";

import React, { useState, useEffect } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { useLead } from '@/providers/LeadProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { API_BASE_URL, apiClient } from '@/lib/api';
import { SecurePdfViewer } from '@/components/pdf/SecurePdfViewer';
import { LeadPopup } from '@/components/leads/LeadPopup';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { Calendar, FileText, Lock, Search, ShieldCheck, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';
import { RazorpayCheckout } from '@/components/payment/RazorpayCheckout';

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
  
  // Calculate if user is Pro based on both profile and purchase history
  const isPro = verifiedLead?.is_pro || purchasedPdfIds.includes('0');
  
  const [selectedPdfId, setSelectedPdfId] = useState<string | null>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [postLoginAction, setPostLoginAction] = useState<'view' | null>(null);

  const fetchPurchases = React.useCallback(() => {
    if (!verifiedLead?.token) return;
    apiClient.get('/payment/my-purchases')
    .then(res => {
      const data = res.data;
      if (data.success && data.purchases) {
        const completed = data.purchases
          .filter((p: any) => p.status === 'completed')
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

  const tabs = [
    { id: 0, label: t('pdf_cat_official'), keywords: ['pdf', 'brochure', 'legal', 'general'] },
    { id: 1, label: t('pdf_cat_naksha'), keywords: ['naksha', 'tp'] },
    { id: 2, label: t('pdf_cat_dp'), keywords: ['dp', 'map'] },
  ];

  const filtered = pdfs.filter(pdf => {
    const cat = (pdf.category || '').toLowerCase();
    const matchesTab = tabs[activeTab].keywords.some(k => cat.includes(k));
    const matchesSearch = !search || 
      `${pdf.title} ${pdf.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handlePdfClick = (pdfId: string) => {
    const freeTrialId = process.env.NEXT_PUBLIC_FREE_TRIAL_PDF_ID || '19';
    const isFree = String(pdfId) === String(freeTrialId);

    setSelectedPdfId(pdfId);
    
    if (isFree || verifiedLead) {
      setShowViewer(true);
    } else {
      setPostLoginAction('view');
      setShowVerifyPopup(true);
    }
  };

  const handleAuthSuccess = (data?: any) => {
    setShowVerifyPopup(false);
    
    setTimeout(() => {
      if (postLoginAction === 'view') {
        setShowViewer(true);
      }
      setPostLoginAction(null);
    }, 400);
  };

  const handleCheckout = async () => {
    if (!verifiedLead) {
      setPostLoginAction('checkout');
      setShowVerifyPopup(true);
      return;
    }
    setShowRazorpay(true);
  };

  const handleBuyAll = async () => {
    if (!verifiedLead) {
      setPostLoginAction('buy_all');
      setShowVerifyPopup(true);
      return;
    }
    const allIds = filtered.filter(p => String(p.id) !== '19').map(p => p.id);
    setSelectedPdfs(allIds);
    setShowRazorpay(true);
  };

  const handlePaymentSuccess = () => {
    setShowRazorpay(false);
    setIsSelectionMode(false);
    setSelectedPdfs([]);
    fetchPurchases();
  };

  const formatUploadedAt = (pdf: PDF) => {
    const value = pdf.documentDate || pdf.createdAt;
    if (!value) return 'Date unavailable';
    const parsed = parseISO(value);
    if (!isValid(parsed)) return 'Date unavailable';
    return format(parsed, 'MMM d, yyyy');
  };

  return (
    <section className="py-24 bg-white dark:bg-[#0B132B] transition-colors" id="documents">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="font-display text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              Verified <span className="text-orange-600 italic">Intelligence</span>
            </h2>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg w-fit">
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
                      ? "bg-orange-600 border-orange-600 text-white shadow-xl shadow-orange-600/20" 
                      : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-orange-600 hover:text-orange-600"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Removed Pro Membership Card */}
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white outline-none focus:border-orange-600 focus:bg-white dark:focus:bg-slate-950 transition-all"
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
              const isFree = String(pdf.id) === '19';
              const isPurchased = purchasedPdfIds.includes(String(pdf.id));
              
              return (
                <div 
                  key={pdf.id}
                  onClick={() => handlePdfClick(pdf.id)}
                  className={cn(
                    "group flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] p-6 border dark:border-slate-800 transition-all cursor-pointer relative",
                    isSelected ? "border-orange-600 ring-4 ring-orange-500/10 shadow-2xl" : "border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-2",
                    isSelectionMode && isFree && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="mb-6 aspect-[4/3] rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center relative overflow-hidden border border-slate-50 dark:border-slate-800">
                    <FileText className={cn("h-16 w-16 transition-all duration-500", isSelected ? "text-orange-600 scale-110" : "text-slate-200 dark:text-slate-700 group-hover:scale-110")} />
                     
                     {isSelectionMode && !isFree && (
                       <div className={cn(
                         "absolute top-4 left-4 h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all",
                         isSelected ? "bg-orange-600 border-orange-600 text-white" : "bg-white/80 dark:bg-slate-900/80 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                       )}>
                         {isSelected && <ShieldCheck className="h-5 w-5" />}
                       </div>
                     )}

                     {/* Hide lock if user is Pro OR if it's free OR if user purchased it */}
                     {(!verifiedLead?.is_pro && !isFree && !isSelected && !isPurchased) && (
                       <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white shadow-lg">
                         <Lock className="h-4 w-4" />
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
                      <button 
                        onClick={(e) => { e.stopPropagation(); handlePdfClick(pdf.id); }}
                        className={cn(
                          "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2",
                          isSelected ? "bg-orange-600 text-white" : (verifiedLead ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:text-white hover:bg-orange-600" : "bg-orange-600 text-white hover:bg-orange-500")
                        )}
                      >
                        {isSelectionMode ? (isSelected ? 'Selected' : 'Select PDF') : (verifiedLead ? t('btn_view') : t('btn_unlock'))}
                      </button>
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
          compulsory={true}
          onSuccess={handleAuthSuccess}
        />
      )}
      
      {showViewer && selectedPdfId && (
        <SecurePdfViewer
          pdfId={selectedPdfId}
          onClose={() => setShowViewer(false)}
        />
      )}
    </section>
  );
}
