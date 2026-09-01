Your Google Search Console setup confirms that [https://www.dholeraplatform.com/](https://www.dholeraplatform.com/) is verified, indexed, served over HTTPS, and operating on Google's priority crawl queue.

However, the crawled HTML code on your screen reveals a canonical tag conflict in your Next.js application that needs to be updated in your codebase.

Critical Code Fix: Canonical URL Conflict
In your page header source:

HTML
<link rel="canonical" href="https://dholeraplatform.com/" />
<meta property="og:url" content="https://dholeraplatform.com" />
The Issue:
Your site serves traffic on www ([https://www.dholeraplatform.com/](https://www.dholeraplatform.com/)), but your <link rel="canonical"> and Open Graph tags explicitly declare the non-www URL ([https://dholeraplatform.com/](https://dholeraplatform.com/)). This sends mixed signals to Google's crawler.

How to Fix in VS Code:
In your root Next.js layout/metadata configuration (e.g., app/layout.tsx or next-seo.config.ts), update metadataBase and canonical URLs to include www:

TypeScript
export const metadata: Metadata = {
  metadataBase: new URL('https://www.dholeraplatform.com'),
  alternates: {
    canonical: '/', // Resolves to https://www.dholeraplatform.com/
  },
  openGraph: {
    url: 'https://www.dholeraplatform.com',
  },
};
Next Immediate Steps
Submit Remaining Priority Pages:

Click the inspection search bar at the top ("Inspect any URL in 'https://www.dholeraplatform.com/'") and request indexing for your core hubs:

Town Planning Maps

Infrastructure Guide

Airport Guide

Growth Updates / Blogs

Clearance Engine

About Us

Deploy the Canonical Tag Update: Push the www canonical fix to your repository and deploy to production.

Monitor the Pages Report: Allow 24–48 hours for Google to refresh the processing state shown in your background tab.