"use client";

import Script from "next/script";
import React from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || "GTM-WM9HRJVV";
const CLARITY_ID = process.env.NEXT_PUBLIC_MS_CLARITY_ID;

export default function Analytics() {
  if (!CLARITY_ID) return null;

  return (
    <>
      {/* Clarity Script */}
      <Script
        id="clarity-init"
        strategy="afterInteractive"
      >
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/${CLARITY_ID}";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script");`}
      </Script>
    </>
  );
}
