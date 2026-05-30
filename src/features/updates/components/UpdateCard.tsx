import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Update } from "@/types/update";
import { cn } from "@/lib/utils";
import { SITE_BASE_URL } from "@/lib/api";

interface UpdateCardProps {
  update: Update;
}

const CATEGORY_COLORS = {
  Infrastructure: "bg-blue-600",
  Industrial: "bg-green-700",
  Planning: "bg-purple-700",
  Investment: "bg-orange-600",
  General: "bg-slate-700",
};

export function UpdateCard({ update }: UpdateCardProps) {
  const catColor = CATEGORY_COLORS[update.category] || "bg-slate-700";
  const preview = update.content
    ? update.content.replace(/\n/g, " ").slice(0, 140) + (update.content.length > 140 ? "..." : "")
    : "";

  const imgSrc = update.imageUrl 
    ? (update.imageUrl.startsWith("http") ? update.imageUrl : `${SITE_BASE_URL}${update.imageUrl}`)
    : null;

  return (
    <Link
      href={`/updates/${update.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-orange-200"
    >
      {/* Image or Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={update.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={cn("flex h-full w-full items-center justify-center p-8 text-center", catColor)}>
            <span className="text-2xl font-black uppercase tracking-tighter text-white/90">
              {update.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className={cn("rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white", catColor)}>
            {update.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Calendar className="h-3.5 w-3.5" />
            {format(new Date(update.publishedAt || update.createdAt), "MMM d, yyyy, h:mm a")}
          </div>
        </div>

        <h3 className="text-xl font-black leading-tight text-slate-900 group-hover:text-orange-600 transition-colors">
          {update.title}
        </h3>

        <p className="flex-1 text-sm font-medium leading-relaxed text-slate-500 line-clamp-3">
          {preview}
        </p>

        <div className="flex items-center gap-2 pt-2 text-xs font-black uppercase tracking-widest text-orange-600 transition-all group-hover:gap-4">
          Read Full Analysis
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
