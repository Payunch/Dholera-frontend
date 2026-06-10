"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { setCookie, getCookie } from '@/utils/cookies';

import hi from '@/i18n/locales/hi.json';
import en from '@/i18n/locales/en.json';
import gu from '@/i18n/locales/gu.json';

const LOCAL_TRANSLATIONS: Record<string, Record<string, string>> = { hi, en, gu };

type Language = 'en' | 'hi' | 'gu';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>('hi'); // Default to Hindi
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);
  const [themeMode, setThemeState] = useState<'light' | 'dark'>('light');

  const updateDomTheme = useCallback((isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = getCookie('user_theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        setThemeState(savedTheme);
        updateDomTheme(savedTheme === 'dark');
      } else {
        // Fallback to system preference if no cookie
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setThemeState(isDark ? 'dark' : 'light');
        updateDomTheme(isDark);
      }
    };
    checkTheme();
  }, [updateDomTheme]);

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    setCookie('user_theme', newTheme);
    updateDomTheme(newTheme === 'dark');
  };

  const toggleTheme = () => {
    const nextTheme = themeMode === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const fetchTranslations = useCallback(async (l: Language) => {
    // Start with local translations
    const localDict = LOCAL_TRANSLATIONS[l] || {};
    setTranslations(localDict);

    try {
      // Sync with backend for dynamic content or updates
      const response = await apiClient.get(`/preferences/translations/${l}`);
      setTranslations(prev => ({ ...prev, ...response.data }));
    } catch (err) {
      // Fallback is already set to localDict
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
      const finalLang = (savedLang === 'en' || savedLang === 'hi' || savedLang === 'gu') ? savedLang : 'hi';
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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, theme: themeMode, setTheme, toggleTheme }}>
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
