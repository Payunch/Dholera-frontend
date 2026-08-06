import Script from"next/script";
import { GoogleTagManager } from '@next/third-parties/google';
import { Inter, Outfit } from "next/font/google";
import"./globals.css";
import OrganizationSchema from"@/components/common/OrganizationSchema";
import Analytics from"@/components/common/Analytics";
import SafeClientLayout from"@/components/layout/SafeClientLayout";

const inter = Inter({
 subsets: ["latin"],
 variable:"--font-inter",
 display:"swap",
});

const outfit = Outfit({
 subsets: ["latin"],
 variable:"--font-outfit",
 display:"swap",
});

const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ||"GTM-WM9HRJVV";
const CLARITY_ID = process.env.NEXT_PUBLIC_MS_CLARITY_ID;
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ||"AW-123456789";

export const metadata = {
 title: {
 default:"Dholera Platform | Independent Infrastructure Intelligence & Planning Maps",
 template:"%s | Dholera Platform",
 },
 description:"Independent Dholera Platform for infrastructure intelligence, planning maps, TP maps, and land investment growth evidence in Dholera Smart City.",
 keywords: ["Dholera Platform","Dholera Smart City","Dholera Maps","Dholera Planning","TP Map Dholera","Dholera Investment","Dholera Growth Evidence"],
 authors: [{ name:"Dholera Growth Team" }],
 creator:"Dholera Platform",
 publisher:"Dholera Platform",
 formatDetection: {
 email: false,
 address: false,
 telephone: false,
 },
 metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ||"https://dholeraplatform.com"),
 alternates: {
 canonical:"/",
 },
 openGraph: {
 title:"Dholera Platform | Growth Evidence & Planning Maps",
 description:"Intelligence and planning resources for Dholera Special Investment Region.",
 url:"https://dholeraplatform.com",
 siteName:"Dholera Platform",
 locale:"en_IN",
 type:"website",
 },
 icons: {
 icon:"/icon.png",
 },
 twitter: {
 card:"summary_large_image",
 title:"Dholera Platform | Growth Evidence & Planning Maps",
 description:"Intelligence and planning resources for Dholera Special Investment Region.",
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
"max-video-preview": -1,
"max-image-preview":"large",
"max-snippet": -1,
 },
 },
};

export default function RootLayout({ children }) {
 return (
 <html lang="en" suppressHydrationWarning>
  <GoogleTagManager gtmId={GTM_CONTAINER_ID} />
 <head>
  <Script id="consent-default" strategy="beforeInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied'
      });
    `}
  </Script>
  <Script id="aw-tag" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
  <Script id="aw-config" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GOOGLE_ADS_ID}');
    `}
  </Script>
  <Script
    id="adsense-script"
    strategy="afterInteractive"
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6979634293826789"
    crossOrigin="anonymous"
  />
  <Script id="meta-pixel" strategy="afterInteractive">
    {`
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || "YOUR_PIXEL_ID"}');
      fbq('track', 'PageView');
    `}
  </Script>
 </head>
 <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`} suppressHydrationWarning>
 <OrganizationSchema />
 <Analytics />

 <SafeClientLayout>{children}</SafeClientLayout>
 </body>
 </html>
 );
}
