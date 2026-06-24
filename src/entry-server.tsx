import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Router from '@/router';
import { GlobalStateProvider  } from "./providers/globalContext";
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next'
import en from '@/configs/i18next/en.json';
import fr from '@/configs/i18next/fr.json';
import './index.css';  

i18next.init({
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

export function render(url: string) {
   const html = renderToString(
    <StrictMode> 
      <I18nextProvider i18n={i18next}>
        <GlobalStateProvider>
          <StaticRouter location={url}>
            <Router />
          </StaticRouter>
        </GlobalStateProvider>
      </I18nextProvider>
    </StrictMode>,
  );
  return { html };
}