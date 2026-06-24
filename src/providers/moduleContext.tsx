import React, { createContext, useContext, useState } from "react";
import { useGlobalState } from "./globalContext";

export type ModuleStateContextType = {
    isModuleLoading: {
        value: boolean
        set: (val: boolean) => void,
    };
    isModuleItemsLoading: {
        value: boolean
        set: (val: boolean) => void,
    };
    moduleId: {
        value: string;
        set: (name: string) => void;
    };
    moduleName: {
        value: string;
        set: (name: string) => void;
    };
    moduleTitle: {
        value: string;
        set: (title: string) => void;
    };
    moduleDefaultView: {
        value: string;
        set: (view: string) => void;
    };
    customFilter: {
        value: string;
        set: (filter: string) => void;
    };
    isKanbanEnabled: {
        value: boolean;
        set: (enabled: boolean) => void;
    };
    isQuickCreateEnabled: {
        value: boolean;
        set: (enabled: boolean) => void;
    };
    moduleFields: {
        value: any[];
        set: (fields: any[]) => void;
    };
    moduleFilters: {
        value: any[];
        set: (filters: any[]) => void;
    };
    moduleActiveFilters: {
        value: string;
        set: (filters: string) => void;
        includes: (filter: string) => boolean;
    };
    allowedActionRoutes: {
        value: string[];
        set: (routes: string[]) => void;
    };
    moduleTab: {
        value: string,
        set: (value: string) => void;
    },
    moduleKanbanGroup: {
        value: string,
        set: (value: string) => void;
    },
    selectedTasks: {
        value: string[],
        toggle: (value: string) => void;
        clear: () => void;
        set: (value: string[]) => void;
        isTaskSelected: (task: string) => boolean;
    },
    isMultiSelectMode: {
        value: boolean,
        set: (value: boolean) => void
    },
    selectedAgentToAssign: {
        value: string,
        set: (value: string) => void
    },
    isAssignModalOpen: {
        value: boolean,
        set: (value: boolean) => void
    },
    setModule: (data: any, module_id: string) => void;
    clearModule: () => void;
};

const ModuleStateContext = createContext<ModuleStateContextType | undefined>(undefined);

