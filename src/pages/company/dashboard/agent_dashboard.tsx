
export default function CompanyAgentDashboard() {
  return <div className="">Agent Dashboard</div>
}

// import { Key, useEffect, useState } from "react";
// import { ChevronDown, MoreHorizontal, PlusCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// import { Badge } from "@/components/ui/badge";
// import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
// import { useGlobalState } from "@/providers/globalContext";
// import { useOutletContext } from "react-router-dom";
// import companyModuleRepository from "@/repositories/company/companyModuleRepository";
// import { SkeletonTable } from "@/components/skeletonTable";
// import { useNavigate } from "react-router-dom";

// interface LinkItem {
//   url: string;
//   label: string;
//   active: boolean;
// }

// interface RootResponse {
//   current_page: number;
//   data: [];
//   first_page_url: string;
//   from: number;
//   last_page: number;
//   last_page_url: string;
//   links: LinkItem[];
//   next_page_url?: string;
//   path: string;
//   per_page: number;
//   prev_page_url?: string;
//   to: number;
//   total: number;
// }

// export default function CompanyAgentDashboard() {
//   const { activeModules, permissions } = useGlobalState();
//   const context: any = useOutletContext();
//   let navigate = useNavigate();
//   //   const { isModuleDetailsLoading, module_name, module_id, module_fields, isQuickCreateEnabled } = context;

//   const [module_items, setModuleItems] = useState<RootResponse>();
//   const [isInitalLoading, setInitalLoading] = useState(true);
//   const [, setLoading] = useState(true);
//   const [isModuleDetailsLoading, setIsModuleDetailsLoading] = useState(true);
//   const [module_id, setModuleId] = useState("");
//   const [module_name, setModuleName] = useState("");
//   const [module_fields, setModulesFields] = useState<any>();

//   const [, setError] = useState<string>("");
//   const [page, setPage] = useState(1);
//   const [filter, setFilter] = useState("");

//   //   const fetchAgentLeadModuleDetails =

//   const fetchItems = async (query = "") => {
//     // try {

//       // setLoading(true);
//       // setIsModuleDetailsLoading(true)

//       // const agentLeadModule = activeModules.value.find((module: { name: string; permalink: string }) => module.name === "deal");
//       // setModuleId(agentLeadModule.permalink);
//       // setModuleName(agentLeadModule.name);
//       // console.log(agentLeadModule.permalink)
//       // const fieldsResponse = await companyModuleRepository.getModuleFields(agentLeadModule.permalink);
//       // if (fieldsResponse.success) {
//       //   setModulesFields(fieldsResponse.data);
//       //   setIsModuleDetailsLoading(true)
//       //   //get module items
//       //   const items: any = await companyModuleRepository.getModuleItemsList(page, agentLeadModule.permalink, query);
//       //   if (items.success) {
//       //     setModuleItems(items.data);
//       //   //   setIsModuleDetailsLoading(false)
//       //   } else {
//       //     if (items.message === "you dont have permission to list item") {
//       //       navigate("/404");
//       //     }
//       //   }

//       //   setLoading(false);
        
//       //   const event = new CustomEvent('itemsRefreshDone', {});
//       //   window.dispatchEvent(event);
//     // }

//     // } catch (err) {
//     //   setError("unable to load ");
//     // } finally {
//     //   setLoading(false);
//     //   setInitalLoading(false);
//     // }
//   };

//   const onPageChange = (id: number) => {
//     setPage(id);
//     const searchParams = new URLSearchParams(window.location.search);
//     searchParams.set("page", id.toString());
//     const updatedUrl = `${window.location.pathname}?${searchParams.toString()}`;
//     window.history.pushState({}, "", updatedUrl);
//     fetchItems(filter);
//   };

//   const handleItemAddedUpdatedEvent = function () {
//     console.log("updateing item list");
//     fetchItems(filter);
//   };

//   const handleEditItemClicked = async function (id: number) {
//     console.log(id)
//     // if (isQuickCreateEnabled) {
//     //   context.edit_moduel_item_ref.editModalRef.current.toggleModal(id, module_id);
//     // } else {
//     //   navigate(`/company/module/${module_id}/${id}/edit`);
//     // }
//   };

//   const handleDeleteItemClicked = async function (id: number) {
//     context.delete_moduel_item_ref.deleteModalRef.current.toggleModal(id, module_id);
//   };

//   const handleItemsRefreshEvent = function () {
//     fetchItems(filter);
//   };

//   const handleFilterUpdatedEvent = function (event: any) {
//     setFilter(event.detail);
//     fetchItems(event.detail);
//   };

