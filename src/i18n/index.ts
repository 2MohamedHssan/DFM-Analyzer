import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

// Translations resources
const resources = {
  en: {
    translation: enTranslation
  },
  ar: {
    translation: arTranslation
  }
};

i18n
  // Load translation using http
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Init i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    // Detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    
    // React settings
    react: {
      useSuspense: true,
    },
  });

// Function to change the language
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  // Update the document direction
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
};

// Initialize with the current language
const currentLanguage = i18n.language || 'en';
document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

export default i18n;