import { cookies } from"next/headers";
import { Metadata, ResolvingMetadata } from"next";
import Image from"next/image";
import Link from"next/link";
import { notFound } from"next/navigation";
import { ChevronLeft, Calendar, Share2, Clock } from"lucide-react";
import { format } from"date-fns";
import { getUpdateById } from"@/features/updates/api";
import { ArticleBody } from"@/features/updates/components/ArticleBody";
import { cn } from"@/lib/utils";
import { SITE_BASE_URL } from"@/lib/api";
import { BlogPopupTrigger } from"@/components/leads/BlogPopupTrigger";

interface Props {
 params: Promise<{ id: string }>;
}

export const dynamic ="force-dynamic";

// Dynamic SEO
export async function generateMetadata(
 { params }: Props,
 parent: ResolvingMetadata
): Promise<Metadata> {
 const { id } = await params;
 const cookieStore = await cookies();
 const lang = cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('preferred_language')?.value ||'en';
 
 const update = await getUpdateById(id, lang);
 if (!update) return {};

 const previousImages = (await parent).openGraph?.images || [];
 const imgSrc = update.imageUrl 
 ? (update.imageUrl.startsWith("http") ? update.imageUrl :`${SITE_BASE_URL}${update.imageUrl}`)
 : null;

 return {
 title: update.seoTitle || update.title,
 description: update.seoDescription || update.content.slice(0, 160).replace(/\n/g,""),
 keywords: update.seoKeywords || "Dholera, Real Estate, Investment",
 openGraph: {
 title: update.seoTitle || update.title,
 description: update.seoDescription || update.content.slice(0, 160).replace(/\n/g,""),
 images: imgSrc ? [imgSrc, ...previousImages] : previousImages,
 type:"article",
 publishedTime: update.publishedAt || update.createdAt,
 authors: [update.author || "Dholera Growth Team"],
 },
 twitter: {
 card:"summary_large_image",
 title: update.seoTitle || update.title,
 description: update.seoDescription || update.content.slice(0, 160).replace(/\n/g,""),
 images: imgSrc ? [imgSrc] : [],
 }
 };
}

const CATEGORY_COLORS = {
 Infrastructure:"text-blue-600 border-blue-100 bg-blue-50",
 Industrial:"text-green-700 border-green-100 bg-green-50",
 Planning:"text-purple-700 border-purple-100 bg-purple-50",
 Investment:"text-orange-600 border-orange-100 bg-orange-50",
 General:"text-slate-600 dark:text-slate-400 border-slate-100 bg-white dark:bg-slate-900",
};

export default async function UpdateDetailPage({ params }: Props) {
 const { id } = await params;
 const cookieStore = await cookies();
 const lang = cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('preferred_language')?.value ||'en';

 const update = await getUpdateById(id, lang);

 if (!update) {
 notFound();
 }

 const imgSrc = update.imageUrl 
 ? (update.imageUrl.startsWith("http") ? update.imageUrl :`${SITE_BASE_URL}${update.imageUrl}`)
 : null;
 const imgPos = update.imagePosition ||"top";
 const catColor = CATEGORY_COLORS[update.category] || CATEGORY_COLORS.General;

 return (
 <article className="bg-white dark:bg-slate-900 pt-24 pb-32">
 <BlogPopupTrigger blogTitle={update.title} />
 <div className="container mx-auto px-4 md:px-8">
 <div className="mx-auto max-w-4xl">
 {/* Back Navigation */}
 <Link
 href="/blogs"
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
 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
 <Calendar className="h-4 w-4" />
 {format(new Date(update.publishedAt || update.createdAt),"MMMM d, yyyy, h:mm a")}
 </div>
 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
 <Clock className="h-4 w-4" />
 5 min read
 </div>
 </div>

 <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-6xl uppercase">
 {update.title}
 </h1>

 {update.tags && (
    <div className="flex flex-wrap gap-2 pt-4">
      {update.tags.split(',').slice(0, 5).map((tag: string, i: number) => (
        <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider rounded-full">
          {tag.trim()}
        </span>
      ))}
    </div>
  )}

 <div className="flex items-center justify-between border-y border-slate-100 py-6">
 <div className="flex items-center gap-3">
 <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-slate-900 dark:text-white font-black text-xs">
 DP
 </div>
 <div className="flex flex-col">
 <span className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">{update.author || "Dholera Growth Team"}</span>
 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{update.author ? "Author" : "Verified Analysis"}</span>
 </div>
 </div>

 <button className="rounded-full border-2 border-slate-100 p-2 text-slate-400 transition-all hover:border-orange-600 hover:text-orange-600">
 <Share2 className="h-5 w-5" />
 </button>
 </div>
 </header>

 {/* Top Image */}
 {imgSrc && imgPos ==="top" && (
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
 {imgSrc && imgPos ==="bottom" && (
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
 <h4 className="mb-6 text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Ready to invest in Dholera SIR?</h4>
 <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
 <Link
 href="/#site-visit"
 className="rounded-full bg-[#FF7A00] px-10 py-4 font-black uppercase tracking-widest text-white transition-transform hover:scale-105 shadow-lg shadow-orange-600/10"
 >
 Book Free Site Visit
 </Link>
 <Link
 href="/projects"
 className="rounded-full border-2 border-slate-900 px-10 py-4 font-black uppercase tracking-widest text-slate-900 dark:text-white transition-all hover:bg-white dark:hover:bg-slate-800 dark:bg-slate-900 hover:text-white"
 >
 View Verified Projects
 </Link>
 </div>
 </footer>
 </div>
 </div>
 </article>
 );
}
