"use client";

import React, { useState, useEffect } from 'react';
import { useLead } from '@/providers/LeadProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { API_BASE_URL } from '@/lib/api';
import { SecurePdfViewer } from '@/components/pdf/SecurePdfViewer';
import { LeadPopup } from '@/components/leads/LeadPopup';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { FileText, Lock, Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PDF {
  id: string;
  title: string;
  category: string;
}

export function PdfListing() {
  const { verifiedLead } = useLead();
  const { t } = useLanguage();
  const { sessionId, fingerprint } = useVisitorTracking();

  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  
  const [selectedPdfId, setSelectedPdfId] = useState<string | null>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/pdf/list`)
      .then(res => res.json())
      .then(data => setPdfs(Array.isArray(data) ? data : []))
      .catch(console.error)
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

  return (
    <section className="py-20 bg-slate-50" id="documents">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              Verified <span className="text-orange-600 italic">Intelligence</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                    activeTab === tab.id 
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" 
                      : "bg-white text-slate-400 hover:text-slate-900 border border-slate-200"
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
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 font-bold outline-none focus:border-orange-600 transition-all"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(pdf => (
              <div 
                key={pdf.id}
                className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-orange-600/10 transition-all hover:-translate-y-1"
              >
                <div className="mb-6 aspect-[4/3] rounded-2xl bg-slate-50 flex items-center justify-center relative overflow-hidden">
                   <FileText className="h-16 w-16 text-slate-200 group-hover:scale-110 transition-transform duration-500" />
                   {!verifiedLead && (
                     <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white shadow-lg">
                       <Lock className="h-4 w-4" />
                     </div>
                   )}
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    {pdf.category}
                  </span>
                  <h3 className="font-black text-slate-900 leading-tight min-h-[3rem] line-clamp-2">
                    {pdf.title}
                  </h3>
                  <button 
                    onClick={() => handlePdfClick(pdf.id)}
                    className={cn(
                      "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2",
                      verifiedLead 
                        ? "bg-slate-900 text-white hover:bg-orange-600" 
                        : "bg-orange-600 text-white hover:bg-orange-500"
                    )}
                  >
                    {verifiedLead ? t('btn_view') : t('btn_unlock')}
                  </button>
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
      
      {showViewer && selectedPdfId && (
        <SecurePdfViewer pdfId={selectedPdfId} onClose={() => setShowViewer(false)} />
      )}
    </section>
  );
}
