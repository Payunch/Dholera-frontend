import { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Dholera Platform | Expert Investment Consultation",
  description: "Get in touch with our Dholera Smart City experts. Request TP maps, investment brochures, or book a site visit. Your gateway to DSIR growth.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#f8f6f1] bg-grid-sand pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Column: Info */}
          <div className="space-y-12">
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-orange-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 border border-orange-500/20">
                Connect with Intelligence
              </div>
              <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 md:text-6xl uppercase leading-tight">
                Contact our <span className="text-orange-600 italic">Experts</span>
              </h1>
              <p className="max-w-xl text-lg font-medium text-slate-600 leading-relaxed">
                Ready to secure your stake in India&apos;s most ambitious smart city project? 
                Our team provides verified data and on-ground support for all your DSIR queries.
              </p>
            </header>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 transition-all group-hover:-translate-y-1 group-hover:shadow-orange-600/10">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Direct Intelligence</h4>
                  <p className="font-display text-xl font-black text-slate-900 leading-none">info@dholeraplatform.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 transition-all group-hover:-translate-y-1 group-hover:shadow-orange-600/10">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Consultation Hotline</h4>
                  <p className="font-display text-xl font-black text-slate-900 leading-none">+91 12345 67890</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 transition-all group-hover:-translate-y-1 group-hover:shadow-orange-600/10">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Regional HQ</h4>
                  <p className="font-display text-xl font-black text-slate-900 leading-none">DSIR, Gujarat, India</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
               <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 font-black">
                       <Globe className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-black uppercase tracking-tight text-slate-900">Regional Node</h3>
                 </div>
                 <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
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
