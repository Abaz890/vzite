import { ChevronLeft, FolderKanban, Kanban, List, ListFilter, RotateCw, Trash2, Users, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "@/providers/globalContext";
import { ModuleField } from "../moduleField";
import { Card, CardContent } from "../ui/card";
import { Spinner } from "../ui/spinner";
import { useModuleState } from "@/providers/moduleContext";
import { Badge } from "../ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DeleteConfirmationModal, DeleteConfirmationModalRef } from "../deleteConfirmationDialog";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { SelectDynamic } from "@/components/ui/selectDynamic";
import companyAgentRepository from "@/repositories/company/companyAgentRepository";
import companyModuleRepository from "@/repositories/company/companyModuleRepository";
import { ToastAction } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";

export default function ModuleActions({ add_modal_ref, onRefresh }: { add_modal_ref: any; onRefresh: () => void; }) {
  interface FormData {
    [key: string]: string;
  }

  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    moduleKanbanGroup,
    moduleTab,
    moduleId,
    isQuickCreateEnabled,
    isKanbanEnabled,
    moduleName,
    moduleTitle,
    moduleFilters,
    moduleFields,
    moduleActiveFilters,
    customFilter,
    isMultiSelectMode,
    selectedTasks,
    isAssignModalOpen,
    selectedAgentToAssign
  } = useModuleState();
  const { agent, permissions, darkMode } = useGlobalState();
  const modalRef = add_modal_ref;
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);
  const [filterFormData, setfilterFormData] = useState<FormData>({});
  const deleteModalRef = useRef<DeleteConfirmationModalRef>(null)
  const [adminAgent, setAdminAgent] = useState<any>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        selectedAgentToAssign.set('');
        isMultiSelectMode.set(false);
        selectedTasks.clear();
        setIsFilterActive(false)
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);



  const handleActiveViewChange = function (value: string) {
    moduleTab.set(value);
    navigate(`/company/module/${moduleId.value}/${value}`);
  };

  const handleOnAddClick = function () {
    if (isQuickCreateEnabled.value) {
      modalRef.current?.toggleModal(false, {
        name: moduleName,
        title: moduleTitle,
        permalink: moduleId.value,
      });
    } else {
      navigate(`/company/module/${moduleId.value}/create`);
    }
  };

  const toggleFilter = function () {
    setIsFilterActive(!isFilterActive);
  };

  const handleFilterUpdate = function (data: any) {
    setfilterFormData(data);
    const filterFormToParans = Object.entries(data)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number | boolean)}`)
      .join("&");
    customFilter.set(filterFormToParans)
  };

  const handleRefreshLoadingDoneEvent = function () {
    setIsRefreshLoading(false);
  };

  const handleAddFilter = function (id: string) {

    const currentFilters = moduleActiveFilters.value
      ? moduleActiveFilters.value.split(',')
      : [];

    if (!currentFilters.includes(id)) {
      currentFilters.push(id);
      moduleActiveFilters.set(currentFilters.join(','));
    }

  }

  const handleRemoveFilter = function (id: string) {
    const newActiveFilters = moduleActiveFilters.value.split(',').filter((activeFilter) => { return activeFilter !== id });
    moduleActiveFilters.set(newActiveFilters.join(','));
  };

  const handleBulkDeleteClick = () => {
    if (selectedTasks.value.length === 0) return
    deleteModalRef.current?.toggleModal('_')
  }

  const handleBulkAssignClick = () => {
    isAssignModalOpen.set(true);
  }

  const fetchAgents = async function (page: number) {

    const response: any = await companyAgentRepository.getAgentList(page);
    //id of the admin
    if (response.success) {
      const admin_agent = response.data.data.find((agent: { is_admin: boolean }) => agent.is_admin === true)
      if (admin_agent) {
        setAdminAgent(admin_agent);
        selectedAgentToAssign.set(admin_agent.id)
      }
    }
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.id.toString(), })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  };


  const handleBulkAssign = async () => {
    const response = await companyModuleRepository.bulkAssignModuleItem(moduleId.value, selectedTasks.value, selectedAgentToAssign.value)
    if (response.success) {
      onRefresh();
      exitMultiSelectMode()

    }
    isAssignModalOpen.set(false);
    toast({
      variant: response.success ? "default" : "destructive",
      duration: 800,
      className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      title: response.message,
      action: <ToastAction altText="close">close</ToastAction>,
    });
  }

  const exitMultiSelectMode = () => {
    isMultiSelectMode.set(false)
    selectedTasks.clear();
    selectedAgentToAssign.set('')
  }



  const handleBulkDelete = async () => {

    const response = await companyModuleRepository.bulkDeleteModuleItem(moduleId.value, selectedTasks.value)
    if (response.success) {
      exitMultiSelectMode();
      onRefresh();
      exitMultiSelectMode();
    }
    toast({
      variant: response.success ? "default" : "destructive",
      duration: 800,
      className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      title: response.message,
      action: <ToastAction altText="close">close</ToastAction>,
    });

  }



  useEffect(() => {
    window.addEventListener("itemsRefreshDone", handleRefreshLoadingDoneEvent);

    return () => {
      window.removeEventListener("itemsRefreshDone", handleRefreshLoadingDoneEvent);
    };
  });

  return (
    <>
      <div className="flex flex-col ">
        <div className="mb-2 flex gap-4 items-end">
          <div>
            <Button className="h-7 w-7" variant={'outline'} onClick={() => navigate(-1)} disabled={window.history.length == 0}><ChevronLeft /></Button>
          </div>
          <div className={`flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0  ${darkMode.value && 'text-white'}`} >{moduleTitle.value}</div>
        </div>
        <div className="flex justify-between mb-5">
          <div className="flex gap-2">
            {isKanbanEnabled.value ? (
              <Tabs defaultValue={moduleTab.value} value={moduleTab.value} onValueChange={(value) => handleActiveViewChange(value)}>
                <TabsList className="bg-gray-100/10 p-1 rounded-md py-5">
                  <TabsTrigger className={`${darkMode.value ? "data-[state=active]:bg-transparent data-[state=active]:border-gray-300 data-[state=active]:border-b-2 text-white data-[state=active]:text-white rounded-none" : ""} p-5 h-1 gap-1`} value="list" disabled={isRefreshLoading}>
                    <List />
                  </TabsTrigger>
                  <TabsTrigger className={`${darkMode.value ? "data-[state=active]:bg-transparent data-[state=active]:border-gray-300 data-[state=active]:border-b-2 text-white data-[state=active]:text-white rounded-none" : ""} p-5 h-1 gap-1`} value="kanban" disabled={isRefreshLoading}>
                    <Kanban />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            ) : (
              <></>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsRefreshLoading(true);
                onRefresh();
              }}
              className={` ${darkMode.value ? "bg-gray-100/10 text-white border-slate-300 border-1" : ""}   p-5 h-1 gap-1 `}
              disabled={isRefreshLoading}
            >
              {isRefreshLoading ? <Spinner></Spinner> : <RotateCw className="h-3.5 w-3.5" />}</Button>

            <div className="flex justify-center">
              {
                agent.value.is_admin && moduleName.value === 'management' && moduleTab.value === 'kanban' ?
                  <ToggleGroup
                    type="single"
                    value={moduleKanbanGroup.value}
                    onValueChange={(value) => moduleKanbanGroup.set(value)}
                    className="border rounded-lg px-1 bg-white"
                  >
                    <ToggleGroupItem
                      value="status"
                      className="flex items-center gap-2 px-4 py-2 data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:shadow-sm"
                    >
                      <FolderKanban className="h-4 w-4" />
                      Group by Status
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="agent"
                      className="flex items-center gap-2 px-4 py-2 data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:shadow-sm"
                    >
                      <Users className="h-4 w-4" />
                      Group by Agents
                    </ToggleGroupItem>
                  </ToggleGroup>
                  : null
              }
            </div>


          </div>
          <div className="flex items-center">
            <div className="flex gap-2 mx-2">
              <AnimatePresence initial={false}>
                {
                  moduleFilters.value.map((filter: { name: string; permalink: string; isActiveByDefault: boolean }, key: number) => {
                    return moduleActiveFilters.includes(filter.permalink) ?
                      <motion.div
                        key={filter.permalink}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.08 }}
                      >
                        < Badge key={key} variant={'outline'} className={`bg-white flex items-center gap-2 p-2 rounded-full ${isRefreshLoading ? 'opacity-50' : ''} `} >
                          <div className="">
                            {filter.name}
                          </div>
                          <X onClick={() => !isRefreshLoading ? handleRemoveFilter(filter.permalink) : null} size={10} className="cursor-pointer"></X>
                        </Badge>
                      </motion.div>
                      : <></>
                  })
                }
              </AnimatePresence>
            </div>
            <Button size="sm" variant="outline" className={`${darkMode.value ? "bg-gray-100/10 text-white border-slate-300 border-1" : ""} p-5 h-1 gap-1 me-2 `} onClick={() => toggleFilter()} disabled={isRefreshLoading}>
              <ListFilter className="h-3.5 w-3.5" />
              <Badge >{moduleActiveFilters.value.length > 0 ? moduleActiveFilters.value.split(',').length : 0}</Badge>
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
            </Button>
            {/* {permissions.can(`${module_name}_import_items`) ? (
            <Button size="sm" variant="outline" className={`${darkMode.value ? "bg-gray-100/10 text-white border-slate-300 border-1" : ""} p-5 h-1 gap-1 me-2 `} onClick={() => navigate(`/company/module/${module_id}/import`)} disabled={isRefreshLoading}>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Import</span>
            </Button>
          ) : (
            <></>
          )} */}
            {permissions.can(`${moduleName.value}_add_item`) ? (
              <Button size="sm" onClick={() => handleOnAddClick()} className="text-white p-5 h-1 gap-1" disabled={isRefreshLoading}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add {moduleTitle.value}</span>
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <AnimatePresence>
          {
            isFilterActive ? (
              <motion.div
                layout
                key="filter-card"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.08 }}
              >
                <Card className="mb-5">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-3 bg-slate-200 rounded-s-lg border-e-2 p-4">
                        {
                          moduleFilters.value.map((filter: { id: number; name: string; permalink: string }) => (
                            <div key={filter.id} onClick={() => handleAddFilter(filter.permalink)} className="cursor-pointer">
                              {filter.name}
                            </div>
                          ))
                        }
                      </div>
                      <div className="grid grid-cols-12 gap-4 m-4 col-span-9 p-4">
                        {moduleFields.value.map((module_field: any, field_key: number) =>
                          ["text", "select", "select_relational"].includes(module_field.type) ? (
                            <div className="col-span-3" key={field_key}>
                              <ModuleField module_field={module_field} formData={filterFormData} onModuleFieldUpdated={(data) => handleFilterUpdate(data)} enableAddRelatedItems={false}></ModuleField>
                            </div>
                          ) : (
                            <></>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <></>
            )
          }
        </AnimatePresence>
        {
          isMultiSelectMode.value ?
            <Card className="mb-2">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">
                      {selectedTasks.value.length} Selected
                    </div>
                    {
                      moduleName.value !== 'customer' ?
                        <Button variant="outline" onClick={() => handleBulkAssignClick()} disabled={selectedTasks.value.length === 0}>
                          <Users className="mr-2 h-4 w-4" />
                          Assign To
                        </Button>
                        : <></>
                    }
                    <Button variant="destructive" onClick={() => handleBulkDeleteClick()} disabled={selectedTasks.value.length === 0}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                  <div className="">
                    <Button variant="outline" onClick={() => exitMultiSelectMode()}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            : <></>
        }

      </div >



      <Dialog open={isAssignModalOpen.value} onOpenChange={(open) => { isAssignModalOpen.set(open), selectedTasks.clear() }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Selected Items </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label >
              Select Agnet
            </Label>
            <SelectDynamic
              name="agent"
              field={{ value: selectedAgentToAssign.value }}
              defaultValue={adminAgent ? { label: adminAgent.name, value: adminAgent.value } : undefined}
              onChange={(value) => {
                selectedAgentToAssign.set(value)
              }}
              disabled={!agent.value.is_admin}
              fetchOptions={async (page) => await fetchAgents(page)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!selectedAgentToAssign} onClick={() => handleBulkAssign()}  >Assign To Agent</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DeleteConfirmationModal ref={deleteModalRef} onSubmit={() => handleBulkDelete()} />

    </>
  );
}
