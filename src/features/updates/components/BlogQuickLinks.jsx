"use client";

import React from "react";
import Link from "next/link";
import { Map, Smartphone, MessageSquare, Phone, Globe } from "lucide-react";

export function BlogQuickLinks({ blogTitle = "Dholera Smart City Update" }) {
  const whatsappMessage = encodeURIComponent(
    `Hello Naresh, I was reading your article "${blogTitle}" on Dholera Platform. I want more details on verified plots and the latest TP master plan.`
  );

  return (
    <div className="my-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-lg transition-colors">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-5">
        <h4 className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
          Investor Resources & Direct Contact
        </h4>
      </div>

      <ul className="space-y-3.5 text-sm sm:text-base">
        {/* 1. TP Map */}
        <li className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            <Map className="h-4 w-4" />
          </span>
          <span className="font-bold text-slate-900 dark:text-white">TP Map:</span>
          <Link
            href="/tp-maps"
            className="font-medium text-orange-600 dark:text-orange-400 hover:underline transition-colors"
          >
            Download TP 1 – TP 6 Maps
          </Link>
        </li>

        {/* 2. Dholera App */}
        <li className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Smartphone className="h-4 w-4" />
          </span>
          <span className="font-bold text-slate-900 dark:text-white">Dholera App:</span>
          <Link
            href="/download"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors"
          >
            Download Official Android APK
          </Link>
        </li>

        {/* 3. One-to-One Conversation */}
        <li className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <MessageSquare className="h-4 w-4" />
          </span>
          <span className="font-bold text-slate-900 dark:text-white">One-to-One Conversation:</span>
          <a
            href={`https://wa.me/917435808031?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline transition-colors"
          >
            Chat on WhatsApp
          </a>
        </li>

        {/* 4. Call / WhatsApp (Last) */}
        <li className="flex items-center gap-3 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Phone className="h-4 w-4" />
          </span>
          <span className="font-bold text-slate-900 dark:text-white">Call/WhatsApp:</span>
          <a
            href="https://wa.me/917435808031"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline transition-colors"
          >
            +91 7435808031
          </a>
        </li>

        {/* 5. Website (Last) */}
        <li className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            <Globe className="h-4 w-4" />
          </span>
          <span className="font-bold text-slate-900 dark:text-white">Website:</span>
          <Link
            href="/contact"
            className="font-bold text-orange-600 dark:text-orange-400 hover:underline transition-colors"
          >
            https://dholeraplatform.com/contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
