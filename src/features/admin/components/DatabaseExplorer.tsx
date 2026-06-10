"use client";

import React, { useState, useEffect } from 'react';
import { Database, Table, Loader2, Search, ArrowLeft, RefreshCcw, ChevronDown, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';
import { cn } from '@/lib/utils';

export const DatabaseExplorer = () => {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isDbExpanded, setIsDbExpanded] = useState(true);

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

  const fetchTableData = async (tableName: string) => {
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

  const filteredData = data.filter(row => 
    JSON.stringify(row).toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="h-8 w-8 animate-spin text-orange-600" /></div>;

  return (
    <div className="flex bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl dark:shadow-white/10 overflow-hidden min-h-[70vh] max-h-[85vh] transition-colors duration-300">
      
      {/* Sidebar: phpMyAdmin Style */}
      <div className="w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col shrink-0">
         <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
               <Database className="h-5 w-5 text-orange-600" />
               <span className="font-black uppercase tracking-tight text-sm">Server Database</span>
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
               {/* Root Database Node */}
               <button 
                 onClick={() => setIsDbExpanded(!isDbExpanded)}
                 className="w-full flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all text-left"
               >
                  {isDbExpanded ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                  <Database className="h-4 w-4 text-slate-400" />
                  <span className="text-xs font-black uppercase text-slate-600 dark:text-slate-400 tracking-wider">dholera_db</span>
               </button>

               {/* Table List */}
               {isDbExpanded && (
                 <div className="ml-6 space-y-1 mt-1 border-l-2 border-slate-200 dark:border-slate-800 pl-2">
                    {tables.map(table => (
                      <button
                        key={table}
                        onClick={() => fetchTableData(table)}
                        className={cn(
                          "w-full flex items-center gap-2 p-2 rounded-lg text-left transition-all",
                          selectedTable === table 
                            ? "bg-orange-50 dark:bg-orange-600/10 text-orange-600 dark:text-orange-400 shadow-sm" 
                            : "hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400"
                        )}
                      >
                         <Table className={cn("h-3.5 w-3.5", selectedTable === table ? "text-orange-600" : "text-slate-400")} />
                         <span className="text-[11px] font-bold truncate">{table}</span>
                      </button>
                    ))}
                 </div>
               )}
            </div>
         </div>
      </div>

      {/* Main Content: Table View */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-900">
        {!selectedTable ? (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-4">
             <div className="h-20 w-20 rounded-[2rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200">
                <Database className="h-10 w-10" />
             </div>
             <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Database Explorer</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Select a table from the sidebar to browse raw records.</p>
             </div>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/50 dark:bg-slate-900/50">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-white/10 flex items-center justify-center text-orange-600">
                     <Table className="h-5 w-5" />
                  </div>
                  <div>
                     <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{selectedTable}</h3>
                     <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Live Table Preview (Last 1000 Rows)</p>
                  </div>
               </div>

               <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                     <input 
                       type="text" 
                       placeholder="Search table..."
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                       className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-orange-600 transition-all"
                     />
                  </div>
                  <button 
                    onClick={() => fetchTableData(selectedTable)}
                    className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 dark:text-slate-500 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-100 dark:hover:border-orange-900/30 transition-all shadow-sm dark:shadow-white/10"
                    title="Refresh Data"
                  >
                     <RefreshCcw className={cn("h-4 w-4", dataLoading && "animate-spin")} />
                  </button>
               </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-auto p-1 bg-white dark:bg-slate-900">
               {data.length === 0 ? (
                 <div className="flex-1 flex items-center justify-center p-20 text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest italic">Table is empty</div>
               ) : (
                 <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden border border-slate-200 dark:border-slate-800 sm:rounded-2xl shadow-sm dark:shadow-white/10 bg-white dark:bg-slate-900">
                      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left border-collapse">
                         <thead className="bg-white dark:bg-slate-900">
                            <tr>
                               {Object.keys(data[0]).map(key => (
                                 <th key={key} className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 whitespace-nowrap">{key}</th>
                               ))}
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredData.map((row, i) => (
                              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                 {Object.values(row).map((val: any, j) => (
                                   <td key={j} className="px-4 py-3 text-[11px] font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap max-w-xs overflow-hidden text-ellipsis border-r border-slate-50 dark:border-slate-800/50">
                                      {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                                   </td>
                                 ))}
                              </tr>
                            ))}
                         </tbody>
                      </table>
                    </div>
                 </div>
               )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
