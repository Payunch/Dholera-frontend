import { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Dholera Platform | Expert Investment Consultation",
  description: "Get in touch with our Dholera Smart City experts. Request TP maps, investment brochures, or book a site visit. Your gateway to DSIR growth.",
};

export default function ContactPage() {
  return (
    <div className="bg-white pt-24 pb-32 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Column: Info */}
          <div className="space-y-12">
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-orange-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 border border-orange-200">
                Connect with Intelligence
              </div>
              <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 md:text-7xl uppercase leading-tight">
                Contact our <span className="text-orange-600 italic">Experts</span>
              </h1>
              <p className="max-w-xl text-lg font-medium text-slate-500 leading-relaxed">
                Ready to secure your stake in India&apos;s most ambitious smart city project? 
                Our team provides verified data and on-ground support for all your DSIR queries.
              </p>
            </header>

            <div className="space-y-6">
              <div className="flex items-start gap-6 p-6 rounded-3xl border border-slate-100 bg-slate-50/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md border border-slate-100 transition-all group-hover:bg-orange-600 group-hover:text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Direct Intelligence</h4>
                  <p className="font-display text-xl font-black text-slate-900 leading-none">gohelnaresh7707@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 rounded-3xl border border-slate-100 bg-slate-50/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md border border-slate-100 transition-all group-hover:bg-orange-600 group-hover:text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Consultation Hotline</h4>
                  <p className="font-display text-xl font-black text-slate-900 leading-none">+91 7435808031</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 rounded-3xl border border-slate-100 bg-slate-50/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md border border-slate-100 transition-all group-hover:bg-orange-600 group-hover:text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Regional HQ</h4>
                  <p className="font-display text-xl font-black text-slate-900 leading-none">DSIR, Gujarat, India</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-5 transition-opacity" />
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-orange-600/20 flex items-center justify-center text-orange-400">
                       <Globe className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-black uppercase tracking-tight text-white">Regional Intelligence Node</h3>
                 </div>
                 <p className="text-sm font-medium text-slate-400 leading-relaxed italic">
                    &quot;Your inquiry will be routed to the nearest regional intelligence officer specializing in your zone of interest (TP1 - TP6).&quot;
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
