"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { safeLocalStorage } from '@/utils/storage';

type Language = 'en' | 'hi' | 'gu';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    nav_home: 'Home',
    nav_updates: 'Blogs',
    nav_planning: 'Planning',
    nav_investment: 'Investment',
    nav_contact: 'Contact Us',
    btn_unlock: 'Unlock Now',
    btn_view: 'View Map',
    btn_get_touch: 'Contact Us',
    search_placeholder: 'Search Documents...',
    footer_tagline: 'The official portal for Dholera Smart City infrastructure, investment, and planning intelligence.',
    footer_quick_links: 'Quick Links',
    footer_contact_info: 'Contact Information',
    footer_owner: 'Owner Details',
    footer_address: 'Address',
    footer_email: 'Email',
    footer_phone: 'Phone',
    pdf_cat_official: 'Official PDFs',
    pdf_cat_naksha: 'Naksha Maps',
    pdf_cat_dp: 'DP Maps',
    hero_title: 'Dholera Growth Platform',
    hero_subtitle: 'Evidence-backed infrastructure tracking for smart investors.',
  },
  hi: {
    nav_home: 'होम',
    nav_updates: 'ब्लॉग',
    nav_planning: 'योजना',
    nav_investment: 'निवेश',
    nav_contact: 'संपर्क करें',
    btn_unlock: 'अभी अनलॉक करें',
    btn_view: 'नક્શો देखें',
    btn_get_touch: 'संपर्क में रहें',
    search_placeholder: 'दस्तावेज़ खोजें...',
    footer_tagline: 'धोलेरा स्मार्ट सिटी इंफ्रास्ट्रक्चर, निवेश और योजना इंटेलिजेंस के लिए आधिकारिक पोर्टल।',
    footer_quick_links: 'त्वरित लिंक',
    footer_contact_info: 'संपर्क जानकारी',
    footer_owner: 'मालिक का विवरण',
    footer_address: 'पता',
    footer_email: 'ईमेल',
    footer_phone: 'फोन',
    pdf_cat_official: 'आधिकारिक पीडीएफ',
    pdf_cat_naksha: 'नક્શા मैप्स',
    pdf_cat_dp: 'डीपी मैप्स',
    hero_title: 'धोलेरा ग्रोथ प्लेटफॉर्म',
    hero_subtitle: 'स्मार्ट निवेशकों के लिए साक्ष्य-आधारित बुनियादी ढांचा ट्रैकिंग।',
  },
  gu: {
    nav_home: 'હોમ',
    nav_updates: 'બ્લોગ્સ',
    nav_planning: 'પ્લાનિંગ',
    nav_investment: 'રોકાણ',
    nav_contact: 'સંપર્ક કરો',
    btn_unlock: 'હમણાં અનલોક કરો',
    btn_view: 'નકશો જુઓ',
    btn_get_touch: 'સંપર્કમોં રહો',
    search_placeholder: 'દસ્તાવેજો શોધો...',
    footer_tagline: 'ધોલેરા સ્માર્ટ સિટી ઇન્ફ્રાસ્ટ્રક્ચર, રોકાણ અને પ્લાનિંગ ઇન્ટેલિજન્સ માટેનું સત્તાવાર પોર્ટલ.',
    footer_quick_links: 'ક્વિક લિંક્સ',
    footer_contact_info: 'સંપર્ક માહિતી',
    footer_owner: 'માલિકની વિગતો',
    footer_address: 'સરનામું',
    footer_email: 'ઇમેઇલ',
    footer_phone: 'ફોન',
    pdf_cat_official: 'સત્તાવાર પીડીએફ',
    pdf_cat_naksha: 'નકશા મેપ્સ',
    pdf_cat_dp: 'ડીપી મેપ્સ',
    hero_title: 'ધોલેરા ગ્રોથ પ્લેટફોર્મ',
    hero_subtitle: 'સ્માર્ટ રોકાણકારો માટે પુરાવા-આધારિત ઇન્ફ્રાસ્ટ્રક્ચર ટ્રેકિંગ.',
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>(
    (safeLocalStorage.getItem('preferred_lang') as Language) || 'en'
  );

  useEffect(() => {
    safeLocalStorage.setItem('preferred_lang', lang);
  }, [lang]);

  const t = (key: string) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

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
