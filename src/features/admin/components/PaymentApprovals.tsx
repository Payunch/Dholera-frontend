"use client";

import React, { useState, useEffect } from 'react';
import { Check, Loader2, IndianRupee, User, FileText, ShieldCheck } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';
import { fetchCsrfToken } from "@/utils/csrf";

interface GroupedPendingPurchase {
  id: number;
  transaction_id: string;
  utr: string; 
  amount: number;
  updatedAt: string;
  lead: {
    id: number;
    name: string;
    phone: string;
    email: string;
  };
  items: string[];
}

export const PaymentApprovals = () => {
  const [pending, setPending] = useState<GroupedPendingPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchPending = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/payment/admin/pending`, { credentials: 'include' });
      const data = await res.json();
      setPending(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch pending error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
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
        setPending(prev => prev.filter(p => p.transaction_id !== txnId));
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
          Access Requests
        </h2>
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
          {pending.length} Batch{pending.length !== 1 ? 'es' : ''} Awaiting Verification
        </span>
      </div>

      {pending.length === 0 ? (
        <div className="bg-slate-50 rounded-[2rem] p-12 text-center border-2 border-dashed border-slate-200">
           <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Check className="h-8 w-8 text-slate-300" />
           </div>
           <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No pending approvals found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-20">
          {pending.map((p) => (
            <div key={p.transaction_id} className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
               <div className="flex-1 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                     <User className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-slate-900 uppercase text-sm">{p.lead.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold">({p.lead.phone}) • ID: {p.lead.id}</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                           <FileText className="h-3 w-3" />
                           {p.items.join(', ')}
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="text-[10px] font-black text-orange-600 uppercase">
                              UTR: {p.utr}
                           </div>
                           <div className="text-[10px] font-black text-slate-300 uppercase">
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
                     <div className="text-[8px] text-slate-400 font-black uppercase tracking-widest">
                        {new Date(p.updatedAt).toLocaleString()}
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                     <button 
                       onClick={() => handleApprove(p.transaction_id)}
                       disabled={actionLoading === p.transaction_id}
                       className="bg-slate-900 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                     >
                        {actionLoading === p.transaction_id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                        Approve Access
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
