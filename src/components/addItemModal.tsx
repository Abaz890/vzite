import { useState, useImperativeHandle, forwardRef, FormEventHandler } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModuleField } from "./moduleField";
import companyModuleRepository from "@/repositories/company/companyModuleRepository";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Spinner } from "./ui/spinner";

export interface AddItemModalRef {
  isOpen: boolean
  toggleModal: (isAddRelatedModule: boolean, relatedModule: any) => any;
  closeModal: () => any;
}

export const AddItemModal = forwardRef<
  AddItemModalRef,
  {
    onSubmit: (module: string, id: number, label: string) => void;
  }
>(({ onSubmit }, ref) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalModuleFields, setFinalModuleFields] = useState<any[]>([]);
  const [module_id, setModuleId] = useState("");
  const [module_name, setModuleName] = useState("");
  const [module_title, setModuleTitle] = useState("");
  const [isAddRelatedModule, setSsAddRelatedModule] = useState(false)

  useImperativeHandle(ref, () => ({
    isOpen: isModalOpen,
    toggleModal: async (isAddRelatedModule = false, relatedModule) => {
      setSsAddRelatedModule(isAddRelatedModule)
      setModuleId(relatedModule.permalink)
      setModuleName(relatedModule.name);
      setModuleTitle(relatedModule.title.value);
      setFormData({})
      // get related module inputs
      let fields; 
      const response = await companyModuleRepository.getModuleFields(relatedModule.permalink);
      if (response.success) {
        setFinalModuleFields(response.data);
        fields = response.data;
      }

      let formDataU = {};
      fields.map((module_field: any) => {
        if (module_field.type === 'select') {
          formDataU = {
            ...formData,
            [module_field.name]: module_field.values[0].value,
          }
        }
      })
      setFormData(formDataU)
      setIsModalOpen((prev) => !prev);
    },
    closeModal: () => {
      setIsModalOpen(false);
      setFormData({})
    }
  }));

  interface FormData {
    [key: string]: string;
  }
  const [formData, setFormData] = useState<FormData>({});

  const submit: FormEventHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const response = await companyModuleRepository.saveModuleItem(module_id, formData);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `${module_name} item successfully saved`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
      if (!isAddRelatedModule) {
        onSubmit(module_name, response.data.id, response.data.label);
      }

      setIsModalOpen(false);
      setFinalModuleFields([]);
      setFormData({});

    } else {
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: response.message,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }

    setIsLoading(false);

  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(val) => { setIsModalOpen(val); if (!val) { setFinalModuleFields([]); setFormData({}); } }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New {module_title} Item</DialogTitle>
        </DialogHeader>

        {finalModuleFields.length > 0 ? (
          <form onSubmit={submit}>
            <div className="grid gap-4 py-4">
              {finalModuleFields.map(
                (module_field, field_key) => {

                  return <ModuleField key={field_key} formData={formData} module_field={module_field} onModuleFieldUpdated={(data) => setFormData(data)} enableAddRelatedItems={true} disabled={isLoading || module_field.type == 'select'}  ></ModuleField>
                }
              )}
            </div>
            <DialogFooter>
              <Button disabled={isLoading} > {isLoading && <Spinner></Spinner>}    Save</Button>
            </DialogFooter>
          </form>
        ) : null}
      </DialogContent>
    </Dialog>
  );
});

AddItemModal.displayName = "AddItemModal";