"use client";

import React from 'react';
import MasterTable from '@/components/Admin/MasterTable';
import { API_BASE_URL } from '@/lib/api';

export default function MasterTablePage() {
  const tableColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Status', accessor: 'status' },
    { 
      header: 'Score', 
      render: (row) => (
        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-xs font-bold">
          {row.score || 0}
        </span>
      ) 
    }
  ];

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Generic Master Table</h1>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">
          Showcasing the reusable MasterTable component working with raw database records
        </p>
      </div>

      <div className="max-w-[1200px]">
        <MasterTable 
          title="Master Leads Database"
          apiEndpoint={`${API_BASE_URL}/leads`}
          columns={tableColumns}
          onEdit={(row) => alert(`Edit action triggered for: ${row.name}`)}
          onDelete={(row) => alert(`Delete action triggered for: ${row.name}`)}
        />
      </div>
    </div>
  );
}
