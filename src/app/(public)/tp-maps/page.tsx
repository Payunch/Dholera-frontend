"use client";

import React, { useState } from 'react';
import { Map, Layers, Search, Filter, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function TpMapsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const tpList = [
    { 
      id: "tp1",
      title: "Town Planning Scheme 1 (TP 1)", 
      area: "Activation Area", 
      focus: "Industrial & Mixed Use",
      badges: [
        { text: "NA/NOC Approved", type: "compliance" },
        { text: "Near Activation Zone", type: "location" }
      ]
    },
    { 
      id: "tp2",
      title: "Town Planning Scheme 2 (TP 2)", 
      area: "High Density Area", 
      focus: "Residential & Commercial",
      badges: [
        { text: "RERA Registered", type: "compliance" },
        { text: "Premium Linear Zone", type: "location" }
      ]
    },
    { 
      id: "tp3",
      title: "Town Planning Scheme 3 (TP 3)", 
      area: "Logistic Hub", 
      focus: "Connectivity & Storage",
      badges: [
        { text: "Under Development", type: "compliance" },
        { text: "Logistics Node", type: "location" }
      ]
    },
    { 
      id: "tp4",
      title: "Town Planning Scheme 4 (TP 4)", 
      area: "Knowledge & IT", 
      focus: "Education & Tech",
      badges: [
        { text: "Draft Approved", type: "compliance" },
        { text: "IT Hub Proximity", type: "location" }
      ]
    },
    { 
      id: "tp5",
      title: "Town Planning Scheme 5 (TP 5)", 
      area: "City Center", 
      focus: "Premium Core",
      badges: [
        { text: "Planning Phase", type: "compliance" },
        { text: "Future Core", type: "location" }
      ]
    },
    { 
      id: "tp6",
      title: "Town Planning Scheme 6 (TP 6)", 
      area: "Coastal Zone", 
      focus: "Tourism & Solar",
      badges: [
        { text: "CRZ Regulated", type: "compliance" },
        { text: "Coastal Edge", type: "location" }
      ]
    },
  ];

  const filters = ["All", "Activation Area", "Residential", "Industrial", "Logistics"];

  const filteredList = tpList.filter(tp => {
    const matchesSearch = tp.title.toLowerCase().includes(searchQuery.toLowerCase()) || tp.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || tp.area.includes(activeFilter) || tp.focus.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Header Section */}
      <section className="bg-[#0B132B] pt-32 pb-16 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-8 text-center">
           <div className="max-w-4xl mx-auto">
              <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-[1.1]">
                DHOLERA SIR <span className="text-[#FF7A00] italic">TP MAPS MATRIX</span>
              </h1>
           </div>
        </div>
      </section>

      {/* Interactive Matrix Dashboard */}
      <section className="py-16 bg-slate-50 min-h-[60vh]">
        <div className="container mx-auto px-4 md:px-8">
           
           {/* Search & Filter UI */}
           <div className="max-w-5xl mx-auto mb-16 space-y-8">
              <div className="relative group">
                 <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-slate-400 group-focus-within:text-[#FF7A00] transition-colors" />
                 </div>
                 <input 
                   type="text"
                   placeholder="SEARCH ZONES, SECTORS OR TP NUMBERS..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-16 pr-6 py-6 rounded-2xl bg-white border-2 border-slate-200 text-sm font-black uppercase tracking-widest text-slate-900 placeholder-slate-400 outline-none focus:border-[#FF7A00] focus:shadow-[0_0_20px_rgba(255,122,0,0.15)] transition-all"
                 />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                 <div className="flex items-center gap-2 mr-4 text-xs font-black uppercase tracking-widest text-slate-500">
                    <Filter className="h-4 w-4" /> Quick Filters
                 </div>
                 {filters.map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={cn(
                        "px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
                        activeFilter === filter 
                          ? "bg-[#FF7A00] text-white border-[#FF7A00] shadow-lg shadow-orange-600/20" 
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                      )}
                    >
                      {filter}
                    </button>
                 ))}
              </div>
           </div>

           {/* Interactive Zone Cards Grid */}
           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredList.map((tp) => (
                <div 
                  key={tp.id} 
                  className="group relative p-8 rounded-[2rem] bg-white border-2 border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-[#FF7A00] transition-all duration-300"
                >
                   {/* Psychology Badges */}
                   <div className="absolute -top-4 right-4 flex flex-col gap-2 z-10 items-end">
                      {tp.badges.map((badge, bIdx) => (
                         <span 
                           key={bIdx} 
                           className={cn(
                             "backdrop-blur-sm text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md border",
                             badge.type === 'compliance' 
                               ? "bg-[#10B981]/90 text-white border-[#10B981]" 
                               : "bg-[#D97706]/90 text-white border-[#D97706]"
                           )}
                         >
                           [ {badge.text} ]
                         </span>
                       ))}
                   </div>

                   <div className="flex justify-between items-start mb-10 pt-4">
                      <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <Map className="h-8 w-8" />
                      </div>
                      <div className="group/info relative cursor-help">
                        <HelpCircle className="h-6 w-6 text-slate-300 hover:text-[#FF7A00] transition-colors" />
                        <div className="absolute right-0 top-8 w-48 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest p-3 rounded-lg opacity-0 pointer-events-none group-hover/info:opacity-100 transition-opacity z-20">
                           Verify exact plot boundaries, road widths, and zoning use-cases for this specific Town Planning scheme.
                        </div>
                      </div>
                   </div>

                   <h3 className="font-display text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight group-hover:text-[#FF7A00] transition-colors">{tp.title}</h3>
                   
                   <div className="space-y-4 mb-10 p-4 bg-slate-50 rounded-xl group-hover:bg-slate-100/50 transition-colors">
                      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-600">
                         <Layers className="h-4 w-4 text-slate-400" /> {tp.area}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#FF7A00]">
                         <ShieldCheck className="h-4 w-4" /> {tp.focus}
                      </div>
                   </div>

                   <Link 
                     href="/pdf" 
                     className="w-full h-14 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] group-hover:bg-[#FF7A00] transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
                   >
                     Access Documents PDF <ArrowRight className="h-4 w-4" />
                   </Link>
                </div>
              ))}
           </div>
           
           {filteredList.length === 0 && (
             <div className="text-center py-20 text-slate-500 font-bold uppercase tracking-widest text-sm">
                No matching zones found. Try adjusting your filters.
             </div>
           )}

        </div>
      </section>
    </div>
  );
}
