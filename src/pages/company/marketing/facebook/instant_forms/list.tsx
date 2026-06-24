import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Play, Pause, Edit, Eye, Loader2, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import companyMarketingFacebookRepository from "@/repositories/company/companyMarketingFacebookRepository"
import { Skeleton } from "@/components/ui/skeleton"
import LazyImage from "@/components/ui/lazyImage"

interface Property {
    id: string
    name: string
    thumbnail: string
    type: "off-plan" | "ready"
    price: string
    location: string
}

interface InstantForm {
    id: string
    name: string
    status: "ACTIVE" | "PAUSED" | "draft"
    enabled: boolean
    leads: number
    impressions: number
    conversionRate: number
    createdDate: string
    lastUpdated: string
    connectedPage: string
    selectedProperty?: Property
}




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


export default function FacebookMarketingInstantFormsList() {


    let navigate = useNavigate();

    const [instantFormsLoading, setInstantFormsLoading] = useState(true)
    const [instantForms, setInstantForms] = useState<RootResponse>()

    const [toggleLoading, setToggleLoading] = useState<Record<string, boolean>>({})
    const [statusLoading, setStatusLoading] = useState<Record<string, boolean>>({})




    const fetchInstantForms = async () => {

        setInstantFormsLoading(true);
        const response = await companyMarketingFacebookRepository.getInstantForms()
        if (response.success) {
            setInstantForms(response.data)
        }
        setInstantFormsLoading(false)
    }


    const handleFormAction = async (formId: string, _: "pause" | "resume") => {
        setStatusLoading((prev) => ({ ...prev, [formId]: true }))
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // update the local state here if needed

        setStatusLoading((prev) => ({ ...prev, [formId]: false }))
    }

    const handleToggleEnabled = async (id: string, _: boolean) => {
        setToggleLoading((prev) => ({ ...prev, [id]: true }))
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // update the local state here if needed

        setToggleLoading((prev) => ({ ...prev, [id]: false }))
    }

    const handleEdit = (item: InstantForm, type: "form") => {
        console.log(item, type)
        // setEditingItem(item)
        // window.location.href = `/facebook-marketing/create-form?edit=${item.id}`
    }

    const handleDelete = (id: string, type: "campaign" | "form", name: string) => {
        console.log(id, type, name)
        // setDeletingItem({ id, type, name })
        // setDeleteModalOpen(true)
    }

    // const confirmDelete = () => {
    //     if (!deletingItem) return
    //     setInstantForms((prev) => prev.filter((form) => form.id !== deletingItem.id))


    //     setDeleteModalOpen(false)
    //     setDeletingItem(null)
    // }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return <Badge variant={'outline'} className="bg-green-100 text-green-800">Active</Badge>
            case "PAUSED":
                return <Badge variant="secondary">Paused</Badge>
            case "completed":
                return <Badge variant="outline">Completed</Badge>
            case "draft":
                return <Badge variant="outline">Draft</Badge>
            default:
                return null
        }
    }

    // const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`
    const formatNumber = (num: number) => num.toLocaleString()
    const formatPercentage = (num: number) => `${num.toFixed(1)}%`


    useEffect(() => {
        fetchInstantForms();
    }, [])



    return (
        <div className="py-8">
            <div className="flex items-center gap-3 justify-between mb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Facebook instant forms</h1>
                    <p className="text-muted-foreground">Manage your Facebook instant forms</p>
                </div>

                <Button onClick={() => (navigate('/company/marketing/facebook/instant-forms/add'))}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Form
                </Button>
            </div>

            {
                instantFormsLoading ?
                    <div className="space-y-6">
                        {/* Main Content - Two Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* First Card Skeleton */}
                            <Card className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-6 w-[100px]" />
                                    <div className="flex items-center space-x-2">
                                        <Skeleton className="h-6 w-10 rounded-full" />
                                        <Skeleton className="h-6 w-6 rounded-full" />
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-muted/50 flex items-center space-x-4">
                                    <Skeleton className="h-16 w-16 rounded-lg" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-6 w-[80px] rounded-md" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    <div className="flex flex-col items-center space-y-2">
                                        <Skeleton className="h-6 w-8" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <Skeleton className="h-6 w-8" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <Skeleton className="h-6 w-12" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                </div>
                            </Card>

                            {/* Second Card Skeleton (duplicate of the first for layout) */}
                            <Card className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-6 w-[100px]" />
                                    <div className="flex items-center space-x-2">
                                        <Skeleton className="h-6 w-10 rounded-full" />
                                        <Skeleton className="h-6 w-6 rounded-full" />
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-muted/50 flex items-center space-x-4">
                                    <Skeleton className="h-16 w-16 rounded-lg" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-6 w-[80px] rounded-md" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    <div className="flex flex-col items-center space-y-2">
                                        <Skeleton className="h-6 w-8" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <Skeleton className="h-6 w-8" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <Skeleton className="h-6 w-12" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>


                    :
                    <div className="grid gap-6 md:grid-cols-2">
                        {

                            instantForms!.data.length > 0 ?


                                instantForms!.data.map((form: any) => {

                                    const isToggleLoading = toggleLoading[form.id] || false
                                    const isStatusChanging = statusLoading[form.id] || false

                                    return (
                                        <Card key={form.id}>
                                            <CardHeader>
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3">
                                                            <CardTitle className="text-lg">{form.name}</CardTitle>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Switch
                                                            checked={form.enabled}
                                                            onCheckedChange={(enabled) => handleToggleEnabled(form.id, enabled)}
                                                            disabled={isToggleLoading || isStatusChanging}
                                                        />
                                                        {getStatusBadge(form.state)}
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="sm">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={() => handleEdit(form, "form")}>
                                                                    <Edit className="h-4 w-4 mr-2" />
                                                                    Edit Form
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleDelete(form.id, "form", form.name)}
                                                                    className="text-red-600"
                                                                >
                                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                                    Delete Form
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                {form.property && (
                                                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                        <div className="flex items-center gap-3">
                                                            <LazyImage src={form.property.thumbnail} alt={form.property.name} className="w-12 h-12 rounded-lg object-cover"></LazyImage>
                                                            <div>
                                                                <div className="font-medium text-sm">{form.property.name}</div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    {0} • {form.property.district}
                                                                </div>
                                                                <Badge variant="outline" className="text-xs mt-1">
                                                                    offplan
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-3 gap-4 mb-4">
                                                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                                                        <div className="text-xl font-bold text-blue-600">{form.leads_count}</div>
                                                        <div className="text-sm text-muted-foreground">Leads</div>
                                                    </div>
                                                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                                                        <div className="text-xl font-bold">{formatNumber(form.impressions)}</div>
                                                        <div className="text-sm text-muted-foreground">Impressions</div>
                                                    </div>
                                                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                                                        <div className="text-xl font-bold">{formatPercentage(parseInt(form.conversion_rate))}</div>
                                                        <div className="text-sm text-muted-foreground">Conv. Rate</div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 flex-wrap">
                                                    {form.state === "ACTIVE" ? (
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => handleFormAction(form.id, "pause")}
                                                            disabled={isStatusChanging || isToggleLoading || true}
                                                            className="text-orange-600 hover:text-orange-700"
                                                        >
                                                            {isStatusChanging ? (
                                                                <>
                                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                                    Pausing...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Pause className="h-4 w-4 mr-2" />
                                                                    Pause
                                                                </>
                                                            )}
                                                        </Button>
                                                    ) : form.state === "PAUSED" ? (
                                                        <Button
                                                            onClick={() => handleFormAction(form.id, "resume")}
                                                            disabled={isStatusChanging || isToggleLoading || true}
                                                        >
                                                            {isStatusChanging ? (
                                                                <>
                                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                                    Resuming...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Play className="h-4 w-4 mr-2" />
                                                                    Resume
                                                                </>
                                                            )}
                                                        </Button>
                                                    ) : null}

                                                    <Button variant="outline">
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View Leads
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })
                                : <div className="flex items-center justify-center col-span-2 flex-col gap-4 my-10">
                                    <div className="text-lg font-medium">No Instant Forms Found</div>
                                    <div className="">You don’t have any instant forms yet. Create your first form to start collecting leads.</div>
                                    <Button onClick={() => (navigate('/company/marketing/facebook/instant-forms/add'))}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create Form
                                    </Button>
                                </div>
                        }
                    </div>
            }
        </div>
    )
}
