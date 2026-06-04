"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  User, 
  Phone, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Building, 
  ShieldCheck, 
  Calendar as CalendarIcon,
  ChevronRight,
  Target,
  Users,
  History,
  Mail
} from "lucide-react";
import { apiClient } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function AboutUsPage() {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Contact Form State
  const [contactForm, setContactForm] = React.useState({ name: "", phone: "", email: "" });
  const [contactStatus, setContactStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  // Site Visit Form State
  const [visitForm, setVisitForm] = React.useState({ name: "", phone: "", date: tomorrow });
  const [visitStatus, setVisitStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'contact' | 'visit') => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (type === 'contact') setContactForm({ ...contactForm, phone: val });
    else setVisitForm({ ...visitForm, phone: val });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || contactForm.phone.length !== 10) return;
    setContactStatus("loading");
    try {
      await apiClient.post("/leads", { ...contactForm, source: "About Us - Contact Card" });
      setContactStatus("success");
      setContactForm({ name: "", phone: "", email: "" });
    } catch (err) {
      setContactStatus("error");
    }
  };

  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitForm.name || visitForm.phone.length !== 10) return;
    const selectedDate = new Date(visitForm.date);
    if (selectedDate > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) {
       setVisitStatus("error");
       return;
    }
    setVisitStatus("loading");
    try {
      await apiClient.post("/leads", { 
        ...visitForm, 
        source: "About Us - Site Visit Card",
        notes: `Requested site visit for: ${visitForm.date}`
      });
      setVisitStatus("success");
      setVisitForm({ name: "", phone: "", date: tomorrow });
    } catch (err) {
      setVisitStatus("error");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-32 w-full overflow-x-hidden font-sans">
      
      {/* Header Section */}
      <section className="relative bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
          <Image src="/images/futuristic_dholera.png" alt="Dholera Vision" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B132B]/70" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
          <div className="inline-flex items-center rounded-full bg-orange-600 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-white">
             Intelligence Network
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-8xl font-black tracking-tight text-white uppercase leading-none">
            About <span className="text-orange-600 italic">Us</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-lg font-medium text-slate-300 leading-relaxed uppercase tracking-widest">
            The definitive digital bridge to India&apos;s first platinum-rated smart city.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 mt-24">
        
        {/* About Us Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {[
            { title: "Verified Data", desc: "Real-time TP maps and land records cross-checked with DSIRDA.", icon: ShieldCheck, img: "/images/airportVision.webp" },
            { title: "Expert Support", desc: "Connecting you with certified developers and legal advisors.", icon: Users, img: "/images/arialviewdholeraexpress.webp" },
            { title: "Strategic ROI", desc: "Data-driven insights to maximize your land appreciation.", icon: Target, img: "/images/expressHighway.webp" },
            { title: "Trust Record", desc: "Over 5 years of tracking Dholera's infrastructure milestones.", icon: History, img: "/images/dholerasirGujrat.webp" },
          ].map((item, i) => (
            <div key={i} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
               <div className="relative h-48 w-full">
                  <Image src={item.img} alt={item.title} fill className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-6 left-6 h-12 w-12 rounded-xl bg-white flex items-center justify-center text-orange-600 shadow-lg">
                     <item.icon className="h-6 w-6" />
                  </div>
               </div>
               <div className="p-8 space-y-3">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-orange-600 transition-colors">{item.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed uppercase tracking-wider">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>

        {/* Founder Profile Section */}
        <div className="relative bg-slate-900 rounded-[3rem] p-10 md:p-14 border border-slate-800 shadow-xl mb-32 flex flex-col lg:flex-row items-center gap-12 group hover:shadow-2xl transition-all duration-500 overflow-hidden">
           
           {/* Background Image (ng1.png) */}
           <div className="absolute inset-0 z-0 opacity-100 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none mix-blend-overlay">
              <Image 
                src="/images/ng1.png" 
                alt="Naresh Gohel Dholera Site" 
                fill 
                className="object-cover" 
              />
           </div>

           {/* Founder Image (ng.png) */}
           <div className="relative z-10 w-full lg:w-1/3 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl group-hover:-translate-y-2 transition-transform duration-500 border border-white/10">
              <Image 
                src="/images/ng.png" 
                alt="Naresh Gohel - Founder" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
              <div className="absolute bottom-6 left-6">
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight">Naresh Gohel</h3>
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">Founder & Director</p>
              </div>
           </div>

           {/* Content */}
           <div className="relative z-10 flex-1 space-y-8">
              <div className="inline-flex items-center rounded-full bg-orange-600/20 border border-orange-500/30 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-orange-400">
                 Visionary Leadership
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white uppercase leading-[1.1] tracking-tight group-hover:text-[#FF7A00] transition-colors duration-300">
                 Dholera <span className="italic text-[#FF7A00]">Platform</span>
              </h2>
              <div className="relative">
                 {/* Quote Mark Decoration */}
                 <div className="absolute -top-6 -left-6 text-8xl font-serif text-slate-700 opacity-30 z-0">"</div>
                 <p className="relative z-10 text-lg md:text-xl text-slate-300 font-medium leading-relaxed italic border-l-4 border-[#FF7A00] pl-6">
                    Leveraging comprehensive GIS planning data and deep structural insights into the DSIR master plan, 
                    Naresh Gohel empowers institutional and private investors to navigate Dholera’s land market with 
                    absolute clarity, data-backed transparency, and zero ambiguity.
                 </p>
              </div>
           </div>

        </div>

        {/* Action Cards (Contact + Site Visit) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          
          {/* Contact Card */}
          <div className="bg-white rounded-[3rem] p-10 md:p-14 border border-slate-100 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 bg-orange-600/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-10">
               <div className="h-14 w-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                  <Mail className="h-7 w-7" />
               </div>
               <div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Direct Inquiry</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Response within 24 Hours</p>
               </div>
            </div>

            {contactStatus === 'success' ? (
              <div className="py-20 text-center space-y-6">
                 <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                 <h3 className="text-xl font-black text-slate-900 uppercase">Message Dispatched!</h3>
                 <button onClick={() => setContactStatus('idle')} className="text-[10px] font-black uppercase tracking-widest text-orange-600">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <input 
                  type="text" 
                  placeholder="FULL NAME" 
                  required 
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest placeholder-slate-400 text-slate-900 outline-none focus:border-orange-600 focus:bg-white transition-all"
                />
                <input 
                  type="tel" 
                  placeholder="MOBILE NUMBER" 
                  required 
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={contactForm.phone}
                  onChange={(e) => handlePhoneChange(e, 'contact')}
                  className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest placeholder-slate-400 text-slate-900 outline-none focus:border-orange-600 focus:bg-white transition-all"
                />
                <button 
                  type="submit" 
                  disabled={contactStatus === 'loading'}
                  className="w-full h-16 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl active:scale-95 flex items-center justify-center"
                >
                  {contactStatus === 'loading' ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Initialize Connection"}
                </button>
              </form>
            )}
          </div>

          {/* Site Visit Card (The ARD user mentioned) */}
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden group border border-white/5">
             <div className="absolute inset-0 z-0 opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-1000">
                <Image src="/images/arialviewdholeraexpress.webp" alt="Visit" fill className="object-cover" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                   <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-orange-500 border border-white/10 shadow-lg">
                      <MapPin className="h-7 w-7" />
                   </div>
                   <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight">Talk to Owner</h2>
                      <p className="text-[10px] font-black uppercase tracking-widest text-orange-500/80">Priority Connection</p>
                   </div>
                </div>

                {visitStatus === 'success' ? (
                  <div className="py-20 text-center space-y-6">
                     <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                     <h3 className="text-xl font-black uppercase">Connection Established!</h3>
                     <p className="text-xs text-slate-400 uppercase tracking-widest">Our expert will call you shortly.</p>
                     <button onClick={() => setVisitStatus('idle')} className="text-[10px] font-black uppercase tracking-widest text-orange-500">Book New Slot</button>
                  </div>
                ) : (
                  <form onSubmit={handleVisitSubmit} className="space-y-5">
                    <div className="space-y-2">
                       <label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Full Identity</label>
                       <input 
                         type="text" 
                         placeholder="ENTER NAME" 
                         required 
                         value={visitForm.name}
                         onChange={(e) => setVisitForm({...visitForm, name: e.target.value})}
                         className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest placeholder-slate-500 text-white outline-none focus:border-orange-500 transition-all backdrop-blur-sm"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Verified Mobile</label>
                       <input 
                         type="tel" 
                         placeholder="10-DIGIT MOBILE" 
                         required 
                         pattern="[0-9]{10}"
                         maxLength={10}
                         value={visitForm.phone}
                         onChange={(e) => handlePhoneChange(e, 'visit')}
                         className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest placeholder-slate-500 text-white outline-none focus:border-orange-500 transition-all backdrop-blur-sm"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Deployment Date (*Must be within 7 days)</label>
                       <input 
                         type="date" 
                         required 
                         min={today}
                         max={nextWeek}
                         value={visitForm.date}
                         onChange={(e) => setVisitForm({...visitForm, date: e.target.value})}
                         className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-orange-500 transition-all backdrop-blur-sm"
                       />
                    </div>
                    <button 
                      type="submit" 
                      disabled={visitStatus === 'loading'}
                      className="w-full h-16 rounded-2xl bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 active:scale-95 flex items-center justify-center"
                    >
                      {visitStatus === 'loading' ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Establish Connection"}
                    </button>
                  </form>
                )}
             </div>
          </div>

        </div>

        {/* Corporate Office Info Card */}
        <div className="mt-12 bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-full bg-slate-900 flex items-center justify-center text-white">
                 <Building className="h-8 w-8" />
              </div>
              <div>
                 <h4 className="text-xl font-black text-slate-900 uppercase">Global Headquarters</h4>
                 <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">DSIR, Gujarat, India | gohelnaresh7707@gmail.com</p>
              </div>
           </div>
           <a href="tel:+917435808031" className="px-10 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-100 transition-all flex items-center gap-3">
              <Phone className="h-4 w-4" /> +91 74358 08031
           </a>
        </div>

      </div>
    </div>
  );
}


      </div>
    </div>
  );
}
