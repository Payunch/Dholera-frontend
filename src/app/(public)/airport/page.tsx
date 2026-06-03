import React from 'react';
import { Plane, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dholera International Airport - Status, Maps & Connectivity',
  description: 'Official updates on Dholera International Airport. View construction milestones, connectivity to Ahmedabad-Dholera Expressway, and download TP maps.',
  keywords: 'Dholera Airport, Dholera SIR Airport, Dholera International Airport Status, Dholera TP Maps'
};

export default function AirportPage() {
  const milestones = [
    { phase: "Phase 1", status: "Under Construction", date: "Expected 2025-26", desc: "Runway and Terminal building for 1.5 million passengers per year." },
    { phase: "Phase 2", status: "Planned", date: "2030+", desc: "Expansion to handle larger cargo and increased passenger traffic." },
    { phase: "Connectivity", status: "Expressway Linked", date: "Ongoing", desc: "Direct 4-lane access from Ahmedabad-Dholera Expressway." },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109c053?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-600/20 border border-orange-500/30 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 mb-6">
            <Plane className="h-3 w-3" /> International Infrastructure
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
            Dholera <span className="text-orange-600 italic">International</span> Airport
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 font-medium">
            The multi-modal logistic hub and gateway to India's first Platinum-rated Green Smart City.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">
                Strategic <span className="text-orange-600 italic">Importance</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Located 80 km from Ahmedabad and 20 km from Dholera SIR, this airport will serve as a massive cargo hub for the industrial clusters of Gujarat. It is designed to handle the world's largest aircraft.
              </p>
              
              <div className="space-y-4">
                {[
                  "1426 Hectares of land allocated",
                  "4E Category - Capable of handling A380s",
                  "Cargo-focused multi-modal logistics",
                  "Parallel to the Ahmedabad-Dholera Expressway"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-bold text-slate-800 uppercase text-xs">
                    <CheckCircle2 className="h-5 w-5 text-green-500" /> {item}
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link 
                  href="/#documents" 
                  className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10"
                >
                  Download Airport TP Maps <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-6">
              {milestones.map((m, i) => (
                <div key={i} className="p-8 rounded-[2rem] border border-slate-100 bg-slate-50 hover:shadow-2xl transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">{m.phase}</span>
                    <span className="bg-white px-3 py-1 rounded-full text-[8px] font-black uppercase border border-slate-200">{m.status}</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">{m.date}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black uppercase">Interested in <span className="text-orange-500 italic">Airport-side</span> Property?</h2>
          <p className="text-slate-400 max-w-xl mx-auto uppercase text-xs font-black tracking-widest leading-loose">
            Direct access to TP 1, TP 2, and upcoming airport development zones. Contact us for verified plots.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="https://wa.me/917435808310" className="bg-[#25D366] text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-green-500/20">WhatsApp Us</a>
            <a href="tel:+917435808310" className="bg-white text-slate-900 px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest">Call Owner</a>
          </div>
        </div>
      </section>
    </div>
  );
}
