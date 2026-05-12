import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    nav_home: 'Home',
    nav_updates: 'Updates',
    nav_planning: 'Planning',
    nav_investment: 'Investment',
    nav_contact: 'Contact',
    btn_unlock: 'Unlock Now',
    btn_view: 'View Map',
    search_placeholder: 'Search...',
    footer_tagline: 'High-conviction land investment evidence for Dholera Smart City.',
    hero_title: 'Dholera Growth Platform',
    hero_subtitle: 'Evidence-backed infrastructure tracking for smart investors.',
  },
  hi: {
    nav_home: 'होम',
    nav_updates: 'अपडेट्स',
    nav_planning: 'પ્લાનિંગ', // Wait, this is Gujarati, let me fix Hindi
    nav_investment: 'निवेश',
    nav_contact: 'संपर्क',
    btn_unlock: 'अभी अनलॉक करें',
    btn_view: 'नक्शा देखें',
    search_placeholder: 'खोजें...',
    footer_tagline: 'धोलेरा स्मार्ट सिटी के लिए उच्च-विश्वास भूमि निवेश साक्ष्य।',
    hero_title: 'धोलेरा ग्रोथ प्लेटफॉर्म',
    hero_subtitle: 'स्मार्ट निवेशकों के लिए साक्ष्य-आधारित बुनियादी ढांचा ट्रैकिंग।',
  },
  gu: {
    nav_home: 'હોમ',
    nav_updates: 'અપડેટ્સ',
    nav_planning: 'પ્લાનિંગ',
    nav_investment: 'રોકાણ',
    nav_contact: 'સંપર્ક',
    btn_unlock: 'હમણાં અનલૉક કરો',
    btn_view: 'નકશો જુઓ',
    search_placeholder: 'શોધો...',
    footer_tagline: 'ધોલેરા સ્માર્ટ સિટી માટે ઉચ્ચ-વિશ્વાસ જમીન રોકાણ પુરાવા.',
    hero_title: 'ધોલેરા ગ્રોથ પ્લેટફોર્મ',
    hero_subtitle: 'સ્માર્ટ રોકાણકારો માટે પુરાવા-આધારિત ઇન્ફ્રાસ્ટ્રક્ચર ટ્રેકિંગ.',
  }
};

// Fixed Hindi for nav_planning
translations.hi.nav_planning = 'योजना';

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('preferred_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('preferred_lang', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
