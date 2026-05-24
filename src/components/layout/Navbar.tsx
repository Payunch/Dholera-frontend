"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Languages, ShieldCheck, Home, FileText, LayoutDashboard, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Clearance", href: "/clearance-engine", icon: Calculator },
  { label: "Blogs", href: "/updates", icon: FileText },
  { label: "Pro Portal", href: "/professional/dashboard", icon: LayoutDashboard },
];

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "gu", label: "ગુજરાતી" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const [currentLang, setCurrentLang] = React.useState("en");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLang = () => setIsLangOpen(!isLangOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-extrabold tracking-tight text-orange-600 sm:text-2xl">
              dholera platform
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-bold uppercase tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-orange-600",
                pathname === item.href ? "text-orange-600" : "text-slate-600"
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-slate-600 hover:text-orange-600 transition-colors"
            >
              <Languages className="h-5 w-5" />
              <ChevronDown className="h-4 w-4" />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-md border bg-white shadow-lg py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={cn(
                      "block w-full px-4 py-2 text-left text-sm font-medium hover:bg-slate-50",
                      currentLang === lang.code ? "text-orange-600" : "text-slate-700"
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="rounded-full bg-orange-600 px-6 py-2 text-white transition-transform hover:scale-105 active:scale-95"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-orange-600" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 text-lg font-bold transition-colors",
                pathname === item.href ? "text-orange-600" : "text-slate-600"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Language</span>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={cn(
                      "px-3 py-1 rounded border text-xs font-bold",
                      currentLang === lang.code ? "border-orange-600 text-orange-600" : "border-slate-200 text-slate-500"
                    )}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full rounded-lg bg-orange-600 py-3 text-center font-bold text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
