"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Update, UpdateCategory } from "@/types/update";
import { UpdateCard } from "./UpdateCard";
import { cn } from "@/lib/utils";

interface UpdatesListingProps {
  initialUpdates: Update[];
}

const categories: UpdateCategory[] = ["All", "Infrastructure", "Industrial", "Planning", "Investment", "General"];

export function UpdatesListing({ initialUpdates }: UpdatesListingProps) {
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<UpdateCategory>("All");

  const filteredUpdates = initialUpdates.filter((u) => {
    const matchesCat = activeCategory === "All" || u.category === activeCategory;
    const matchesSearch = u.title.toLowerCase().includes(search.toLowerCase()) || 
                          u.content.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Search and Filters */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search analysis and milestones..."
            className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 font-semibold text-slate-900 outline-none transition-all focus:border-orange-600 focus:bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-black uppercase tracking-widest transition-all border-2",
                activeCategory === cat
                  ? "border-orange-600 bg-orange-600 text-white"
                  : "border-slate-100 bg-white text-slate-500 hover:border-orange-600 hover:text-orange-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredUpdates.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUpdates.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
            <Search className="h-10 w-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 uppercase">No matching intel found</h3>
          <p className="text-slate-500 font-medium">Try adjusting your filters or search keywords.</p>
        </div>
      )}
    </div>
  );
}
