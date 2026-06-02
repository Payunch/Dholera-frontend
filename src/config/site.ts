export const siteConfig = {
  name: "Dholera Platform",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dholeraplatform.com",
  ogImage: "https://dholeraplatform.com/og.png",
  description: "Official Dholera Platform for infrastructure intelligence, planning maps, TP maps, and land investment growth evidence in Dholera Smart City.",
  links: {
    facebook: "https://www.facebook.com/dholeraplatform",
    twitter: "https://twitter.com/dholeraplatform",
    instagram: "https://www.instagram.com/dholeraplatform",
    youtube: "https://www.youtube.com/@dholeraplatform",
  },
  contact: {
    email: "gohelnaresh7707@gmail.com",
    phone: "+91-XXXXXXXXXX",
    phoneDisplay: "+91 XXXXXXXXXX",
  },
  keywords: [
    "Dholera Platform",
    "Dholera Smart City",
    "Dholera Maps",
    "Dholera Planning",
    "TP Map Dholera",
    "Dholera Investment",
    "Dholera Growth Evidence"
  ]
};

export type SiteConfig = typeof siteConfig;
