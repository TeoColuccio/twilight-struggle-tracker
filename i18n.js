import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import en from './locales/en.json';
import it from './locales/it-IT/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    // en: { translation: en },
    it: { translation: it },
  },
  lng: 'it', // lingua predefinita
  // fallbackLng: 'en', // lingua di riserva
  interpolation: {
    escapeValue: false, // react già protegge da XSS
  },
});

export default i18n;
