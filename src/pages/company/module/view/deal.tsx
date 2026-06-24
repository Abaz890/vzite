import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Building2, ChevronLeft, CirclePlus, Download, Ellipsis, FileIcon, FileText, Home, List, Lock, Mail, MessageCircle, Pencil, Phone, Search, StickyNote, Trash2, Upload, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import SkeletonAgentLeadView from "@/components/skeletonLeadView";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import companyModuleRepository from "@/repositories/company/companyModuleRepository";
import { useParams } from "react-router-dom";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { Dropzone } from "@/components/ui/dropzone";
import { EditItemModal, EditItemModalRef } from "@/components/edititemModal";
import SkeletonComments from "@/components/skeletonComments";
import { Skeleton } from "@/components/ui/skeleton";
import { ModuleField } from "@/components/moduleField";
import { PropertyCard } from "@/components/off_plan_map/property-card";
import { useNavigate } from "react-router-dom";
import { useModuleState } from "@/providers/moduleContext";
import { getInitials } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
// import companyPropertyRepository from "@/repositories/company/companyPropertyRepository";
// import companyOffPlanRepository from "@/repositories/company/companyOffPlanRepository";



interface LinkItem {
  url: string;
  label: string;
  active: boolean;
}

interface RootResponse {
  current_page: number;
  data: any[];
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

interface FormData {
  [key: string]: string;
}

function CommentItem({ comment, list }: { comment: any; list: string }) {
  {
    list;
  }
  return (
    <div className="flex gap-4">
      {/* <Button className="p-2" variant={'outline'} onClick={() => navigate(-1)} disabled={window.history.length == 0}><ChevronLeft /></Button> */}
      <div className="flex-1">
        {list === "tab" ? (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-amber-200">
                <img src="https://frappecrm-demo.frappe.cloud/files/Andy%20Vienna.png" width={32} height={32} alt="blaxk" className="object-cover" />
              </div>
              <span className="font-medium">{comment.employee.name}</span>
              <span className="text-gray-600">added a</span>
              <span className="font-medium">comment</span>
            </div>
            <div className="ml-auto text-gray-500 text-sm">{comment.created_at}</div>
          </div>
        ) : (
          <></>
        )}
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <p>{comment.description}</p>
        </div>
        {/* <div className="flex gap-4">
        <Button variant="ghost" className="text-gray-600 p-0 h-auto">
          <MailIcon className="h-4 w-4 mr-2" />
          Reply
        </Button>
        <Button variant="ghost" className="text-gray-600 p-0 h-auto">
          <MessageSquare className="h-4 w-4 mr-2" />
          Comment
        </Button>
      </div> */}
      </div>
    </div>
  );
}

function AttachmentItem({ attachment, list }: { attachment: any; list: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b">
      <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center">
        <FileIcon className="h-6 w-6 text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-800">{attachment.name}</div>
        <div className="text-gray-500 text-sm">{attachment.size}</div>
      </div>
      {list === "tab" ? <div className="text-gray-500 text-sm whitespace-nowrap">{attachment.created_at}</div> : <></>}
      {list === "tab" ? (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
            window.open(attachment.url, '_blank');

          }}>
            <Download className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Download</span>
          </Button>
          {/* <Button variant="ghost" size="icon" className="h-8 w-8"  >
            <Trash2 className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Delete</span>
          </Button> */}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function NoteItem({ note, list }: { note: any; list: string }) {
  return (
    <div className="col-span-4">
      <Card className={` ${list === "tab" ? "aspect-square" : ""} bg-[#F8F8F8] flex flex-col justify-between`}>
        <div className="">
          <CardHeader className="flex flex-row justify-between p-0 pe-2">
            <div className="p-3 font-semibold truncate">{note.title}</div>
            {list === "tab" ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Trash2 size={16} /> <span className="mx-2">Delete</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Lock size={16} /> <span className="mx-2">Convert to public</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <></>
            )}
          </CardHeader>
          <CardContent className="p-3">
            <div className="break-words ">{note.description}</div>
          </CardContent>
        </div>
        <CardFooter className="p-3">
          <Button variant="link" className="overflow-hidden rounded-full p-0">
            <div className="flex items-center">
              <Avatar className="h-6 w-6">
                <AvatarImage src={note.employee.avatar} alt={note.employee.name} />
                <AvatarFallback className="bg-slate-200 text-slate-600">{note.employee.name[0]}</AvatarFallback>
              </Avatar>
              <span className="mx-2"> {note.employee.name}</span>
            </div>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function DealView() {


  const [isInitalLoading, setIsInitialLoading] = useState(true);
  const [, setIsLoading] = useState(true);
  const [modules_fields, setModulesFields] = useState<any>();
  const [formData, setFormData] = useState<FormData>({});

  // const [, setIsError] = useState(false);


  const [isActiveTabLoading, setIsActiveTabLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("activity");
  const [activeActionTab, setActiveActionTab] = useState("add_comment");

  const [data, setData] = useState<any>();
  const [activities, setActivities] = useState<RootResponse>();
  const [comments, setComments] = useState<RootResponse>();
  const [notes, setNotes] = useState<RootResponse>();
  const [attachments, setAttachments] = useState<RootResponse>();

  const [isAddCommentLoading, setIsAddCommentLoading] = useState(false);
  const [isAddNoteLoading, setIsAddNoteLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [isRelatedPropertyLoading, setIsRelatedPropertyLoading] = useState(true);
  const [relatedProperty, setRelatedProperty] = useState();


  const editCustomerModalRef = useRef<EditItemModalRef>(null);

  const { toast } = useToast();
  let navigate = useNavigate();
  const params = useParams();
  const { moduleId } = useModuleState();


  const fetchModuleData = async function () {
    setIsLoading(true);
    const itemResponse = await companyModuleRepository.getModuleItemDetails(moduleId.value, params.item_id);
    if (itemResponse.success) {
      setData(itemResponse.data);
    }



    //fetch related item if exisists
    let related_property_id;
    let related_property;
    if (moduleId.value === 'deal_4266') {
      related_property_id = itemResponse.data.property_reference_id;
      related_property = itemResponse.data.related_property
    }
    if (moduleId.value === 'management_5873') {
      if (itemResponse.data.related_items.deal) {
        related_property_id = itemResponse.data.related_items.deal.property_reference_id;
        related_property = itemResponse.data.related_items.deal.related_property;
      }
    }

    if (related_property_id && related_property) {
      setRelatedProperty(related_property);
    }
    // let response;
    // if (itemResponse.data.source === 'facebook_instant_form') {
    //   response = await companyOffPlanRepository.getProject(related_property_id);
    // }
    // else {
    //   response = await companyPropertyRepository.getProperty(related_property_id);
    // }
    // if (response.success) {
    // }

    setIsLoading(false);
    setIsRelatedPropertyLoading(false);
    setIsInitialLoading(false);
  };

  const noteFormSchema = z.object({
    title: z.string().min(3, {
      message: "title must be at least 2 characters.",
    }),
    is_private: z.boolean().default(false),
    content: z.string().min(3, {
      message: "description must be at least 2 characters.",
    }),
  });

  const commentFormSchema = z.object({
    description: z.string().min(3, {
      message: "comment must be at least 2 characters.",
    }),
  });

  const commentForm = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      description: "",
    },
  });

  const noteForm = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const fetchActivities = async function () {
    const response = await companyModuleRepository.getModuleItemActivities(moduleId.value, params.item_id);
    if (response.success) {
      setActivities(response.data);
    }
    setIsActiveTabLoading(false);
  };

  const fetchNotes = async function () {
    const response = await companyModuleRepository.getModuleItemNotes(moduleId.value, params.item_id);
    if (response.success) {
      setNotes(response.data);
    }
    setIsActiveTabLoading(false);
  };

  const saveNoteSubmit = async function (values: z.infer<typeof noteFormSchema>) {
    setIsAddNoteLoading(true);
    const response = await companyModuleRepository.saveModuleItemNote(moduleId.value, params.item_id, values);
    if (response.success) {
      if (activeTab === "notes") {
        fetchNotes();
      }
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "note successfully saved",
        action: <ToastAction altText="close">close</ToastAction>,
      });
      fetchActivities();
      noteForm.reset();
    } else {
      console.log(response);
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "unable to save note",
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }

    setIsAddNoteLoading(false);
  };

  const fetchComments = async function () {
    const response = await companyModuleRepository.getModuleItemComments(moduleId.value, params.item_id);
    if (response.success) {
      setComments(response.data);
    }
    setIsActiveTabLoading(false);
  };

  const saveCommentSubmit = async function (values: z.infer<typeof commentFormSchema>) {
    setIsAddCommentLoading(true);
    const response = await companyModuleRepository.saveModuleItemComment(moduleId.value, params.item_id, values);
    if (response.success) {
      if (activeTab === "comments") {
        fetchComments();
      }
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "comment successfully saved",
        action: <ToastAction altText="close">close</ToastAction>,
      });
      fetchActivities();
      commentForm.reset();
    } else {
      console.log(response);
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "unable to save comment",
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }

