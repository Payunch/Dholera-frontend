"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { LeadsStats } from '@/features/admin/components/LeadsStats';
import { LeadsTable } from '@/features/admin/components/LeadsTable';
import { apiClient } from '@/lib/api';
import { Loader2, RefreshCw, Users, AlertCircle } from 'lucide-react';

export default function adminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const fetchLeads = useCallback(async (isSilent = false) => {
    if (!isSilent) setRefreshing(true);
    setError(null);
    try {
      const res = await apiClient.get("/leads");
      // Robustly extract leads list whether returned as array, { data: [...] }, or { leads: [...] }
      const leadsList = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data?.leads)
        ? res.data.leads
        : [];

      setLeads(leadsList);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch leads", err);
      setError("Unable to load latest leads. Please check connection.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();

    // Auto-refresh every 25 seconds to catch newly submitted leads
    const interval = setInterval(() => {
      fetchLeads(true);
    }, 25000);

    return () => clearInterval(interval);
  }, [fetchLeads]);

  if (loading) {
    return (
      <div className="flex flex-col h-64 items-center justify-center w-full gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Leads Database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-3">
            <Users className="h-8 w-8 text-orange-600" />
            Leads Overview
          </h1>
          {lastUpdated && (
            <p className="text-xs text-slate-400 mt-1">
              Last synced: {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} • Auto-refreshes in real-time
            </p>
          )}
        </div>

        <button
          onClick={() => fetchLeads(false)}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-xs font-black uppercase tracking-wider transition-all shadow-sm active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-orange-600' : ''}`} />
          {refreshing ? 'Syncing...' : 'Refresh Leads'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <LeadsStats leads={leads} />
      
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
