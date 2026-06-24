import { BrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import Router from "@/router";
import { GlobalStateProvider } from "./providers/globalContext";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import en from "@/configs/i18next/en.json";
import fr from "@/configs/i18next/fr.json";
import "./index.css";
import { PropertyProvider } from "./providers/propertyContext";
import { AdminStateProvider } from "./providers/adminContext";
import { ModuleProvider } from "./providers/moduleContext";

// import i18n from '@/configs/i18n';

i18next.init({
  interpolation: { escapeValue: false },
  lng: "auto",
  fallbackLng: "en",
  resources: {
    en: {
      global: en,
    },
    fr: {
      global: fr,
    },
  },
});

const container = document.getElementById("root")!;
ReactDOM.createRoot(container).render(
  // <StrictMode>
  //   </StrictMode>
  <I18nextProvider i18n={i18next}>
    <AdminStateProvider>
      <GlobalStateProvider>
        <ModuleProvider>
          <PropertyProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </PropertyProvider>
        </ModuleProvider>
      </GlobalStateProvider>
    </AdminStateProvider>
  </I18nextProvider>
);
