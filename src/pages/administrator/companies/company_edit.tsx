import { FormEventHandler, useEffect, useState } from "react";
import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import adminCompanyRepository from "@/repositories/admin/adminCompanyRepository";
import { Switch } from "@/components/ui/switch";
import { SkeletonTable } from "@/components/skeletonTable";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";

export default function CompanyEdit() {
  let navigate = useNavigate();
  let params = useParams();
  const { toast } = useToast();
  const { company_id } = params;

  interface FormData {
    name: string;
    owner_name: string;
    owner_email: any;
    owner_phone: string;
    owner_password: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    owner_name: "",
    owner_email: "",
    owner_phone: "",
    owner_password: "",
  });
  const [isAgentsLoading, setIsAgentLoading] = useState(true);
  const [agents, setAgents] = useState({ data: [] });
  const [isRolesLoading, setIsRolesLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [isSetAgentRoleOpen, setIsSetAgentRoleOpen] = useState(false);
  const [agentAdminId, setAgentAdminId] = useState<number | null>(null);
  const [isUpdateAgentRouteLoading,setIsUpdateAgentRouteLoading] = useState(false);
  const [selectedAgentRole,setSelectedAgentRole] = useState(''); 

  
  const fetchAgents = async function () {
    setIsAgentLoading(true);

    const response = await adminCompanyRepository.getCompanyAgents(1, parseInt(company_id!));
    if (response.success) {
      const adminAgent = response.payload.data.find((agent: { is_admin: number }) => agent.is_admin === 1);
      setAgents(response.payload);
      if (adminAgent) {
        setAgentAdminId(adminAgent.id);
      }
    }

    setIsAgentLoading(false);
  };

  const fetchRoles = async function () {
    setIsRolesLoading(true);

    const response = await adminCompanyRepository.getCompanyRoles(parseInt(company_id!));
    if (response.success) {
      setRoles(response.payload);
    }

    setIsRolesLoading(false);
  };

  const handleToggleAgentAdmin = async (agent_id: number) => {
    setAgentAdminId(agentAdminId === agent_id ? null : agent_id);
    setIsSetAgentRoleOpen(true);
  };

  const handleUpdateAgentAdmin = async () => {
    //
    setIsUpdateAgentRouteLoading(true)
    const response = await adminCompanyRepository.updateCompanyAgentAdmin(agentAdminId!, parseInt(company_id!),selectedAgentRole);
    if (response.success) {
      fetchAgents();
      toast({
        variant: "default",
        duration: 800,
className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `company admin successfully updated`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    setIsUpdateAgentRouteLoading(false)
    setIsSetAgentRoleOpen(false)
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prevData) => {
      if (!prevData) return prevData;

      const newData = { ...prevData };
      (newData as FormData)[field] = value;

      return newData;
    });
  };

  const submit: FormEventHandler = async (e) => {
    e.preventDefault();
    const response = await adminCompanyRepository.saveModule(formData);
    if (response.success) {
      toast(response.message);
      navigate("/administrator/companies");
    }
    // post(route('administrator.companies.store'));
  };

  useEffect(() => {
    fetchAgents();
    fetchRoles();
  }, []);

  return (
    <AuthenticatedLayoutAdmin header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Add Company</h2>}>
      <form onSubmit={submit}>
        <div className="grid max-w-full flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button type="button" variant="outline" size="icon" onClick={() => navigate("/administrator/companies")} className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">Add Company</h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button type="submit" size="sm">
                Save Company
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-4 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Company Admin Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Owner Name</Label>
                      <Input type="text" className="w-full" value={formData.owner_name} onChange={(e) => handleChange("owner_name", e.target.value)} />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Owner Email</Label>
                      <Input type="text" className="w-full" value={formData.owner_email} onChange={(e) => handleChange("owner_email", e.target.value)} />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Owner Phone</Label>
                      <Input type="text" className="w-full" value={formData.owner_phone} onChange={(e) => handleChange("owner_phone", e.target.value)} />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Password</Label>
                      <Input type="password" className="w-full" value={formData.owner_password} onChange={(e) => handleChange("owner_password", e.target.value)} autoComplete="true" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Company Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" type="text" className="w-full" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
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
            <Button type="submit" size="sm">
              Save Company
            </Button>
          </div>
        </div>
      </form>
      {!isAgentsLoading ? (
        <Card className="my-4">
          <CardHeader>
            <CardTitle>Company Agents</CardTitle>
            <CardDescription>Manage your company agents.</CardDescription>
          </CardHeader>
          <CardContent>
            {agents.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span>Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.data.map((agent: any, key) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell className="font-medium">{agent.email}</TableCell>
                      <TableCell className="font-medium">{agent.role}</TableCell>
                      <TableCell className="font-medium">
                        <div className="">
                          <Switch checked={agentAdminId === agent.id} onCheckedChange={() => handleToggleAgentAdmin(agent.id)} defaultChecked={agent.is_admin} />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="">
                          <Switch />
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-muted p-4">
                  <PlusCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-lg font-medium">No Companies agents</div>
                <div className="text-sm text-muted-foreground">Add your first company agent.</div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="my-4">
          <SkeletonTable></SkeletonTable>
        </div>
      )}

      <Dialog open={isSetAgentRoleOpen} onOpenChange={setIsSetAgentRoleOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Role to assign to agent </DialogTitle>
            <DialogDescription>Select Role to assign to agent.</DialogDescription>
          </DialogHeader>

          <form onSubmit={submit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-3 col-span-6 my-4">
                <Label>Role</Label>
                <Select onValueChange={(value) => {setSelectedAgentRole(value)}} disabled={roles.length == 0 || isRolesLoading}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={`Select Agent role`} />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.length > 0
                      ? roles.map((value: any, key: number) => (
                          <SelectItem key={key} value={value.id} disabled={value.is_admin > 0} >
                            {value.name}
                          </SelectItem>
                        ))
                      : null}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>

          <DialogFooter>
            <Button onClick={()=>handleUpdateAgentAdmin()} disabled={isUpdateAgentRouteLoading} > { isUpdateAgentRouteLoading ? <div className="mx-1"><Spinner></Spinner></div> : <></>} Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthenticatedLayoutAdmin>
  );
}
