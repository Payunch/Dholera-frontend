"use client";
import React, { useState, useEffect } from 'react';
import { LeadsStats } from '@/features/admin/components/LeadsStats';
import { LeadsTable } from '@/features/admin/components/LeadsTable';
import { apiClient } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function adminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await apiClient.get("/leads");
        setLeads(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch leads", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center w-full">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
      <div className="mb-2">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Leads Overview</h1>
      </div>
      <LeadsStats leads={leads} />
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
