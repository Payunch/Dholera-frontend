"use client";

import Link from"next/link";
import { Globe, Radio, Camera, PlayCircle, Mail, Phone, User, Smartphone } from"lucide-react";
import { siteConfig } from"@/config/site";
import { useLanguage } from"@/providers/LanguageProvider";

const ownerDetails = {
 brandName:"dholera platform",
 operatorName:"Naresh Gohel",
 email:"gohelnaresh7707@gmail.com",
 phoneDisplay:"+91 7435808031",
};

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
    <footer className="w-full border-t border-slate-800 dark:border-slate-200 bg-slate-950 dark:bg-white text-slate-100 dark:text-slate-900 pb-24 md:pb-0 transition-colors">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-orange-600">
              {ownerDetails.brandName}
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 dark:text-slate-600">
              {t('platform_desc')}
            </p>
            <div className="flex space-x-4">
              <Link href={siteConfig.links.facebook} className="text-slate-400 hover:text-[#FF7A00] transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href={siteConfig.links.twitter} className="text-slate-400 hover:text-[#FF7A00] transition-colors">
                <Radio className="h-5 w-5" />
              </Link>
              <Link href={siteConfig.links.instagram} className="text-slate-400 hover:text-[#FF7A00] transition-colors">
                <Camera className="h-5 w-5" />
              </Link>
              <Link href={siteConfig.links.youtube} className="text-slate-400 hover:text-[#FF7A00] transition-colors">
                <PlayCircle className="h-5 w-5" />
              </Link>
            </div>
            <div className="pt-4">
              <Link href="/download" className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                <Smartphone className="h-4 w-4" />
                {t('download_app') || 'Download App'}
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{t('platform')}</h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-300 dark:text-slate-600">
              <li><Link href="/" className="hover:text-[#FF7A00] transition-all duration-300">{t('nav_home')}</Link></li>
              <li><Link href="/clearance-engine" className="hover:text-[#FF7A00] transition-all duration-300">{t('clearance_engine')}</Link></li>
              <li><Link href="/blogs" className="hover:text-[#FF7A00] transition-all duration-300">{t('growth_updates')}</Link></li>
              <li><Link href="/pdf?trigger=true" className="hover:text-[#FF7A00] transition-all duration-300">{t('nav_pdf')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{t('legal')}</h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-300 dark:text-slate-600">
              <li><Link href="/privacy-policy" className="hover:text-[#FF7A00] transition-all duration-300">{t('privacy_policy')}</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-[#FF7A00] transition-all duration-300">{t('terms_of_service')}</Link></li>
              <li><Link href="/contact" className="hover:text-[#FF7A00] transition-all duration-300">{t('contact')}</Link></li>
              <li>
                <button type="button" onClick={handleCookieSettings} className="hover:text-[#FF7A00] transition-all duration-300">
                  Cookie settings
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{t('footer_owner')}</h4>
            <div className="flex items-start space-x-3 text-sm font-semibold text-slate-300 dark:text-slate-600">
              <User className="h-5 w-5 text-orange-600 shrink-0" />
              <span>{ownerDetails.operatorName}</span>
            </div>
            <div className="flex items-start space-x-3 text-sm font-semibold text-slate-300 dark:text-slate-600">
              <Mail className="h-5 w-5 text-orange-600 shrink-0" />
              <span>{ownerDetails.email}</span>
            </div>
            <div className="flex items-start space-x-3 text-sm font-semibold text-slate-300 dark:text-slate-600">
              <Phone className="h-5 w-5 text-orange-600 shrink-0" />
              <span>{ownerDetails.phoneDisplay}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 dark:border-slate-200 pt-8 space-y-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 normal-case tracking-normal max-w-4xl mx-auto font-medium leading-relaxed">
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
