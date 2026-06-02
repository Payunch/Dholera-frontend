"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import { useLead } from "@/providers/LeadProvider";
import { Loader2, FileText, ExternalLink, ShieldCheck, User, LogOut, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PurchaseRecord = {
  id: number;
  pdfId: number;
  status: string;
  amount: number;
  transactionId: string;
  createdAt: string;
  documentTitle: string;
  category?: string;
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function MyVaultPage() {
  const { verifiedLead, loading: leadLoading, logoutLead } = useLead();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!leadLoading && !verifiedLead) {
      router.replace("/#pdfs");
    }
  }, [leadLoading, verifiedLead, router]);

  useEffect(() => {
    let active = true;

    const loadPurchases = async () => {
      if (!verifiedLead?.token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/payment/my-purchases`, {
          headers: {
            Authorization: verifiedLead.token,
          },
        });

        if (response.status === 404) {
          throw new Error("Vault service temporarily unavailable.");
        }

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load documents.");
        }

        if (!active) return;
        const completed = (Array.isArray(data?.purchases) ? data.purchases : [])
          .filter((p: PurchaseRecord) => p.status === 'completed');
          
        setPurchases(completed);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load documents.");
      } finally {
        if (active) setLoading(false);
      }
    };

    if (!leadLoading && verifiedLead) {
      loadPurchases();
    } else if (!leadLoading && !verifiedLead) {
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [verifiedLead, leadLoading]);

  if (leadLoading || loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 gap-4">
        <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Syncing Intelligence...</p>
      </div>
    );
  }

  if (!verifiedLead) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Vault Header */}
      <div className="bg-white border-b border-slate-200 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-[2rem] bg-orange-600 flex items-center justify-center text-white shadow-xl shadow-orange-600/20">
                 <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                 <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Intelligence Vault</h1>
                 <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">
                   Secured Access for {verifiedLead.name}
                 </p>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <button 
                onClick={() => logoutLead()}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-slate-100 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 hover:border-red-50 transition-all"
              >
                 <LogOut className="h-4 w-4" /> Sign Out
              </button>
              <Link href="/#pdfs" className="px-8 py-3 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-orange-600 transition-all">
                 Browse More
              </Link>
           </div>
        </div>
      </div>

      <main className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {error ? (
            <div className="rounded-[2rem] border-2 border-dashed border-red-100 bg-red-50 p-16 text-center">
              <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
              <h3 className="text-xl font-black text-slate-900 uppercase mb-2">Vault Sync Error</h3>
              <p className="text-sm font-medium text-red-600 uppercase tracking-wider">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-8 px-8 py-3 bg-red-600 text-white rounded-xl text-xs font-black uppercase">Try Again</button>
            </div>
          ) : purchases.length === 0 ? (
            <div className="rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white p-20 text-center">
               <div className="h-20 w-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-slate-300">
                  <FileText className="h-10 w-10" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 uppercase mb-3">No Unlocked Intel</h3>
               <p className="text-slate-400 font-medium max-w-sm mx-auto mb-10 leading-relaxed uppercase text-xs tracking-widest">You haven't purchased any premium maps or brochures yet. Unlock them in the main archive.</p>
               <Link href="/#pdfs" className="inline-block px-10 py-4 bg-orange-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-600/20 hover:bg-orange-500 transition-all">Go to Archive</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {purchases.map((purchase) => (
                 <div key={purchase.id} className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-orange-200 transition-all hover:-translate-y-2 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                       <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                          <FileText className="h-6 w-6" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{formatDate(purchase.createdAt)}</span>
                    </div>
                    
                    <h4 className="text-lg font-black text-slate-900 uppercase leading-tight mb-2 flex-1">{purchase.documentTitle}</h4>
                    <p className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em] mb-8">{purchase.category || 'Premium Archive'}</p>
                    
                    <a 
                      href={`${API_BASE_URL}/pdf/view/${purchase.pdfId}?token=${verifiedLead?.token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-xl bg-slate-900 text-white flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest group-hover:bg-orange-600 transition-all shadow-lg"
                    >
                       Open Document <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                 </div>
               ))}
            </div>
          )}
        </div>
      </main>

      {/* User Info Bar */}
      <div className="bg-slate-900 py-6 px-6 text-white">
         <div className="max-w-6xl mx-auto flex items-center justify-between opacity-50">
            <div className="flex items-center gap-3">
               <User className="h-4 w-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">{verifiedLead.phone}</span>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest">DSIRDA Intelligence Collector</div>
         </div>
      </div>
    </div>
  );
}
