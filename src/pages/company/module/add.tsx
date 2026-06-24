import { useState, useEffect, FormEventHandler, } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import companyModuleRepository from "@/repositories/company/companyModuleRepository"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from "@/hooks/use-toast";
import { Spinner } from '@/components/ui/spinner'
import { ModuleField } from '@/components/moduleField'
import { useGlobalState } from '@/providers/globalContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useModuleState } from '@/providers/moduleContext';

export default function CompanyModuleItemAdd() {

    interface FormData {
        [key: string]: string;
    }

    let navigate = useNavigate();
    const { darkMode, globalStateLoading } = useGlobalState();
    const { toast } = useToast()
    const { moduleId, moduleTitle, moduleDefaultView } = useModuleState();
    const [isInitalLoading, setIsInitialLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [, setIsError] = useState(false);
    const [grouped_modules_fields, setGroupedModulesFields] = useState<any>();
    const [formData, setFormData] = useState<FormData>({});

    const fetchModuleData = async function () {
        const fieldsResponse = await companyModuleRepository.getModuleFieldsGrouped(moduleId.value);
        if (fieldsResponse.success) {
            const fields = fieldsResponse.data;
            let formDataU = { ...formData };
            fields.forEach((group: any) => {
                group.fields.forEach((module_field: any) => {
                    if (module_field.type === 'select') {
                        console.log(module_field.values[0].value);
                        formDataU[module_field.name] = module_field.values[0].value;
                    }
                });
            });
            setFormData(formDataU)

            setGroupedModulesFields(fields)
        }
        else {
            setIsError(true);
        }
        setIsInitialLoading(false);
    }


    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        const cleanedFormData = Object.fromEntries(
            Object.entries(formData).filter(([key]) => !key.endsWith('_label'))
        );
        setIsLoading(true);

        const response = await companyModuleRepository.saveModuleItem(moduleId.value, cleanedFormData);
        if (response.success) {
            toast({
                variant: "default",
                duration: 800,
                className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: "data items successfully imported",
                action: <ToastAction altText="close">close</ToastAction>,
            })
            navigate(`/company/module/${moduleId.value}/${moduleDefaultView.value}`);

        }
        else {
            toast({
                variant: "destructive",
                duration: 2000,
                className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: response.message,
                action: <ToastAction altText="close">close</ToastAction>,
            })
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (!globalStateLoading) {
            fetchModuleData();
        }
    }, [globalStateLoading]);

    useEffect(() => {
        fetchModuleData();
    }, [moduleId.value]);

    return (
        <form onSubmit={submit} className='flex flex-col' >
            <div className="grid max-w-full flex-1 auto-rows-max gap-4 mb-2">
                <div className="flex items-center gap-4">
                    <Button type="button" variant="outline" size="icon" onClick={() => navigate(`/company/module/${moduleId.value}/${moduleDefaultView.value}`)} className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className={`flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0  ${darkMode.value && 'text-white'} `}>
                        Add {moduleTitle.value}
                    </h1>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button disabled={isLoading} type="submit" size="sm" >
                            {
                                isLoading ? <Spinner></Spinner> : <></>
                            }
                            Add {moduleTitle.value}
                        </Button>
                    </div>
                </div>
            </div>
            {
                isInitalLoading ? <div className="my-4 p-6 bg-white rounded-md">
                    {/* Header */}
                    <div className="mb-8">
                        <Skeleton className="h-7 w-48" />
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Customer Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <div className="flex gap-2">
                                <Skeleton className="h-10 flex-1" />
                                <Skeleton className="h-10 w-10" />
                            </div>
                        </div>

                        {/* Title Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        {/* Amount Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        {/* Action Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-14" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        {/* Action Type Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        {/* Source Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>

                    {/* Status Field - Full Width */}
                    <div className="mt-6 space-y-2">
                        <Skeleton className="h-4 w-14" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div> :
                    grouped_modules_fields ?
                        <div className="grid gap-4 py-1">
                            {grouped_modules_fields.map((group: { title: string, description: string, fields: any[] }, key: number) => (
                                <Card key={key} className={` ${['Deal Related Items', 'Management Related Items'].includes(group.title) && 'hidden'}`}>
                                    <CardHeader>
                                        <CardTitle>
                                            <div>
                                                {group.title}
                                            </div>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 grid-cols-12">
                                            {group.fields.map((module_field: any, field_key: number) => {
                                                return <ModuleField key={field_key} module_field={module_field} formData={formData} enableAddRelatedItems={true} onModuleFieldUpdated={(data) => setFormData(data)} disabled={isLoading || module_field.type === 'select'} ></ModuleField>;
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                        </div>
                        : <></>
            }
        </form>
    );
}