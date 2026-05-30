"use client";

import React, { useState, useEffect } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { useLead } from '@/providers/LeadProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { API_BASE_URL } from '@/lib/api';
import { SecurePdfViewer } from '@/components/pdf/SecurePdfViewer';
import { LeadPopup } from '@/components/leads/LeadPopup';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { Calendar, FileText, Lock, Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PDF {
  id: string;
  title: string;
  category: string;
  createdAt?: string;
  documentDate?: string;
}

import { useSearchParams, useRouter } from 'next/navigation';

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

  const status = searchParams.get('payment_status');
  const paymentPdfId = searchParams.get('pdfId');
  const hasPaymentSuccess = status === 'success' && Boolean(paymentPdfId);
  const viewerPdfId = selectedPdfId ?? (hasPaymentSuccess ? paymentPdfId : null);
  const viewerOpen = showViewer || hasPaymentSuccess;

  useEffect(() => {
    if (status === 'success' && paymentPdfId) {
      router.replace('/pdfs', { scroll: false });
    } else if (status === 'failed') {
      alert('Payment failed. Please try again.');
      router.replace('/pdfs', { scroll: false });
    }
  }, [status, paymentPdfId, router]);

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
    setSelectedPdfId(pdfId);
    if (verifiedLead) {
      setShowViewer(true);
    } else {
      setShowVerifyPopup(true);
    }
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
            <Loader2 className="h-10 w-10 text-orange-600 animate-spin" />
            <span className="font-black uppercase tracking-widest text-slate-400 animate-pulse">Scanning Archives...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map(pdf => (
              <div 
                key={pdf.id}
                className="group flex flex-col bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-orange-600/5 hover:border-orange-200 transition-all hover:-translate-y-2"
              >
                <div className="mb-6 aspect-[4/3] rounded-2xl bg-slate-50 flex items-center justify-center relative overflow-hidden border border-slate-50">
                   <FileText className="h-16 w-16 text-slate-200 group-hover:scale-110 transition-transform duration-500" />
                   {!verifiedLead && (
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
                      onClick={() => handlePdfClick(pdf.id)}
                      className={cn(
                        "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2",
                        verifiedLead 
                          ? "bg-slate-900 text-white hover:bg-orange-600 shadow-lg shadow-slate-900/10" 
                          : "bg-orange-600 text-white hover:bg-orange-500 shadow-lg shadow-orange-600/10"
                      )}
                    >
                      {verifiedLead ? t('btn_view') : t('btn_unlock')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showVerifyPopup && (
        <LeadPopup
          sessionId={sessionId || undefined}
          fingerprint={fingerprint || undefined}
          compulsory={true}
          onSuccess={() => { setShowVerifyPopup(false); setShowViewer(true); }}
        />
      )}
      
      {viewerOpen && viewerPdfId && (
        <SecurePdfViewer pdfId={viewerPdfId} onClose={() => setShowViewer(false)} />
      )}
    </section>
  );
}
