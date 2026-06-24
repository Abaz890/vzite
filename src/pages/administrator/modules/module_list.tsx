import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";
import adminModuleRepository from "@/repositories/admin/adminModuleRepository";
import { ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
 
export default function ModulesList() {

    interface Module {
        name:string,
        permalink:string
    }

    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    let navigate = useNavigate();

    useEffect(() => { 
        const fetchItems = async () => {
            try {
                setLoading(true);
                setError('');
                const response =await adminModuleRepository.getModules();
                if (response.success) {
                    const data = await response.data;
                    setModules(data.data);
                }
            } catch (err) {
                setError('unable to load ');
                console.log(err)
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);


    return (

        <AuthenticatedLayoutAdmin
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Modules list {loading} {error}
                </h2>
            }
        >
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="draft">Draft</TabsTrigger>
                        <TabsTrigger value="archived" className="hidden sm:flex">
                            Archived
                        </TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Archived
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                            {/* <File className="h-3.5 w-3.5" /> */}
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>
                        <Button size="sm" className="h-8 gap-1" onClick={() => navigate('/administrator/modules/add')} >
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add Module
                            </span>
                        </Button>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Modules</CardTitle>
                            <CardDescription>
                                Manage your modules.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {modules.length > 0 ? <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>
                                            <span className="sr-only">Actions</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>

                                    {modules.map((module, key) => (
                                        <TableRow key={key}>
                                            <TableCell className="font-medium">
                                                {module.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">Active</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu modal={false}>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={()=>navigate(`/administrator/modules/${module.permalink}/edit`)} >Edit</DropdownMenuItem>
                                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                                : <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="rounded-full bg-muted p-4">
                                        <PlusCircle className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div className="text-lg font-medium">No Modules available</div>
                                    <div className="text-sm text-muted-foreground">
                                        Add your first module to get started.
                                    </div>
                                </div>


                            }
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                                modules
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>


        </AuthenticatedLayoutAdmin>
    );
}