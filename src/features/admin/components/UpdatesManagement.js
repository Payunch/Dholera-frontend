"use client";

import * as React from "react";
import { 
 Plus, 
 Pencil, 
 Trash2, 
 Loader2, 
 Check, 
 X, 
 Eye,
 Lock,
 Search,
 ExternalLink,
 ImageIcon,
 Sparkles,
 WandSparkles
} from"lucide-react";
import { SeoReadinessPanel } from "@/features/admin/components/SeoReadinessPanel";
import { getSeoReview, makeSlug } from "@/features/admin/utils/seoScore";
import { apiClient } from"@/lib/api";
import { cn } from"@/lib/utils";
import { format } from"date-fns";
import Image from"next/image";
import { fetchCsrfToken } from "@/utils/csrf";

export function UpdatesManagement() {
 const [updates, setUpdates] = React.useState([]);
 const [loading, setLoading] = React.useState(true);
 const [search, setSearch] = React.useState("");
 const [activeTab, setActiveTab] = React.useState("all");
 const [editingId, setEditingId] = React.useState(null);
 
 // Form State
 const [title, setTitle] = React.useState("");
 const [content, setContent] = React.useState("");
 const [category, setCategory] = React.useState("General");
 const [published, setPublished] = React.useState(true);
 const [isApproved, setIsApproved] = React.useState(true);
 const [isExclusive, setIsExclusive] = React.useState(false);
 const [publishedAt, setPublishedAt] = React.useState("");
 const [imageFile, setImageFile] = React.useState(null);
 const [imageUrl, setImageUrl] = React.useState("");
 const [seoTitle, setSeoTitle] = React.useState("");
 const [seoDescription, setSeoDescription] = React.useState("");
 const [seoKeywords, setSeoKeywords] = React.useState("");
 const [slug, setSlug] = React.useState("");
 const [imageAltText, setImageAltText] = React.useState("");
 const [imageTitle, setImageTitle] = React.useState("");
 const [tags, setTags] = React.useState("");
 const [isSubmitting, setIsSubmitting] = React.useState(false);
 const [aiReview, setAiReview] = React.useState(null);
 const [isReviewing, setIsReviewing] = React.useState(false);

 const loadUpdates = async () => {
 setLoading(true);
 try {
 const res = await apiClient.get("/updates/admin/all");
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

 const handleEdit = (update) => {
 if (update ==="new") {
 setEditingId("new");
 setTitle("");
 setContent("");
 setCategory("General");
 setPublished(true);
 setIsApproved(true);
 setIsExclusive(false);
 setPublishedAt(new Date().toISOString().slice(0, 16));
 setImageFile(null);
 setImageUrl("");
 setSeoTitle("");
 setSeoDescription("");
 setSeoKeywords("");
 setSlug("");
 setImageAltText("");
 setImageTitle("");
 setTags("");
 setAiReview(null);
 } else {
 setEditingId(update.id);
 setTitle(update.title);
 setContent(update.content);
 setCategory(update.category);
 setPublished(update.published);
 setIsApproved(update.isApproved !== false);
 setIsExclusive(update.isExclusive === true);
 setPublishedAt(new Date(update.publishedAt || update.createdAt).toISOString().slice(0, 16));
 setImageFile(null);
 setImageUrl(update.imageUrl ||"");
 setSeoTitle(update.seoTitle || "");
 setSeoDescription(update.seoDescription || "");
 setSeoKeywords(update.seoKeywords || "");
 setSlug(update.slug || makeSlug(update.title || ""));
 setImageAltText(update.imageAltText || "");
 setImageTitle(update.imageTitle || "");
 setTags(update.tags || "");
 setAiReview(null);
 }
 };

 const seoReview = React.useMemo(() => getSeoReview({
   title, content, focusKeyword: seoKeywords, seoTitle: seoTitle || title,
   seoDescription, slug, imageUrl: imageFile || imageUrl, imageAltText, tags
 }), [title, content, seoKeywords, seoTitle, seoDescription, slug, imageFile, imageUrl, imageAltText, tags]);

 const runAiReview = async () => {
   if (!title.trim() || !content.trim()) {
     alert("Add an article title and content first, then ask AI to review it.");
     return;
   }
   setIsReviewing(true);
   try {
     const csrf = await fetchCsrfToken();
     const response = await apiClient.post("/updates/seo-review", {
       title, content, category, focusKeyword: seoKeywords, seoTitle: seoTitle || title,
       seoDescription, slug, imageAltText, tags
     }, { headers: { "X-CSRF-Token": csrf || "" } });
     setAiReview(response.data);
   } catch (error) {
     alert(error.response?.data?.error || "AI review could not be completed. Please try again.");
   } finally { setIsReviewing(false); }
 };

 const applyAiBasics = () => {
   if (!aiReview) return;
   if (aiReview.primaryKeyword) setSeoKeywords(aiReview.primaryKeyword);
   if (aiReview.seoTitle) setSeoTitle(aiReview.seoTitle);
   if (aiReview.metaDescription) setSeoDescription(aiReview.metaDescription);
   if (aiReview.slug) setSlug(aiReview.slug);
   if (aiReview.imageAltText) setImageAltText(aiReview.imageAltText);
   if (aiReview.imageTitle) setImageTitle(aiReview.imageTitle);
   if (aiReview.tags?.length) setTags(aiReview.tags.join(", "));
 };

 const handleDelete = async (id) => {
 if (!confirm("Are you sure you want to delete this update? This action cannot be undone.")) return;
 
 try {
 const csrf = await fetchCsrfToken();
 await apiClient.delete(`/updates/${id}`, {
   headers: { 'X-CSRF-Token': csrf || '' }
 });
 setUpdates(updates.filter(u => u.id !== id));
 } catch (err) {
 alert("Failed to delete update");
 }
 };

 const handleSubmit = async (e, { saveAsDraft = false, publishNow: forcePublish = false } = {}) => {
 e?.preventDefault();
 if (isSubmitting) return;
 const publishNow = forcePublish ? true : (saveAsDraft ? false : published);
 if (publishNow && seoReview.score < 90) {
   alert(`This post is ${seoReview.score}/100. Publishing is locked until its SEO score reaches 90.`);
   return;
 }

 setIsSubmitting(true);
 try {
 const formData = new FormData();
 formData.append("title", title);
 formData.append("content", content);
 formData.append("category", category);
 formData.append("published", String(publishNow));
 formData.append("isApproved", String(isApproved));
 formData.append("isExclusive", String(isExclusive));
 formData.append("publishedAt", new Date(publishedAt).toISOString());
 if (seoTitle) formData.append("seoTitle", seoTitle);
 if (seoDescription) formData.append("seoDescription", seoDescription);
 if (seoKeywords) formData.append("seoKeywords", seoKeywords);
 if (slug) formData.append("slug", slug);
 if (imageAltText) formData.append("imageAltText", imageAltText);
 if (imageTitle) formData.append("imageTitle", imageTitle);
 if (tags) formData.append("tags", tags);
 if (imageFile) {
 formData.append("image", imageFile);
 } else if (imageUrl) {
 formData.append("imageUrl", imageUrl);
 }

 const csrf = await fetchCsrfToken();
 const config = { headers: { 'X-CSRF-Token': csrf || '' } };

 if (editingId ==="new") {
 await apiClient.post("/updates", formData, config);
 } else {
 await apiClient.put(`/updates/${editingId}`, formData, config);
 }

 await loadUpdates();
 setEditingId(null);
 } catch (err) {
 alert("Failed to save update");
 } finally {
 setIsSubmitting(false);
 }
 };

 const filteredUpdates = updates.filter(u => {
   const matchesSearch = u.title.toLowerCase().includes(search.toLowerCase()) ||
                         u.category.toLowerCase().includes(search.toLowerCase());
   if (!matchesSearch) return false;
   if (activeTab === "published") return u.published && u.isApproved && !u.isExclusive;
   if (activeTab === "pending") return !u.isApproved;
   if (activeTab === "drafts") return !u.published && u.isApproved;
   if (activeTab === "app-only") return u.isExclusive === true;
   return true;
 });

 if (loading && updates.length === 0) {
 return (
 <div className="flex h-64 items-center justify-center">
 <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
 </div>
 );
 }

 return (
 <div className="space-y-8 transition-colors duration-300">
 {/* Header & Search */}
 <div className="flex flex-col gap-6">
   <div className="flex flex-wrap items-center gap-2">
     {["all", "published", "pending", "drafts", "app-only"].map(tab => (
       <button
         key={tab}
         onClick={() => setActiveTab(tab)}
         className={cn(
           "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors",
           activeTab === tab
             ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
             : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
         )}
       >
         {tab === "pending" ? "Pending Approval" : tab === "app-only" ? "App Only" : tab}
       </button>
     ))}
   </div>
   <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
 <div className="relative flex-1 max-w-md">
 <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
 <input
 type="text"
 placeholder="Search updates..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 pl-11 pr-4 text-sm font-medium transition-all focus:border-orange-600 focus:ring-1 focus:ring-orange-600 text-slate-900 dark:text-white"
 />
 </div>
 <button
 onClick={() => handleEdit("new")}
 className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 dark:bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-white dark:text-slate-900 transition-all hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white shadow-lg"
 >
 <Plus className="h-4 w-4" />
 New Update
 </button>
 <button
 onClick={() => {
   handleEdit("new");
   setIsExclusive(true);
 }}
 className="flex items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-6 py-3 text-xs font-black uppercase tracking-widest text-orange-700 transition-all hover:bg-orange-100 dark:border-orange-900/30 dark:bg-orange-950/20 dark:text-orange-300 dark:hover:bg-orange-900/30"
 >
 <Plus className="h-4 w-4" />
 New App Only Blog
 </button>
 </div>
 </div>

 {/* Grid of Updates */}
 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {filteredUpdates.map((update) => (
 <div 
 key={update.id}
 className="group relative flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:shadow-xl dark:hover:shadow-black/100 hover:border-orange-200 dark:hover:border-orange-900/30"
 >
 <div className="flex items-start justify-between mb-4">
 <span className={cn(
 "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white",
 !update.isApproved ? "bg-red-500 shadow-md shadow-red-500/20 dark:shadow-red-500/60" :
 update.published ? "bg-orange-600 shadow-md shadow-orange-600/20 dark:shadow-orange-600/60" : "bg-slate-400"
 )}>
 {!update.isApproved ? "Pending Approval" : update.published ? "Published" : "Draft"}
 </span>
 {update.isExclusive && (
   <span className="rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md shadow-amber-500/20">
     App Only
   </span>
 )}
 <div className="flex gap-2">
 <button 
 onClick={() => handleEdit(update)}
 className="rounded-xl p-2 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-orange-600 transition-colors"
 title="Edit"
 >
 <Pencil className="h-4 w-4" />
 </button>
 <button 
 onClick={() => handleDelete(update.id)}
 className="rounded-xl p-2 text-slate-400 dark:text-slate-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
 title="Delete"
 >
 <Trash2 className="h-4 w-4" />
 </button>
 </div>
 </div>

 <h4 className="text-lg font-black leading-tight text-slate-900 dark:text-white mb-2 line-clamp-2">
 {update.title}
 </h4>
 
 <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
 {update.category} • {format(new Date(update.publishedAt || update.createdAt),"MMM d, yyyy")}
 </p>

 <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
 <a 
 href={`/blogs/${update.id}${update.isExclusive ? "?audience=app" : ""}`} 
 target="_blank" 
 rel="noopener noreferrer"
 className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-white flex items-center gap-1"
 >
 View Live <ExternalLink className="h-3 w-3" />
 </a>
 </div>
 </div>
 ))}
 </div>

 {/* Edit/New Modal Overlay */}
 {editingId !== null && (
 <div className="fixed inset-0 z-[300] flex bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
 <div className="relative flex h-dvh w-screen flex-col overflow-hidden bg-white shadow-2xl dark:bg-slate-900">
 {/* Modal Header */}
<div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-5 lg:px-10">
 <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
 {editingId ==="new"
   ? (isExclusive ? "Create App Only Blog" : "Create New Update")
   : (isExclusive ? "Edit App Only Blog" : "Edit Update")}
 </h3>
 <button 
 onClick={() => setEditingId(null)}
 className="rounded-2xl p-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-red-500 transition-colors"
 >
 <X className="h-6 w-6" />
 </button>
 </div>

 {/* Modal Content - Scrollable */}
 <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-8 lg:px-10">
 <section className="rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-white to-orange-50 p-5 dark:border-indigo-900/40 dark:from-indigo-950/30 dark:via-slate-900 dark:to-orange-950/20">
   <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
     <div><div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-indigo-700 dark:text-indigo-300"><Sparkles className="h-4 w-4" />AI SEO Assistant</div><p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">Review this complete draft with your server-side Gemini key. It suggests improvements; you choose what to apply.</p></div>
     <button type="button" onClick={runAiReview} disabled={isReviewing} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-indigo-700 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-indigo-800 disabled:opacity-60"><WandSparkles className="h-4 w-4" />{isReviewing ? "Reviewing…" : "Review with AI"}</button>
   </div>
   {aiReview && <div className="mt-5 rounded-2xl bg-white/90 p-4 shadow-sm dark:bg-slate-950/60">
     <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-black text-slate-900 dark:text-white">AI estimate: {aiReview.estimatedScore}/100</p><button type="button" onClick={applyAiBasics} className="rounded-xl border border-indigo-200 px-3 py-2 text-[11px] font-black uppercase tracking-wider text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300"><WandSparkles className="mr-1 inline h-3.5 w-3.5" />Apply SEO basics</button></div>
     <div className="mt-3 grid gap-4 md:grid-cols-2"><div><p className="text-[11px] font-black uppercase tracking-widest text-slate-500">Fix before publishing</p><ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-200">{aiReview.missingItems?.map((item) => <li key={item}>• {item}</li>)}</ul></div><div><p className="text-[11px] font-black uppercase tracking-widest text-slate-500">Suggestions</p><ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-200">{aiReview.improvements?.map((item) => <li key={item}>• {item}</li>)}</ul></div></div>
     {aiReview.faqQuestions?.length > 0 && <div className="mt-4"><p className="text-[11px] font-black uppercase tracking-widest text-slate-500">Suggested FAQ questions</p><p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{aiReview.faqQuestions.join(" · ")}</p></div>}
   </div>}
 </section>
 <div className="grid gap-8 xl:grid-cols-[minmax(360px,0.85fr)_minmax(600px,1.5fr)]">
 <div className="space-y-6">
 {/* Title */}
 <div className="space-y-2">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Article Title</label>
 <input
 required
 type="text"
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 onBlur={() => {
   if (!slug) setSlug(makeSlug(title));
   if (!seoTitle) setSeoTitle(title);
   if (!seoKeywords) setSeoKeywords(title.split(/\s+/).slice(0, 4).join(" "));
 }}
 placeholder="Enter a compelling title..."
 className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-sm font-bold transition-all focus:border-orange-600 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-950 focus:ring-0 text-slate-900 dark:text-white"
 />
 </div>

 {/* Category & Status & Content Safety */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Category</label>
 <select
 value={category}
 onChange={(e) => setCategory(e.target.value)}
 className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-sm font-bold appearance-none transition-all focus:border-orange-600 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-950 focus:ring-0 text-slate-900 dark:text-white"
 >
 <option value="Infrastructure">Infrastructure</option>
 <option value="Industrial">Industrial</option>
 <option value="Planning">Planning</option>
 <option value="Investment">Investment</option>
 <option value="General">General</option>
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Status</label>
 <button
 type="button"
 onClick={() => setPublished(!published)}
 className={cn(
 "flex w-full items-center justify-center gap-2 rounded-2xl border py-4 text-sm font-black uppercase tracking-widest transition-all",
 published 
 ?"border-orange-200 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400" 
 :"border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400"
 )}
 >
 {published ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
 {published ?"Published" :"Draft"}
 </button>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Content Safety</label>
 <button
 type="button"
 onClick={() => setIsApproved(!isApproved)}
 className={cn(
 "flex w-full items-center justify-center gap-2 rounded-2xl border py-4 text-sm font-black uppercase tracking-widest transition-all",
 isApproved 
 ?"border-green-200 dark:border-green-900/30 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" 
 :"border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
 )}
 >
 {isApproved ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
 {isApproved ?"Approved" :"Pending"}
 </button>
 </div>
</div>

 <div className="space-y-2">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Audience</label>
 <button
 type="button"
 onClick={() => setIsExclusive(!isExclusive)}
 className={cn(
 "flex w-full items-center justify-center gap-2 rounded-2xl border py-4 text-sm font-black uppercase tracking-widest transition-all",
 isExclusive
 ? "border-amber-200 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
 : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400"
 )}
 >
 {isExclusive ? <Lock className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
 {isExclusive ? "App Only" : "Public Web + App"}
 </button>
 </div>

 {/* Published Date */}
 <div className="space-y-2">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Publication Date & Time</label>
 <input
 type="datetime-local"
 value={publishedAt}
 onChange={(e) => setPublishedAt(e.target.value)}
 className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-sm font-bold transition-all focus:border-orange-600 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-950 focus:ring-0 text-slate-900 dark:text-white"
 />
 </div>

 {/* Image Source */}
 <div className="space-y-4">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Cover Image</label>
 
 {/* Image Preview */}
 {(imageFile || imageUrl) && (
 <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
 <Image
 src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
 alt="Preview"
 fill
 className="object-cover"
 />
 <button
 type="button"
 onClick={() => { setImageFile(null); setImageUrl(""); }}
 className="absolute right-4 top-4 rounded-xl bg-white/90 dark:bg-slate-900/90 p-2 text-red-600 shadow-lg backdrop-blur hover:bg-white dark:hover:bg-slate-800 transition-colors"
 >
 <Trash2 className="h-4 w-4" />
 </button>
 </div>
 )}

 {!imageFile && !imageUrl && (
 <div className="grid grid-cols-2 gap-4">
 <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 transition-all hover:border-orange-200 dark:hover:border-orange-900/30 hover:bg-orange-50 dark:hover:bg-orange-900/10 group">
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
 className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-3 text-xs font-bold transition-all focus:border-orange-600 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-950 text-slate-900 dark:text-white"
 />
 </div>
 </div>
 )}
 <div className="grid gap-4 md:grid-cols-2">
   <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Image ALT Text</label><input value={imageAltText} onChange={(e) => setImageAltText(e.target.value)} placeholder="Describe the image with the focus keyword" className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white" /></div>
   <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Image Title</label><input value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} placeholder="Descriptive image title" className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white" /></div>
 </div>
 </div>
 </div>

 {/* Content Editor */}
 <div className="space-y-2 flex flex-col">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Article Content (Markdown supported)</label>
 <textarea
 required
 value={content}
 onChange={(e) => setContent(e.target.value)}
 placeholder="Write your analysis here..."
 className="flex-1 w-full min-h-[400px] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-sm font-medium leading-relaxed transition-all focus:border-orange-600 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-950 focus:ring-0 text-slate-900 dark:text-white"
 />
 </div>

 {/* SEO & Meta Details (WordPress Style) */}
 <div className="border-t border-slate-100 dark:border-slate-800 pt-8 mt-8 space-y-6 xl:col-span-2">
 <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
 <Search className="h-4 w-4 text-orange-600" />
 SEO Details & Tags
 </h4>
 
 <div className="grid gap-6 md:grid-cols-2">
 <div className="space-y-2">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">SEO Focus Keyword</label>
 <input
 type="text"
 value={seoKeywords}
 onChange={(e) => setSeoKeywords(e.target.value)}
 placeholder="e.g. Dholera Smart City investment"
 className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-sm font-bold transition-all focus:border-orange-600 dark:focus:border-orange-500 text-slate-900 dark:text-white"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">WordPress-ready URL Slug</label>
 <input value={slug} onChange={(e) => setSlug(makeSlug(e.target.value))} placeholder="dholera-smart-city-investment" className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-sm font-bold text-slate-900 dark:text-white" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Tags (Comma Separated)</label>
 <input
 type="text"
 value={tags}
 onChange={(e) => setTags(e.target.value)}
 placeholder="e.g. Real Estate, Investment Guide"
 className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-sm font-bold transition-all focus:border-orange-600 dark:focus:border-orange-500 text-slate-900 dark:text-white"
 />
 </div>
 <SeoReadinessPanel review={seoReview} />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">SEO Title (Optional)</label>
 <input
 type="text"
 value={seoTitle}
 onChange={(e) => setSeoTitle(e.target.value)}
 placeholder="Custom SEO Title (defaults to Article Title)"
 className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-sm font-bold transition-all focus:border-orange-600 dark:focus:border-orange-500 text-slate-900 dark:text-white"
 />
 </div>

 <div className="space-y-2 flex flex-col">
 <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">SEO Meta Description</label>
 <textarea
 value={seoDescription}
 onChange={(e) => setSeoDescription(e.target.value)}
 placeholder="Brief summary for Google search results (150-160 chars)..."
 className="w-full min-h-[100px] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-sm font-medium leading-relaxed transition-all focus:border-orange-600 dark:focus:border-orange-500 text-slate-900 dark:text-white"
 />
 </div>
 </div>
 </div>
 </form>

 {/* Modal Footer */}
 <div className="flex items-center justify-end gap-4 border-t border-slate-100 dark:border-slate-800 px-6 py-5 lg:px-10 bg-slate-50/50 dark:bg-slate-900/50">
 <button
 type="button"
 onClick={() => setEditingId(null)}
 className="rounded-2xl px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:text-white dark:hover:text-white transition-colors"
 >
 Cancel
 </button>
 <button
 type="button"
 onClick={() => handleSubmit(null, { saveAsDraft: true })}
 disabled={isSubmitting}
 className="flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-7 py-4 text-xs font-black uppercase tracking-widest text-slate-700 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 disabled:opacity-60"
 >
 {isSubmitting ? (
 <>
 <Loader2 className="h-4 w-4 animate-spin" />
 Saving...
 </>
 ) : (
 <>
 <Check className="h-4 w-4" />
 Save Draft
 </>
 )}
 </button>
 <button
 type="button"
 onClick={() => handleSubmit(null, { publishNow: true })}
 disabled={isSubmitting || seoReview.score < 90}
 className="flex items-center justify-center gap-3 rounded-2xl bg-slate-900 dark:bg-white px-10 py-4 text-xs font-black uppercase tracking-widest text-white dark:text-slate-900 shadow-xl transition-all hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
 >
 {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : <><Check className="h-4 w-4" />{seoReview.score < 90 ? `Publish locked: ${seoReview.score}/100` : "Publish update"}</>}
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
