import { Metadata } from "next";
import { Landmark, Construction, Globe, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Dholera Smart City | India's First Platinum-Rated Green Field City",
  description: "Learn about Dholera SIR, a global hub for manufacturing and innovation. Infrastructure, smart governance, and sustainable urban development.",
};

export default function SmartCityPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <header className="mb-20 text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-white">
            Future of Urban Living
          </div>
          <h1 className="font-display text-5xl font-black tracking-tight text-slate-900 md:text-8xl uppercase leading-none">
            Dholera <span className="text-orange-600 italic">Smart</span> City
          </h1>
          <p className="text-xl font-medium text-slate-500 leading-relaxed uppercase tracking-wide">
            The Industrialized Future of Gujarat
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">The Vision of DSIR</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Dholera Special Investment Region (DSIR) is a major Greenfield Industrial Hub planned and located 
              approximately 100km south of Ahmedabad. Spanning 920 sq km, it is India's first Platinum-rated 
              Greenfield Smart City.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-3xl">
                <div className="text-4xl font-black text-orange-600 mb-2">920</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sq KM Area</div>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl">
                <div className="text-4xl font-black text-orange-600 mb-2">2M+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Population</div>
              </div>
            </div>
          </div>
          <div className="relative aspect-video bg-slate-100 rounded-[3rem] overflow-hidden border border-slate-200 flex items-center justify-center">
             <Construction className="h-20 w-20 text-slate-300" />
             <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 to-transparent" />
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Smart Governance", desc: "Digital land management, automated approvals, and city-wide ICT integration.", icon: Globe },
            { title: "Sustainable Life", desc: "100% recycling of waste, renewable energy integration, and vast green spaces.", icon: Shield },
            { title: "Global Logistics", desc: "Proximity to the upcoming International Airport and Delhi-Mumbai Industrial Corridor.", icon: Landmark },
          ].map((feature, i) => (
            <div key={i} className="space-y-6">
              <div className="h-12 w-12 text-orange-600">
                <feature.icon className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
