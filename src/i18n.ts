import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import authEN from './assets/locales/en/auth.page.json';
import settingEN from './assets/locales/en/setting.page.json';

import editPageEn from './assets/locales/en/edit.page.json';

import settingVI from './assets/locales/vi/setting.page.json';

import authVI from './assets/locales/vi/auth.page.json';

export const defaultNS = 'auth';

export const resources = {
  en: {
    ...authEN,
    setting: { ...settingEN },
    edit: { ...editPageEn },
    translation: { auth: authEN, setting: settingEN, edit: editPageEn },
  },
  vi: {
    ...authVI,
    setting: { ...settingVI },
    translation: { auth: authVI, setting: settingVI },
  },
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    debug: true,
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi'],
    lng: 'en',
    resources,
  });

export default i18next;
