"use client";

import React, { useState } from'react';
import { 
 CloudDownload, 
 RefreshCcw, 
 ShieldCheck, 
 Trash2, 
 FileJson, 
 FileSpreadsheet,
 AlertCircle,
 CheckCircle2,
 Loader2,
 UploadCloud
} from'lucide-react';
import { API_BASE_URL, apiClient } from'@/lib/api';
import { fetchCsrfToken } from"@/utils/csrf";
export const SystemManagement = () => {
 const [loading, setLoading] = useState(false);
 const [status, setStatus] = useState(null);

 const handleBackup = async () => {
 try {
 setLoading(true);
 const res = await fetch(`${API_BASE_URL}/admin/backup`, { credentials:'include' });
 if (!res.ok) throw new Error('Backup failed');
 
 const blob = await res.blob();
 const url = window.URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download =`dholera_backup_${new Date().toISOString().split('T')[0]}.json`;
 document.body.appendChild(a);
 a.click();
 a.remove();
 setStatus({ type:'success', message:'System backup generated and downloaded successfully.' });
 } catch (err) {
 setStatus({ type:'error', message:'Failed to generate backup file.' });
 } finally {
 setLoading(false);
 }
 };

 const handleRestore = async (e) => {
 const file = e.target.files?.[0];
 if (!file) return;

 if (!confirm('WARNING will overwrite current system data. Continue?')) return;

 try {
 setLoading(true);
 const csrf = await fetchCsrfToken();
 const formData = new FormData();
 formData.append('backup', file);

 const res = await fetch(`${API_BASE_URL}/admin/restore`, {
 method:'POST',
 headers: {'X-CSRF-Token': csrf ||'' },
 body: formData,
 credentials:'include'
 });

 const data = await res.json();
 if (res.ok) {
 setStatus({ type:'success', message:'System data restored successfully from backup.' });
 } else {
 throw new Error(data.details || data.error);
 }
 } catch (err) {
 setStatus({ type:'error', message: err instanceof Error ? err.message :'Restore failed' });
 } finally {
 setLoading(false);
 }
 };

 const handleSyncPdfs = async () => {
 try {
 setLoading(true);
 const csrf = await fetchCsrfToken();
 await apiClient.post('/pdf/sync-disk', {}, { headers: {'X-CSRF-Token': csrf } });
 setStatus({ type:'success', message:'Local storage scanned. New PDFs added to database.' });
 } catch (err) {
 setStatus({ type:'error', message:'PDF synchronization failed.' });
 } finally {
 setLoading(false);
 }
 };

 const handlePurgeLeads = async () => {
    if (!confirm('WARNING will instantly DELETE all lead data and their activity logs! This cannot be undone. Are you absolutely sure?')) return;
    try {
      setLoading(true);
      const csrf = await fetchCsrfToken();
      const res = await apiClient.delete('/admin/leads/purge', {
        headers: { 'X-CSRF-Token': csrf || '' }
      });
      
      setStatus({ type: 'success', message: res.data?.message || 'All lead data purged successfully.' });
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Purge failed';
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

 return (
 <div className="space-y-12 max-w-5xl mx-auto animate-in fade-in duration-700 pb-20 transition-colors duration-300">
 
 {status && (
 <div className={cn(
"p-6 rounded-[2rem] border-2 flex items-start gap-4 animate-in slide-in-from-top-4",
 status.type ==='success' 
 ?"bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30 text-green-700 dark:text-green-400" 
 :"bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-400"
 )}>
 {status.type ==='success' ? <CheckCircle2 className="h-6 w-6 shrink-0" /> : <AlertCircle className="h-6 w-6 shrink-0" />}
 <div className="flex-1">
 <h4 className="font-black uppercase tracking-tight text-sm">{status.type ==='success' ?'Task Complete' :'Operation Failed'}</h4>
 <p className="text-xs font-medium mt-1 opacity-80">{status.message}</p>
 </div>
 <button onClick={() => setStatus(null)} className="text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100">Dismiss</button>
 </div>
 )}

 {/* Hero Header */}
 <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 text-slate-900 dark:text-white shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
 <div className="absolute top-0 right-0 p-12 opacity-10 dark:opacity-20 transition-opacity">
 <ShieldCheck className="h-40 w-40" />
 </div>
 <div className="relative z-10">
 <h2 className="text-4xl font-black uppercase tracking-tighter">System <span className="text-orange-500 italic">Integrity</span></h2>
 <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg mt-4 uppercase tracking-[0.2em] text-[10px]">administrative portability, local resource synchronization, and disaster recovery tools.</p>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {/* Backup Card */}
 <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-xl flex flex-col justify-between group hover:border-blue-200 dark:hover:border-blue-900/30 transition-all">
 <div>
 <div className="h-16 w-16 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8 group-hover:scale-110 transition-transform">
 <FileJson className="h-8 w-8" />
 </div>
 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Full System Backup</h3>
 <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Download a complete JSON snapshot of all leads, purchases, updates, and system logs.</p>
 </div>
 <button 
 onClick={handleBackup}
 disabled={loading}
 className="mt-10 w-full py-4 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest transition-all hover:bg-blue-700 shadow-xl shadow-blue-600/10 dark:shadow-blue-600/60 flex items-center justify-center gap-3"
 >
 {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CloudDownload className="h-4 w-4" />}
 Generate Snapshot
 </button>
 </div>

 {/* Restore Card */}
 <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-xl flex flex-col justify-between group hover:border-orange-200 dark:hover:border-orange-900/30 transition-all">
 <div>
 <div className="h-16 w-16 rounded-3xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-8 group-hover:scale-110 transition-transform">
 <UploadCloud className="h-8 w-8" />
 </div>
 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Restore Platform</h3>
 <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Overwrite current database with data from a previously generated JSON backup file.</p>
 </div>
 <div className="relative mt-10">
 <input 
 type="file" 
 accept=".json" 
 onChange={handleRestore}
 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
 disabled={loading}
 />
 <button 
 disabled={loading}
 className="w-full py-4 rounded-2xl bg-orange-600 text-white text-xs font-black uppercase tracking-widest transition-all hover:bg-orange-700 shadow-xl shadow-orange-600/10 dark:shadow-orange-600/60 flex items-center justify-center gap-3"
 >
 {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
 Import Snapshot
 </button>
 </div>
 </div>

 {/* Sync Card */}
 <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-xl flex flex-col justify-between group hover:border-green-200 dark:hover:border-green-900/30 transition-all">
 <div>
 <div className="h-16 w-16 rounded-3xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 mb-8 group-hover:scale-110 transition-transform">
 <RefreshCcw className="h-8 w-8" />
 </div>
 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">PDF Intelligence Sync</h3>
 <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Automatically scan server'uploads' folder and register new PDF files into the database.</p>
 </div>
 <button 
 onClick={handleSyncPdfs}
 disabled={loading}
 className="mt-10 w-full py-4 rounded-2xl bg-green-600 text-white text-xs font-black uppercase tracking-widest transition-all hover:bg-green-700 shadow-xl shadow-green-600/10 dark:shadow-green-600/60 flex items-center justify-center gap-3"
 >
 {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
 Sync Cloud Storage
 </button>
 </div>

 {/* Analytics Export */}
 <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-xl flex flex-col justify-between group hover:border-purple-200 dark:hover:border-purple-900/30 transition-all">
 <div>
 <div className="h-16 w-16 rounded-3xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-8 group-hover:scale-110 transition-transform">
 <FileSpreadsheet className="h-8 w-8" />
 </div>
 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Lead Export (XLSX)</h3>
 <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Export all lead contact information and technical dossiers to a Microsoft Excel file.</p>
 </div>
 <button 
 onClick={() => window.open(`${API_BASE_URL}/analytics/export-leads`,'_blank')}
 className="mt-10 w-full py-4 rounded-2xl bg-purple-600 text-white text-xs font-black uppercase tracking-widest transition-all hover:bg-purple-700 shadow-xl shadow-purple-600/10 dark:shadow-purple-600/60 flex items-center justify-center gap-3"
 >
 <CloudDownload className="h-4 w-4" />
 Export Leads to Excel
 </button>
 </div>
 </div>

 </div>
 );
};

