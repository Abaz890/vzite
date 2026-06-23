import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Echo from "laravel-echo";
import Pusher from "pusher-js";
import companyRepository from "@/repositories/company/companyRepository";

interface TokenState {
  token: string | null;
  expiresAt: number | null;
}

interface PermissionsState {
  list: string[];
}

interface SettingsState {
  list: {};
}

interface GlobalStateContextType {
  token: {
    value: string | null;
    set: (token: string) => void;
    clear: () => void;
    isValid: () => boolean;
  };
  propertiesToken: {
    value: string | null;
    set: (token: string) => void;
    clear: () => void;
    isValid: () => boolean;
  };

  backOfficeToken: {
    value: string | null;
    set: (token: string) => void;
    clear: () => void;
    isValid: () => boolean;
  };

  permissions: {
    list: string[];
    set: (permissions: string[]) => void;
    can: (requiredPermission: string) => boolean;
    canAny: (checkPermissions: string[]) => boolean;
  };

  settings: {
    list: Record<string, any>;
    set: (permissions: string[]) => void;
  };

  activeModules: {
    value: any;
  };
  company: {
    value: any;
    set: (data: any) => void;
  };
  agent: {
    value: any;
    set: (data: any) => void;
  };
  sidebarCollapse: {
    value: boolean;
    toggle: () => void;
  };
  sideSheetVisible: {
    value: boolean;
    toggle: () => void;
  };

  modalRefs: {
    addModalRef: React.RefObject<any> | null;
    editModalRef: React.RefObject<any> | null;
    deleteModalRef: React.RefObject<any> | null;
  };
  setGlobalModalRefs: (refs: Partial<GlobalStateContextType["modalRefs"]>) => void;


  darkMode: any;
  echo: any;
  globalStateLoading: boolean;
  init: () => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const [tokenState, setTokenState] = useState<TokenState>({
    token: null,
    expiresAt: null,
  });

  const [propertiesTokenState, setPropertiesTokenState] = useState<TokenState>({
    token: null,
    expiresAt: null,
  });

  const [backOfficeTokenState, setBackOfficeTokenState] = useState<TokenState>({
    token: null,
    expiresAt: null,
  });

  const [permissionsState, setPermissionsState] = useState<PermissionsState>({
    list: [],
  });

  const [settingsState, setSettingsState] = useState<SettingsState>({
    list: {},
  });

  const [activeModules, setActiveModules] = useState<[]>([]);
  const [sidebarCollapsed, setSidebarCollpased] = useState(true);
  const [sideSheetVisible, setSideSheetVisible] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(() => {
    if (!Cookies.get("darkMode")) {
      Cookies.set("darkMode", "0");
    }
    return Cookies.get("darkMode") ? parseInt(Cookies.get("darkMode")!) > 0 : 1;
  });
  const [company, setCompany] = useState();
  const [agent, setAgent] = useState<any>();
  const [echoState, setEchoState] = useState<Echo<"reverb">>();
  const [isLoading, setIsLoading] = useState(true);
  const [modalRefs, setModalRefsState] = useState<GlobalStateContextType['modalRefs']>({
    addModalRef: null,
    editModalRef: null,
    deleteModalRef: null,
  });

  const setGlobalModalRefs = (newRefs: Partial<GlobalStateContextType['modalRefs']>) => {
    setModalRefsState((prev) => ({ ...prev, ...newRefs }));
  };


  const setGlobalState = async function () {
    Pusher.logToConsole = true;
    (window as any).Pusher = Pusher;

    fetchInit();
  };

  const initEcho = async function () {
    const jwtPayload = Cookies.get("token");

    let echoPayload: any = {
      broadcaster: "reverb",
      key: import.meta.env.VITE_REVERB_KEY,
      wsHost: import.meta.env.VITE_REVERB_WS_HOST,
      wsPort: import.meta.env.VITE_REVERB_PORT,
      wssPort: import.meta.env.VITE_REVERB_PORT,
      forceTLS: import.meta.env.VITE_REVERB_FORCE_TLS === "true",
      enabledTransports: ["ws", "wss"],
    };

    if (jwtPayload) {
      echoPayload.authEndpoint = import.meta.env.VITE_BORADCAST_AUTH_URL;
      echoPayload.auth = {
        headers: {
          Authorization: `Bearer ${jwtPayload}`,
        },
      };
    }

    const echo = new Echo(echoPayload);
    setEchoState(echo as Echo<"reverb">);
  };

