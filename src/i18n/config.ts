import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import translation from '../assets/locales/en/ns1.json';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    debug: true,
    fallbackLng: 'en', // Ensure fallback supports both variants
    resources: {
      en: {
        translation: {
          ...translation,
        },
      },
    },
  });

export default i18next;
