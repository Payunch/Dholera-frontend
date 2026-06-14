import type { Metadata } from"next";
import Script from"next/script";
import { GoogleTagManager } from '@next/third-parties/google';
import { Instrument_Sans, Space_Grotesk } from"next/font/google";
import"./globals.css";
import OrganizationSchema from"@/components/common/OrganizationSchema";
import Analytics from"@/components/common/Analytics";
import SafeClientLayout from"@/components/layout/SafeClientLayout";

const instrumentSans = Instrument_Sans({
 // ...

 variable:"--font-instrument-sans",
 display:"swap",
});

const spaceGrotesk = Space_Grotesk({
 subsets: ["latin"],
 variable:"--font-space-grotesk",
 display:"swap",
});

const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ||"GTM-WM9HRJVV";
const CLARITY_ID = process.env.NEXT_PUBLIC_MS_CLARITY_ID;
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
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

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="en" suppressHydrationWarning>
 <head>
  <GoogleTagManager gtmId={GTM_CONTAINER_ID} />
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
 <body className={`${instrumentSans.variable} ${spaceGrotesk.variable} font-sans antialiased`} suppressHydrationWarning>
 <OrganizationSchema />
 <Analytics />

 <SafeClientLayout>{children}</SafeClientLayout>
 </body>
 </html>
 );
}
