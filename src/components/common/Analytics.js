"use client";

import Script from"next/script";
import React, { useEffect } from"react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ||"GTM-WM9HRJVV";
const CLARITY_ID = process.env.NEXT_PUBLIC_MS_CLARITY_ID;

export default function Analytics() {
 useEffect(() => {
  const handleClick = (event) => {
   const link = event.target.closest?.("a[href]");
   if (!link || typeof window.gtag !== "function") return;

   const href = link.getAttribute("href") || "";
   let eventName;
   if (href.includes("wa.me/")) eventName = "whatsapp_click";
   else if (href.startsWith("tel:")) eventName = "phone_click";
   else if (href.startsWith("mailto:")) eventName = "email_click";
   else if (href.startsWith("/download") || href.includes(".apk")) eventName = "download_click";

   if (eventName) window.gtag("event", eventName, { link_url: link.href, page_path: window.location.pathname });
  };

  document.addEventListener("click", handleClick);
  return () => document.removeEventListener("click", handleClick);
 }, []);

 return (
 <>
 {CLARITY_ID && <Script
 id="clarity-init"
 strategy="afterInteractive"
 >
 {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/${CLARITY_ID}";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document,"clarity","script");`}
 </Script>}
 </>
 );
}
