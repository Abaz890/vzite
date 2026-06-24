import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";

import {
    ChevronLeft,
    PlusCircle,
    Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { TagInput } from "@/components/tagInput";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { FormEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminModuleRepository from "@/repositories/admin/adminModuleRepository";
import settingsRepository from "@/repositories/settingsRepository";

export default function ModuleAdd() {

    let navigate = useNavigate();


    interface Field {
        name: string;
        type: string;
        value: any;
        default_value: string;
        relation_module_id: string;
        isQuickCreate: boolean;
        isMandatory: boolean;
        isAutoIncremental: boolean;
    }

    interface FormData {
        name: string,
        description: string,
        default_view: string
    }


    const [module_fields, setModuleFields] = useState<Field[]>([]);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        default_view: 'list'
    });
    const [activeModules, setActiveModules] = useState<[]>([]);



    useEffect(() => {
        const fetchActiveModulesOptions = async () => { 
            try {
                const response: any = await settingsRepository.getActiveModulesOptions();
                if (response.success) {
                    setActiveModules(response.data);
                }
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        fetchActiveModulesOptions();

    }, []);


    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prevData => {
            if (!prevData) return prevData;

            const newData = { ...prevData };
            (newData as FormData)[field] = value;

            return newData;
        });
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        var resp = await adminModuleRepository.saveModule(formData, module_fields);
        if (resp.success) {
            toast(resp.message)
            navigate('/administrator/modules')
        }
        // post(route('administrator.modules.store'));
    };

    const addField = () => {
        setModuleFields(prevState => [
            ...prevState,
            {
                name: '',
                type: '',
                value: '',
                default_value: '',
                relation_module_id: '',
                isAutoIncremental: false,
                isQuickCreate: false,
                isMandatory: false,
            }
        ]);
        // setData('fields', module_fields as never[])
    }


    const removeField = (index: number) => {
        console.log(index)
        setModuleFields(prevState => prevState.filter((_, i) => i !== index));
        // setData('fields', module_fields as never[])
    }

    const editFieldInputValue = (field: number, input: string, value: any) => {
                setModuleFields(prevState => {
                    return prevState.map((f, index) => index === field ? { ...f, [input]: value } : f)
                }
            );
        // setData('fields', module_fields as never[])
    }


    const setInputName = (id: number, value: string) => {
        editFieldInputValue(id, 'name', value + '_id')
    }

    const handleTagsChange = (field: number, tags: any) => {
        editFieldInputValue(field, 'value', tags)
    }



    return (
        <AuthenticatedLayoutAdmin
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Module
                </h2>
            }
        >
            <form onSubmit={submit}>
                <div className="grid max-w-full flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4">
                        <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate('/administrator/modules')}>
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Add Module
                        </h1>
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button type="submit" size="sm">Save Module</Button>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Module Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                className="w-full"
                                                value={formData.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                value={formData.description}
                                                onChange={(e) => handleChange('description', e.target.value)}
                                                id="description"
                                                className="min-h-20"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-07-chunk-1">
                                <CardHeader>
                                    <CardTitle>Fields</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {module_fields.length > 0 ?
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[140px]">Type</TableHead>
                                                    <TableHead className="w-[140px]">Name</TableHead>
                                                    <TableHead className="w-[140px]">Default value</TableHead>
                                                    <TableHead className="w-[30px]">Mandatory</TableHead>
                                                    <TableHead className="w-[80px]">Quick create</TableHead>
                                                    <TableHead className="w-[30px]">actions</TableHead>

                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {Array.from(module_fields).map((field, key) => (
                                                    <TableRow key={key}>
                                                        <TableCell className="flex flex-col gap-2">
                                                            <Select value={field.type} onValueChange={(value) => editFieldInputValue(key, 'type', value)} disabled={field.isAutoIncremental}>
                                                                <SelectTrigger
                                                                    aria-label="Select type"
                                                                >
                                                                    <SelectValue placeholder="Select type" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="text">Text</SelectItem>
                                                                    <SelectItem value="select">
                                                                        Select
                                                                    </SelectItem>
                                                                    <SelectItem value="select_relational">
                                                                        Select Relational
                                                                    </SelectItem>
                                                                    <SelectItem value="select_relational_many">
                                                                        Select Relational Many
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            {field.type === "select_relational" || field.type === "select_relational_many" ?
                                                                <Select onValueChange={(value) => {
                                                                    editFieldInputValue(key, 'relation_module_id', value)
                                                                    setInputName(key, value)
                                                                }}>
                                                                    <SelectTrigger
                                                                        aria-label="Select module"
                                                                    >
                                                                        <SelectValue placeholder="Select module" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {activeModules.length > 0 ? Array.from(activeModules).map((module_item: any, module_key) => (
                                                                            <SelectItem key={module_key} value={module_item.name}>{module_item.name}</SelectItem>
                                                                        )) : null}
                                                                    </SelectContent>
                                                                </Select>
                                                                : null
                                                            }
                                                            {field.type === "select" ?
                                                                <TagInput onTagsChange={(tags) => handleTagsChange(key, tags)} ></TagInput>
                                                                : null
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input
                                                                id="stock-1"
                                                                type="text"
                                                                placeholder="input name"
                                                                value={field.name}
                                                                onChange={(e) => editFieldInputValue(key, 'name', e.target.value)}
                                                                disabled={field.type === "select_relational" || field.type === "select_relational_many" || field.isAutoIncremental}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            {field.type === "select" ?
                                                                <Select onValueChange={(value) => editFieldInputValue(key, 'default_value', value)}>
                                                                    <SelectTrigger
                                                                        id="category"
                                                                        aria-label="Select value"
                                                                    >
                                                                        <SelectValue placeholder="Select value" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {Array.from(field.value).map((option: any, optionKey) => (<SelectItem key={optionKey} value={option.value} >{option.name}</SelectItem>))}
                                                                    </SelectContent>
                                                                </Select>
                                                                : null
                                                            }
                                                            {
                                                                field.type === "text" ?
                                                                    <Input
                                                                        id="stock-1"
                                                                        type="text"
                                                                        onChange={(e) => editFieldInputValue(key, 'default_value', e.target.value)}
                                                                        disabled={field.isAutoIncremental}
                                                                    />
                                                                    : null
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <Checkbox id="isMandatory"
                                                                onChange={(value) => editFieldInputValue(key, 'isMandatory', value)}
                                                                disabled={field.type === "select_relational" || field.isAutoIncremental} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Checkbox id="isQuickCreate"
                                                                onChange={(value) => editFieldInputValue(key, 'isQuickCreate', value)}
                                                                disabled={field.type === "select_relational" || field.type === "select_relational_many" || field.isAutoIncremental} />
                                                        </TableCell>

                                                        <TableCell>
                                                            <Button type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => removeField(key)}
                                                                aria-label={`Remove ${key}`}
                                                                disabled={field.isAutoIncremental}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        :
                                        <div className="flex flex-col items-center justify-center space-y-4">
                                            <div className="rounded-full bg-muted p-4">
                                                <PlusCircle className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                            <div className="text-lg font-medium">No Fields available</div>
                                            <div className="text-sm text-muted-foreground">
                                                Add your first field to get started.
                                            </div>
                                        </div>
                                    }
                                </CardContent>
                                <CardFooter className="justify-center border-t p-4">
                                    <Button type="button" size="sm" variant="ghost" className="gap-1" onClick={() => addField()} >
                                        <PlusCircle className="h-3.5 w-3.5" />
                                        Add Field
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-3">
                                <CardHeader>
                                    <CardTitle>Module Configurations</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="status">Default view</Label>
                                            <Select onValueChange={(value) => handleChange('default_view', value)}>
                                                <SelectTrigger id="status" aria-label="Select status">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="list">List</SelectItem>
                                                    <SelectItem value="kanban">Kanban</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 md:hidden">
                        <Button type="button" variant="outline" size="sm">
                            Discard
                        </Button>
                        <Button type="submit" size="sm">Save Module</Button>
                    </div>

                </div>
            </form>
        </AuthenticatedLayoutAdmin>
    )
}