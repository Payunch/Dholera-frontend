"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MasterTable Component inspired by Rite Mng style
// Supports: Axios, Loading State, Success/Error Messages, Adaptive Responsive Design
export default function MasterTable({ 
  title, 
  apiEndpoint, 
  columns, 
  onEdit, 
  onDelete 
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('adminToken') || '';
      const response = await axios.get(apiEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search }
      });
      // Handle standard response formats { data: [] } or just []
      setData(response.data?.data || response.data || []);
      if (success === 'Fetched successfully!') setSuccess(null); // Clear success if it was just a refresh
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch data from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiEndpoint]); // Re-fetch if endpoint changes

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden w-full transition-all duration-300">
      {/* Header Section */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">{title}</h2>
        
        <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 m-4" role="alert">
          <p className="font-bold">Success</p>
          <p>{success}</p>
        </div>
      )}

      {/* Adaptive Responsive Table Area */}
      <div className="overflow-x-auto w-full relative">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            {/* Proper Animation / Loading GIF logic */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <span className="ml-4 text-slate-500 font-semibold animate-pulse">Loading Data...</span>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    {col.header}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="px-6 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="px-6 py-8 text-center text-slate-500">
                    No records found.
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                        {col.render ? col.render(row) : row[col.accessor]}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {onEdit && (
                          <button onClick={() => onEdit(row)} className="text-blue-600 hover:text-blue-900 mr-4 transition-colors">
                            Edit
                          </button>
                        )}
                        {onDelete && (
                          <button onClick={() => onDelete(row)} className="text-red-600 hover:text-red-900 transition-colors">
                            Delete
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
