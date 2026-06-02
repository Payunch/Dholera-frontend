"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { X, FileText, Loader2, Lock, ShieldCheck, ExternalLink, AlertCircle, MessageSquare } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';
import { safeLocalStorage } from '@/utils/storage';
import { useLead } from '@/providers/LeadProvider';
import { UpiQrModal } from '@/components/payment/UpiQrModal';

interface SecurePdfViewerProps {
  pdfId: string;
  onClose: () => void;
  refreshToken?: number;
}

export const SecurePdfViewer = ({ pdfId, onClose, refreshToken }: SecurePdfViewerProps) => {
  const [mounted, setMounted] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requiresPayment, setRequiresPayment] = useState(false);
  const [requiresRegistration, setRequiresRegistration] = useState(false);
  
  const [showUpiModal, setShowUpiModal] = useState(false);

  const { logoutLead } = useLead();

  const [clientData, setClientData] = useState({
    token: '',
    fingerprint: '',
    leadEmail: 'Guest',
    leadPhone: 'Guest',
    isMobile: false
  });

  useEffect(() => {
    setMounted(true);
    const token = safeLocalStorage.getItem('lead_token') || '';
    const fingerprint = safeLocalStorage.getItem('visitorFingerprint') || '';
    const leadEmail = safeLocalStorage.getItem('lead_email') || 'Guest';
    const leadPhone = safeLocalStorage.getItem('lead_phone') || 'Guest';
    
    const checkMobile = () => {
      if (typeof navigator === 'undefined') return false;
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 0 && /Macintosh/i.test(navigator.userAgent));
    };

    setClientData({
      token,
      fingerprint,
      leadEmail,
      leadPhone,
      isMobile: checkMobile()
    });
  }, []);

  const { token, fingerprint, leadEmail, leadPhone, isMobile } = clientData;

  const directUrl = useMemo(() => `${API_BASE_URL}/pdf/view/${pdfId}?token=${token}`, [pdfId, token]);

  const fetchPdf = useCallback(async () => {
    if (!mounted) return;
    setLoading(true);
    setError(null);
    setRequiresPayment(false);
    try {
      if (!token) throw new Error('Verification required to access this document.');

      const res = await fetch(`${API_BASE_URL}/pdf/view/${pdfId}`, {
        headers: { 'Authorization': token || '' }
      });

      if (res.status === 402) {
        setRequiresPayment(true);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Server error' }));
        if (errData.trialLimitReached) {
          setRequiresRegistration(true);
          setLoading(false);
          return;
        }
        throw new Error(errData.error || `Failed to load document (${res.status})`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
    } catch (err) {
      console.error('SecurePdfViewer Fetch Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load document.');
    } finally {
      setLoading(false);
    }
  }, [pdfId, token, mounted]);

  useEffect(() => {
    if (!pdfId || !mounted) return;
    fetchPdf();
  }, [fetchPdf, pdfId, mounted]);

  useEffect(() => {
    if (!pdfId || !refreshToken || !mounted) return;
    fetchPdf();
  }, [fetchPdf, pdfId, refreshToken, mounted]);

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  const handleNotifyAdmin = () => {
    const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE || '917435808310';
    const message = `Hello Admin, I have paid ₹499 for PRO ACCESS to all archives. \n\nMy Phone: ${leadPhone}\nMy Email: ${leadEmail}\n\nPlease unlock my access.`;
    window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!mounted) return null;

  const displayError = !pdfId ? 'Invalid document ID' : error;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-slate-950/95 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900 px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-orange-500" />
          <span className="text-xs font-black uppercase tracking-widest text-white hidden sm:inline">
            Secure Viewer (Watermarked)
          </span>
        </div>
        <div className="flex items-center gap-4">
          {!loading && !error && isMobile && (
             <button onClick={() => window.open(directUrl, '_blank')} className="rounded-full bg-orange-600 px-4 py-1.5 text-xs font-black uppercase text-white hover:bg-orange-500 transition-colors">
               Full Screen
             </button>
          )}
          <button onClick={onClose} className="rounded-full p-2 bg-white/5 text-slate-400 hover:text-white hover:bg-red-500/20 transition-all">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {loading && <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />}
        
        {requiresPayment && (
          <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-center mb-6">
               <div className="h-20 w-20 rounded-3xl bg-orange-50 flex items-center justify-center">
                 <Lock className="h-10 w-10 text-orange-600" />
               </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Access Limit Reached</h3>
            <p className="text-slate-500 font-medium mb-8">
              Only the test document is free. Please unlock the premium archive for unlimited access to DSIRDA maps & brochures.
            </p>
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 border-2 border-dashed border-slate-200">
               <span className="block text-4xl font-black text-orange-600">₹499.00</span>
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lifetime Intelligence Hub</span>
            </div>
            <button 
              onClick={() => setShowUpiModal(true)}
              className="w-full rounded-2xl bg-orange-600 py-5 text-white font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-3"
            >
              Pay via UPI QR <ShieldCheck className="h-5 w-5" />
            </button>
            <button onClick={onClose} className="mt-4 text-sm font-bold text-slate-400 hover:text-slate-600">Cancel</button>
          </div>
        )}

        {showUpiModal && (
          <UpiQrModal
            upiId={process.env.ADMIN_UPI_ID || 'dholeraplatform@okicici'}
            amount={499}
            merchantName={process.env.ADMIN_NAME || 'Dholera Platform'}
            onClose={() => setShowUpiModal(false)}
            onNotify={handleNotifyAdmin}
          />
        )}

        {displayError && !requiresPayment && (
          <div className="max-w-sm w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-xl font-black text-slate-900 uppercase mb-2">Access Denied</h3>
            <p className="text-slate-500 font-medium mb-8">{displayError}</p>
            <button onClick={onClose} className="w-full rounded-2xl bg-slate-900 py-4 text-white font-black uppercase tracking-widest">Close Viewer</button>
          </div>
        )}

        {!loading && !displayError && blobUrl && (
          <div className="relative w-full h-full max-w-6xl bg-white shadow-2xl overflow-hidden rounded-xl flex flex-col">
            {/* Watermark Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] grid grid-cols-2 md:grid-cols-3 grid-rows-4 overflow-hidden">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className="flex items-center justify-center -rotate-45 text-[10px] md:text-sm font-black text-slate-950 uppercase text-center">
                   {leadPhone} <br/> {leadEmail}
                 </div>
               ))}
            </div>

            {/* Always try to show iframe, but provide a download/open button for mobile as backup */}
            <div className="flex-1 flex flex-col relative">
              {isMobile && (
                <div className="absolute top-4 right-4 z-30">
                  <a 
                    href={directUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-slate-900/80 backdrop-blur-sm px-4 py-2 text-[10px] font-black uppercase text-white hover:bg-orange-600 transition-all"
                  >
                    Full Screen <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              
              <div className="absolute top-0 inset-x-0 h-14 z-20 cursor-not-allowed" title="Toolbar restricted" />
              <iframe 
                src={`${blobUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="flex-1 w-full border-none h-full"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
