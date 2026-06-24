
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dropzone } from "@/components/ui/dropzone";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import companyModuleRepository from "@/repositories/company/companyModuleRepository";
import { useGlobalState } from "@/providers/globalContext";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SkeletonTable } from "@/components/skeletonTable";
import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";

interface Task {
  fail_import_items: boolean;
  permalink: string;
  status: string;
  successfully_imported_items: number;
  total_items: number;
  has_delete_tasks: boolean;
}




export default function CompanyDashboard() {
  const [formData, setFormData] = useState<any>({});
  const [prepLoaded, setPrepLoaded] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [taskLoading, setTaskLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [deleteTaskLoading, setDeleteTaskLoading] = useState(true);
  const [deleteTasks, setDeleteTasks] = useState<any[]>([]);
  const [customerModule, setCustomerModule] = useState<{ permalink: string }>();
  const [dealModule, setDealModule] = useState<{
    permalink: string;
    default_view: string;
  }>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [delete_import_task_id, setDeleteImportTaskItemId] = useState("");
  const [deleteImportTaskLoading, setDeleteImportTaskLoading] = useState(false);

  const { activeModules, globalStateLoading, agent, echo } = useGlobalState();

  let navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = async (file: File | null) => {
    fetchModuleImprotPerp(file!);
  };

  const fetchImportTasks = async function (basePermalink: string) {
    const tasksResponse = await companyModuleRepository.getModuleImportTasks(basePermalink);
    if (tasksResponse.success) {
      setTasks(tasksResponse.data);
      setTaskLoading(false);
    }
  };

  const fetchDeleteImportTasks = async function (basePermalink: string) {
    const tasksResponse = await companyModuleRepository.getModuleDeletImportTasks(basePermalink);
    if (tasksResponse.success) {
      setDeleteTasks(tasksResponse.data);
      setDeleteTaskLoading(false);
    }
  };

  const fetchModuleImprotPerp = async (file: File) => {
    try {
      const callCenterModule = activeModules.value.find((module: { name: string }) => module.name === "call_center");

      const response = await companyModuleRepository.getModuleImportPerp(dealModule!.permalink, file);
      if (response.success) {
        setTitles(response.data.columns);
        setPrepLoaded(true);
        setFile(file);
        setFormData((prevState: Record<string, unknown>) => ({
          ...prevState,
          [`${dealModule!.permalink}__status__value`]: "pending",
          [`${dealModule!.permalink}__status__source`]: "default_value",
          [`${callCenterModule!.permalink}__status__value`]: "new",
          [`${callCenterModule!.permalink}__status__source`]: "default_value",
        }));
      }
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const handleFormInputChange = (name: string, source: string, value: string) => {
    setFormData((prevState: Record<string, unknown>) => ({
      ...prevState,
      [`${customerModule!.permalink}__${name}__value`]: value,
      [`${customerModule!.permalink}__${name}__source`]: source,
    }));
  };

  const handleImport = async () => {
    setLoading(true);

    const reversed = Object.fromEntries(Object.entries(formData).reverse());

    const response = await companyModuleRepository.getModuleImportExec(dealModule!.permalink, reversed, file!);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "data items successfully imported",
        action: <ToastAction altText="close">close</ToastAction>,
      });
      fetchImportTasks(dealModule!.permalink);
    }
    console.log(response);
    setLoading(false);
  };

  // const handleImportSample = async () => {
  //   setLoading(true);
  //   const fileResponse = await fetch("/assets/sample.csv");
  //   const blob = await fileResponse.blob();
  //   const file = new File([blob], "sample.csv", { type: "text/csv" });

  //   const baseModule = activeModules.value.find((module: { name: string }) => module.name === "deal");
  //   const customerModule = activeModules.value.find((module: { name: string }) => module.name === "customer");
  //   const callCenterModule = activeModules.value.find((module: { name: string }) => module.name === "call_center");

  //   const formData = {
  //     [`${customerModule!.permalink}__name__value`]: "NameEn",
  //     [`${customerModule!.permalink}__name__source`]: "row",
  //     [`${customerModule!.permalink}__phone__value`]: "Mobile",
  //     [`${customerModule!.permalink}__phone__source`]: "row",
  //     [`${callCenterModule!.permalink}__status__value`]: "new",
  //     [`${callCenterModule!.permalink}__status__source`]: "default_value",
  //     [`${baseModule!.permalink}__status__value`]: "pending",
  //     [`${baseModule!.permalink}__status__source`]: "default_value",
  //   };

  //   const response = await companyModuleRepository.getModuleImportExec(baseModule!.permalink, formData, file!);
  //   if (response.success) {
  //     toast({
  //       variant: "default",
  //       duration: 800,
  //       className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
  //       title: "import task successfully added",
  //       action: <ToastAction altText="close">close</ToastAction>,
  //     });
  //     fetchImportTasks(dealModule!.permalink);

  //     //fetch import tasks
  //   }
  //   setLoading(false);
  // };

  const toggleDleteImportTaskModal = function (delete_import_task_id: string) {
    setIsDeleteModalOpen(true);
    setDeleteImportTaskItemId(delete_import_task_id);
  };

  const handleDeleteImportTask = async () => {
    if (delete_import_task_id) {
      setDeleteImportTaskLoading(true);
      const response = await companyModuleRepository.deleteModuleImportTask(dealModule!.permalink, delete_import_task_id).finally(() => {
        setDeleteImportTaskLoading(false);
      });
      if (response.success) {
        fetchDeleteImportTasks(dealModule!.permalink);
        const updatedImportTasks = await companyModuleRepository.getModuleImportTasks(dealModule!.permalink);
        if (updatedImportTasks.success) {
          setTasks(updatedImportTasks.data);
        }
        toast({
          variant: "default",
          duration: 800,
          className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          title: "delete import task successfully saved",
          action: <ToastAction altText="close">close</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          duration: 2000,
          className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          title: "unable to add delete import task",
          action: <ToastAction altText="close">close</ToastAction>,
        });
      }
      setIsDeleteModalOpen(false);
    }
  };

  const updateImportState = (data: { successfullyImportedItemsCount: number; taskId: string }, status: string) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.permalink === data.taskId ? { ...task, successfully_imported_items: data.successfullyImportedItemsCount, status: status } : task)));
  };

  const updateDeleteImportState = (data: { taskId: string; status: string }) => {
    setDeleteTasks((prevTasks) => prevTasks.map((task) => (task.permalink === data.taskId ? { ...task, status: data.status } : task)));
  };

  useEffect(() => {
    if (!globalStateLoading) {
      const baseModule = activeModules.value.find((module: { name: string }) => module.name === "deal");
      const customerModule = activeModules.value.find((module: { name: string }) => module.name === "customer");
      setCustomerModule(customerModule);
      setDealModule(baseModule);
      fetchImportTasks(baseModule!.permalink);
      fetchDeleteImportTasks(baseModule!.permalink);

      echo
        .private(`user.${agent.value.id}`)
        .listen(".ImportStartedEvent", (data: any) => {
          updateImportState({ successfullyImportedItemsCount: 0, taskId: data.taskId }, "inProgress");
        })
        .listen(".ImportProgressEvent", (data: any) => {
          updateImportState(data, "inProgress");
        })
        .listen(".ImportCompletedEvent", (data: any) => {
          updateImportState(data, "completed");
          navigate(`/company/module/${baseModule.permalink}/${baseModule.default_view}`);
        })
        .listen(".DeleteImportStartedEvent", (data: any) => {
          updateDeleteImportState({ taskId: data.taskId, status: "inProgress" });
        })
        .listen(".DeleteImportCompletedEvent", (data: any) => {
          updateDeleteImportState({ taskId: data.taskId, status: "completed" });
        });

      return () => {
        echo.private(`user.${agent.value.id}`).stopListening(".ImportStartedEvent").stopListening(".ImportProgressEvent").stopListening(".ImportCompletedEvent").stopListening(".DeleteImportStartedEvent").stopListening(".DeleteImportCompletedEvent");
      };
    }
  }, [globalStateLoading]);

  return (
    <AuthenticatedLayoutAdmin header={<h2 className="text-xl font-semibold leading-tight text-gray-800">company Dashboard</h2>}>
      return (
      <div className="flex flex-col justify-center items-center h-full">
        <Card className="w-[800px] mb-4">
          <CardContent className="flex p-2 divide-x">
            <div className="p-1">
              <div>
                <Label>import data from csv file</Label>
                <div className="m-4">
                  <Dropzone upload={false} allowedFormats={["text/csv", "application/vnd.ms-excel", "application/csv", "text/x-csv", "application/x-csv", "text/comma-separated-values", "text/x-comma-separated-values"]} type="single" onFilesAdded={(_, file) => handleFileChange(file)} initialFiles={[]} onFileRemoved={async () => console.log()} onFileSortUpdated={()=>{}}></Dropzone>
                </div>
              </div>
              {prepLoaded ? (
                <div className="my-2">
                  <div className="flex space-x-4 mb-4">
                    <Input disabled value={"Name"}></Input>
                    <Select onValueChange={(value) => handleFormInputChange("name", "row", value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={`Select name column`} />
                      </SelectTrigger>
                      <SelectContent>
                        {titles.length > 0
                          ? titles.map((title, key) => (
                            <SelectItem value={title} key={key}>
                              {title}
                            </SelectItem>
                          ))
                          : null}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-4 mb-4">
                    <Input disabled value={"Phone"}></Input>
                    <Select onValueChange={(value) => handleFormInputChange("phone", "row", value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={`Select name column`} />
                      </SelectTrigger>
                      <SelectContent>
                        {titles.length > 0
                          ? titles.map((title, key) => (
                            <SelectItem value={title} key={key}>
                              {title}
                            </SelectItem>
                          ))
                          : null}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => handleImport()} disabled={loading}>
                    {loading ? <Spinner></Spinner> : <></>}
                    Import
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* <div className="p-4 flex flex-col items-center justify-center"> */}
            {/* <div className="my-2">OR</div>
              <Button onClick={() => handleImportSample()} disabled={loading}>
                {loading ? <Spinner></Spinner> : <></>}
                Import Data From Sample
              </Button> */}
            {/* </div> */}
          </CardContent>
        </Card>
        {taskLoading ? (
          <div className="w-[800px]">
            <SkeletonTable></SkeletonTable>
          </div>
        ) : (
          <Card className="w-[800px] mb-4">
            <CardContent>
              <div className="font-semibold my-2">Import Task</div>
              {tasks.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <span>ID</span>
                      </TableHead>
                      <TableHead>
                        <span>status</span>
                      </TableHead>
                      <TableHead>
                        <span>imported_items</span>
                        <span>/</span>
                        <span>total_items</span>
                      </TableHead>
                      <TableHead>
                        <span>fail_import_items</span>
                      </TableHead>
                      <TableHead>
                        <span>Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task: Task, key) => (
                      <TableRow key={key}>
                        <TableCell>
                          <span>{task.permalink}</span>
                        </TableCell>
                        <TableCell>
                          <span>{task.status}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span>
                            {task.successfully_imported_items} / {task.total_items}
                          </span>
                        </TableCell>
                        <TableCell>{task.fail_import_items}</TableCell>
                        <TableCell>
                          <Button onClick={() => toggleDleteImportTaskModal(task.permalink)} variant={"destructive"} disabled={task.has_delete_tasks || task.status !== "completed"}>
                            {task.status === "inProgress" ? (
                              <div className="mx-3">
                                <Spinner></Spinner>
                              </div>
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <h4>no import tasks</h4>
              )}
            </CardContent>
          </Card>
        )}

        {deleteTaskLoading ? (
          <div className="w-[800px]">
            <SkeletonTable></SkeletonTable>
          </div>
        ) : (
          <Card className="w-[800px] mb-4">
            <CardContent>
              <div className="font-semibold my-2">Import Delete Task</div>
              {deleteTasks.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <span>ID</span>
                      </TableHead>
                      <TableHead>
                        <span>status</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deleteTasks.map((task: Task, key) => (
                      <TableRow key={key}>
                        <TableCell>
                          <span>{task.permalink}</span>
                        </TableCell>
                        <TableCell>
                          <span>{task.status}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <h4>no import tasks</h4>
              )}
            </CardContent>
          </Card>
        )}

        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>Are you sure you want to delete this item? This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteImportTask()} disabled={deleteImportTaskLoading}>
                {deleteImportTaskLoading ? (
                  <div className="mx-3">
                    <Spinner></Spinner>
                  </div>
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      );
    </AuthenticatedLayoutAdmin>
  );
}
