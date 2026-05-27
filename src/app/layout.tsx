import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-1F1ETWFZ6M";
const CLARITY_ID = process.env.NEXT_PUBLIC_MS_CLARITY_ID;
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: {
    default: "Dholera Platform | Official Infrastructure Intelligence & Planning Maps",
    template: "%s | Dholera Platform",
  },
  description: "Official Dholera Platform for infrastructure intelligence, planning maps, TP maps, and land investment growth evidence in Dholera Smart City.",
  keywords: ["Dholera Platform", "Dholera Smart City", "Dholera Maps", "Dholera Planning", "TP Map Dholera", "Dholera Investment", "Dholera Growth Evidence"],
  authors: [{ name: "Dholera Growth Team" }],
  creator: "Dholera Platform",
  publisher: "Dholera Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dholeraplatform.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dholera Platform | Growth Evidence & Planning Maps",
    description: "Intelligence and planning resources for Dholera Special Investment Region.",
    url: "https://dholeraplatform.com",
    siteName: "Dholera Platform",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dholera Platform | Growth Evidence & Planning Maps",
    description: "Intelligence and planning resources for Dholera Special Investment Region.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: GOOGLE_SITE_VERIFICATION ? { google: [GOOGLE_SITE_VERIFICATION] } : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        {GA_MEASUREMENT_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="beforeInteractive" />
            <Script id="gtag-init" strategy="beforeInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('consent', 'default', { 'ad_storage': 'denied', 'ad_user_data': 'denied', 'ad_personalization': 'denied', 'analytics_storage': 'denied' }); gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}

        {CLARITY_ID && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/${CLARITY_ID}";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script");`}
          </Script>
        )}

        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
