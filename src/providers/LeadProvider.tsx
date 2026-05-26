"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api';
import { safeLocalStorage } from '@/utils/storage';

interface Lead {
  name: string;
  phone: string;
  email?: string;
  token: string;
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
          setVerifiedLead({ ...data.lead, token });
        } else {
          logoutLead();
        }
      } catch (err) {
        if (cancelled) return;
        console.error('Failed to verify lead session:', err);
        const name = safeLocalStorage.getItem('lead_name');
        const phone = safeLocalStorage.getItem('lead_phone');
        if (name && phone) {
            setVerifiedLead({ name, phone, token, _offline: true });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    verifySession();

    return () => { cancelled = true; };
  }, []);

  const loginLead = (leadData: Lead) => {
    setVerifiedLead(leadData);
  };

  const logoutLead = () => {
    safeLocalStorage.removeItem('lead_token');
    safeLocalStorage.removeItem('lead_name');
    safeLocalStorage.removeItem('lead_phone');
    safeLocalStorage.removeItem('lead_email');
    setVerifiedLead(null);
  };

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
