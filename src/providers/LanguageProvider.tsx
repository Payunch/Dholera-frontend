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
    footer_tagline: 'The independent portal for Dholera Smart City infrastructure, investment, and planning intelligence.',
    footer_quick_links: 'Quick Links',
    footer_contact_info: 'Contact Information',
    footer_owner: 'Owner Details',
    footer_address: 'Address',
    footer_email: 'Email',
    footer_phone: 'Phone',
    pdf_cat_official: 'Verified PDFs',
    pdf_cat_naksha: 'Naksha Maps',
    pdf_cat_dp: 'DP Maps',
    hero_title: 'Dholera Growth Platform',
    hero_subtitle: 'Evidence-backed infrastructure tracking for smart investors.',
    terms_and_conditions: 'Terms and Conditions',
    last_updated: 'Last updated: May 20, 2026',
    support_email: 'support@dholeraplatform.com',
    evidence: 'Evidence',
    certainty: 'Certainty',
    scanning_archives: 'Scanning Archives...',
    the_loop: 'The Loop',
    proof: 'Proof',
    step: 'Step ',
    evidence_signals: 'Evidence Signals',
    remove: 'Remove',
    institutional_integrity: 'Institutional Integrity',
    bar: 'Bar',
    dholera_platform: 'Dholera Platform',
    hectares_monitored: 'Hectares Monitored',
    verified_data: 'Verified Data',
    about_dholera_platform: 'About Dholera Platform',
    verified_maps: 'Verified Dholera Smart City Maps',
    realtime_updates: 'Real-time Infrastructure Updates',
    fee_calculator: 'Development Permission Fee Calculator',
    compliance_verification: 'Land Investment Compliance Verification',
    platform: 'Platform',
    clearance_engine: 'Clearance Engine',
    growth_updates: 'Growth Updates',
    my_vault: 'My Vault',
    legal: 'Legal',
    privacy_policy: 'Privacy Policy',
    terms_of_service: 'Terms of Service',
    contact: 'Contact',
    airport_title: 'Dholera International Airport',
    airport_subtitle: 'The gateway to India’s first smart city.',
    infra_title: 'Smart Infrastructure',
    infra_subtitle: 'World-class industrial ecosystem.',
    tp_maps_title: 'Official TP Maps',
    featured_insights: 'Dholera Investment Insights',
    featured_insights_desc: 'Read verified updates and real estate trends for Dholera Smart City.',
    photo_gallery: 'Dholera Photo Gallery',
    photo_gallery_desc: 'Visual proof of development: Expressway progress, airport construction, and GIS maps.',
    satyaja_plots: 'Satyaja Bliss Grandeur 1 & 2',
    satyaja_tagline: 'Prime Investment Opportunity in Dholera SIR',
    book_plot_today: 'Inquire About Satyaja Plots',
    whatsapp_inquiry: 'Discuss on WhatsApp',
    read_more: 'Read Analysis',
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
    footer_tagline: 'धोलेरा स्मार्ट सिटी इंफ्रास्ट्रक्चर, निवेश और योजना इंटेलिजेंस के लिए स्वतंत्र पोर्टल।',
    footer_quick_links: 'त्वरित लिंक',
    footer_contact_info: 'संपर्क जानकारी',
    footer_owner: 'मालिक का विवरण',
    footer_address: 'पता',
    footer_email: 'ईमेल',
    footer_phone: 'फोन',
    pdf_cat_official: 'सत्यापित पीडीएफ',
    pdf_cat_naksha: 'नક્શા मैप्स',
    pdf_cat_dp: 'डीपी मैप्स',
    hero_title: 'धोलेरा ग्रोथ प्लेटफॉर्म',
    hero_subtitle: 'स्मार्ट निवेशकों के लिए साक्ष्य-आधारित बुनियादी ढांचा ट्रैकिंग।',
    terms_and_conditions: 'नियम और शर्तें',
    last_updated: 'अंतिम अद्यतन: 20 मई, 2026',
    support_email: 'support@dholeraplatform.com',
    evidence: 'प्रमाण',
    certainty: 'निश्चितता',
    scanning_archives: 'पुरालेख स्कैन कर रहा है...',
    the_loop: 'द लूप',
    proof: 'सबूत',
    step: 'कदम ',
    evidence_signals: 'प्रमाण संकेत',
    remove: 'हटाएं',
    institutional_integrity: 'संस्थागत अखंडता',
    bar: 'बार',
    dholera_platform: 'धोलेरा प्लेटफॉर्म',
    hectares_monitored: 'हेक्टेयर निगरानी',
    verified_data: 'सत्यापित डेटा',
    about_dholera_platform: 'धोलेरा प्लेटफॉर्म के बारे में',
    verified_maps: 'सत्यापित धोलेरा स्मार्ट सिटी मैप्स',
    realtime_updates: 'रीयल-टाइम इन्फ्रास्ट्रक्चर अपडेट',
    fee_calculator: 'विकास अनुमति शुल्क कैलकुलेटर',
    compliance_verification: 'भूमि निवेश अनुपालन सत्यापन',
    platform: 'प्लेटफॉर्म',
    clearance_engine: 'क्लीयरेंस इंजन',
    growth_updates: 'विकास अपडेट',
    my_vault: 'माई वॉल्ट',
    legal: 'कानूनी',
    privacy_policy: 'गोपनीयता नीति',
    terms_of_service: 'सेवा की शर्तें',
    contact: 'संपर्क करें',
    airport_title: 'धोलेरा अंतर्राष्ट्रीय हवाई अड्डा',
    airport_subtitle: 'भारत के पहले स्मार्ट शहर का प्रवेश द्वार।',
    infra_title: 'स्मार्ट इन्फ्रास्ट्रक्चर',
    infra_subtitle: 'विश्व स्तरीय औद्योगिक पारिस्थितिकी तंत्र।',
    tp_maps_title: 'आधिकारिक टीपी मैप्स',
    featured_insights: 'धोलेरा निवेश अंतर्दृष्टि',
    featured_insights_desc: 'धोलेरा स्मार्ट सिटी रियल एस्टेट विकास पर सत्यापित अपडेट और रुझान पढ़ें।',
    photo_gallery: 'धोलेरा फोटो गैलरी',
    photo_gallery_desc: 'विकास का प्रत्यक्ष प्रमाण: एक्सप्रेसवे, हवाई अड्डा निर्माण और जीआईएस नक्शे।',
    satyaja_plots: 'सत्यजा ब्लिस ग्रैन्ड्यूर 1 और 2',
    satyaja_tagline: 'धोलेरा एसआईआर में सबसे भरोसेमंद निवेश मौका',
    book_plot_today: 'सत्यजा प्लॉट्स के बारे में पूछताछ करें',
    whatsapp_inquiry: 'व्हाट्सएप पर चर्चा करें',
    read_more: 'विश्लेषण पढ़ें',
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
    footer_tagline: 'ધોલેરા સ્માર્ટ સિટી ઇન્ફ્રાસ્ટ્રક્ચર, રોકાણ અને પ્લાનિંગ ઇન્ટેલિજન્સ માટેનું સ્વતંત્ર પોર્ટલ.',
    footer_quick_links: 'ક્વિક લિંક્સ',
    footer_contact_info: 'સંપર્ક માહિતી',
    footer_owner: 'માલિકની વિગતો',
    footer_address: 'સરનામું',
    footer_email: 'ઇમેઇલ',
    footer_phone: 'ફોન',
    pdf_cat_official: 'પ્રમાણિત પીડીએફ',
    pdf_cat_naksha: 'નકશા મેપ્સ',
    pdf_cat_dp: 'ડીપી મેપ્સ',
    hero_title: 'ધોલેરા ગ્રોથ પ્લેટફોર્મ',
    hero_subtitle: 'સ્માર્ટ રોકાણકારો માટે પુરાવા-આધારિત ઇન્ફ્રાસ્ટ્રક્ચર ટ્રેકિંગ.',
    terms_and_conditions: 'નિયમો અને શરતો',
    last_updated: 'છેલ્લે અપડેટ કર્યું: 20 મે, 2026',
    support_email: 'support@dholeraplatform.com',
    evidence: 'પુરાવા',
    certainty: 'નિશ્ચિતતા',
    scanning_archives: 'આર્કાઇવ્સ સ્કેન કરી રહ્યું છે...',
    the_loop: 'ધ લૂપ',
    proof: 'સાબિતી',
    step: 'પગલું ',
    evidence_signals: 'પુરાવા સંકેતો',
    remove: 'દૂર કરો',
    institutional_integrity: 'સંસ્થાકીય અખંડિતતા',
    bar: 'બાર',
    dholera_platform: 'ધોલેરા પ્લેટફોર્મ',
    hectares_monitored: 'હેક્ટર મોનિટર કરેલ',
    verified_data: 'પ્રમાણિત ડેટા',
    about_dholera_platform: 'ધોલેરા પ્લેટફોર્મ વિશે',
    verified_maps: 'પ્રમાણિત ધોલેરા સ્માર્ટ સિટી નકશા',
    realtime_updates: 'રીઅલ-ટાઇમ ઇન્ફ્રાસ્ટ્રક્ચર અપડેટ્સ',
    fee_calculator: 'વિકાસ પરવાનગી ફી કેલ્ક્યુલેટર',
    compliance_verification: 'જમીન રોકાણ અનુપાલન ચકાસણી',
    platform: 'પ્લેટફોર્મ',
    clearance_engine: 'ક્લિયરન્સ એન્જિન',
    growth_updates: 'વિકાસ અપડેટ્સ',
    my_vault: 'માય વૉલ્ટ',
    legal: 'કાનૂની',
    privacy_policy: 'ગોપનીયતા નીતિ',
    terms_of_service: 'સેવાની શરતો',
    contact: 'સંપર્ક કરો',
    airport_title: 'ધોલેરા આંતરરાષ્ટ્રીય એરપોર્ટ',
    airport_subtitle: 'ભારતના પ્રથમ સ્માર્ટ સિટીનું પ્રવેશદ્વાર.',
    infra_title: 'સ્માર્ટ ઈન્ફ્રાસ્ટ્રક્ચર',
    infra_subtitle: 'વિશ્વસ્તરીય ઔદ્યોગિક ઇકોસિસ્ટમ.',
    tp_maps_title: 'સત્તાવાર ટીપી મેપ્સ',
    featured_insights: 'ધોલેરા ઇન્વેસ્ટમેન્ટ ઇનસાઇટ્સ',
    featured_insights_desc: 'ધોલેરા સ્માર્ટ સિટી રિયલ એસ્ટેટ ડેવલપમેન્ટ પર પ્રમાણિત અપડેટ્સ અને પ્રવાહો વાંચો.',
    photo_gallery: 'ધોલેરા ફોટો ગેલેરી',
    photo_gallery_desc: 'વિકાસના પ્રત્યક્ષ પુરાવા: એક્સપ્રેસવે પ્રોગ્રેસ, એરપોર્ટ કન્સ્ટ્રક્શન અને જીઆઈએસ નકશા.',
    satyaja_plots: 'સત્યજા બ્લિસ ગ્રાન્ડ્યોર 1 અને 2',
    satyaja_tagline: 'ધોલેરા SIR માં સૌથી વિશ્વસનીય રોકાણની તક',
    book_plot_today: 'સત્યજા પ્લોટ્સ વિશે પૂછપરછ કરો',
    whatsapp_inquiry: 'વોટ્સએપ પર ચર્ચા કરો',
    read_more: 'વિશ્લેષણ વાંચો',
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = safeLocalStorage.getItem('preferred_lang') as Language | null;
    if (savedLang && translations[savedLang]) {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      safeLocalStorage.setItem('preferred_lang', lang);
    }
  }, [lang, mounted]);

  const t = (key: string) => {
    const validLang = (lang === 'en' || lang === 'hi' || lang === 'gu') ? lang : 'en';
    const dict = Object.prototype.hasOwnProperty.call(translations, validLang) ? translations[validLang] : translations['en'];
    return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : key;
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
