import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import BasicInfoStep from "@/components/property_add_form/basic-info-step";
import PricingStep from "@/components/property_add_form/pricing-step";
import LocationStep from "@/components/property_add_form/location-step";
import MediaStep from "@/components/property_add_form/media-step";
import AmenitiesStep from "@/components/property_add_form/amenities-step";
import SeoStep from "@/components/property_add_form/seo-step";
import PermitsAndLicensesStep from "@/components/property_add_form/permits-and-licenses-step";
import { Skeleton } from "@/components/ui/skeleton";
import companyPropertyRepository from "@/repositories/company/companyPropertyRepository";
import { debounce } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";


export default function CompanyPropertyAdd() {
  let navigate = useNavigate();
  const params = useParams();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("basic-info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"draft" | "published">("draft");
  const [, setPropertyReferenceId] = useState("");
  const [isInitalLoading, setIsInitalLoading] = useState(true);
  const isFetchingRef = useRef(true);
  const [propertyMedia, setPropertyMedia] = useState();
  const [propertyPayload, setPropertyPayload] = useState();

  // const submit: FormEventHandler = async (e) => {
  //   e.preventDefault();
  // };

  // const handleChange = (field: string, value: string) => {
  //   // const updatedFormData = {
  //   //   ...formData,
  //   //   [field]: value,
  //   // };
  //   // onModuleFieldUpdated(updatedFormData);
  // };

  const fetchProperty = async () => {
    if (params.property_id) {
      setPropertyReferenceId(params.property_id);
      const response = await companyPropertyRepository.getProperty(params.property_id);
      if (response.success) {
        const property = response.data;
        setPropertyPayload(property);
        console.log(property)
        form.setValue("reference_id", params.property_id);
        form.setValue("state", property.state);
        form.setValue("title", property.title);
        form.setValue("type", property.type);
        form.setValue("description", property.description);
        form.setValue("bedrooms", property.meta.bedrooms);
        form.setValue("bathrooms", property.meta.bathrooms);
        form.setValue("built_year", property.meta.built_year);
        form.setValue("furnished", property.meta.furnished ? true : false);
        form.setValue("garage", property.meta.garage ? true : false);
        form.setValue("floor", property.meta.floor);
        form.setValue("block", property.meta.block);
        form.setValue("year_price", property.meta.year_price);
        form.setValue("month_price", property.meta.month_price);
        form.setValue("week_price", property.meta.week_price);
        form.setValue("sale_price", property.meta.sale_price);
        form.setValue("default_pricing", property.default_pricing);
        form.setValue("permit", property.permit);
        form.setValue("rera", property.rera);
        form.setValue("rera_licence_id", property.rera_licence_id);
        form.setValue("trakheesi", property.trakheesi);
        form.setValue("dtcm", property.dtcm);
        form.setValue("size", property.meta.size);
        form.setValue("property_type", property.meta.property_type);

        //location  
        if (property.area) {
          form.setValue("area_id", property.area.slug);
        }
        if (property.building) {
          form.setValue("building_id", property.building.slug);
        }
        if (property.emirate) {
          form.setValue("emirate_id", property.emirate.id);
        }
        if (property.district) {
          form.setValue("district_id", property.district.id);
        }
        if (property.coordinates) {
          form.setValue("lat", property.coordinates[1]);
          form.setValue("lng", property.coordinates[0]);
        }
        //amenities
        form.setValue(
          "amenities",
          property.amenities.map((a: { id: any }) => a.id)
        );
        //media
        setPropertyMedia(property.media);

        form.setValue("seo_title", property.meta.seo_title);
        form.setValue("seo_description", property.meta.seo_description);

        setIsInitalLoading(false);
        isFetchingRef.current = false;
      }
    }
  };

  const handleUpdateProperty = async (data: any) => {
    setIsSubmitting(true)
    let transformedData = data;
    transformedData.images = data.images.join(",");
    transformedData.amenities = data.amenities.join(",");
    const response = await companyPropertyRepository.updateProperty(params.property_id!, transformedData);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `property successfully updated`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    else {
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `unable to update property`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    setIsSubmitting(false)
  };

  const defaultValues: Partial<FormValues> = {
    reference_id: "",
    state: "draft",
    type: "sale",
    default_pricing: "month",
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    garage: false,
    amenities: [],
    images: [],
  };

  const formSchema = z.object({
    // Basic Info
    reference_id: z.string().min(10),
    state: z.enum(["active", "inactive", "sold", "rented", "draft"]),
    type: z.enum(["sale", "rent"]),
    title: z.string().min(2, { message: "Title must be at least 2 characters." }).optional(),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }).optional(),
    building_id: z.string().optional().optional(),
    bedrooms: z.number().int().min(0).optional(),
    bathrooms: z.number().int().min(0).optional(),
    furnished: z.boolean().optional(),
    built_year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
    garage: z.boolean().optional(),
    block: z.string().optional().nullable().optional(),
    floor: z.string().optional().nullable().optional(),
    size: z.string().optional().nullable().optional(),

    // Pricing
    default_pricing: z.enum(["day", "week", "month", "year"]).optional(),
    day_price: z.number().optional(),
    week_price: z.number().optional(),
    month_price: z.number().optional(),
    year_price: z.number().optional(),
    sale_price: z.number().optional(),

    // Location
    lat: z.string().optional(),
    lng: z.string().optional(),

    // Permits & Licenses
    permit: z.string().optional(),
    rera: z.string().optional(),
    dtcm: z.string().optional(),
    trakheesi: z.string().optional(),
    rera_licence_id: z.string().optional(),

    district_id: z.string().optional(),
    emirate_id: z.string().optional(),
    area_id: z.string().optional(),

    // Amenities
    amenities: z.array(z.string()).optional(),

    // Media
    feature_img: z.any().optional(),
    images: z.array(z.any()).optional(),
    yt_video: z.string().url().optional().or(z.literal("")),

    // SEO
    seo_title: z.string().optional().nullable(),
    seo_description: z.string().optional().nullable(),
    property_type: z.string().optional().nullable()
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    const debouncedUpdateProperty = debounce((values) => {
      if (!isFetchingRef.current) {
        handleUpdateProperty(values);
      }
    }, 1000);

    const subscription = form.watch((values) => {
      if (!isFetchingRef.current) {
        debouncedUpdateProperty(values);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [form.watch]);

  const onSubmit = async (data: FormValues) => {
    console.log(data)
  };

  const goToNextTab = () => {
    const tabs = ["basic-info", "pricing", "permits & licenses", "location", "media", "amenities", "seo"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const goToPreviousTab = () => {
    const tabs = ["basic-info", "pricing", "permits & licenses", "location", "media", "amenities", "seo"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const saveAsDraft = () => {
    setSubmissionStatus("draft");
    form.handleSubmit(onSubmit)();
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  return !isInitalLoading ? (
    <>
      <div className="mb-2">
        <Button className="h-7 w-7" variant={'outline'} onClick={() => navigate(-1)} disabled={window.history.length == 0}><ChevronLeft /></Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-8 mb-8">
              <TabsTrigger disabled={isSubmitting} value="basic-info">Basic Info</TabsTrigger>
              <TabsTrigger disabled={isSubmitting} value="pricing">Pricing</TabsTrigger>
              <TabsTrigger disabled={isSubmitting} value="permits & licenses">Permits & Licenses</TabsTrigger>
              <TabsTrigger disabled={isSubmitting} value="location">Location</TabsTrigger>
              <TabsTrigger disabled={isSubmitting} value="media">Media</TabsTrigger>
              <TabsTrigger disabled={isSubmitting} value="amenities">Amenities</TabsTrigger>
              <TabsTrigger disabled={isSubmitting} value="seo">SEO</TabsTrigger>
            </TabsList>
            <div className="relative">
              <div className={activeTab === "basic-info" ? "block" : "hidden"}>
                <BasicInfoStep form={form} />
              </div>
              <div className={activeTab === "pricing" ? "block" : "hidden"}>
                <PricingStep form={form} />
              </div>
              <div className={activeTab === "permits & licenses" ? "block" : "hidden"}>
                <PermitsAndLicensesStep form={form} />
              </div>
              <div className={activeTab === "location" ? "block" : "hidden"}>
                <LocationStep property={propertyPayload} form={form} />
              </div>
              <div className={activeTab === "media" ? "block" : "hidden"}>
                <MediaStep form={form} media={propertyMedia} />
              </div>
              <div className={activeTab === "amenities" ? "block" : "hidden"}>
                <AmenitiesStep form={form} />
              </div>
              <div className={activeTab === "seo" ? "block" : "hidden"}>
                <SeoStep form={form} />
              </div>
            </div>
          </Tabs>
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={goToPreviousTab}>
              Previous
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={saveAsDraft} disabled={isSubmitting}>
                {isSubmitting && submissionStatus === "draft" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save as Draft
              </Button>

              {activeTab === "seo" ? (
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setSubmissionStatus("published");
                    form.handleSubmit(onSubmit)();
                  }}
                >
                  {isSubmitting && submissionStatus === "published" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Publish
                </Button>
              ) : (
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    goToNextTab();
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  ) : (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-6 border-b">
        <div className="flex items-center space-x-2 pb-2 border-b-2 border-primary">
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-12" />
      </div>

      {/* Form Content */}
      <div className="bg-white border rounded-lg p-6 space-y-6">
        {/* Reference ID */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full max-w-md" />
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Type */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bedrooms */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Bathrooms */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Year Built */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full max-w-md" />
        </div>

        {/* Checkboxes row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Furnished */}
          <div className="flex items-start space-x-2">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>

          {/* Garage */}
          <div className="flex items-start space-x-2">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Block */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Floor */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 mt-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
  // <form onSubmit={submit} className="flex flex-col">
  //   <div className="grid max-w-full flex-1 auto-rows-max gap-4 mb-2">
  //     <div className="flex items-center gap-4">
  //       <Button type="button" variant="outline" size="icon" onClick={() => navigate("/administrator/companies")} className="h-7 w-7">
  //         <ChevronLeft className="h-4 w-4" />
  //         <span className="sr-only">Back</span>
  //       </Button>
  //       <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 ">Add Property</h1>
  //       <div className="hidden items-center gap-2 md:ml-auto md:flex">
  //         {/* <Button disabled={isLoading} type="submit" size="sm">
  //           {isLoading ? <Spinner></Spinner> : <></>}
  //           Add property
  //         </Button> */}
  //       </div>
  //     </div>
  //   </div>
  //   <div className="grid gap-4 py-4">

  //     <Card>
  //       <CardHeader>
  //         <CardTitle>
  //           <div>Property Type</div>
  //         </CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="grid gap-6 grid-cols-12">
  //           <div className="grid gap-3 col-span-6">
  //             <Label>Property type</Label>
  //             <Select onValueChange={(e) => console.log("changed", e)}>
  //               <SelectTrigger className="col-span-3">
  //                 <SelectValue placeholder={`Select Property type`} />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="Apartment">Apartment</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>
  //           <div className="grid gap-3 col-span-6">
  //             <Label> Built-up area</Label>
  //             <Input className="col-span-3" onChange={(e) => console.log("changed", e)} />
  //           </div>
  //           <div className="grid gap-3 col-span-6">
  //             <Label>No of Bedroom</Label>
  //             <Select onValueChange={(e) => console.log("changed", e)}>
  //               <SelectTrigger className="col-span-3">
  //                 <SelectValue placeholder={`Select No of Bedroom`} />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="sudio">Studio</SelectItem>
  //                 <SelectItem value="1">1</SelectItem>
  //                 <SelectItem value="2">2</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>
  //           <div className="grid gap-3 col-span-6">
  //             <Label>No of Bathrooms</Label>
  //             <Select onValueChange={(e) => console.log("changed", e)}>
  //               <SelectTrigger className="col-span-3">
  //                 <SelectValue placeholder={`Select No of Bathrooms`} />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="1">1</SelectItem>
  //                 <SelectItem value="2">2</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>
  //           <RadioGroup defaultValue="unfurnished" className="grid grid-cols-12 gap-3 col-span-12 ">
  //             <div className="col-span-6">
  //               <RadioGroupItem id="unfurnished" value="unfurnished" />
  //               <Label className="mx-1" htmlFor="option-two">
  //                 Unfurnished
  //               </Label>
  //             </div>
  //             <div className="col-span-6">
  //               <RadioGroupItem id="furnished" value="furnished" />
  //               <Label className="mx-1" htmlFor="option-two">
  //                 Furnished
  //               </Label>
  //             </div>
  //           </RadioGroup>

  //           <div className="grid gap-3 col-span-6">
  //             <Label>Location</Label>
  //             <Select onValueChange={(e) => console.log("changed", e)}>
  //               <SelectTrigger className="col-span-3">
  //                 <SelectValue placeholder={`Select Location`} />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="sudio">Studio</SelectItem>
  //                 <SelectItem value="1">1</SelectItem>
  //                 <SelectItem value="2">2</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>
  //           <div className="grid gap-3 col-span-6">
  //             <Label>Building</Label>
  //             <Select onValueChange={(e) => console.log("changed", e)}>
  //               <SelectTrigger className="col-span-3">
  //                 <SelectValue placeholder={`Select Building`} />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="1">1</SelectItem>
  //                 <SelectItem value="2">2</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>
  //           <div className="grid gap-3 col-span-6">
  //             <Label> Unit No</Label>
  //             <Input className="col-span-3" onChange={(e) => console.log("changed", e)} />
  //           </div>
  //           <div className="grid gap-3 col-span-6">
  //             <Label>Completion State</Label>
  //             <Select onValueChange={(e) => console.log("changed", e)}>
  //               <SelectTrigger className="col-span-3">
  //                 <SelectValue placeholder={`Select Completion State`} />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="ready">Ready</SelectItem>
  //                 <SelectItem value="off_plan">Off-Plan</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>
  //         </div>
  //       </CardContent>
  //     </Card>

  //     <Card>
  //       <CardHeader>
  //         <CardTitle>
  //           <div>Property Pricing</div>
  //         </CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <RadioGroup className="grid grid-cols-12 gap-3">
  //           <Card className="col-span-2">
  //             <CardContent className="flex flex-col px-2">
  //               <div className="p-5">Year</div>
  //               <div className="bg-gray-300 border-b-[3px] border-b-gray-500 p-2">
  //                 <div className="">Year</div>
  //                 <div className="flex items-end">
  //                   <Input className="border-0 shadow-none p-0" placeholder="AED"></Input>
  //                   <div className="mx-1">AED</div>
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>
  //         </RadioGroup>
  //       </CardContent>
  //     </Card>

  //     <div className="flex justify-end">
  //       <Button className="mx-4">Previous</Button>
  //       <Button>Next</Button>
  //     </div>
  //   </div>
  //   {/* {
  //                     isLoading ? <h4>loading</h4> :
  //                         grouped_modules_fields ?
  //                             <div className="grid gap-4 py-4">
  //                                 {grouped_modules_fields.map((group: { title: string, description: string, fields: any[] }, key: number) => (
  //                                 ))}

  //                             </div>
  //                         : <></>
  //                 } */}
  // </form>

  return "add property form";
}
