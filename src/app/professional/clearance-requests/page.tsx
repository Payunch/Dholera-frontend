"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ProfessionalRouteGuard } from "@/components/professional/ProfessionalRouteGuard";
import { API_BASE_URL } from "@/lib/api";
import { useLead } from "@/providers/LeadProvider";

type ClearanceModel = {
  id: number;
  projectName: string;
  modelType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  configurationData?: Record<string, unknown>;
};

const STATUS_FILTERS = ["All", "Draft", "Submitted", "Under Review", "Approved", "Rejected", "Completed"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

const formatDate = (value?: string) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString();
};

export default function ProfessionalClearanceRequestsPage() {
  const { verifiedLead } = useLead();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [models, setModels] = useState<ClearanceModel[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [selectedModel, setSelectedModel] = useState<ClearanceModel | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusTone = (status?: string) => {
    const normalized = String(status || "draft").toLowerCase();
    if (normalized.includes("approved") || normalized.includes("completed")) {
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
    if (normalized.includes("reject") || normalized.includes("failed")) {
      return "bg-red-100 text-red-800 border-red-200";
    }
    if (normalized.includes("review") || normalized.includes("pending") || normalized.includes("submitted")) {
      return "bg-amber-100 text-amber-800 border-amber-200";
    }
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const buildTimeline = (status?: string) => {
    const normalized = String(status || "draft").toLowerCase();
    const isRejected = normalized.includes("reject") || normalized.includes("failed");
    const isApproved = normalized.includes("approved") || normalized.includes("completed");
    const inReview = normalized.includes("review") || normalized.includes("pending") || normalized.includes("submitted") || isApproved || isRejected;
    const submitted = normalized !== "draft";

    return [
      { key: "draft", label: "Draft Created", done: true },
      { key: "submitted", label: "Submitted", done: submitted },
      { key: "review", label: "Under Review", done: inReview },
      { key: "approved", label: isRejected ? "Decision: Rejected" : "Approved", done: isApproved || isRejected },
      { key: "completed", label: "Completed", done: normalized.includes("completed") },
    ];
  };

  useEffect(() => {
    let active = true;

    const loadModels = async () => {
      if (!verifiedLead?.token) {
        if (active) setLoading(false);
        return;
      }

      try {
        const query = verifiedLead.id ? `?leadId=${verifiedLead.id}` : "";
        const response = await fetch(`${API_BASE_URL}/clearance/my-models${query}`, {
          headers: {
            Authorization: `Bearer ${verifiedLead.token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load clearance requests.");
        }

        if (!active) return;
        const list = Array.isArray(data?.data) ? data.data : [];
        setModels(list);
        if (list.length > 0) {
          const first = list[0] as ClearanceModel;
          setSelectedId(first.id);
          setSelectedModel(first);
        }
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load clearance requests.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadModels();

    return () => {
      active = false;
    };
  }, [verifiedLead?.id, verifiedLead?.token]);

  useEffect(() => {
    let active = true;

    const loadDetails = async () => {
      if (!selectedId) {
        setSelectedModel(null);
        return;
      }

      setDetailLoading(true);
      setDetailError("");

      try {
        const response = await fetch(`${API_BASE_URL}/clearance/${selectedId}`, {
          headers: {
            Authorization: `Bearer ${verifiedLead?.token || ""}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load request details.");
        }

        if (!active) return;
        const detail = (data?.data || null) as ClearanceModel | null;
        setSelectedModel(detail);
      } catch (err) {
        if (!active) return;
        setDetailError(err instanceof Error ? err.message : "Failed to load request details.");
      } finally {
        if (active) setDetailLoading(false);
      }
    };

    loadDetails();

    return () => {
      active = false;
    };
  }, [selectedId, verifiedLead?.token]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const statusValue = String(model.status || "draft").toLowerCase();
      const projectValue = String(model.projectName || `Model ${model.id}`).toLowerCase();
      const modelTypeValue = String(model.modelType || "").toLowerCase();

      let statusMatch = true;
      if (statusFilter !== "All") {
        const filterNeedle = statusFilter.toLowerCase();
        if (statusFilter === "Under Review") {
          statusMatch = statusValue.includes("review") || statusValue.includes("pending") || statusValue.includes("submitted");
        } else if (statusFilter === "Rejected") {
          statusMatch = statusValue.includes("reject") || statusValue.includes("failed");
        } else {
          statusMatch = statusValue.includes(filterNeedle);
        }
      }

      const searchMatch =
        !normalizedQuery ||
        projectValue.includes(normalizedQuery) ||
        modelTypeValue.includes(normalizedQuery);

      return statusMatch && searchMatch;
    });
  }, [models, statusFilter, normalizedQuery]);

  // Update selectedId during render if the current selection is no longer valid
  const exists = filteredModels.some((model) => model.id === selectedId);
  if (!exists && filteredModels.length > 0 && selectedId !== filteredModels[0].id) {
    setSelectedId(filteredModels[0].id);
  } else if (filteredModels.length === 0 && selectedId !== null) {
    setSelectedId(null);
  }

  return (
    <ProfessionalRouteGuard>
      <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">Clearance Requests</h1>
          <p className="mt-2 text-sm text-slate-600">
            Your saved clearance models are listed here from the backend.
          </p>

          {loading && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm font-semibold text-slate-600">
              Loading clearance requests...
            </div>
          )}

          {!loading && error && (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && models.length === 0 && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm font-semibold text-slate-600">
              No clearance requests found yet.
            </div>
          )}

          {!loading && !error && models.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
              <div className="overflow-hidden rounded-xl border border-slate-200 lg:col-span-3">
                <div className="border-b border-slate-200 bg-white p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {STATUS_FILTERS.map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setStatusFilter(filter)}
                        className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                          statusFilter === filter
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search by project or model type"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-slate-500">Project</th>
                      <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-slate-500">Model Type</th>
                      <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-slate-500">Status</th>
                      <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-slate-500">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredModels.map((model) => (
                      <tr
                        key={model.id}
                        onClick={() => setSelectedId(model.id)}
                        className={`cursor-pointer transition-colors ${selectedId === model.id ? "bg-orange-50" : "hover:bg-slate-50"}`}
                      >
                        <td className="px-4 py-3 font-semibold text-slate-900">{model.projectName || `Model ${model.id}`}</td>
                        <td className="px-4 py-3 text-slate-700">{model.modelType || "-"}</td>
                        <td className="px-4 py-3 text-slate-700">{model.status || "Draft"}</td>
                        <td className="px-4 py-3 text-slate-700">{formatDate(model.createdAt)}</td>
                      </tr>
                    ))}

                    {filteredModels.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-sm font-semibold text-slate-500">
                          No requests match this filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 lg:col-span-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Request Details</p>

                {detailLoading && (
                  <p className="mt-4 text-sm font-semibold text-slate-600">Loading details...</p>
                )}

                {!detailLoading && detailError && (
                  <p className="mt-4 text-sm font-semibold text-red-700">{detailError}</p>
                )}

                {!detailLoading && !detailError && selectedModel && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Project</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{selectedModel.projectName || `Model ${selectedModel.id}`}</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Current Status</p>
                      <span className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${getStatusTone(selectedModel.status)}`}>
                        {selectedModel.status || "Draft"}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Timeline</p>
                      <ol className="mt-3 space-y-2">
                        {buildTimeline(selectedModel.status).map((step) => (
                          <li key={step.key} className="flex items-center gap-3 text-sm">
                            <span className={`inline-block h-2.5 w-2.5 rounded-full ${step.done ? "bg-emerald-500" : "bg-slate-300"}`} />
                            <span className={step.done ? "font-semibold text-slate-900" : "text-slate-500"}>{step.label}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Created</p>
                        <p className="mt-1 font-semibold text-slate-800">{formatDate(selectedModel.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Updated</p>
                        <p className="mt-1 font-semibold text-slate-800">{formatDate(selectedModel.updatedAt)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
