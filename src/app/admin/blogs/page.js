"use client";

import React from 'react';
import MasterTable from '@/components/Admin/MasterTable';

export default function AdminBlogsPage() {
  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Category', accessor: 'category' },
    { 
      header: 'Language', 
      render: (row) => (
        <span className="uppercase text-slate-500 font-bold text-xs">{row.lang}</span>
      )
    },
    { 
      header: 'Published', 
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          row.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.published ? 'Yes' : 'Draft'}
        </span>
      )
    },
    { 
      header: 'Published At', 
      render: (row) => new Date(row.publishedAt).toLocaleDateString()
    }
  ];

  const handleEdit = (row) => {
    alert(`Editing Blog: ${row.title}`);
  };

  const handleDelete = (row) => {
    if (confirm(`Are you sure you want to delete blog "${row.title}"?`)) {
      alert(`Deleted Blog: ${row.title}`);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Blogs & Updates</h1>
          <p className="text-slate-500">Manage your Dholera news, updates, and articles.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg">
          + New Post
        </button>
      </div>

      <MasterTable 
        title="All Blog Posts"
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/updates?all=true`}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
