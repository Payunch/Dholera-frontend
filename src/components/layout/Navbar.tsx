"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Languages, Home, FileText, Calculator, ShieldCheck, Map, Plane, Construction, Grid, Landmark, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { SplitLogo } from "@/components/common/DynamicImages";
import { useLanguage } from "@/providers/LanguageProvider";

export function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const [isHubOpen, setIsHubOpen] = React.useState(false);

  const navItems = [
    { label: t('nav_home'), href: "/", icon: Home },
    { label: "TP Maps", href: "/tp-maps", icon: Map },
    { label: "Projects", href: "/projects", icon: Grid },
    { label: "Updates", href: "/updates", icon: FileText },
    { label: "Vault", href: "/my-vault", icon: ShieldCheck },
  ];

  const hubItems = [
    { label: "Smart City", href: "/smart-city", icon: Landmark },
    { label: "Plots for Sale", href: "/plots-for-sale", icon: Grid },
    { label: "Investment Guide", href: "/investment-guide", icon: Calculator },
    { label: "Travel & Lifestyle", href: "/travel-lifestyle", icon: Plane },
    { label: "Government Schemes", href: "/government-schemes", icon: ShieldCheck },
    { label: "About DSIR", href: "/about", icon: Users },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "gu", label: "ગુજરાતી" },
  ] as const;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLang = () => setIsLangOpen(!isLangOpen);
  const toggleHub = () => setIsHubOpen(!isHubOpen);

  return (
    <header className="sticky top-0 z-[150] w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <SplitLogo height={35} isFull />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center space-x-6 text-[10px] font-black uppercase tracking-wider font-display">
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

          {/* Hub Dropdown */}
          <div className="relative group">
            <button
              onClick={toggleHub}
              onMouseEnter={() => setIsHubOpen(true)}
              className={cn(
                "flex items-center gap-1.5 transition-colors hover:text-orange-600",
                hubItems.some(h => pathname === h.href) || isHubOpen ? "text-orange-600" : "text-slate-500"
              )}
            >
              Dholera Hub <ChevronDown className={cn("h-3 w-3 transition-transform", isHubOpen && "rotate-180")} />
            </button>
            {isHubOpen && (
              <div 
                onMouseLeave={() => setIsHubOpen(false)}
                className="absolute left-0 mt-4 w-64 rounded-2xl border border-slate-100 bg-white p-3 shadow-2xl animate-in fade-in zoom-in-95"
              >
                <div className="grid gap-1">
                  {hubItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsHubOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-[9px] font-black uppercase tracking-widest transition-all",
                        pathname === item.href ? "bg-orange-600 text-white" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

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

        {/* Mobile/Tablet Nav Toggle */}
        <button className="xl:hidden text-slate-900" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-20 z-[140] bg-white overflow-y-auto font-display">
          <div className="container mx-auto px-4 py-8 space-y-10">
            {/* Primary Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                    pathname === item.href ? "bg-orange-600 border-orange-600 text-white" : "bg-slate-50 border-slate-100 text-slate-600"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Hub Links */}
            <div className="space-y-4">
               <span className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] px-2">Dholera Hub Explorer</span>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hubItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                        pathname === item.href ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-100 text-slate-500"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                    </Link>
                  ))}
               </div>
            </div>

            <div className="pt-10 border-t border-slate-100 space-y-8">
              <div className="space-y-4">
                <span className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] px-2">Language Interface</span>
                <div className="grid grid-cols-3 gap-3">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsMenuOpen(false);
                      }}
                      className={cn(
                        "rounded-xl py-4 text-[10px] font-black uppercase tracking-widest border transition-all",
                        lang === l.code ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20" : "border-slate-150 text-slate-500 bg-slate-50"
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
                className="flex w-full h-16 items-center justify-center rounded-2xl bg-slate-900 text-sm font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-orange-600 shadow-xl shadow-slate-950/10"
              >
                {t('nav_contact')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
