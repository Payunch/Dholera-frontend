import Link from "next/link";
import { Globe, Radio, Camera, PlayCircle, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50 text-slate-900">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold tracking-tight text-orange-600">
              dholera platform
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              The official intelligence platform for Dholera Smart City. We provide verified data, planning maps, and investment growth evidence for India's first operational smart city.
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
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-500">Platform</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
              <li><Link href="/clearance-engine" className="hover:text-orange-600 transition-colors">Clearance Engine</Link></li>
              <li><Link href="/updates" className="hover:text-orange-600 transition-colors">Growth Updates</Link></li>
              <li><Link href="/professional/dashboard" className="hover:text-orange-600 transition-colors">Professional Portal</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-500">Legal</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><Link href="/privacy-policy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-orange-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-orange-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-500">Get in Touch</h4>
            <div className="flex items-start space-x-3 text-sm font-semibold text-slate-600">
              <Mail className="h-5 w-5 text-orange-600 shrink-0" />
              <span>{siteConfig.contact.email}</span>
            </div>
            <div className="flex items-start space-x-3 text-sm font-semibold text-slate-600">
              <Phone className="h-5 w-5 text-orange-600 shrink-0" />
              <span>{siteConfig.contact.phoneDisplay}</span>
            </div>
            <div className="flex items-start space-x-3 text-sm font-semibold text-slate-600">
              <MapPin className="h-5 w-5 text-orange-600 shrink-0" />
              <span>Dholera Special Investment Region, Gujarat, India</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
          (c) {new Date().getFullYear()} Dholera Platform. All rights reserved. Built for India's Growth.
        </div>
      </div>
    </footer>
  );
}

