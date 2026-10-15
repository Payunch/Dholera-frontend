"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";
import { format } from "date-fns";
import { MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

export function CommentSection({ updateId }) {
  const [comments, setComments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [body, setBody] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/comments/${updateId}`);
      if (res.ok) {
        const payload = await res.json();
        const loadedComments = payload.data || payload || [];
        setComments(loadedComments);
        // Automatically open if there are existing comments
        if (loadedComments.length > 0) {
          setIsOpen(true);
        }
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [updateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_BASE_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updateId, authorName, authorEmail, body, honeypot }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to post comment.");
      } else {
        setSuccess(data.message || "Comment posted successfully! It will appear once approved.");
        setAuthorName("");
        setAuthorEmail("");
        setBody("");
        setHoneypot("");
        fetchComments();
      }
    } catch (err) {
      setError("An error occurred while posting your comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
      {/* Collapsed Header / Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="h-4 w-4 text-slate-400" />
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Discussion {comments.length > 0 ? `(${comments.length})` : ""}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 transition-colors hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400"
        >
          {isOpen ? (
            <>
              Hide Discussion
              <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              {comments.length > 0 ? "View Discussion" : "Leave a Comment"}
              <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="mt-6 space-y-8 animate-in fade-in duration-200">
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Leave a Comment
            </h4>
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email (Optional, private)</label>
                  <input
                    type="email"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div style={{ display: 'none' }}>
                <label>Website</label>
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Comment</label>
                <textarea
                  required
                  rows="3"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Share your thoughts on Dholera infrastructure..."
                />
                <p className="text-[10px] text-slate-400 mt-1.5">* Comments are reviewed prior to publishing.</p>
              </div>
              
              {error && <div className="text-red-500 text-xs font-semibold">{error}</div>}
              {success && <div className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">{success}</div>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 text-xs font-black uppercase tracking-wider transition-colors hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white disabled:opacity-50"
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          </div>

          {comments.length > 0 && (
            <div className="space-y-4 pt-2">
              {comments.map((comment) => (
                <div key={comment.id} className="pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-black text-[10px] uppercase">
                      {comment.author_name.substring(0, 2)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{comment.author_name}</div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        {format(new Date(comment.createdAt), "MMM d, yyyy h:mm a")}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-9">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
