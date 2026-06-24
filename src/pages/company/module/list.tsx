import { Key, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ChevronDown, MoreHorizontal, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGlobalState } from "@/providers/globalContext";
import companyModuleRepository from "@/repositories/company/companyModuleRepository";
import { useNavigate } from "react-router-dom";
import { SkeletonTable } from "@/components/skeletonTable";
import { useModuleState } from "@/providers/moduleContext";
import { Checkbox } from "@/components/ui/checkbox";
import { debounce, getInitials } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LinkItem {
  url: string;
  label: string;
  active: boolean;
}

interface RootResponse {
  current_page: number;
  data: [];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkItem[];
  next_page_url?: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
}

export default function CompanyModuleList() {
  const { permissions, agent } = useGlobalState();
  const context: any = useOutletContext();

  const {
    isModuleLoading,
    isModuleItemsLoading,
    moduleId,
    isQuickCreateEnabled,
    moduleName,
    moduleTitle,
    moduleFields,
    moduleActiveFilters,
    customFilter,
    selectedTasks,
    isMultiSelectMode,
  } = useModuleState();

  let navigate = useNavigate();
  const [module_items, setModuleItems] = useState<RootResponse>();
  const [, setError] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchItems = async (reason: string, query = "") => {
    try {
      console.log("[fetchItems] Reason:", reason, "| Module ID:", moduleId.value, "| Page:", page);
      isModuleItemsLoading.set(true);
      const items: any = await companyModuleRepository.getModuleItemsList(page, moduleId.value!, query, limit, moduleActiveFilters.value, customFilter.value);

      if (items.success) {
        setModuleItems(items.data);
      } else if (items.message === "you dont have permission to list item") {
        navigate("/404");
      }
    } catch (err) {
      setError("Unable to load items.");
    } finally {
      const event = new CustomEvent("itemsRefreshDone", {});
      window.dispatchEvent(event);
      isModuleItemsLoading.set(false);
    }
  };

  const debouncedFetch = debounce((reason: string) => {
    if (moduleId.value && !isModuleLoading.value) {
      fetchItems(reason);
    }
  }, 300);

  useEffect(() => {
    setPage(1);



    const handleItemEvent = () => debouncedFetch();
    const handleRefreshEvent = () => (isModuleItemsLoading.set(true), debouncedFetch());
    const handleFilterEvent = () => debouncedFetch();

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
    debouncedFetch("dependency-change");

    return () => {
      debouncedFetch.cancel?.();
    };
  }, [moduleId.value, moduleActiveFilters.value, customFilter.value, page, limit, isModuleLoading.value]);

  useEffect(() => {


    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = Number(searchParams.get("page"));
    const limitParam = Number(searchParams.get("limit"));
    if (pageParam) {
      setPage(pageParam)
    }
    if (limitParam) {
      setLimit(limitParam)
    }
  }, [])


  const onPageChange = (id: number) => {
    setPage(id);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", id.toString());
    const updatedUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", updatedUrl);
  };

  const onLimitChange = (limit: number) => {
    setLimit(limit)
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("limit", limit.toString());
    const updatedUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", updatedUrl);
  }


  function isItemAssignedToAgent(agent_id: number) {
    return agent_id === agent.value.id || agent.value.is_admin
  }


  const handleEditItemClicked = async (id: number) => {
    if (isQuickCreateEnabled) {
      context.edit_moduel_item_ref.editModalRef.current.toggleModal(id, moduleId.value);
    } else {
      navigate(`/company/module/${moduleId.value}/${id}/edit`);
    }
  };

  const handleDeleteItemClicked = async (id: number) => {
    context.delete_moduel_item_ref.deleteModalRef.current.toggleModal(id, moduleId.value);
  };

  const currentItemIds = useMemo(() => {

    return module_items?.data?.filter((item: { agent: { id: number } }) => { if (isItemAssignedToAgent(item.agent.id)) { return item } }).map((item: { it_name: string }) => item.it_name) || [];
  }, [module_items]);

  const toggleSelectAll = () => {
    isMultiSelectMode.set(true);
    selectedTasks.set([
      ...new Set([...selectedTasks.value, ...currentItemIds]),
    ])
  };

  const toggleItem = (id: string) => {
    if (!isMultiSelectMode.value) {
      isMultiSelectMode.set(true);
    }
    selectedTasks.toggle(id);
  };


  return !isModuleLoading.value ? (
    !isModuleItemsLoading.value ? (
      <Card>
        <CardHeader>
          <CardTitle>{moduleTitle.value}</CardTitle>
          <CardDescription>Manage your {moduleTitle.value} and view their sales performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block">
            {module_items?.data && module_items!.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Checkbox
                        checked={selectedTasks.value.length > 0 && selectedTasks.value.length == module_items.data.length}
                        onCheckedChange={toggleSelectAll}
                      ></Checkbox>
                    </TableHead>
                    {moduleFields.value.map((module_field: any, key: Key | null | undefined) => (
                      <TableHead key={key}>{module_field.title}</TableHead>
                    ))}
                    <TableHead>
                      <span>Agent</span>
                    </TableHead>
                    <TableHead>
                      <span>Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {module_items!.data.map((module_item: any, item_key: any) => {

                    const isAssignedToAgent = isItemAssignedToAgent(module_item.agent.id);
                    return <TableRow key={item_key}>
                      <TableCell>
                        <Checkbox onCheckedChange={() => toggleItem(module_item.it_name)} checked={selectedTasks.isTaskSelected(module_item.it_name)} disabled={!isAssignedToAgent} ></Checkbox>
                      </TableCell>
                      {moduleFields.value.map((module_field: any, key: Key | null | undefined) => (
                        <TableCell key={key} className="font-medium">
                          {module_field.type === "select" || module_field.type === "text" ? module_item[module_field.name] : <></>}
                          {module_field.type === "select_relational" ? (
                            <>
                              {module_field.name === "customer_id" && module_item.customer_id !== null && "customer" in module_item.related_items ? (
                                <div className="">
                                  <div className="text-[10px] font-medium">{module_item.related_items.customer.name}</div>
                                  <div className="text-[10px]">{module_item.related_items.customer.phone}</div>
                                  <div className="text-[10px]">{module_item.related_items.customer.email}</div>
                                </div>
                              ) : (
                                <></>
                              )}
                              {module_field.name === "deal_id" && module_item.deal_id !== null && "deal" in module_item.related_items ? (
                                <div className=" rounded-lg flex-col mb-2">
                                  <div className="">
                                    <div className="text-[10px]">{module_item.related_items.deal.it_name}</div>
                                    <div className="text-[10px]">{module_item.related_items.deal.status}</div>
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                              {module_field.name === "call_center_id" && module_item.call_center_id !== null && "call_center" in module_item.related_items ? (
                                <div className=" rounded-lg flex-col mb-2">
                                  <div className="">
                                    <div className="text-[10px]">{module_item.related_items.call_center.it_name}</div>
                                    <div className="text-[10px] font-medium">{module_item.related_items.call_center.status}</div>
                                    <div className="text-[10px] font-medium">{module_item.related_items.call_center.note}</div>
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                              {module_field.name === "management_id" && module_item.deal !== null && "management" in module_item.related_items ? (
                                <div className=" rounded-lg flex-col mb-2">
                                  <div className="">
                                    <div className="text-[10px]">{module_item.related_items.management.it_name}</div>
                                    <div className="text-[10px] font-medium">{module_item.related_items.management.status}</div>
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                              {module_field.name === "accounting_id" && module_item.accounting_id !== null && "accounting" in module_item.related_items ? (
                                <div className=" rounded-lg flex-col mb-2">
                                  <div className="">
                                    <div className="text-[10px]">{module_item.related_items.accounting.it_name}</div>
                                    <div className="text-[10px] font-medium">{module_item.related_items.accounting.status}</div>
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </TableCell>
                      ))}

                      <TableCell>
                        <div className="flex items-start gap-2">
                          <Avatar className="h-6 w-6" >
                            <AvatarFallback className="bg-slate-200 text-slate-600"> {module_item.agent ? getInitials(module_item.agent.name) : 'VZ'}</AvatarFallback>
                          </Avatar>
                          {module_item.agent.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu modal={false} >
                          <DropdownMenuTrigger disabled={!isAssignedToAgent} asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {permissions.can(`${moduleName.value}_update_item`) ? <DropdownMenuItem onClick={() => handleEditItemClicked(module_item.it_name)}>Edit</DropdownMenuItem> : <></>}
                            <DropdownMenuItem onClick={() => handleDeleteItemClicked(module_item.it_name)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-muted p-4">
                  <PlusCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-lg font-medium">No items available</div>
                <div className="text-sm text-muted-foreground">Add your first item to get started.</div>
              </div>
            )}
          </div>
          <div className="block md:hidden">
            {module_items?.data && module_items!.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <span>#</span>
                    </TableHead>
                    <TableHead>{moduleFields.value[0]?.name ?? ""}</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {module_items!.data.length > 0
                    ? module_items!.data.map((module_item: any, item_key) => (
                      <Collapsible key={item_key} asChild>
                        <>
                          <TableRow key={item_key}>
                            <TableCell>
                              <CollapsibleTrigger asChild>
                                <ChevronDown />
                              </CollapsibleTrigger>
                            </TableCell>
                            <TableCell>{module_items!.data.at(0)?.[moduleFields.value[0]?.name] ?? ""}</TableCell>
                            <TableCell>
                              <Badge variant="outline">Active</Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  {permissions.can(`${moduleName.value}_update_item`) ? <DropdownMenuItem onClick={() => handleEditItemClicked(module_item.id)}>Edit</DropdownMenuItem> : <></>}
                                  {permissions.can(`${moduleName.value}_delete_item`) ? <DropdownMenuItem onClick={() => handleDeleteItemClicked(module_item.id)}>Delete</DropdownMenuItem> : <></>}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                          <CollapsibleContent asChild>
                            <div className="">
                              {moduleFields.value.map((module_field: any, key: Key | null | undefined) =>
                                key != 0 ? (
                                  <p key={key} className="font-medium">
                                    <strong>{module_field.title}</strong>:{module_field.type === "select" || module_field.type === "text" ? module_item[module_field.name] : <></>}
                                    {module_field.type === "select_relational" ? (
                                      <>
                                        {module_field.name === "customer_id" && module_item.customer_id !== null && "customer" in module_item.related_items ? (
                                          <div className="">
                                            <div className="text-[10px]">{module_item.related_items.customer.it_name}</div>
                                            <div className="text-[10px] font-medium">{module_item.related_items.customer.name}</div>
                                            <div className="text-[10px] font-medium">{module_item.related_items.customer.phone}</div>
                                            <div className="text-[10px] font-medium">{module_item.related_items.customer.email}</div>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        {module_field.name === "deal_id" && module_item.deal_id !== null && "deal" in module_item.related_items ? (
                                          <div className=" rounded-lg flex-col mb-2">
                                            <div className="">
                                              <div className="text-[10px]">{module_item.related_items.deal.it_name}</div>
                                              <div className="text-[10px] font-medium">{module_item.related_items.deal.status}</div>
                                            </div>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        {module_field.name === "call_center_id" && module_item.call_center_id !== null && "call_center" in module_item.related_items ? (
                                          <div className=" rounded-lg flex-col mb-2">
                                            <div className="">
                                              <div className="text-[10px]">{module_item.related_items.call_center.it_name}</div>
                                              <div className="text-[10px] font-medium">{module_item.related_items.call_center.status}</div>
                                              <div className="text-[10px] font-medium">{module_item.related_items.call_center.note}</div>
                                            </div>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        {module_field.name === "deal_id" && module_item.deal_id !== null && "deal" in module_item.related_items ? (
                                          <div className=" rounded-lg flex-col mb-2">
                                            <div className="">
                                              <div className="text-[10px]">{module_item.related_items.deal.it_name}</div>
                                              <div className="text-[10px] font-medium">{module_item.related_items.deal.status}</div>
                                            </div>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        {module_field.name === "accounting_id" && module_item.accounting_id !== null && "accounting" in module_item.related_items ? (
                                          <div className=" rounded-lg flex-col mb-2">
                                            <div className="">
                                              <div className="text-[10px]">{module_item.related_items.accounting.it_name}</div>
                                              <div className="text-[10px] font-medium">{module_item.related_items.accounting.status}</div>
                                            </div>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </p>
                                ) : null
                              )}
                            </div>
                          </CollapsibleContent>
                        </>
                      </Collapsible>
                    ))
                    : null}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-muted p-4">
                  <PlusCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-lg font-medium">No items available</div>
                <div className="text-sm text-muted-foreground">Add your first item to get started.</div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="w-full">
          {!isModuleLoading.value && !isModuleItemsLoading.value && module_items?.data && module_items!.data.length > 0 ? (
            <div className="flex-col items-start w-full">
              <div className="text-xs text-muted-foreground my-2">
                Showing
                <strong className="mx-1">
                  {module_items!.from} - {module_items!.to}
                </strong>
                of <strong>{module_items!.total}</strong> {moduleName.value} items{" "}
              </div>

              <div className="grid grid-cols-12">
                <div className="col-span-3 flex items-center gap-2">
                  <span className="text-sm font-medium">Show:</span>
                  <Select defaultValue={limit.toString()} onValueChange={(value: string) => onLimitChange(parseInt(value))}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">per page</span>
                </div>
                <Pagination className="col-span-9 justify-start" >
                  <PaginationContent className="flex flex-wrap justify-center gap-2">
                    {module_items!.links.map((link, index) => {
                      if (link.url === null && link.label === "...") {
                        return (
                          <PaginationItem key={index}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }

                      if (link.label === "&laquo; Previous") {
                        return (
                          <PaginationItem key={index}>
                            <PaginationPrevious
                              href={link.url || "#"}
                              onClick={(e) => {
                                e.preventDefault();
                                const previousPage = page - 1;
                                if (link.url) onPageChange(previousPage);
                              }}
                            />
                          </PaginationItem>
                        );
                      }

                      if (link.label === "Next &raquo;") {
                        return (
                          <PaginationItem key={index}>
                            <PaginationNext
                              href={link.url || "#"}
                              onClick={(e) => {
                                e.preventDefault();
                                const nextPage = page + 1;
                                if (link.url) onPageChange(nextPage);
                              }}
                            />
                          </PaginationItem>
                        );
                      }
                      return (
                        <PaginationItem key={index}>
                          <PaginationLink
                            href={link.url || "#"}
                            isActive={link.active}
                            onClick={(e) => {
                              e.preventDefault();
                              if (link.url) onPageChange(parseInt(link.label, 10));
                            }}
                          >
                            {link.label}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          ) : (
            <></>
          )}
        </CardFooter>
      </Card>
    ) : (
      <div className=" flex flex-col">
        <SkeletonTable></SkeletonTable>
      </div>
    )
  ) : (
    <div className=" flex flex-col">
      <SkeletonTable></SkeletonTable>
    </div>
  )
}
