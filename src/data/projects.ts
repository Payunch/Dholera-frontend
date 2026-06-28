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
 slug:"final-dholera-report",
 name:"Final Dholera Report",
 category:"Commercial",
 taglineKey:"final_report_tagline",
 descKey:"final_report_desc",
 plotSizes:"N/A",
 offering:"Comprehensive Report",
 roadWidth:"N/A",
 zoning:"N/A",
 status:"Available",
 reraApproved: false,
 mapUrl:"https://maps.google.com/maps?q=Dholera,%20Gujarat,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed",
 whatsappText:"Hi Dholera Platform, I am interested in the Final Dholera Report.",
 location:"Dholera SIR",
 image:"/images/dholeraexpress.webp"
 }
];
