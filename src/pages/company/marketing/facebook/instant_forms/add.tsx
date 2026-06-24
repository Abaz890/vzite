import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
    GripVertical,
    User,
    Phone,
    Mail,
    DollarSign,
    RefreshCw,
    Plus,
} from "lucide-react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { Dropzone } from "@/components/ui/dropzone"
import { SelectDynamic } from "@/components/ui/selectDynamic"
import companyOffPlanRepository from "@/repositories/company/companyOffPlanRepository"
import { PropertyFilterType } from "@/providers/propertyContext"
import companyMarketingFacebookRepository from "@/repositories/company/companyMarketingFacebookRepository"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner"


interface FormField {
    id: string
    type: "name" | "phone" | "email" | "message" | "location" | "date" | "company"
    label: string
    placeholder: string
    required: boolean
    enabled: boolean
    icon: React.ReactNode
}

const defaultFields: FormField[] = [
    {
        id: "name",
        type: "name",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
        enabled: false,
        icon: <User className="h-4 w-4" />,
    },
    {
        id: "phone",
        type: "phone",
        label: "Phone Number",
        placeholder: "Enter your phone number",
        required: true,
        enabled: false,
        icon: <Phone className="h-4 w-4" />,
    },
    {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
        required: true,
        enabled: false,
        icon: <Mail className="h-4 w-4" />,
    }
]

