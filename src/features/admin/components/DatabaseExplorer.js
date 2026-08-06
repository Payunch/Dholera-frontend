"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Database, Loader2, ChevronDown, ChevronRight, Table as TableIcon } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';
import { cn } from '@/lib/utils';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const DatabaseExplorer = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [isDbExpanded, setIsDbExpanded] = useState(true);

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ea580c',
      }
    },
  });

  const fetchTables = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/admin/db/tables`, { credentials: 'include' });
      const list = await res.json();
      setTables(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Fetch tables failed', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTableData = async (tableName) => {
    try {
      setDataLoading(true);
      const res = await fetch(`${API_BASE_URL}/admin/db/raw/${tableName}`, { credentials: 'include' });
      const rows = await res.json();
      setData(Array.isArray(rows) ? rows : []);
      setSelectedTable(tableName);
    } catch (err) {
      console.error('Fetch table data failed', err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      accessorKey: key,
      header: key.toUpperCase(),
      size: 150,
      Cell: ({ cell }) => {
        const val = cell.getValue();
        return typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val ?? '');
      }
    }));
  }, [data]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnResizing: true,
    enableGlobalFilter: true,
    enablePagination: true,
    enableSorting: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    initialState: { density: 'compact' },
    state: {
      isLoading: dataLoading,
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: { borderRadius: '1rem', border: 'none' },
    },
    muiTopToolbarProps: {
      sx: { backgroundColor: 'transparent' }
    }
  });

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="h-8 w-8 animate-spin text-orange-600" /></div>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[70vh] max-h-[85vh] transition-colors duration-300">
        
        {/* Sidebar */}
        <div className="w-72 bg-slate-50 dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col shrink-0">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <Database className="h-5 w-5 text-orange-600" />
              <span className="font-black uppercase tracking-tight text-sm">Server Database</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-slate-900">
            <div className="space-y-1">
              <button 
                onClick={() => setIsDbExpanded(!isDbExpanded)}
                className="w-full flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all text-left"
              >
                {isDbExpanded ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                <Database className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-black uppercase text-slate-600 dark:text-slate-400 tracking-wider">dholera_db</span>
              </button>

              {isDbExpanded && (
                <div className="ml-6 space-y-1 mt-1 border-l-2 border-slate-200 dark:border-slate-800 pl-2">
                  {tables.map(t => (
                    <button
                      key={t}
                      onClick={() => fetchTableData(t)}
                      className={cn(
                        "w-full flex items-center gap-2 p-2 rounded-lg text-left transition-all",
                        selectedTable === t 
                        ? "bg-orange-50 dark:bg-orange-600/10 text-orange-600 dark:text-orange-400 shadow-sm" 
                        : "hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400"
                      )}
                    >
                      <TableIcon className={cn("h-3.5 w-3.5", selectedTable === t ? "text-orange-600" : "text-slate-400")} />
                      <span className="text-[11px] font-bold truncate">{t}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content View */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50 dark:bg-slate-900 p-6">
          {!selectedTable ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-20 w-20 rounded-[2rem] bg-white dark:bg-slate-800 shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 dark:text-slate-500">
                <Database className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Database Explorer</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Select a table from the sidebar to browse raw records.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto bg-white rounded-2xl shadow-sm border border-slate-200">
              <MaterialReactTable table={table} />
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};
