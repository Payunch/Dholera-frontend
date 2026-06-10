import { Metadata } from "next";
import Image from "next/image";
import { Plane, Car, MapPin, Coffee, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Travel & Lifestyle | Connecting Ahmedabad to Dholera SIR",
  description: "Travel guide for Dholera SIR visitors. Ahmedabad-Dholera Expressway status, local guesthouses, and regional tourism highlights near the Gulf of Khambhat.",
};

export default function TravelLifestylePage() {
  return (
    <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pb-32 w-full overflow-x-hidden">
      
      {/* Header Block */}
      <section className="relative bg-white dark:bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden mb-24">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <Image 
            src="/images/airportVision.webp" 
            alt="Dholera Travel & Connectivity" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
          <div className="inline-flex items-center rounded-full bg-blue-600/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 border border-blue-500/30">
             Regional Connectivity
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">
             Travel & <span className="text-orange-600 italic">Lifestyle</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-widest">
             Navigate the corridor of growth between Ahmedabad and DSIR.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {[
            { title: "Expressway", desc: "109km high-speed link reducing travel time to 60 mins.", icon: Car },
            { title: "Int'l Airport", desc: "Upcoming logistic and passenger hub for the region.", icon: Plane },
            { title: "Premium Stay", desc: "Verified guest houses and hotels for site visitors.", icon: Coffee },
            { title: "Local Sites", desc: "Explore the Gulf of Khambhat and Velavadar Park.", icon: MapPin },
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
               <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm group-hover:bg-white dark:bg-slate-900 group-hover:text-slate-900 dark:text-white transition-all">
                  <item.icon className="h-7 w-7" />
               </div>
               <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase mt-8 mb-4 group-hover:text-orange-600 transition-colors">{item.title}</h3>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <section className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
           <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
              <Image src="/images/expressHighway.webp" alt="Background" fill className="object-cover" />
           </div>
           
           <div className="relative z-10 flex-1 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">Plan Your <br/> <span className="text-orange-600 italic">Site Visit</span></h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl uppercase tracking-widest text-xs leading-loose">
                 We provide complimentary pick-up from Ahmedabad Airport or Railway Station, 
                 guided tours of all major TP schemes, and overnight hospitality.
              </p>
              <Link href="/#site-visit" className="inline-flex items-center gap-3 px-10 py-5 bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/10 active:scale-95">
                 Book Complimentary Stay <ArrowRight className="h-4 w-4" />
              </Link>
           </div>

           <div className="relative z-10 w-full md:w-1/3 aspect-square rounded-[2rem] overflow-hidden border border-white/10 group">
              <Image 
                src="/images/arialviewdholeraexpress.webp" 
                alt="Dholera Aerial" 
                fill 
                className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" 
              />
           </div>
        </section>
      </div>
    </div>
  );
}
