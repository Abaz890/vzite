import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useOutletContext, useParams } from "react-router-dom";
import companyModuleRepository from "@/repositories/company/companyModuleRepository";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ModuleField } from "@/components/moduleField";
import { useGlobalState } from "@/providers/globalContext";

// import { useToast } from "@/hooks/use-toast"; 

export default function CompanyModuleItemAdd() {
  interface FormData {
    [key: string]: string;
  }

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

  const params = useParams();

  const { darkMode } = useGlobalState();
  // const { toast } = useToast();
  const context: any = useOutletContext();
  const { module_id, module_name } = context;

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [, setIsError] = useState(false);

  const [modules_fields, setModulesFields] = useState<any>();
  const [formData, setFormData] = useState<FormData>({});

  const fetchModuleData = async function () {
    const fieldsResponse = await companyModuleRepository.getModuleFields(module_id);
    const itemResponse = await companyModuleRepository.getModuleItemDetails(module_id, params.item_id);

    if (fieldsResponse.success && itemResponse.success) {
      setModulesFields(fieldsResponse.data);

      let form: FormData = {};
      fieldsResponse.data.map((field: any) => {
        form[field.name] = itemResponse.data[field.name];
      });
      setFormData(form);
    } else {
      setIsError(true);
    }
    setIsDataLoading(false);
  };

  useEffect(() => {
    // setIsLoading(true);
    setIsDataLoading(true);
    fetchModuleData();

  }, []);

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // const response = await companyModuleRepository.updateModuleItem(params.item_id,module_id, formData);
    // if (response.success) {
    //     toast({
    //         variant: "default",
    //         duration: 800,
    //          className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
    //         title: "data items successfully imported",
    //         action: <ToastAction altText="close">close</ToastAction>,
    //     })
    //     navigate(`/company/module/${module_id}/${default_view}`)
    // }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <Button type="button" variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className={`flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0  ${darkMode.value && 'text-white'}`}>
          Edit {module_name}
        </h1>
      </div>
      <Card>
        <div className="grid grid-cols-12">
          <div className="col-span-8 py-3">
            <CardHeader className="p-0">
            </CardHeader>
            <CardContent className="py-0 min-h-full min-h-[60vh]">
              <form onSubmit={submit} className="flex flex-col">
                <div className="w-full flex justify-between items-between">
                  <div className="">Data</div>
                  <Button type="submit" size="sm">
                    Edit {module_name}
                  </Button>
                </div>

                {isDataLoading ? (
                  <h4>loading</h4>
                ) : modules_fields ? (
                  <div className="grid gap-6 grid-cols-12">
                    {modules_fields.map((module_field: any, field_key: number) => (
                      <ModuleField key={field_key} formData={formData} module_field={module_field} onModuleFieldUpdated={(data) => setFormData(data)} enableAddRelatedItems={true}></ModuleField>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </form>
            </CardContent>
          </div>
          <div className="col-span-4 border"></div>
        </div>
      </Card>
    </div>
  );
}




// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useNavigate, useOutletContext, useParams } from "react-router-dom";
// import companyModuleRepository from "@/repositories/company/companyModuleRepository";
// import { ChevronLeft, Download, Ellipsis, FileIcon, Lock, MailIcon, MessageSquare, Plus, PlusCircle, Trash2, User } from "lucide-react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { ModuleField } from "@/components/moduleField";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Dropzone } from "@/components/ui/dropzone";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Spinner } from "@/components/ui/spinner";
// import { ToastAction } from "@/components/ui/toast";
// import { useToast } from "@/hooks/use-toast";
// import { Switch } from "@/components/ui/switch";
// import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import AgentLead from "./view/agent_lead";

// // import { ToastAction } from '@/components/ui/toast';
// // import { useToast } from "@/hooks/use-toast";

// export default function CompanyModuleItemAdd() {
//   interface FormData {
//     [key: string]: string;
//   }

//   interface LinkItem {
//     url: string;
//     label: string;
//     active: boolean;
//   }

//   interface RootResponse {
//     current_page: number;
//     data: [];
//     first_page_url: string;
//     from: number;
//     last_page: number;
//     last_page_url: string;
//     links: LinkItem[];
//     next_page_url?: string;
//     path: string;
//     per_page: number;
//     prev_page_url?: string;
//     to: number;
//     total: number;
//   }

//   let navigate = useNavigate();
//   const params = useParams();

//   const { toast } = useToast();
//   // let params = useParams();
//   const context: any = useOutletContext();
//   const { module_id, module_name } = context;

//   const [isActivityLoading, setIsActivityLoading] = useState(true);
//   const [isDataLoading, setIsDataLoading] = useState(true);
//   const [isCommentsLoading, setIsCommentsLoading] = useState(true);
//   const [isNotesLoading, setIsNotesLoading] = useState(true);
//   const [isAttachmentsLoading, setIsAttachmentsLoading] = useState(true);

//   const [, setIsError] = useState(false);
//   const [activeTab, setActiveTab] = useState("activity");
//   const [isAddCommentOpen, setIsAddCommentOpen] = useState(false);
//   const [activities, setActivites] = useState<RootResponse>();
//   const [comments, setComments] = useState<RootResponse>();
//   const [notes, setNotes] = useState<RootResponse>();
//   const [attachments, setAttachments] = useState<RootResponse>();

//   const [isAddCommentLoading, setIsAddCommentLoading] = useState(false);
//   const [isAddNoteLoading, setIsAddNoteLoading] = useState(false);

//   const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
//   const [isAddAttachmentOpen, setIsAddAttachmentOpen] = useState(false);

//   const [modules_fields, setModulesFields] = useState<any>();
//   const [formData, setFormData] = useState<FormData>({});

//   // const [isAdvancedEnabled, setIsAadvancedEnabled] = useState(false);
//   // const [relatedModuleFields] = useState<{ [key: string]: any }>({});

//   const default_tab = "activity";

//   const commentFormSchema = z.object({
//     description: z.string().min(3, {
//       message: "comment must be at least 2 characters.",
//     }),
//   });

//   const commentForm = useForm<z.infer<typeof commentFormSchema>>({
//     resolver: zodResolver(commentFormSchema),
//     defaultValues: {
//       description: "",
//     },
//   });

//   const noteFormSchema = z.object({
//     title: z.string().min(3, {
//       message: "title must be at least 2 characters.",
//     }),
//     is_private: z.boolean().default(false),
//     content: z.string().min(3, {
//       message: "description must be at least 2 characters.",
//     }),
//   });

//   const noteForm = useForm<z.infer<typeof noteFormSchema>>({
//     resolver: zodResolver(noteFormSchema),
//     defaultValues: {
//       title: "",
//       content: "",
//     },
//   });

//   const fetchModuleData = async function () {
//     const fieldsResponse = await companyModuleRepository.getModuleFields(module_id);
//     const itemResponse = await companyModuleRepository.getModuleItemDetails(module_id, params.item_id);

//     if (fieldsResponse.success && itemResponse.success) {
//       setModulesFields(fieldsResponse.data);

//       let form: FormData = {};
//       fieldsResponse.data.map((field: any) => {
//         form[field.name] = itemResponse.data[field.name];
//       });
//       setFormData(form);

//       // let relatedModulesTemp: { [key: string]: any } = {};
//       // Object.keys(fieldsResponse.data).map((module, key) => {
//       //     if (key == 0) {
//       //     }
//       //     setRelatedModuleFields(relatedModulesTemp);
//       // })
//     } else {
//       setIsError(true);
//     }
//     setIsDataLoading(false);
//   };

//   const fetchActivities = async function () {
//     setIsActivityLoading(true);
//     const response = await companyModuleRepository.getModuleItemActivites(module_id, params.item_id);
//     if (response.success) {
//       setActivites(response.data);
//     }
//     setIsActivityLoading(false);
//   };

//   const fetchComments = async function () {
//     const response = await companyModuleRepository.getModuleItemComments(module_id, params.item_id);
//     if (response.success) {
//       setComments(response.data);
//     }
//     setIsCommentsLoading(false);
//   };

//   const saveCommentSubmit = async function (values: z.infer<typeof commentFormSchema>) {
//     setIsAddCommentLoading(true);
//     const response = await companyModuleRepository.saveModuleItemComment(module_id, params.item_id, values);
//     if (response.success) {
//       fetchComments();
//       setIsAddCommentOpen(false);
//       toast({
//         variant: "default",
//         duration: 800,
// className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
//         title: "comment successfully saved",
//         action: <ToastAction altText="close">close</ToastAction>,
//       });
//       commentForm.reset();
//     } else {
//       console.log(response);
//       toast({
//         variant: "destructive",
//         duration: 800,
// className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
//         title: "unable to save comment",
//         action: <ToastAction altText="close">close</ToastAction>,
//       });
//     }

//     setIsAddCommentLoading(false);
//   };

//   const fetchNotes = async function () {
//     setIsNotesLoading(true);
//     const response = await companyModuleRepository.getModuleItemNotes(module_id, params.item_id);
//     if (response.success) {
//       setNotes(response.data);
//     }
//     setIsNotesLoading(false);
//   };

//   const saveNoteSubmit = async function (values: z.infer<typeof noteFormSchema>) {
//     setIsAddNoteLoading(true);
//     const response = await companyModuleRepository.saveModuleItemNote(module_id, params.item_id, values);
//     if (response.success) {
//       fetchNotes();
//       setIsAddNoteOpen(false);
//       toast({
//         variant: "default",
//         duration: 800,
// className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
//         title: "note successfully saved",
//         action: <ToastAction altText="close">close</ToastAction>,
//       });
//       noteForm.reset();
//     } else {
//       console.log(response);
//       toast({
//         variant: "destructive",
//         duration: 800,
// className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
//         title: "unable to save note",
//         action: <ToastAction altText="close">close</ToastAction>,
//       });
//     }

//     setIsAddNoteLoading(false);
//   };

//   const fetchAttachments = async function () {
//     setIsAttachmentsLoading(true);
//     const response = await companyModuleRepository.getModuleItemAttachments(module_id, params.item_id);
//     if (response.success) {
//       setAttachments(response.data);
//     }
//     setIsAttachmentsLoading(false);
//   };

//   const handleAttachmentUploaded = async function (fileId: number) {
//     console.log("uplaoded", fileId);

//     const response = await companyModuleRepository.saveModuleItemAttachment(module_id, params.item_id, { attachment_id: fileId });
//     setIsAddAttachmentOpen(false);
//     if (response.success) {
//       toast({
//         variant: "default",
//         duration: 800,
// className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
//         title: "attachment successfully saved",
//         action: <ToastAction altText="close">close</ToastAction>,
//       });
//       fetchAttachments();
//     } else {
//       toast({
//         variant: "destructive",
//         duration: 800,
// className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
//         title: "unable to save attachment",
//         action: <ToastAction altText="close">close</ToastAction>,
//       });
//     }
//   };

//   useEffect(() => {
//     // setIsLoading(true);
//     if (activeTab === "activity") {
//       setIsActivityLoading(true);
//       fetchActivities();
//     }
//     if (activeTab === "data") {
//       setIsDataLoading(true);
//       fetchModuleData();
//     }
//     if (activeTab === "notes") {
//       setIsNotesLoading(true);
//       fetchNotes();
//     }
//     if (activeTab === "comments") {
//       setIsCommentsLoading(true);
//       fetchComments();
//     }

//     if (activeTab === "attachments") {
//       setIsAttachmentsLoading(true);
//       fetchAttachments();
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     if (default_tab === "activity") {
//       fetchActivities();
//     }
//   }, []);

//   const submit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     // const response = await companyModuleRepository.updateModuleItem(params.item_id,module_id, formData);
//     // if (response.success) {
//     //     toast({
//     //         variant: "default",
//     //         duration: 800,
// className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
//     //         title: "data items successfully imported",
//     //         action: <ToastAction altText="close">close</ToastAction>,
//     //     })
//     //     navigate(`/company/module/${module_id}/${default_view}`)
//     // }
//   };

//   // const loadRelatedModuleFields = async function () {

//   //     //fetch related modules fields and
//   //     modules_fields.map(async (field: { type: any, related_mdoule: { permalink: string } }) => {
//   //         if (field.type === "select_relational") {
//   //             console.log(field)
//   //             const fieldsResponse = await companyModuleRepository.getModuleFields(field.related_mdoule.permalink);
//   //             if (fieldsResponse.success) {
//   //                 setRelatedModuleFields(
//   //                     prevState => ({
//   //                         ...prevState,
//   //                         [field.related_mdoule.permalink]: fieldsResponse.data
//   //                     })
//   //                 );
//   //             }
//   //         }
//   //     })
//   // }

//   // const handleToggleAdvanced = async function () {
//   //   // console.log(params)
//   //   // setRelatedModuleFieldsLoading(true);
//   //   // await loadRelatedModuleFields();
//   //   // setRelatedModuleFieldsLoading(false);
//   //   setIsAadvancedEnabled(!isAdvancedEnabled);
//   // };

//   return (
//     <div className="flex flex-col">
//       <div className="flex items-center gap-4 mb-4">
//         <Button type="button" variant="outline" size="icon" onClick={() => navigate("/administrator/companies")} className="h-7 w-7">
//           <ChevronLeft className="h-4 w-4" />
//           <span className="sr-only">Back</span>
//         </Button>
//         <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 text-white">Edit {module_name}</h1>
//       </div>
//       <Tabs defaultValue={default_tab} onValueChange={(tab) => setActiveTab(tab)} className="relative mr-auto w-full">
//         <Card>
//           <div className="grid grid-cols-12">
//             <div className="col-span-8 py-3">
//               <CardHeader className="p-0">
//                 <div className="flex items-center justify-between pb-3">
//                   <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
//                     <TabsTrigger value="activity" className="relative min-h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
//                       Activity
//                     </TabsTrigger>
//                     <TabsTrigger value="data" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
//                       Data
//                     </TabsTrigger>

//                     <TabsTrigger value="comments" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
//                       Comments
//                     </TabsTrigger>

//                     <TabsTrigger value="notes" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
//                       Notes
//                     </TabsTrigger>

//                     <TabsTrigger value="attachments" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
//                       Attachments
//                     </TabsTrigger>
//                   </TabsList>
//                 </div>
//               </CardHeader>
//               <CardContent className="py-0 min-h-full min-h-[60vh]">
//                 <TabsContent value="activity">
//                   <div className="w-full flex justify-between items-between">
//                     <div className="font-bold">Activities</div>
//                     <div className=""></div>
//                   </div>

//                   <div className="">
//                     <div className="space-y-6 relative">
//                       <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200"></div>

//                       <div className="flex items-start gap-4 relative pl-8">
//                         <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-white border-2 border-gray-300"></div>
//                         <div className="mt-1">
//                           <User className="h-5 w-5 text-gray-600" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-1">
//                             <span className="font-medium">blaxk</span>
//                             <span className="text-gray-700">Another activity item</span>
//                           </div>
//                         </div>
//                         <div className="text-gray-500 text-sm whitespace-nowrap">4 h</div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="">
//                     <div className="space-y-6 relative">
//                       <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200"></div>

//                       <div className="flex items-start gap-4 relative pl-8">
//                         <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-white border-2 border-gray-300"></div>
//                         <div className="mt-1">
//                           <User className="h-5 w-5 text-gray-600" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-1">
//                             <span className="font-medium">blaxk</span>
//                             <span className="text-gray-700">Another activity item</span>
//                           </div>
//                         </div>
//                         <div className="text-gray-500 text-sm whitespace-nowrap">4 h</div>
//                       </div>
//                     </div>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="data">
//                   <form onSubmit={submit} className="flex flex-col">
//                     <div className="w-full flex justify-between items-between">
//                       <div className="">Data</div>
//                       <Button type="submit" size="sm">
//                         Edit {module_name}
//                       </Button>
//                     </div>

//                     {isDataLoading ? (
//                       <h4>loading</h4>
//                     ) : modules_fields ? (
//                       <div className="grid gap-6 grid-cols-12">
//                         {modules_fields.map((module_field: any, field_key: number) => (
//                           <ModuleField key={field_key} formData={formData} module_field={module_field} onModuleFieldUpdated={(data) => setFormData(data)} enableAddRelatedItems={true}></ModuleField>
//                         ))}
//                       </div>
//                     ) : (
//                       <></>
//                     )}
//                   </form>
//                 </TabsContent>

//                 <TabsContent value="comments">
//                   <div className="w-full flex justify-between items-between">
//                     <div className="font-bold">Comments</div>
//                     <Button type="submit" size="sm" onClick={() => setIsAddCommentOpen(true)}>
//                       <Plus></Plus>
//                       Add Comment
//                     </Button>
//                   </div>

//                   {!isCommentsLoading ? (
//                     comments!.data.length > 0 ? (
//                       <div className="space-y-8">
//                         {comments!.data.map((comment: { id: number }, key) => (
//                           <div className="flex gap-4">
//                             <div className="flex-shrink-0">
//                               <MessageSquare className="h-5 w-5 text-gray-600" />
//                             </div>
//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 mb-2">
//                                 <div className="flex items-center gap-2">
//                                   <div className="w-8 h-8 rounded-full overflow-hidden bg-amber-200">
//                                     <img src="https://frappecrm-demo.frappe.cloud/files/Andy%20Vienna.png" width={32} height={32} alt="blaxk" className="object-cover" />
//                                   </div>
//                                   <span className="font-medium">ahmad</span>
//                                   <span className="text-gray-600">added a</span>
//                                   <span className="font-medium">comment</span>
//                                 </div>
//                                 <div className="ml-auto text-gray-500 text-sm">4h</div>
//                               </div>
//                               <div className="bg-gray-50 p-4 rounded-md mb-4">
//                                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti impedit illo veniam, earum necessitatibus molestias recusandae facere ipsa alias. Expedita quo quaerat deleniti sequi maxime rerum quasi quas voluptates praesentium?</p>
//                               </div>
//                               <div className="flex gap-4">
//                                 <Button variant="ghost" className="text-gray-600 p-0 h-auto">
//                                   <MailIcon className="h-4 w-4 mr-2" />
//                                   Reply
//                                 </Button>
//                                 <Button variant="ghost" className="text-gray-600 p-0 h-auto">
//                                   <MessageSquare className="h-4 w-4 mr-2" />
//                                   Comment
//                                 </Button>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="my-4">
//                         <div className="flex flex-col items-center justify-center space-y-4">
//                           <div className="rounded-full bg-muted p-4">
//                             <PlusCircle className="h-8 w-8 text-muted-foreground" />
//                           </div>
//                           <div className="text-lg font-medium">No items available</div>
//                           <div className="text-sm text-muted-foreground">Add your first comment to get started.</div>
//                         </div>
//                       </div>
//                     )
//                   ) : (
//                     <h4>comments loading</h4>
//                   )}
//                 </TabsContent>

//                 <TabsContent value="notes">
//                   <div className="w-full flex justify-between items-between">
//                     <div className="font-bold">Notes</div>
//                     <Button type="submit" size="sm" onClick={() => setIsAddNoteOpen(true)}>
//                       <Plus></Plus>
//                       Add Note
//                     </Button>
//                   </div>

//                   {!isNotesLoading ? (
//                     notes!.data.length > 0 ? (
//                       <div className="grid grid-cols-12 gap-4">
//                         {notes!.data.map((note: { id: number }, key) => (
//                           <div className="col-span-4">
//                             <Card className="bg-[#F8F8F8] aspect-square">
//                               <CardHeader className="flex flex-row justify-between">
//                                 <div className="">Lorem Ipsum</div>
//                                 <DropdownMenu>
//                                   <DropdownMenuTrigger>
//                                     <Ellipsis />
//                                   </DropdownMenuTrigger>
//                                   <DropdownMenuContent>
//                                     <DropdownMenuItem>
//                                       {" "}
//                                       <Trash2 size={16} /> <span className="mx-2">Delete</span>{" "}
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem>
//                                       {" "}
//                                       <Lock size={16} /> <span className="mx-2">Convert to public</span>
//                                     </DropdownMenuItem>
//                                   </DropdownMenuContent>
//                                 </DropdownMenu>
//                               </CardHeader>
//                               <CardContent></CardContent>
//                             </Card>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="my-4">
//                         <div className="flex flex-col items-center justify-center space-y-4">
//                           <div className="rounded-full bg-muted p-4">
//                             <PlusCircle className="h-8 w-8 text-muted-foreground" />
//                           </div>
//                           <div className="text-lg font-medium">No items available</div>
//                           <div className="text-sm text-muted-foreground">Add your first note to get started.</div>
//                         </div>
//                       </div>
//                     )
//                   ) : (
//                     <h4>notes loading</h4>
//                   )}
//                 </TabsContent>

//                 <TabsContent value="attachments">
//                   <div className="w-full flex justify-between items-between">
//                     <div className="font-bold">Attachments</div>
//                     <Button type="submit" size="sm" onClick={() => setIsAddAttachmentOpen(true)}>
//                       <Plus></Plus>
//                       Add Attachment
//                     </Button>
//                   </div>

//                   {!isAttachmentsLoading ? (
//                     attachments!.data.length > 0 ? (
//                       <div className="space-y-4">
//                         {attachments!.data.map(
//                           (attachment: { id: number }, key) => (
//                             <div className="flex items-center gap-4 py-3 border-b">
//                               <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center">
//                                 <FileIcon className="h-6 w-6 text-gray-500" />
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <div className="font-medium text-gray-800">test.png</div>
//                                 <div className="text-gray-500 text-sm">4 MB</div>
//                               </div>
//                               <div className="text-gray-500 text-sm whitespace-nowrap">6 h</div>
//                               <div className="flex gap-2">
//                                 <Button variant="ghost" size="icon" className="h-8 w-8">
//                                   <Download className="h-4 w-4 text-gray-500" />
//                                   <span className="sr-only">Download</span>
//                                 </Button>
//                                 <Button variant="ghost" size="icon" className="h-8 w-8">
//                                   <Trash2 className="h-4 w-4 text-gray-500" />
//                                   <span className="sr-only">Delete</span>
//                                 </Button>
//                               </div>
//                             </div>
//                           )

//                           // <h4 key={key}>{attachment.id}</h4>
//                         )}
//                       </div>
//                     ) : (
//                       <div className="my-4">
//                         <div className="flex flex-col items-center justify-center space-y-4">
//                           <div className="rounded-full bg-muted p-4">
//                             <PlusCircle className="h-8 w-8 text-muted-foreground" />
//                           </div>
//                           <div className="text-lg font-medium">No items available</div>
//                           <div className="text-sm text-muted-foreground">Add your first note to get started.</div>
//                         </div>
//                       </div>
//                     )
//                   ) : (
//                     <h4>attachments loading</h4>
//                   )}
//                 </TabsContent>
//               </CardContent>
//             </div>
//             <div className="col-span-4 border"></div>
//           </div>
//         </Card>
//       </Tabs>

//       <Dialog open={isAddCommentOpen} onOpenChange={setIsAddCommentOpen}>
//         <DialogContent className="">
//           <DialogHeader>
//             <DialogTitle>Add Comment</DialogTitle>
//           </DialogHeader>
// <Form {...commentForm}>
//   <form onSubmit={commentForm.handleSubmit(saveCommentSubmit)}>
//     <div className="mb-2">
//       <FormField
//         control={commentForm.control}
//         name="description"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Comment</FormLabel>
//             <FormControl>
//               <Textarea {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </div>
//     <DialogFooter>
//       <Button className="mt-4" type="submit" disabled={isAddCommentLoading || isCommentsLoading}>
//         <span> {isAddCommentLoading ? <Spinner></Spinner> : <></>} </span> Save comment
//       </Button>
//     </DialogFooter>
//   </form>
// </Form>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen}>
//         <DialogContent className="">
//           <DialogHeader>
//             <DialogTitle>Add Note</DialogTitle>
//           </DialogHeader>
// <Form {...noteForm}>
//   <form onSubmit={noteForm.handleSubmit(saveNoteSubmit)}>
//     <div className="mb-2">
//       <FormField
//         control={noteForm.control}
//         name="title"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Title</FormLabel>
//             <FormControl>
//               <Input type="text" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </div>
//     <div className="mb-2">
//       <FormField
//         control={noteForm.control}
//         name="is_private"
//         render={({ field }) => (
//           <FormItem>
//             <FormControl className="me-2">
//               <Switch checked={field.value} onCheckedChange={field.onChange} />
//               {/* <Input type="" {...field} /> */}
//             </FormControl>
//             <FormLabel>Private </FormLabel>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </div>

//     <div className="mb-2">
//       <FormField
//         control={noteForm.control}
//         name="content"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Comment</FormLabel>
//             <FormControl>
//               <Textarea {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </div>
//     <DialogFooter>
//       <Button type="submit" disabled={isAddNoteLoading || isNotesLoading}>
//         {" "}
//         <span> {isAddNoteLoading ? <Spinner></Spinner> : <></>} </span> Save Note
//       </Button>
//     </DialogFooter>
//   </form>
// </Form>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={isAddAttachmentOpen} onOpenChange={setIsAddAttachmentOpen}>
//         <DialogContent className="">
//           <DialogHeader>
//             <DialogTitle>Add Attachment</DialogTitle>
//           </DialogHeader>

//           <div>
//             <Label>import data from csv file</Label>
//             <div className="my-4">
//               <Dropzone form={{}} uploadToMedia={true} allowedFormats={["image/jpeg", "text/csv", "application/vnd.ms-excel", "application/csv", "text/x-csv", "application/x-csv", "text/comma-separated-values", "text/x-comma-separated-values"]} type="multiple" onFilesAdded={(fileId, _) => handleAttachmentUploaded(fileId)}></Dropzone>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
