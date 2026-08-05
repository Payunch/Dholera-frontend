"use client";

import React, { useCallback, useEffect, useMemo, useState, useRef } from'react';
import { X, FileText, Loader2, Lock, ShieldCheck, ExternalLink, AlertCircle, ArrowRight, Download } from'lucide-react';
import { API_BASE_URL, SITE_BASE_URL, apiClient } from'@/lib/api';
import { getCookie } from'@/utils/cookies';
import { io, Socket } from'socket.io-client';
import { cn } from '@/lib/utils';
import { LeadPopup } from '@/components/leads/LeadPopup';
import { useLanguage } from '@/providers/LanguageProvider';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;



export const SecurePdfViewer = ({ pdfId, onClose, refreshToken, initialType ='view' }) => {
 const { t } = useLanguage();
 const [mounted, setMounted] = useState(false);
 const [blobUrl, setBlobUrl] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [requiresPayment, setRequiresPayment] = useState(false);
 const [showVerifyPopup, setShowVerifyPopup] = useState(false);
 
  const [clientData, setClientData] = useState({
  token: '',
  fingerprint: '',
  leadPhone: 'ENTER MOBILE NO',
  isMobile: false
  });

  const [numPages, setNumPages] = useState(1);

 const upiId = process.env.NEXT_PUBLIC_ADMIN_UPI_ID || '';
 const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE || '';

 const socketRef = useRef(null);

 const fetchPdf = useCallback(async () => {
 const token = getCookie('lead_token') ||'';
 setLoading(true);
 setError(null);
 setRequiresPayment(false);
 setShowVerifyPopup(false);
 
 try {
 const freeTrialId = process.env.NEXT_PUBLIC_FREE_TRIAL_PDF_ID ||'19';
 const isTrial = String(pdfId) === String(freeTrialId);

 if (!token && !isTrial) {
 setShowVerifyPopup(true);
 setLoading(false);
 return;
 }

 const res = await apiClient.get(`/pdf/view/${pdfId}`, {
 responseType:'blob'
 });

 const url = URL.createObjectURL(res.data);
 setBlobUrl(url);
 } catch (err) {
 let errorData = err.response?.data;

 if (errorData instanceof Blob) {
 try {
 const text = await errorData.text();
 errorData = JSON.parse(text);
 } catch (e) {
 errorData = { error:'Document access failed' };
 }
 }

 if (err.response?.status === 403 || err.response?.status === 401) {
 setShowVerifyPopup(true);
 } else {
 console.error('SecurePdfViewer Fetch Error:', err);
 setError(errorData?.error ||'Failed to load document.');
 }
 } finally {
 setLoading(false);
 }
 }, [pdfId]);

 useEffect(() => {
 setMounted(true);
 const token = getCookie('lead_token') ||'';
 const fingerprint = getCookie('visitorFingerprint') ||'';
 const leadPhone = getCookie('lead_phone') || 'ENTER MOBILE NO';
 
 const checkMobile = () => {
 if (typeof navigator ==='undefined') return false;
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

 const socketUrl = (typeof window !=="undefined" && window.location.hostname ==="localhost") 
 ? "http://localhost:3001" : "https://api.dholeraplatform.com";

 const socket = io(socketUrl, { 
 withCredentials: true,
 transports: ['websocket','polling']
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

  const { token, leadPhone, isMobile } = clientData;
  const directUrl = useMemo(() => `${API_BASE_URL}/pdf/view/${pdfId}?token=${token}&type=view`, [pdfId, token]);

  if (!mounted) return null;

  const displayError = !pdfId ? 'Invalid document ID' : error;

 return (
 <div className="fixed inset-0 z-[200] flex flex-col bg-slate-950/95 backdrop-blur-md">
 {/* Header */}
 <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-4 py-3 border-b border-white/5">
 <div className="flex items-center gap-3">
 <FileText className="h-5 w-5 text-orange-500" />
 <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white hidden sm:inline">
 {t('secure_intelligence_hub')}
 </span>
 </div>
  <div className="flex items-center gap-4">
    <button onClick={onClose} className="rounded-full p-2 bg-white/5 text-slate-400 hover:text-white hover:bg-red-500/20 transition-all dark:bg-slate-900">
      <X className="h-5 w-5" />
    </button>
  </div>
 </div>

 {/* Main Content */}
 <div className="flex-1 flex items-center justify-center p-4">
 {loading && <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />}
 


  {displayError && !requiresPayment && !showVerifyPopup && (
  <div className="max-w-sm w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 text-center shadow-2xl">
  <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-2">{t('access_denied')}</h3>
  <p className="text-slate-500 font-medium mb-8">{displayError}</p>
  <button onClick={onClose} className="w-full rounded-2xl bg-white dark:bg-slate-900 py-4 text-white font-black uppercase tracking-widest">{t('close_viewer')}</button>
  </div>
  )}

  {showVerifyPopup && (
    <LeadPopup
      sessionId={clientData.fingerprint || undefined}
      fingerprint={clientData.fingerprint || undefined}
      compulsory={true}
      onSuccess={() => {
        setShowVerifyPopup(false);
        fetchPdf();
      }}
      onClose={() => {
        setShowVerifyPopup(false);
        onClose();
      }}
      title={t('limited_time_free_access')}
      subtitle={t('offer_ends_in_10_days')}
    />
  )}

 {!loading && !displayError && blobUrl && (
 <div className="relative w-full h-full max-w-6xl bg-white dark:bg-slate-900 shadow-2xl overflow-hidden rounded-xl flex flex-col">
 <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] grid grid-cols-2 md:grid-cols-3 grid-rows-4 overflow-hidden">
 {[...Array(12)].map((_, i) => (
 <div key={i} className="flex items-center justify-center -rotate-45 text-[10px] md:text-sm font-black text-slate-950 uppercase text-center">
 {leadPhone}
 </div>
 ))}
 </div>

 <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-100 dark:bg-slate-950">
 <TransformWrapper
   initialScale={1}
   minScale={0.5}
   maxScale={8}
   centerOnInit={true}
 >
   {({ zoomIn, zoomOut, resetTransform }) => (
     <>
       <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
         <button onClick={() => zoomIn()} className="p-3 bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white rounded-xl shadow-lg backdrop-blur hover:bg-white active:scale-95 transition-all border border-slate-200 dark:border-slate-700">
           <ZoomIn className="w-5 h-5" />
         </button>
         <button onClick={() => zoomOut()} className="p-3 bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white rounded-xl shadow-lg backdrop-blur hover:bg-white active:scale-95 transition-all border border-slate-200 dark:border-slate-700">
           <ZoomOut className="w-5 h-5" />
         </button>
         <button onClick={() => resetTransform()} className="p-3 bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white rounded-xl shadow-lg backdrop-blur hover:bg-white active:scale-95 transition-all border border-slate-200 dark:border-slate-700">
           <Maximize className="w-5 h-5" />
         </button>
       </div>
       <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center min-h-full pb-16">
         <Document
           file={blobUrl}
           onLoadSuccess={({ numPages }) => setNumPages(numPages)}
           loading={<Loader2 className="h-10 w-10 text-orange-500 animate-spin" />}
           error={<div className="text-red-500 text-sm font-bold uppercase p-4">{t('failed_to_render_pdf')}</div>}
           className="flex flex-col items-center max-w-full"
         >
           {Array.from(new Array(numPages), (el, index) => (
             <Page
               key={`page_${index + 1}`}
               pageNumber={index + 1}
               className="mb-4 shadow-xl border border-slate-200 dark:border-slate-800 bg-white"
               renderTextLayer={false}
               renderAnnotationLayer={false}
               width={typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 1200) : 800}
             />
           ))}
         </Document>
       </TransformComponent>
     </>
   )}
 </TransformWrapper>
 
 <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 flex flex-col md:flex-row items-center justify-center gap-4 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:bg-slate-900">
 <div className="flex flex-col items-center md:items-start mr-4">
 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{t('project_owner')}</span>
 <span className="text-sm font-black text-slate-900 dark:text-white">Naresh Gohel</span>
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
