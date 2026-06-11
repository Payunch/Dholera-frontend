"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from'react';
import { usePathname } from'next/navigation';
import { API_BASE_URL } from'@/lib/api';
import { setCookie, getCookie, removeCookie } from'@/utils/cookies';

interface Lead {
 id?: number;
 name: string;
 phone: string;
 email?: string;
 token: string;
 status?: string;
 source?: string;
 is_registered?: boolean;
 is_trial?: boolean;
 is_pro?: boolean;
 createdAt?: string;
 _offline?: boolean;
}

interface LeadContextType {
 verifiedLead: Lead | null;
 loginLead: (leadData: Lead) => void;
 logoutLead: () => void;
 loading: boolean;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider = ({ children }: { children: React.ReactNode }) => {
 const [verifiedLead, setVerifiedLead] = useState<Lead | null>(null);
 const [loading, setLoading] = useState(true);
 const pathname = usePathname();
 const isAdminPath = pathname?.startsWith('/admin');

 const loginLead = useCallback((leadData: Lead) => {
 const domain = typeof window !== 'undefined' && window.location.hostname.includes('dholeraplatform.com') 
   ? '.dholeraplatform.com' 
   : undefined;

 if (leadData.id) setCookie('lead_id', String(leadData.id), null, domain);
 if (leadData.email) setCookie('lead_email', leadData.email, null, domain);
 setCookie('lead_phone', leadData.phone, null, domain);
 setCookie('lead_name', leadData.name, null, domain);
 setCookie('lead_token', leadData.token, null, domain);
 setVerifiedLead(leadData);
 }, []);

 const logoutLead = useCallback(() => {
 removeCookie('lead_token');
 removeCookie('lead_name');
 removeCookie('lead_phone');
 removeCookie('lead_email');
 removeCookie('lead_id');
 setVerifiedLead(null);
 }, []);

 useEffect(() => {
 // DO NOT run lead verification on admin pages to avoid state loops
 if (isAdminPath) {
 setLoading(false);
 return;
 }

 let cancelled = false;

 const verifySession = async () => {
 const token = getCookie('lead_token');

 if (!token) {
 if (!cancelled) setLoading(false);
 return;
 }

 try {
 const response = await fetch(`${API_BASE_URL}/leads/verify-token`, {
 headers: {'Authorization':`Bearer ${token}` }
 });

 if (cancelled) return;

 if (response.ok) {
 const data = await response.json();
 if (data?.lead) {
 if (data.lead.id) setCookie('lead_id', String(data.lead.id));
 if (data.lead.email) setCookie('lead_email', data.lead.email);
 setCookie('lead_phone', data.lead.phone ||'');
 setCookie('lead_name', data.lead.name ||'');
 }
 setVerifiedLead({ ...data.lead, token });
 } else {
 logoutLead();
 }
 } catch (err) {
 if (cancelled) return;
 console.error('Failed to verify lead session:', err);
 const name = getCookie('lead_name');
 const phone = getCookie('lead_phone');
 const email = getCookie('lead_email') || undefined;
 const idStr = getCookie('lead_id');
 const id = idStr ? Number.parseInt(idStr, 10) : NaN;
 if (name && phone) {
 setVerifiedLead({
 id: Number.isFinite(id) ? id : undefined,
 name,
 phone,
 email,
 token,
 _offline: true,
 });
 }
 } finally {
 if (!cancelled) setLoading(false);
 }
 };

 verifySession();

 return () => { cancelled = true; };
 }, [logoutLead, isAdminPath]);

 return (
 <LeadContext.Provider value={{ verifiedLead, loginLead, logoutLead, loading }}>
 {children}
 </LeadContext.Provider>
 );
};

export const useLead = () => {
 const context = useContext(LeadContext);
 if (context === undefined) {
 throw new Error('useLead must be used within a LeadProvider');
 }
 return context;
};
