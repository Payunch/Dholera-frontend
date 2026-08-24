import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone, ArrowRight, ShieldCheck, MapPin, Building, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Invest in Dholera Smart City | Verified Plots & Maps",
  description: "Get verified Town Planning (TP) maps, plot pricing, and investment guidance for Dholera Special Investment Region.",
  alternates: {
    canonical: `${siteConfig.url}/landing`,
  },
};

export default function LandingPage() {
  const whatsappUrl = `https://wa.me/917435808031?text=${encodeURIComponent("Hi Naresh, I clicked your Google Ad and I am interested in Dholera plots. Please send me the price guide.")}`;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <Image
            src="/images/arialviewdholeraexpress.webp"
            alt="Dholera Smart City"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 to-slate-900/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-400 mb-6">
            <ShieldCheck className="h-4 w-4" /> Independent Infrastructure Intelligence
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-tight">
            Invest in India's First <br />
            <span className="text-orange-500">Smart City</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Skip the guesswork. Get verified Town Planning (TP) maps, exact plot pricing, and expert guidance for Dholera Special Investment Region.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 text-sm font-black uppercase tracking-widest shadow-lg transition-transform hover:-translate-y-1"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
            
            <a 
              href="tel:+917435808031"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-sm font-black uppercase tracking-widest shadow-lg transition-transform hover:-translate-y-1"
            >
              <Phone className="h-5 w-5" />
              Call now
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-center uppercase tracking-tight mb-12">
            Why Invest in Dholera SIR?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-black uppercase mb-3">Strategic Location</h3>
              <p className="text-sm text-slate-600">Connected via Expressway, Metro, and International Airport. Part of the Delhi-Mumbai Industrial Corridor.</p>
            </div>
            
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="font-black uppercase mb-3">Smart Infrastructure</h3>
              <p className="text-sm text-slate-600">Underground utilities, massive solar parks, and smart grid technology powering a green, zero-waste city.</p>
            </div>
            
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-black uppercase mb-3">Infrastructure Growth</h3>
              <p className="text-sm text-slate-600">Early investor advantage in residential, commercial, and industrial zones approved by DSIRDA.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
