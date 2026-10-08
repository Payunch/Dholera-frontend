import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function BlogNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-full bg-orange-50 p-6 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400 mb-6">
        <BookOpen className="h-12 w-12" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3">
        Blog Article Not Found
      </h1>
      <p className="max-w-md text-sm font-medium text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        The article you are looking for may have been moved, updated, or is no longer available.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-orange-600 dark:bg-white dark:text-slate-900 dark:hover:bg-orange-500 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse All Blogs
        </Link>
        <Link
          href="/"
          className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-black uppercase tracking-widest text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
