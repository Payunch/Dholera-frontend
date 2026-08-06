"use client";
import React from 'react';
import { SystemManagement } from '@/features/admin/components/SystemManagement';
import { AccountManagement } from '@/features/admin/components/AccountManagement';

export default function AdminSettingsPage() {
  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Management & Settings</h1>
      </div>
      <AccountManagement />
      <SystemManagement />
    </div>
  );
}
