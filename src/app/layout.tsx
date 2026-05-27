import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
