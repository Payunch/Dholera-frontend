import { Metadata } from "next";
import { ClearanceClient } from "./ClearanceClient";

export const metadata: Metadata = {
  title: "Project Clearance & Fee Estimation Engine | Independent Dholera Platform",
  description: "Verify DSIRDA zoning compliance, calculate development permission fees, and plan project parking semantically. Ensure total clearance certainty for Dholera smart city projects.",
  keywords: [
    "Dholera Clearance Engine",
    "DSIRDA Fee Calculator",
    "Dholera Zoning Verification",
    "Dholera Parking Planner",
    "DSIR Development Permission",
    "Dholera Project Compliance"
  ],
};

export default function ClearanceEnginePage() {
  return (
    <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-24 pb-32 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <header className="mb-16 text-center space-y-6">
          <div className="inline-flex items-center rounded-full bg-orange-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 border border-orange-200">
            Spatial Intelligence Hub
          </div>
          <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-7xl uppercase leading-tight">
            Clearance <span className="text-orange-600 italic">&</span> Fee Engine
          </h1>
          <p className="mx-auto max-w-3xl text-lg font-medium text-slate-500 leading-relaxed">
            Configure your project parameters to meet strict DSIRDA structural guidelines. 
            Achieve total clearance certainty before spending capital.
          </p>
        </header>

        <div className="mx-auto max-w-5xl">
          <ClearanceClient />
        </div>
      </div>
    </div>
  );
}
