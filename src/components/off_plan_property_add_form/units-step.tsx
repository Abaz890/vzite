import type { UseFormReturn } from "react-hook-form"
import { Button } from "../ui/button"
import { UnitCard } from "./unit-item"
import { Plus, Trash2 } from "lucide-react"
import adminOffPlanPropertyRepository from "@/repositories/admin/adminOffPlanPropertyRepository"
import { Card } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "../ui/spinner"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";



interface LinkItem {
  url: string;
  label: string;
  active: boolean;
}

interface RootResponse {
  current_page: number;
  data: [];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkItem[];
  next_page_url?: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
}

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

export default function UnitsStep({ form }: { form: UseFormReturn<any> }) {

  const [isInitalLoading, setIsInitalLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [units, setUnits] = useState<RootResponse>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteUnitLoading, setDeleteUnitLoading] = useState(false);
  const [deleteUnitId, setDeleteUnitId] = useState('');
  const { toast } = useToast();


  const handleAddUnit = async () => {

    const reference_id = form.getValues("reference_id");

    // Logic to add a new unit
    const newUnit = {
      unit_number: "",
      type_of_sale: "offplan",
      type: "",
      layout: "",
      price: 0,
      square: 0,
      floor: "",
      bedrooms: 0,
      bathrooms: 0,
      image: null,
    }

    const response = await adminOffPlanPropertyRepository.addUnit(reference_id, newUnit);
    if (response.success) {
      const unitsResponse = await adminOffPlanPropertyRepository.getUnits(reference_id);
      setUnits(unitsResponse.data);
    }

  }

  const handleDeleteUnit = async () => {
    setDeleteUnitLoading(true);
    const reference_id = form.getValues("reference_id");
    const response = await adminOffPlanPropertyRepository.deleteUnit(reference_id, deleteUnitId);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `property unit successfully removed`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    setIsDeleteModalOpen(false);
    setDeleteUnitLoading(false);
    fetchUnits();
  }

  const fetchUnits = async () => {
    setIsLoading(true);
    const reference_id = form.getValues("reference_id");
    const response = await adminOffPlanPropertyRepository.getUnits(reference_id);
    setIsLoading(false)
    setUnits(response.data);
    setIsInitalLoading(false);
  }




  useEffect(() => {
    fetchUnits();
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
          <div className="space-y-3">
            {units!.data.length > 0 ? units!.data.map((unit: any) => (
              <UnitCard key={unit.id} property_id={form.getValues("reference_id")} unit={unit} onDelete={(unit_id) => { setDeleteUnitId(unit_id), setIsDeleteModalOpen(true) }} />
            )) : <></>}
          </div>
      }

      <Button
        onClick={handleAddUnit}
        className="w-full text-white font-medium py-2 my-3"
        disabled={isLoading}
      >
        <Plus className="mr-2 h-5 w-5" /> Add New Unit
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
            <Button variant="destructive" onClick={() => handleDeleteUnit()} disabled={deleteUnitLoading}>
              {
                deleteUnitLoading ? (
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


