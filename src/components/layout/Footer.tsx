"use client";

import Link from"next/link";
import { Globe, Radio, Camera, PlayCircle, Mail, Phone, User } from"lucide-react";
import { siteConfig } from"@/config/site";
import { useLanguage } from"@/providers/LanguageProvider";

const ownerDetails = {
 brandName:"dholera platform",
 operatorName:"Naresh Gohel",
 email:"gohelnaresh7707@gmail.com",
 phoneDisplay:"+91 7435808031",
};

declare global {
 interface Window {
 dispatchEvent: (event: Event) => boolean;
 }
}

const OPEN_CONSENT_EVENT ="open-consent-banner";

export function Footer() {
 const { t } = useLanguage();
 const handleCookieSettings = () => {
 if (typeof window ==="undefined") {
 return;
 }

 window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
 };

 return (
 <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white pb-24 md:pb-0 transition-colors">
 <div className="container mx-auto px-4 py-12 md:px-8">
 <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
 {/* Brand & Mission */}
 <div className="space-y-4">
 <h3 className="font-display text-2xl font-extrabold tracking-tight text-orange-600">
 {ownerDetails.brandName}
 </h3>
 <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
 {t('platform_desc')}
 </p>
 <div className="flex space-x-4">
 <Link href={siteConfig.links.facebook} className="text-slate-400 hover:text-orange-600 transition-colors">
 <Globe className="h-5 w-5" />
 </Link>
 <Link href={siteConfig.links.twitter} className="text-slate-400 hover:text-orange-600 transition-colors">
 <Radio className="h-5 w-5" />
 </Link>
 <Link href={siteConfig.links.instagram} className="text-slate-400 hover:text-orange-600 transition-colors">
 <Camera className="h-5 w-5" />
 </Link>
 <Link href={siteConfig.links.youtube} className="text-slate-400 hover:text-orange-600 transition-colors">
 <PlayCircle className="h-5 w-5" />
 </Link>
 </div>
 </div>

 {/* Quick Links */}
 <div>
 <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300">{t('platform')}</h4>
 <ul className="space-y-4 text-sm font-semibold">
 <li><Link href="/" className="hover:text-orange-600 transition-colors">{t('nav_home')}</Link></li>
 <li><Link href="/clearance-engine" className="hover:text-orange-600 transition-colors">{t('clearance_engine')}</Link></li>
 <li><Link href="/blogs" className="hover:text-orange-600 transition-colors">{t('growth_updates')}</Link></li>
 <li><Link href="/pdf" className="hover:text-orange-600 transition-colors">{t('nav_pdf')}</Link></li>
 </ul>
 </div>

 {/* Legal */}
 <div>
 <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300">{t('legal')}</h4>
 <ul className="space-y-4 text-sm font-semibold">
 <li><Link href="/privacy-policy" className="hover:text-orange-600 transition-colors">{t('privacy_policy')}</Link></li>
 <li><Link href="/terms-and-conditions" className="hover:text-orange-600 transition-colors">{t('terms_of_service')}</Link></li>
 <li><Link href="/contact" className="hover:text-orange-600 transition-colors">{t('contact')}</Link></li>
 <li>
 <button type="button" onClick={handleCookieSettings} className="hover:text-orange-600 transition-colors">
 Cookie settings
 </button>
 </li>
 </ul>
 </div>

 {/* Contact Info */}
 <div className="space-y-4">
 <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300">{t('footer_owner')}</h4>
 <div className="flex items-start space-x-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
 <User className="h-5 w-5 text-orange-600 shrink-0" />
 <span>{ownerDetails.operatorName}</span>
 </div>
 <div className="flex items-start space-x-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
 <Mail className="h-5 w-5 text-orange-600 shrink-0" />
 <span>{ownerDetails.email}</span>
 </div>
 <div className="flex items-start space-x-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
 <Phone className="h-5 w-5 text-orange-600 shrink-0" />
 <span>{ownerDetails.phoneDisplay}</span>
 </div>
 </div>
 </div>

 <div className="mt-12 border-t pt-8 space-y-4 text-center text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
 <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-300 normal-case tracking-normal max-w-4xl mx-auto font-medium leading-relaxed">
 {t('disclaimer')}
 </p>
 <p>
 {t('rights_reserved')}
 </p>
 </div>
 </div>
 </footer>
 );
}

