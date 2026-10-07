"use client";

import React, { useState, useEffect } from "react";
import { API_BASE_URL, apiClient } from "@/lib/api";
import { format } from "date-fns";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/updates/comments/admin/all');
      setComments(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch comments.");
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async (id, status) => {
    try {
      await apiClient.patch(`/updates/comments/admin/${id}`, { status });
      // Update local state to reflect the change
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update comment status");
    }
  };

  const filteredComments = comments.filter((c) => c.status === filter);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Comment Moderation</h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 font-semibold">
          {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-4">
        {['pending', 'approved', 'rejected', 'spam'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-colors ${
              filter === status
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {status} ({comments.filter((c) => c.status === status).length})
          </button>
        ))}
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 font-bold uppercase tracking-widest">Loading...</div>
      ) : filteredComments.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center shadow-sm">
          <p className="text-slate-500 font-medium text-lg">No comments found for status: {filter}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div key={comment.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-all hover:border-slate-300 hover:shadow-md">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 font-black uppercase text-sm">
                    {comment.author_name.substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{comment.author_name}</h3>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-slate-500 mt-0.5">
                      {comment.author_email && (
                        <span>{comment.author_email} • </span>
                      )}
                      <span>{format(new Date(comment.createdAt), "MMM d, yyyy h:mm a")}</span>
                      <span> • IP: {comment.ip_hash.substring(0, 8)}...</span>
                      {comment.Update && (
                        <span> • Post ID: {comment.Update.id}</span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed text-sm md:text-base mt-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {comment.content}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                {filter !== 'approved' && (
                  <button
                    onClick={() => handleModerate(comment.id, 'approved')}
                    className="flex-1 md:flex-none px-6 py-2 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors border border-green-200 hover:border-green-600"
                  >
                    Approve
                  </button>
                )}
                {filter !== 'rejected' && (
                  <button
                    onClick={() => handleModerate(comment.id, 'rejected')}
                    className="flex-1 md:flex-none px-6 py-2 bg-orange-50 text-orange-700 hover:bg-orange-600 hover:text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors border border-orange-200 hover:border-orange-600"
                  >
                    Reject
                  </button>
                )}
                {filter !== 'spam' && (
                  <button
                    onClick={() => handleModerate(comment.id, 'spam')}
                    className="flex-1 md:flex-none px-6 py-2 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors border border-red-200 hover:border-red-600"
                  >
                    Mark Spam
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
