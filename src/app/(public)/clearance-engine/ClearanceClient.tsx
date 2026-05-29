"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Calculator, 
  Car, 
  Map as MapIcon, 
  CloudUpload, 
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: 0, label: "Fee Engine", icon: Calculator },
  { id: 1, label: "Parking Planner", icon: Car },
  { id: 2, label: "Zoning Map", icon: MapIcon },
  { id: 3, label: "Plan Drop", icon: CloudUpload },
];

export function ClearanceClient() {
  const [activeTab, setActiveTab] = React.useState(0);
  const progressWidths = [72, 58, 84, 46];

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-2 py-6 px-4 transition-all md:flex-row",
                activeTab === tab.id
                  ? "bg-white text-orange-600 shadow-[inset_0_-4px_0_0_#ea580c]"
                  : "text-slate-400 hover:bg-white hover:text-slate-600"
              )}
            >
              <tab.icon className={cn("h-5 w-5", activeTab === tab.id ? "text-orange-600" : "text-slate-400")} />
              <span className="text-[10px] font-black uppercase tracking-widest md:text-xs font-display">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Placeholder */}
        <div className="p-6 md:p-12 min-h-[500px] flex flex-col items-center justify-center text-center space-y-8">
          <div className="h-24 w-24 rounded-[2rem] bg-orange-50 flex items-center justify-center text-orange-600">
            {React.createElement(tabs[activeTab].icon, { className: "h-12 w-12" })}
          </div>
          
          <div className="max-w-xl space-y-4">
            <h3 className="font-display text-2xl font-black uppercase tracking-tight text-slate-900">
              {tabs[activeTab].label} Initialization
            </h3>
            <p className="text-lg font-medium text-slate-500 italic leading-relaxed">
              Our spatial intelligence engine is loading regional zoning data and GDCR 2024 compliance rules for Dholera SIR...
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-orange-600 animate-pulse" 
                  style={{ width: `${progressWidths[i - 1]}%`, animationDelay: `${i * 200}ms` }} 
                />
              </div>
            ))}
          </div>

          <button className="rounded-2xl bg-slate-900 px-10 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600 shadow-xl">
            Manual Override
          </button>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="rounded-3xl bg-slate-900 p-8 text-white md:p-12 shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-10 transition-opacity" />
        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left relative z-10">
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
              Ready to submit your formal application?
            </h2>
            <p className="max-w-xl text-lg font-medium text-slate-400">
              Lock-in your spatial models and transition seamlessly to an authorized DSIRDA filer profile.
            </p>
          </div>
          <Link
            href="/professional/dashboard"
            className="group flex items-center gap-3 rounded-2xl bg-orange-600 px-8 py-5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-orange-500 shadow-xl shadow-orange-600/20"
          >
            Create Professional Profile
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
