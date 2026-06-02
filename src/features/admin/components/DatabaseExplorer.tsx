"use client";

import React, { useState, useEffect } from 'react';
import { Database, Table, Loader2, Search, ArrowLeft, Download, RefreshCcw } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';
import { cn } from '@/lib/utils';

export const DatabaseExplorer = () => {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedLead] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [search, setSearch] = useState('');

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
      setSelectedLead(tableName);
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
    <div className="space-y-8 animate-in fade-in duration-500">
      {!selectedTable ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {tables.map(table => (
             <button
               key={table}
               onClick={() => fetchTableData(table)}
               className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all text-left flex flex-col gap-4"
             >
                <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-600 group-hover:text-white transition-all">
                   <Table className="h-6 w-6" />
                </div>
                <div>
                   <h4 className="font-black uppercase tracking-tight text-slate-900 text-lg">{table}</h4>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Database Table</p>
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between">
                   <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Explore Data →</span>
                </div>
             </button>
           ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
          {/* Toolbar */}
          <div className="bg-slate-900 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                   <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                   <h3 className="text-xl font-black text-white uppercase tracking-tight">{selectedTable}</h3>
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Showing last 1000 records</p>
                </div>
             </div>

             <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                   <input 
                     type="text" 
                     placeholder="Search records..."
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-orange-600 transition-all"
                   />
                </div>
                <button 
                  onClick={() => fetchTableData(selectedTable)}
                  className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all"
                >
                   <RefreshCcw className={cn("h-4 w-4", dataLoading && "animate-spin")} />
                </button>
             </div>
          </div>

          {/* Table Data */}
          <div className="flex-1 overflow-auto">
             {data.length === 0 ? (
               <div className="p-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">Table is empty</div>
             ) : (
               <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-50 z-10">
                     <tr>
                        {Object.keys(data[0]).map(key => (
                          <th key={key} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 whitespace-nowrap">{key}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {filteredData.map((row, i) => (
                       <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          {Object.values(row).map((val: any, j) => (
                            <td key={j} className="px-6 py-4 text-xs font-medium text-slate-600 whitespace-nowrap max-w-xs overflow-hidden text-ellipsis">
                               {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                            </td>
                          ))}
                       </tr>
                     ))}
                  </tbody>
               </table>
             )}
          </div>
        </div>
      )}
    </div>
  );
};
