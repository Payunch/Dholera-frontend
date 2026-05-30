"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Activity,
  Globe
} from "lucide-react";
import { Lead, WhatsAppStats } from "@/types/admin";
import { LeadsStats } from "./LeadsStats";
import { LeadsTable } from "./LeadsTable";
import { UpdatesManagement } from "./UpdatesManagement";
import { cn } from "@/lib/utils";
import { apiClient, API_BASE_URL } from "@/lib/api";
import { fetchCsrfToken } from "@/utils/csrf";

interface AdminDashboardClientProps {
  initialLeads: Lead[];
  initialWaStats: WhatsAppStats;
}

export function AdminDashboardClient({ initialLeads, initialWaStats }: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState(0);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const tabs = [
    { label: "Leads", icon: Users },
    { label: "Updates", icon: Globe },
    { label: "Professionals", icon: ShieldCheck },
    { label: "Insights", icon: Activity },
    { label: "System", icon: Settings },
  ];

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await apiClient.post("/auth/logout");
    } catch (err) {
      console.error("Admin logout failed:", err);
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  };

  const [isExporting, setIsExporting] = React.useState(false);
  const [isImporting, setIsImporting] = React.useState(false);
  const [importFile, setImportFile] = React.useState<File | null>(null);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [pdfImportFile, setPdfImportFile] = React.useState<File | null>(null);
  const [isPdfImporting, setIsPdfImporting] = React.useState(false);

  const handleExportBackup = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const resp = await fetch(`${API_BASE_URL}/admin/backup`, { credentials: 'include' });
      if (!resp.ok) throw new Error('Export failed');
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dholera-platform-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Backup failed', err);
      alert('Backup failed');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPdfs = async () => {
    try {
      const resp = await fetch(`${API_BASE_URL}/pdf/export`, { credentials: 'include' });
      if (!ok) throw new Error('PDF Export failed');
      const json = await resp.json();
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dholera-pdf-metadata-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert('PDF metadata export failed');
    }
  };

  const handleSyncDisk = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      const csrfToken = await fetchCsrfToken();
      const resp = await fetch(`${API_BASE_URL}/pdf/sync-disk`, { 
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken || ''
        },
        credentials: 'include' 
      });
      const data = await resp.json();
      if (resp.ok) {
        alert(`Sync complete. Added ${data.added} new documents.`);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      alert('Sync failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsSyncing(false);
    }
  };

  const handleImportPdfs = async () => {
    if (isPdfImporting) return;
    if (!pdfImportFile) return alert('Select a PDF metadata file to import');

    setIsPdfImporting(true);
    try {
      const content = await pdfImportFile.text();
      const data = JSON.parse(content);

      const csrfToken = await fetchCsrfToken();
      const resp = await fetch(`${API_BASE_URL}/pdf/import`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || ''
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || 'Import failed');
      }

      const result = await resp.json();
      alert(`Import success: ${result.created} created, ${result.updated} updated.`);
      setPdfImportFile(null);
    } catch (err) {
      alert('Import failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsPdfImporting(false);
    }
  };

  const handleImportBackup = async () => {
    if (isImporting) return;
    if (!importFile) return alert('Select a backup file to import');
    if (!confirm('Importing a backup will replace current data. Proceed?')) return;

    setIsImporting(true);
    try {
      const form = new FormData();
      form.append('backup', importFile);
      const csrfToken = await fetchCsrfToken();
      const resp = await fetch(`${API_BASE_URL}/admin/restore`, {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken || ''
        },
        body: form,
        credentials: 'include'
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt || 'Restore failed');
      }
      const json = await resp.json();
      alert('Restore completed');
      console.log('Restore result', json);
      router.refresh();
    } catch (err) {
      console.error('Restore failed', err);
      alert('Restore failed');
    } finally {
      setIsImporting(false);
      setImportFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar / Top Nav Hybrid for Admin */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-black uppercase tracking-tighter text-slate-900">
                Master <span className="text-orange-600">Control</span>
              </h1>
              <nav className="hidden md:flex items-center gap-2">
                {tabs.map((tab, idx) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(idx)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest transition-all",
                      activeTab === idx 
                        ? "bg-slate-900 text-white shadow-lg" 
                        : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 rounded-xl border-2 border-slate-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400 transition-all hover:border-red-100 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Terminating" : "Terminate"}
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 md:px-8 space-y-12">
        {activeTab === 0 && (
          <>
            <LeadsStats leads={initialLeads} />
            
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <LeadsTable leads={initialLeads} />
              </div>
              
              <div className="space-y-8">
                {/* Outreach Stats Card */}
                <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl">
                  <h3 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-orange-500">Outreach Analytics</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">WhatsApp Clicks</span>
                      <span className="text-xl font-black">{initialWaStats.totalClicks}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Leads Contacted</span>
                      <span className="text-xl font-black">{initialWaStats.leadsContacted}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Conversions</span>
                      <span className="text-xl font-black">{initialWaStats.conversionsAfterWhatsApp}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 rounded-2xl bg-orange-600 p-4 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-100">Conversion Rate</p>
                    <p className="text-3xl font-black">
                      {initialWaStats.leadsContacted > 0 
                        ? `${Math.round((initialWaStats.conversionsAfterWhatsApp / initialWaStats.leadsContacted) * 100)}%` 
                        : "0%"}
                    </p>
                  </div>
                </div>

                {/* System Health / Region Card */}
                <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-tight">Regional Node</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DSIR-WEST-01</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                         <span>API Latency</span>
                         <span className="text-green-600">24ms</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-green-500 w-full animate-pulse" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 1 && <UpdatesManagement />}

        {activeTab === 2 && (
          <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
             <div className="h-24 w-24 rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-300">
                <ShieldCheck className="h-12 w-12" />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">{tabs[activeTab].label} Restricted</h3>
                <p className="text-lg font-medium text-slate-500 italic">This sector of the Master Control is undergoing biometric verification alignment...</p>
             </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
             <div className="h-24 w-24 rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-300">
                <Activity className="h-12 w-12" />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">{tabs[activeTab].label} Restricted</h3>
                <p className="text-lg font-medium text-slate-500 italic">Insights are available via reports endpoint.</p>
             </div>
          </div>
        )}

        {activeTab === 4 && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <h3 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-slate-700">Portable Infrastructure Data</h3>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-orange-600">Full System Snapshot</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Download a complete JSON backup of the platform database, including leads, sessions, and logs.</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={handleExportBackup}
                      disabled={isExporting}
                      className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600 disabled:opacity-60"
                    >
                      {isExporting ? 'Exporting...' : 'Export Platform Backup'}
                    </button>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="application/json"
                        onChange={(e) => setImportFile(e.target.files ? e.target.files[0] : null)}
                        className="text-[10px] font-bold uppercase"
                      />
                      <button
                        onClick={handleImportBackup}
                        disabled={isImporting}
                        className="rounded-xl border border-slate-200 px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-60"
                      >
                        {isImporting ? 'Importing...' : 'Restore'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-l border-slate-100 pl-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-orange-600">PDF Intelligence Portability</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Manage specific PDF metadata. Use the Sync function to automatically discover new PDF files uploaded to the server.</p>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={handleExportPdfs}
                        className="rounded-xl border border-slate-200 px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-600 transition-all hover:border-slate-900 hover:text-slate-900"
                      >
                        Export PDF Metadata
                      </button>
                      <button
                        onClick={handleSyncDisk}
                        disabled={isSyncing}
                        className="rounded-xl bg-orange-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-orange-700 disabled:opacity-60 shadow-lg shadow-orange-600/10"
                      >
                        {isSyncing ? 'Synchronizing...' : 'Sync Local PDFs'}
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
                      <input
                        type="file"
                        accept="application/json"
                        onChange={(e) => setPdfImportFile(e.target.files ? e.target.files[0] : null)}
                        className="text-[10px] font-bold uppercase"
                      />
                      <button
                        onClick={handleImportPdfs}
                        disabled={isPdfImporting}
                        className="rounded-xl border border-slate-200 px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-60"
                      >
                        {isPdfImporting ? 'Importing...' : 'Import Metadata'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