    setIsAddCommentLoading(false);
  };

  const fetchAttachments = async function () {
    const response = await companyModuleRepository.getModuleItemAttachments(moduleId.value, params.item_id);
    if (response.success) {
      setAttachments(response.data);
    }
    setIsActiveTabLoading(false);
  };

  const handleAttachmentUploaded = async function (fileId: number) {
    console.log("uplaoded", fileId);

    const response = await companyModuleRepository.saveModuleItemAttachment(moduleId.value, params.item_id, { attachment_id: fileId });
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "attachment successfully saved",
        action: <ToastAction altText="close">close</ToastAction>,
      });
      console.log(activeTab);
      if (activeTab === "attachments") fetchAttachments();
      fetchActivities();
    } else {
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "unable to save attachment",
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
  };

  const handleCustomerEdited = function () {
    fetchModuleData();
    fetchActivities();
  };

  const fetchModuleForm = async function () {
    setIsActiveTabLoading(true);
    const fieldsResponse = await companyModuleRepository.getModuleFields(moduleId.value);

    if (fieldsResponse.success) {
      setModulesFields(fieldsResponse.data);

      let form: FormData = {};
      fieldsResponse.data.map((field: any) => {
        form[field.name] = data[field.name];
        if (field.type === 'select_relational') {
          if (field.related_module.name in data.related_items) {
            const label = `${data.related_items[field.related_module.name]['it_name']} - ${data.related_items[field.related_module.name][field.related_module.primary_field] ?? '(empty)'}`;
            form[`${field.name}_label`] = label
          }
        }
      });
      setFormData(form);
    }
    setIsActiveTabLoading(false);
  };

  const submit = async (e: { preventDefault: () => void }) => {
    setIsSubmitLoading(true);
    e.preventDefault();

    //clean formData from labels 
    const cleanedFormData = Object.fromEntries(
      Object.entries(formData).filter(([key]) => !key.endsWith('_label'))
    );

    const response = await companyModuleRepository.updateModuleItem(params.item_id, moduleId.value, cleanedFormData);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "data items successfully imported",
        action: <ToastAction altText="close">close</ToastAction>,
      });
      fetchModuleData();
      // navigate(`/company/module/${module_id}/${default_view}`)
    }
    setIsSubmitLoading(false);
  };

  useEffect(() => {
    // setIsLoading(true);
    if (activeTab === "activity") {
      fetchActivities();
    }
    if (activeTab === "notes") {
      fetchNotes();
    }
    if (activeTab === "comments") {
      fetchComments();
    }

    if (activeTab === "attachments") {
      fetchAttachments();
    }
    if (activeTab === "data") {
      fetchModuleForm();
    }
  }, [activeTab]);

  useEffect(() => {
    fetchModuleData();
  }, []);

  return (
    <>
      {isInitalLoading ? (
        <SkeletonAgentLeadView></SkeletonAgentLeadView>
      ) : (
        <>

          <div className="mb-2">
            <Button className="h-7 w-7" variant={'outline'} onClick={() => navigate(-1)} disabled={window.history.length == 0} ><ChevronLeft /></Button>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 flex flex-col">
              <Card className="mb-4 pt-4">
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-slate-200 text-slate-600">{data.related_items.customer.name ? data.related_items.customer.name[0] : "V"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold">{data.related_items.customer.name ?? <Button variant="link" className="w-full justify-start px-0" onClick={() => editCustomerModalRef.current?.toggleModal(data.related_items.customer.it_name, data.related_items.customer.module_permalink)}> Add name</Button>}</h2>
                    </div>
                  </div>
                  <div className="space-y-2 p-0">
                    {data.related_items.customer.phone ? (
                      <div className="w-full flex items-center mt-2 py-2">
                        <Phone className="me-2 h-4 w-4" />
                        <div className="">{data.related_items.customer.phone}</div>
                      </div>
                    ) : (
                      <Button variant="link" className="w-full justify-start px-0" onClick={() => editCustomerModalRef.current?.toggleModal(data.related_items.customer.it_name, data.related_items.customer.module_permalink)}>
                        <Phone className="me-2 h-4 w-4" />
                        Add phone
                      </Button>
                    )}
                    {data.related_items.customer.email ? (
                      <div className="w-full flex items-center mt-2 py-2">
                        <Mail className="me-2 h-4 w-4" />
                        <div className="">{data.related_items.customer.email}</div>
                      </div>
                    ) : (
                      <Button variant="link" className="w-full justify-start px-0" onClick={() => editCustomerModalRef.current?.toggleModal(data.related_items.customer.it_name, data.related_items.customer.module_permalink)}>
                        <Mail className="me-2 h-4 w-4" />
                        Add Email address
                      </Button>
                    )}
                    {data.related_items.customer.address ? (
                      <div className="w-full flex items-center mt-2 py-2">
                        <Home className="me-2 h-4 w-4" />
                        <div className="">{data.related_items.customer.address}</div>
                      </div>
                    ) : (
                      <Button variant="link" className="w-full justify-start px-0" onClick={() => editCustomerModalRef.current?.toggleModal(data.related_items.customer.it_name, data.related_items.customer.module_permalink)}>
                        <Home className="me-2 h-4 w-4" />
                        Add Address
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              {
                isRelatedPropertyLoading ?
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <Skeleton className="w-full h-[150px]" />
                    <div className="p-4 space-y-3">
                      <div className="flex items-center">
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-8" />
                        <div className="text-gray-400">|</div>
                        <Skeleton className="h-4 w-8" />
                        <div className="text-gray-400">|</div>
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  </div>
                  :
                  <Card className="mb-4">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div className="flex">
                          <Building2 />
                          <div className="mx-4">Related Property</div>
                        </div>
                        <div className="">
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {relatedProperty ?
                        <PropertyCard carouselEnabled={false} imgSrckey="upload.url" property={relatedProperty} />
                        :
                        <div className="flex flex-col items-center justify-center py-12 px-6 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No Related Properties Found</h3>
                          {/* <p className="text-sm text-gray-500 text-center max-w-xs">
                            We couldn't find any properties similar to this one in the area. Try expanding your search criteria.
                          </p> */}
                        </div>
                      }
                    </CardContent>
                  </Card>
              }
              <Card className="mb-4">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <List />
                      <div className="mx-4">Details</div>
                    </div>
                    <div className="">
                      <Button variant={"link"} onClick={() => { setActiveTab('data') }} className="p-0">
                        <Pencil />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 p-0">
                    <div className="">
                      <span className="font-bold">ID: </span>
                      <span>{data.it_name}</span>
                    </div>

                    <div className="">
                      <span className="font-bold">Title: </span>
                      <span>{data.title !== null && data.title.length > 0 ? data.title : '(empty)'}</span>
                    </div>

                    <div className="">
                      <span className="font-bold">Type: </span>
                      <span>{data.action ?? '(empty)'}</span>
                    </div>
                    <div className="">
                      <span className="font-bold">Source: </span>
                      <span>{data.source}</span>
                    </div>
                    <div className="">
                      <span className="font-bold">Amount: </span>
                      <span> {data.amount !== null && data.amount.length > 0 ? `${data.amount} AED` : '(empty)'} </span>
                    </div>
                    <div className="">
                      <span className="font-bold">Agent: </span>
                      <Button variant="link" className="overflow-hidden rounded-full">
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-slate-200 text-slate-600">{data.assigned_to.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="mx-2"> {data.assigned_to.name}</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-4">
                <CardHeader>
                  <div className="flex">
                    <List />
                    <div className="mx-4">Related Items</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 p-0">
                    <div className="flex flex-wrap">
                      {Object.keys(data!.related_items).map((releted_item, key) =>
                        data.related_items[releted_item] !== null ? (
                          <div key={key} className={`p-2 flex-col mb-2 me-2 w-fit rounded-full`} style={{ backgroundColor: data.related_items[releted_item].background_color }}>
                            <div className="text-[10px] font-medium">{data.related_items[releted_item].it_name}</div>
                          </div>
                          // <Link to={`/company/module/${data.related_items[releted_item].module_permalink}/${data.related_items[releted_item].it_name}/${["agent_lead", "deal"].includes(releted_item) ? "view" : "edit"}`}>
                          // </Link>
                        ) : (
                          <></>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-8 flex flex-col">
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <Button variant="outline" className="flex items-center" onClick={() => setActiveActionTab("add_comment")}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Add Comment
                      </Button>
                      <Button variant="outline" className="flex items-center" onClick={() => setActiveActionTab("add_note")}>
                        <FileText className="mr-2 h-4 w-4" />
                        Create Note
                      </Button>
                      <Button variant="outline" className="flex items-center" onClick={() => setActiveActionTab("add_attachment")}>
                        <Upload className="mr-2 h-4 w-4" />
                        Add Attachment
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Tabs value={activeActionTab} defaultValue={activeActionTab}>
                      <TabsContent value="add_comment">
                        <Form {...commentForm}>
                          <form onSubmit={commentForm.handleSubmit(saveCommentSubmit)}>
                            <div className="mb-2">
                              <FormField
                                control={commentForm.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                      <Textarea {...field} disabled={isAddCommentLoading} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <Button className="mt-4" type="submit" disabled={isAddCommentLoading}>
                              <span> {isAddCommentLoading ? <Spinner></Spinner> : <></>} </span> Save comment
                            </Button>
                          </form>
                        </Form>
                      </TabsContent>
                      <TabsContent value="add_note">
                        <Form {...noteForm}>
                          <form onSubmit={noteForm.handleSubmit(saveNoteSubmit)}>
                            <div className="mb-2">
                              <FormField
                                control={noteForm.control}
                                name="title"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                      <Input type="text" {...field} disabled={isAddNoteLoading} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="mb-2">
                              <FormField
                                control={noteForm.control}
                                name="is_private"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl className="me-2">
                                      <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isAddNoteLoading} />
                                      {/* <Input type="" {...field} /> */}
                                    </FormControl>
                                    <FormLabel>Private </FormLabel>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="mb-2">
                              <FormField
                                control={noteForm.control}
                                name="content"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                      <Textarea {...field} disabled={isAddNoteLoading} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <Button type="submit" disabled={isAddNoteLoading}>
                              {" "}
                              <span> {isAddNoteLoading ? <Spinner></Spinner> : <></>} </span> Save Note
                            </Button>
                          </form>
                        </Form>
                      </TabsContent>
                      <TabsContent value="add_attachment">
                        <Dropzone upload={true} uploadTo="crm" allowedFormats={["image/jpeg", "text/csv", "application/vnd.ms-excel", "application/csv", "text/x-csv", "application/x-csv", "text/comma-separated-values", "text/x-comma-separated-values"]} type="multiple" onFilesAdded={(fileId, _) => handleAttachmentUploaded(fileId)} initialFiles={[]} onFileRemoved={async () => console.log()} onFileSortUpdated={() => { }}></Dropzone>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-4">
                <CardContent className="p-4">
                  <Tabs
                    value={activeTab}
                    onValueChange={(tab) => {
                      setIsActiveTabLoading(true), setActiveTab(tab);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <TabsList>
                        <TabsTrigger value="activity" className="flex items-center">
                          Activity
                        </TabsTrigger>
                        <TabsTrigger value="data" className="flex items-center">
                          Data
                        </TabsTrigger>
                        <TabsTrigger value="comments" className="flex items-center">
                          Comments
                        </TabsTrigger>
                        <TabsTrigger value="notes" className="flex items-center">
                          Notes
                        </TabsTrigger>
                        <TabsTrigger value="attachments" className="flex items-center">
                          Attachments
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="activity" className="mt-4 space-y-4">
                      <div className="">
                        <AnimatePresence initial={false}>

                          {activities?.data.map((activity, index) => (
                            <motion.div
                              key={activity.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              layout
                              className="flex gap-4"
                            >
                              <div className="relative">
                                {
                                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                    {activity.type === "agent_added_note" && <StickyNote className="h-5 w-5 text-muted-foreground" />}
                                    {activity.type === "agent_added_attachment" && <FileText className="h-5 w-5 text-muted-foreground" />}
                                    {activity.type === "agent_added_comment" && <MessageCircle className="h-5 w-5 text-muted-foreground" />}
                                    {activity.type === "update" && <User className="h-5 w-5 text-muted-foreground" />}
                                    {activity.type === "item_assigned" && <User className="h-5 w-5 text-muted-foreground" />}
                                    {activity.type === 'agent_updated_item' && <Pencil className="h-5 w-5 text-muted-foreground" />}
                                    {activity.type === 'item_updated' && <Pencil className="h-5 w-5 text-muted-foreground" />}
                                    {activity.type === 'item_created' && <CirclePlus />}


                                  </div>
                                }
                                {index < activities?.data.length - 1 &&
                                  <div className="absolute top-10 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-border" />

                                }
                              </div>
                              <div className="flex-1 pb-6">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                      {activity.employee.name}
                                    </span>
                                    {activity.type === "agent_added_comment" && <span className="text-muted-foreground">added a comment</span>}
                                    {activity.type === "agent_added_note" && <span className="text-muted-foreground">created a note</span>}
                                    {activity.type === "agent_added_attachment" && <span className="text-muted-foreground">uploaded an attachment</span>}
                                    {activity.type === "item_updated" && (
                                      <>
                                        <span className="text-muted-foreground">updated </span> related item  <span className="font-medium">{activity.module.name}</span>{" "}
                                      </>
                                    )}
                                    {activity.type === "item_created" && (
                                      <>
                                        <span className="text-muted-foreground">created </span> <span className="font-medium">{activity.module.name}</span>{" "}
                                      </>
                                    )}
                                    {activity.type === "item_assigned" && (
                                      <>
                                        <span className="text-muted-foreground">assigned to</span>
                                        <span className="font-medium">
                                          <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                              <Avatar className="h-6 w-6"  >
                                                <AvatarFallback className="bg-slate-200 text-slate-600"> {getInitials(activity.payload.old_agent.name) ?? 'VZ'}</AvatarFallback>
                                              </Avatar>
                                              {activity.payload.old_agent.name}
                                            </div>
                                            <ArrowRight size={16} />
                                            <div className="flex gap-1">
                                              <Avatar className="h-6 w-6"  >
                                                <AvatarFallback className="bg-slate-200 text-slate-600"> {getInitials(activity.payload.old_agent.name) ?? 'VZ'}</AvatarFallback>
                                              </Avatar>
                                              {activity.payload.new_agent.name}
                                            </div>
                                          </div>
                                        </span>
                                      </>
                                    )}
                                    {activity.type === "agent_updated_item" && (
                                      <>
                                        <span className="text-muted-foreground">updated </span>
                                        <span className="font-medium">{activity.module.name}</span>
                                        <span>item</span>
                                      </>
                                    )}
                                  </div>
                                  <span className="text-sm text-muted-foreground">{activity.created_at}</span>
                                </div>

                                {
                                  activity.type === "agent_updated_item" || activity.type === "item_updated" ?
                                    <div className="m-4 text-xs">
                                      {Object.keys(activity.payload).map((inp: any) => {
                                        return <div className="flex gap-2  "><div className="font-medium">{inp}:</div> <div className="text-muted-foreground">{activity.payload[inp].old ?? '(empty)'}</div> <ArrowRight size={16} /> <div>{activity.payload[inp].new ?? '(empty)'}</div>  </div>
                                      })}

                                    </div>
                                    : ''
                                }

                                {activity.type === "agent_added_comment" && <CommentItem comment={activity.payload} list="activity"></CommentItem>}

                                {activity.type === "agent_added_note" && <NoteItem note={activity.payload} list="activity"></NoteItem>}

                                {activity.type === "agent_added_attachment" && <AttachmentItem attachment={activity.payload} list="activity"></AttachmentItem>}
                              </div>
                            </motion.div>
                          ))}

                        </AnimatePresence>
                      </div>
                    </TabsContent>

                    <TabsContent value="comments" className="mt-4 space-y-4">
                      <div className="space-y-8">
                        {!isActiveTabLoading && comments ? (
                          comments!.data.length > 0 ? (
                            <div className="space-y-8">
                              <AnimatePresence initial={false}>
                                {comments!.data.map((comment: { id: number; description: string; created_at: string; employee: { name: string; avatart: string } }, key) => (
                                  <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    layout
                                  >
                                    <CommentItem key={key} comment={comment} list="tab"></CommentItem>
                                  </motion.div>

                                ))}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <div className="my-4">
                              <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="text-lg font-medium">No items available</div>
                                <div className="text-sm text-muted-foreground">Add your first comment to get started.</div>
                              </div>
                            </div>
                          )
                        ) : (
                          <SkeletonComments></SkeletonComments>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="notes" className="mt-4 space-y-4">
                      {!isActiveTabLoading && notes ? (
                        notes!.data.length > 0 ? (
                          <div className="grid grid-cols-12 gap-4">
                            {notes!.data.map((note: { id: number; title: string; description: string }, key) => (
                              <NoteItem key={key} note={note} list="tab"></NoteItem>
                            ))}
                          </div>
                        ) : (
                          <div className="my-4">
                            <div className="flex flex-col items-center justify-center space-y-4">
                              <div className="text-lg font-medium">No items available</div>
                              <div className="text-sm text-muted-foreground">Add your first note to get started.</div>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="grid grid-cols-12 gap-4">
                          <Skeleton className=" col-span-4 aspect-square"></Skeleton>
                          <Skeleton className=" col-span-4 aspect-square"></Skeleton>
                          <Skeleton className=" col-span-4 aspect-square"></Skeleton>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="attachments" className="mt-4 space-y-4">
                      {!isActiveTabLoading && attachments ? (
                        attachments!.data.length > 0 ? (
                          <div className="space-y-4">
                            <AnimatePresence initial={false}>
                              {attachments!.data.map((attachment: any, key) => (
                                <motion.div
                                  key={attachment.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 20 }}
                                  transition={{ duration: 0.3, ease: "easeOut" }}
                                  layout
                                >
                                  <AttachmentItem key={key} attachment={attachment} list="tab"></AttachmentItem>
                                </motion.div>
                              ))}

                            </AnimatePresence>
                          </div>
                        ) : (
                          <div className="my-4">
                            <div className="flex flex-col items-center justify-center space-y-4">
                              <div className="text-lg font-medium">No items available</div>
                              <div className="text-sm text-muted-foreground">Add your first note to get started.</div>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="flex flex-col">
                          {[...Array(4)].map((_, key) => (
                            <div key={key} className="py-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center"></div>
                                  <div className="space-y-1.5">
                                    <Skeleton className="h-5 w-[400px]" />
                                    <Skeleton className="h-4 w-16" />
                                  </div>
                                </div>

                                <div className="flex items-center gap-4">
                                  <Skeleton className="h-4 w-24" />
                                  <Skeleton className="h-8 w-8 " />
                                  <Skeleton className="h-8 w-8 " />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="data" className="mt-4 space-y-4">
                      {!isActiveTabLoading ? (
                        modules_fields ? (
                          <>
                            <form onSubmit={submit} className="flex flex-col">
                              <div className="flex justify-end">
                                <Button type="submit" size="sm" disabled={isSubmitLoading}>
                                  {isSubmitLoading ? <Spinner></Spinner> : null}
                                  Edit Agent Lead
                                </Button>
                              </div>
                              <div className="grid gap-6 grid-cols-12">
                                {modules_fields.map((module_field: any, field_key: number) => {
                                  return <ModuleField key={field_key} formData={formData} module_field={module_field} onModuleFieldUpdated={(data) => setFormData(data)} enableAddRelatedItems={true} ></ModuleField>
                                }
                                )}
                              </div>
                            </form>
                          </>
                        ) : null
                      ) : (
                        <SkeletonComments></SkeletonComments>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
          <EditItemModal ref={editCustomerModalRef} editRelatedModule={true} relatedModuleName={"customer"} relatedModuleId={data.related_items.customer.module_permalink} onSubmit={handleCustomerEdited}></EditItemModal>
        </>
      )}
    </>
  );
}
