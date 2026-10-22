import React from "react";
import Script from "next/script";

export default function OrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.includes('localhost') ? process.env.NEXT_PUBLIC_SITE_URL : "https://www.dholeraplatform.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Dholera Platform",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "founder": {
          "@type": "Person",
          "name": "Naresh Gohel",
          "url": `${siteUrl}/author/naresh-gohel`
        },
        "sameAs": [
          "https://www.facebook.com/dholeraplatform",
          "https://twitter.com/dholeraplatform",
          "https://www.instagram.com/dholeraplatform",
          "https://www.youtube.com/@dholeraplatform"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-8200448270",
          "contactType": "customer service",
          "email": "gohelnaresh7707@gmail.com",
          "areaServed": "IN",
          "availableLanguage": ["en", "hi", "gu"]
        }
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${siteUrl}/#realestateagent`,
        "name": "Dholera Platform Land & Infrastructure Advisory",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "telephone": "+91-8200448270",
        "email": "gohelnaresh7707@gmail.com",
        "priceRange": "₹3,500 - ₹16,500 per sq yard",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Bank Transfer, RTGS, Cheque",
        "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 09:00-20:00",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Near ABCD Building, Town Planning Scheme 2",
          "addressLocality": "Dholera Special Investment Region",
          "addressRegion": "Gujarat",
          "postalCode": "382455",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "22.2465",
          "longitude": "72.1969"
        },
        "hasMap": `${siteUrl}/tp-maps`,
        "areaServed": [
          "Dholera SIR",
          "Ahmedabad",
          "Vadodara",
          "Bhavnagar",
          "Gujarat",
          "India"
        ]
      }
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
