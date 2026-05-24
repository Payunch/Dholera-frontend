import React from "react";

export default function OrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dholeraplatform.com";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dholera Platform",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      "https://www.facebook.com/dholeraplatform",
      "https://twitter.com/dholeraplatform",
      "https://www.instagram.com/dholeraplatform",
      "https://www.youtube.com/@dholeraplatform"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX", // This should be dynamic from site data
      "contactType": "customer service",
      "email": "info@dholeraplatform.com",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi", "gu"]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
