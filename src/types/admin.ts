export interface Lead {
 id: number;
 name: string;
 email: string;
 phone: string;
 source: string;
 utm_source?: string;
 status: "New" | "Contacted" | "Site Visit" | "Converted" | "Qualified" | "Follow-up" | "Not Interested" | "Lost" | string;
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
 score?: number;
 interest_profile?: string; // JSON string from backend
}

export interface WhatsAppStats {
 totalClicks: number;
 leadsContacted: number;
 conversionsAfterWhatsApp: number;
 responseRate: string;
}
