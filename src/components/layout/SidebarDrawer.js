"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  X, Home, Map, FileText, ShieldCheck, Grid, Plane, 
  Construction, Sparkles, Users, PhoneCall, 
  Languages, Sun, Moon, Smartphone, ChevronRight, Calculator
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import { SplitLogo } from "@/components/common/DynamicImages";

export function SidebarDrawer({ isOpen, onClose }) {
  const pathname = usePathname();
  const { lang, setLang, t, theme, toggleTheme } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { label: t("nav_home"), href: "/", icon: Home },
    { label: t("nav_tp_maps"), href: "/tp-maps", icon: Map },
    { label: t("nav_pdf"), href: "/pdf?trigger=true", icon: FileText },
    { label: "Our App", href: "/download", icon: Smartphone },
    { label: t("nav_portals"), href: "/portals", icon: ShieldCheck },
    { label: t("nav_projects"), href: "/projects", icon: Grid },
    { label: t("nav_airport"), href: "/airport", icon: Plane },
    { label: t("nav_infrastructure"), href: "/infrastructure", icon: Construction },
    { label: t("nav_updates"), href: "/blogs", icon: Sparkles },
    { label: "Clearance Engine", href: "/clearance-engine", icon: Calculator },
    { label: t("nav_about"), href: "/about-us", icon: Users },
    { label: t("nav_contact"), href: "/contact", icon: PhoneCall },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "gu", label: "ગુજરાતી" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-start">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <aside 
        className={cn(
          "relative z-10 flex h-full w-[310px] sm:w-[340px] flex-col border-r border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl shadow-2xl transition-transform duration-300 animate-in slide-in-from-left font-sans"
        )}
      >
        {/* Header - Matching Flutter SideMenu Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
              <SplitLogo height={38} isFull={false} />
            </Link>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Platform Portal Header Card */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/20 dark:bg-orange-950/30 dark:border-orange-500/30">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white font-black text-xs shadow-md shadow-orange-600/30">
              SIR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 dark:text-white truncate uppercase tracking-tight">
                Dholera Smart City
              </p>
              <p className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
                Independent Platform
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 no-scrollbar">
          <p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Navigation Menu
          </p>

          {navItems.map((item) => {
            const isActive = item.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(item.href.split('?')[0]);
            
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 group relative",
                  isActive
                    ? "bg-orange-500/10 text-orange-600 border border-orange-500/20 font-black shadow-sm"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-orange-600" : "text-slate-400 dark:text-slate-500")} />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <div className="h-2 w-2 rounded-full bg-orange-600 shadow-sm shadow-orange-600" />
                )}
              </Link>
            );
          })}

          {/* App Exclusive Banner Card */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 relative overflow-hidden shadow-xl">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Smartphone className="h-28 w-28 text-orange-500" />
            </div>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest">
                  App Exclusive
                </span>
              </div>
              <h4 className="text-xs font-black uppercase tracking-tight">
                Dholera Mobile App
              </h4>
              <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                Access exclusive GIS map layers, offline PDFs & instant push alerts.
              </p>
              <Link
                href="/download"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-orange-400 hover:text-orange-300 pt-1"
              >
                <span>Download App</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Actions - Theme & Language Switcher */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
          <div className="flex items-center justify-between gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider transition-all hover:border-orange-500"
            >
              {theme === 'light' ? <Sun className="h-4 w-4 text-orange-500" /> : <Moon className="h-4 w-4 text-amber-400" />}
              <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          {/* Language Selection */}
          <div className="flex items-center justify-between gap-1.5 pt-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
              Language:
            </span>
            <div className="flex gap-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all",
                    lang === l.code
                      ? "bg-orange-600 border-orange-600 text-white"
                      : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300"
                  )}
                >
                  {l.code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
