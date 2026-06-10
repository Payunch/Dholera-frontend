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
  const [plotSize, setPlotSize] = React.useState<string>("");
  const [useType, setUseType] = React.useState<"residential" | "industrial" | "commercial">("residential");
  const [calculatedFee, setCalculatedFee] = React.useState<number | null>(null);

  const calculateFee = () => {
    const size = parseFloat(plotSize);
    if (isNaN(size)) return;
    
    let baseRate = 0;
    switch (useType) {
      case "residential": baseRate = 150; break;
      case "industrial": baseRate = 80; break;
      case "commercial": baseRate = 250; break;
    }
    
    setCalculatedFee(size * baseRate);
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/10">
        <div className="flex border-b border-slate-100 bg-white/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-2 py-6 px-4 transition-all md:flex-row",
                activeTab === tab.id
                  ? "bg-white text-orange-600 shadow-[inset_0_-4px_0_0_#FF7A00]"
                  : "text-slate-400 hover:bg-white hover:text-slate-600"
              )}
            >
              <tab.icon className={cn("h-5 w-5", activeTab === tab.id ? "text-orange-600" : "text-slate-400")} />
              <span className="text-[10px] font-black uppercase tracking-widest md:text-xs font-display">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-12 min-h-[500px]">
          {activeTab === 0 ? (
            <div className="max-w-2xl mx-auto space-y-10 py-10">
               <div className="text-center space-y-4">
                  <h3 className="font-display text-3xl font-black uppercase tracking-tight text-slate-900">
                    Development Permission <span className="text-[#FF7A00]">Fee Engine</span>
                  </h3>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    Estimate official DSIRDA scrutiny fees and development charges based on GDCR 2024.
                  </p>
               </div>

               <div className="grid gap-8 p-10 bg-white rounded-[2rem] border border-slate-100 shadow-inner">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Select Plot Use-Case</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['residential', 'industrial', 'commercial'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => setUseType(type)}
                          className={cn(
                            "py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                            useType === type ? "bg-[#FF7A00] border-[#FF7A00] text-white" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Total Plot Area (Sq. Meters)</label>
                    <input 
                      type="number" 
                      placeholder="ENTER AREA IN SQM..."
                      value={plotSize}
                      onChange={(e) => setPlotSize(e.target.value)}
                      className="w-full px-8 py-5 rounded-2xl bg-white border-2 border-slate-200 outline-none focus:border-[#FF7A00] text-sm font-black tracking-widest text-slate-900 transition-all shadow-sm"
                    />
                  </div>

                  <button 
                    onClick={calculateFee}
                    className="w-full h-16 rounded-2xl bg-white dark:bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-[#FF7A00] transition-all shadow-xl shadow-slate-950/5"
                  >
                    Generate Estimate
                  </button>
               </div>

               {calculatedFee !== null && (
                 <div className="bg-white dark:bg-[#0B132B] rounded-[2rem] p-10 text-center space-y-6 border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-300">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00]">Estimated Development Charges</span>
                    <div className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white font-display tabular-nums">
                      ₹{calculatedFee.toLocaleString()}
                    </div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                      *Note: This is an algorithmic estimate based on base GDCR rates. <br/> Actual scrutiny fees may vary by TP sub-zone and built-up area specifics.
                    </p>
                    <div className="pt-6 border-t border-slate-800">
                       <Link href="/contact" className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] hover:text-orange-400 flex items-center justify-center gap-2">
                          Request Verified Scrutiny Report <ChevronRight className="h-4 w-4" />
                       </Link>
                    </div>
                 </div>
               )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center space-y-8 py-20">
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
                  <div key={i} className="h-2 rounded-full bg-white overflow-hidden">
                    <div 
                      className="h-full bg-orange-600 animate-pulse" 
                      style={{ width: `70%`, animationDelay: `${i * 200}ms` }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 p-8 text-slate-900 dark:text-white md:p-12 shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-10 transition-opacity" />
        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left relative z-10">
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
              Ready to submit your formal application?
            </h2>
            <p className="max-w-xl text-lg font-medium text-slate-500 dark:text-slate-400">
              Lock-in your spatial models and transition seamlessly to an authorized DSIRDA filer profile.
            </p>
          </div>
          <Link
            href="/pdf"
            className="group flex items-center gap-3 rounded-2xl bg-orange-600 px-8 py-5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-orange-500 shadow-xl shadow-orange-600/10"
          >
            Access PDF Hub
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
