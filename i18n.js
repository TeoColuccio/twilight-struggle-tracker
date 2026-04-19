import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en/translation.json';
import it from './locales/it/translation.json';

const systemLocale = Localization.getLocales()?.[0]?.languageCode ?? 'en';
const defaultLang = systemLocale === 'it' ? 'it' : 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
  },
  lng: defaultLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
