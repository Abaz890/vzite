import { useState, useImperativeHandle, forwardRef, FormEventHandler } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import companyModuleRepository from '@/repositories/company/companyModuleRepository';
import { ModuleField } from './moduleField'
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from './ui/spinner';
import { useModuleState } from "@/providers/moduleContext";

export interface EditItemModalRef {
  toggleModal: (id: string, module_id: string) => void
}

// interface FormData {
//   [key: string]: {
//     [nestedKey: string]: string;
//   };
// }

interface FormData {
  [key: string]: string;
}
export const EditItemModal = forwardRef<EditItemModalRef, { editRelatedModule?: boolean; relatedModuleName?: string; relatedModuleId?: string; onSubmit: () => void; }>(({ editRelatedModule, relatedModuleName, relatedModuleId, onSubmit }, ref) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [modules_fields, setModulesFields] = useState<any>();
  const [module_item, setModuleItem] = useState<any>();
  const [formData, setFormData] = useState<FormData>({});
  const { toast } = useToast();

  const { moduleId, moduleTitle } = useModuleState()

  // const handleChange = (module: string, field: string, value: string) => {    
  //   setFormData(prevData => {
  //     if (prevData) {
  //       const updatedModule = { ...prevData[module], [field]: value };
  //       return {
  //         ...prevData,
  //         [module]: updatedModule
  //       };
  //     }
  //   }); 
  // };


  useImperativeHandle(ref, () => ({
    toggleModal: async (id: string, module_id: string) => {

      let moduleId;
      if (editRelatedModule) {
        moduleId = relatedModuleId!;
        console.log(relatedModuleName)
      }
      else {
        moduleId = module_id
      }

      console.log(editRelatedModule, moduleId)
      const itemResponse = await companyModuleRepository.getModuleItemDetails(moduleId, id);
      const fieldsResponse = await companyModuleRepository.getModuleFields(moduleId);

      if (itemResponse.success && fieldsResponse.success) {
        const fields = fieldsResponse.data;
        const item = itemResponse.data;

        setModulesFields(fields)
        setModuleItem(item)
        setIsModalOpen(!isModalOpen)

        let form: FormData = {};
        fieldsResponse.data.map((field: any) => {
          form[field.name] = itemResponse.data[field.name]
        });
        setFormData(form);



        // var baseFormData: { [x: string]: { [x: string]: string } } = {};
        // const modules = Object.keys(modules_fields);
        // modules.forEach((module) => {
        //   if (!baseFormData[module]) {
        //     baseFormData[module] = {};
        //   }
        // })

        // modules.forEach((module, key) => {
        //   modules_fields[module].forEach((field: { name: string, value: any }) => {
        //     baseFormData[module][field.name] = key == 0 ? item[field.name] : item.related_items[module][field.name];
        //   });
        // });

        // setFormData(baseFormData);

      }
    }
  }))

  const submit: FormEventHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true)


    let rmoduleId;
    if (editRelatedModule) {
      rmoduleId = relatedModuleId!;
    }
    else {
      rmoduleId = moduleId.value
    }

    console.log(editRelatedModule, moduleId)
    const response = await companyModuleRepository.updateModuleItem(module_item.it_name, rmoduleId, formData);
    if (response.success) {
      setIsModalOpen(false);
      onSubmit()

      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `${moduleTitle.value} item successfully deleted`,
        action: <ToastAction altText="close">close</ToastAction>,
      });

    }
    else {
      toast({
        variant: "destructive",
        duration: 200,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: response.message,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    setIsLoading(false)
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className={"overflow-y-scroll max-h-screen"}>
        <form onSubmit={submit}  >
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>

          <div className='my-4'>
            {modules_fields && module_item ?

              modules_fields.map((module_field: any, field_key: number) => (<ModuleField key={field_key} formData={formData} module_field={module_field} onModuleFieldUpdated={(data) => setFormData(data)} enableAddRelatedItems={true} ></ModuleField>))
              : <></>}
          </div>
          <DialogFooter className='sm:justify-start'>
            <Button disabled={isLoading} > {isLoading ? <Spinner></Spinner> : <></>} Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
)

EditItemModal.displayName = 'EditItemModal'
