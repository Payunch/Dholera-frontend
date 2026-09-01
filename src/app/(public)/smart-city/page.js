import { Metadata } from"next";
import Image from"next/image";
import { Landmark, Construction, Globe, Shield, ArrowRight } from"lucide-react";
import Link from"next/link";

export const metadata = {
 title:"About Dholera Smart City | Area, Planning & DSIR Facts",
 description:"Understand Dholera SIR's approximately 920 sq km planned area, 22 villages, six TP schemes, 22.5 sq km Activation Area, and responsible authorities.",
 alternates: { canonical: "/smart-city" },
};

export default function SmartCityPage() {
 return (
 <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pb-32 w-full overflow-x-hidden dark:bg-slate-900">
 
 {/* Header Block */}
 <section className="relative bg-white dark:bg-[#0B132B] pt-32 pb-24 border-b border-slate-800 overflow-hidden mb-24 dark:bg-slate-900">
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
 approximately 100 km southwest of Ahmedabad. Government and NICDC sources describe the planned
 region as approximately 920 sq km across 22 villages.
 </p>
 <div className="grid grid-cols-2 gap-8">
 <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all duration-500 group">
 <div className="text-5xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">920</div>
 <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Sq KM Total Area</div>
 </div>
 <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all duration-500 group">
 <div className="text-5xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">22</div>
 <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Villages in Planned Region</div>
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
 <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-900 dark:text-white dark:bg-slate-900">
 <Construction className="h-8 w-8 animate-pulse" />
 </div>
 </div>
 <div className="absolute bottom-8 left-8">
 <span className="px-4 py-2 bg-orange-600 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Real-time Growth</span>
 </div>
 </div>
 </section>

 <section className="mb-32 rounded-[3rem] border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950 md:p-14">
 <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">Dholera SIR at a glance</p>
 <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white md:text-5xl">Area, planning phases and authorities</h2>
 <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
 {[['~920 sq km','Total planned DSIR area'],['22 villages','Area encompassed by DSIR'],['6 schemes','Town Planning Schemes'],['22.5 sq km','Phase-I Activation Area']].map(([value,label]) => <div key={label} className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><p className="text-3xl font-black text-orange-600">{value}</p><p className="mt-2 text-sm font-bold text-slate-600 dark:text-slate-300">{label}</p></div>)}
 </div>
 <div className="mt-10 space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
 <p>The approximately 920 sq km figure describes the total planned Special Investment Region. It should not be confused with the developable area or the smaller Phase-I Activation Area where initial trunk infrastructure was concentrated.</p>
 <p><strong className="text-slate-950 dark:text-white">DSIRDA</strong> is the regional development authority. <strong className="text-slate-950 dark:text-white">DICDL</strong> is the special-purpose implementation company formed by central and state entities. <strong className="text-slate-950 dark:text-white">NICDC</strong> supports India&apos;s industrial-corridor programme. Dholera Platform is an independent private information service and is not affiliated with these bodies.</p>
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
 <a href="https://nicdc.in/projects/4-projects-developed/dholera-special-investment-region-gujarat" target="_blank" rel="noopener noreferrer" className="rounded-full bg-orange-600 px-6 py-3 text-sm font-black text-white">NICDC project source</a>
 <a href="https://www.pib.gov.in/newsite/PrintRelease.aspx?lang=2&reg=48&relid=122140" target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-black dark:border-slate-700">PIB planning source</a>
 <Link href="/tp-maps" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-black dark:border-slate-700">Explore TP maps</Link>
 </div>
 </section>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
 {[
 { title:"Smart Governance", desc:"Digital land management, automated approvals, and city-wide ICT integration.", icon: Landmark },
 { title:"Sustainable Life", desc:"100% recycling of waste, renewable energy integration, and vast green spaces.", icon: Shield },
 { title:"Global Logistics", desc:"Proximity to the upcoming International Airport and Delhi-Mumbai Industrial Corridor.", icon: Globe },
 ].map((feature, i) => (
 <div key={i} className="group space-y-6 p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 hover:bg-white dark:hover:bg-slate-800 dark:bg-slate-900 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
 <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm group-hover:bg-white dark:hover:bg-slate-800 dark:bg-slate-900 group-hover:text-slate-900 dark:text-white transition-all">
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
 <Link href="/contact" className="relative z-10 inline-flex items-center gap-3 px-12 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-xl active:scale-95">
 Secure Your Stake <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </div>
 </div>
 );
}
