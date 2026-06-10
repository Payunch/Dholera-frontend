"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Activity,
  Globe,
  CheckSquare,
  Database,
  Loader2
} from "lucide-react";
import { Lead, WhatsAppStats } from "@/types/admin";
import { LeadsStats } from "./LeadsStats";
import { LeadsTable } from "./LeadsTable";
import { UpdatesManagement } from "./UpdatesManagement";
import { PaymentApprovals } from "./PaymentApprovals";
import { DatabaseExplorer } from "./DatabaseExplorer";
import { PlatformInsights } from "./PlatformInsights";
import { SystemManagement } from "./SystemManagement";
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
  const [pendingCount, setPendingCount] = React.useState(0);

  const fetchPendingCount = React.useCallback(async () => {
    try {
      const resp = await fetch(`${API_BASE_URL}/payment/admin/count-pending`, { credentials: 'include' });
      if (resp.ok) {
        const data = await resp.json();
        setPendingCount(data.count || 0);
      }
    } catch (e) {}
  }, []);

  React.useEffect(() => {
    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 30000);
    return () => clearInterval(interval);
  }, [fetchPendingCount]);

  const tabs = [
    { label: "Leads", icon: Users },
    { label: "Approvals", icon: CheckSquare, badge: pendingCount },
    { label: "Updates", icon: Globe },
    { label: "Insights", icon: Activity },
    { label: "Database", icon: Database },
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
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-[100] px-8 py-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="h-12 w-12 rounded-2xl bg-orange-600 flex items-center justify-center text-slate-900 dark:text-white shadow-lg shadow-orange-600/10 dark:shadow-orange-600/60">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Master <span className="text-orange-600">Control</span></h1>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">Dholera Intelligence Terminal v4.0</p>
            </div>
          </div>

          <nav className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
            {tabs.map((tab, idx) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2.5",
                  activeTab === idx 
                    ? "bg-white dark:bg-slate-900 text-orange-600 shadow-sm dark:shadow-white/10" 
                    : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="bg-orange-600 text-slate-900 dark:text-white text-[8px] h-5 w-5 rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:border-red-50 dark:hover:border-red-900/30 transition-all"
          >
            {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            Secure Exit
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-8">
        <div className="max-w-[1600px] mx-auto">
           {activeTab === 0 && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <LeadsStats leads={initialLeads} />
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-white/10 overflow-hidden">
                   <LeadsTable leads={initialLeads} />
                </div>
             </div>
           )}

           {activeTab === 1 && <PaymentApprovals />}
           
           {activeTab === 2 && <UpdatesManagement />}

           {activeTab === 3 && <PlatformInsights />}

           {activeTab === 4 && <DatabaseExplorer />}

           {activeTab === 5 && <SystemManagement />}
        </div>
      </main>

      <footer className="py-8 px-8 border-t border-slate-200 dark:border-slate-800 opacity-50">
         <div className="max-w-[1600px] mx-auto flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            <div>Dholera Real Estate Intelligence System</div>
            <div>Authorized Operations Only</div>
         </div>
      </footer>
    </div>
  );
}
