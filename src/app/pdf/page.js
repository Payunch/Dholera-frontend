"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
const PdfListing = dynamic(() => import('@/components/pdf/PdfListing').then(mod => mod.PdfListing), { ssr: false });

export default function PdfPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 border-4 border-slate-200 border-t-[#FF7A00] rounded-full animate-spin" />
        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 animate-pulse">Initializing Hub...</span>
      </div>
    }>
      <PdfListing />
    </Suspense>
  );
}
