"use client";

import Link from "next/link";
import { FileText, ShieldCheck, UserCircle2, ArrowLeft } from "lucide-react";
import { useLead } from "@/providers/LeadProvider";
import { ProfessionalRouteGuard } from "@/components/professional/ProfessionalRouteGuard";

const dashboardCards = [
  {
    title: "My Profile",
    description: "Update your professional credentials and contact information.",
    href: "/professional/profile",
    icon: UserCircle2,
  },
  {
    title: "Clearance Requests",
    description: "Track and manage your submitted clearance certificate requests.",
    href: "/professional/clearance-requests",
    icon: ShieldCheck,
  },
  {
    title: "Documents",
    description: "Access your purchased official documents and guides.",
    href: "/professional/documents",
    icon: FileText,
  },
];

export default function ProfessionalDashboard() {
  const { verifiedLead } = useLead();

  return (
    <ProfessionalRouteGuard>
      <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="bg-slate-900 px-6 py-8 text-white">
              <h1 className="text-3xl font-bold">Professional Portal</h1>
              <p className="mt-2 text-slate-300">Manage your Dholera SIR profile, requests, and purchased documents.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 border-b border-slate-200 bg-slate-50 p-6 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Account</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{verifiedLead?.name || "Verified Professional"}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{verifiedLead?.phone || "Not available"}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{verifiedLead?.email || "Not provided"}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {dashboardCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <Link
                      key={card.href}
                      href={card.href}
                      className="group rounded-lg border border-slate-200 p-6 transition-colors hover:border-orange-500"
                    >
                      <div className="mb-3 inline-flex rounded-xl bg-orange-50 p-2 text-orange-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-slate-900">{card.title}</h3>
                      <p className="text-slate-600">{card.description}</p>
                      <p className="mt-4 text-sm font-bold uppercase tracking-wider text-orange-600">Open section</p>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-10 rounded-lg border border-orange-100 bg-orange-50 p-8 text-center">
                <h2 className="mb-2 text-xl font-bold text-slate-900">Dashboard Upgrade In Progress</h2>
                <p className="mb-6 text-slate-600">Core access is now active. Profile, requests, and documents sections are ready for full data wiring.</p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-6 py-2 font-medium text-white transition-colors hover:bg-orange-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfessionalRouteGuard>
  );
}
