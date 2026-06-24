import {
    ChevronDown,
    MoreHorizontal,
    PlusCircle,
} from "lucide-react"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from '@/components/ui/toast';
import CompanyActions from "@/components/layout/company/action";
import companyAgentRoleRepository from "@/repositories/company/companyAgentRoleRepository";
import { useGlobalState } from "@/providers/globalContext";
import { SkeletonTable } from '@/components/skeletonTable';
import { SkeletonAction } from '@/components/skeletonAction';



export default function CompanyAgentRoleList() {

    const { toast } = useToast();
    const { permissions } = useGlobalState();
    const [agentRoles, setAgentRoles] = useState<AgentRolesPayload>();
    const [loading, setLoading] = useState(true);
    const [isInitalLoading, setInitalLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [itemId, setItemId] = useState<number>();
    const [page, setPage] = useState(1);

    interface AgentRolesPayload {
        current_page: number;
        data: Array<{ id: number; name: string }>;
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
        next_page_url?: string;
        path: string;
        per_page: number;
        prev_page_url?: string;
        to: number;
        total: number;
    }


    const fetchItems = async () => {
        try {
            setLoading(true)
            const items: any = await companyAgentRoleRepository.getRoleList(page);
            console.log(items);
            if (items.success) {
                setAgentRoles(items.data)
            }
        } catch (err) {
            setError('unable to load ');

        } finally {
            setLoading(false)
            setInitalLoading(false);
        }
    };

    const onPageChange = (id: number) => {
        setPage(id);
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', id.toString());
        const updatedUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', updatedUrl);
        fetchItems();
    }


    const handleEditItemClicked = async function (id: number) {
        setItemId(id);
        setEditModalOpen(!editModalOpen);
    }

    const handleDeleteItemClicked = async function (id: number) {
        setItemId(id);
        setConfirmDeleteModalOpen(!confirmDeleteModalOpen);
    }

    const handleUpdate = async function () {
        console.log('item updated', itemId)
    }

    const handleDelete = async function () {
        console.log('item deleted', itemId)
        const response = await companyAgentRoleRepository.deleteRole(itemId);
        if (response.success) {
            setConfirmDeleteModalOpen(!confirmDeleteModalOpen);
            toast({
                variant: "default",
                duration: 800,
                className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: "agent role successfully deleted",
                action: <ToastAction altText="close">close</ToastAction>,
            });
            fetchItems();
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    return (

        !isInitalLoading ?
            <div className="">
                <CompanyActions section_title="Agent Roles" section_name="agent_role" ></CompanyActions>

                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Agent Roles</CardTitle>
                        <CardDescription>
                            Manage your Agents and view their sales performance. {loading} {error}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="hidden md:block ">
                            {!isInitalLoading && agentRoles!.data.length > 0 ?
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {agentRoles!.data.map((agent: any, key) => (
                                            <TableRow key={key}>
                                                <TableCell className="font-medium">
                                                    {agent.title}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        key !== 0 ?
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
                                                                    {permissions.can(`update_agent_role`) ? <DropdownMenuItem onClick={() => handleEditItemClicked(agent.id)} >Edit</DropdownMenuItem> : <></>}
                                                                    {permissions.can(`delete_agent_role`) ? <DropdownMenuItem onClick={() => handleDeleteItemClicked(agent.id)}>Delete</DropdownMenuItem> : <></>}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                            : <></>
                                                    }
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
                                    <div className="text-lg font-medium">No items available</div>
                                    <div className="text-sm text-muted-foreground">
                                        Add your first item to get started.
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="block md:hidden">
                            {!isInitalLoading && agentRoles!.data.length > 0 ?
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>
                                                <span>#</span>
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {agentRoles!.data.length > 0 ? agentRoles!.data.map((agentRole: any, item_key) => (
                                            <Collapsible key={item_key} asChild>
                                                <>
                                                    <TableRow key={item_key}>
                                                        <TableCell>
                                                            <CollapsibleTrigger asChild>
                                                                <ChevronDown />
                                                            </CollapsibleTrigger>
                                                        </TableCell>
                                                        <TableCell>
                                                            name
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                item_key !== 0 ?
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
                                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                    : <></>
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                    <CollapsibleContent asChild>
                                                        <div className="">
                                                            <p className="font-medium">
                                                                <strong>name</strong> : {agentRole.title}
                                                            </p>
                                                            <p className="font-medium">
                                                                <strong>email</strong> :
                                                            </p>

                                                        </div>
                                                    </CollapsibleContent>
                                                </>
                                            </Collapsible>
                                        )) : null}
                                    </TableBody>
                                </Table>
                                :
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="rounded-full bg-muted p-4">
                                        <PlusCircle className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div className="text-lg font-medium">No items available</div>
                                    <div className="text-sm text-muted-foreground">
                                        Add your first item to get started.
                                    </div>
                                </div>
                            }
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col items-start">
                        {!loading ? <div className="text-xs text-muted-foreground"> Showing <strong>{agentRoles!.from} - {agentRoles!.to}</strong> of <strong>{agentRoles!.total}</strong>{" "} agents </div> : <></>}
                        <Pagination className="my-2 justify-start">
                            <PaginationContent className="flex flex-wrap justify-center gap-2">
                                {!loading ?
                                    agentRoles!.links.map((link, index) => {
                                        if (link.url === null && link.label === '...') {
                                            return (
                                                <PaginationItem key={index}>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )
                                        }

                                        if (link.label === '&laquo; Previous') {
                                            return (
                                                <PaginationItem key={index}>
                                                    <PaginationPrevious
                                                        href={link.url || '#'}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            const previousPage = page - 1;
                                                            if (link.url) onPageChange(previousPage)
                                                        }}
                                                    />
                                                </PaginationItem>
                                            )
                                        }

                                        if (link.label === 'Next &raquo;') {
                                            return (
                                                <PaginationItem key={index}>
                                                    <PaginationNext
                                                        href={link.url || '#'}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            const nextPage = page + 1;
                                                            if (link.url) onPageChange(nextPage)
                                                        }}
                                                    />
                                                </PaginationItem>
                                            )
                                        }
                                        return (
                                            <PaginationItem key={index}>
                                                <PaginationLink
                                                    href={link.url || '#'}
                                                    isActive={link.active}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        if (link.url) onPageChange(parseInt(link.label, 10))
                                                    }}
                                                >
                                                    {link.label}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )
                                    })
                                    : <></>
                                }
                            </PaginationContent>
                        </Pagination>


                    </CardFooter>
                </Card>

                <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Agent Role</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input id="username" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleUpdate} type="submit">Update</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={confirmDeleteModalOpen} onOpenChange={setConfirmDeleteModalOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this item? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setConfirmDeleteModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
            :
            <div className=" flex flex-col">
                <SkeletonAction></SkeletonAction>
                <SkeletonTable></SkeletonTable>
            </div>


    );
}