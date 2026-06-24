import { useEffect, useState } from "react"
import { Trash2, FileText } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Dropzone } from "../ui/dropzone"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { debounce } from "@/lib/utils"
import { Form } from "@/components/ui/form";
import adminOffPlanPropertyRepository from "@/repositories/admin/adminOffPlanPropertyRepository"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import LazyImage from "../ui/lazyImage"

export function UnitCard({ unit, property_id, onDelete }: {
    unit: any;
    property_id: string;
    onDelete: (unit_it: string) => void
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const unitFormSchema = z.object({
        unit_number: z.string().min(1, { message: "Unit number is required." }),
        type_of_sale: z.enum(["off_plan", "resale"]),
        unit_type: z.enum([
            'apartment',
            'bungalow',
            'compound',
            'duplex',
            'full_floor',
            'penthouse',
            'plot',
            'short_term',
            'townhouse',
            'villa',
            'whole_building',
            'off_plan']),

        bedrooms: z.number().int().min(0, { message: "Must be 0 or more bedrooms." }),
        bathrooms: z.number().min(0, { message: "Must be 0 or more bathrooms." }),
        layout: z.string().min(2, { message: "Layout must be specified." }),
        price: z.number().min(0, { message: "Price must be 0 or more." }),
        square: z.number().min(0, { message: "Square footage must be 0 or more." }),
        floor: z.string().min(1, { message: "Floor information is required." }),
    });
    type FormValues = z.infer<typeof unitFormSchema>;

    const defaultValues = {
        unit_number: unit.unit_number,
        type_of_sale: "off_plan" as "off_plan" | "resale",
        unit_type: 'apartment' as 'apartment' | 'bungalow' | 'compound' | 'duplex' | 'full_floor' | 'penthouse' | 'plot' | 'short_term' | 'townhouse' | 'villa' | 'whole_building' | 'off_plan',
        bedrooms: unit.meta.bedrooms,
        bathrooms: unit.meta.bathrooms,
        layout: unit.layout,
        price: unit.meta.price,
        square: unit.meta.square,
        floor: unit.meta.floor,
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(unitFormSchema),
        defaultValues,
        mode: "onChange",
    });

    useEffect(() => {
        const debouncedUpdateProperty = debounce((values) => {
            console.log(values)
            handleUpdatePropertyUnit(values);
        }, 1000);

        const subscription = form.watch((values) => {
            debouncedUpdateProperty(values);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [form.watch]);


    const handleUpdatePropertyUnit = async (data: any) => {
        const response = await adminOffPlanPropertyRepository.updateUnit(property_id, unit.id, data)
        if (response.success) {
            toast({
                variant: "default",
                duration: 800,
                className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: `property unit successfully updated`,
                action: <ToastAction altText="close">close</ToastAction>,
            });
        }
    }


    const handleFileUpload = async (id: string) => {

        const response = await adminOffPlanPropertyRepository.attachPropertyUnitMedia(property_id, unit.id, 'layout', id);
        if (response.success) {
            toast({
                variant: "default",
                duration: 800,
                className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: `property media successfully uploaded`,
                action: <ToastAction altText="close">close</ToastAction>,
            });
            return response.data.id;
        }
        else {
            toast({
                variant: "destructive",
                duration: 2000,
                className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: `unable to upload property media`,
                action: <ToastAction altText="close">close</ToastAction>,
            });
        }
    }

    const handleFileRemove = async (id: string) => {

        const response = await adminOffPlanPropertyRepository.unAttachPropertyUnitMedia(property_id, unit.id, id);
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
    }

    return (
        <>
            <div className="flex fle-row w-full">
                <Accordion className="flex-1 bg-white" type="single" collapsible value={isOpen ? unit.id : ""} onValueChange={(value) => setIsOpen(!!value)}>
                    <AccordionItem value={unit.id} className="border rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-4 py-2 hover:no-underline flex-grow justify-end"> </AccordionTrigger>

                        {!isOpen && (


                            <div className="flex items-start m-3">
                                <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">

                                    {unit.floor_plan ?
                                        <a href={unit.floor_plan.url} target="_blank">
                                            <LazyImage src={unit.floor_plan.url} alt="unit floorplan"></LazyImage>
                                        </a>
                                        :
                                        <FileText className="h-6 w-6 text-muted-foreground" />
                                    }
                                </div>
                                <div className="ms-3 flex flex-col items-start text-left">
                                    <div className="font-medium">{unit.layout ?? '-'}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {unit.type || "-"} , {unit.meta.bathrooms ?? '-'} bathrooms , {unit.meta.bedrooms ?? '-'} bedrooms
                                    </div>
                                </div>
                            </div>
                        )}
                        <AccordionContent className="px-4 pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Dropzone - Left Side */}
                                <Dropzone upload={true} uploadTo={'properties'} initialFiles={unit.floor_plan ? [unit.floor_plan] : []} allowedFormats={["image/jpeg", "image/png", "image/webp"]} type="single" onFilesAdded={async (id) => handleFileUpload(id.toString())} onFileRemoved={async (id) => handleFileRemove(id.toString())} onFileSortUpdated={() => { }} />
                                {/* Form Inputs - Right Side */}
                                <Form {...form}>
                                    <form className="space-y-8 mb-6">
                                        <div className="space-y-4">
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="type_of_sale"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Type of Sale</FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    onValueChange={(value) => {
                                                                        field.onChange(value);
                                                                    }}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select type of sale" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="off_plan">Off Plan</SelectItem>
                                                                        <SelectItem value="resale">Resale</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="unit_type"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Type</FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    onValueChange={(value) => {
                                                                        field.onChange(value);
                                                                    }}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select unit type" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="apartment">Apartment</SelectItem>
                                                                        <SelectItem value="bungalow">Bungalow</SelectItem>
                                                                        <SelectItem value="duplex">Duplex</SelectItem>
                                                                        <SelectItem value="full_floor">Full Floor</SelectItem>
                                                                        <SelectItem value="penthouse">Penthouse</SelectItem>
                                                                        <SelectItem value="plot">Plot</SelectItem>
                                                                        <SelectItem value="short_term">Short Term</SelectItem>
                                                                        <SelectItem value="townhouse">Townhouse</SelectItem>
                                                                        <SelectItem value="villa">Villa</SelectItem>
                                                                        <SelectItem value="whole_building">Whole Building</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                        </FormItem>

                                                    )} />
                                            </div>
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="unit_number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Unit Number</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g., A101" {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-2">

                                                <FormField
                                                    control={form.control}
                                                    name="layout"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Layout</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g., Open Plan" {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            {/* Bedrooms and Bathrooms side by side */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <FormField
                                                        control={form.control}
                                                        name="bedrooms"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Bedrooms</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        placeholder="0"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <FormField
                                                        control={form.control}
                                                        name="bathrooms"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Bathrooms</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        placeholder="0"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )} />
                                                </div>
                                            </div>
                                            {/* Price and Square side by side */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <FormField
                                                        control={form.control}
                                                        name="price"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Price</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        placeholder="0"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )} />
                                                </div>
                                                <div className="grid gap-2">

                                                    <FormField
                                                        control={form.control}
                                                        name="square"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Square</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        placeholder="0"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )} />
                                                </div>
                                            </div>

                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="floor"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Floor</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="3rd" {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Button
                    variant="ghost"
                    size="icon"
                    className=" h-8 w-8"
                    onClick={() => { onDelete(unit.id) }}
                >
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            </div>
        </>
    )
}
