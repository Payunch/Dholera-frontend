"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Target, 
  Users, 
  CheckCircle2, 
  TrendingUp,
  Loader2
} from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';



export const CampaignAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/analytics/campaigns`, { credentials: 'include' })
      .then(res => res.json())
      .then(resp => {
        if (resp.success && resp.campaigns) {
          setData(resp.campaigns);
        }
      })
      .catch(err => console.error('Campaign Analytics fetch failed', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="h-8 w-8 animate-spin text-orange-600" /></div>;
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-xl mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          <Target className="h-6 w-6 text-orange-600" /> Marketing Campaigns
        </h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">UTM Analytics</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-100 dark:border-slate-800">
              <th className="pb-4 text-xs font-black uppercase tracking-widest text-slate-400">Campaign Source</th>
              <th className="pb-4 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Visitors</th>
              <th className="pb-4 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Verified Leads</th>
              <th className="pb-4 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Conversion Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {data.map((campaign, i) => (
              <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-5 font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tight">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <BarChart className="h-4 w-4" />
                    </div>
                    {campaign.campaign}
                  </div>
                </td>
                <td className="py-5 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-black text-slate-900 dark:text-white">{campaign.visitors}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1"><Users className="h-3 w-3"/> Clicks</span>
                  </div>
                </td>
                <td className="py-5 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-black text-slate-900 dark:text-white">{campaign.verifiedLeads}</span>
                    <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold flex items-center gap-1"><CheckCircle2 className="h-3 w-3"/> Verified</span>
                  </div>
                </td>
                <td className="py-5 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                      {campaign.conversionRate}% <TrendingUp className="h-4 w-4 text-orange-500" />
                    </span>
                    <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 rounded-full" 
                        style={{ width: `${Math.min(100, campaign.conversionRate)}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
