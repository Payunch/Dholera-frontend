"use client";

import * as React from "react";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Image as ImageIcon, 
  Loader2, 
  Check, 
  X, 
  Eye,
  Search,
  ExternalLink
} from "lucide-react";
import { Update } from "@/types/update";
import { apiClient } from "@/lib/api";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";

export function UpdatesManagement() {
  const [updates, setUpdates] = React.useState<Update[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [editingId, setEditingId] = React.useState<number | "new" | null>(null);
  
  // Form State
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState<Update["category"]>("General");
  const [published, setPublished] = React.useState(true);
  const [publishedAt, setPublishedAt] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const loadUpdates = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/updates?all=true");
      setUpdates(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load updates:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadUpdates();
  }, []);

  const handleEdit = (update: Update | "new") => {
    if (update === "new") {
      setEditingId("new");
      setTitle("");
      setContent("");
      setCategory("General");
      setPublished(true);
      setPublishedAt(new Date().toISOString().slice(0, 16));
      setImageFile(null);
      setImageUrl("");
    } else {
      setEditingId(update.id);
      setTitle(update.title);
      setContent(update.content);
      setCategory(update.category);
      setPublished(update.published);
      setPublishedAt(new Date(update.publishedAt || update.createdAt).toISOString().slice(0, 16));
      setImageFile(null);
      setImageUrl(update.imageUrl || "");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this update? This action cannot be undone.")) return;
    
    try {
      await apiClient.delete(`/updates/${id}`);
      setUpdates(updates.filter(u => u.id !== id));
    } catch (err) {
      alert("Failed to delete update");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("published", String(published));
      formData.append("publishedAt", new Date(publishedAt).toISOString());
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (imageUrl) {
        formData.append("imageUrl", imageUrl);
      }

      if (editingId === "new") {
        await apiClient.post("/updates", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await apiClient.put(`/updates/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      await loadUpdates();
      setEditingId(null);
    } catch (err) {
      alert("Failed to save update");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUpdates = updates.filter(u => 
    u.title.toLowerCase().includes(search.toLowerCase()) ||
    u.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && updates.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search updates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium transition-all focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
          />
        </div>
        <button
          onClick={() => handleEdit("new")}
          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600 shadow-lg shadow-slate-900/10"
        >
          <Plus className="h-4 w-4" />
          New Update
        </button>
      </div>

      {/* Grid of Updates */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUpdates.map((update) => (
          <div 
            key={update.id}
            className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:border-orange-200"
          >
            <div className="flex items-start justify-between mb-4">
              <span className={cn(
                "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white",
                update.published ? "bg-orange-600" : "bg-slate-400"
              )}>
                {update.published ? "Published" : "Draft"}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(update)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-50 hover:text-orange-600 transition-colors"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(update.id)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h4 className="text-lg font-black leading-tight text-slate-900 mb-2 line-clamp-2">
              {update.title}
            </h4>
            
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              {update.category} • {format(new Date(update.publishedAt || update.createdAt), "MMM d, yyyy")}
            </p>

            <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
               <a 
                 href={`/blogs/${update.id}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 flex items-center gap-1"
               >
                 View Live <ExternalLink className="h-3 w-3" />
               </a>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/New Modal Overlay */}
      {editingId !== null && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-8">
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                {editingId === "new" ? "Create New Update" : "Edit Update"}
              </h3>
              <button 
                onClick={() => setEditingId(null)}
                className="rounded-2xl p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Article Title</label>
                    <input
                      required
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a compelling title..."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold transition-all focus:border-orange-600 focus:bg-white focus:ring-0"
                    />
                  </div>

                  {/* Category & Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Update["category"])}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold appearance-none transition-all focus:border-orange-600 focus:bg-white focus:ring-0"
                      >
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Planning">Planning</option>
                        <option value="Investment">Investment</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Status</label>
                      <button
                        type="button"
                        onClick={() => setPublished(!published)}
                        className={cn(
                          "flex w-full items-center justify-center gap-2 rounded-2xl border py-4 text-sm font-black uppercase tracking-widest transition-all",
                          published 
                            ? "border-orange-200 bg-orange-50 text-orange-600" 
                            : "border-slate-200 bg-slate-50 text-slate-400"
                        )}
                      >
                        {published ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                        {published ? "Published" : "Draft"}
                      </button>
                    </div>
                  </div>

                  {/* Published Date */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Publication Date & Time</label>
                    <input
                      type="datetime-local"
                      value={publishedAt}
                      onChange={(e) => setPublishedAt(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold transition-all focus:border-orange-600 focus:bg-white focus:ring-0"
                    />
                  </div>

                  {/* Image Source */}
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Cover Image</label>
                    
                    {/* Image Preview */}
                    {(imageFile || imageUrl) && (
                      <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
                        <Image
                          src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => { setImageFile(null); setImageUrl(""); }}
                          className="absolute right-4 top-4 rounded-xl bg-white/90 p-2 text-red-600 shadow-lg backdrop-blur hover:bg-white transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    {!imageFile && !imageUrl && (
                      <div className="grid grid-cols-2 gap-4">
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 transition-all hover:border-orange-200 hover:bg-orange-50 group">
                          <ImageIcon className="h-6 w-6 text-slate-400 group-hover:text-orange-600" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-orange-600">Upload Image</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                          />
                        </label>
                        <div className="flex flex-col gap-2">
                          <input
                            type="text"
                            placeholder="Or paste Unsplash URL..."
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold transition-all focus:border-orange-600 focus:bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Editor */}
                <div className="space-y-2 flex flex-col">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Article Content (Markdown supported)</label>
                  <textarea
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your analysis here..."
                    className="flex-1 w-full min-h-[400px] rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium leading-relaxed transition-all focus:border-orange-600 focus:bg-white focus:ring-0"
                  />
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-4 border-t border-slate-100 p-8 bg-slate-50/50">
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="rounded-2xl px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-3 rounded-2xl bg-slate-900 px-10 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-slate-900/10 transition-all hover:bg-orange-600 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Synchronizing...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Save Update
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
