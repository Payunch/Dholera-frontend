"use client";

import * as React from"react";
import { Loader2, ShieldAlert } from"lucide-react";
import { apiClient } from"@/lib/api";
import { AdminDashboardClient } from"@/features/admin/components/AdminDashboardClient";
import { Lead, WhatsAppStats } from"@/types/admin";

const fallbackStats: WhatsAppStats = {
 totalClicks: 0,
 leadsContacted: 0,
 conversionsAfterWhatsApp: 0,
 responseRate:"Manual",
};

const getErrorMessage = (err: unknown) => {
 if (typeof err ==="object" && err !== null &&"response" in err) {
 const response = (err as { response?: { data?: { error?: string } } }).response;
 if (response?.data?.error) {
 return response.data.error;
 }
 }
 if (err instanceof Error) {
 return err.message;
 }
 return"Unable to load admin dashboard.";
};

export function AdminDashboardGate() {
 const [loading, setLoading] = React.useState(true);
 const [error, setError] = React.useState("");
 const [leads, setLeads] = React.useState<Lead[]>([]);
 const [waStats, setWaStats] = React.useState<WhatsAppStats>(fallbackStats);

 React.useEffect(() => {
 let active = true;

 const loadDashboard = async () => {
 try {
 await apiClient.get("/auth/me");

 const [leadsRes, statsRes] = await Promise.all([
 apiClient.get("/leads"),
 apiClient.get("/whatsapp/stats"),
 ]);

 if (!active) return;

 setLeads(Array.isArray(leadsRes.data) ? leadsRes.data : []);
 setWaStats(statsRes.data || fallbackStats);
 } catch (err) {
 if (!active) return;
 setError(getErrorMessage(err));
 } finally {
 if (active) setLoading(false);
 }
 };

 loadDashboard();

 return () => {
 active = false;
 };
 }, []);

 if (loading) {
 return (
 <div className="flex min-h-screen items-center justify-center bg-white px-4">
 <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold uppercase tracking-widest text-slate-500 shadow-lg">
 <Loader2 className="h-5 w-5 animate-spin text-orange-600" />
 Loading Master Control
 </div>
 </div>
 );
 }

 if (error) {
 return (
 <div className="flex min-h-screen items-center justify-center bg-white px-4">
 <div className="max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl">
 <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
 <ShieldAlert className="h-7 w-7" />
 </div>
 <h1 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Admin Access Error</h1>
 <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-400">{error}</p>
 </div>
 </div>
 );
 }

 return <AdminDashboardClient initialLeads={leads} initialWaStats={waStats} />;
}