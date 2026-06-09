"use client";

import Script from "next/script";
import React from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || "GTM-WM9HRJVV";
const CLARITY_ID = process.env.NEXT_PUBLIC_MS_CLARITY_ID;

export default function Analytics() {
  return (
    <>
      {/* GTM Script */}
      <Script
        id="gtm-init"
        strategy="beforeInteractive"
      >
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      {/* Clarity Script */}
      {CLARITY_ID && (
        <Script
          id="clarity-init"
          strategy="afterInteractive"
        >
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/${CLARITY_ID}";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script");`}
        </Script>
      )}
    </>
  );
}
