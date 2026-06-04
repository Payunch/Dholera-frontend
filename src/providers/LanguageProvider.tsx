"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { setCookie, getCookie } from '@/utils/cookies';

type Language = 'en' | 'hi' | 'gu';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  const fetchTranslations = useCallback(async (l: Language) => {
    try {
      const response = await apiClient.get(`/preferences/translations/${l}`);
      setTranslations(response.data);
    } catch (err) {
      console.error('Failed to fetch translations:', err);
    }
  }, []);

  const setLang = useCallback(async (newLang: Language) => {
    setLangState(newLang);
    setCookie('preferred_lang', newLang);
    await fetchTranslations(newLang);
    
    // Also sync with backend if lead_token is present
    const token = getCookie('lead_token');
    if (token) {
      try {
        await apiClient.post('/preferences/user', { language: newLang });
      } catch (err) {
        console.error('Failed to sync language with backend:', err);
      }
    }
  }, [fetchTranslations]);

  useEffect(() => {
    const initLang = async () => {
      const savedLang = getCookie('preferred_lang') as Language | null;
      const finalLang = (savedLang === 'en' || savedLang === 'hi' || savedLang === 'gu') ? savedLang : 'en';
      setLangState(finalLang);
      await fetchTranslations(finalLang);
      setMounted(true);
    };
    initLang();
  }, [fetchTranslations]);

  const t = (key: string) => {
    return translations[key] || key;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
