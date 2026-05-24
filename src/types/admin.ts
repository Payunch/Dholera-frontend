export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: "New" | "Contacted" | "Converted" | "Qualified";
  createdAt: string;
}

export interface WhatsAppStats {
  totalClicks: number;
  leadsContacted: number;
  conversionsAfterWhatsApp: number;
  responseRate: string;
}
