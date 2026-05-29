"use client";

import { useState } from "react";
import Link from "next/link";
import { ProfessionalRouteGuard } from "@/components/professional/ProfessionalRouteGuard";
import { useLead } from "@/providers/LeadProvider";
import { API_BASE_URL } from "@/lib/api";

const formatDate = (value?: string) => {
  if (!value) return "Not available";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Not available";
  return parsed.toLocaleString();
};

export default function ProfessionalProfilePage() {
  const { verifiedLead, loginLead } = useLead();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [prevLead, setPrevLead] = useState(verifiedLead);
  if (verifiedLead !== prevLead) {
    setPrevLead(verifiedLead);
    setName(verifiedLead?.name || "");
    setEmail(verifiedLead?.email || "");
  }

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/leads/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verifiedLead?.token || ""}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to save profile");
      }

      if (data?.lead && verifiedLead?.token) {
        loginLead({
          ...verifiedLead,
          ...data.lead,
          token: verifiedLead.token,
        });
      }

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProfessionalRouteGuard>
      <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">My Profile</h1>
          <p className="mt-2 text-sm text-slate-600">Update your profile details below. Phone remains locked to your verified account.</p>

          <form onSubmit={handleSave} className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-orange-500"
                maxLength={120}
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-orange-500"
                maxLength={180}
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone (Verified)</label>
              <input
                type="text"
                value={verifiedLead?.phone || ""}
                readOnly
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700"
              />
            </div>

            {message && <p className="text-sm font-semibold text-emerald-700">{message}</p>}
            {error && <p className="text-sm font-semibold text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={saving || !verifiedLead?.token}
              className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Lead ID</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{verifiedLead?.id ?? "Not available"}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Registration</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {verifiedLead?.is_registered ? "Registered Professional" : "Lead Session"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Joined</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{formatDate(verifiedLead?.createdAt)}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Link href="/professional/dashboard" className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
              Back to Dashboard
            </Link>
            <Link href="/" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Home
            </Link>
          </div>
        </div>
      </div>
    </ProfessionalRouteGuard>
  );
}
