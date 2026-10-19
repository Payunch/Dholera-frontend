"use client";

import React from "react";
import Link from "next/link";

export function BlogQuickLinks({ blogTitle = "Dholera Smart City Update" }) {
  const whatsappMessage = encodeURIComponent(
    `Hello Naresh, I was reading your article "${blogTitle}" on Dholera Platform. I want more details on verified plots and the latest TP master plan.`
  );

  const links = [
    {
      title: "Download TP 1 – TP 6 Maps",
      href: "/tp-maps",
      isExternal: false,
    },
    {
      title: "Download Official Android APK",
      href: "/download",
      isExternal: false,
    },
    {
      title: "Chat on WhatsApp with Advisory Desk",
      href: `https://wa.me/917435808031?text=${whatsappMessage}`,
      isExternal: true,
    },
    {
      title: "Call / WhatsApp: +91 7435808031",
      href: "https://wa.me/917435808031",
      isExternal: true,
    },
    {
      title: "Visit Strategic Advisory & Contact Portal",
      href: "/contact",
      isExternal: false,
    },
  ];

  return (
    <section className="my-10 py-6 border-y border-slate-200 dark:border-slate-800">
      {/* Noticeable Section Heading */}
      <div className="mb-6">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">
          Verified Investor Channels
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
          Investor Resources & Direct Contact
        </h2>
      </div>

      {/* Clean list with arrows FIRST, normal font styling, and no card/box UI */}
      <ul className="space-y-4 list-none p-0 m-0">
        {links.map((item, idx) => {
          const content = (
            <span className="inline-flex items-center gap-3 text-lg sm:text-2xl font-bold text-slate-900 dark:text-white hover:text-[#FF7A00] dark:hover:text-[#FF7A00] hover:underline transition-colors">
              <span className="text-[#FF7A00] text-xl sm:text-3xl font-black shrink-0 leading-none" aria-hidden="true">
                →
              </span>
              <h3 className="text-lg sm:text-2xl font-bold text-inherit m-0 inline">
                {item.title}
              </h3>
            </span>
          );

          return (
            <li key={idx} className="p-0 m-0">
              {item.isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  {content}
                </a>
              ) : (
                <Link href={item.href} className="inline-block">
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
