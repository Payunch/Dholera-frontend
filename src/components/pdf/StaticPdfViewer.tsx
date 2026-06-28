"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Setup pdf worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface StaticPdfViewerProps {
  url: string;
}

export const StaticPdfViewer = ({ url }: StaticPdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(800);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(Math.min(window.innerWidth - 64, 1200));
      const handleResize = () => setWindowWidth(Math.min(window.innerWidth - 64, 1200));
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="relative w-full h-full bg-slate-100 dark:bg-slate-950 flex flex-col overflow-y-auto">
      <div className="w-full flex flex-col items-center min-h-full py-8">
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<Loader2 className="h-10 w-10 text-orange-500 animate-spin my-20" />}
          error={<div className="text-red-500 text-sm font-bold uppercase p-4 my-20">Failed to load PDF document.</div>}
          className="flex flex-col items-center max-w-full"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              className="mb-6 shadow-2xl border border-slate-200 dark:border-slate-800 bg-white"
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={windowWidth}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};
