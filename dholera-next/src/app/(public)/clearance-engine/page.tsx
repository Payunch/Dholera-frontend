import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ClearanceClient } from "./ClearanceClient";

export const metadata: Metadata = {
  title: "Project Clearance & Fee Estimation Engine | Official Dholera Platform",
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
    <div className="bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-600">
            Spatial Intelligence Hub
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl uppercase">
            Clearance <span className="text-blue-600">&</span> Fee Engine
          </h1>
          <p className="mx-auto max-w-3xl text-lg font-medium text-slate-500">
            Configure your project parameters to meet strict DSIRDA structural guidelines. 
            Achieve total clearance certainty before spending capital.
          </p>
        </header>

        <ClearanceClient />
      </div>
    </div>
  );
}
