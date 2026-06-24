
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import companyModuleRepository from '@/repositories/company/companyModuleRepository';
import { useOutletContext } from "react-router-dom";
import { ModuleField, ModuleRelation } from '@/types';
import ImportRow from '@/components/modules/import/ImportRow';
import { useToast } from "@/hooks/use-toast";
import { Spinner } from '@/components/ui/spinner';
import { ToastAction } from '@/components/ui/toast';

// import Papa from 'papaparse';
// import yauzl from "yauzl-promise";
// import path from "path";

export default function CompanyModuleImport() {

    interface ImpoertPerPayload {
        inputs: ModuleField[];
        relations?: {
            [key: string]: ModuleRelation;
        };
    }

    interface ImportPrepResponse {
        success: boolean,
        data: {
            inputs: ImpoertPerPayload,
            columns: string[],
            directories: string[]
        };
    }

    const context: any = useOutletContext();
    const { module_id, default_view } = context;

    let navigate = useNavigate();
    const { toast } = useToast();
    const [prepLoaded, setPrepLoaded] = useState(false);
    const [file, setFile] = useState<File>();
    const [titles , setTitles] = useState<string[]>([]);
    const [directories, setDirectories] = useState<string[]>([]);


    const [error,] = useState('');
    const [loading, setLoading] = useState(false);

    const [modulePreps, setmodulePreps] = useState<ImpoertPerPayload>({
        inputs: [],
        relations: {}
    });

    const [formData, setFormData] = useState<any>({});

    const handleFormInputChange = (name: string, source: string, value: string) => {
        
        setFormData((prevState: Record<string, unknown>) => ({
            ...prevState,
            [`${name}__value`]: value,
            [`${name}__source`]: source
        }));
    };

    // const readCSVFile = async (file: File) => {
    //     if (!file) return;

    //     Papa.parse(file, {
    //         header: true,
    //         complete: (results) => {
    //             if (results.meta.fields != null) {
    //                 setTitles(results.meta.fields);
    //                 setFile(file)
    //             }
    //         },
    //         error: (error) => {
    //             console.error('Error reading CSV:', error);
    //             setError('Error reading CSV file');
    //         },
    //     });
    // };

    const handleFileChange = async (file: File | null) => {

        // if (file && file.name.endsWith('.csv')) {
        //     setFile(file);
        //     setError('');
        //     readCSVFile(file);
        // } else {
        //     setError('Please select a valid CSV file');
        //     setFile(null);
        // }
        fetchModuleImprotPerp(file!)
    };

    const fetchModuleImprotPerp = async (file: File) => {
        try {
            const response: ImportPrepResponse = await companyModuleRepository.getModuleImportPerp(module_id, file);
            if (response.success) {
                setmodulePreps(response.data.inputs);
                setTitles(response.data.columns);
                setDirectories(response.data.directories)
                setPrepLoaded(true);
                setFile(file);
            }
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };



    const handleImportExec = async () => {

         setLoading(true)
        const response = await companyModuleRepository.getModuleImportExec(module_id, formData, file!);
        setLoading(false)
        if (response.success) {
            toast({
                variant: "default",
                duration: 800,
className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: "data items successfully imported",
                action: <ToastAction altText="close">close</ToastAction>,
            })
            navigate(`/company/module/${module_id}/${default_view}`)
        }
        else {
            toast({
                variant: "destructive",
                duration: 2000,
className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: "unable to import items",
                action: <ToastAction altText="close">close</ToastAction>,
            })
        }

    }


    useEffect(() => {
        // fetchModuleImprotPerp();
    }, []);

    return (
        <form className='flex flex-col' >
            {error}
            <div className="grid max-w-full flex-1 auto-rows-max gap-4 mb-2">
                <div className="flex items-center gap-4">
                    <Button type="button" variant="outline" size="icon" onClick={() => navigate(`/company/module/${module_id}/${default_view}`)} className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 text-white">
                        Import module items
                    </h1>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button className='text-white p-5 h-1 gap-1' onClick={() => handleImportExec()} type="button" size="sm" disabled={loading}>
                            {
                                loading ?
                                    <Spinner></Spinner>
                                    : <></>
                            }

                            import
                        </Button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <Card  >
                        <CardHeader>
                            <CardTitle>Import Informations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 grid-cols-12">
                                <div className="grid gap-3 col-span-6">
                                    <Label  >Upload File</Label>
                                    <Input id="picture" type="file" disabled={loading}
                                        onChange={(event) =>
                                            handleFileChange(event.target.files && event.target.files[0])
                                        }
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>

            {
                prepLoaded ?
                    <div className="grid grid-cols-12 my-2">
                        <div className="col-span-12">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Import Mapping</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    <span>#</span>
                                                </TableHead>
                                                <TableHead>Column</TableHead>
                                                <TableHead>default value</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                prepLoaded ?
                                                    <>
                                                        {
                                                            modulePreps.relations && Object.values(modulePreps.relations).map((relation: ModuleRelation, key1) => (
                                                                <ImportRow key={key1} module_id={Object.keys(modulePreps.relations!)[key1]} inputs={relation.inputs} titles={titles} directories={directories} isLoading={loading} onInputChange={(name, source, value) => handleFormInputChange(name, source, value)} />
                                                            ))
                                                        }
                                                        <ImportRow isLoading={loading} module_id={module_id} inputs={modulePreps.inputs} titles={titles} directories={directories} onInputChange={(name, source, value) => handleFormInputChange(name, source, value)} />
                                                    </>
                                                    : null
                                            }
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                    : null
            }
        </form>
    )
}