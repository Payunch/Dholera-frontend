"use client";

import Link from "next/link";
import { Globe, Radio, Camera, PlayCircle, Mail, Phone, User } from "lucide-react";
import { siteConfig } from "@/config/site";

const ownerDetails = {
  brandName: "dholera platform",
  operatorName: "Naresh Gohel",
  email: "gohelnaresh7707@gmail.com",
  phoneDisplay: "+91 7435808031",
};

declare global {
  interface Window {
    dispatchEvent: (event: Event) => boolean;
  }
}

const OPEN_CONSENT_EVENT = "open-consent-banner";

export function Footer() {
  const handleCookieSettings = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
  };

  return (
    <footer className="w-full border-t bg-slate-50 text-slate-900">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-orange-600">
              {ownerDetails.brandName}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              The independent intelligence platform for Dholera Smart City. We provide verified data, planning maps, and investment growth evidence for India&apos;s first operational smart city.
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
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-slate-500">Platform</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
              <li><Link href="/clearance-engine" className="hover:text-orange-600 transition-colors">Clearance Engine</Link></li>
              <li><Link href="/updates" className="hover:text-orange-600 transition-colors">Growth Updates</Link></li>
              <li><Link href="/my-vault" className="hover:text-orange-600 transition-colors">My Vault</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-slate-500">Legal</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><Link href="/privacy-policy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-orange-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-orange-600 transition-colors">Contact</Link></li>
              <li>
                <button type="button" onClick={handleCookieSettings} className="hover:text-orange-600 transition-colors">
                  Cookie settings
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-slate-500">Owner Details</h4>
            <div className="flex items-start space-x-3 text-sm font-semibold text-slate-600">
              <User className="h-5 w-5 text-orange-600 shrink-0" />
              <span>{ownerDetails.operatorName}</span>
            </div>
            <div className="flex items-start space-x-3 text-sm font-semibold text-slate-600">
              <Mail className="h-5 w-5 text-orange-600 shrink-0" />
              <span>{ownerDetails.email}</span>
            </div>
            <div className="flex items-start space-x-3 text-sm font-semibold text-slate-600">
              <Phone className="h-5 w-5 text-orange-600 shrink-0" />
              <span>{ownerDetails.phoneDisplay}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 space-y-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
          <p className="text-[10px] sm:text-xs text-slate-500 normal-case tracking-normal max-w-4xl mx-auto font-medium leading-relaxed">
            Disclaimer: This platform is a private, independent real estate, planning, and mapping information service. It is not affiliated with, maintained by, authorized by, or officially connected to the Government of Gujarat, the Dholera Special Investment Region Development Authority (DSIRDA), or any official state/central housing board.
          </p>
          <p>
            &copy; 2026 {ownerDetails.brandName.toUpperCase()}. All rights reserved. Built for India&apos;s Growth.
          </p>
        </div>
      </div>
    </footer>
  );
}

