import { Metadata } from "next";
import { Plane, Waves, Utensils, Hotel, Camera, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Dholera Travel & Lifestyle | Tourism, Hotels, and Amenities",
  description: "Discover the lifestyle in Dholera Smart City. Upcoming 5-star hotels, golf courses, riverfront developments, and tourist attractions in DSIR.",
};

export default function TravelLifestylePage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <header className="mb-20 space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 border border-blue-200">
            Urban Experience
          </div>
          <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 md:text-7xl uppercase leading-tight">
            Travel & <span className="text-orange-600 italic">Lifestyle</span>
          </h1>
          <p className="text-lg font-medium text-slate-500 leading-relaxed uppercase tracking-widest text-xs">
            Beyond the Factory Floor: Modern Living in Dholera
          </p>
        </header>

        <section className="mb-32">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Tourism", desc: "Riverfront development and heritage sites near the Gulf of Khambhat.", icon: Camera, color: "bg-purple-50 text-purple-600" },
                { title: "Hospitality", desc: "Upcoming 5-star hotels and premium serviced apartments in the City Center.", icon: Hotel, color: "bg-blue-50 text-blue-600" },
                { title: "Connectivity", desc: "The new International Airport and High-speed Rail links.", icon: Plane, color: "bg-orange-50 text-orange-600" },
                { title: "Amenities", desc: "Golf courses, health-cities, and international schools.", icon: Utensils, color: "bg-green-50 text-green-600" },
              ].map((item, i) => (
                <div key={i} className="group p-8 rounded-[2rem] border border-slate-100 hover:border-orange-200 hover:shadow-xl transition-all">
                   <div className={`h-14 w-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <item.icon className="h-6 w-6" />
                   </div>
                   <h3 className="text-lg font-black text-slate-900 uppercase mb-3">{item.title}</h3>
                   <p className="text-xs font-semibold text-slate-500 leading-relaxed uppercase tracking-wider">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-16">
           <div className="flex-1 space-y-8">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">The Dholera Riverfront</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                 Inspired by the Sabarmati Riverfront, Dholera's own waterfront development will feature recreational zones, 
                 lush parks, and cycling tracks, making it the heart of the city's leisure life.
              </p>
              <div className="flex items-center gap-6">
                 <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200" />
                    ))}
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">10k+ Residents Expected by 2028</p>
              </div>
           </div>
           <div className="flex-1 w-full aspect-[4/3] bg-white rounded-[2rem] border border-slate-200 shadow-inner flex items-center justify-center">
              <Waves className="h-16 w-16 text-slate-100" />
           </div>
        </div>
      </div>
    </div>
  );
}
