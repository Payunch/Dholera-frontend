export interface Project {
 slug: string;
 name: string;
 category:"Residential" |"Commercial" |"Industrial";
 taglineKey: string;
 descKey: string;
 plotSizes: string;
 offering: string;
 roadWidth: string;
 zoning: string;
 status: string;
 reraApproved: boolean;
 mapUrl: string;
 whatsappText: string;
 location: string;
 image: string;
}

export const projects: Project[] = [
 {
 slug:"satyaja-bliss-grandeur",
 name:"Satyaja Bliss Grandeur 1 & 2",
 category:"Residential",
 taglineKey:"satyaja_tagline",
 descKey:"satyaja_desc",
 plotSizes:"100 - 500 Sq. Yards",
 offering:"Residential Plots",
 roadWidth:"12m - 18m Internal Roads",
 zoning:"High Appreciation Residential Zone",
 status:"RERA Approved - Ready to Register",
 reraApproved: true,
 mapUrl:"https://maps.google.com/maps?q=Pipali%20Junction,%20Dholera,%20Gujarat,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed",
 whatsappText:"Hi Dholera Platform, I am interested in Satyaja Plots (Bliss Grandeur 1 & 2). Please send more information about rates, availability, and brochure.",
 location:"Pipali Highway, Dholera SIR",
 image:"/images/bliss_grandeur.jpg"
 },
 {
 slug:"dream-world-city",
 name:"Dream World City",
 category:"Residential",
 taglineKey:"dream_world_tagline",
 descKey:"dream_world_desc",
 plotSizes:"144 - 300 Sq. Yards",
 offering:"Residential Plots & Villas",
 roadWidth:"9m - 12m Gated Internal Roads",
 zoning:"Planned Residential Sector",
 status:"Development Underway - Bookings Open",
 reraApproved: false,
 mapUrl:"https://maps.google.com/maps?q=Dholera,%20Gujarat,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed",
 whatsappText:"Hi Dholera Platform, I am interested in Dream World City Plots and Villas. Please send more information about rates, availability, and layout.",
 location:"Residential Zone, Dholera SIR",
 image:"/images/345-1-e1777985454613-300x271.jpeg"
 },
 {
 slug:"breeze-residency",
 name:"Breeze Residency",
 category:"Residential",
 taglineKey:"breeze_tagline",
 descKey:"breeze_desc",
 plotSizes:"120 - 250 Sq. Yards",
 offering:"Premium Residential Plots",
 roadWidth:"9m - 15m Asphalt Roads",
 zoning:"Growth Residential TP Zone",
 status:"Ready for Boundary Wall - Bookings Open",
 reraApproved: false,
 mapUrl:"https://maps.google.com/maps?q=Dholera,%20Gujarat,%20India&t=&z=12&ie=UTF8&iwloc=&output=embed",
 whatsappText:"Hi Dholera Platform, I am interested in Breeze Residency Plots. Please send more information about location, pricing, and site plan.",
 location:"Strategic Sector, Dholera SIR",
 image:"/images/fghj-300x200.jpeg"
 },
 {
 slug:"aerocity-hub",
 name:"Aerocity Hub",
 category:"Commercial",
 taglineKey:"aerocity_tagline",
 descKey:"aerocity_desc",
 plotSizes:"200 - 600 Sq. Yards",
 offering:"Commercial & Mix-Use Plots",
 roadWidth:"18m - 24m Main Sector Roads",
 zoning:"Commercial & Logistics Corridor",
 status:"Strategic Zone - Airport Proximity Area",
 reraApproved: false,
 mapUrl:"https://maps.google.com/maps?q=Dholera%20International%20Airport,%20Gujarat,%20India&t=&z=12&ie=UTF8&iwloc=&output=embed",
 whatsappText:"Hi Dholera Platform, I am interested in Aerocity Hub Commercial Plots. Please send details regarding commercial feasibility, pricing, and highway connectivity.",
 location:"Airport Proximity, Dholera SIR",
 image:"/images/airportFeatureimage.webp"
 },
 {
 slug:"imperial-tp4b2",
 name:"Imperial TP4B2",
 category:"Industrial",
 taglineKey:"imperial_tagline",
 descKey:"imperial_desc",
 plotSizes:"500 - 2000 Sq. Yards",
 offering:"Industrial & Manufacturing Plots",
 roadWidth:"24m - 30m Heavy Cargo Arterial Roads",
 zoning:"General Industrial / Warehousing Zone B2",
 status:"Pre-Launch Bookings - Heavy Grid Ready",
 reraApproved: false,
 mapUrl:"https://maps.google.com/maps?q=Dholera%20SIR,%20Gujarat,%20India&t=&z=11&ie=UTF8&iwloc=&output=embed",
 whatsappText:"Hi Dholera Platform, I am interested in Imperial TP4B2 Industrial and Warehousing plots. Please send commercial brochure, power feasibility specs, and site layout map.",
 location:"TP4 B2 Industrial Zone, Dholera SIR",
 image:"/images/dholeraexpress.webp"
 }
];
