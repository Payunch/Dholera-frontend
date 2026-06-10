import { Metadata } from"next";
import Image from"next/image";
import { Landmark, Construction, Globe, Shield, ArrowRight } from"lucide-react";
import Link from"next/link";

export const metadata: Metadata = {
 title:"Dholera Smart City | India's First Platinum-Rated Green Field City",
 description:"Learn about Dholera SIR, a global hub for manufacturing and innovation. Infrastructure, smart governance, and sustainable urban development.",
};

export default function SmartCityPage() {
 return (
 <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pb-32 w-full overflow-x-hidden">
 
 {/* Header Block */}
 <section className="relative bg-white dark:bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden mb-24">
 {/* Background Image Overlay */}
 <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
 <Image 
 src="/images/futuristic_dholera.png" 
 alt="Dholera Smart City Vision" 
 fill 
 className="object-cover"
 />
 </div>

 <div className="container relative z-10 mx-auto px-4 md:px-8 text-center space-y-6">
 <div className="inline-flex items-center rounded-full bg-slate-900/50 border border-slate-700 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-white backdrop-blur-sm">
 Future of Urban Living
 </div>
 <h1 className="font-display text-4xl sm:text-5xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">
 Dholera <span className="text-orange-600 italic">Smart</span> City
 </h1>
 <p className="max-w-2xl mx-auto text-sm sm:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-widest">
 The Industrialized Future of Gujarat
 </p>
 </div>
 </section>

 <div className="container mx-auto px-4 md:px-8">
 <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
 <div className="space-y-10">
 <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">The Vision of <span className="text-orange-600">DSIR</span></h2>
 <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
 Dholera Special Investment Region (DSIR) is a major Greenfield Industrial Hub planned and located 
 approximately 100km south of Ahmedabad. Spanning 920 sq km, it is India's first Platinum-rated 
 Greenfield Smart City.
 </p>
 <div className="grid grid-cols-2 gap-8">
 <div className="p-8 bg-white rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all duration-500 group">
 <div className="text-5xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">920</div>
 <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Sq KM Total Area</div>
 </div>
 <div className="p-8 bg-white rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all duration-500 group">
 <div className="text-5xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">2M+</div>
 <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Target Population</div>
 </div>
 </div>
 </div>
 <div className="relative aspect-video bg-white dark:bg-slate-950 rounded-[3rem] overflow-hidden shadow-2xl group">
 <Image 
 src="/images/arialviewdholeraexpress.webp" 
 alt="DSIR Infrastructure" 
 fill 
 className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
 />
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-900 dark:text-white">
 <Construction className="h-8 w-8 animate-pulse" />
 </div>
 </div>
 <div className="absolute bottom-8 left-8">
 <span className="px-4 py-2 bg-orange-600 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Real-time Growth</span>
 </div>
 </div>
 </section>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
 {[
 { title:"Smart Governance", desc:"Digital land management, automated approvals, and city-wide ICT integration.", icon: Globe },
 { title:"Sustainable Life", desc:"100% recycling of waste, renewable energy integration, and vast green spaces.", icon: Shield },
 { title:"Global Logistics", desc:"Proximity to the upcoming International Airport and Delhi-Mumbai Industrial Corridor.", icon: Landmark },
 ].map((feature, i) => (
 <div key={i} className="group space-y-6 p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
 <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm group-hover:bg-white dark:bg-slate-900 group-hover:text-slate-900 dark:text-white transition-all">
 <feature.icon className="h-7 w-7" />
 </div>
 <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase group-hover:text-orange-600 transition-colors">{feature.title}</h3>
 <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
 </div>
 ))}
 </div>

 <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 md:p-24 text-slate-900 dark:text-white text-center relative overflow-hidden">
 <div className="absolute inset-0 opacity-10 mix-blend-overlay">
 <Image src="/images/airportVision.webp" alt="Background" fill className="object-cover" />
 </div>
 <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 tracking-tighter relative z-10">Building India&apos;s <br/> <span className="text-orange-600 italic">First Smart Core</span>.</h2>
 <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto uppercase tracking-widest text-xs leading-loose mb-12 relative z-10">
 A global manufacturing and trading hub that provides a high-quality lifestyle with smart infrastructure and a world-class environment.
 </p>
 <Link href="/contact" className="relative z-10 inline-flex items-center gap-3 px-12 py-5 bg-white text-slate-900 dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-xl active:scale-95">
 Secure Your Stake <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </div>
 </div>
 );
}
