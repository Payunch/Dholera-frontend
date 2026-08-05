"use client";

import * as React from "react";
import { useRouter } from"next/navigation";
import { Loader2, ShieldAlert } from"lucide-react";
import { useLead } from"@/providers/LeadProvider";

export function ProfessionalRouteGuard({ children }) {
 const { verifiedLead, loading } = useLead();
 const router = useRouter();

 React.useEffect(() => {
 if (!loading && !verifiedLead) {
 router.replace("/contact");
 }
 }, [loading, verifiedLead, router]);

 if (loading) {
 return (
 <div className="flex min-h-[60vh] items-center justify-center px-4">
 <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 px-5 py-4 text-sm font-bold uppercase tracking-widest text-slate-500 shadow-lg">
 <Loader2 className="h-5 w-5 animate-spin text-orange-600" />
 Verifying Professional Session
 </div>
 </div>
 );
 }

 if (!verifiedLead) {
 return (
 <div className="flex min-h-[60vh] items-center justify-center px-4">
 <div className="max-w-lg rounded-3xl border border-red-200 bg-white dark:bg-slate-900 p-8 text-center shadow-xl">
 <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
 <ShieldAlert className="h-7 w-7" />
 </div>
 <h1 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Professional Access Required</h1>
 <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-400">
 Redirecting to contact verification...
 </p>
 </div>
 </div>
 );
 }

 return <>{children}</>;
}
