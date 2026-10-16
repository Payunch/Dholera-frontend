"use client";

import React from "react";
import Link from "next/link";
import { Map, Smartphone, MessageSquare, Phone, Globe, ArrowRight } from "lucide-react";

export function BlogQuickLinks({ blogTitle = "Dholera Smart City Update" }) {
  const whatsappMessage = encodeURIComponent(
    `Hello Naresh, I was reading your article "${blogTitle}" on Dholera Platform. I want more details on verified plots and the latest TP master plan.`
  );

  const links = [
    {
      category: "TP Map",
      title: "Download TP 1 – TP 6 Maps",
      href: "/tp-maps",
      icon: Map,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-500/10 border-orange-500/20",
      isExternal: false,
    },
    {
      category: "Dholera App",
      title: "Download Official Android APK",
      href: "/download",
      icon: Smartphone,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10 border-blue-500/20",
      isExternal: false,
    },
    {
      category: "One-to-One Conversation",
      title: "Chat on WhatsApp with Advisory Desk",
      href: `https://wa.me/917435808031?text=${whatsappMessage}`,
      icon: MessageSquare,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
      isExternal: true,
    },
    {
      category: "Direct Hotline",
      title: "Call / WhatsApp: +91 7435808031",
      href: "https://wa.me/917435808031",
      icon: Phone,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
      isExternal: true,
    },
    {
      category: "Official Website",
      title: "Visit Strategic Advisory & Contact Portal",
      href: "/contact",
      icon: Globe,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-500/10 border-orange-500/20",
      isExternal: false,
    },
  ];

  return (
    <section className="my-14 py-8 border-y-2 border-slate-200 dark:border-slate-800">
      {/* Noticeable Section Heading */}
      <div className="mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">
          Verified Investor Channels
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
          Investor Resources & Direct Contact
        </h2>
      </div>

      {/* Prominent H2/H3 Links with Noticeable Highlighting Arrows */}
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {links.map((item, idx) => {
          const Icon = item.icon;
          const content = (
            <div className="group flex items-center justify-between py-5 sm:py-6 transition-all duration-200 hover:px-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50">
              <div className="flex items-center gap-4 sm:gap-5 min-w-0 pr-4">
                <span
                  className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl ${item.bgColor} ${item.color} border group-hover:scale-105 transition-transform duration-200 shadow-sm`}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#FF7A00] transition-colors tracking-tight truncate">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Prominent Noticeable Arrow */}
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-[#FF7A00] group-hover:text-white transition-all duration-200 shadow-sm group-hover:shadow-md">
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>
          );

          return item.isExternal ? (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {content}
            </a>
          ) : (
            <Link key={idx} href={item.href} className="block">
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

