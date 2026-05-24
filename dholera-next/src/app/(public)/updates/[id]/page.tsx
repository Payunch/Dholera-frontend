import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, Share2, Clock } from "lucide-react";
import { format } from "date-fns";
import { getUpdateById, getUpdates } from "@/features/updates/api";
import { ArticleBody } from "@/features/updates/components/ArticleBody";
import { cn } from "@/lib/utils";

interface Props {
  params: { id: string };
}

// SSG: Pre-generate paths for faster indexing
export async function generateStaticParams() {
  const updates = await getUpdates();
  return updates.map((u) => ({
    id: u.id.toString(),
  }));
}

// Dynamic SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const update = await getUpdateById(params.id);
  if (!update) return {};

  const previousImages = (await parent).openGraph?.images || [];
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://api.dholeraplatform.com/api").replace(/\/api$/, "");
  const imgSrc = update.imageUrl 
    ? (update.imageUrl.startsWith("http") ? update.imageUrl : `${API_BASE}${update.imageUrl}`)
    : null;

  return {
    title: update.title,
    description: update.content.slice(0, 160).replace(/\n/g, " "),
    openGraph: {
      title: update.title,
      description: update.content.slice(0, 160).replace(/\n/g, " "),
      images: imgSrc ? [imgSrc, ...previousImages] : previousImages,
      type: "article",
      publishedTime: update.createdAt,
      authors: ["Dholera Growth Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: update.title,
      description: update.content.slice(0, 160).replace(/\n/g, " "),
      images: imgSrc ? [imgSrc] : [],
    }
  };
}

const CATEGORY_COLORS = {
  Infrastructure: "text-blue-600 border-blue-100 bg-blue-50",
  Industrial: "text-green-700 border-green-100 bg-green-50",
  Planning: "text-purple-700 border-purple-100 bg-purple-50",
  Investment: "text-orange-600 border-orange-100 bg-orange-50",
  General: "text-slate-600 border-slate-100 bg-slate-50",
};

export default async function UpdateDetailPage({ params }: Props) {
  const update = await getUpdateById(params.id);

  if (!update) {
    notFound();
  }

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://api.dholeraplatform.com/api").replace(/\/api$/, "");
  const imgSrc = update.imageUrl 
    ? (update.imageUrl.startsWith("http") ? update.imageUrl : `${API_BASE}${update.imageUrl}`)
    : null;
  const imgPos = update.imagePosition || "top";
  const catColor = CATEGORY_COLORS[update.category] || CATEGORY_COLORS.General;

  return (
    <article className="bg-white pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Navigation */}
          <Link
            href="/updates"
            className="mb-12 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-orange-600"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Intelligence
          </Link>

          {/* Header */}
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className={cn("rounded-full border px-4 py-1.5 text-[10px] font-black uppercase tracking-widest", catColor)}>
                {update.category}
              </span>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Calendar className="h-4 w-4" />
                {format(new Date(update.createdAt), "MMMM d, yyyy")}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Clock className="h-4 w-4" />
                5 min read
              </div>
            </div>

            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-slate-900 md:text-6xl uppercase">
              {update.title}
            </h1>

            <div className="flex items-center justify-between border-y border-slate-100 py-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                  DP
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black uppercase tracking-tight text-slate-900">Dholera Growth Team</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Official Analysis</span>
                </div>
              </div>

              <button className="rounded-full border-2 border-slate-100 p-2 text-slate-400 transition-all hover:border-orange-600 hover:text-orange-600">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </header>

          {/* Top Image */}
          {imgSrc && imgPos === "top" && (
            <div className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src={imgSrc}
                alt={update.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <ArticleBody content={update.content} />

          {/* Bottom Image */}
          {imgSrc && imgPos === "bottom" && (
            <div className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src={imgSrc}
                alt={update.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Footer Navigation */}
          <footer className="mt-20 border-t border-slate-100 pt-12 text-center">
            <h4 className="mb-6 text-xl font-black uppercase tracking-tight text-slate-900">Ready to invest in Dholera SIR?</h4>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/clearance-engine"
                className="rounded-full bg-orange-600 px-10 py-4 font-black uppercase tracking-widest text-white transition-transform hover:scale-105"
              >
                Verify Zoning Compliance
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-slate-900 px-10 py-4 font-black uppercase tracking-widest text-slate-900 transition-all hover:bg-slate-900 hover:text-white"
              >
                Get Expert Advice
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
