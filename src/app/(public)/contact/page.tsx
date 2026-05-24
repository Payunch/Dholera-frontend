import { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Dholera Platform | Expert Investment Consultation",
  description: "Get in touch with our Dholera Smart City experts. Request TP maps, investment brochures, or book a site visit. Your gateway to DSIR growth.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Column: Info */}
          <div className="space-y-12">
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-orange-600">
                Connect with Intelligence
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl uppercase">
                Contact our <span className="text-orange-600 italic">Experts</span>
              </h1>
              <p className="max-w-xl text-lg font-medium text-slate-500">
                Ready to secure your stake in India&apos;s most ambitious smart city project? 
                Our team provides verified data and on-ground support for all your DSIR queries.
              </p>
            </header>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg transition-transform group-hover:scale-110">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Direct Intelligence</h4>
                  <p className="text-xl font-black text-slate-900 leading-none">info@dholeraplatform.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg transition-transform group-hover:scale-110">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Consultation Hotline</h4>
                  <p className="text-xl font-black text-slate-900 leading-none">+91 12345 67890</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg transition-transform group-hover:scale-110">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Regional HQ</h4>
                  <p className="text-xl font-black text-slate-900 leading-none">DSIR, Gujarat, India</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
               <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-black">
                     <Globe className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">Regional Node</h3>
               </div>
               <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
                  &quot;Your inquiry will be routed to the nearest regional intelligence officer specializing in your zone of interest (TP1 - TP6).&quot;
               </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
