"use client";

import React, { useState, useEffect } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { useLead } from '@/providers/LeadProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { API_BASE_URL } from '@/lib/api';
import { SecurePdfViewer } from '@/components/pdf/SecurePdfViewer';
import { LeadPopup } from '@/components/leads/LeadPopup';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { Calendar, FileText, Lock, Search, ShieldCheck, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';
import { UpiQrModal } from '@/components/payment/UpiQrModal';

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  
  const [selectedPdfId, setSelectedPdfId] = useState<string | null>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);

  // Selection Mode State
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedPdfs, setSelectedPdfs] = useState<string[]>([]);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [upiOrderDetails, setUpiOrderDetails] = useState<{
    amount: number;
    title: string;
  } | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/pdf/list`)
      .then(async res => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server returned ${res.status}`);
        }
        return res.json();
      })
      .then(data => setPdfs(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('PDF Listing Error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

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
    if (isSelectionMode) {
      toggleSelection(pdfId);
      return;
    }
    setSelectedPdfId(pdfId);
    if (verifiedLead) {
      setShowViewer(true);
    } else {
      setShowVerifyPopup(true);
    }
  };

  const toggleSelection = (pdfId: string) => {
    if (pdfId === '19') return; // Free PDF
    setSelectedPdfs(prev => 
      prev.includes(pdfId) 
        ? prev.filter(id => id !== pdfId) 
        : [...prev, pdfId]
    );
  };

  const handleCheckout = () => {
    if (!verifiedLead) {
      setShowVerifyPopup(true);
      return;
    }
    setUpiOrderDetails({
      amount: selectedPdfs.length * 10,
      title: `SELECTED PDFS (QTY: ${selectedPdfs.length})`
    });
    setShowUpiModal(true);
  };

  const handleNotifyAdmin = (finalAmount: number) => {
    const rawPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE || '917435808310';
    const adminPhone = rawPhone.replace(/\D/g, ''); 
    const message = `Hello Admin, I have paid ₹${finalAmount} for ${upiOrderDetails?.title}. \n\nMy Phone: ${verifiedLead?.phone}\nMy Email: ${verifiedLead?.email}\n\nPlease unlock my access.`;
    window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleManualAccess = () => {
    const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE || '9174358080310';
    const message = `Hello Admin, I am interested in unlocking Pro Access to all intelligence archives. \n\nMy Phone: ${verifiedLead?.phone}\nMy Email: ${verifiedLead?.email}\n\nPlease guide me on the process.`;
    window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const formatUploadedAt = (pdf: PDF) => {
    const value = pdf.documentDate || pdf.createdAt;
    if (!value) return 'Date unavailable';
    const parsed = parseISO(value);
    if (!isValid(parsed)) return 'Date unavailable';
    return format(parsed, 'MMM d, yyyy');
  };

  return (
    <section className="py-24 bg-white" id="documents">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="font-display text-4xl font-black uppercase tracking-tight text-slate-900">
              Verified <span className="text-orange-600 italic">Intelligence</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2",
                    activeTab === tab.id 
                      ? "bg-orange-600 border-orange-600 text-white shadow-xl shadow-orange-600/20" 
                      : "bg-white border-slate-100 text-slate-400 hover:border-orange-600 hover:text-orange-600"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pro Membership Card */}
          <div className="bg-slate-950 rounded-3xl p-6 text-white shadow-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-6">
             <div className="text-center sm:text-left">
               <h4 className="text-sm font-black uppercase tracking-widest text-orange-500">Pro Intelligence</h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Unlimited Access to 50+ documents</p>
               <p className="text-[9px] font-medium text-slate-500 uppercase mt-1 italic">Trial: 1 free document per user</p>
             </div>
             <button 
               onClick={handleManualAccess}
               className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-orange-600/20 whitespace-nowrap"
             >
               {verifiedLead?.is_pro ? 'PRO ACTIVE' : 'Unlock Hub'}
             </button>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 font-bold outline-none focus:border-orange-600 focus:bg-white transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="h-10 w-10 border-4 border-slate-100 border-t-orange-600 rounded-full animate-spin" />
            <span className="font-black uppercase tracking-widest text-slate-400 animate-pulse">Scanning Archives...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
            {filtered.map(pdf => {
              const isSelected = selectedPdfs.includes(pdf.id);
              const isFree = String(pdf.id) === '19';
              
              return (
                <div 
                  key={pdf.id}
                  onClick={() => handlePdfClick(pdf.id)}
                  className={cn(
                    "group flex flex-col bg-white rounded-[2rem] p-6 border transition-all cursor-pointer relative",
                    isSelected ? "border-orange-600 ring-4 ring-orange-500/10 shadow-2xl" : "border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-2",
                    isSelectionMode && isFree && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="mb-6 aspect-[4/3] rounded-2xl bg-slate-50 flex items-center justify-center relative overflow-hidden border border-slate-50">
                     <FileText className={cn("h-16 w-16 transition-all duration-500", isSelected ? "text-orange-600 scale-110" : "text-slate-200 group-hover:scale-110")} />
                     
                     {isSelectionMode && !isFree && (
                       <div className={cn(
                         "absolute top-4 left-4 h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all",
                         isSelected ? "bg-orange-600 border-orange-600 text-white" : "bg-white/80 border-slate-300"
                       )}>
                         {isSelected && <ShieldCheck className="h-5 w-5" />}
                       </div>
                     )}

                     {(!verifiedLead?.is_pro && !isFree && !isSelected) && (
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
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <Calendar className="h-3 w-3" />
                        {formatUploadedAt(pdf)}
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-black text-slate-900 leading-tight line-clamp-2">
                      {pdf.title}
                    </h3>
                    
                    <div className="pt-2 mt-auto">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handlePdfClick(pdf.id); }}
                        className={cn(
                          "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2",
                          isSelected ? "bg-orange-600 text-white" : (verifiedLead ? "bg-slate-900 text-white hover:bg-orange-600" : "bg-orange-600 text-white hover:bg-orange-500")
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

      {/* Floating Checkout Bar */}
      {isSelectionMode && (
        <div className="fixed bottom-10 inset-x-0 z-[150] px-4 animate-in slide-in-from-bottom-10">
           <div className="max-w-2xl mx-auto bg-slate-900 rounded-[2.5rem] p-4 pr-6 flex items-center justify-between shadow-2xl border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-6 pl-4">
                 <button onClick={() => { setIsSelectionMode(false); setSelectedPdfs([]); }} className="text-slate-400 hover:text-white transition-colors">
                    <X className="h-6 w-6" />
                 </button>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Selection Mode</span>
                    <span className="text-sm font-bold text-white">{selectedPdfs.length} Documents Selected</span>
                 </div>
              </div>
              
              <div className="flex items-center gap-6">
                 <div className="text-right">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Total</span>
                    <span className="text-xl font-black text-white">₹{selectedPdfs.length * 10}</span>
                 </div>
                 <button 
                   disabled={selectedPdfs.length === 0}
                   onClick={handleCheckout}
                   className="bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-600/20"
                 >
                   Pay Now & Unlock
                 </button>
              </div>
           </div>
        </div>
      )}

      {showVerifyPopup && (
        <LeadPopup
          sessionId={sessionId || undefined}
          fingerprint={fingerprint || undefined}
          compulsory={true}
          onSuccess={() => { setShowVerifyPopup(false); setShowViewer(true); }}
        />
      )}
      
      {showViewer && selectedPdfId && (
        <SecurePdfViewer
          pdfId={selectedPdfId}
          onClose={() => setShowViewer(false)}
          onStartSelection={() => {
            setShowViewer(false);
            setIsSelectionMode(true);
            if (!selectedPdfs.includes(selectedPdfId)) {
              setSelectedPdfs(prev => [...prev, selectedPdfId]);
            }
          }}
        />
      )}

      {showUpiModal && upiOrderDetails && (
        <UpiQrModal
          upiId={process.env.ADMIN_UPI_ID || '917435808310@ybl'}
          amount={upiOrderDetails.amount}
          merchantName={process.env.ADMIN_NAME || 'Dholera Platform'}
          onClose={() => setShowUpiModal(false)}
          onNotify={handleNotifyAdmin}
        />
      )}
    </section>
  );
}
