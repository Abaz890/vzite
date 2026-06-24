import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useRef } from "react";
// import { SerializedEditorState } from 'lexical'
import { Dropzone } from "@/components/ui/dropzone";
import adminPostRepository from "@/repositories/admin/adminPostRepository";
import { MultiSelectDynamic } from "@/components/ui/selectDynamicMultiple";
import { Skeleton } from "@/components/ui/skeleton";
import { debounce } from "@/lib/utils";
import { useGlobalState } from "@/providers/globalContext";
import RichTextEditor from "@/components/RichTextEditor";


export default function AdministratorPostsEdit() {


  interface PostPayload {
    title: string;
    content: string;
    permalink: string;
    status: number;
    categories: CategoryElement[];
    media: Media[];
    tags: TagElement[];
  }

  interface CategoryElement {
    id: number;
    category: CategoryCategory;
  }

  interface CategoryCategory {
    name: string;
    permalink: string;
  }

  interface Media {
    id: number;
    type: string;
    upload: Upload;
    url: string;
  }

  interface Upload {
    url: string;
    name: string;
    extension: null;
  }


  interface TagElement {
    id: number;
    post_id: number;
    tag_id: number;
    created_at: Date;
    updated_at: Date;
    tag: TagTag;
  }

  interface TagTag {
    id: number;
    name: string;
    permalink: string;
    status: number;
    is_deleted: number;
    created_at: Date;
    updated_at: Date;
  }


  interface SelOption {
    id: number; label: string; value: string;
  }


  // const initialValue = {
  //   root: {
  //     children: [
  //       {
  //         children: [
  //           {
  //             detail: 0,
  //             format: 0,
  //             mode: 'normal',
  //             style: '',
  //             text: '',
  //             type: 'text',
  //             version: 1,
  //           },
  //         ],
  //         direction: 'ltr',
  //         format: '',
  //         indent: 0,
  //         type: 'paragraph',
  //         version: 1,
  //       },
  //     ],
  //     direction: 'ltr',
  //     format: '',
  //     indent: 0,
  //     type: 'root',
  //     version: 1,
  //   },
  // } as unknown as SerializedEditorState

  const navigate = useNavigate();
  const params = useParams();
  const { toast } = useToast();
  const [, setLoading] = useState(true);
  const [post, setPost] = useState<PostPayload>();
  const [, setSubmitLoading] = useState(false);
  // const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue);
  const isFetchingRef = useRef(true);
  const [, setIsSubmitting] = useState(false);
  const { globalStateLoading, darkMode } = useGlobalState();

  const handleFileUpload = async (_: string, id: string, type: string) => {
    const reference_id = params.post_id!;
    const response = await adminPostRepository.attachPostMedia(reference_id, type, id);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `property media successfully uploaded`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
      // const images = form.getValues(name);
      // images.push(response.data.id);
      // // form.setValue(name, images);

      return response.data.id;

    }
    else {
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `unable to upload post media`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
  };

  const handleFileRemoved = async (_: string, id: string, __: string) => {
    const reference_id = params.post_id!;
    const response = await adminPostRepository.unAttachPostMedia(reference_id, id);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `property media successfully removed`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    else {
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `unable to remove property media`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }

    return '';
    // if (response.success) {
    //   if (type === "single") {
    //     form.setValue(name, '');
    //   }
    //   if (type === "multiple") {
    //     const images : [] = form.getValues(name);
    //     const updatedImages = images.filter((img=>img===id));
    //      form.setValue(name, updatedImages);
    //   }
    // }
  };

  const handleAddCategory = async (name: string): Promise<SelOption> => {

    const response = await adminPostRepository.savePostCategory(name);

    let option: SelOption = { id: 0, label: '', value: '' };
    option.id = response.data.id;
    option.label = response.data.name;
    option.value = response.data.id;

    return option;
  }

  const fetchCategories = async (page: number, query: string) => {
    console.log(query)
    const response = await adminPostRepository.getPostsCategories(page, query)
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.id.toString() })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  }

  const handleAddTag = async (name: string) => {

    const response = await adminPostRepository.savePostTag(name);

    let option: SelOption = { id: 0, label: '', value: '' };
    option.id = response.data.id;
    option.label = response.data.name;
    option.value = response.data.id;

    return option;


    // let option = { success: false, id: '', label: '', value: '' };
    // if (response.success) {
    //   option.success = response.success;
    //   option.label = response.data.name;
    //   option.value = response.data.id;
    //   option.id = response.data.id;

    // }
    // return option;
  }

  const fetchTags = async (page: number, query: string) => {

    console.log(query)
    const response = await adminPostRepository.getPostsTags(page, query)
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.id.toString() })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  }

  const handleCategoryChange = async (data: any) => {
    const reference_id = params.post_id!;
    const ids = data.map((obj: { id: any; }) => obj.id);
    await adminPostRepository.updatePostCategory(reference_id, ids.join(','));
  }

  const handleTagChange = async (data: { id: any; }[]) => {
    const reference_id = params.post_id!;
    const ids = data.map((obj: { id: any; }) => obj.id);
    await adminPostRepository.updatePostTag(reference_id, ids.join(','));
  }

  const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }).optional(),
    content: z.string().min(10, { message: "Content must be at least 10 characters." }),

  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });



  const handleUpdatePost = async (data: any) => {

    if (!isFetchingRef.current) {
      setIsSubmitting(true)
      let transformedData = data;
      const response = await adminPostRepository.updatePost(params.post_id!, transformedData);
      if (response.success) {
        toast({
          variant: "default",
          duration: 800,
          className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          title: `post successfully updated`,
          action: <ToastAction altText="close">close</ToastAction>,
        });
      }
      else {
        toast({
          variant: "destructive",
          duration: 2000,
          className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          title: `unable to update post`,
          action: <ToastAction altText="close">close</ToastAction>,
        });
      }
      setIsSubmitting(false)
    }
  }

  // const debouncedUpdateProperty = debounce((values) => {
  //   handleUpdatePost(values);
  // }, 1000);
  const debounceUpdatePostRef = useRef(debounce((values: any) => {
    handleUpdatePost(values);
  }, 1000));



  const watchFields = form.watch(['title', 'content']);
  useEffect(() => {
    if (!isFetchingRef.current) {
      // Use the persistent debounce from ref
      const subscription = form.watch((values) => {
        debounceUpdatePostRef.current(values);
      });

      return () => {
        subscription.unsubscribe();
        // Cancel pending debounce on cleanup
        // debounceUpdatePostRef.current.cancel();
      };
    }
  }, [watchFields]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitLoading(true);
    const response = await adminPostRepository.updatePost(params.post_id!, values);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "item successfully saved",
        action: <ToastAction altText="close">close</ToastAction>,
      });
      navigate(`/company/agent/list`);
    } else {
      toast({
        variant: "destructive",
        duration: 2000,
        title: response.message,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    setSubmitLoading(false);
  }

  const fetchPost = async () => {

    setLoading(true)
    const response = await adminPostRepository.getPost(params.post_id!);
    if (response.success) {

      const data: PostPayload = response.data;
      setPost(response.data);
      form.setValue("title", data.title);
      if (data.content) {
        form.setValue("content", data.content);
      }
      setLoading(false)
      isFetchingRef.current = false;
    }

  }


  useEffect(() => {
    if (!globalStateLoading) {
      fetchPost();
    }
  }, [globalStateLoading])

  return (
    <AuthenticatedLayoutAdmin
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Offplan property edit
        </h2>
      }
    >
      <>
        <div className="grid max-w-full flex-1 auto-rows-max gap-4 mb-2">
          <div className="flex items-center gap-4">
            <Button type="button" variant="outline" size="icon" onClick={() => navigate(-1)} className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className={`flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 ${darkMode.value ? "text-white" : ""}`}>Save Post</h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex"></div>
          </div>
        </div>
        {
          isFetchingRef.current ?
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 grid grid-cols-12 gap-4">
                {/* Post Taxonomies Section */}
                <div className="col-span-6 rounded-lg border bg-card p-6 shadow-sm">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-36" />

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                </div>
                {/* Post Attachments Section */}
                <div className="col-span-6 rounded-lg border bg-card p-6 shadow-sm">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-36" />

                    <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-12">
                      <div className="flex flex-col items-center space-y-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <Skeleton className="h-4 w-64" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Informations Section */}
              <div className="col-span-12 rounded-lg border bg-card p-6 shadow-sm">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-36" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex space-x-2 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-8 rounded" />
                      ))}
                    </div>
                    <Skeleton className="h-40 w-full rounded-md" />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div>
                <Skeleton className="h-10 w-24 rounded-md" />
              </div>
            </div> :
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>

                <div className="flex flex-col">
                  <div className="grid grid-cols-12 mb-4 gap-4">
                    <Card className="col-span-6">

                      <CardHeader>
                        <CardTitle>Post Taxonomies</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-2">
                          <FormItem>
                            <FormLabel>Post Categories</FormLabel>
                            <FormControl>
                              <MultiSelectDynamic
                                name="Category"
                                fetchPropsOnInit={false}
                                defaultValues={post!.categories.map((category, key) => { const SelOption: SelOption = { id: key, label: category.category.name, value: category.id.toString() }; return SelOption })}
                                onChange={(opt: any) => {
                                  handleCategoryChange(opt);
                                }}
                                addOption={async (name) => {
                                  const newOption = await handleAddCategory(name);
                                  return newOption;
                                }}
                                fetchOptions={async (page: number, query: string) => await fetchCategories(page, query)}
                              ></MultiSelectDynamic>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </div>
                        <div className="mb-2">
                          <FormItem>
                            <FormLabel>Post Tags</FormLabel>
                            <FormControl>
                              <MultiSelectDynamic
                                name="Tag"
                                defaultValues={post!.tags.map((tag, key) => { const SelOption: SelOption = { id: key, label: tag.tag.name, value: tag.id.toString() }; return SelOption })}
                                fetchPropsOnInit={false}
                                onChange={(value) => {
                                  handleTagChange(value)
                                }}
                                addOption={async (name) => {
                                  const newOption = await handleAddTag(name);
                                  return newOption;
                                }}
                                fetchOptions={async (page, query) => await fetchTags(page, query)}
                              ></MultiSelectDynamic>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="col-span-6">
                      <CardHeader>
                        <CardTitle>Post Attachments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Dropzone upload={true} isFeature={true} uploadTo={'properties'} initialFiles={post!.media} allowedFormats={["image/jpeg", "image/png", "image/webp"]} type="multiple" onFilesAdded={(id) => handleFileUpload("images", id.toString(), "other")} onFileRemoved={(id) => handleFileRemoved('images', id.toString(), "multiple")} onFileSortUpdated={() => { }} />

                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid grid-cols-12 mb-4">
                    <Card className="col-span-12">
                      <CardHeader>
                        <CardTitle>Post Informations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col">
                          <div className="mb-2">
                            <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Post Title</FormLabel>
                                  <FormControl>
                                    <Input id="title" type="text" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="mb-2">
                            <FormField
                              control={form.control}
                              name="content"
                              render={() => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Post Content</FormLabel>
                                  <FormControl>
                                    <RichTextEditor
                                      value={form.getValues('content')}
                                      onChange={(val) => form.setValue('content', val)}
                                    />
                                    {/* <Editor
                                      editorSerializedState={editorState}
                                      onChange={(editor) => {
                                        editor.read(() => {
                                          const htmlString = $generateHtmlFromNodes(editor);
                                          form.setValue('content', htmlString)
                                        })
                                      }}
                                      onSerializedChange={(value: SetStateAction<SerializedEditorState<SerializedLexicalNode>>) => setEditorState(value)} html={form.getValues('content')}
                                    /> */}
                                    {/* <Textarea placeholder="Describe the property" className="min-h-[120px]" {...field} /> */}
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                {/* <div className="grid grid-cols-12 mb-4">
                  <div className="col-span-4">
                  </div>
                </div> */}
              </form>
            </Form>
        }
      </>

    </AuthenticatedLayoutAdmin>
  );





}