import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import OrganizationSchema from "@/components/OrganizationSchema";
import SafeClientLayout from "@/components/layout/SafeClientLayout";

const instrumentSans = Instrument_Sans({
  // ...

  variable: "--font-instrument-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || "GTM-WM9HRJVV";
const CLARITY_ID = process.env.NEXT_PUBLIC_MS_CLARITY_ID;
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: {
    default: "Dholera Platform | Independent Infrastructure Intelligence & Planning Maps",
    template: "%s | Dholera Platform",
  },
  description: "Independent Dholera Platform for infrastructure intelligence, planning maps, TP maps, and land investment growth evidence in Dholera Smart City.",
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
  verification: {
    google: [GOOGLE_SITE_VERIFICATION || "eOSkPAROruwLbAAUUuauDfuHEYPyyNsSWukybqAxGmA"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6979634293826789"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Script
          id="gtm-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`,
          }}
        />
      </head>
      <body className={`${instrumentSans.variable} ${spaceGrotesk.variable} font-sans antialiased`} suppressHydrationWarning>
        {CLARITY_ID && (
          <Script
            id="clarity-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/${CLARITY_ID}";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script");`,
            }}
          />
        )}

        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            aria-hidden="true"
          />
        </noscript>

        <SafeClientLayout>{children}</SafeClientLayout>
      </body>
    </html>
  );
}
