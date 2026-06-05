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
    <div className="flex bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden min-h-[70vh] max-h-[85vh]">
      
      {/* Sidebar: phpMyAdmin Style */}
      <div className="w-72 bg-slate-50 border-r border-slate-100 flex flex-col shrink-0">
         <div className="p-6 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-3 text-slate-900">
               <Database className="h-5 w-5 text-orange-600" />
               <span className="font-black uppercase tracking-tight text-sm">Server Database</span>
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
               {/* Root Database Node */}
               <button 
                 onClick={() => setIsDbExpanded(!isDbExpanded)}
                 className="w-full flex items-center gap-2 p-2 hover:bg-slate-200/50 rounded-lg transition-all text-left"
               >
                  {isDbExpanded ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                  <Database className="h-4 w-4 text-slate-400" />
                  <span className="text-xs font-black uppercase text-slate-600 tracking-wider">dholera_db</span>
               </button>

               {/* Table List */}
               {isDbExpanded && (
                 <div className="ml-6 space-y-1 mt-1 border-l-2 border-slate-200 pl-2">
                    {tables.map(table => (
                      <button
                        key={table}
                        onClick={() => fetchTableData(table)}
                        className={cn(
                          "w-full flex items-center gap-2 p-2 rounded-lg text-left transition-all",
                          selectedTable === table ? "bg-orange-50 text-orange-600 shadow-sm" : "hover:bg-slate-200/50 text-slate-500"
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
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {!selectedTable ? (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-4">
             <div className="h-20 w-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-700 dark:text-slate-200">
                <Database className="h-10 w-10" />
             </div>
             <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Database Explorer</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Select a table from the sidebar to browse raw records.</p>
             </div>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/50">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-orange-600">
                     <Table className="h-5 w-5" />
                  </div>
                  <div>
                     <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{selectedTable}</h3>
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
                       className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 outline-none focus:border-orange-600 transition-all"
                     />
                  </div>
                  <button 
                    onClick={() => fetchTableData(selectedTable)}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-orange-600 hover:border-orange-100 transition-all shadow-sm"
                    title="Refresh Data"
                  >
                     <RefreshCcw className={cn("h-4 w-4", dataLoading && "animate-spin")} />
                  </button>
               </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-auto p-1 bg-slate-50">
               {data.length === 0 ? (
                 <div className="flex-1 flex items-center justify-center p-20 text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest italic">Table is empty</div>
               ) : (
                 <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden border border-slate-200 sm:rounded-2xl shadow-sm bg-white">
                      <table className="min-w-full divide-y divide-slate-200 text-left border-collapse">
                         <thead className="bg-slate-50">
                            <tr>
                               {Object.keys(data[0]).map(key => (
                                 <th key={key} className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200 whitespace-nowrap">{key}</th>
                               ))}
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {filteredData.map((row, i) => (
                              <tr key={i} className="hover:bg-slate-50 transition-colors">
                                 {Object.values(row).map((val: any, j) => (
                                   <td key={j} className="px-4 py-3 text-[11px] font-medium text-slate-600 whitespace-nowrap max-w-xs overflow-hidden text-ellipsis border-r border-slate-50">
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
