"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

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
    <div className="relative w-full h-full bg-slate-100 dark:bg-slate-950 flex flex-col overflow-hidden">
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
            
            <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex flex-col items-center min-h-full py-8">
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
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};
