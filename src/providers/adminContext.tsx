import React, { createContext, useContext, useEffect, useState } from "react";
import Pusher from "pusher-js";

interface TokenState {
  token: string | null;
  expiresAt: number | null;
}

interface PermissionsState {
  list: string[];
}

interface AdminStateContextType {
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
  permissions: {
    list: string[];
    set: (permissions: string[]) => void;
    can: (requiredPermission: string) => boolean;
    canAny: (checkPermissions: string[]) => boolean;
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
  adminStateLoading: boolean;
  init: () => void;
}


const AdminStateContext = createContext<AdminStateContextType | undefined>(undefined);

export function AdminStateProvider({ children }: { children: React.ReactNode }) {
  const [tokenState, setTokenState] = useState<TokenState>({
    token: null,
    expiresAt: null,
  });

  const [propertiesTokenState, setPropertiesTokenState] = useState<TokenState>({
    token: null,
    expiresAt: null,
  });

  const [permissionsState, setPermissionsState] = useState<PermissionsState>({
    list: [],
  });

  const [sidebarCollapsed, setSidebarCollpased] = useState(true);
  const [sideSheetVisible, setSideSheetVisible] = useState(false);

  const [company, setCompany] = useState();
  const [agent, setAgent] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const setAdminState = async function () {
    fetchInit();
  };

  const fetchInit = async function () {
    Pusher.logToConsole = true;
    (window as any).Pusher = Pusher;

    setIsLoading(false);
  };

  useEffect(() => {
    setAdminState();
  }, []);

  const tokenMethods = {
    value: tokenState.token,
    set: (token: string) => {
      setTokenState({
        token,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, //24h
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
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, //24h
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

  const init = () => {
    fetchInit();
  };

  const contextValue: AdminStateContextType = {
    token: tokenMethods,
    propertiesToken: propertyTokenMethods,
    permissions: permissionsMethods,
    company: companyMethods,
    adminStateLoading: isLoading,
    sidebarCollapse: sidebarmethods,
    sideSheetVisible: sidesheetmethods,
    agent: agentMethods,
    // unreadNotifications: 
    init,
  };

  return <AdminStateContext.Provider value={contextValue}>{children}</AdminStateContext.Provider>;
}

export function useAdminState() {
  const context = useContext(AdminStateContext);
  if (context === undefined) {
    throw new Error("useAdminState must be used within a AdminStateProvider");
  }
  return context;
}