//   useEffect(() => {
//     if (!isModuleDetailsLoading) {
//       setInitalLoading(true);
//       fetchItems(filter);
//       window.addEventListener("itemAdded", handleItemAddedUpdatedEvent);
//       window.addEventListener("itemUpdated", handleItemAddedUpdatedEvent);
//       window.addEventListener("itemsRefresh", handleItemsRefreshEvent);
//       window.addEventListener("filterUpdated", handleFilterUpdatedEvent);

//       return () => {
//         window.removeEventListener("itemAdded", handleItemAddedUpdatedEvent);
//         window.removeEventListener("itemUpdated", handleItemAddedUpdatedEvent);
//         window.removeEventListener("itemsRefresh", handleItemsRefreshEvent);
//         window.removeEventListener("filterUpdated", handleFilterUpdatedEvent);
//       };
//     }
//     console.log("useEffect triggered");
//   }, [isModuleDetailsLoading]);

//   useEffect(() => {
//     fetchItems(filter);
//   }, [page]);

//   useEffect(() => {
//     setLoading(true);
//   }, [module_id]);

//   return !isModuleDetailsLoading ? (
//     !isInitalLoading ? (
//       <Card>
//         <CardHeader></CardHeader>
//         <CardContent>
//           <div className="hidden md:block ">
//             {module_items!.data.length > 0 ? (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     {module_fields.map((module_field: any, key: Key | null | undefined) => (
//                       <TableHead key={key}>{module_field.title}</TableHead>
//                     ))}
//                     <TableHead>
//                       <span>Actions</span>
//                     </TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {module_items!.data.map((module_item: any, item_key: any) => (
//                     <TableRow key={item_key}>
//                       {module_fields.map((module_field: any, key: Key | null | undefined) => (
//                         <TableCell key={key} className="font-medium">
//                           {module_field.type === "select" || module_field.type === "text" ? module_item[module_field.name] : <></>}
//                           {module_field.type === "select_relational" ? (
//                             <>
//                               {module_field.name === "customer_id" && module_item.customer_id !== null && "customer" in module_item.related_items ? (
//                                 <div className="">
//                                   <div className="text-[10px] font-medium">{module_item.related_items.customer.name}</div>
//                                   <div className="text-[10px]">{module_item.related_items.customer.phone}</div>
//                                   <div className="text-[10px]">{module_item.related_items.customer.email}</div>
//                                 </div>
//                               ) : (
//                                 <></>
//                               )}
//                               {module_field.name === "deal_id" && module_item.deal_id !== null && "deal" in module_item.related_items ? (
//                                 <div className=" rounded-lg flex-col mb-2">
//                                   <div className="">
//                                     <div className="text-[10px]">{module_item.related_items.deal.it_name}</div>
//                                     <div className="text-[10px]">{module_item.related_items.deal.status}</div>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <></>
//                               )}
//                               {module_field.name === "call_center_id" && module_item.call_center_id !== null && "call_center" in module_item.related_items ? (
//                                 <div className=" rounded-lg flex-col mb-2">
//                                   <div className="">
//                                     <div className="text-[10px]">{module_item.related_items.call_center.it_name}</div>
//                                     <div className="text-[10px] font-medium">{module_item.related_items.call_center.status}</div>
//                                     <div className="text-[10px] font-medium">{module_item.related_items.call_center.note}</div>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <></>
//                               )}
//                               {module_field.name === "deal_id" && module_item.deal_id !== null && "deak" in module_item.related_items ? (
//                                 <div className=" rounded-lg flex-col mb-2">
//                                   <div className="">
//                                     <div className="text-[10px]">{module_item.related_items.deal.it_name}</div>
//                                     <div className="text-[10px] font-medium">{module_item.related_items.deal.status}</div>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <></>
//                               )}
//                               {module_field.name === "accounting_id" && module_item.accounting_id !== null && "accounting" in module_item.related_items ? (
//                                 <div className=" rounded-lg flex-col mb-2">
//                                   <div className="">
//                                     <div className="text-[10px]">{module_item.related_items.accounting.it_name}</div>
//                                     <div className="text-[10px] font-medium">{module_item.related_items.accounting.status}</div>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <></>
//                               )}
//                             </>
//                           ) : (
//                             <></>
//                           )}
//                         </TableCell>
//                       ))}
//                       <TableCell>
//                         <DropdownMenu modal={false}>
//                           <DropdownMenuTrigger asChild>
//                             <Button aria-haspopup="true" size="icon" variant="ghost">
//                               <MoreHorizontal className="h-4 w-4" />
//                               <span className="sr-only">Toggle menu</span>
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                             {permissions.can(`${module_name}_update_item`) ? <DropdownMenuItem onClick={() => handleEditItemClicked(module_item.it_name)}>Edit</DropdownMenuItem> : <></>}
//                             {permissions.can(`${module_name}_delete_item`) ? <DropdownMenuItem onClick={() => handleDeleteItemClicked(module_item.id)}>Delete</DropdownMenuItem> : <></>}
//                             <DropdownMenuItem onClick={() => handleDeleteItemClicked(module_item.id)}>Delete</DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             ) : (
//               <div className="flex flex-col items-center justify-center space-y-4">
//                 <div className="rounded-full bg-muted p-4">
//                   <PlusCircle className="h-8 w-8 text-muted-foreground" />
//                 </div>
//                 <div className="text-lg font-medium">No items available</div>
//                 <div className="text-sm text-muted-foreground">Add your first item to get started.</div>
//               </div>
//             )}
//           </div>
//           <div className="block md:hidden">
//             {module_items!.data.length > 0 ? (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>
//                       <span>#</span>
//                     </TableHead>
//                     <TableHead>{module_fields[0]?.name ?? ""}</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>
//                       <span className="sr-only">Actions</span>
//                     </TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {module_items!.data.length > 0
//                     ? module_items!.data.map((module_item: any, item_key) => (
//                         <Collapsible key={item_key} asChild>
//                           <>
//                             <TableRow key={item_key}>
//                               <TableCell>
//                                 <CollapsibleTrigger asChild>
//                                   <ChevronDown />
//                                 </CollapsibleTrigger>
//                               </TableCell>
//                               <TableCell>{module_items!.data.at(0)?.[module_fields[0]?.name] ?? ""}</TableCell>
//                               <TableCell>
//                                 <Badge variant="outline">Active</Badge>
//                               </TableCell>
//                               <TableCell>
//                                 <DropdownMenu modal={false}>
//                                   <DropdownMenuTrigger asChild>
//                                     <Button aria-haspopup="true" size="icon" variant="ghost">
//                                       <MoreHorizontal className="h-4 w-4" />
//                                       <span className="sr-only">Toggle menu</span>
//                                     </Button>
//                                   </DropdownMenuTrigger>
//                                   <DropdownMenuContent align="end">
//                                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                     {permissions.can(`${module_name}_update_item`) ? <DropdownMenuItem onClick={() => handleEditItemClicked(module_item.id)}>Edit</DropdownMenuItem> : <></>}
//                                     {permissions.can(`${module_name}_delete_item`) ? <DropdownMenuItem onClick={() => handleDeleteItemClicked(module_item.id)}>Delete</DropdownMenuItem> : <></>}
//                                   </DropdownMenuContent>
//                                 </DropdownMenu>
//                               </TableCell>
//                             </TableRow>
//                             <CollapsibleContent asChild>
//                               <div className="">
//                                 {module_fields.map((module_field: any, key: Key | null | undefined) =>
//                                   key != 0 ? (
//                                     <p key={key} className="font-medium">
//                                       <strong>{module_field.title}</strong>:{module_field.type === "select" || module_field.type === "text" ? module_item[module_field.name] : <></>}
//                                       {module_field.type === "select_relational" ? (
//                                         <>
//                                           {module_field.name === "customer_id" && module_item.customer_id !== null && "customer" in module_item.related_items ? (
//                                             <div className="">
//                                               <div className="text-[10px]">{module_item.related_items.customer.it_name}</div>
//                                               <div className="text-[10px] font-medium">{module_item.related_items.customer.name}</div>
//                                               <div className="text-[10px] font-medium">{module_item.related_items.customer.phone}</div>
//                                               <div className="text-[10px] font-medium">{module_item.related_items.customer.email}</div>
//                                             </div>
//                                           ) : (
//                                             <></>
//                                           )}
//                                           {module_field.name === "deal_id" && module_item.deal_id !== null && "deal" in module_item.related_items ? (
//                                             <div className=" rounded-lg flex-col mb-2">
//                                               <div className="">
//                                                 <div className="text-[10px]">{module_item.related_items.deal.it_name}</div>
//                                                 <div className="text-[10px] font-medium">{module_item.related_items.deal.status}</div>
//                                               </div>
//                                             </div>
//                                           ) : (
//                                             <></>
//                                           )}
//                                           {module_field.name === "call_center_id" && module_item.call_center_id !== null && "call_center" in module_item.related_items ? (
//                                             <div className=" rounded-lg flex-col mb-2">
//                                               <div className="">
//                                                 <div className="text-[10px]">{module_item.related_items.call_center.it_name}</div>
//                                                 <div className="text-[10px] font-medium">{module_item.related_items.call_center.status}</div>
//                                                 <div className="text-[10px] font-medium">{module_item.related_items.call_center.note}</div>
//                                               </div>
//                                             </div>
//                                           ) : (
//                                             <></>
//                                           )}
//                                           {module_field.name === "deal_id" && module_item.deal_id !== null && "deal" in module_item.related_items ? (
//                                             <div className=" rounded-lg flex-col mb-2">
//                                               <div className="">
//                                                 <div className="text-[10px]">{module_item.related_items.deal.it_name}</div>
//                                                 <div className="text-[10px] font-medium">{module_item.related_items.deal.status}</div>
//                                               </div>
//                                             </div>
//                                           ) : (
//                                             <></>
//                                           )}
//                                           {module_field.name === "accounting_id" && module_item.accounting_id !== null && "accounting" in module_item.related_items ? (
//                                             <div className=" rounded-lg flex-col mb-2">
//                                               <div className="">
//                                                 <div className="text-[10px]">{module_item.related_items.accounting.it_name}</div>
//                                                 <div className="text-[10px] font-medium">{module_item.related_items.accounting.status}</div>
//                                               </div>
//                                             </div>
//                                           ) : (
//                                             <></>
//                                           )}
//                                         </>
//                                       ) : (
//                                         <></>
//                                       )}
//                                     </p>
//                                   ) : null
//                                 )}
//                               </div>
//                             </CollapsibleContent>
//                           </>
//                         </Collapsible>
//                       ))
//                     : null}
//                 </TableBody>
//               </Table>
//             ) : (
//               <div className="flex flex-col items-center justify-center space-y-4">
//                 <div className="rounded-full bg-muted p-4">
//                   <PlusCircle className="h-8 w-8 text-muted-foreground" />
//                 </div>
//                 <div className="text-lg font-medium">No items available</div>
//                 <div className="text-sm text-muted-foreground">Add your first item to get started.</div>
//               </div>
//             )}
//           </div>
//         </CardContent>
//         <CardFooter className="flex-col items-start">
//           {!isInitalLoading && module_items!.data.length > 0 ? (
//             <>
//               <div className="text-xs text-muted-foreground">
//                 {" "}
//                 Showing{" "}
//                 <strong>
//                   {module_items!.from} - {module_items!.to}
//                 </strong>{" "}
//                 of <strong>{module_items!.total}</strong> {module_name} items{" "}
//               </div>
//               <Pagination className="my-2 justify-start">
//                 <PaginationContent className="flex flex-wrap justify-center gap-2">
//                   {module_items!.links.map((link, index) => {
//                     if (link.url === null && link.label === "...") {
//                       return (
//                         <PaginationItem key={index}>
//                           <PaginationEllipsis />
//                         </PaginationItem>
//                       );
//                     }

