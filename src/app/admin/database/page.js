"use client";
import React from 'react';
import { DatabaseExplorer } from '@/features/admin/components/DatabaseExplorer';

export default function AdminDatabasePage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Database Explorer</h1>
      </div>
      <DatabaseExplorer />
    </div>
  );
}
