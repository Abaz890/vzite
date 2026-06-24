import i18next from 'i18next'
import en from '@/configs/i18next/en.json';
import fr from '@/configs/i18next/fr.json';



export default i18next.init({
    interpolation: { escapeValue: false },
     lng: 'auto',
     fallbackLng: 'en',
    resources: {
     en: {
      global: en,
     },
     fr: {
      global: fr,
     },
    },
   })