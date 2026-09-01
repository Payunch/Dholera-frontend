import Image from"next/image";
import Link from"next/link";
import { cookies } from "next/headers";
import { redirect, permanentRedirect } from "next/navigation";
import { ChevronLeft, Calendar, Share2, Clock, Lock, Smartphone } from "lucide-react";
import { format } from"date-fns";
import { getUpdateById } from"@/features/updates/api";
import { ArticleBody } from"@/features/updates/components/ArticleBody";
import { cn } from"@/lib/utils";
import { SITE_BASE_URL } from"@/lib/api";
import { BlogPopupTrigger } from"@/components/leads/BlogPopupTrigger";
import { ShareButton } from "./ShareButton";
import { siteConfig } from "@/config/site";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";


export const dynamic ="force-dynamic";

// Dynamic SEO
export async function generateMetadata(
 { params, searchParams },
 parent
) {
 const { slug } = await params;
 const idMatch = slug.match(/^(\d+)/);
 const id = idMatch ? idMatch[1] : slug;
 const audience = searchParams?.audience === "app" ? "app" : "web";
 const cookieStore = await cookies();
 const lang = cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('preferred_language')?.value ||'en';
 
 const update = await getUpdateById(id, lang, audience);
 if (!update) return {};

 const expectedSlug = update.title ? `${id}-${update.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}` : id.toString();

 const previousImages = (await parent).openGraph?.images || [];
  const imgSrc = update.imageUrl 
  ? (
      update.imageUrl.startsWith("http") ? update.imageUrl : 
      update.imageUrl.startsWith("/uploads/") ? `${SITE_BASE_URL}${update.imageUrl}` :
      update.imageUrl
    )
  : null;

 return {
 title: update.seoTitle || update.title,
 description: update.seoDescription || update.content.slice(0, 160).replace(/\n/g,""),
 alternates: { canonical: `/blogs/${expectedSlug}` },
 authors: [{ name: update.author || "Naresh Gohel", url: "/author/naresh-gohel" }],
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

export default async function UpdateDetailPage({ params, searchParams }) {
 const { slug } = await params;
 const idMatch = slug.match(/^(\d+)/);
 const id = idMatch ? idMatch[1] : slug;
 const audience = searchParams?.audience === "app" ? "app" : "web";
 const cookieStore = await cookies();
 const lang = cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('preferred_language')?.value ||'en';

 const update = await getUpdateById(id, lang, audience);

 if (!update) {
   redirect('/blogs');
 }

 const expectedSlug = update.title ? `${id}-${update.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}` : id.toString();
 if (slug !== expectedSlug) {
   permanentRedirect(`/blogs/${expectedSlug}${audience === 'app' ? '?audience=app' : ''}`);
 }

  const imgSrc = update.imageUrl 
  ? (
      update.imageUrl.startsWith("http") ? update.imageUrl : 
      update.imageUrl.startsWith("/uploads/") ? `${SITE_BASE_URL}${update.imageUrl}` :
      update.imageUrl
    )
  : null;
 const imgPos = update.imagePosition ||"top";
 const catColor = CATEGORY_COLORS[update.category] || CATEGORY_COLORS.General;
 const publishedAt = update.publishedAt || update.createdAt;
 const articleSchema = {
   "@context": "https://schema.org",
   "@type": update.category === "News" ? "NewsArticle" : "Article",
   headline: update.title,
   datePublished: publishedAt,
   dateModified: update.updatedAt || publishedAt,
   mainEntityOfPage: `${siteConfig.url}/blogs/${expectedSlug}`,
   author: { "@type": "Person", name: update.author || "Naresh Gohel", url: `${siteConfig.url}/author/naresh-gohel` },
   publisher: { "@type": "Organization", name: "Dholera Platform", url: siteConfig.url },
   ...(imgSrc ? { image: [imgSrc] } : {}),
 };

 return (
 <article className="bg-white dark:bg-slate-900 pt-24 pb-32">
 <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Blogs", path: "/blogs" }, { name: update.title, path: `/blogs/${expectedSlug}` }]} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
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
      {update.tags.split(',').slice(0, 5).map((tag, i) => (
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
 <Link href="/author/naresh-gohel" className="text-sm font-black uppercase tracking-tight text-slate-900 hover:text-orange-600 dark:text-white">{update.author || "Naresh Gohel"}</Link>
 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{update.author ? "Author" : "Verified Analysis"}</span>
 </div>
 </div>
              <ShareButton 
                title={update.title} 
                text={`Read this article on Dholera Platform: ${update.title}`} 
                url={`${siteConfig.url}/blogs/${expectedSlug}${update.isExclusive ? "?audience=app" : ""}`}
              />
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
  {update.isExclusive ? (
    <div className="my-12 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
      <div className="mx-auto w-16 h-16 rounded-2xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-500 shadow-xl shadow-orange-600/20">
        <Lock className="h-8 w-8" />
      </div>
      <div className="max-w-2xl mx-auto space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest">
          📱 Mobile App Exclusive Content
        </span>
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          Unlock Full Insight in Dholera App
        </h3>
        <p className="text-sm text-slate-400 font-medium leading-relaxed">
          This spatial report and investor analysis is reserved exclusively for Dholera app users. Download the app to access interactive GIS maps, real-time plot updates, and offline PDF reports.
        </p>
      </div>
      <div className="pt-4 flex flex-wrap justify-center gap-4">
        <a 
          href="/download" 
          target="_blank" 
          rel="noreferrer"
          className="px-8 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-orange-600/30"
        >
          Download for Android
        </a>
        <a 
          href="https://apple.com/app-store" 
          target="_blank" 
          rel="noreferrer"
          className="px-8 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-black uppercase tracking-widest border border-slate-700 transition-all"
        >
          Download for iOS
        </a>
      </div>
    </div>
  ) : (
    <>
      <ArticleBody content={update.content} />
      <FaqSchema content={update.content} />
    </>
  )}

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

 <footer className="mt-20 border-t border-slate-100 pt-12 text-center">
 <h4 className="mb-6 text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Explore Core Intelligence Hubs</h4>
 <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
 <Link
 href="/smart-city"
 className="rounded-full bg-slate-100 dark:bg-slate-800 px-6 py-3 font-bold uppercase tracking-widest text-slate-900 dark:text-white transition-colors hover:bg-orange-600 hover:text-white text-xs"
 >
 Dholera SIR Facts
 </Link>
 <Link
 href="/infrastructure"
 className="rounded-full bg-slate-100 dark:bg-slate-800 px-6 py-3 font-bold uppercase tracking-widest text-slate-900 dark:text-white transition-colors hover:bg-orange-600 hover:text-white text-xs"
 >
 Expressway & Infrastructure
 </Link>
 <Link
 href="/tp-maps"
 className="rounded-full bg-slate-100 dark:bg-slate-800 px-6 py-3 font-bold uppercase tracking-widest text-slate-900 dark:text-white transition-colors hover:bg-orange-600 hover:text-white text-xs"
 >
 TP Maps Guide
 </Link>
 </div>
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

export function FaqSchema({ content }) {
  if (!content) return null;
  const regex = /<h3>Q:\s*(.*?)<\/h3>[\s\S]*?<p>A:\s*(.*?)<\/p>/g;
  const faqs = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    faqs.push({ question: match[1].trim(), answer: match[2].trim() });
  }

  if (faqs.length < 2) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question.replace(/<[^>]*>?/gm, ''),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>?/gm, '')
      }
    }))
  };

  const jsonLdString = JSON.stringify(schema).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}