//                     if (link.label === "&laquo; Previous") {
//                       return (
//                         <PaginationItem key={index}>
//                           <PaginationPrevious
//                             href={link.url || "#"}
//                             onClick={(e) => {
//                               e.preventDefault();
//                               const previousPage = page - 1;
//                               if (link.url) onPageChange(previousPage);
//                             }}
//                           />
//                         </PaginationItem>
//                       );
//                     }

//                     if (link.label === "Next &raquo;") {
//                       return (
//                         <PaginationItem key={index}>
//                           <PaginationNext
//                             href={link.url || "#"}
//                             onClick={(e) => {
//                               e.preventDefault();
//                               const nextPage = page + 1;
//                               if (link.url) onPageChange(nextPage);
//                             }}
//                           />
//                         </PaginationItem>
//                       );
//                     }
//                     return (
//                       <PaginationItem key={index}>
//                         <PaginationLink
//                           href={link.url || "#"}
//                           isActive={link.active}
//                           onClick={(e) => {
//                             e.preventDefault();
//                             if (link.url) onPageChange(parseInt(link.label, 10));
//                           }}
//                         >
//                           {link.label}
//                         </PaginationLink>
//                       </PaginationItem>
//                     );
//                   })}
//                 </PaginationContent>
//               </Pagination>
//             </>
//           ) : (
//             <></>
//           )}
//         </CardFooter>
//       </Card>
//     ) : (
//       <div className=" flex flex-col">
//         <SkeletonTable></SkeletonTable>
//       </div>
//     )
//   ) : (
//     <div className=" flex flex-col">
//       <SkeletonTable></SkeletonTable>
//     </div>
//   );
// }
