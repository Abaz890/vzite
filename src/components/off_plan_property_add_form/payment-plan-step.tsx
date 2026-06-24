import type { UseFormReturn } from "react-hook-form"
import { Button } from "../ui/button"
import { Plus, Trash2 } from "lucide-react"
import adminOffPlanPropertyRepository from "@/repositories/admin/adminOffPlanPropertyRepository"
import { Card } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "../ui/spinner"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { PaymentPlanCard } from "./payment-plan-item"

function SkeletonCard() {
  return (
    <div className="flex fle-row w-full">
      <Card className="p-4 relative flex-1">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded-full" />
        </div>
        <div className="flex items-start gap-4">
          <Skeleton className="w-16 h-16 rounded" />
          <div className="space-y-2">
            <Skeleton className="w-32 h-6 rounded" />
            <Skeleton className="w-48 h-4 rounded" />
          </div>
        </div>
      </Card>
      <Button
        variant="ghost"
        size="icon"
        className=" h-8 w-8"
        disabled={true}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  )
}

export default function PaymentPlanStep({ form }: { form: UseFormReturn<any> }) {

  const [isInitalLoading, setIsInitalLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentPlans, setPaymentPlans] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePaymentPlanLoading, setDeletePaymentPlanLoading] = useState(false);
  const [deletePaymentPlanId, setDeletePaymentPlanId] = useState('');
  const { toast } = useToast();


  const handleAddPaymentPlan = async () => {

    const reference_id = form.getValues("reference_id");

    // Logic to add a new payment plan
    const newPaymentPlan = {
      title: "",
    }

    const response = await adminOffPlanPropertyRepository.addPaymentPlan(reference_id, newPaymentPlan);
    if (response.success) {
      const paymentPlansResponse = await adminOffPlanPropertyRepository.getPaymentPlans(reference_id);
      setPaymentPlans(paymentPlansResponse.data);
    }

  }

  const handleDeletePaymentPlan = async () => {
    setDeletePaymentPlanLoading(true);
    const reference_id = form.getValues("reference_id");
    const response = await adminOffPlanPropertyRepository.deletePaymentPlan(reference_id, deletePaymentPlanId);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `property payment plan successfully removed`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    setIsDeleteModalOpen(false);
    setDeletePaymentPlanLoading(false);
    fetchPaymentPlans();
  }

  const fetchPaymentPlans = async () => {
    setIsLoading(true);
    const reference_id = form.getValues("reference_id");
    const response = await adminOffPlanPropertyRepository.getPaymentPlans(reference_id);
    setIsLoading(false)
    setPaymentPlans(response.data);
    setIsInitalLoading(false);
  }

  useEffect(() => {
    fetchPaymentPlans();
  }, [])

  return (
    <div className="">
      {
        isInitalLoading ?
          <div className="space-y-3">
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
          </div> :
          <div className="grid grid-cols-12 gap-2">
            {paymentPlans!.length > 0 ? paymentPlans!.map((paymentPlan: any) => (
              <div className="col-span-6">
                <PaymentPlanCard key={paymentPlan.id} property_id={form.getValues("reference_id")} payment_plan={paymentPlan} onDelete={(paymentPlan_id) => { console.log(paymentPlan_id), setDeletePaymentPlanId(paymentPlan_id), setIsDeleteModalOpen(true) }} />
              </div>
            )) : <></>}
          </div>
      }

      <Button
        onClick={handleAddPaymentPlan}
        className="w-full text-white font-medium py-2 my-3"
        disabled={isLoading}
      >
        <Plus className="mr-2 h-5 w-5" /> Add New Payment Plan
      </Button>


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
            <Button variant="destructive" onClick={() => handleDeletePaymentPlan()} disabled={deletePaymentPlanLoading}>
              {
                deletePaymentPlanLoading ? (
                  <div className="mx-3">
                    <Spinner></Spinner>
                  </div>
                ) : (
                  "Delete"
                )
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}


