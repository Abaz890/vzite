import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form"; 
import LocationStep from "@/components/property_add_form/location-step";
import MediaStep from "@/components/property_add_form/media-step";
import AmenitiesStep from "@/components/property_add_form/amenities-step";
import SeoStep from "@/components/property_add_form/seo-step";
import PermitsAndLicensesStep from "@/components/property_add_form/permits-and-licenses-step";
import { Skeleton } from "@/components/ui/skeleton";
import { debounce } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";
import { useGlobalState } from "@/providers/globalContext";;
import adminDistressPropertyRepository from "@/repositories/admin/adminDistressPropertyRepository";
import DistressBasicInfoStep from "@/components/distress_property_add_form/distress-basic-info-step";

export default function AdministratorDistressPropertyEdit() {

  // let navigate = useNavigate();
  const params = useParams();
  const { toast } = useToast();
  const { globalStateLoading } = useGlobalState()
  let navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("basic-info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setPropertyReferenceId] = useState("");
  const [isInitalLoading, setIsInitalLoading] = useState(true);
  const isFetchingRef = useRef(true);
  const [propertyMedia, setPropertyMedia] = useState();
  const [propertyPayload, setPropertyPayload] = useState();
  // const [submissionStatus, setSubmissionStatus] = useState<"draft" | "active">("draft");
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
      const response = await adminDistressPropertyRepository.getProperty(params.property_id, 'admin');
      if (response.success) {
        const property = response.data;
        setPropertyPayload(property);
        form.setValue("reference_id", params.property_id);
        form.setValue("state", property.state);
        form.setValue("title", property.title);
        form.setValue("description", property.description);
        form.setValue("default_pricing", property.default_pricing);
        form.setValue("permit", property.permit);
        form.setValue("rera", property.rera);
        form.setValue("rera_licence_id", property.rera_licence_id);
        form.setValue("trakheesi", property.trakheesi);
        form.setValue("dtcm", property.dtcm);
        form.setValue("handover_at", property.handover_at_date)
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
        if (property.developer) {
          form.setValue("developer_id", property.developer.id);
        }
        if (property.coordinates) {
          form.setValue("lat", property.coordinates[1]);
          form.setValue("lng", property.coordinates[0]);
        }

        //amenities 
        form.setValue("amenities", property.amenities.map((a: { amenity_id: any }) => a.amenity_id));

        //media
        setPropertyMedia(property.media);

        form.setValue("seo_title", property.meta.seo_title);
        form.setValue("seo_description", property.meta.seo_description);
        form.setValue('services_charges',property.meta.service_charges);
        form.setValue('average_rent',property.meta.average_rent);
        form.setValue('broker_number',property.meta.broker_number);
        form.setValue('roi',property.meta.roi);
        form.setValue('size',property.meta.size);
        form.setValue('external_url',property.meta.external_url);

        

      // services_charges: z.string().optional().nullable().optional(),
      // average_rent: z.string().optional().nullable().optional(),
      // broker_number: z.string().optional().nullable().optional(), 
      // roi: z.string().optional().nullable().optional(),
      // external_url: z.string().optional().nullable().optional(),





      }
    }
    setIsInitalLoading(false);
    setTimeout(() => {
      isFetchingRef.current = false;
    }, 2000)
  };

  const handleUpdateProperty = async (data: any) => {
    if (!isFetchingRef.current) {
      setIsSubmitting(true)
      let transformedData = data;
      transformedData.images = data.images.join(",");
      transformedData.amenities = data.amenities.join(",");
      const response = await adminDistressPropertyRepository.updateProperty(params.property_id!, transformedData);
      if (response.success) {
        toast({
          variant: "default",
          duration: 800,
          className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          title: `property successfully updated`,
          action: <ToastAction altText="close">close</ToastAction>,
        });
        setIsSubmitting(false)
        return true;
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
    }
    return false;
  };

  const defaultValues: Partial<FormValues> = {
    reference_id: "",
    handover_at: "",
    state: "draft",
    default_pricing: "month",
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    garage: false,
    amenities: [],
    images: [],
    services_charges: "",
    average_rent: "",
    broker_number: "",
    roi: "",
    external_url: ""

  };

  const formSchema = z.object({

    // Basic Info
    reference_id: z.string().min(10),
    handover_at: z.any(),
    state: z.enum(["active", "inactive", "sold", "rented", "draft"]),
    title: z.string().min(2, { message: "Title must be at least 2 characters." }).optional(),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }).optional(),
    bedrooms: z.number().int().min(0).optional(),
    bathrooms: z.number().int().min(0).optional(),
    furnished: z.boolean().optional(),
    built_year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
    garage: z.boolean().optional(),
    block: z.string().optional().nullable().optional(),
    floor: z.string().optional().nullable().optional(),
    size:z.string().optional().nullable().optional(),
    services_charges: z.string().optional().nullable().optional(),
    average_rent: z.string().optional().nullable().optional(),
    broker_number: z.string().optional().nullable().optional(), 
    roi: z.string().optional().nullable().optional(),
    external_url: z.string().optional().nullable().optional(),

    // floor: z.string().optional().nullable().optional(),


    //units


    // Pricing
    default_pricing: z.enum(["day", "week", "month", "year"]).optional(),
    day_price: z.number().optional(),
    week_price: z.number().optional(),
    month_price: z.number().optional(),
    year_price: z.number().optional(),

    // Location
    lat: z.string().optional(),
    lng: z.string().optional(),

    // Permits & Licenses
    permit: z.any().optional(),
    rera: z.any().optional(),
    dtcm: z.any().optional(),
    trakheesi: z.any().optional(),
    rera_licence_id: z.any().optional(),

    district_id: z.any().optional(),
    emirate_id: z.any().optional(),
    area_id: z.any().optional(),
    building_id: z.any().optional(),
    developer_id: z.any().optional(),


    // Amenities
    amenities: z.array(z.string()).optional(),

    // Media
    feature_img: z.any().optional(),
    images: z.array(z.any()).optional(),
    yt_video: z.string().url().optional().or(z.literal("")),

    // SEO
    seo_title: z.string().optional().nullable(),
    seo_description: z.string().optional().nullable(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    const debouncedUpdateProperty = debounce((values) => {
      handleUpdateProperty(values);
    }, 1000);

    const subscription = form.watch((values) => {
      debouncedUpdateProperty(values);
    });
    return () => {
      subscription.unsubscribe();
    };

  }, [form.watch]);

  const onSubmit = async (values: FormValues) => {
    await handleUpdateProperty(values);

  };

  const goToNextTab = () => {
    const tabs = ["basic-info", "units", "permits & licenses", "location", "media", "amenities", 'attachments', "seo"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const goToPreviousTab = () => {
    const tabs = ["basic-info", "units", "permits & licenses", "location", "media", "amenities", "attachments", "seo"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  useEffect(() => {
    if (!globalStateLoading) {
      fetchProperty();
    }
  }, [globalStateLoading]);

  return <AuthenticatedLayoutAdmin
    header={
      <h2 className="text-xl font-semibold leading-tight text-gray-800">
        distress property edit
      </h2>
    }
  >
    {
      !isInitalLoading ?
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full min-h-[70dvh]">
              <TabsList className="grid grid-cols-9 mb-8">
                <TabsTrigger disabled={isSubmitting} value="basic-info">Basic Info</TabsTrigger>
                <TabsTrigger disabled={isSubmitting} value="units">Units</TabsTrigger>
                <TabsTrigger disabled={isSubmitting} value="permits & licenses">Permits & Licenses</TabsTrigger>
                <TabsTrigger disabled={isSubmitting} value="location">Location</TabsTrigger>
                <TabsTrigger disabled={isSubmitting} value="media">Media</TabsTrigger>
                <TabsTrigger disabled={isSubmitting} value="amenities">Amenities</TabsTrigger>
                <TabsTrigger disabled={isSubmitting} value="payment_plans">Payment Plans</TabsTrigger>
                <TabsTrigger disabled={isSubmitting} value="attachments">Attachments</TabsTrigger>
                <TabsTrigger disabled={isSubmitting} value="seo">SEO</TabsTrigger>
              </TabsList>

              <div className="relative">
                <div className={activeTab === "basic-info" ? "block" : "hidden"}>
                  <DistressBasicInfoStep form={form}  />
                </div>
                <div className={activeTab === "permits & licenses" ? "block" : "hidden"}>
                  <PermitsAndLicensesStep form={form} />
                </div>
                <div className={activeTab === "location" ? "block" : "hidden"}>
                  <LocationStep form={form} property={propertyPayload} />
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
              {
                activeTab !== 'basic-info' ?
                  <Button type="button" variant="outline" onClick={goToPreviousTab}>
                    Previous
                  </Button>
                  : <div></div>
              }
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => {
                  form.setValue('state', 'draft');
                }} disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save as Draft
                </Button>

                {activeTab === "seo" ? (
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={async () => {

                      const values = form.getValues();
                      values.state = "active";
                      const success = await handleUpdateProperty(values);
                      if (success) {
                        navigate("/administrator/distress_properties/list");
                      }
                    }}
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
        :
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
    }
  </AuthenticatedLayoutAdmin>;

}
