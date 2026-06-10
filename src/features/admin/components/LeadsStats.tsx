"use client";

import { Lead } from "@/types/admin";
import { Users, UserPlus, CheckCircle2 } from "lucide-react";

interface LeadsStatsProps {
  leads: Lead[];
}

export function LeadsStats({ leads }: LeadsStatsProps) {
  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const converted = leads.filter((l) => l.status === "Converted").length;

  const stats = [
    { label: "Total Leads", value: total, icon: Users, color: "border-slate-900 text-slate-900 bg-white" },
    { label: "New Inquiries", value: newLeads, icon: UserPlus, color: "border-orange-500 text-orange-600 bg-orange-50" },
    { label: "Converted", value: converted, icon: CheckCircle2, color: "border-green-600 text-green-700 bg-green-50" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {stats.map((stat) => (
        <div 
          key={stat.label} 
          className={`flex items-center justify-between rounded-3xl border-2 p-8 shadow-sm transition-all hover:shadow-md ${stat.color}`}
        >
          <div className="space-y-1">
            <p className="text-sm font-black uppercase tracking-widest opacity-70">{stat.label}</p>
            <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
          </div>
          <stat.icon className="h-10 w-10 opacity-20" />
        </div>
      ))}
    </div>
  );
}
