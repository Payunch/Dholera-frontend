"use client";

import * as React from "react";
import { 
  BarChart3, 
  Users, 
  ShieldCheck, 
  Settings, 
  LogOut,
  ChevronRight,
  TrendingUp,
  Activity,
  Globe
} from "lucide-react";
import { Lead, WhatsAppStats } from "@/types/admin";
import { LeadsStats } from "./LeadsStats";
import { LeadsTable } from "./LeadsTable";
import { cn } from "@/lib/utils";

interface AdminDashboardClientProps {
  initialLeads: Lead[];
  initialWaStats: WhatsAppStats;
}

export function AdminDashboardClient({ initialLeads, initialWaStats }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = [
    { label: "Leads", icon: Users },
    { label: "Professionals", icon: ShieldCheck },
    { label: "Insights", icon: Activity },
    { label: "System", icon: Settings },
  ];

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
            
            <button className="flex items-center gap-2 rounded-xl border-2 border-slate-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:border-red-100 hover:text-red-500 transition-all">
              <LogOut className="h-4 w-4" />
              Terminate
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
                        <Globe className="h-5 w-5" />
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

        {activeTab !== 0 && (
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
      </main>
    </div>
  );
}
