"use client";

import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { X, FileText, Loader2, Lock, ShieldCheck, ExternalLink, AlertCircle, ArrowRight } from 'lucide-react';
import { API_BASE_URL, SITE_BASE_URL, apiClient } from '@/lib/api';
import { getCookie } from '@/utils/cookies';
import { RazorpayCheckout } from '@/components/payment/RazorpayCheckout';
import { io, Socket } from 'socket.io-client';

interface SecurePdfViewerProps {
  pdfId: string;
  onClose: () => void;
  onStartSelection?: () => void;
  refreshToken?: number;
}

export const SecurePdfViewer = ({ pdfId, onClose, onStartSelection, refreshToken }: SecurePdfViewerProps) => {
  const [mounted, setMounted] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requiresPayment, setRequiresPayment] = useState(false);
  
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [selectionType, setSelectionType] = useState<'view' | 'download'>('view');

  const [clientData, setClientData] = useState({
    token: '',
    fingerprint: '',
    leadPhone: 'Guest',
    isMobile: false
  });

  const socketRef = useRef<Socket | null>(null);

  const fetchPdf = useCallback(async () => {
    const token = getCookie('lead_token') || '';
    setLoading(true);
    setError(null);
    setRequiresPayment(false);
    
    try {
      const freeTrialId = process.env.NEXT_PUBLIC_FREE_TRIAL_PDF_ID || '19';
      const isTrial = String(pdfId) === String(freeTrialId);

      if (!token && !isTrial) {
        throw new Error('Verification required to access this document.');
      }

      const res = await apiClient.get(`/pdf/view/${pdfId}`, {
        responseType: 'blob'
      });

      const url = URL.createObjectURL(res.data);
      setBlobUrl(url);
    } catch (err: any) {
      let errorData = err.response?.data;

      if (errorData instanceof Blob) {
        try {
          const text = await errorData.text();
          errorData = JSON.parse(text);
        } catch (e) {
          errorData = { error: 'Document access failed' };
        }
      }

      if (err.response?.status === 402) {
        setRequiresPayment(true);
      } else {
        console.error('SecurePdfViewer Fetch Error:', err);
        setError(errorData?.error || 'Failed to load document.');
      }
    } finally {
      setLoading(false);
    }
  }, [pdfId]);

  useEffect(() => {
    setMounted(true);
    const token = getCookie('lead_token') || '';
    const fingerprint = getCookie('visitorFingerprint') || '';
    const leadPhone = getCookie('lead_phone') || 'Guest';
    
    const checkMobile = () => {
      if (typeof navigator === 'undefined') return false;
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 0 && /Macintosh/i.test(navigator.userAgent));
    };

    setClientData({
      token,
      fingerprint,
      leadPhone,
      isMobile: checkMobile()
    });

    // Initial fetch
    if (pdfId) {
      fetchPdf();
    }
  }, [pdfId, fetchPdf]);

  useEffect(() => {
    if (!clientData.token || !mounted) return;

    const socketUrl = (typeof window !== "undefined" && window.location.hostname === "localhost") 
      ? "http://localhost:3001" 
      : SITE_BASE_URL;

    const socket = io(socketUrl, { 
      withCredentials: true,
      transports: ['websocket', 'polling']
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join_lead', clientData.token);
    });

    socket.on('payment_approved', () => {
      fetchPdf();
    });

    return () => {
      socket.disconnect();
    };
  }, [clientData.token, mounted, fetchPdf]);

  useEffect(() => {
    if (refreshToken && mounted && pdfId) {
      fetchPdf();
    }
  }, [refreshToken, mounted, pdfId, fetchPdf]);

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  const handlePaymentSuccess = () => {
    setShowRazorpay(false);
    fetchPdf();
  };

  const { token, leadPhone, isMobile } = clientData;
  const directUrl = useMemo(() => `${API_BASE_URL}/pdf/view/${pdfId}?token=${token}`, [pdfId, token]);

  if (!mounted) return null;

  const displayError = !pdfId ? 'Invalid document ID' : error;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-slate-950/95 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-orange-500" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white hidden sm:inline">
            Secure Intelligence Hub
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
          <div className="max-w-xl w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 flex flex-col md:flex-row">
            <div className="p-10 md:w-1/2 flex flex-col justify-center">
              <div className="h-16 w-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6">
                <Lock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Premium Content</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                This document is part of our exclusive DSIRDA intelligence archive. Choose an option to unlock access.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-green-500" /> 
                  Instant Access
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-green-500" /> 
                  Secure Verification
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:w-1/2 flex flex-col gap-4 border-l border-slate-100">
              <button 
                onClick={() => { setSelectionType('view'); setShowRazorpay(true); }}
                className="group relative flex flex-col items-start p-6 rounded-[1.5rem] bg-white dark:bg-slate-900 text-white hover:bg-orange-600 transition-all text-left shadow-xl hover:-translate-y-1"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">One-Time Access</span>
                <span className="text-lg font-black uppercase tracking-tight">View PDF</span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:text-white/80">Instant unlock after payment.</span>
                <div className="mt-4 flex items-center justify-between w-full">
                   <span className="text-2xl font-black">₹5</span>
                   <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button 
                onClick={() => { setSelectionType('download'); setShowRazorpay(true); }}
                className="group flex flex-col items-start p-6 rounded-[1.5rem] bg-white border-2 border-slate-200 hover:border-orange-600 transition-all text-left hover:-translate-y-1"
              >
                <span className="text-lg font-black uppercase tracking-tight text-slate-900">Download PDF</span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Save permanently to your device</span>
                <div className="mt-4 flex items-center justify-between w-full">
                   <span className="text-2xl font-black text-slate-900">₹10</span>
                   <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-orange-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {onStartSelection && (
                <button 
                  onClick={onStartSelection}
                  className="mt-2 group flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:text-orange-600 hover:border-orange-600 transition-all"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-center w-full">Select multiple from list</span>
                </button>
              )}
              
              <button onClick={onClose} className="mt-2 text-center text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Maybe Later</button>
            </div>
          </div>
        )}

        {showRazorpay && (
          <RazorpayCheckout
            pdfIds={[pdfId]}
            type={selectionType}
            onSuccess={handlePaymentSuccess}
            onClose={() => setShowRazorpay(false)}
          />
        )}

        {displayError && !requiresPayment && (
          <div className="max-w-sm w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-xl font-black text-slate-900 uppercase mb-2">Access Denied</h3>
            <p className="text-slate-500 font-medium mb-8">{displayError}</p>
            <button onClick={onClose} className="w-full rounded-2xl bg-white dark:bg-slate-900 py-4 text-white font-black uppercase tracking-widest">Close Viewer</button>
          </div>
        )}

        {!loading && !displayError && blobUrl && (
          <div className="relative w-full h-full max-w-6xl bg-white shadow-2xl overflow-hidden rounded-xl flex flex-col">
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] grid grid-cols-2 md:grid-cols-3 grid-rows-4 overflow-hidden">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className="flex items-center justify-center -rotate-45 text-[10px] md:text-sm font-black text-slate-950 uppercase text-center">
                   {leadPhone}
                 </div>
               ))}
            </div>

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
                className="flex-1 w-full border-none h-full pb-16"
              />
              
              <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 flex flex-col md:flex-row items-center justify-center gap-4 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                 <div className="flex flex-col items-center md:items-start mr-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Project Owner</span>
                    <span className="text-sm font-black text-slate-900">Naresh Gohel</span>
                 </div>
                 <div className="flex items-center gap-3 w-full md:w-auto">
                   <a 
                     href="https://wa.me/917435808031" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex-1 md:w-64 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 px-6 rounded-2xl font-black tracking-widest text-sm transition-all shadow-xl shadow-green-500/20 active:scale-95"
                   >
                     +91 74358 08031
                   </a>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
