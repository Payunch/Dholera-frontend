import { Metadata } from "next";
import { getUpdates } from "@/features/updates/api";
import Link from "next/link";
import { ArrowRight, TrendingUp, Landmark, HardHat } from "lucide-react";
import Image from "next/image";
import { SITE_BASE_URL } from "@/lib/api";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Dholera Market Insights & Growth Tracking",
  description: "Comprehensive structural analytics, market forecasts, and growth tracking milestones for Dholera Special Investment Region.",
};

const SILOS = [
  {
    id: "price-trends",
    title: "Price Trend Analyses",
    icon: TrendingUp,
    match: ["investment", "price", "market", "general"] // keywords to match categories
  },
  {
    id: "policy-shifts",
    title: "Policy Shifts & Subsidies",
    icon: Landmark,
    match: ["planning", "policy", "legal", "subsidy"]
  },
  {
    id: "infrastructure",
    title: "Infrastructure Milestones",
    icon: HardHat,
    match: ["infrastructure", "industrial", "construction", "project"]
  }
];

export default async function BlogsAggregatorPage() {
  const updates = await getUpdates();
  
  // Distribute updates into silos
  const siloData = SILOS.map(silo => ({
    ...silo,
    posts: updates.filter(u => silo.match.some(keyword => (u.category || "general").toLowerCase().includes(keyword)))
  }));

  // If some posts didn't match, put them in Price Trends by default to ensure they show up
  const matchedIds = new Set(siloData.flatMap(s => s.posts.map(p => p.id)));
  const unmatched = updates.filter(u => !matchedIds.has(u.id));
  if (unmatched.length > 0) {
    siloData[0].posts.push(...unmatched);
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans w-full overflow-x-hidden">
      
      {/* Header Section */}
      <section className="relative bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <Image 
            src="/images/dholerasirGujrat.webp" 
            alt="Dholera Intelligence Hub" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
           <div className="max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#FF7A00]">
                Market Intelligence
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[1.1]">
                DSIR <span className="text-[#FF7A00] italic">Insights & Analysis</span>
              </h1>
              <p className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
                Structural analytics, market forecasts, and growth tracking milestones. The definitive source for Dholera intelligence.
              </p>
           </div>
        </div>
      </section>

      {/* Silos Section */}
      <section className="py-20">
         <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-32">
            
            {siloData.map((silo, idx) => (
              <div key={silo.id} className="space-y-12">
                 
                 {/* Silo Header */}
                 <div className="flex items-center gap-6 border-b border-slate-200 pb-6">
                    <div className="h-16 w-16 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-[#FF7A00] shadow-sm">
                       <silo.icon className="h-8 w-8" />
                    </div>
                    <div>
                       <h2 className="font-display text-3xl font-black text-slate-900 uppercase tracking-tight">
                         [ {silo.title} ]
                       </h2>
                    </div>
                 </div>

                 {/* Posts Grid */}
                 {silo.posts.length === 0 ? (
                   <div className="p-10 bg-white rounded-2xl border border-slate-100 text-center text-slate-500 font-bold uppercase tracking-widest text-sm">
                      No analyses published in this silo yet.
                   </div>
                 ) : (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {silo.posts.map(post => {
                         const imgSrc = post.imageUrl 
                           ? (post.imageUrl.startsWith("http") ? post.imageUrl : `${SITE_BASE_URL}${post.imageUrl}`)
                           : null;

                         return (
                           <Link 
                             key={post.id} 
                             href={`/blogs/${post.id}`}
                             className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-[#FF7A00] hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden"
                           >
                              {imgSrc && (
                                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                                   <Image 
                                     src={imgSrc}
                                     alt={post.title}
                                     fill
                                     className="object-cover group-hover:scale-110 transition-transform duration-700"
                                   />
                                   <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-500" />
                                </div>
                              )}
                              <div className="p-10 flex-1 flex flex-col">
                                 <div className="flex items-center justify-between mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] bg-orange-50 px-4 py-1.5 rounded-xl border border-orange-100/50">
                                      {post.category}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                      {format(new Date(post.publishedAt || post.createdAt), "MMM d, yyyy")}
                                    </span>
                                 </div>
                                 <h3 className="font-display text-2xl font-black text-slate-900 uppercase leading-snug group-hover:text-[#FF7A00] transition-colors duration-300 line-clamp-3 mb-6">
                                   {post.title}
                                 </h3>
                                 <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-3 mb-10 opacity-80 group-hover:opacity-100 transition-opacity">
                                   {post.content.replace(/<[^>]*>?/gm, '').slice(0, 140)}...
                                 </p>
                                 <div className="mt-auto pt-6 border-t border-slate-50 group-hover:border-orange-500/10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 group-hover:text-[#FF7A00] flex items-center justify-between transition-all duration-300">
                                    Analyze Report <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                                 </div>
                              </div>
                           </Link>
                         )
                      })}
                   </div>
                 )}

              </div>
            ))}
            
         </div>
      </section>

    </div>
  );
}
