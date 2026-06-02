"use client";

import { Lead } from "@/types/admin";
import { MessageSquare, Phone, Info, Eye, Clock, ShieldCheck, MapPin, Monitor, X, Globe, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl">
        <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Recent Activity</h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Database Stream</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="px-8 py-4">Investor Details</th>
                <th className="px-8 py-4">Intelligence</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {leads.map((lead) => (
                <tr key={lead.id} className="group transition-colors hover:bg-slate-50/50">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900">{lead.name}</span>
                        {lead.is_pro && <ShieldCheck className="h-3 w-3 text-orange-600" />}
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{lead.phone}</span>
                      <span className="text-[10px] text-slate-300 font-medium">{lead.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <Clock className="h-3 w-3" /> {(lead as any).totalTimeSpent ? Math.round((lead as any).totalTimeSpent / 60) : 0} Mins
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <Eye className="h-3 w-3" /> {(lead as any).uniquePagesCount || 0} Pages
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest",
                      lead.status === "New" ? "bg-orange-100 text-orange-600" :
                      lead.status === "Converted" ? "bg-green-100 text-green-700" :
                      "bg-blue-100 text-blue-600"
                    )}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="rounded-xl border border-slate-200 p-2 text-slate-400 transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900"
                        title="View Full DB Details"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}`, '_blank')}
                        className="rounded-xl border border-slate-200 p-2 text-slate-400 transition-all hover:bg-green-500 hover:text-white hover:border-green-500"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
              <div className="bg-slate-900 p-8 text-white flex items-center justify-between">
                 <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">{selectedLead.name}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Lead ID: {selectedLead.id} • {selectedLead.phone}</p>
                 </div>
                 <button onClick={() => setSelectedLead(null)} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                    <X className="h-6 w-6" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                 {/* Intelligence Grid */}
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: Clock, label: "Time Spent", value: `${Math.round(((selectedLead as any).totalTimeSpent || 0) / 60)}m` },
                      { icon: Eye, label: "Views", value: `${(selectedLead as any).total_sessions || 0} Sessions` },
                      { icon: MapPin, label: "Last IP", value: (selectedLead as any).sessions?.[0]?.ip || "Unknown" },
                      { icon: Globe, label: "Source", value: selectedLead.source || "Direct" },
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                         <item.icon className="h-4 w-4 text-orange-600 mb-2" />
                         <span className="block text-[8px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                         <span className="block text-xs font-black text-slate-900 mt-1">{item.value}</span>
                      </div>
                    ))}
                 </div>

                 {/* Technical Details */}
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                       <Monitor className="h-3 w-3" /> Technical Fingerprint
                    </h4>
                    <div className="bg-slate-900 rounded-2xl p-6 text-slate-300 font-mono text-[10px] break-all leading-relaxed border border-white/5 shadow-inner">
                       {selectedLead.browserFingerprint || "No fingerprint captured"}
                    </div>
                 </div>

                 {/* Journey / Pages */}
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                       <Calendar className="h-3 w-3" /> Activity History
                    </h4>
                    <div className="space-y-2">
                       {(selectedLead as any).visitedPages?.length > 0 ? (
                         (selectedLead as any).visitedPages.map((page: string, i: number) => (
                           <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl">
                              <div className="h-6 w-6 rounded-lg bg-orange-50 flex items-center justify-center text-[10px] font-black text-orange-600">{i+1}</div>
                              <span className="text-xs font-bold text-slate-700">{page}</span>
                           </div>
                         ))
                       ) : (
                         <p className="text-xs text-slate-400 italic">No page activity recorded</p>
                       )}
                    </div>
                 </div>

                 {/* Flags */}
                 <div className="flex flex-wrap gap-2">
                    <div className={cn("px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest", selectedLead.is_registered ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400")}>Registered</div>
                    <div className={cn("px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest", selectedLead.is_trial ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-400")}>Trial Used</div>
                    <div className={cn("px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest", selectedLead.is_pro ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-400")}>PRO Access</div>
                    <div className={cn("px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest", selectedLead.verified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>OTP Verified</div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
}
