"use client";
import React from 'react';
import { UpdatesManagement } from '@/features/admin/components/UpdatesManagement';

export default function adminBlogsPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Updates & Blogs</h1>
      </div>
      <UpdatesManagement />
    </div>
  );
}