export function ModuleProvider({ children }: { children: React.ReactNode }) {

    const [isLoading, setIsLoading] = useState(true);
    const [isItemsLoading, setIsItemsLoading] = useState(true);
    const [module_id, setModuleId] = useState('');
    const [module_name, setModuleName] = useState('');
    const [module_title, setModuleTitle] = useState('');
    const [module_default_view, setModuleDefaultView] = useState('');
    const [customFilter, setCustomFilter] = useState('');
    const [isKanbanEnabled, setIsKanbanEnabled] = useState(false);
    const [isQuickCreateEnabled, setIsQuickCreateEnabled] = useState(false);
    const [module_fields, setModuleFields] = useState<any[]>([]);
    const [module_filters, setModuleFilters] = useState<any[]>([]);
    const [module_active_filters, setModuleActiveFilters] = useState('');
    const [allowedActionRoutes, setAllowedActionRoutes] = useState<string[]>([]);
    const [module_tab, setModuleTab] = useState('list');
    const [module_kanban_group, setModuleKanbanGroup] = useState('status');
    const [selectedTasks, setSelectedTasks] = useState<string[]>([])
    const [isMultiSelectMode, setIsMultiSelectMode] = useState(false)
    const [selectedAgentToAssign, seSelectedAgentToAssign] = useState('');
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const { agent } = useGlobalState();

    const isModuleLoadingMethods = {
        value: isLoading,
        set: (val: boolean) => setIsLoading(val),
    }

    const isModuleItemsLoadingMethods = {
        value: isItemsLoading,
        set: (val: boolean) => setIsItemsLoading(val),
    }

    const moduleIdMethods = {
        value: module_id,
        set: (name: string) => setModuleId(name),
    };

    const moduleNameMethods = {
        value: module_name,
        set: (name: string) => setModuleName(name),
    };

    const moduleTitleMethods = {
        value: module_title,
        set: (title: string) => setModuleTitle(title),
    };

    const moduleDefaultViewMethods = {
        value: module_default_view,
        set: (view: string) => setModuleDefaultView(view),
    };

    const customFilterMethods = {
        value: customFilter,
        set: (filter: string) => setCustomFilter(filter),
    };

    const isKanbanEnabledMethods = {
        value: isKanbanEnabled,
        set: (enabled: boolean) => setIsKanbanEnabled(enabled),
    };

    const isQuickCreateEnabledMethods = {
        value: isQuickCreateEnabled,
        set: (enabled: boolean) => setIsQuickCreateEnabled(enabled),
    };

    const moduleFieldsMethods = {
        value: module_fields,
        set: (fields: any[]) => setModuleFields(fields),
    };

    const moduleFiltersMethods = {
        value: module_filters,
        set: (filters: any[]) => setModuleFilters(filters),
    };
    const moduleActiveFiltersMethods = {
        value: module_active_filters,
        set: (filters: string) => (console.log('am on set active modue and value of active filters is ', filters), setModuleActiveFilters(filters)),
        includes: (filter: string) => module_active_filters.split(',').includes(filter)
    };

    const moduleTabMethods = {
        value: module_tab,
        set: (tab: string) => setModuleTab(tab),
    };

    const moduleKanbanGroupMethods = {
        value: module_kanban_group,
        set: (value: string) => setModuleKanbanGroup(value),
    };

    const allowedActionRoutesMethods = {
        value: allowedActionRoutes,
        set: (routes: string[]) => (setAllowedActionRoutes(routes)),
    };

    const selectedTasksMethods = {
        value: selectedTasks,
        toggle: (taskId: string) =>
            setSelectedTasks(prev => {
                if (prev.includes(taskId)) {
                    return prev.filter(id => id !== taskId);
                } else {
                    return [...prev, taskId];
                }
            }),
        clear: () => setSelectedTasks([]),
        set: (tasks: string[]) => setSelectedTasks(tasks),
        isTaskSelected: (task: string) => selectedTasks.includes(task)
    }

    const isMultiSelectModeMethods = {
        value: isMultiSelectMode,
        set: (val: boolean) => setIsMultiSelectMode(val)
    }

    const selectedAgentToAssignMethods = {
        value: selectedAgentToAssign,
        set: (val: any) => seSelectedAgentToAssign(val)
    }

    const isAssignModalOpenMethods = {
        value: isAssignModalOpen,
        set: (val: boolean) => setIsAssignModalOpen(val)
    }

    const setModule = (data: any, module_id: string) => {
        moduleIdMethods.set(module_id);
        moduleTitleMethods.set(data.title);
        moduleNameMethods.set(data.name);
        moduleFieldsMethods.set(data.fields);
        moduleFiltersMethods.set(data.filters);
        const location = window.location;
        const path = location.pathname;
        let default_view = data.default_view
        if (path.endsWith("/list")) {
            default_view = 'list';
        }
        if (path.endsWith("/kanban")) {
            default_view = 'kanban';
        }


        moduleTabMethods.set(default_view);
        moduleDefaultViewMethods.set(data.default_view);
        isKanbanEnabledMethods.set(data.isKanbanEnabled);
        isQuickCreateEnabledMethods.set(data.isQuickCreateEnabled);
        moduleKanbanGroupMethods.set(agent.value.is_admin && data.name === 'management' ? 'agent' : 'status')

        const allowedRoutes = [
            `/company/module/${module_id}/list`,
            `/company/module/${module_id}/kanban`,
        ];
        allowedActionRoutesMethods.set(allowedRoutes)
        const filters: string[] = data.filters
            .filter((filter: { isActiveByDefault: boolean }) => filter.isActiveByDefault)
            .map((filter: { permalink: string }) => filter.permalink);
        const ffilters = filters.join(',');
        setModuleActiveFilters(ffilters);


        setIsLoading(false);
    };

    const clearModule = () => {
        isModuleItemsLoadingMethods.set(true);
        isModuleLoadingMethods.set(true);
        moduleIdMethods.set('');
        moduleTitleMethods.set('');
        moduleNameMethods.set('');
        moduleFieldsMethods.set([]);
        moduleFiltersMethods.set([]);
        moduleActiveFiltersMethods.set('');
        moduleDefaultViewMethods.set('');
        isKanbanEnabledMethods.set(false);
        isQuickCreateEnabledMethods.set(false);
        allowedActionRoutesMethods.set([]);
        customFilterMethods.set('');
        moduleActiveFiltersMethods.set('');
        moduleKanbanGroupMethods.set('status');
        moduleTabMethods.set('list')
    };

    const contextValue: ModuleStateContextType = {
        isModuleLoading: isModuleLoadingMethods,
        isModuleItemsLoading: isModuleItemsLoadingMethods,
        moduleId: moduleIdMethods,
        moduleName: moduleNameMethods,
        moduleTitle: moduleTitleMethods,
        moduleDefaultView: moduleDefaultViewMethods,
        customFilter: customFilterMethods,
        isKanbanEnabled: isKanbanEnabledMethods,
        isQuickCreateEnabled: isQuickCreateEnabledMethods,
        moduleFields: moduleFieldsMethods,
        moduleFilters: moduleFiltersMethods,
        allowedActionRoutes: allowedActionRoutesMethods,
        moduleActiveFilters: moduleActiveFiltersMethods,
        moduleTab: moduleTabMethods,
        moduleKanbanGroup: moduleKanbanGroupMethods,
        selectedTasks: selectedTasksMethods,
        isMultiSelectMode: isMultiSelectModeMethods,
        selectedAgentToAssign: selectedAgentToAssignMethods,
        isAssignModalOpen: isAssignModalOpenMethods,
        setModule,
        clearModule
    }

    return <ModuleStateContext.Provider value={contextValue} > {children}</ModuleStateContext.Provider >;
}

export function useModuleState() {
    const context = useContext(ModuleStateContext);
    if (context === undefined) {
        throw new Error("useModuleState must be used within a ModuleStateProvider");
    }
    return context;
}
