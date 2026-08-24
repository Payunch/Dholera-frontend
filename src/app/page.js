import { Metadata } from"next";
import { siteConfig } from"@/config/site";
import { HomeClient } from"./HomeClient";
import { Translate } from"@/components/i18n/Translate";
import { getUpdates } from "@/features/updates/api";
import { cookies } from "next/headers";

export const metadata = {
 title:"Independent Dholera Platform | Infrastructure Intelligence & Planning Maps",
 description:"Access verified planning maps, TP maps, and development permission fee calculators for Dholera Smart City. India's first operational smart city intelligence portal.",
 keywords: [
"Dholera Platform",
"Dholera Smart City",
"Dholera TP Map",
"Dholera Planning Maps",
"Dholera Investment Evidence",
"Dholera DSIRDA Fees",
"Dholera Infrastructure Data"
 ],
 alternates: {
 canonical: siteConfig.url,
 },
 openGraph: {
 title:"Dholera Platform | Growth Evidence & Planning Maps",
 description:"Verified infrastructure data and planning resources for Dholera Special Investment Region.",
 url: siteConfig.url,
 type:"website",
 }
};

export default async function HomePage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('preferred_language')?.value || 'en';
  
  let recentUpdates = [];
  try {
    const allUpdates = await getUpdates(undefined, lang);
    recentUpdates = allUpdates.slice(0, 6); // fetch up to 6 for the homepage
  } catch (err) {
    console.error("Failed to fetch recent updates for homepage:", err);
  }

 return (
 <div className="flex flex-col space-y-20 pb-20">
 {/* 
 Hero Section is kept in the client component for now to handle 
 the active tab state and scroll interaction, 
 but we pass critical SEO text as props if needed.
 */}
 <HomeClient recentUpdates={recentUpdates} />

 {/* 
 Hidden or visually subtle semantic content for SEO domination.
 This section provides Google with deep topical context.
 */}
 <section className="sr-only">
 <h2 className="text-3xl font-black uppercase text-slate-900 dark:text-white mb-8"><Translate id="about_dholera_platform" /></h2>
 <p>
 The Dholera Platform is the definitive source for intelligence on the Dholera Special Investment Region (DSIR). 
 We specialize in providing high-resolution planning maps, including Town Planning (TP) maps, Development Plan (DP) maps, 
 and public DSIRDA documentation. Our goal is to provide investors and professionals with verified growth evidence 
 for India&apos;s first operational smart city.
 </p>
 <ul className="list-disc pl-6 space-y-4 text-slate-600 dark:text-slate-400 font-medium">
 <li><Translate id="verified_maps" /></li>
 <li><Translate id="realtime_updates" /></li>
 <li><Translate id="fee_calculator" /></li>
 <li><Translate id="compliance_verification" /></li>
 </ul>
 </section>
 </div>
 );
}
