import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone, ShieldCheck, MapPin, Building, CheckCircle2, Award, FileCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import LandingClientForm from "./LandingClientForm";

export const metadata = {
  title: "Dholera Smart City Plots | Official 2025-2026 TP1 & TP2 Rate Card & Maps",
  description: "Get verified Town Planning (TP) maps, indicative plot pricing trends, NA/NOC title due diligence, and direct investment advisory for Dholera SIR.",
  alternates: {
    canonical: `${siteConfig.url}/landing`,
  },
};

export default function LandingPage() {
  const whatsappUrl = `https://wa.me/917435808031?text=${encodeURIComponent(
    "Hi Naresh, I am interested in Dholera TP1/TP2 plots. Please send me the latest price guide and master plan."
  )}`;

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      {/* Hero Section with Dual Conversion Funnel (Direct Chat + Instant Lead Form) */}
      <section className="relative pt-12 pb-20 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <Image
            src="/images/arialviewdholeraexpress.webp"
            alt="Dholera Smart City Expressway and Master Planning"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-900" />
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition & Direct CTAs */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-400">
                <ShieldCheck className="h-4 w-4" /> DSIRDA Master Plan Verified
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                Verified Plots in <br />
                <span className="text-orange-500">Dholera Smart City</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Skip the broker noise. Access authentic Town Planning (TP 1 to TP 6) master maps, official zoning disclosures, and current land valuation trends directly.
              </p>

              {/* Key Trust Signals */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Clear NA / NOC Titles</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Near Tata Semiconductor Fab</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Expressway & Airport Access</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Immediate Registry & Possession</span>
                </div>
              </div>

              {/* Instant Call / WhatsApp Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 text-sm font-black uppercase tracking-wider shadow-xl shadow-green-500/20 transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>

                <a
                  href="tel:+917435808031"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-4 text-sm font-black uppercase tracking-wider transition-transform hover:-translate-y-0.5"
                >
                  <Phone className="h-5 w-5 text-orange-400" />
                  Call: +91 74358 08031
                </a>
              </div>
            </div>

            {/* Right Column: High Intent Lead Capture Squeeze Box */}
            <div className="lg:col-span-5 flex justify-center">
              <LandingClientForm />
            </div>
          </div>
        </div>
      </section>

      {/* Proof & Due Diligence Section */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-3">
              Why Institutional Investors Choose Dholera SIR
            </h2>
            <p className="text-sm text-slate-400">
              India&apos;s first greenfield industrial smart city powered by central DMIC corridor connectivity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-left space-y-4">
              <div className="w-12 h-12 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-2xl flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-black uppercase text-lg text-white">Express Connectivity</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                4-lane operational expressway connecting Ahmedabad directly in under 55 minutes, plus dedicated cargo metro corridor.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-left space-y-4">
              <div className="w-12 h-12 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-2xl flex items-center justify-center">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="font-black uppercase text-lg text-white">Semiconductor Hub</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Tata-PSMC ₹91,000 Crore mega fab facility in activation zone driving 50,000+ high-tech residential and logistics requirements.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-left space-y-4">
              <div className="w-12 h-12 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-2xl flex items-center justify-center">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="font-black uppercase text-lg text-white">Zoning Transparency</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                100% legal clarity. We verify Town Planning schemes, DSIRDA development control rules, and title clearances prior to transaction.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