  const fetchInit = async function () {

    const jwtPayload = Cookies.get("token");

    if (jwtPayload) {
      setIsLoading(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtPayload}`;
      tokenMethods.set(jwtPayload);

      const companyInitResponse = await companyRepository.getCompanyInit();
      if (companyInitResponse.success) {

        if (companyInitResponse.data.properties_token) {
          propertyTokenMethods.set(companyInitResponse.data.properties_token);
          Cookies.set("props_token", companyInitResponse.data.properties_token);
        }

        if (companyInitResponse.data.backoffice_token) {
          propertyTokenMethods.set(companyInitResponse.data.backoffice_token);
          Cookies.set("backoffice_token", companyInitResponse.data.backoffice_token);
        }


        settingsMethods.set(companyInitResponse.data.company.settings);
        permissionsMethods.set(companyInitResponse.data.company.permissions);
        companyMethods.set(companyInitResponse.data.company.company);
        setActiveModules(companyInitResponse.data.modules.modules);
        setAgent(companyInitResponse.data.profile);
      }
    }
    initEcho();

    setIsLoading(false);
  };

  useEffect(() => {
    setGlobalState();
  }, []);

  const tokenMethods = {
    value: tokenState.token,
    set: (token: string) => {
      setTokenState({
        token,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });
    },
    clear: () => {
      setTokenState({ token: null, expiresAt: null });
    },
    isValid: () => {
      return !!tokenState.token && (tokenState.expiresAt ? tokenState.expiresAt! > Date.now() : true);
    },
  };

  const propertyTokenMethods = {
    value: propertiesTokenState.token,
    set: (token: string) => {
      setPropertiesTokenState({
        token,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });
    },
    clear: () => {
      setPropertiesTokenState({ token: null, expiresAt: null });
    },
    isValid: () => {
      return !!propertiesTokenState.token && (propertiesTokenState.expiresAt ? propertiesTokenState.expiresAt! > Date.now() : true);
    },
  };

  const backOfficeTokenMethods = {
    value: backOfficeTokenState.token,
    set: (token: string) => {
      setBackOfficeTokenState({
        token,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });
    },
    clear: () => {
      setPropertiesTokenState({ token: null, expiresAt: null });
    },
    isValid: () => {
      return !!propertiesTokenState.token && (propertiesTokenState.expiresAt ? propertiesTokenState.expiresAt! > Date.now() : true);
    },
  };



  const companyMethods = {
    value: company,
    set: (company: any) => {
      setCompany(company);
    },
  };

  const agentMethods = {
    value: agent,
    set: (agent: any) => {
      setAgent(agent);
    },
  };

  const sidebarmethods = {
    value: sidebarCollapsed,
    toggle: () => {
      setSidebarCollpased((pervState) => !pervState);
    },
  };

  const sidesheetmethods = {
    value: sideSheetVisible,
    toggle: () => {
      setSideSheetVisible((pervState) => !pervState);
    },
  };

  const activeModuleMethods = {
    value: activeModules,
  };

  const permissionsMethods = {
    list: permissionsState.list,

    set: (permissions: string[]) => {
      setPermissionsState({ list: permissions });
    },

    add: (permission: string) => {
      if (!permissionsState.list.includes(permission)) {
        setPermissionsState((prev) => ({
          list: [...prev.list, permission],
        }));
      }
    },

    remove: (permission: string) => {
      setPermissionsState((prev) => ({
        list: prev.list.filter((p) => p !== permission),
      }));
    },

    can: (requiredPermission: string): boolean => {
      if (!tokenMethods.isValid()) return false;
      return permissionsState.list.includes(requiredPermission);
    },

    canAny: (requiredPermissions: string[]): boolean => {
      if (!tokenMethods.isValid()) return false;
      return requiredPermissions.some((param) => permissionsState.list.includes(param));
    },
  };

  const settingsMethods = {
    list: settingsState.list,
    set: (settings: string[]) => {
      setSettingsState({ list: settings });
    }
  };



  const darkModeMethods = {
    value: darkModeEnabled,
    toggle: () => {
      Cookies.set("darkMode", !darkModeEnabled ? "1" : "0");
      setDarkModeEnabled((pervState) => !pervState);
    },
  };

  const init = () => {
    fetchInit();
  };

  const contextValue: GlobalStateContextType = {
    token: tokenMethods,
    propertiesToken: propertyTokenMethods,
    backOfficeToken: backOfficeTokenMethods,
    permissions: permissionsMethods,
    settings: settingsMethods,
    company: companyMethods,
    globalStateLoading: isLoading,
    darkMode: darkModeMethods,
    sidebarCollapse: sidebarmethods,
    sideSheetVisible: sidesheetmethods,
    activeModules: activeModuleMethods,
    agent: agentMethods,
    echo: echoState,
    modalRefs,
    setGlobalModalRefs,
    init,
  };

  return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>;
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}
