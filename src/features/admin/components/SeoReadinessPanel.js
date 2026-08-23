"use client";

import { CheckCircle2, CircleAlert, FileText, Link2 } from "lucide-react";

export function SeoReadinessPanel({ review }) {
  const ready = review.score >= 90;
  return <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/40">
    <div className="flex items-start justify-between gap-4">
      <div><p className="text-xs font-black uppercase tracking-widest text-slate-500">SEO readiness</p><p className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-200">{ready ? "Ready to publish" : "Complete the checks before publishing"}</p></div>
      <div className={`rounded-2xl px-4 py-2 text-2xl font-black ${ready ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"}`}>{review.score}/100</div>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500 sm:grid-cols-4"><span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" />{review.wordCount} words</span><span>Density {review.density}%</span><span className="flex items-center gap-1"><Link2 className="h-3.5 w-3.5" />{review.internalLinks} internal</span><span>{review.externalLinks} external</span></div>
    <div className="mt-5 grid gap-2 sm:grid-cols-2">
      {review.checks.map(([label, passed]) => <div key={label} className="flex items-start gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">{passed ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> : <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />}{label}</div>)}
    </div>
  </section>;
}
