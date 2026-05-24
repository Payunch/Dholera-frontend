import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "Official Dholera Platform | Infrastructure Intelligence & Planning Maps",
  description: "Access verified planning maps, TP maps, and development permission fee calculators for Dholera Smart City. India's first operational smart city intelligence portal.",
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
    title: "Dholera Platform | Growth Evidence & Planning Maps",
    description: "Verified infrastructure data and planning resources for Dholera Special Investment Region.",
    url: siteConfig.url,
    type: "website",
  }
};

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-20 pb-20">
      {/* 
        Hero Section is kept in the client component for now to handle 
        the active tab state and scroll interaction, 
        but we pass critical SEO text as props if needed.
      */}
      <HomeClient />

      {/* 
        Hidden or visually subtle semantic content for SEO domination.
        This section provides Google with deep topical context.
      */}
      <section className="sr-only">
        <h2>About Dholera Platform</h2>
        <p>
          The Dholera Platform is the definitive source for intelligence on the Dholera Special Investment Region (DSIR). 
          We specialize in providing high-resolution planning maps, including Town Planning (TP) maps, Development Plan (DP) maps, 
          and official DSIRDA documentation. Our goal is to provide investors and professionals with verified growth evidence 
          for India's first operational smart city.
        </p>
        <ul>
          <li>Verified Dholera Smart City Maps</li>
          <li>Real-time Infrastructure Updates</li>
          <li>Development Permission Fee Calculator</li>
          <li>Land Investment Compliance Verification</li>
        </ul>
      </section>
    </div>
  );
}
