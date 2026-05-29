"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProfessionalRouteGuard } from "@/components/professional/ProfessionalRouteGuard";
import { API_BASE_URL } from "@/lib/api";
import { useLead } from "@/providers/LeadProvider";

type PurchaseRecord = {
  id: number;
  amount: number;
  currency: string;
  status: string;
  purchasedAt: string;
  document: {
    id: number;
    title: string;
    category: string;
    file_path: string;
    is_protected: boolean;
  } | null;
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString();
};

const formatAmount = (paise: number, currency: string) => {
  const rupees = Number.isFinite(paise) ? paise / 100 : 0;
  return `${currency || "INR"} ${rupees.toFixed(2)}`;
};

export default function ProfessionalDocumentsPage() {
  const { verifiedLead } = useLead();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);

  useEffect(() => {
    let active = true;

    const loadPurchases = async () => {
      if (!verifiedLead?.token) {
        if (active) setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/payment/my-purchases`, {
          headers: {
            Authorization: `Bearer ${verifiedLead.token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load purchased documents.");
        }

        if (!active) return;
        setPurchases(Array.isArray(data?.purchases) ? data.purchases : []);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load purchased documents.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPurchases();

    return () => {
      active = false;
    };
  }, [verifiedLead?.token]);

  return (
    <ProfessionalRouteGuard>
      <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">Documents</h1>
          <p className="mt-2 text-sm text-slate-600">
            Purchased official documents are listed below from your completed payments.
          </p>

          {loading && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm font-semibold text-slate-600">
              Loading purchased documents...
            </div>
          )}

          {!loading && error && (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && purchases.length === 0 && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm font-semibold text-slate-600">
              No completed purchases found yet.
            </div>
          )}

          {!loading && !error && purchases.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-slate-500">Document</th>
                    <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-slate-500">Category</th>
                    <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-slate-500">Amount</th>
                    <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-slate-500">Purchased</th>
                    <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td className="px-4 py-3 font-semibold text-slate-900">{purchase.document?.title || "Document"}</td>
                      <td className="px-4 py-3 text-slate-700">{purchase.document?.category || "-"}</td>
                      <td className="px-4 py-3 text-slate-700">{formatAmount(purchase.amount, purchase.currency)}</td>
                      <td className="px-4 py-3 text-slate-700">{formatDate(purchase.purchasedAt)}</td>
                      <td className="px-4 py-3 text-slate-700">
                        {purchase.document?.id ? (
                          <a
                            href={`${API_BASE_URL}/pdf/view/${purchase.document.id}?token=${encodeURIComponent(verifiedLead?.token || "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-orange-600 hover:text-orange-700"
                          >
                            View PDF
                          </a>
                        ) : (
                          <span className="text-slate-400">Unavailable</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

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
