"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Languages, Sun, Moon, AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { SplitLogo } from "@/components/common/DynamicImages";
import { useLanguage } from "@/providers/LanguageProvider";
import { SidebarDrawer } from "@/components/layout/SidebarDrawer";

export function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t, theme, toggleTheme } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);

  const navItems = [
    { label: t('nav_home') || 'Home', href: '/' },
    { label: t('nav_blogs') || 'Blogs', href: '/blogs' },
    { label: t('nav_tp_maps') || 'Maps', href: '/tp-maps' },
    { label: t('nav_pdf') || 'Documents', href: '/pdf?trigger=true' },
    { label: t('nav_portals') || 'Portals', href: '/portals' },
    { label: t('nav_projects') || 'Projects', href: '/projects' },
    { label: 'Investment Guide', href: '/investment-guide' },
    { label: t('nav_airport') || 'Airport', href: '/airport' },
    { label: t('nav_infrastructure') || 'Infrastructure', href: '/infrastructure' },
    { label: t('nav_about') || 'About Us', href: '/about-us' },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "gu", label: "ગુજરાતી" },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleLang = () => setIsLangOpen(!isLangOpen);

  const isItemActive = (href) => {
    if (href === "/") return pathname === "/";
    const basePath = href.split('?')[0];
    return pathname.startsWith(basePath);
  };

  return (
    <>
      <header className="sticky top-0 z-[150] w-full border-b border-slate-100 bg-white/90 dark:bg-slate-950/90 dark:border-slate-800 backdrop-blur-md transition-colors">
        <div className="container mx-auto flex min-h-[5rem] py-2.5 w-full min-w-0 items-center justify-between gap-3 px-2 sm:px-4 md:px-6 lg:px-8">
          {/* Logo & Side Menu Drawer Button (Untouched) */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={toggleSidebar}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:text-orange-600 transition-all shadow-sm group"
              title="Open Side Menu"
              aria-label="Side menu"
            >
              <AlignLeft className="h-5 w-5 transition-transform group-hover:scale-110" />
            </button>

            <Link href="/" className="flex min-h-11 shrink-0 items-center">
              <div className="hidden md:block">
                <SplitLogo height={50} isFull />
              </div>
              <div className="block md:hidden -ml-1">
                <SplitLogo height={32} isFull />
              </div>
            </Link>
            
            <div className="hidden min-w-0 items-center overflow-hidden border-l-2 border-slate-200 pl-2 ml-1 h-5 dark:border-slate-800 sm:flex md:hidden">
              <span className="text-[9px] font-black uppercase tracking-[0.1em] text-[#FF7A00] truncate max-w-[90px] xs:max-w-[120px]">
                {navItems.find(item => isItemActive(item.href))?.label || "DHOLERA"}
              </span>
            </div>
          </div>

          {/* Desktop Nav: 2 Rows & 5 Columns of compact buttons + controls */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
            <nav className="grid grid-cols-5 gap-1 lg:gap-1.5 font-display">
              {navItems.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center justify-center px-2 py-1 lg:px-2.5 lg:py-1 rounded-md text-[8.5px] lg:text-[9.5px] xl:text-[10px] font-black uppercase tracking-wider text-center transition-all whitespace-nowrap border",
                      active
                        ? "bg-orange-600 text-white border-orange-600 shadow-sm shadow-orange-600/25"
                        : "bg-slate-100/80 hover:bg-orange-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-slate-800/80 hover:border-orange-500/50 hover:text-orange-600"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="h-9 w-px bg-slate-200 dark:bg-slate-800" />

            {/* Utility Controls */}
            <div className="flex items-center gap-1.5 lg:gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center h-9 w-9 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-orange-600 transition-all group shadow-sm shrink-0"
                title="Toggle Theme"
              >
                {theme === 'light' ? <Sun className="h-4 w-4 text-orange-500" /> : <Moon className="h-4 w-4 text-amber-400" />}
              </button>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 text-orange-600 font-black transition-all hover:bg-orange-100 shrink-0"
                >
                  <Languages className="h-3.5 w-3.5" />
                  <span className="text-[10px] uppercase">{lang}</span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform", isLangOpen && "rotate-180")} />
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-3 w-36 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 shadow-2xl animate-in fade-in zoom-in-95 z-[200]">
                    {languages.map((l) => {
                      let currentPath = pathname;
                      if (currentPath.startsWith('/hi/') || currentPath === '/hi') {
                        currentPath = currentPath.replace(/^\/hi/, '') || '/';
                      } else if (currentPath.startsWith('/gu/') || currentPath === '/gu') {
                        currentPath = currentPath.replace(/^\/gu/, '') || '/';
                      }
                      const localizedPath = l.code === 'en' ? currentPath : `/${l.code}${currentPath === '/' ? '' : currentPath}`;

                      return (
                        <Link
                          key={l.code}
                          href={localizedPath}
                          onClick={() => {
                            setLang(l.code);
                            setIsLangOpen(false);
                          }}
                          className={cn(
                            "block w-full rounded-lg px-3 py-1.5 text-left text-[10px] font-black uppercase tracking-widest transition-colors",
                            lang === l.code ? "bg-orange-600 text-white" : "text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600"
                          )}
                        >
                          {l.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Contact Button */}
              <Link
                href="/contact"
                className="hidden xl:inline-flex rounded-full bg-orange-600 hover:bg-orange-500 px-4 py-2 text-white text-[10px] font-black uppercase tracking-wider transition-all shadow-md shadow-orange-600/10 shrink-0"
              >
                {t('nav_contact')}
              </Link>
            </div>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex shrink-0 items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 transition-all"
              aria-label="Toggle color theme"
            >
              {theme === 'light' ? <Sun className="h-4 w-4 text-orange-500" /> : <Moon className="h-4 w-4 text-amber-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* Side Menu Drawer Component (Matching Flutter SideMenu) */}
      <SidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}
