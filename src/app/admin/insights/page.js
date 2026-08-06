"use client";
import React from 'react';
import { PlatformInsights } from '@/features/admin/components/PlatformInsights';
import { CampaignAnalytics } from '@/features/admin/components/CampaignAnalytics';

export default function AdminInsightsPage() {
  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Insights</h1>
      </div>
      <PlatformInsights />
      <CampaignAnalytics />
    </div>
  );
}
