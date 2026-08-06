"use client";

import React from 'react';
import MasterTable from '@/components/Admin/MasterTable';

export default function AdminLeadsPage() {
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Source', accessor: 'source' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          row.status === 'New' ? 'bg-blue-100 text-blue-800' :
          row.status === 'Converted' ? 'bg-green-100 text-green-800' :
          'bg-slate-100 text-slate-800'
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      header: 'Created At', 
      render: (row) => new Date(row.createdAt).toLocaleDateString()
    }
  ];

  const handleEdit = (row) => {
    // Navigate to edit page or open modal
    alert(`Editing Lead: ${row.name}`);
  };

  const handleDelete = (row) => {
    if (confirm(`Are you sure you want to delete lead ${row.name}?`)) {
      alert(`Deleted Lead: ${row.name}`);
      // In a real app, call delete API here and refresh table
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Leads Management</h1>
        <p className="text-slate-500">View and manage all incoming leads and site visits.</p>
      </div>

      <MasterTable 
        title="All Leads"
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || 'https://api.dholeraplatform.com'}/api/leads`}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