export default function FacebookMarketingInstantFormsAdd() {

    const [formData, setFormData] = useState({
        name: "",
        connectedPage: "",
        selectedProperty: "",
        budgetType: "lifetime" as string,
        budgetAmount: "",
        dailyBudget: "",
        startDate: "",
        startTime: "",
        hasEndDate: false,
        endDate: "",
        endTime: "",
        bidStrategy: "automatic" as string,
        mediaId: "",
    })
    const [formFields, setFormFields] = useState<FormField[]>(defaultFields)
    const [facebookPagesSyncLoading, setFacebookPagesSyncLoading] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);


    const { toast } = useToast();
    const navigate = useNavigate();


    const handleFileUpload = async (id: string) => {
        console.log(id)
        setFormData({ ...formData, mediaId: id })
    };

    const handleFileRemoved = async () => {
        setFormData({ ...formData, mediaId: '' })
    };

    const fetchProperties = async (page: number, query: string, _: any) => {

        const filter = { name: query, orderBy: 'name', centerMap: [0, 0], boundsMap: { southWest: [0, 0], northEast: [0, 0] }, zoomMap: 10 } as PropertyFilterType
        const response = await companyOffPlanRepository.getProjects(page, filter, 'list');
        return {
            data: response.success ? response.data.properties.data.map((item: any) => ({ id: item.id, label: item.title, value: item.reference_id, thumbnail: item.media.length > 0 ? item.media[0].upload.url : '' })) : [],
            lastPage: response.success ? response.data.properties.meta.last_page : 1,
        };
    }

    const fetchFacebookPages = async (page: number, query: string) => {

        const response = await companyMarketingFacebookRepository.getPages(page, query);

        return {
            data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.id, })) : [],
            lastPage: response.success ? response.data.last_page : 1,
        };

        return {
            data: [],
            lastPage: 1
        }
    }

    const handleSyncPagesClick = async () => {

        setFacebookPagesSyncLoading(true);
        await companyMarketingFacebookRepository.syncPages();
        setFacebookPagesSyncLoading(false);
    }

    const handleFieldToggle = (fieldId: string, enabled: boolean) => {
        setFormFields((prev) => prev.map((field) => (field.id === fieldId ? { ...field, enabled } : field)))
    }

    const handleFieldUpdate = (fieldId: string, updates: Partial<FormField>) => {
        setFormFields((prev) => prev.map((field) => (field.id === fieldId ? { ...field, ...updates } : field)))
    }

    const handleDragEnd = (result: any) => {
        if (!result.destination) return

        const items = Array.from(formFields)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setFormFields(items)
    }

    const calculateDuration = () => {
        if (formData.budgetType === "lifetime" && formData.budgetAmount && formData.dailyBudget) {
            return Math.ceil(Number.parseFloat(formData.budgetAmount) / Number.parseFloat(formData.dailyBudget))
        }
        return 0
    }

    const handleSave = async () => {
        setIsSubmitLoading(true)
        const response = await companyMarketingFacebookRepository.saveInstantForm(formData);
        if (response.success) {

            toast({
                variant: "default",
                duration: 800,
                className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: "facebook instant form successfully saved",
                action: <ToastAction altText="close">close</ToastAction>,
            });
            navigate(`/company/marketing/facebook/instant-forms/list`);


        }
        else {
            toast({
                variant: "destructive",
                duration: 800,
                className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: "unable to save facebook instant form",
                action: <ToastAction altText="close">close</ToastAction>,
            });
        }
        setIsSubmitLoading(false)
    }

    return (
        <div className="py-8">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {"Create New Instant Form"}
                    </h1>
                    <p className="text-muted-foreground">
                        {"Set up a new Facebook instant form for lead generation"}
                    </p>
                </div>
                <Button onClick={handleSave} disabled={isSubmitLoading}>
                    {
                        isSubmitLoading ?
                            <Spinner></Spinner>

                            : <></>
                    }

                    <Plus></Plus>
                    {"Create Form"}
                </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                {/* Left Column - Form Configuration */}
                <div className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Configure your form's basic settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Form Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter form name"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="connectedPage">Connected Facebook Page</Label>
                                <div className="flex gap-2">
                                    <SelectDynamic
                                        name="Facebook page"
                                        field={{ value: formData.connectedPage }}
                                        onChange={(value, _) => {
                                            setFormData({ ...formData, connectedPage: value })
                                        }}
                                        fetchOptions={async (page, query) => await fetchFacebookPages(page, query)}
                                    />
                                    <Button variant={'outline'} onClick={() => { handleSyncPagesClick() }} disabled={facebookPagesSyncLoading} >
                                        <RefreshCw className={facebookPagesSyncLoading ? 'animate-spin' : ''} />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="connectedPage">Select Property </Label>
                                <SelectDynamic
                                    name="property"
                                    field={{ value: formData.selectedProperty }}
                                    showThumbnail={true}
                                    onChange={(value,) => {
                                        setFormData({ ...formData, selectedProperty: value })
                                    }}
                                    fetchOptions={async (page, query) => await fetchProperties(page, query, 12)}
                                />

                            </div>

                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Campaign Budget & Schedule</CardTitle>
                            <CardDescription>Optimize your ad spend and timing</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Budget Type Selection */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Label className="text-base font-semibold text-gray-900">Budget Strategy</Label>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.budgetType === "daily"
                                            ? "border-blue-500 bg-blue-50 shadow-md"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        onClick={() => setFormData({ ...formData, budgetType: "daily" })}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div
                                                className={`w-4 h-4 rounded-full border-2 ${formData.budgetType === "daily" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                                                    }`}
                                            >
                                                {formData.budgetType === "daily" && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                                            </div>
                                            <span className="font-medium text-sm">Daily Budget</span>
                                        </div>
                                        <p className="text-xs text-gray-600">Set amount to spend per day</p>
                                    </div>

                                    <div
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.budgetType === "lifetime"
                                            ? "border-blue-500 bg-blue-50 shadow-md"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        onClick={() => setFormData({ ...formData, budgetType: "lifetime" })}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div
                                                className={`w-4 h-4 rounded-full border-2 ${formData.budgetType === "lifetime" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                                                    }`}
                                            >
                                                {formData.budgetType === "lifetime" && (
                                                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                                                )}
                                            </div>
                                            <span className="font-medium text-sm">Lifetime Budget</span>
                                        </div>
                                        <p className="text-xs text-gray-600">Total amount for entire campaign</p>
                                    </div>
                                </div>
                            </div>

                            {/* Budget Amount */}
                            <div className="space-y-3">
                                {formData.budgetType === "daily" ? (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700">Daily Budget</Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                type="number"
                                                value={formData.dailyBudget}
                                                onChange={(e) => setFormData({ ...formData, dailyBudget: e.target.value })}
                                                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                placeholder="25.00"
                                                min="1"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-gray-700">Total Budget</Label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    type="number"
                                                    value={formData.budgetAmount}
                                                    onChange={(e) => setFormData({ ...formData, budgetAmount: e.target.value })}
                                                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="500.00"
                                                    min="1"
                                                    step="0.01"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-gray-700">Daily Limit</Label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    type="number"
                                                    value={formData.dailyBudget}
                                                    onChange={(e) => setFormData({ ...formData, dailyBudget: e.target.value })}
                                                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="25.00"
                                                    min="1"
                                                    step="0.01"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Budget Summary */}
                                {formData.budgetType === "lifetime" && formData.budgetAmount && formData.dailyBudget && (
                                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-medium text-emerald-800">Campaign Projection</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-emerald-700">Estimated Duration:</span>
                                                <div className="font-semibold text-emerald-800">{calculateDuration()} days</div>
                                            </div>
                                            <div>
                                                <span className="text-emerald-700">Daily Average:</span>
                                                <div className="font-semibold text-emerald-800">${formData.dailyBudget}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Schedule */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Label className="text-base font-semibold text-gray-900">Campaign Schedule</Label>
                                </div>


                                {formData.budgetType === 'lifetime' && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                                                <Input
                                                    type="date"
                                                    value={formData.startDate}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700">Start Time</Label>
                                                <Input
                                                    type="time"
                                                    value={formData.startTime}
                                                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700">End Date</Label>
                                                <Input
                                                    type="date"
                                                    min={formData.startDate}
                                                    value={formData.endDate}
                                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700">End Time</Label>
                                                <Input
                                                    type="time"
                                                    value={formData.endTime}
                                                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>


                </div>

                {/* Right Column - Form Builder */}
                <div className="space-y-6">

                    <Card>
                        <CardHeader>
                            <CardTitle>Media Upload</CardTitle>
                            <CardDescription>Upload images and media for your form</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Dropzone upload={true} uploadTo="crm" initialFiles={[]} allowedFormats={["image/jpeg", "image/png", "image/webp"]} type="single" onFilesAdded={(id) => handleFileUpload(id.toString())} onFileRemoved={(_) => handleFileRemoved()}  onFileSortUpdated={()=>{}}/>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Form Fields</CardTitle>
                            <CardDescription>
                                Drag and drop to reorder fields. Use the switch to enable/disable fields.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="form-fields">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                                            {formFields.map((field, index) => (
                                                <div key={index}
                                                    className={`p-4 border rounded-lg bg-background transition-all`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-muted-foreground" >
                                                            <GripVertical className="h-4 w-4" />
                                                        </div>

                                                        <div className="flex items-center gap-2 text-muted-foreground">{field.icon}</div>

                                                        <div className="flex-1 space-y-2">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <Input
                                                                        value={field.label}
                                                                        onChange={(e) => handleFieldUpdate(field.id, { label: e.target.value })}
                                                                        className="font-medium text-sm h-8 w-auto min-w-[120px]"
                                                                        disabled={true}
                                                                    />
                                                                    {field.required && (
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            Required
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                                <Switch
                                                                    checked={true}
                                                                    disabled={true}
                                                                    onCheckedChange={(enabled) => handleFieldToggle(field.id, enabled)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </CardContent>
                    </Card>


                </div>
            </div>
        </div>
    )
}
