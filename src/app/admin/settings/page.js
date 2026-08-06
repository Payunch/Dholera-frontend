"use client";
import React from 'react';
import { SystemManagement } from '@/features/admin/components/SystemManagement';

export default function adminSettingsPage() {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SystemManagement />
    </div>
  );
}
