import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropContext, Draggable, DraggableLocation, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "@/components/modules/kanban/StrictModeDroppable";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import companyModuleRepository from "@/repositories/company/companyModuleRepository";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { SkeletonKanban } from "@/components/skeletonKanban";
import { ChevronDown, ChevronUp, Trash2, Pencil, MessageCircle, TriangleAlert, User, StickyNote, FileText, FilePlus, ScreenShare, Link, Database } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useGlobalState } from "@/providers/globalContext";
import { debounce, getInitials, numberWithCommas } from "@/lib/utils";
import { StrictModeSafeDroppable } from "@/components/StrictModeSafeDroppable";
import { useModuleState } from "@/providers/moduleContext";
import { motion } from 'framer-motion';


export default function CompanyModuleKanban() {
  interface Column {
    is_excluded: any;
    id: number;
    title: string;
    value: string;
    color: string;
  }

  interface Group {
    id: number;
    name: string;
    title: string;
  }

  interface Data {
    data: any;
    columns: Column[];
    groups: Group[];
  }

  const { toast } = useToast();

  const context: any = useOutletContext();
  let navigate = useNavigate();
  const { darkMode, globalStateLoading, echo, agent } = useGlobalState();
  const [module_data, setModuleData] = useState<Data>();
  const [, setError] = useState<string>("");
  const [nonCollapsed, setNonCollapsed] = useState<number[]>([]);
  const [nonCollapsedEmail, setNonCollapsedEmail] = useState<string[]>([]);
  const [showExecluded, setShowExecluded] = useState(false);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    moduleKanbanGroup,
    isModuleLoading,
    isModuleItemsLoading,
    moduleId,
    isQuickCreateEnabled,
    moduleName,
    moduleFields,
    moduleActiveFilters,
    customFilter,
    selectedTasks,
    isAssignModalOpen,
    isMultiSelectMode
  } = useModuleState();


  const clear = () => {
    setModuleData({
      data: {},
      columns: [],
      groups: [],
    });
    setError("");
    setNonCollapsed([]);
    setNonCollapsedEmail([]);
    // setRelatedItemNonCollapsed({});
  };

  const fetchItems = async () => {

    try {

      const items: any = await companyModuleRepository.getModuleItemsKanban(moduleKanbanGroup.value, moduleId.value!, moduleActiveFilters.value, customFilter.value);

      setShowExecluded(false);
      clear();
      //get module items   
      if (items.success) {
        setModuleData(items.data);
      } else {
        if (items.message === "you dont have permission to list item") {
          navigate("/404");
        }
      }
    } catch (err) {
      setError("unable to load ");
    }

    isModuleItemsLoading.set(false);
    const event = new CustomEvent("itemsRefreshDone", {});
    window.dispatchEvent(event);
  };

  const onDragEnd = async (result: DropResult) => {
    try {
      const { source, destination } = result;

      // Early exit conditions
      if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
        return;
      }

      if (!module_data?.data) {
        console.error("Module data is undefined");
        return;
      }

      // Handle delete operation
      if (destination.droppableId === "delete") {
        await handleDeleteOperation(source);
        return;
      }

      // Handle move between columns
      await handleColumnMove(source, destination);
    } catch (error) {
      console.error("Drag operation failed:", error);
      toast({
        variant: "destructive",
        duration: 2000,
        title: "unable to update",
        description: "There was an error processing your request",
      });
    } finally {
      setShowExecluded(false);
      // setIsDraging(false);
    }
  };

  // Helper functions
  const handleDeleteOperation = async (source: DraggableLocation) => {
    const sourceColIndex = parseInt(source.droppableId, 10);
    const sourceColKey = module_data!.columns[sourceColIndex]?.value;

    if (!sourceColKey) {
      console.error("Invalid source column");
      return;
    }

    const sourceCol = module_data!.data[sourceColKey];
    const sourceItems = [...sourceCol.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    // Optimistic update
    const newData = {
      ...module_data!.data,
      [sourceColKey]: {
        ...sourceCol,
        items: sourceItems,
        total_count: Math.max(sourceCol.total_count - 1, 0),
        total_amount: sourceCol.has_total_amount ? Math.max(parseInt(sourceCol.total_amount) - parseInt(movedItem.amount), 0) : sourceCol.total_amount,
      },
    };

    setModuleData((prev) => (prev ? { ...prev, data: newData } : prev));

    // API call
    const response = await companyModuleRepository.deleteModuleItem(movedItem.it_name, moduleId.value);
    if (response.success) {
      showSuccessToast("Item successfully deleted");
    }
  };

  const handleColumnMove = async (source: DraggableLocation, destination: DraggableLocation) => {
    const sourceColIndex = parseInt(source.droppableId, 10);
    const destColIndex = parseInt(destination.droppableId, 10);

    // Validate columns
    const sourceColKey = module_data!.columns[sourceColIndex]?.value;
    const destColKey = module_data!.columns[destColIndex]?.value;
    if (!sourceColKey || !destColKey) {
      console.error("Invalid columns");
      return;
    }

    const sourceCol = module_data!.data[sourceColKey];
    const destCol = module_data!.data[destColKey];

    // Clone items
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [movedItem] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, movedItem);

    // Prepare new data state
    const newData = {
      ...module_data!.data,
      [sourceColKey]: {
        ...sourceCol,
        items: sourceItems,
        total_count: sourceCol.total_count - 1,
        total_amount: sourceCol.has_total_amount ? parseInt(sourceCol.total_amount) - parseInt(movedItem.amount) : sourceCol.total_amount,
      },
      [destColKey]: {
        ...destCol,
        items: destItems,
        total_count: destCol.total_count + 1,
        total_amount: destCol.has_total_amount ? parseInt(destCol.total_amount) + parseInt(movedItem.amount) : destCol.total_amount,
      },
    };

    // Optimistic update
    setModuleData((prev) => (prev ? { ...prev, data: newData } : prev));

    // Prepare API data
    // const sortingData: { [key: string]: string[] } = {};
    // Object.entries(newData).forEach(([key, column]: any) => {
    //   sortingData[key] = column!.items.map((item: { it_name: any }) => item.it_name);
    // });

    let response;
    if (moduleKanbanGroup.value === 'status') {
      response = await companyModuleRepository.updateModuleItemsKanbanSorting(moduleId.value, {
        group: "status",
        item_id: movedItem.it_name,
        to_column: destColKey,
        to_position: destination.index,
      });
    }
    if (moduleKanbanGroup.value === 'agent') {
      response = await companyModuleRepository.bulkAssignModuleItem(moduleId.value, [movedItem.it_name], destColKey)
    }

    if (response && response.success) {
      showSuccessToast(response.message);
      if (moduleKanbanGroup.value === 'agent') {
        await fetchItems();
      }
      handlePaginationCheck(sourceCol, sourceColKey);

    }
  };

  const showSuccessToast = (message: string) => {
    toast({
      variant: "default",
      duration: 800,
      className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      title: message,
      action: <ToastAction altText="close">close</ToastAction>,
    });
  };

  const handlePaginationCheck = (sourceCol: any, sourceColKey: string) => {
    if (sourceCol.last_page > 0 && sourceCol.items.length < 10 && sourceCol.total_count - sourceCol.items.length > 10) {
      fetchPaginationItems(sourceColKey);
    }
  };

  const onDragStart = async () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    setShowExecluded(true);
    // setIsDraging(true);
  };

  const fetchPaginationItems = async (column: string) => {
    const nextPage = module_data?.data![column].page + 1;
    if (nextPage <= module_data?.data![column].last_page) {
      const data = {
        group: moduleKanbanGroup.value,
        column,
        page: nextPage,
        filter: moduleActiveFilters.value,
        custom_filter: customFilter.value
      };

      const newData = await companyModuleRepository.getModuleItemsKanbanPagination(moduleId.value, data);
      if (newData.success) {
        const newModuleData = { ...module_data };
        newModuleData.data[column].items = [...newModuleData.data[column].items, ...newData.data];
        newModuleData.data[column].page = nextPage;
        setModuleData({
          ...module_data,
          data: { ...module_data!.data },
          columns: module_data!.columns,
          groups: module_data!.groups,
        });
      }
    }
  };

  const handleItemClicked = async function (id: string) {
    if (isQuickCreateEnabled.value) {
      context.edit_moduel_item_ref.editModalRef.current.toggleModal(id, moduleId.value);
    } else {
      if (["deal", "management"].includes(moduleName.value)) {
        navigate(`/company/module/${moduleId.value}/${id}/view`);
      } else {
        navigate(`/company/module/${moduleId.value}/${id}/edit`);
      }
    }
  };


  const handleDeleteItemClicked = async function (itemId: number) {
    setShowExecluded(false);
    context.delete_moduel_item_ref.deleteModalRef.current.toggleModal(itemId, moduleId.value);
  };

  const toggleCollapseCard = function (id: number) {
    if (nonCollapsed.includes(id)) {
      setNonCollapsed((prevArray) => prevArray.filter((item) => item !== id));
    } else {
      setNonCollapsed((prevArray) => [...prevArray, id]);
    }
  };

  const toggleCustomerEmail = function (email: string) {
    if (!nonCollapsedEmail.includes(email)) {
      setNonCollapsedEmail((prevArray) => [...prevArray, email]);
    }

    // if (!nonCollapsed.includes(id)) {
    //   setNonCollapsed((prevArray) => [...prevArray, id]);
    // }
  };

  function CompanyModuleKanbanCardContent(module_fields: any[], item: { [x: string]: any }) {
    return module_fields.map((module_field: any) => {
      if (item[module_field.name] !== "" && item[module_field.name] !== null) {
        if (module_field.type === "text") {
          if (module_field.name === "action") {
            //hide action type if buy or sell
            if (item[module_field.name] === "buy" || item[module_field.name] === "sale") {
              return <></>;
            }
          }
          //hide source
          if (module_field.name === "source") {
            return <></>
          }

          //hide title 
          if (module_field.name === "title") {
            return <></>
          }

          if (module_field.name === "property_reference_id") {
            return <></>
          }

          //default
          return (
            <div className="font-light">
              <span className="font-light">{item[module_field.name]}</span>
            </div>
          );
        }

        if (module_field.type === "number") {
          if (module_field.name === "amount") {
            if (parseInt(item[module_field.name]! as string) > 0) {
              return (
                <>
                  {module_field.name}: <span className="font-light">{numberWithCommas(item[module_field.name] as string)}</span>
                </>
              );
            } else {
              return <></>;
            }
          }

          //default
          return (
            <div className="font-light">
              <span className="font-light">{item[module_field.name]}</span>
            </div>
          );
        }

        if (module_field.type === "select_relational") {
          if (module_field.name === "customer_id" && item.customer_id !== null && "customer" in item.related_items) {
            return (
              <div className={`flex-col mb-1 w-[80%]`}>
                <div className="">
                  <div className="text-[10px] font-medium">{item.related_items.customer.name}</div>
                  <div className="text-[10px] font-medium flex">
                    {item.related_items.customer.phone}

                    {!nonCollapsedEmail.includes(item.related_items.customer.email) ? (
                      item.related_items.customer.email !== "" ? (
                        <span className="mx-2 cursor-pointer text-blue-500 flex items-center" onClick={() => toggleCustomerEmail(item.related_items.customer.email)}>
                          Email <ChevronDown size={10}></ChevronDown>
                        </span>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                  {nonCollapsedEmail.includes(item.related_items.customer.email) ? <div className="text-[10px] font-medium">{item.related_items.customer.email}</div> : <></>}
                </div>
              </div>
            );
          }
        }

        if (module_field.type === "textarea" && item[module_field.name] !== null) {
          return (
            <div className="font-light">
              <span className="font-light">{item[module_field.name]}</span>{" "}
            </div>
          );
        }
      }
    });
  }

  const handleSingleAssignClick = (item_id: string) => {
    selectedTasks.toggle(item_id)
    isAssignModalOpen.set(true);
  }

  useEffect(() => {
    const fetchData = debounce(() => {
      if (moduleId.value && !isModuleLoading.value) {
        isModuleItemsLoading.set(true);
        fetchItems();
      }
    }, 300);

    fetchData("dependency-change");

    return () => {
      fetchData.cancel?.();
    };
  }, [
    moduleId.value,
    moduleActiveFilters.value,
    customFilter.value,
    moduleKanbanGroup.value,
    isModuleLoading.value
  ]);

  useEffect(() => {
    if (!moduleId.value) return;

    const handleItemEvent = () => fetchItems();
    const handleRefreshEvent = () => (isModuleItemsLoading.set(true), fetchItems());
    const handleFilterEvent = () => fetchItems();

    window.addEventListener("itemAdded", handleItemEvent);
    window.addEventListener("itemUpdated", handleItemEvent);
    window.addEventListener("itemsRefresh", handleRefreshEvent);
    window.addEventListener("filterUpdated", handleFilterEvent);

    return () => {
      window.removeEventListener("itemAdded", handleItemEvent);
      window.removeEventListener("itemUpdated", handleItemEvent);
      window.removeEventListener("itemsRefresh", handleRefreshEvent);
      window.removeEventListener("filterUpdated", handleFilterEvent);
    };
  }, [moduleId.value]);

  useEffect(() => {
    if (!moduleId.value || moduleName.value !== "deal" || globalStateLoading || !echo) return;

    const handler = () => { isModuleItemsLoading.set(true); fetchItems() };

    const forceRefreshhandler = (data: any) => { console.log(data.moduleId, moduleId.value); if (data.moduleId === moduleId.value) { isModuleItemsLoading.set(true); fetchItems() } }
    echo.private(`user.${agent.value.id}`).listen(".InqueryRecivedEvent", handler).listen(".ForceModuleRefresh", forceRefreshhandler);

    return () => {
      echo.private(`user.${agent.value.id}`).stopListening(".InqueryRecivedEvent", handler).stopListening(".ForceModuleRefresh", forceRefreshhandler);
    };
  }, [moduleId.value, globalStateLoading, moduleName.value, echo]);

  function isItemAssignedToAgent(agent_id: number) {
    return agent_id === agent.value.id || agent.value.is_admin
  }

  return (
    <>
      {!isModuleLoading.value ? (
        !isModuleItemsLoading.value && module_data ? (
          <motion.div layout >
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
              <div className="flex flex-row justify-items-start gap-1 overflow-x-scroll overflow-y-hidden  custom-scroll" ref={containerRef}>
                <div className="flex h-fit">
                  {module_data!.columns.map((column, colKey) =>
                    !column.is_excluded ? (
                      <Card key={column.id} className="w-[272px] flex-none bg-transparent first:border-s-1 border-s-0 border-e-1 border-t-0 border-b-0 border-dashed rounded-none shadow-none">
                        <CardHeader className="p-0 text-center">
                          <CardTitle className=" p-2 capitalize flex gap-2 justify-center items-center" style={{ backgroundColor: column.color, color: "white" }}>
                            <div className="max-w-[80%] truncate">{column.title} </div>
                            <div className="">
                              ( {module_data?.data[column.value].total_count} )
                            </div>
                            <div className=""></div>
                          </CardTitle>
                          {module_data!.data[column.value].has_total_amount ? <div className={` ${darkMode.value ? "text-white" : ""} p-2 text-2xl`}> {numberWithCommas(module_data!.data[column.value].total_amount)} AED</div> : <></>}
                        </CardHeader>
                        <CardContent className="p-2 flex flex-col gap-2 overflow-y-auto min-h-[60dvh] max-h-[60dvh] h-[60dvh] custom-scroll">
                          <StrictModeSafeDroppable droppableId={colKey.toString()}>
                            {(provided) => (
                              <div {...provided.droppableProps} ref={provided.innerRef}>
                                <div className={` ${module_data!.data[column.value].total_count > 0 ? "min-h-[60dvh]" : "min-h-[30dvh]"}`}>
                                  {(module_data!.data as { [key: string]: any })[column.value].items.length > 0 ? (
                                    (module_data!.data as { [key: string]: any })[column.value].items.map((item: any, index: number) => {
                                      const isAssignedToAgent = isItemAssignedToAgent(item.agent.id);
                                      return <Draggable key={`${column.id}-${item.id}`} draggableId={item.id.toString()} index={index} isDragDisabled={!isAssignedToAgent} >
                                        {(provided) => (
                                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Card
                                              className={`${!isAssignedToAgent ? 'opacity-60 cursor-not-allowed border-dashed border-2' : ''} my-2 ${selectedTasks.value.includes(item.it_name) && isMultiSelectMode.value ? "bg-blue-50 border-blue-300" : ""} `}
                                            >
                                              <CardContent className={`p-2 px-3 overflow-hidden transition-all duration-300 ease-in-out relative`} style={{ maxHeight: nonCollapsed.includes(item.id) ? `100%` : `72px` }}>
                                                <TooltipProvider delayDuration={50}>
                                                  <Tooltip>
                                                    <TooltipTrigger asChild className="absolute right-[10px] top-[10px]">
                                                      <div>
                                                        <Avatar className="h-6 w-6 cursor-pointer" onClick={() => isAssignedToAgent ? handleSingleAssignClick(item.it_name) : null} >
                                                          <AvatarImage src={ item.agent.employee_avatar ?  `${import.meta.env.VITE_BACKOFFICE_APP_BASE_URL}/storage/${item.agent.employee_avatar.file_name}` : ''} />
                                                          <AvatarFallback className="bg-slate-200 text-slate-600"> {item.agent ? getInitials(item.agent.name) : 'VZ'}</AvatarFallback>
                                                        </Avatar>
                                                      </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                      {item.activities.length > 0 ? (
                                                        <p>
                                                          <span className="mx-2"> {item.agent.name}</span>
                                                        </p>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </TooltipContent>
                                                  </Tooltip>
                                                </TooltipProvider>

                                                <TooltipProvider delayDuration={50}>
                                                  <Tooltip>
                                                    <TooltipTrigger disabled={item.activities.length == 0} asChild className="absolute right-[40px] top-[10px]">
                                                      <div>
                                                        <TriangleAlert color="#3e9392" />
                                                      </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                      {item.activities.length > 0 ? (
                                                        <p>
                                                          last update on
                                                          {<span> {item.activities[item.activities.length - 1].created_at} </span>}
                                                        </p>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </TooltipContent>
                                                  </Tooltip>
                                                </TooltipProvider>
                                                <div>
                                                  <div className="">
                                                    {CompanyModuleKanbanCardContent(moduleFields.value, item)}

                                                    <div className="w-[80%]">
                                                      {item.activities.map((activity: any) => (
                                                        <TooltipProvider key={activity.id} delayDuration={50}>
                                                          <Tooltip>
                                                            <TooltipTrigger asChild className={`${!isAssignedToAgent ? 'cursor-not-allowed' : ''}   max-w-fit`}>
                                                              <div className={`flex items-center p-1 mb-1 me-1 rounded-full border`} onClick={() => console.log("xxx")}>
                                                                {activity.type === "item_created" && <FilePlus className="me-2" size={10} />}
                                                                {activity.type === "agent_added_note" && <StickyNote className="me-2" size={10} />}
                                                                {activity.type === "agent_added_attachment" && <FileText className="me-2" size={10} />}
                                                                {activity.type === "agent_added_comment" && <MessageCircle className="me-2" size={10} />}
                                                                {activity.type === "update" && <User className="me-2" size={10} />}
                                                                {activity.type === "item_assigned" && <User className="me-2" size={10} />}

                                                                <div className="text-[10px] text-ellipsis truncate">
                                                                  <span className="text-muted-foreground mx-1">
                                                                    {activity.type === "agent_updated_item" && `updated ${activity.module.name} item`}
                                                                    {activity.type === "item_created" && `created ${activity.module.name} item`}
                                                                    {activity.type === "agent_added_attachment" && "Added Attachment"}
                                                                    {activity.type === "agent_added_note" && activity.payload.title}
                                                                    {activity.type === "agent_added_comment" && activity.payload.description}
                                                                    {activity.type === "item_assigned" && ` assigned ${activity.payload.old_agent.name} to ${activity.payload.new_agent.name}`}

                                                                  </span>
                                                                  <span className="text-muted-foreground">{activity.created_at}</span>
                                                                </div>
                                                              </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                              <p className="flex space-x-1">
                                                                <span>
                                                                  {activity.type === "agent_updated_item" ? `updated ${activity.module.name} item` : ""}
                                                                  {activity.type === "item_created" ? `created ${activity.module.name} item` : ""}
                                                                  {activity.type === "agent_added_attachment" ? "added attachment" : ""}
                                                                  {activity.type === "agent_added_note" ? activity.payload.title : ""}
                                                                  {activity.type === "agent_added_comment" ? activity.payload.description : ""}
                                                                </span>
                                                                <span>{activity.created_at}</span>
                                                              </p>
                                                            </TooltipContent>
                                                          </Tooltip>
                                                        </TooltipProvider>
                                                      ))}
                                                    </div>
                                                  </div>
                                                </div>
                                              </CardContent>
                                              <CardFooter className="py-2 justify-center">
                                                {moduleName.value === "deal" && item.source ? (
                                                  <div>
                                                    {item.source === "website" ? <ScreenShare size={12} /> : <></>}
                                                    {item.source === "social" ? (
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram">
                                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                                      </svg>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {item.source === "offer" ? <Link size={12} /> : <></>}
                                                    {item.source === "bulk" ? <Database size={12} /> : <></>}
                                                    {item.source === "bayut" ? <span className="font-medium text-green-400" >b</span> : <></>}
                                                    {item.source === "dubizzle" ? <span className="font-medium text-red-700" >d</span> : <></>}
                                                    {item.source === 'facebook_instant_form' ? <span className="font-medium text-blue-700">f</span> : <></>}
                                                    {item.source === 'property_finder' ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 288 480" aria-hidden="true">
                                                      <path fill="#ea3934" fill-rule="nonzero" d="M144.3.7C223.6.7 288 65.5 288 145.5c0 12.5-1.6 24.6-4.5 36.2-3.3 12.8-8.3 25-14.7 36.2-6.3 11-14 21.1-22.9 30-26 26.2-61.9 42.4-101.5 42.4v-1.9c-1.4-41.3-19.1-78.4-46.7-105-25.4-24.5-59.4-40.1-96.8-41.9 1-38.4 16.9-73 42-98.4C68.7 16.9 104.6.7 144.3.7zM.7 435.1c79.3 0 143.7-64.8 143.7-144.8H.7v144.8z" />
                                                    </svg> : <></>}
                                                  </div>
                                                ) : null}
                                                <Button variant={"link"} onClick={() => toggleCollapseCard(item.id)}>
                                                  {nonCollapsed.includes(item.id) ? (
                                                    <>
                                                      <div>Show less</div> <ChevronUp></ChevronUp>{" "}
                                                    </>
                                                  ) : (
                                                    <>
                                                      <div>Show more</div> <ChevronDown></ChevronDown>{" "}
                                                    </>
                                                  )}
                                                </Button>
                                                <div className="flex space-x-2">
                                                  <Button variant={"outline"} size={"icon"} disabled={!isAssignedToAgent} onClick={() => isAssignedToAgent ? handleItemClicked(item.it_name) : null}>
                                                    <Pencil />
                                                  </Button>
                                                  <Button variant={"outline"} size={"icon"} disabled={!isAssignedToAgent} onClick={() => isAssignedToAgent ? handleDeleteItemClicked(item.it_name) : null}>
                                                    <Trash2 />
                                                  </Button>
                                                </div>
                                              </CardFooter>
                                            </Card>
                                          </div>
                                        )}
                                      </Draggable>
                                    })
                                  ) : (
                                    <>
                                      <div className="flex flex-col">
                                        <div className=""></div>
                                      </div>
                                    </>
                                  )}
                                </div>
                                {provided.placeholder}
                              </div>
                            )}
                          </StrictModeSafeDroppable>
                          <div className="flex justify-center">
                            {(module_data!.data as { [key: string]: any })[column.value].page < (module_data!.data as { [key: string]: any })[column.value].last_page ? (
                              <Button variant={"outline"} onClick={() => fetchPaginationItems(column.value)}>
                                Show more
                              </Button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <></>
                    )
                  )}
                </div>
              </div>
              <div className={`fixed bottom-0 flex items-end justify-center ${showExecluded ? "visible" : "invisible"} `}>
                <StrictModeDroppable droppableId={"delete"}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[54px] font-light min-w-[240px] w-fit text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-y-110 duration-50 hover:rounded-t-sm flex justify-center items-center" style={{ backgroundColor: "#b0b0b0" }}>
                      <Trash2 />
                      <div className="">Delete</div>
                    </div>
                  )}
                </StrictModeDroppable>
                {module_data!.columns.map((column, colKey) =>
                  column.is_excluded ? (
                    <StrictModeDroppable key={column.id} droppableId={colKey.toString()}>
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[54px] font-light min-w-[240px] w-fit text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-y-110 duration-50 hover:rounded-t-sm flex justify-center items-center" style={{ backgroundColor: column.color }}>
                          {column.title}
                        </div>
                      )}
                    </StrictModeDroppable>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </DragDropContext>
          </motion.div>
        ) : (
          <div className="flex flex-col">
            <SkeletonKanban></SkeletonKanban>
          </div>
        )
      ) : (
        <div className="flex flex-col">
          <SkeletonKanban></SkeletonKanban>
        </div>
      )}
    </>
  );
}
