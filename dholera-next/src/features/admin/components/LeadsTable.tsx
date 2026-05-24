"use client";

import { Lead } from "@/types/admin";
import { MessageSquare, MoreVertical, Phone } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl">
      <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Recent Activity</h3>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Updates</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <tr>
              <th className="px-8 py-4">Investor</th>
              <th className="px-8 py-4">Source</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {leads.slice(0, 10).map((lead) => (
              <tr key={lead.id} className="group transition-colors hover:bg-slate-50/50">
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="font-black text-slate-900">{lead.name}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{lead.phone}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="rounded-lg border border-slate-100 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {lead.source}
                  </span>
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
                    <button className="rounded-full bg-green-500 p-2 text-white transition-transform hover:scale-110">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button className="rounded-full bg-slate-900 p-2 text-white transition-transform hover:scale-110">
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
