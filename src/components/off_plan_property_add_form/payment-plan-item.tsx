import { useEffect, useRef, useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { debounce } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import adminOffPlanPropertyRepository from "@/repositories/admin/adminOffPlanPropertyRepository"

export function PaymentPlanCard({ payment_plan, property_id, onDelete }: {
    payment_plan: any;
    property_id: string;
    onDelete: (paymentPlan_id: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const [title, setTitle] = useState(payment_plan.title || '');
    const [phases, setPhases] = useState(payment_plan.phases || []);
    const debouncedUpdateRef = useRef<ReturnType<typeof debounce> | null>(null);



    const handleAddPaymentPlanPhase = async () => {
        const newPhases = [
            ...phases,
            { id: crypto.randomUUID(), label: '', value: '' },
        ];
        setPhases(newPhases);
    }

    const handleDeletePaymentPlanPhase = async (id: string) => {
        const filtered = phases.filter((p: any) => p.id !== id);
        setPhases(filtered);
    }

    const handleUpdatePaymentPlanPhase = async (id: string, name: string, value: any) => {

        const updatedPhases = phases.map((phase: any) => {
            if (phase.id === id) {
                return {
                    ...phase,
                    [name]: value
                };
            }
            return phase;
        });
        setPhases(updatedPhases);
    }


    useEffect(() => {
        debouncedUpdateRef.current = debounce(async (titleArg: string, phasesArg: any[]) => {
            await adminOffPlanPropertyRepository.updatePaymentPlan(property_id, payment_plan.id, {
                title: titleArg,
                phases: phasesArg,
            });
            toast({
                variant: "default",
                duration: 800,
                className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: "Property Payment Plan successfully updated",
                action: <ToastAction altText="close">close</ToastAction>,
            });
        }, 500);
 
        return () => debouncedUpdateRef.current?.cancel();
    }, [property_id, payment_plan.id]);

    useEffect(() => {
        if (!debouncedUpdateRef.current) return;
        debouncedUpdateRef.current(title, phases);
    }, [title, phases]);


    return (
        <div className="flex">
            <Accordion className="flex-1 bg-white" type="single" collapsible value={isOpen ? payment_plan.id : ""} onValueChange={(value) => setIsOpen(!!value)}>
                <AccordionItem value={payment_plan.id} className="border rounded-lg overflow-hidden">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline flex-grow justify-end"> </AccordionTrigger>
                    {!isOpen && (
                        <div className="flex items-start m-3">
                            <div className="ms-3 flex flex-col items-start text-left">
                                <div className="font-medium">{payment_plan.title ?? '-'}</div>
                            </div>
                        </div>
                    )}
                    <AccordionContent className="px-4 pb-4">
                        <div className="space-y-8 mb-6">
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder=""
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="">
                                    <FormLabel>Phases</FormLabel>
                                    <div className="flex flex-col my-2">
                                        {
                                            phases.map((phase: any) => {
                                                return <div className="flex gap-2 mb-3">
                                                    <div className="flex gap-2">
                                                        <Input type="text" value={phase.label} onChange={(e) => handleUpdatePaymentPlanPhase(phase.id, 'label', e.target.value)} defaultValue={phase.label} />
                                                        <Input type="number" value={phase.value} onChange={(e) => handleUpdatePaymentPlanPhase(phase.id, 'value', e.target.value)} defaultValue={phase.value} />
                                                    </div>
                                                    <Button
                                                        onClick={() => handleDeletePaymentPlanPhase(phase.id)}
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className=" h-8 w-8"
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            })
                                        }
                                        <Button onClick={handleAddPaymentPlanPhase} type="button" > <Plus /> Add New Phase </Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Button
                variant="ghost"
                size="icon"
                className=" h-8 w-8"
                onClick={() => { console.log(payment_plan), onDelete(payment_plan.id) }}
            >
                <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
        </div>
    )
}
