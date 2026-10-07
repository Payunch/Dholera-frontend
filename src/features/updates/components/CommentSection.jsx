"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";
import { format } from "date-fns";

export function CommentSection({ updateId }) {
  const [comments, setComments] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [body, setBody] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchComments();
  }, [updateId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/comments/${updateId}`);
      if (res.ok) {
        const payload = await res.json();
        setComments(payload.data || payload || []);
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

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
        setSuccess(data.message || "Comment posted successfully!");
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
    <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-12">
      <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-8">
        Discussion
      </h3>

      <div className="mb-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">Leave a Comment</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Name</label>
            <input
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email (Optional, not published)</label>
            <input
              type="email"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="you@example.com"
            />
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
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Comment</label>
            <textarea
              required
              rows="4"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Share your thoughts..."
            />
            <p className="text-[10px] text-slate-400 mt-2">* Comments with external links are not allowed. Your comment will be moderated before appearing.</p>
          </div>
          
          {error && <div className="text-red-500 text-sm font-semibold">{error}</div>}
          {success && <div className="text-green-500 text-sm font-semibold">{success}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 text-xs font-black uppercase tracking-widest transition-colors hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white disabled:opacity-50"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No comments yet. Be the first to start the discussion!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-black text-[10px] uppercase">
                  {comment.author_name.substring(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{comment.author_name}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    {format(new Date(comment.createdAt), "MMM d, yyyy h:mm a")}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-11">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
