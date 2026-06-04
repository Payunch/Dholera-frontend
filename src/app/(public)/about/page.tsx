import { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Users, Target, History } from "lucide-react";

export const metadata: Metadata = {
  title: "About Dholera Platform | Your Independent Intelligence Source",
  description: "Learn about the mission behind the Dholera Platform. We provide verified land data, infrastructure analysis, and investment intelligence for Dholera SIR.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-32 w-full overflow-x-hidden">
      
      {/* Header Block */}
      <section className="relative bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden mb-24">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none">
          <Image 
            src="/images/futuristic_dholera.png" 
            alt="Dholera Strategic Hub" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
          <div className="inline-flex items-center rounded-full bg-orange-600 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-white">
             Our Mission
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-8xl font-black tracking-tight text-white uppercase leading-[0.9]">
            The <span className="text-orange-600 italic">Intelligence</span> Hub
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-lg font-medium text-slate-300 leading-relaxed uppercase tracking-widest">
            Transparency. Verification. Growth.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
           <div className="space-y-12">
              <p className="text-2xl font-bold text-slate-900 leading-relaxed uppercase tracking-tight">
                 We are the definitive, independent digital layer for Dholera Smart City real estate and industrial intelligence.
              </p>
              <div className="space-y-8 text-lg text-slate-600 font-medium leading-relaxed">
                 <p>
                    Established to bridge the gap between complex urban planning and investor clarity, our platform 
                    provides the most comprehensive repository of TP Maps, project specifications, and policy updates 
                    in the Dholera Special Investment Region.
                 </p>
                 <p>
                    We leverage advanced data mapping and local ground intelligence to ensure every plot, project, and 
                    infrastructure milestone is verified before it reaches your screen.
                 </p>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Verified Data", desc: "Every map and project spec is double-checked against official DP/TP records.", icon: ShieldCheck },
                { title: "Investor First", desc: "Our platform is built to protect and empower the individual investor.", icon: Target },
                { title: "Expert Community", desc: "Connecting thousands of developers, investors, and policymakers.", icon: Users },
                { title: "Track Record", desc: "Over 5 years of consistent monitoring of DSIR infrastructure growth.", icon: History },
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-orange-200 transition-all">
                   <div className="h-12 w-12 text-orange-600 mb-6">
                      <item.icon className="h-12 w-12" />
                   </div>
                   <h3 className="text-lg font-black text-slate-900 uppercase mb-4">{item.title}</h3>
                   <p className="text-xs font-semibold text-slate-500 leading-relaxed uppercase tracking-wider">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-white text-center">
           <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter md:text-5xl">Building the Future, <br/> <span className="text-orange-600 italic">One Decoded Map</span> at a Time.</h2>
           <p className="text-slate-400 font-medium max-w-2xl mx-auto uppercase tracking-widest text-xs leading-loose">
              Join the elite circle of investors who rely on data-driven clarity to build their wealth in India's most ambitious industrial city.
           </p>
        </div>
      </div>
    </div>
  );
}
