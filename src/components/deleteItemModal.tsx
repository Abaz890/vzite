import { useState, useImperativeHandle, forwardRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import companyModuleRepository from "@/repositories/company/companyModuleRepository";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useModuleState } from "@/providers/moduleContext";


export interface DeleteItemModalRef {
  toggleModal: (id: string) => void;
}
export const DeleteItemModal = forwardRef<DeleteItemModalRef, { onSubmit: () => void }>(({ onSubmit }, ref) => {
  const { toast } = useToast();

  const { moduleId, moduleTitle } = useModuleState()


  const [item_id, setItemId] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    toggleModal: (id: string) => {
      setItemId(id);
      setIsModalOpen(!isModalOpen);
    },
  }));

  const handleDelete = async () => {
    const response = await companyModuleRepository.deleteModuleItem(item_id, moduleId.value);
    setIsModalOpen(false);
    if (response.success) {
      onSubmit();

      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `${moduleTitle.value} item successfully deleted`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    } else {
      toast({
        variant: "destructive",
        duration: 2000,
        title: response.message,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>Are you sure you want to delete this item? This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

DeleteItemModal.displayName = "DeleteItemModal";
