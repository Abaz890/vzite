import type { UseFormReturn } from "react-hook-form";
import { FormLabel, } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dropzone } from "../ui/dropzone";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import companyOffPlanRepository from "@/repositories/company/companyOffPlanRepository";


export default function AttachmentsStep({ form, media }: { form: UseFormReturn<any>; media: any }) {
    // const []
    const { toast } = useToast();

    const handleFileUpload = async (name: string, id: string, type: string) => {
        console.log(name)
        const reference_id = form.getValues("reference_id");
        const response = await companyOffPlanRepository.attachPropertyMedia(reference_id, type, id);
        if (response.success) {
            toast({
                variant: "default",
                duration: 800,
className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: `property media successfully uploaded`,
                action: <ToastAction altText="close">close</ToastAction>,
            });
            return response.data.id;

        }
        else {
            toast({
                variant: "destructive",
                duration: 2000,
className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: `unable to upload property media`,
                action: <ToastAction altText="close">close</ToastAction>,
            });
        }
    };

    const handleFileRemoved = async (name: string, id: string, type: string) => {
        const reference_id = form.getValues("reference_id");
        console.log(name, id, type, reference_id)
        const response = await companyOffPlanRepository.unAttachPropertyMedia(reference_id, id);
        if (response.success) {
            toast({
                variant: "default",
                duration: 800,
className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: `property media successfully removed`,
                action: <ToastAction altText="close">close</ToastAction>,
            });
        }
        else {
            toast({
                variant: "destructive",
                duration: 2000,
className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                title: `unable to remove property media`,
                action: <ToastAction altText="close">close</ToastAction>,
            });
        }

        return '';
        // if (response.success) {
        //   if (type === "single") {
        //     form.setValue(name, '');
        //   }
        //   if (type === "multiple") {
        //     const images : [] = form.getValues(name);
        //     const updatedImages = images.filter((img=>img===id));
        //      form.setValue(name, updatedImages);
        //   }
        // }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Property Media</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 my-4">
                        <FormLabel>Attachments</FormLabel>
                        <Dropzone upload={true} uploadTo={'properties'} initialFiles={media} allowedFormats={[
                            "image/jpeg",
                            "image/png",
                            "image/webp",
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            "application/vnd.ms-powerpoint",
                            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                            "application/vnd.ms-excel",
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        ]} type="multiple" onFilesAdded={(id) => handleFileUpload("attachment", id.toString(), "attachment")} onFileRemoved={(id) => handleFileRemoved('attachment', id.toString(), "attachment")} onFileSortUpdated={()=>{}} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
