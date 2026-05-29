"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '@/lib/api';
import { safeLocalStorage } from '@/utils/storage';

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

  const loginLead = useCallback((leadData: Lead) => {
    if (leadData.id) safeLocalStorage.setItem('lead_id', String(leadData.id));
    if (leadData.email) safeLocalStorage.setItem('lead_email', leadData.email);
    safeLocalStorage.setItem('lead_phone', leadData.phone);
    safeLocalStorage.setItem('lead_name', leadData.name);
    safeLocalStorage.setItem('lead_token', leadData.token);
    setVerifiedLead(leadData);
  }, []);

  const logoutLead = useCallback(() => {
    safeLocalStorage.removeItem('lead_token');
    safeLocalStorage.removeItem('lead_name');
    safeLocalStorage.removeItem('lead_phone');
    safeLocalStorage.removeItem('lead_email');
    safeLocalStorage.removeItem('lead_id');
    setVerifiedLead(null);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const verifySession = async () => {
      const token = safeLocalStorage.getItem('lead_token');

      if (!token) {
        if (!cancelled) setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/leads/verify-token`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (cancelled) return;

        if (response.ok) {
          const data = await response.json();
          if (data?.lead) {
            if (data.lead.id) safeLocalStorage.setItem('lead_id', String(data.lead.id));
            if (data.lead.email) safeLocalStorage.setItem('lead_email', data.lead.email);
            safeLocalStorage.setItem('lead_phone', data.lead.phone || '');
            safeLocalStorage.setItem('lead_name', data.lead.name || '');
          }
          setVerifiedLead({ ...data.lead, token });
        } else {
          logoutLead();
        }
      } catch (err) {
        if (cancelled) return;
        console.error('Failed to verify lead session:', err);
        const name = safeLocalStorage.getItem('lead_name');
        const phone = safeLocalStorage.getItem('lead_phone');
        const email = safeLocalStorage.getItem('lead_email') || undefined;
        const id = Number.parseInt(safeLocalStorage.getItem('lead_id') || '', 10);
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
  }, [logoutLead]);

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
