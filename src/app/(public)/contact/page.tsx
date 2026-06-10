import { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { Translate } from "@/components/i18n/Translate";

export const metadata: Metadata = {
  title: "Contact Dholera Platform | Expert Investment Consultation",
  description: "Get in touch with our Dholera Smart City experts. Request TP maps, investment brochures, or book a site visit. Your gateway to DSIR growth.",
};

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-slate-950 pb-32 min-h-screen w-full overflow-x-hidden transition-colors">
      
      {/* Header Block */}
      <section className="relative bg-white dark:bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden mb-16">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <Image 
            src="/images/futuristic_dholera.png" 
            alt="Dholera Intelligence Network" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
          <div className="inline-flex items-center rounded-full bg-orange-600/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 border border-orange-500/30">
            <Translate id="verified_data" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
            <Translate id="talk_to_owner_title" />
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-widest">
            <Translate id="talk_to_owner_desc" />
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Column: Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-start gap-6 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 transition-all hover:bg-white dark:hover:bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-slate-200/10 group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700 transition-all group-hover:bg-orange-600 group-hover:text-slate-900 dark:text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Email</h4>
                  <p className="font-display text-xl font-black text-slate-900 dark:text-white leading-none">gohelnaresh7707@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 transition-all hover:bg-white dark:hover:bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-slate-200/10 group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700 transition-all group-hover:bg-orange-600 group-hover:text-slate-900 dark:text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Hotline</h4>
                  <p className="font-display text-xl font-black text-slate-900 dark:text-white leading-none">+91 7435808031</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 transition-all hover:bg-white dark:hover:bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-slate-200/10 group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700 transition-all group-hover:bg-orange-600 group-hover:text-slate-900 dark:text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Location</h4>
                  <p className="font-display text-xl font-black text-slate-900 dark:text-white leading-none">DSIR, Gujarat, India</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-5 transition-opacity" />
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-orange-600/20 flex items-center justify-center text-orange-400">
                       <Globe className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white"><Translate id="priority_conn" /></h3>
                 </div>
                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic">
                    <Translate id="call_back_msg" />
                 </p>
               </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
