import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import companyRoleRepository from "@/repositories/company/companyAgentRoleRepository";
import settingsRepository from "@/repositories/settingsRepository";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { SkeletonTable } from "@/components/skeletonTable";
import { useGlobalState } from "@/providers/globalContext";


export default function CompanyAgentRoleAdd() {
  interface FormData {
    name: string;
  }

  interface PermissionSection {
    [key: string]: Array<{ id: number; name: string }>;
  }

  const navigate = useNavigate();
  const { toast } = useToast();
  const { darkMode } = useGlobalState();


  const [loading, setLoading] = useState(false);
  const [permissionsLoading, setPermissionsLoading] = useState(true);
  const [permissions, setPermissions] = useState<PermissionSection>({});
  const [selected_permissions, setSelectedPermissions] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>();

  const fetchPermission = async () => {
    const response = await settingsRepository.getPermissions();
    if (response.success) {
      setPermissions(response.data);
    }
    setPermissionsLoading(false);
  };

  const permissionToggle = async (value: boolean, permission_id: number) => {
    const index = selected_permissions.findIndex((perm) => perm === permission_id);
    if (value && index === -1) {
      setSelectedPermissions([...selected_permissions, permission_id]);
    } else if (!value && index !== -1) {
      setSelectedPermissions(selected_permissions.filter((perm) => perm !== permission_id));
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const data = {
      ...formData,
      permissions: selected_permissions,
    };
    setLoading(true);
    const response = await companyRoleRepository.saveRole(data);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "item successfully saved",
        action: <ToastAction altText="close">close</ToastAction>,
      });
      navigate(`/company/agent_role/list`);
    }
    else {
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: response.message,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    
    setLoading(false);

  };

  useEffect(() => {
    fetchPermission();
  }, []);

  return (
    <form className="flex flex-col" onSubmit={() => handleSubmit}>
      <div className="grid max-w-full flex-1 auto-rows-max gap-4 mb-2">
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" size="icon" onClick={() => navigate("/company/agent_role/list")} className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className={`flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 ${darkMode.value ? "text-white" : ""}`}>Save agent role item</h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button onClick={() => handleSubmit()} type="button" size="sm" disabled={loading}>
              {loading ? <Spinner></Spinner> : <></>}
              save agent role
            </Button>
          </div>
        </div>
      </div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Agent Role Informations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 grid-cols-12">
            <div className="grid gap-3 col-span-12 md:col-span-6">
              <Label>Role name </Label>
              <Input id="name" type="text" onChange={(e) => handleChange("name", e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>
      {!permissionsLoading ? (
        <Card>
          <CardHeader>
            <CardTitle>Agent Role Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="my-6 w-full overflow-y-auto hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Section</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">List</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Import</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Create</th>

                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Update</th>

                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(permissions).map((sectionKey: string) => {
                    return (
                      <tr className="m-0 border-t p-0">
                        <td className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">{sectionKey}</td>
                        {permissions[sectionKey].map((permission: { id: number; name: string }, key: number) => {
                          return (
                            <td key={key} className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                              <Switch onCheckedChange={(checked) => permissionToggle(checked, permission.id)} />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="block md:hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Section</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.keys(permissions).map((sectionKey: string) => {
                    return (
                      <Collapsible asChild>
                        <>
                          <TableRow>
                            <TableCell>
                              <CollapsibleTrigger asChild>
                                <ChevronDown />
                              </CollapsibleTrigger>
                            </TableCell>
                            <TableCell>{sectionKey}</TableCell>
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
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                          <CollapsibleContent asChild>
                            <div className="my-2">
                              {permissions[sectionKey].map((permission: { id: number; name: string }, key: number) => {
                                return (
                                  <div key={key} className="flex mb-3">
                                    <Switch onCheckedChange={(checked) => permissionToggle(checked, permission.id)} />
                                    <div className="mx-1">{permission.name}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </CollapsibleContent>
                        </>
                      </Collapsible>
                    );
                    // return <tr className="m-0 border-t p-0">
                    //     <td className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    //         {sectionKey}
                    //     </td>
                    //     <td>
                    //     </td>
                    // </tr>
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <SkeletonTable></SkeletonTable>
      )}
    </form>
  );
}
