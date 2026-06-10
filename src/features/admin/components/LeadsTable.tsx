"use client";

import { Lead } from"@/types/admin";
import { MessageSquare, Phone, Info, Eye, Clock, ShieldCheck, MapPin, Monitor, X, Globe, Calendar } from"lucide-react";
import { cn } from"@/lib/utils";
import React, { useState } from"react";

interface LeadsTableProps {
 leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
 const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

 return (
 <>
 <div className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl transition-colors duration-300">
 <div className="bg-white/50 dark:bg-slate-900/50 px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
 <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Recent Activity</h3>
 <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Live Database Stream</span>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-left">
 <thead className="bg-white dark:bg-slate-900 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
 <tr>
 <th className="px-8 py-4">Investor Details</th>
 <th className="px-8 py-4">Intelligence</th>
 <th className="px-8 py-4">Status</th>
 <th className="px-8 py-4 text-center">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
 {leads.map((lead) => (
 <tr key={lead.id} className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30">
 <td className="px-8 py-5">
 <div className="flex flex-col">
 <div className="flex items-center gap-2">
 <span className="font-black text-slate-900 dark:text-white">{lead.name}</span>
 {lead.is_pro && <ShieldCheck className="h-3 w-3 text-orange-600" />}
 {lead.score !== undefined && lead.score > 0 && (
 <span className={cn(
"ml-2 rounded-md px-1.5 py-0.5 text-[8px] font-black uppercase tracking-tight",
 lead.score > 150 ?"bg-red-600 text-white" :"bg-orange-500 text-white"
 )}>
 Score: {lead.score}
 </span>
 )}
 </div>
 <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{lead.phone}</span>
 </div>
 </td>
 <td className="px-8 py-5">
 <div className="flex flex-col gap-1">
 <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
 <Clock className="h-3 w-3" /> {lead.totalTimeSpent ? Math.round(lead.totalTimeSpent / 60) : 0} Mins
 </div>
 <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
 <Eye className="h-3 w-3" /> {lead.visitedPages?.length || 0} Pages
 </div>
 </div>
 </td>
 <td className="px-8 py-5">
 <span className={cn(
"rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest",
 lead.status ==="New" ?"bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" :
 lead.status ==="Converted" ?"bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
"bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
 )}>
 {lead.status}
 </span>
 </td>
 <td className="px-8 py-5">
 <div className="flex items-center justify-center gap-2">
 <button 
 onClick={() => setSelectedLead(lead)}
 className="rounded-xl border border-slate-200 dark:border-slate-700 p-2 text-slate-400 dark:text-slate-500 transition-all hover:bg-slate-900 dark:hover:bg-slate-800 hover:text-white dark:hover:text-white hover:border-slate-900 dark:hover:border-slate-600"
 title="View Full DB Details"
 >
 <Info className="h-4 w-4" />
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 {/* Deep Detail Modal */}
 {selectedLead && (
 <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
 <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
 <div className="p-8 text-slate-900 dark:text-white flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
 <div>
 <h3 className="text-2xl font-black uppercase tracking-tight">{selectedLead.name}</h3>
 <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Lead ID: {selectedLead.id} • {selectedLead.phone}</p>
 </div>
 <button onClick={() => setSelectedLead(null)} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-red-500 transition-all">
 <X className="h-6 w-6" />
 </button>
 </div>

 <div className="flex-1 overflow-y-auto p-8 space-y-8">
 {/* Intelligence Grid */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { icon: Clock, label:"Time Spent", value:`${Math.round((selectedLead.totalTimeSpent || 0) / 60)}m` },
 { icon: Eye, label:"Views", value:`${selectedLead.total_sessions || 0} Sessions` },
 { icon: MapPin, label:"Last IP", value: selectedLead.sessions?.[0]?.ip ||"Unknown" },
 { icon: Globe, label:"Source", value: selectedLead.source ||"Direct" },
 ].map((item, i) => (
 <div key={i} className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm">
 <item.icon className="h-4 w-4 text-orange-600 mb-2" />
 <span className="block text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{item.label}</span>
 <span className="block text-xs font-black text-slate-900 dark:text-white mt-1">{item.value}</span>
 </div>
 ))}
 </div>

 {/* AI Interest Analysis */}
 {selectedLead.interest_profile && (
 <div className="space-y-4">
 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 flex items-center gap-2">
 <ShieldCheck className="h-3 w-3" /> AI Interest Analysis
 </h4>
 <div className="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-3xl p-6">
 {(() => {
 try {
 const profile = JSON.parse(selectedLead.interest_profile);
 return (
 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Lead Category</span>
 <span className={cn(
"px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
 profile.category ==="Hot" ?"bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" :
 profile.category ==="Warm" ?"bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" :
"bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
 )}>{profile.category}</span>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Top Interests</span>
 <div className="flex gap-1">
 {profile.topInterests.map((interest: string, idx: number) => (
 <span key={idx} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tight text-slate-700 dark:text-slate-300">{interest}</span>
 ))}
 </div>
 </div>
 </div>
 );
 } catch (e) {
 return <p className="text-xs text-slate-500 dark:text-slate-400">Analysis pending...</p>;
 }
 })()}
 </div>
 </div>
 )}

 {/* Technical Details */}
 <div className="space-y-4">
 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 flex items-center gap-2">
 <Monitor className="h-3 w-3" /> Technical Fingerprint
 </h4>
 <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 text-slate-600 dark:text-slate-400 font-mono text-[10px] break-all leading-relaxed border border-slate-100 dark:border-slate-800 shadow-inner">
 {selectedLead.browserFingerprint ||"No fingerprint captured"}
 </div>
 </div>

 {/* Journey / Pages */}
 <div className="space-y-4">
 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 flex items-center gap-2">
 <Calendar className="h-3 w-3" /> Activity History
 </h4>
 <div className="space-y-2">
 {selectedLead.visitedPages && selectedLead.visitedPages.length > 0 ? (
 selectedLead.visitedPages.map((page: string, i: number) => (
 <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl">
 <div className="h-6 w-6 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-[10px] font-black text-orange-600 dark:text-orange-400">{i+1}</div>
 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{page}</span>
 </div>
 ))
 ) : (
 <p className="text-xs text-slate-500 dark:text-slate-400 italic">No page activity recorded</p>
 )}
 </div>
 </div>

 {/* Flags */}
 <div className="flex flex-wrap gap-2">
 <div className={cn("px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest", selectedLead.is_registered ?"bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :"bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700")}>Registered</div>
 <div className={cn("px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest", selectedLead.is_trial ?"bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" :"bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700")}>Trial Used</div>
 <div className={cn("px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest", selectedLead.is_pro ?"bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" :"bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700")}>PRO Access</div>
 <div className={cn("px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest", selectedLead.verified ?"bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :"bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400")}>OTP Verified</div>
 </div>
 </div>
 </div>
 </div>
 )}
 </>
 );
}
