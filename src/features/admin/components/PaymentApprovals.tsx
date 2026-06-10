"use client";

import React, { useState, useEffect } from 'react';
import { Check, Loader2, IndianRupee, User, FileText, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';
import { fetchCsrfToken } from "@/utils/csrf";
import { cn } from "@/lib/utils";

interface GroupedPendingPurchase {
  id: number;
  transaction_id: string;
  utr: string; 
  amount: number;
  status: 'awaiting_approval' | 'completed';
  updatedAt: string;
  lead: {
    id: number;
    name: string;
    phone: string;
  };
  items: string[];
}

export const PaymentApprovals = () => {
  const [records, setRecords] = useState<GroupedPendingPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchRecords = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/payment/admin/pending`, { credentials: 'include' });
      const data = await res.json();
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch records error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    const interval = setInterval(fetchRecords, 30000); // Live sync history
    return () => clearInterval(interval);
  }, []);

  const handleApprove = async (txnId: string) => {
    if (!confirm(`Are you sure you want to approve transaction ${txnId}?`)) return;
    
    setActionLoading(txnId);
    try {
      const csrfToken = await fetchCsrfToken();
      const res = await fetch(`${API_BASE_URL}/payment/admin/approve/${txnId}`, {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken || ''
        },
        credentials: 'include'
      });
      if (res.ok) {
        // Update local state status instantly
        setRecords(prev => prev.map(r => r.transaction_id === txnId ? { ...r, status: 'completed' } : r));
      } else {
        const err = await res.json();
        alert(`Approval failed: ${err.error}`);
      }
    } catch (err) {
      console.error('Approve error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="h-8 w-8 animate-spin text-orange-600" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-orange-600" />
          Access History
        </h2>
        <div className="flex gap-2">
           <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
             {records.filter(r => r.status === 'awaiting_approval').length} Pending
           </span>
           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
             {records.filter(r => r.status === 'completed').length} Approved
           </span>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="bg-white rounded-[2rem] p-12 text-center border-2 border-dashed border-slate-200">
           <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Clock className="h-8 w-8 text-slate-300" />
           </div>
           <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest">No access requests found in database</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-20">
          {records.map((p) => (
            <div key={p.transaction_id} className={cn(
              "bg-white rounded-[1.5rem] p-6 border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm",
              p.status === 'completed' ? "border-green-100 bg-green-50/10" : "border-slate-100"
            )}>
               <div className="flex-1 flex items-start gap-4">
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-all",
                    p.status === 'completed' ? "bg-green-100 text-green-600" : "bg-white text-slate-500 dark:text-slate-400"
                  )}>
                     {p.status === 'completed' ? <CheckCircle2 className="h-6 w-6" /> : <User className="h-6 w-6" />}
                  </div>
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-slate-900 uppercase text-sm">{p.lead.name}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">({p.lead.phone}) • ID: {p.lead.id}</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                           <FileText className="h-3 w-3" />
                           {p.items.join(', ')}
                        </div>
                        <div className="flex items-center gap-3">
                           <div className={cn(
                             "text-[10px] font-black uppercase",
                             p.status === 'completed' ? "text-green-600" : "text-orange-600"
                           )}>
                              UTR: {p.utr}
                           </div>
                           <div className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase">
                              TXN: {p.transaction_id}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className="text-right">
                     <div className="flex items-center gap-1 text-slate-900 font-black text-xl">
                        <IndianRupee className="h-4 w-4" />
                        <span>{p.amount / 100}</span>
                     </div>
                     <div className="text-[8px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">
                        {new Date(p.updatedAt).toLocaleString()}
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                     {p.status === 'completed' ? (
                       <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-600/10">
                          <Check className="h-3 w-3" /> Approved
                       </div>
                     ) : (
                       <button 
                         onClick={() => handleApprove(p.transaction_id)}
                         disabled={actionLoading === p.transaction_id}
                         className="bg-white dark:bg-slate-900 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-xl shadow-slate-950/5"
                       >
                          {actionLoading === p.transaction_id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                          Approve Access
                       </button>
                     )}
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
