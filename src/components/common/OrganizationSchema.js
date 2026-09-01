import React from"react";
import Script from"next/script";

export default function OrganizationSchema() {
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ||"https://www.dholeraplatform.com";
 
 const jsonLd = {
"@context":"https://schema.org",
"@type":"Organization",
"name":"Dholera Platform",
"url": siteUrl,
"logo":`${siteUrl}/logo.png`,
"sameAs": [
"https://www.facebook.com/dholeraplatform",
"https://twitter.com/dholeraplatform",
"https://www.instagram.com/dholeraplatform",
"https://www.youtube.com/@dholeraplatform"
 ],
"contactPoint": {
"@type":"ContactPoint",
"telephone":"+91-7435808031",
"contactType":"customer service",
"email":"gohelnaresh7707@gmail.com",
"areaServed":"IN",
"availableLanguage": ["en","hi","gu"]
 }
 };

 return (
 <Script
 id="organization-schema"
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 );
}
