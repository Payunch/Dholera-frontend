"use client";

import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { X, FileText, Loader2, Lock, ShieldCheck, ExternalLink, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { API_BASE_URL, SITE_BASE_URL, apiClient } from '@/lib/api';
import { safeLocalStorage } from '@/utils/storage';
import { useLead } from '@/providers/LeadProvider';
import { UpiQrModal } from '@/components/payment/UpiQrModal';
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
  const [awaitingApproval, setAwaitingApproval] = useState(false);
  const [requiresRegistration, setRequiresRegistration] = useState(false);
  
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [upiOrderDetails, setUpiOrderDetails] = useState<{
    upiId: string;
    merchantName: string;
    amount: number;
    transactionId: string;
    isPro?: boolean;
  } | null>(null);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
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

  const socketRef = useRef<Socket | null>(null);
  const { token, fingerprint, leadEmail, leadPhone, isMobile } = clientData;

  const fetchPdf = useCallback(async (isPolling = false) => {
    if (!mounted) return;
    if (!isPolling) setLoading(true);
    setError(null);
    setRequiresPayment(false);
    
    try {
      const freeTrialId = process.env.NEXT_PUBLIC_FREE_TRIAL_PDF_ID || '19';
      const isTrial = String(pdfId) === String(freeTrialId);

      if (!token && !isTrial) {
        throw new Error('Verification required to access this document.');
      }

      // ROADMAP PHASE 6: USE CENTRALIZED API CLIENT (Handles App Check automatically)
      const res = await apiClient.get(`/pdf/view/${pdfId}`, {
        responseType: 'blob'
      });

      const url = URL.createObjectURL(res.data);
      setBlobUrl(url);
      setAwaitingApproval(false);
      setRequiresPayment(false);
      
      // Stop polling on success
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    } catch (err: any) {
      let errorData = err.response?.data;

      // Since responseType is 'blob', we must convert error blob back to text/json
      if (errorData instanceof Blob) {
        try {
          const text = await errorData.text();
          errorData = JSON.parse(text);
        } catch (e) {
          errorData = { error: 'Document access failed' };
        }
      }

      if (err.response?.status === 402) {
        if (errorData?.status === 'awaiting_approval') {
          setAwaitingApproval(true);
        } else {
          setRequiresPayment(true);
        }
      } else if (!isPolling) {
        console.error('SecurePdfViewer Fetch Error:', err);
        setError(errorData?.error || 'Failed to load document.');
      }
    } finally {
      if (!isPolling) setLoading(false);
    }
  }, [pdfId, token, mounted]);

  useEffect(() => {
    if (!token || !mounted) return;

    // Real-time Unlock via WebSockets (Roadmap Phase 1)
    // Use the SITE_BASE_URL (which is configured as the server root)
    const socketUrl = (typeof window !== "undefined" && window.location.hostname === "localhost") 
      ? "http://localhost:3001" 
      : SITE_BASE_URL;

    const socket = io(socketUrl, { 
      withCredentials: true,
      transports: ['websocket', 'polling']
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[Socket] Connected. Subscribing to lead channel...');
      socket.emit('join_lead', token);
    });

    socket.on('payment_approved', (data) => {
      console.log('[Socket] Access Granted Signal Received:', data);
      fetchPdf(true); // Immediate re-fetch to unlock
    });

    return () => {
      socket.disconnect();
    };
  }, [token, mounted, fetchPdf]);

  const directUrl = useMemo(() => `${API_BASE_URL}/pdf/view/${pdfId}?token=${token}`, [pdfId, token]);

  // Handle Polling
  useEffect(() => {
    if (awaitingApproval && !pollIntervalRef.current) {
      pollIntervalRef.current = setInterval(() => {
        fetchPdf(true);
      }, 5000); // Poll every 5 seconds
    }
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [awaitingApproval, fetchPdf]);

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

  const startManualPayment = async (type: 'view' | 'download') => {
    setPaymentLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/payment/request-manual`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify({ 
          pdfId,
          type, 
          leadToken: token, 
          fingerprint 
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      if (data.alreadyPurchased) {
        fetchPdf();
        return;
      }

      setUpiOrderDetails({
        upiId: data.upiId,
        merchantName: data.merchantName,
        amount: data.amount,
        transactionId: data.transactionId,
        isPro: data.isPro
      });
      setShowUpiModal(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate payment');
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleVerifyUtr = async (utr: string): Promise<boolean> => {
    if (!upiOrderDetails?.transactionId) return false;
    try {
      const res = await fetch(`${API_BASE_URL}/payment/verify-utr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify({ 
          utr, 
          transactionId: upiOrderDetails.transactionId,
          leadToken: token 
        })
      });

      if (res.ok) {
        setShowUpiModal(false);
        setAwaitingApproval(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('UTR Submit Error:', err);
      return false;
    }
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
        
        {awaitingApproval && (
          <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-center mb-6">
               <div className="h-20 w-20 rounded-3xl bg-blue-50 flex items-center justify-center">
                 <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
               </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Awaiting Approval</h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed text-sm">
              Your payment is being verified by the Admin in GPay/Bank. 
              <br/><br/>
              <b>This page will automatically unlock</b> as soon as approval is granted (usually 5-10 mins).
            </p>
            <div className="flex flex-col gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center gap-2">
                 <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Waiting for Admin to click Approve...</span>
              </div>
              <button onClick={() => fetchPdf()} className="w-full rounded-2xl bg-slate-900 py-4 text-white font-black uppercase tracking-widest hover:bg-orange-600 transition-all text-xs">
                Refresh Status
              </button>
            </div>
            <button onClick={onClose} className="mt-4 text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest">Close Viewer</button>
          </div>
        )}

        {requiresPayment && !awaitingApproval && (
          <div className="max-w-xl w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 flex flex-col md:flex-row">
            {/* Left: Info */}
            <div className="p-10 md:w-1/2 flex flex-col justify-center">
              <div className="h-16 w-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6">
                <Lock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Premium Content</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                This document is part of our exclusive DSIRDA intelligence archive. Choose an option to unlock access.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-green-500" /> 
                  Manual Approval
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-green-500" /> 
                  Secure Verification
                </div>
              </div>
            </div>

            {/* Right: Choices */}
            <div className="bg-slate-50 p-8 md:w-1/2 flex flex-col gap-4 border-l border-slate-100">
              {/* Option 1: View Only */}
              <button 
                disabled={paymentLoading}
                onClick={() => startManualPayment('view')}
                className="group relative flex flex-col items-start p-6 rounded-[1.5rem] bg-slate-900 text-white hover:bg-orange-600 transition-all text-left shadow-xl hover:-translate-y-1 disabled:opacity-50"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">One-Time Access</span>
                <span className="text-lg font-black uppercase tracking-tight">View PDF</span>
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-white/80">If browser closes, access is lost.</span>
                <div className="mt-4 flex items-center justify-between w-full">
                   <span className="text-2xl font-black">{paymentLoading ? '...' : '₹5'}</span>
                   <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Option 2: Download */}
              <button 
                disabled={paymentLoading}
                onClick={() => startManualPayment('download')}
                className="group flex flex-col items-start p-6 rounded-[1.5rem] bg-white border-2 border-slate-200 hover:border-orange-600 transition-all text-left hover:-translate-y-1 disabled:opacity-50"
              >
                <span className="text-lg font-black uppercase tracking-tight text-slate-900">Download PDF</span>
                <span className="text-[10px] font-bold text-slate-400">Save permanently to your device</span>
                <div className="mt-4 flex items-center justify-between w-full">
                   <span className="text-2xl font-black text-slate-900">{paymentLoading ? '...' : '₹10'}</span>
                   <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-orange-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Option 3: Multi-select */}
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
{showUpiModal && upiOrderDetails && (
  <UpiQrModal
    upiId={upiOrderDetails.upiId}
    amount={upiOrderDetails.amount}
    merchantName={upiOrderDetails.merchantName}
    transactionId={upiOrderDetails.transactionId}
    onClose={() => setShowUpiModal(false)}
    onVerifyUtr={handleVerifyUtr}
  />
)}

        {displayError && !requiresPayment && !awaitingApproval && (
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
                onContextMenu={(e) => e.preventDefault()}
              />
              
              {/* Owner Contact Sticky Footer */}
              <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 flex flex-col md:flex-row items-center justify-center gap-4 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                 <div className="flex flex-col items-center md:items-start mr-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Owner</span>
                    <span className="text-sm font-black text-slate-900">Naresh Gohel • 7435808310</span>
                 </div>
                 <div className="flex items-center gap-3 w-full md:w-auto">
                   <a 
                     href="https://wa.me/917435808310" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex-1 md:w-48 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-green-500/20 active:scale-95"
                   >
                     WhatsApp Owner
                   </a>
                   <a 
                     href="tel:+917435808310" 
                     className="flex-1 md:w-48 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl active:scale-95"
                   >
                     Call Owner
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
