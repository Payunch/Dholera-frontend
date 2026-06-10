"use client";

import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { X, FileText, Loader2, Lock, ShieldCheck, ExternalLink, AlertCircle, ArrowRight } from 'lucide-react';
import { API_BASE_URL, SITE_BASE_URL, apiClient } from '@/lib/api';
import { getCookie } from '@/utils/cookies';
import { io, Socket } from 'socket.io-client';
import { cn } from '@/lib/utils';

interface SecurePdfViewerProps {
  pdfId: string;
  onClose: () => void;
  refreshToken?: number;
  initialType?: 'view' | 'download';
}

export const SecurePdfViewer = ({ pdfId, onClose, refreshToken, initialType = 'view' }: SecurePdfViewerProps) => {
  const [mounted, setMounted] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requiresPayment, setRequiresPayment] = useState(false);
  
  const [clientData, setClientData] = useState({
    token: '',
    fingerprint: '',
    leadPhone: 'Guest',
    isMobile: false
  });

  const upiId = 'solankiparesh1183@okaxis';
  const adminPhone = '917435808031';

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

  const [selectionType, setSelectionType] = useState<'view' | 'download'>(initialType);
  
  useEffect(() => {
    setSelectionType(initialType);
  }, [initialType]);

  const amount = selectionType === 'view' ? 5 : 10;

  const { token, leadPhone, isMobile } = clientData;
  const directUrl = useMemo(() => `${API_BASE_URL}/pdf/view/${pdfId}?token=${token}&type=${selectionType}`, [pdfId, token, selectionType]);

  if (!mounted) return null;

  const displayError = !pdfId ? 'Invalid document ID' : error;

  const upiUrl = `upi://pay?pa=${upiId}&pn=Dholera%20Platform&am=${amount}.00&cu=INR&tn=PDF%20Unlock%20${pdfId}_${selectionType}`;
  const waUrl = `https://wa.me/${adminPhone}?text=Paid%20Rs.${amount}%20for%20${selectionType.toUpperCase()}%20access%20to%20PDF%20ID:%20${pdfId}.%20Please%20activate.`;

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
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-center shadow-2xl dark:shadow-black/90 border border-slate-100 dark:border-slate-800">
            <div className="h-16 w-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-orange-500/20">
              <Lock className="h-8 w-8 text-orange-600" />
            </div>
            
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">Premium Document</h3>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">Secure UPI Payment Required</p>

            <div className="space-y-6">
              {/* Type Selection */}
              <div className="grid grid-cols-2 gap-3">
                 <button 
                   onClick={() => setSelectionType('view')}
                   className={cn(
                     "p-4 rounded-2xl border-2 transition-all text-left",
                     selectionType === 'view' ? "border-orange-600 bg-orange-500/5 shadow-lg shadow-orange-500/5" : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950"
                   )}
                 >
                   <span className={cn("block text-[8px] font-black uppercase mb-1", selectionType === 'view' ? "text-orange-600" : "text-slate-400")}>View Online</span>
                   <span className={cn("text-xl font-black italic", selectionType === 'view' ? "text-slate-900 dark:text-white" : "text-slate-400")}>₹5</span>
                 </button>
                 <button 
                   onClick={() => setSelectionType('download')}
                   className={cn(
                     "p-4 rounded-2xl border-2 transition-all text-left",
                     selectionType === 'download' ? "border-orange-600 bg-orange-500/5 shadow-lg shadow-orange-500/5" : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950"
                   )}
                 >
                   <span className={cn("block text-[8px] font-black uppercase mb-1", selectionType === 'download' ? "text-orange-600" : "text-slate-400")}>Download PDF</span>
                   <span className={cn("text-xl font-black italic", selectionType === 'download' ? "text-slate-900 dark:text-white" : "text-slate-400")}>₹10</span>
                 </button>
              </div>

              <a 
                href={upiUrl}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-600/10 active:scale-95"
              >
                Pay ₹{amount} via UPI App
              </a>

              <a 
                href={waUrl}
                className="w-full border-2 border-green-500/20 hover:bg-green-500/5 text-green-500 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                Verify on WhatsApp
              </a>

              <button onClick={onClose} className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
                Maybe Later
              </button>
            </div>
          </div>
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
                     className="flex-1 md:w-64 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 px-6 rounded-2xl font-black tracking-widest text-sm transition-all shadow-xl shadow-green-500/10 active:scale-95"
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
