"use client";

import React, { useState, useEffect } from'react';
import { 
 TrendingUp, 
 IndianRupee, 
 Users, 
 Eye, 
 ArrowUpRight, 
 ArrowDownRight,
 FileText,
 Loader2,
 Trophy,
 Activity
} from'lucide-react';
import { API_BASE_URL } from'@/lib/api';

[];
 topPurchases: { title; count }[];
}

export const PlatformInsights = () => {
 const [data, setData] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 fetch(`${API_BASE_URL}/analytics/platform-insights`, { credentials:'include' })
 .then(res => res.json())
 .then(resp => {
 if (resp.success) setData(resp.data);
 })
 .catch(err => console.error('Insights fetch failed', err))
 .finally(() => setLoading(false));
 }, []);

 if (loading) return <div className="flex justify-center p-20"><Loader2 className="h-8 w-8 animate-spin text-orange-600" /></div>;
 if (!data) return <div className="p-20 text-center text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Failed to load insights</div>;

 return (
 <div className="space-y-12 animate-in fade-in duration-700">
 {/* Top Level KPIs */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {[
 { label:"Total Revenue", value:`₹${data.totalRevenue.toLocaleString()}`, icon, color:"text-green-600 dark:text-green-400", bg:"bg-green-50 dark:bg-green-600/10" },
 { label:"Conversion Rate", value:`${data.conversionRate}%`, icon, color:"text-blue-600 dark:text-blue-400", bg:"bg-blue-50 dark:bg-blue-600/10" },
 { label:"Pro Members", value: data.proCount, icon, color:"text-orange-600 dark:text-orange-400", bg:"bg-orange-50 dark:bg-orange-600/10" },
 { label:"Unique Buyers", value: data.uniqueBuyers, icon, color:"text-purple-600 dark:text-purple-400", bg:"bg-purple-50 dark:bg-purple-600/10" },
 ].map((stat, i) => (
 <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-4">
 <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
 <stat.icon className="h-6 w-6" />
 </div>
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{stat.label}</p>
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</h3>
 </div>
 </div>
 ))}
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
 {/* Most Viewed Content */}
 <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-xl">
 <div className="flex items-center justify-between mb-8">
 <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
 <Eye className="h-6 w-6 text-orange-600" /> Most Viewed
 </h3>
 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Top 5 Documents</span>
 </div>
 <div className="space-y-4">
 {data.topViews.map((v, i) => (
 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl group hover:bg-orange-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-orange-100 dark:hover:border-slate-700">
 <div className="flex items-center gap-4">
 <div className="h-10 w-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-black text-sm">{i+1}</div>
 <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase leading-tight line-clamp-1">{v.title}</span>
 </div>
 <div className="text-right">
 <span className="text-lg font-black text-slate-900 dark:text-white">{v.count}</span>
 <span className="block text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Views</span>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Best Selling Content */}
 <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-xl">
 <div className="flex items-center justify-between mb-8">
 <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
 <IndianRupee className="h-6 w-6 text-orange-600" /> Best Selling
 </h3>
 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Direct Sales</span>
 </div>
 <div className="space-y-4">
 {data.topPurchases.map((p, i) => (
 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl group hover:bg-green-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-green-100 dark:hover:border-slate-700">
 <div className="flex items-center gap-4">
 <div className="h-10 w-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-black text-sm">{i+1}</div>
 <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase leading-tight line-clamp-1">{p.title}</span>
 </div>
 <div className="text-right">
 <span className="text-lg font-black text-slate-900 dark:text-white">{p.count}</span>
 <span className="block text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Unlocks</span>
 </div>
 </div>
 ))}
 {data.topPurchases.length === 0 && <p className="text-center py-20 text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest">No sales data recorded yet</p>}
 </div>
 </div>
 </div>
 
 {/* System Health Card */}
 <div className="bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
 <div className="flex items-center gap-8">
 <div className="h-20 w-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 dark:bg-slate-900">
 <Activity className="h-10 w-10" />
 </div>
 <div>
 <h3 className="text-2xl font-black uppercase tracking-tight">Revenue Stream Healthy</h3>
 <p className="text-sm font-medium text-slate-400 max-w-md leading-relaxed mt-2 uppercase tracking-widest">
 Revenue Safety Limit: <b>₹18,00,000</b>. <br/>
 Current Approved Volume: <b>₹{data.totalRevenue.toLocaleString()}</b>
 </p>
 </div>
 </div>
 <div className="text-right">
 <div className="h-2 w-64 bg-white/5 rounded-full overflow-hidden border border-white/5 dark:bg-slate-900">
 <div className="h-full bg-orange-600" style={{ width:`${Math.min(100, (data.totalRevenue / 1800000) * 100)}%` }} />
 </div>
 <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-4">Threshold Utilization</p>
 </div>
 </div>
 </div>
 );
};

function cn(...classes) {
 return classes.filter(Boolean).join('');
}
