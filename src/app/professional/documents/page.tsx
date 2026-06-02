"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProfessionalRouteGuard } from "@/components/professional/ProfessionalRouteGuard";
import { API_BASE_URL } from "@/lib/api";
import { useLead } from "@/providers/LeadProvider";
import { Loader2, FileText, ExternalLink, ShieldCheck } from "lucide-react";

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

export default function ProfessionalDocumentsPage() {
  const { verifiedLead } = useLead();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);

  useEffect(() => {
    let active = true;

    const loadPurchases = async () => {
      if (!verifiedLead?.token) {
        if (active) setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/payment/my-purchases`, {
          headers: {
            Authorization: verifiedLead.token,
          },
        });

        if (response.status === 404) {
          throw new Error("Payment records service temporarily unavailable. Please try again later.");
        }

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load purchased documents.");
        }

        if (!active) return;
        // Only show completed purchases in this view
        const completed = (Array.isArray(data?.purchases) ? data.purchases : [])
          .filter((p: PurchaseRecord) => p.status === 'completed');
          
        setPurchases(completed);
      } catch (err) {
        if (!active) return;
        console.error('Pro Portal Load Error:', err);
        setError(err instanceof Error ? err.message : "Failed to load purchased documents.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPurchases();

    return () => {
      active = false;
    };
  }, [verifiedLead?.token]);

  return (
    <ProfessionalRouteGuard>
      <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-xl overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
             <div className="h-12 w-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                <FileText className="h-6 w-6" />
             </div>
             <div>
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Intelligence Vault</h1>
                <p className="text-sm font-medium text-slate-500">Your collection of unlocked official DSIRDA documents.</p>
             </div>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-10 w-10 text-orange-600 animate-spin" />
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Opening Vault...</p>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border-2 border-dashed border-red-100 bg-red-50 p-10 text-center">
              <p className="text-sm font-bold text-red-600 uppercase tracking-wider">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-4 text-[10px] font-black uppercase tracking-widest text-red-700 underline">Try Again</button>
            </div>
          )}

          {!loading && !error && purchases.length === 0 && (
            <div className="rounded-[2rem] border-2 border-dashed border-slate-100 bg-slate-50/50 p-16 text-center">
               <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm text-slate-300">
                  <ShieldCheck className="h-8 w-8" />
               </div>
               <h3 className="text-lg font-black text-slate-900 uppercase mb-2">Vault is Empty</h3>
               <p className="text-sm font-medium text-slate-400 max-w-xs mx-auto">You haven't unlocked any premium documents yet. Head to the archive to explore.</p>
               <Link href="/#pdfs" className="mt-8 inline-block rounded-xl bg-slate-900 px-8 py-3 text-xs font-black text-white uppercase tracking-widest hover:bg-orange-600 transition-all">Browse Archive</Link>
            </div>
          )}

          {!loading && !error && purchases.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
               {purchases.map((purchase) => (
                 <div key={purchase.id} className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                          <FileText className="h-5 w-5" />
                       </div>
                       <div>
                          <h4 className="text-sm font-black text-slate-900 uppercase leading-tight line-clamp-1">{purchase.documentTitle}</h4>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{purchase.category || 'General'}</span>
                             <span className="text-[8px] text-slate-300">•</span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{formatDate(purchase.createdAt)}</span>
                          </div>
                       </div>
                    </div>
                    <a 
                      href={`${API_BASE_URL}/pdf/view/${purchase.pdfId}?token=${verifiedLead?.token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                    >
                       <ExternalLink className="h-4 w-4" />
                    </a>
                 </div>
               ))}
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-4">
            <Link href="/professional/dashboard" className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-orange-600 transition-all shadow-lg">
              Dashboard
            </Link>
            <Link href="/#pdfs" className="rounded-xl border-2 border-slate-100 px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:border-orange-600 hover:text-orange-600 transition-all">
              Add Documents
            </Link>
          </div>
        </div>
      </div>
    </ProfessionalRouteGuard>
  );
}
