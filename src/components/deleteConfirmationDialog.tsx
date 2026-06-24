import { useState, useImperativeHandle, forwardRef, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface DeleteConfirmationModalRef {
    toggleModal: (itemId: any, onSubmitP?: () => void) => void;
}
export const DeleteConfirmationModal = forwardRef<DeleteConfirmationModalRef, { onSubmit: (item_id: string) => void }>(({ onSubmit }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemId, setItemId] = useState('');
    const submitRef = useRef<(id: string) => void>(() => { });


    useImperativeHandle(ref, () => ({
        toggleModal: (itemId, onSubmitP) => {
            if (onSubmitP) submitRef.current = onSubmitP;
            setItemId(itemId)

            setIsModalOpen(!isModalOpen);
        },
    }));

    const handleDelete = async () => {
        onSubmit(itemId)
        submitRef.current(itemId)
        setIsModalOpen(false);
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

DeleteConfirmationModal.displayName = "DeleteConfirmationModal";
