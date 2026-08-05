import Image from "next/image";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin, Globe, ShieldAlert } from "lucide-react";
import { Translate } from "@/components/i18n/Translate";

export const metadata = {
  title: "Contact Dholera Platform | Expert Investment Consultation",
  description: "Get in touch with our Dholera Smart City experts. Request TP maps, investment brochures, or book a site visit. Your gateway to DSIR growth.",
};

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-slate-950 pb-32 min-h-screen w-full overflow-x-hidden transition-colors">

      {/* Header Block - Refactored for proper sizing */}
      <section className="relative bg-white dark:bg-[#0B132B] pt-32 pb-16 md:pb-24 border-b border-slate-800 overflow-hidden mb-16 dark:bg-slate-900">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <Image
            src="/images/futuristic_dholera.png"
            alt="Dholera Intelligence Network"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6 pt-20">
          <div className="inline-flex items-center rounded-full bg-[#FF7A00]/10 border border-orange-500/30 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00]">
            <Translate id="verified_data" />
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[0.85]">
            <Translate id="talk_to_owner_title" />
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-widest">
            <Translate id="talk_to_owner_desc" />
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column Grid */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="flex items-start gap-6 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 transition-all hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl dark:hover:shadow-black/100 hover:border-[#FF7A00] group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700 transition-all group-hover:bg-[#FF7A00] group-hover:text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Email Engineering</h4>
                  <p className="font-display text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight break-all">
                    <a href="mailto:gohelnaresh7707@gmail.com" className="hover:text-[#FF7A00] transition-colors">gohelnaresh7707@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 transition-all hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl dark:hover:shadow-black/100 hover:border-[#FF7A00] group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700 transition-all group-hover:bg-[#FF7A00] group-hover:text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Direct Hotline</h4>
                  <p className="font-display text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    <a href="https://wa.me/917435808031" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF7A00] transition-colors">+91 74358 08031</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 transition-all hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl dark:hover:shadow-black/100 hover:border-[#FF7A00] group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700 transition-all group-hover:bg-[#FF7A00] group-hover:text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Global HQ</h4>
                  <p className="font-display text-2xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">DSIR, Gujarat, India</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#FF7A00] opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-400">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white"><Translate id="priority_conn" /></h3>
                </div>
                <p className="text-lg font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-[#FF7A00] pl-6">
                  <Translate id="call_back_msg" />
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-orange-500/30 bg-orange-500/5 p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2 text-orange-600 dark:text-orange-400">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <h4 className="font-display text-sm font-bold uppercase tracking-wider">Independent Advisory Notice</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                dholeraplatform.com is an independent real estate advisory platform operated by Naresh Gohel. It is <strong>NOT</strong> an official website of, affiliated with, endorsed by, or connected to DSIR, DICDL, DSIRDA, or any government body.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
