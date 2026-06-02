export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: "New" | "Contacted" | "Converted" | "Qualified";
  createdAt: string;
  is_pro?: boolean;
  is_registered?: boolean;
  is_trial?: boolean;
  verified?: boolean;
  browserFingerprint?: string;
  totalTimeSpent?: number;
  visitCount?: number;
  total_sessions?: number;
  visitedPages?: string[];
  sessions?: any[];
}

export interface WhatsAppStats {
  totalClicks: number;
  leadsContacted: number;
  conversionsAfterWhatsApp: number;
  responseRate: string;
}
