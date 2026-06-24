import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ChevronLeft } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dropzone } from "@/components/ui/dropzone";
import adminPostRepository from "@/repositories/admin/adminPostRepository";
import { MultiSelectDynamic } from "@/components/ui/selectDynamicMultiple";
import { useGlobalState } from "@/providers/globalContext";
import RichTextEditor from "@/components/RichTextEditor";

// import { SerializedEditorState } from 'lexical'
// import { Editor } from '@/components/blocks/editor-00/editor'
// import { $generateHtmlFromNodes } from "@lexical/html";


export default function AdministratorPostsAdd() {

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
  const { toast } = useToast();

  const { darkMode } = useGlobalState();
  const [submitLoading, setSubmitLoading] = useState(false);
  // const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue)
  const [selectedCategories, setSelectedCategories] = useState<String[]>([]);
  const [selectedTags, setSelectedTags] = useState<String[]>([]);
  const [mediaIds, setMediaIds] = useState<string[]>([])

  const handleFileUpload = async (_: string, id: string) => {
    const newMediaIds = [...mediaIds, id];
    setMediaIds(newMediaIds);
    form.setValue('media', newMediaIds.join(','));
  };

  const handleFileRemoved = async (_: string, id: string, __: string) => {

    const newMediaIds = mediaIds.filter((val) => val === id);
    setMediaIds(newMediaIds);
    form.setValue('media', newMediaIds.join(','))
  };




  const fetchCategories = async (page: number, query: string) => {
    console.log(query)
    const response = await adminPostRepository.getPostsCategories(page, query)
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.id.toString() })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  }


  const handleAddCategory = async (name: string): Promise<SelOption> => {

    const response = await adminPostRepository.savePostCategory(name);

    let option: SelOption = { id: 0, label: '', value: '' };
    option.id = response.data.id;
    option.label = response.data.name;
    option.value = response.data.id;

    return option;
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
    console.log(data)
    form.setValue('categories', data.map((obj: { id: any; }) => obj.id).join(','));
    setSelectedCategories(data);
  }

  const handleTagChange = async (data: any) => {
    setSelectedTags(data);
    form.setValue('tags', data.map((obj: { id: any; }) => obj.id).join(','))
  }

  const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }).optional(),
    content: z.string().min(10, { message: "Content must be at least 10 characters." }),
    categories: z.any(),
    tags: z.any(),
    media: z.any()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      categories: selectedCategories,
      tags: selectedTags,
      media: mediaIds
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitLoading(true);

    const response = await adminPostRepository.savePost(values);
    if (response.success) {
      navigate('/administrator/posts/list')
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "post successfully saved",
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    else {
      toast({
        variant: "destructive",
        duration: 2000,
        title: response.message,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    //   navigate(`/company/agent/list`);
    // } else {
    // }
    setSubmitLoading(false);
  }


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
                            defaultValues={[]}
                            onChange={(value) => {
                              handleCategoryChange(value);
                            }}
                            addOption={async (name) => {
                              const newOption = await handleAddCategory(name);
                              return newOption;
                            }}
                            fetchOptions={async (page, query) => await fetchCategories(page, query)}
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
                            defaultValues={[]}
                            fetchPropsOnInit={false}
                            onChange={(value) => {
                              handleTagChange(value)
                              // setSelectedEmirate(value);
                              // field.onChange(value);
                              // handleLocationChange("emirate", center!);
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
                    <Dropzone upload={true} isFeature={true} uploadTo={'properties'} initialFiles={[]} allowedFormats={["image/jpeg", "image/png", "image/webp"]} type="multiple" onFilesAdded={(id) => handleFileUpload("images", id.toString())} onFileRemoved={(id) => handleFileRemoved('images', id.toString(), "multiple")} onFileSortUpdated={() => { }} />

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
            <Button type="submit">
              {submitLoading ? <Spinner></Spinner> : <></>} Save Post
            </Button>
          </form>
        </Form>
      </>

    </AuthenticatedLayoutAdmin>
  );





}