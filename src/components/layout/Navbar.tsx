"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Languages, Home, FileText, Calculator, ShieldCheck, Map, Plane, Construction, Grid, Landmark, Users, Sun, Moon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SplitLogo } from "@/components/common/DynamicImages";
import { useLanguage } from "@/providers/LanguageProvider";

export function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t, theme, toggleTheme } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);

  const navItems = [
    { label: t('nav_home'), href: "/", icon: Home },
    { label: t('nav_tp_maps'), href: "/tp-maps", icon: Map },
    { label: t('nav_pdf'), href: "/pdf", icon: ShieldCheck },
    { label: t('nav_portals'), href: "/portals", icon: Landmark },
    { label: t('nav_projects'), href: "/projects", icon: Grid },
    { label: t('nav_airport'), href: "/airport", icon: Plane },
    { label: t('nav_infrastructure'), href: "/infrastructure", icon: Construction },
    { label: t('nav_updates'), href: "/blogs", icon: FileText },
    { label: t('nav_about'), href: "/about-us", icon: Users },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "gu", label: "ગુજરાતી" },
  ] as const;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLang = () => setIsLangOpen(!isLangOpen);

  return (
    <header className="sticky top-0 z-[150] w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <SplitLogo height={35} isFull />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-[10px] font-black uppercase tracking-wider font-display">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-orange-600",
                pathname === item.href ? "text-orange-600" : "text-slate-500"
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="h-4 w-px bg-slate-100" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center h-10 w-10 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-orange-600 transition-all group"
            title="Toggle Theme"
          >
            {theme === 'light' ? <Sun className="h-4 w-4" /> : theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sparkles className="h-4 w-4 text-orange-600" />}
          </button>

          <div className="h-4 w-px bg-slate-100" />

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors"
            >
              <Languages className="h-4 w-4" />
              <span className="hidden lg:inline">{languages.find(l => l.code === lang)?.label}</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform", isLangOpen && "rotate-180")} />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-4 w-40 rounded-xl border border-slate-100 bg-white p-2 shadow-2xl animate-in fade-in zoom-in-95">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsLangOpen(false);
                    }}
                    className={cn(
                      "block w-full rounded-lg px-4 py-2 text-left text-[10px] font-black uppercase tracking-widest transition-colors",
                      lang === l.code ? "bg-orange-600 text-white" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="rounded-full bg-slate-900 px-6 py-2.5 text-white transition-all hover:bg-orange-600 shadow-lg shadow-slate-950/10"
          >
            {t('nav_contact')}
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-slate-900" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-8 space-y-8 animate-in slide-in-from-top-4 duration-300 font-display">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center gap-4 text-sm font-black uppercase tracking-widest transition-colors",
                  pathname === item.href ? "text-orange-600" : "text-slate-600"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-100 space-y-6">
            <div className="space-y-4">
              <span className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Select Language</span>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "rounded-lg py-3 text-[10px] font-black uppercase tracking-widest border transition-all",
                      lang === l.code ? "bg-orange-600 border-orange-600 text-white" : "border-slate-200 text-slate-500"
                    )}
                  >
                    {l.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full rounded-lg bg-slate-900 py-4 text-center text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600"
            >
              {t('nav_contact')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
