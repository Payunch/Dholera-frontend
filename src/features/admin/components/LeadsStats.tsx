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
    { label: "Total Leads", value: total, icon: Users, color: "border-slate-900 dark:border-slate-800 text-slate-900 dark:text-white bg-white dark:bg-slate-900" },
    { label: "New Inquiries", value: newLeads, icon: UserPlus, color: "border-orange-500 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-600/10" },
    { label: "Converted", value: converted, icon: CheckCircle2, color: "border-green-600 dark:border-green-900/50 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-600/10" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 transition-colors duration-300">
      {stats.map((stat) => (
        <div 
          key={stat.label} 
          className={`flex items-center justify-between rounded-3xl border-2 p-8 shadow-sm dark:shadow-black/100 transition-all hover:shadow-md dark:hover:shadow-black/100 ${stat.color}`}
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
